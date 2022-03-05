/* eslint-disable import/no-commonjs */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    bundle: path.join(__dirname, 'src/charts/index.js'),
    charts: path.join(__dirname, 'src/charts'),
    lib: path.join(__dirname, 'lib'),
    build: path.join(__dirname, 'dist'),
    umd: path.join(__dirname, 'lib/umd'),
    cjs: path.join(__dirname, 'lib/cjs'),
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
            path: PATHS.lib,
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

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    {
        plugins: [
            // If you require a missing module and then `npm install` it, you still have
            // to restart the development server for Webpack to discover it. This plugin
            // makes the discovery automatic so you don't have to restart.
            // See https://github.com/facebookincubator/create-react-app/issues/186
            new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
            new DashboardPlugin({ port: process.env.PORT }),
        ],
        output: {
            devtoolModuleFilenameTemplate:
                'webpack:///[absolute-resource-path]',
        },
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
]);

const libraryUMDConfig = merge([
    commonSplittedConfig,
    {
        output: {
            path: PATHS.umd,
            filename: '[name].js',
            library: ['britecharts-react', '[name]'],
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        externals: parts.externals(),
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
]);

const libraryCJSConfig = merge([
    commonSplittedConfig,
    {
        output: {
            path: PATHS.cjs,
            filename: '[name].js',
            library: ['britecharts-react', '[name]'],
            libraryTarget: 'commonjs2',
        },
        externals: parts.externals(),
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
]);

const bundleConfig = merge([
    {
        entry: {
            'britecharts-react': PATHS.bundle,
        },
        output: {
            path: PATHS.build,
            filename: 'britecharts-react.min.js',
            library: ['britecharts-react'],
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.babelLoader(),
    parts.generateSourceMaps({ type: 'source-map' }),
    // parts.bundleTreeChart(),
    parts.minifyJavaScript(),
    parts.copy({
        from: 'node_modules/britecharts/dist/css/britecharts.min.css',
        to: 'britecharts-react.min.css',
    }),
]);

module.exports = (env) => {
    console.log('%%%%%%%% env', env);

    if (env === 'production') {
        return [libraryCJSConfig, libraryUMDConfig, bundleConfig];
    }

    return merge(commonSplittedConfig, developmentConfig);
};
