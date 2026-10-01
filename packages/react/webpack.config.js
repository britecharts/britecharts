/* eslint-disable no-console */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    bundleIndex: path.join(__dirname, 'src/index.js'),
    charts: path.join(__dirname, 'src/charts'),
    dist: path.join(__dirname, 'dist'),
    build: path.join(__dirname, 'dist/umd/bundle'),
    umd: path.join(__dirname, 'dist/umd/charts'),
    cjs: path.join(__dirname, 'dist/cjs/charts'),
};
const CHARTS = {
    Bar: `${PATHS.charts}/bar/Bar.js`,
    Bullet: `${PATHS.charts}/bullet/Bullet.js`,
    Donut: `${PATHS.charts}/donut/Donut.js`,
    GroupedBar: `${PATHS.charts}/groupedBar/GroupedBar.js`,
    ScatterPlot: `${PATHS.charts}/scatterPlot/ScatterPlot.js`,
    Legend: `${PATHS.charts}/legend/Legend.js`,
    Line: `${PATHS.charts}/line/Line.js`,
    StackedArea: `${PATHS.charts}/stackedArea/StackedArea.js`,
    StackedBar: `${PATHS.charts}/stackedBar/StackedBar.js`,
    Sparkline: `${PATHS.charts}/sparkline/Sparkline.js`,
    Tooltip: `${PATHS.charts}/tooltip/Tooltip.js`,
};

// Configurations
const commonSplittedConfig = merge([
    {
        entry: CHARTS,
        output: {
            filename: '[name].js',
        },
        externals: {
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            react: parts.externals().react,
            'react-dom': parts.externals()['react-dom'],
        },
    },
    parts.lintJavaScript({
        include: PATHS.charts,
        options: {
            emitWarning: true,
        },
    }),
]);

const testConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    {
        mode: 'development',
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ],
        // webpack 5 defaults externalsType to 'var', which can't resolve the
        // UMD-shaped { root, commonjs2, commonjs, amd } values commonSplittedConfig
        // sets for react/react-dom; this config has no output.library of its
        // own (unlike the prod configs, which imply 'umd' via libraryTarget)
        // to tell it otherwise.
        externalsType: 'umd',
        output: {
            devtoolModuleFilenameTemplate:
                'webpack:///[absolute-resource-path]',
        },
    },
    parts.babelLoader(),
    // webpack 5 tightened the `devtool` pattern: the `eval-` keyword must
    // come first (it used to be able to sit anywhere in the string).
    parts.generateSourceMaps({ type: 'eval-cheap-module-source-map' }),
]);

const prodChartsConfig = merge([
    commonSplittedConfig,
    {
        mode: 'production',
        devtool: 'source-map',
        output: {
            path: PATHS.umd,
            filename: '[name].js',
            library: ['react', '[name]'],
            // The component itself, not { default: Component }; same shape as
            // core's per-chart builds.
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        externals: parts.externals(),
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
]);

const prodCJSChartsConfig = merge([
    commonSplittedConfig,
    {
        mode: 'production',
        devtool: 'source-map',
        output: {
            path: PATHS.cjs,
            filename: '[name].js',
            library: ['react', '[name]'],
            // The component itself, not { default: Component }; same shape as
            // core's per-chart builds.
            libraryExport: 'default',
            libraryTarget: 'commonjs2',
        },
        externals: parts.externals(),
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
]);

const prodBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            react: PATHS.bundleIndex,
        },
        output: {
            path: PATHS.build,
            filename: 'react.bundled.min.js',
            library: ['react'],
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        // Without this the bundle carried its own React 16, which React 17+
        // rejects at render time. The per-chart builds always had it.
        externals: parts.externals(),
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
    parts.minifyJavaScript(),
]);

module.exports = (env) => {
    // webpack-cli 4+ normalizes a bare `--env=name` flag into an object
    // (`{ name: true, ... }`) rather than passing `name` through as a
    // string the way webpack-cli 3 did, so this dispatch keys off
    // `env.<name>` rather than `env === '<name>'`.
    console.log('%%%%%%%% env', env);

    if (env.test) {
        return merge(commonSplittedConfig, testConfig);
    }
    if (env.prodBundleConfig) {
        return prodBundleConfig;
    }
    if (env.prodChartsConfig) {
        return prodChartsConfig;
    }
    if (env.prodCJSChartsConfig) {
        return prodCJSChartsConfig;
    }

    if (env.production) {
        return [prodCJSChartsConfig, prodChartsConfig, prodBundleConfig];
    }

    return merge(commonSplittedConfig, testConfig);
};
