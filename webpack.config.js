var webpack = require('webpack'),
    path = require('path'),

    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,

    env = process.env.WEBPACK_ENV, // dev | build
    isProduction = env === 'prod' || env === 'prodDiv',

    chartModulesPath = path.resolve('./src/charts'),
    fixturesPath = path.resolve('./test/fixtures'),
    vendorsPath = path.resolve('./node_modules'),

    projectName = 'britecharts',
    currentCharts = {
        'bar': './src/charts/bar.js',
        'donut': './src/charts/donut.js',
        'legend': './src/charts/legend.js',
        'line': './src/charts/line.js',
        'tooltip': './src/charts/tooltip.js'
    },

    plugins = [],
    outputFile,
    config;


// Set up minification for production
if (isProduction) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = projectName + '.min.js';
}

config = {

    // Transpiles files into dist/charts to use in demos
    dev: {
        // allows webpack to determine where your app begins execution, and it creates chunks out of it
        entry:  currentCharts,

        devtool: 'source-map',

        // tells webpack what to name your files after the build process, and where to place them
        output: {
            path:     'dist/charts',
            filename: '[name].js',
            libraryTarget: 'umd'
        },

        externals: {
            d3: 'd3',
            underscore: '_'
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules)/
                }
            ],

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

        plugins: plugins
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
                    exclude: /(bower_components|node_modules)/,
                    loader: 'babel',
                    query: {
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.js?$/,
                    include: /src/,
                    exclude: /(node_modules|bower_components|__tests__)/,
                    loader: 'babel-istanbul',
                    query: {
                        cacheDirectory: true,
                    },
                }
            ],

            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules)/
                }
            ]
        },
        plugins: plugins
    },

    // Creates a bundle with all britecharts
    prod: {
        entry:  currentCharts,

        devtool: 'source-map',

        output: {
            path:     'dist/bundled',
            filename: outputFile,
            libraryTarget: 'umd'
        },

        externals: {
            d3: 'd3',
            underscore: '_'
        },

        module: {

            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules)/
                }
            ],

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

        plugins: plugins
    },

    // Creates minified versions of each chart
    prodDiv: {
        entry:  currentCharts,

        devtool: 'source-map',

        output: {
            path:     'dist/umd',
            filename: '[name].min.js',
            libraryTarget: 'umd'
        },

        externals: {
            d3: 'd3',
            underscore: '_'
        },

        module: {

            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules)/
                }
            ],

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

        plugins: plugins
    }
};


module.exports = config[env];
