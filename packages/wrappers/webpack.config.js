const path = require('path');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

const prodBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            wrappers: constants.PATHS.bundleIndex,
        },
        output: {
            path: path.resolve(__dirname, './dist/umd/bundle'),
            filename: 'wrappers.bundled.min.js',
            // src/index.js has named exports only, so the bundle exposes the
            // namespace; libraryExport: 'default' here made require() return
            // undefined.
            library: ['wrappers'],
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

const prodCJSBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            wrappers: constants.PATHS.bundleIndex,
        },
        output: {
            path: path.resolve(__dirname, './dist/cjs/bundle'),
            filename: 'wrappers.bundled.min.js',
            // No `library` name here on purpose: webpack 4 ignored it for
            // commonjs2 (there's no global to namespace), but webpack 5
            // actually nests the exports under it -- `module.exports.wrappers`
            // instead of `module.exports` -- if it's set.
            libraryTarget: 'commonjs2',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

const prodChartsConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: constants.CHARTS,
        output: {
            path: path.resolve(__dirname, './dist/umd/charts'),
            filename: '[name].min.js',
            library: ['wrappers', '[name]'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

module.exports = (env) => {
    // webpack-cli 4+ normalizes a bare `--env=name` flag into an object
    // (`{ name: true, ... }`) rather than passing `name` through as a
    // string the way webpack-cli 3 did, so this dispatch keys off
    // `env.<name>` rather than `env === '<name>'`.
    if (env.prodBundleConfig) {
        return prodBundleConfig;
    }
    if (env.prodCJSBundleConfig) {
        return prodCJSBundleConfig;
    }
    if (env.prodChartsConfig) {
        return prodChartsConfig;
    }

    if (env.production) {
        return [prodBundleConfig, prodCJSBundleConfig, prodChartsConfig];
    }
};
