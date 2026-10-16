import { defineConfig } from 'vite';

const STYLES = {
    'bundle/britecharts': 'src/styles/britecharts.scss',
    'charts/common': 'src/styles/common.scss',
    'charts/bar': 'src/styles/charts/bar.scss',
    'charts/brush': 'src/styles/charts/brush.scss',
    'charts/bullet': 'src/styles/charts/bullet.scss',
    'charts/grouped-bar': 'src/styles/charts/grouped-bar.scss',
    'charts/line': 'src/styles/charts/line.scss',
    'charts/scatter-plot': 'src/styles/charts/scatter-plot.scss',
    'charts/sparkline': 'src/styles/charts/sparkline.scss',
    'charts/stacked-area': 'src/styles/charts/stacked-area.scss',
    'charts/stacked-bar': 'src/styles/charts/stacked-bar.scss',
};

// `vite build` writes the npm UMD bundle, `--mode cdn` the CDN one, and
// `--mode styles` / `--mode styles-min` the stylesheets.
export default defineConfig(({ mode }) => {
    if (mode.startsWith('styles')) {
        const minify = mode === 'styles-min';

        return {
            build: {
                outDir: 'dist/styles',
                emptyOutDir: false,
                cssCodeSplit: true,
                cssMinify: minify,
                rolldownOptions: {
                    input: STYLES,
                    output: {
                        assetFileNames: minify
                            ? '[name].min.css'
                            : '[name].css',
                    },
                },
            },
        };
    }
    const cdn = mode === 'cdn';

    return {
        build: {
            outDir: cdn ? 'dist/cdn/bundle' : 'dist/umd/bundle',
            emptyOutDir: false,
            sourcemap: true,
            target: 'es2020',
            lib: {
                entry: 'src/index.ts',
                formats: ['umd'],
                name: 'core',
                fileName: () =>
                    cdn ? 'core.cdn.min.js' : 'core.bundled.min.js',
            },
            rolldownOptions: {
                // npm consumers install d3 themselves; the CDN file carries
                // it, so a page needs one script tag.
                external: cdn ? [] : (id) => id.startsWith('d3-'),
                output: {
                    exports: 'named',
                    globals: (id) => id,
                },
            },
        },
    };
});
