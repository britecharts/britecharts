const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const env = require('yargs').argv.mode;
const isProduction = env === 'prod' || env === 'prodUMD';

const projectName = 'britecharts';

const CHARTS = {
    bar: './src/charts/bar.js',
    donut: './src/charts/donut.js',
    legend: './src/charts/legend.js',
    line: './src/charts/line.js',
    tooltip: './src/charts/tooltip.js',
    miniTooltip: './src/charts/mini-tooltip.js',
    sparkline: './src/charts/sparkline.js',
    stackedArea: './src/charts/stacked-area.js',
    stackedBar: './src/charts/stacked-bar.js',
    groupedBar: './src/charts/grouped-bar.js',
    step: './src/charts/step.js',
    brush: './src/charts/brush.js',
    loading: ['./src/charts/helpers/load.js'],
    // hack to make webpack use colors as an entry point while its also a dependency of the charts above
    colors: ['./src/charts/helpers/color.js']
};
const DEMOS = {
    'demo-line': './demos/demo-line.js',
    'demo-stacked-area': './demos/demo-stacked-area.js',
    'demo-bar': './demos/demo-bar.js',
    'demo-grouped-bar': './demos/demo-grouped-bar.js',
    'demo-stacked-bar': './demos/demo-stacked-bar.js',
    'demo-donut': './demos/demo-donut.js',
    'demo-sparkline': './demos/demo-sparkline.js',
    'demo-step': './demos/demo-step.js',
    'demo-brush': './demos/demo-brush.js',
    'demo-legend': './demos/demo-legend.js',
    'demo-kitchen-sink': './demos/demo-kitchen-sink.js'
};
const PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/bundle.js'),
    charts: path.resolve('./src/charts'),
};

// Move to Parts
const babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'stage-0'],
            cacheDirectory: true,
        }
    }],

};
const babelIstambulLoader = {
    test: /\.js?$/,
    include: /src/,
    exclude: /(node_modules|__tests__|tests_index.js)/,
    use: [{
        loader: 'istanbul-instrumenter-loader',
        options:  {
            presets: ['es2015', 'stage-0'],
            cacheDirectory: true,
        },
    }],
};
const lintJSLoader = {
    test: /\.js?$/,
    include: PATHS.charts,
    exclude: /(node_modules)/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
        emitWarning: true,
        failOnError: false,
    }
};

let plugins = [
        // Uncomment this line to see bundle composition analysis
        // new BundleAnalyzerPlugin()
    ],
    outputFile;


// Set up minification for production
if (isProduction) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    // outputFile = projectName + '.min.js';
}

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.js',
    minChunks: Infinity,
});

const getConfig = (env) => {

    console.log(env);

    const configs = {
        // Add here listener to sccs files?
        demos : {
            devtool: 'cheap-eval-source-map',
            entry: DEMOS,
            output: {
                path: path.resolve(__dirname, './demos/build/'),
                publicPath: '/assets/',
                filename: '[name].js'
            },
            externals: {
                britecharts: 'britecharts'
            },
            resolve:{
                modules: [__dirname, 'node_modules'],
            },
            module: {
                rules: [
                    babelLoader,
                    lintJSLoader
                ],
            },
            plugins : [
                commonsPlugin
                // new LiveReloadPlugin({appendScriptTag:true})
            ] ,
            devServer:{
                host: '0.0.0.0',
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
            }
        },

        // Test configuration for Karma runner
        test: {
            resolve: {
                modules: [
                    path.resolve(__dirname, './src/charts'),
                    path.resolve(__dirname, './test/fixtures'),
                    'node_modules',
                ],
                alias: {
                    d3: PATHS.vendor + '/d3',
                }
            },
            module: {
                rules: [
                    babelLoader,
                    babelIstambulLoader,
                ],
            },

            plugins
        },

        // Creates a bundle with all britecharts
        prod: {
            entry:  {
                britecharts: PATHS.bundleIndex
            },

            devtool: 'cheap-eval-source-map',

            output: {
                path: path.resolve(__dirname, 'dist/bundled'),
                filename: projectName + '.min.js',
                library: ['britecharts'],
                libraryTarget: 'umd'
            },

            externals: {
                d3: 'd3'
            },

            module: {
                rules: [babelLoader],

                // Tell Webpack not to parse certain modules.
                noParse: [
                    new RegExp(PATHS.vendor + '/d3/d3.js')
                ]
            },

            resolve: {
                alias: {
                    d3: PATHS.vendor + '/d3'
                }
            },

            plugins
        },

        sandbox: {
            entry:  {
                sandbox: path.resolve(__dirname, './sandbox/sandbox.js'),
            },
            devtool: 'cheap-eval-source-map',
            output: {
                path: path.resolve(__dirname, './sandbox/build'),
                publicPath: '/assets/',
                filename: '[name].js',
            },

            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: ['babel-loader'],
                        exclude: /(node_modules)/,
                    },
                    {
                        test:/\.scss$/,
                        use: [
                            {loader: 'style-loader'},
                            {loader: 'css-loader'},
                            {loader: 'sass-loader'},
                        ],
                        include: /(sandbox)/,
                        exclude: /node_modules/,
                    }
                ],
                noParse: [
                    new RegExp(PATHS.vendor + '/d3/d3.js')
                ]
            },
            devServer: {
                contentBase: path.resolve(__dirname, './sandbox'),
                port: 8002,
                inline: true,
                stats: 'errors-only',
            }
        },

        // Creates minified UMD versions of each chart
        prodUMD: {
            entry:  CHARTS,

            devtool: 'source-map',

            output: {
                path: path.resolve(__dirname, './dist/umd'),
                filename: '[name].min.js',
                library: ['britecharts', '[name]'],
                libraryTarget: 'umd'
            },

            externals: {
                d3: 'd3'
            },

            module: {
                rules: [babelLoader],
                // Tell Webpack not to parse certain modules.
                noParse: [
                    new RegExp(PATHS.vendor + '/d3/d3.js')
                ]
            },

            resolve: {
                alias: {
                    d3: PATHS.vendor + '/d3'
                }
            },

            plugins
        }
    }

    return configs[env];
};

module.exports = getConfig;
