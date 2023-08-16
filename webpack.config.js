const path = require('path');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

const demosConfig = merge([
    {
        mode: 'development',
        devtool: 'eval-source-map',
        entry: constants.DEMOS,
        output: {
            path: path.resolve(__dirname, './demos/build/'),
            publicPath: '/assets/',
            filename: '[name].js',
        },
        externals: {
            britecharts: 'britecharts',
        },
        devServer: {
            // this is to allow the docs system to access otherwise inaccessible scripts
            proxy: {
                '/britecharts/scripts/common.js': {
                    target: 'http://localhost:8001/',
                    pathRewrite: { '^/britecharts/scripts/': '/assets/' },
                },
                '/britecharts/scripts/demo-*.js': {
                    target: 'http://localhost:8001/',
                    pathRewrite: { '^/britecharts/scripts/': '/assets/' },
                },
                '/britecharts/scripts/*.js': {
                    target: 'http://localhost:8001/',
                    pathRewrite: { '^/britecharts/scripts/': 'scripts/' },
                },
                '/britecharts/': {
                    target: 'http://localhost:8001/',
                    pathRewrite: { '^/britecharts/': '' },
                },
            },
        },
        optimization: {
            minimize: false,
            moduleIds: 'named',
        },
    },
    parts.babelLoader(),
    parts.devServer(8001),
]);

const testConfig = merge([
    {
        mode: 'development',
        devtool: 'inline-source-map',
        resolve: {
            modules: [path.resolve(__dirname, './src/charts'), 'node_modules'],
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    parts.istanbulLoader(),
]);

const sandboxConfig = merge(
    {
        mode: 'development',
        devtool: 'eval-source-map',
        entry: {
            sandbox: path.resolve(__dirname, './sandbox/sandbox.js'),
        },
        resolve: {
            alias: { charts: path.resolve(__dirname, './src/charts') },
        },
        target: 'web',
        output: {
            path: path.resolve(__dirname, './sandbox/build'),
            publicPath: '/assets/',
            filename: '[name].js',
        },
    },
    parts.babelLoader(),
    parts.sassLoader(),
    parts.devServer(8002),
);

const CDNBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            britecharts: constants.PATHS.bundleIndex,
        },
        output: {
            path: path.resolve(__dirname, './dist/cdn/bundle'),
            filename: 'britecharts.cdn.min.js',
            library: ['britecharts'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(8899),
]);

const CDNChartsBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: constants.CHARTS,
        output: {
            path: path.resolve(__dirname, './dist/cdn/charts'),
            filename: '[name].cdn.min.js',
            library: ['britecharts', '[name]'],
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(8899),
]);

const prodBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            britecharts: constants.PATHS.bundleIndex,
        },
        output: {
            path: path.resolve(__dirname, './dist/umd/bundle'),
            filename: 'britecharts.bundled.min.js',
            library: ['britecharts'],
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

const prodChartsConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: constants.CHARTS,
        output: {
            path: path.resolve(__dirname, './dist/umd/charts'),
            filename: '[name].min.js',
            library: ['britecharts', '[name]'],
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

const devStylesConfig = merge([
    {
        mode: 'development',
        devtool: 'eval-source-map',
        entry: constants.PATHS.styles,
        output: {
            path: path.resolve(__dirname, './demos/styles/'),
        },
    },
    parts.allStyles(),
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
    // eslint-disable-next-line no-console
    console.log('%%%%%%%% env', env);

    if (env.demos) {
        return [demosConfig, devStylesConfig];
    }

    if (env.test) {
        return testConfig;
    }

    if (env.sandbox) {
        return sandboxConfig;
    }

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
