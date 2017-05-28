var webpack = require('webpack'),
    path = require('path'),
    _ = require('underscore'),
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
        'mini-tooltip': './src/charts/mini-tooltip.js',
        'sparkline': './src/charts/sparkline.js',
        'stacked-area': './src/charts/stacked-area.js',
        'stacked-bar': './src/charts/stacked-bar.js',
        'step': './src/charts/step.js',
        'brush': './src/charts/brush.js',
        // hack to make webpack use colors as an entry point while its also a dependency of the charts above
        'colors': ['./src/charts/helpers/colors.js']
    },

    defaultJSLoader = {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
            presets : ['es2015', 'stage-0']
        }
    },

    plugins = [
        // Uncomment this line to see bundle composition analysis
        // new BundleAnalyzerPlugin()
    ],
    outputFile,
    config;


// Set up minification for production
if (isProduction) {
    plugins.push(new UglifyJsPlugin({ minimize: false }));
    // outputFile = projectName + '.min.js';
}

let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

config = {

    // Add here listener to sccs files?
    demos : {
        devtool: 'source-map',
        entry: {
            'demo-line': './demos/demo-line.js',
            'demo-stacked-area': './demos/demo-stacked-area.js',
            'demo-stacked-bar': './demos/demo-stacked-bar.js',
            'demo-bar': './demos/demo-bar.js',
            'demo-donut': './demos/demo-donut.js',
            'demo-sparkline': './demos/demo-sparkline.js',
            'demo-step': './demos/demo-step.js',
            'demo-brush': './demos/demo-brush.js',
            'demo-kitchen-sink': './demos/demo-kitchen-sink.js'
        },
        output: {
            path: './demos/build/',
            publicPath: '/assets/',
            filename: '[name].js'
        },
        externals: {
            britecharts: 'britecharts'
        },
        resolve:{
            root: [
                __dirname
            ],
        },
        module: {
            loaders: [ defaultJSLoader ]
        },
        plugins : [
            commonsPlugin
            // new LiveReloadPlugin({appendScriptTag:true})
        ] ,
        devServer:{
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
            root: [chartModulesPath, fixturesPath],
            alias: {
                d3: vendorsPath + '/d3'
            }
        },
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    include: /src/,
                    exclude: /(node_modules)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-0'],
                        cacheDirectory: true
                    },
                },
                {
                    test: /\.js?$/,
                    include: /src/,
                    exclude: /(node_modules|__tests__|tests_index.js)/,
                    loader: 'babel-istanbul',
                    query: {
                        presets: ['es2015', 'stage-0'],
                        cacheDirectory: true
                    },
                }
            ],

            loaders: [ defaultJSLoader ]
        },

        plugins
    },

    // Creates a bundle with all britecharts
    prod: {
        entry:  {
            britecharts: bundleIndexPath
        },

        devtool: 'source-map',

        output: {
            path: 'dist/bundled',
            filename: projectName + '.min.js',
            library: ['britecharts'],
            libraryTarget: 'umd'
        },

        externals: {
            d3: 'd3'
        },

        module: {

            loaders: [ defaultJSLoader ],

            // Tell Webpack not to parse certain modules.
            noParse: [
                new RegExp(vendorsPath + '/d3/d3.js')
            ]
        },

        resolve: {
            alias: {
                d3: vendorsPath + '/d3'
            }
        },

        plugins
    },

    // Creates minified UMD versions of each chart
    prodUMD: {
        entry:  currentCharts,

        devtool: 'source-map',

        output: {
            path:     'dist/umd',
            filename: '[name].min.js',
            library: ['britecharts', '[name]'],
            libraryTarget: 'umd'
        },

        externals: {
            d3: 'd3'
        },

        module: {

            loaders: [ defaultJSLoader ],

            // Tell Webpack not to parse certain modules.
            noParse: [
                new RegExp(vendorsPath + '/d3/d3.js')
            ]
        },

        resolve: {
            alias: {
                d3: vendorsPath + '/d3'
            }
        },

        plugins
    }
};

module.exports = config[env];
