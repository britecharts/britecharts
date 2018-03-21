const webpack = require('webpack');
const constants = require('./webpack.constants');

exports.babelLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
});

exports.babelIstambulLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: /src/,
                exclude: /(node_modules|__tests__|tests_index.js)/,
                use: [{
                    loader: 'istanbul-instrumenter-loader',
                    query: {
                        esModules: true
                    }
                }],
            }
        ]
    }
});

exports.sassLoader = () => ({
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                ],
                exclude: /node_modules/,
            }
        ]
    }
});

exports.noParseD3Vendor = () => ({
    module: {
        noParse: [
            new RegExp(constants.PATHS.vendor + '/d3/d3.js')
        ]
    }
});


exports.externals = () => ({
    externals: {
        d3: 'd3'
    },
});

exports.aliasD3ToVendorPath = () => ({
    resolve: {
        alias: {
            d3: constants.PATHS.vendor + '/d3',
        }
    }
});

exports.commonsChunkPlugin = () => ({
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: Infinity,
    })]
});

exports.devServer = (port) => ({
    devServer: {
        host: '0.0.0.0',
        port,
    }
});
