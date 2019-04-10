const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');
const constants = require('./webpack.constants');

const demosConfig = merge([
    {
        devtool: 'cheap-eval-source-map',
        entry: constants.DEMOS,
        output: {
            path: path.resolve(__dirname, './demos/build/'),
            publicPath: '/assets/',
            filename: '[name].js'
        },
        externals: {
            britecharts: 'britecharts'
        },
        devServer: {
            // this is to allow the docs system to access otherwise inaccessible scripts
            proxy: {
                '/britecharts/scripts/common.js': {
                    target: 'http://localhost:8001/',
                    pathRewrite: {'^/britecharts/scripts/' : '/assets/'}
                },
                '/britecharts/scripts/demo-*.js': {
                    target: 'http://localhost:8001/',
                    pathRewrite: {'^/britecharts/scripts/' : '/assets/'}
                },
                '/britecharts/scripts/*.js': {
                    target: 'http://localhost:8001/',
                    pathRewrite: {'^/britecharts/scripts/' : 'scripts/'}
                },
                '/britecharts/': {
                    target: 'http://localhost:8001/',
                    pathRewrite: {'^/britecharts/' : ''}
                }
            },
        },
    },
    parts.babelLoader(),
    parts.commonsChunkPlugin(),
    parts.devServer(8001),
]);

const testConfig = merge([
    {
        resolve: {
            modules: [
                path.resolve(__dirname, './src/charts'),
                path.resolve(__dirname, './test/fixtures'),
                'node_modules',
            ],
        }
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    parts.babelIstambulLoader(),
]);

const sandboxConfig = merge([
    {
        devtool: 'cheap-eval-source-map',
        entry: {
            sandbox: path.resolve(__dirname, './sandbox/sandbox.js'),
        },
        output: {
            path: path.resolve(__dirname, './sandbox/build'),
            publicPath: '/assets/',
            filename: '[name].js',
        },
    },
    parts.babelLoader(),
    parts.sassLoader(),
    parts.devServer(8002),
]);

const prodBundleConfig = merge([
    {
        devtool: 'source-map',
        entry: {
            britecharts: constants.PATHS.bundleIndex
        },
        output: {
            path: path.resolve(__dirname, 'dist/bundled'),
            filename: 'britecharts.min.js',
            library: ['britecharts'],
            libraryTarget: 'umd'
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

const prodChartsConfig = merge([
    {
        devtool: 'source-map',
        entry: constants.CHARTS,
        output: {
            path: path.resolve(__dirname, './dist/umd'),
            filename: '[name].min.js',
            library: ['britecharts', '[name]'],
            libraryTarget: 'umd'
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

module.exports = (env) => {
    // eslint-disable-next-line no-console
    console.log('%%%%%%%% env', env);

    if (env === 'demos') {
        return demosConfig;
    }

    if (env === 'test') {
        return testConfig;
    }

    if (env === 'sandbox') {
        return sandboxConfig;
    }

    if (env === 'production') {
        return [
            prodBundleConfig,
            prodChartsConfig
        ];
    }
};
