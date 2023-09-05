const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const constants = require('./webpack.constants');
const FixStyleOnlyEntriesPlugin = require('webpack-remove-empty-scripts');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

exports.babelLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
});

exports.istanbulLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: /src/,
                exclude: /(node_modules|__tests__|tests_index.js)/,
                use: [
                    {
                        loader: 'istanbul-instrumenter-loader',
                        query: {
                            esModules: true,
                        },
                    },
                ],
            },
        ],
    },
});

exports.bundleTreeChart = (analyzerPort = 8888) => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort,
        }),
    ],
});

exports.sassLoader = () => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
        ],
    },
});

exports.allStyles = (isMinified = false) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: isMinified
                                ? 'britecharts.min.css'
                                : 'britecharts.css',
                        },
                    },
                    {
                        loader: 'extract-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [new FixStyleOnlyEntriesPlugin({ extensions: ['scss'] })],
});

exports.chartStyles = (isMinified = false) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: isMinified ? '[name].min.css' : '[name].css',
                        },
                    },
                    {
                        loader: 'extract-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [new FixStyleOnlyEntriesPlugin({ extensions: ['scss'] })],
});

exports.minifyStyles = () => ({
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true,
        }),
    ],
});

exports.noParseD3Vendor = () => ({
    module: {
        noParse: [new RegExp(constants.PATHS.vendor + '/d3/d3.js')],
    },
});

exports.externals = () => ({
    externals: /^d3-/,
});

exports.aliasD3ToVendorPath = () => ({
    resolve: {
        alias: {
            d3: constants.PATHS.vendor + '/d3',
        },
    },
});

exports.devServer = (port) => ({
    devServer: {
        host: '0.0.0.0',
        port,
    },
});
