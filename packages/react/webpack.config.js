/* eslint-disable no-console */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const merge = require('webpack-merge');
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
    Legend: `${PATHS.charts}/legend/Legend.js`,
    Line: `${PATHS.charts}/line/Line.js`,
    StackedArea: `${PATHS.charts}/stackedArea/StackedArea.js`,
    StackedBar: `${PATHS.charts}/stackedBar/StackedBar.js`,
    Sparkline: `${PATHS.charts}/sparkline/Sparkline.js`,
    Step: `${PATHS.charts}/step/Step.js`,
    Tooltip: `${PATHS.charts}/tooltip/Tooltip.js`,
};

// Configurations
const commonSplittedConfig = merge([
    {
        entry: CHARTS,
        output: {
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ],
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
            // If you require a missing module and then `npm install` it, you still have
            // to restart the development server for Webpack to discover it. This plugin
            // makes the discovery automatic so you don't have to restart.
            // See https://github.com/facebookincubator/create-react-app/issues/186
            new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
        ],
        output: {
            devtoolModuleFilenameTemplate:
                'webpack:///[absolute-resource-path]',
        },
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
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
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
    // parts.bundleTreeChart(),
    parts.minifyJavaScript(),
    // TODO: Figure out this
    // parts.copy({
    //     from: 'node_modules/@britecharts/core/dist/styles/bundle/britecharts.min.css',
    //     to: 'react.min.css',
    // }),
]);

module.exports = (env) => {
    console.log('%%%%%%%% env', env);

    if (env === 'test') {
        return merge(commonSplittedConfig, testConfig);
    }
    if (env === 'prodBundleConfig') {
        return prodBundleConfig;
    }
    if (env === 'prodChartsConfig') {
        return prodChartsConfig;
    }
    if (env === 'prodCJSChartsConfig') {
        return prodCJSChartsConfig;
    }

    if (env === 'production') {
        return [prodCJSChartsConfig, prodChartsConfig, prodBundleConfig];
    }

    return merge(commonSplittedConfig, testConfig);
};
