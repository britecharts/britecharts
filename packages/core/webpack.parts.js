const constants = require('./webpack.constants');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
                            esModule: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                // sass-loader 10 uses the legacy JS API,
                                // which Dart Sass 2 removes. Moving off it
                                // needs webpack 5, so it goes with Vite.
                                silenceDeprecations: ['legacy-js-api'],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new RemoveEmptyScriptsPlugin({ extensions: ['scss'] })],
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
                            esModule: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                // sass-loader 10 uses the legacy JS API,
                                // which Dart Sass 2 removes. Moving off it
                                // needs webpack 5, so it goes with Vite.
                                silenceDeprecations: ['legacy-js-api'],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new RemoveEmptyScriptsPlugin({ extensions: ['scss'] })],
});

exports.minifyStyles = () => ({
    optimization: {
        // '...' keeps webpack 5's default JS minimizer (Terser) active
        // alongside the CSS minimizer -- omitting it would silently turn
        // off JS minification for this config.
        minimizer: [
            '...',
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } },
                    ],
                },
            }),
        ],
    },
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
