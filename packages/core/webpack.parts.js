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

// webpack understands ES modules but not TypeScript, and H26 deliberately took
// Babel back out of this build -- plain .js is ES2020 already and goes through
// untouched. This rule is scoped to .tsx? on purpose so that stays true: Babel
// runs on converted files only, and only to strip the types. Checking them is
// the `type-check` script's job.
exports.typeScript = () => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Hermetic: this build has no babel config of its own,
                        // and should not pick one up from a parent directory.
                        babelrc: false,
                        configFile: false,
                        presets: ['@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve: {
        // webpack's defaults are ['.js', '.json', '.wasm'].
        extensions: ['.ts', '.tsx', '.js', '.json', '.wasm'],
        // Lets an import written `./bar.js` resolve to bar.ts on disk, so the
        // barrels keep their .js specifiers as files convert one at a time.
        // webpack 4 could not do this at all, which is why the migration
        // waited on #1079.
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
        },
    },
});
