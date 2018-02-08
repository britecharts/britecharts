<<<<<<< HEAD
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
=======
var webpack = require('webpack'),
    path = require('path'),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,

    env = require('yargs').argv.mode,
    isProduction = env === 'prod' || env === 'prodUMD',

    chartModulesPath = path.resolve('./src/charts'),
    fixturesPath = path.resolve('./test/fixtures'),
    vendorsPath = path.resolve('./node_modules'),
    bundleIndexPath = path.resolve('./src/bundle.js'),

    projectName = 'britecharts',

    currentCharts = {
        'bar': './src/charts/bar.js',
        'donut': './src/charts/donut.js',
        'legend': './src/charts/legend.js',
        'line': './src/charts/line.js',
        'tooltip': './src/charts/tooltip.js',
        'miniTooltip': './src/charts/mini-tooltip.js',
        'scatterPlot': './src/charts/scatter-plot.js',
        'sparkline': './src/charts/sparkline.js',
        'stackedArea': './src/charts/stacked-area.js',
        'stackedBar': './src/charts/stacked-bar.js',
        'groupedBar': './src/charts/grouped-bar.js',
        'step': './src/charts/step.js',
        'brush': './src/charts/brush.js',
        'loading': ['./src/charts/helpers/load.js'],
        // hack to make webpack use colors as an entry point while its also a dependency of the charts above
        'colors': ['./src/charts/helpers/color.js']
    },
    currentDemos = {
        'demo-line': './demos/demo-line.js',
        'demo-stacked-area': './demos/demo-stacked-area.js',
        'demo-bar': './demos/demo-bar.js',
        'demo-grouped-bar': './demos/demo-grouped-bar.js',
        'demo-scatter-plot': './demos/demo-scatter-plot.js',
        'demo-stacked-bar': './demos/demo-stacked-bar.js',
        'demo-donut': './demos/demo-donut.js',
        'demo-sparkline': './demos/demo-sparkline.js',
        'demo-step': './demos/demo-step.js',
        'demo-brush': './demos/demo-brush.js',
        'demo-kitchen-sink': './demos/demo-kitchen-sink.js'
    },

    defaultJSLoader = {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'stage-0'],
                cacheDirectory: true,
            }
        }],

    },
    babelIstambulLoader = {
        test: /\.js?$/,
        include: /src/,
        exclude: /(node_modules|__tests__|tests_index.js)/,
        use: [{
            loader: 'istanbul-instrumenter-loader',
            options:  {
                presets: ['es2015', 'stage-0'],
                cacheDirectory: true,
>>>>>>> Initial files added
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
    parts.noParseD3Vendor(),
    parts.externals(),
]);

// module.exports = getConfig;

module.exports = (env) => {
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