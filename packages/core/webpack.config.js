const path = require('path');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

const CDNBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            core: constants.PATHS.bundleIndex,
        },
        output: {
            path: path.resolve(__dirname, './dist/cdn/bundle'),
            filename: 'core.cdn.min.js',
            library: ['core'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.typeScript(),
]);

const CDNChartsBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: constants.CHARTS,
        output: {
            path: path.resolve(__dirname, './dist/cdn/charts'),
            filename: '[name].cdn.min.js',
            library: ['core', '[name]'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.typeScript(),
]);

const prodBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            core: constants.PATHS.bundleIndex,
        },
        output: {
            path: path.resolve(__dirname, './dist/umd/bundle'),
            filename: 'core.bundled.min.js',
            library: ['core'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.typeScript(),
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
            library: ['core', '[name]'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.aliasD3ToVendorPath(),
    parts.typeScript(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

const prodStylesConfig = merge([
    {
        mode: 'production',
        devtool: false,
        entry: constants.PATHS.styles,
        output: {
            path: path.resolve(__dirname, './dist/styles/bundle'),
        },
    },
    parts.allStyles(),
]);

const prodStylesConfigMin = merge([
    {
        mode: 'production',
        devtool: false,
        entry: constants.PATHS.styles,
        output: {
            path: path.resolve(__dirname, './dist/styles/bundle'),
        },
    },
    parts.allStyles(true),
    parts.minifyStyles(),
]);

const prodChartsStylesConfig = merge([
    {
        mode: 'production',
        devtool: false,
        entry: constants.CHART_STYLES,
        output: {
            path: path.resolve(__dirname, './dist/styles/charts'),
        },
    },
    parts.chartStyles(),
]);

const prodChartsStylesConfigMin = merge([
    {
        mode: 'production',
        devtool: false,
        entry: constants.CHART_STYLES,
        output: {
            path: path.resolve(__dirname, './dist/styles/charts'),
        },
    },
    parts.chartStyles(true),
    parts.minifyStyles(),
]);

module.exports = (env) => {
    // webpack-cli 4+ normalizes a bare `--env=name` flag into an object
    // (`{ name: true, ... }`) rather than passing `name` through as a
    // string the way webpack-cli 3 did, so this dispatch keys off
    // `env.<name>` rather than `env === '<name>'`.
    // eslint-disable-next-line no-console
    console.log('%%%%%%%% env', env);

    if (env.prodStyles) {
        return [prodStylesConfig, prodStylesConfigMin];
    }
    if (env.prodChartStyles) {
        return [prodChartsStylesConfig, prodChartsStylesConfigMin];
    }
    if (env.prodBundleConfig) {
        return prodBundleConfig;
    }
    if (env.prodChartsConfig) {
        return prodChartsConfig;
    }
    if (env.CDNBundleConfig) {
        return CDNBundleConfig;
    }
    if (env.CDNChartsBundleConfig) {
        return CDNChartsBundleConfig;
    }

    if (env.production) {
        return [
            prodBundleConfig,
            prodChartsConfig,
            CDNBundleConfig,
            CDNChartsBundleConfig,
            prodStylesConfig,
            prodStylesConfigMin,
            prodChartsStylesConfig,
            prodChartsStylesConfigMin,
        ];
    }
};
