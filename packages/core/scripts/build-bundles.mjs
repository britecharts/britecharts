// Builds the UMD bundles, the CDN bundles and the stylesheets with Vite.
// The ESM build (Babel) and the types (tsc) are separate scripts.
import {
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (p) => path.join(root, 'src', p);
const entriesDir = path.join(root, 'node_modules/.cache/build-bundles');

const CHARTS = {
    bar: 'charts/bar/bar',
    brush: 'charts/brush/brush',
    bullet: 'charts/bullet/bullet',
    donut: 'charts/donut/donut',
    groupedBar: 'charts/grouped-bar/grouped-bar',
    heatmap: 'charts/heatmap/heatmap',
    legend: 'charts/legend/legend',
    line: 'charts/line/line',
    miniTooltip: 'charts/mini-tooltip/mini-tooltip',
    scatterPlot: 'charts/scatter-plot/scatter-plot',
    sparkline: 'charts/sparkline/sparkline',
    stackedArea: 'charts/stacked-area/stacked-area',
    stackedBar: 'charts/stacked-bar/stacked-bar',
    tooltip: 'charts/tooltip/tooltip',
    loading: 'charts/helpers/load',
    colors: 'charts/helpers/color',
};

const STYLES = {
    bar: 'styles/charts/bar.scss',
    brush: 'styles/charts/brush.scss',
    bullet: 'styles/charts/bullet.scss',
    'grouped-bar': 'styles/charts/grouped-bar.scss',
    line: 'styles/charts/line.scss',
    'scatter-plot': 'styles/charts/scatter-plot.scss',
    sparkline: 'styles/charts/sparkline.scss',
    'stacked-area': 'styles/charts/stacked-area.scss',
    'stacked-bar': 'styles/charts/stacked-bar.scss',
    common: 'styles/common.scss',
};

const resolveSource = (base) => {
    const file = ['.ts', '.js'].map((ext) => src(base + ext)).find(existsSync);

    if (!file) {
        throw new Error(`No source file for ${base}`);
    }

    return file;
};

// A module with a default export is published as that export alone, the way
// the charts have always been loaded: `require('.../bar.min.js')` is the chart
// function and `window.core.bar` is the same. The helpers without one publish
// their named exports. Re-exporting the default from a generated entry keeps
// the bundle's other named exports, like the index's, out of the global.
const entryFor = (name, base) => {
    const file = resolveSource(base);
    const hasDefault = /^export default\b/m.test(readFileSync(file, 'utf8'));

    if (!hasDefault) {
        return { entry: file, exports: 'named' };
    }
    const entry = path.join(entriesDir, `${name}.js`);

    writeFileSync(entry, `export { default } from ${JSON.stringify(file)};\n`);

    return { entry, exports: 'default' };
};

const umd = async ({ name, base, globalName, outDir, fileName, bundleD3 }) => {
    const { entry, exports } = entryFor(name, base);

    await build({
        configFile: false,
        root,
        logLevel: 'warn',
        build: {
            outDir: path.join(root, outDir),
            emptyOutDir: false,
            sourcemap: true,
            target: 'es2020',
            lib: {
                entry,
                formats: ['umd'],
                name: globalName,
                fileName: () => fileName,
            },
            rolldownOptions: {
                // The npm bundles leave d3 to the consumer's install. The CDN
                // ones carry it, so a page needs one script tag.
                external: bundleD3 ? [] : (id) => id.startsWith('d3-'),
                output: {
                    exports,
                    extend: true,
                    globals: (id) => id,
                },
            },
        },
    });
};

const styles = async ({ input, outDir, minify }) => {
    await build({
        configFile: false,
        root,
        logLevel: 'warn',
        build: {
            outDir: path.join(root, outDir),
            emptyOutDir: false,
            cssCodeSplit: true,
            cssMinify: minify,
            rolldownOptions: {
                input,
                output: {
                    assetFileNames: minify ? '[name].min.css' : '[name].css',
                },
            },
        },
    });
};

const main = async () => {
    rmSync(entriesDir, { recursive: true, force: true });
    mkdirSync(entriesDir, { recursive: true });

    const bundles = [
        { outDir: 'dist/umd/bundle', fileName: 'core.bundled.min.js' },
        {
            outDir: 'dist/cdn/bundle',
            fileName: 'core.cdn.min.js',
            bundleD3: true,
        },
    ];

    for (const bundle of bundles) {
        await umd({
            name: 'core',
            base: 'index',
            globalName: 'core',
            ...bundle,
        });
    }

    for (const [name, base] of Object.entries(CHARTS)) {
        await umd({
            name,
            base,
            globalName: `core.${name}`,
            outDir: 'dist/umd/charts',
            fileName: `${name}.min.js`,
        });
        await umd({
            name,
            base,
            globalName: `core.${name}`,
            outDir: 'dist/cdn/charts',
            fileName: `${name}.cdn.min.js`,
            bundleD3: true,
        });
    }

    const chartStyles = Object.fromEntries(
        Object.entries(STYLES).map(([name, file]) => [name, src(file)])
    );
    const bundleStyles = { britecharts: src('styles/britecharts.scss') };

    for (const minify of [false, true]) {
        await styles({
            input: chartStyles,
            outDir: 'dist/styles/charts',
            minify,
        });
        await styles({
            input: bundleStyles,
            outDir: 'dist/styles/bundle',
            minify,
        });
    }
};

main().catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
});
