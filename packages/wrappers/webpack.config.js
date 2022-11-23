const path = require('path');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

const testConfig = merge([
    {
        mode: 'development',
        resolve: {
            modules: [path.resolve(__dirname, './src/charts'), 'node_modules'],
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    parts.istanbulLoader(),
]);

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
            library: ['wrappers'],
            libraryExport: 'default',
            libraryTarget: 'umd',
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(8899),
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
            library: ['warppers'],
            libraryTarget: 'commonjs2',
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(8899),
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
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(8899),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

module.exports = (env) => {
    // eslint-disable-next-line no-console
    console.log('%%%%%%%% env', env);

    if (env === 'test') {
        return testConfig;
    }

    if (env === 'prodBundleConfig') {
        return prodBundleConfig;
    }
    if (env === 'prodCJSBundleConfig') {
        return prodCJSBundleConfig;
    }
    if (env === 'prodChartsConfig') {
        return prodChartsConfig;
    }

    if (env === 'production') {
        return [prodBundleConfig, prodChartsConfig];
    }
};
