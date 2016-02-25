var webpack = require('webpack'),
    path = require('path'),

    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,

    env = process.env.WEBPACK_ENV, // dev | build
    isProduction = env === 'prod',
    isDevelopment = env === 'dev',

    chartModulesPath = path.resolve('./src/charts'),
    fixturesPath = path.resolve('./test/fixtures'),
    vendorsPath = path.resolve('./node_modules'),

    projectName = 'britecharts',

    plugins = [],
    outputFile,
    config;


// Set up minification for production
if (isProduction) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = projectName + '.min.js';
} else {
    outputFile = projectName + '.js';
}

config = {

    dev: {
        // allows webpack to determine where your app begins execution, and it creates chunks out of it
        entry:  {
            'bar': './src/charts/bar.js',
            'donut': './src/charts/donut.js',
            'legend': './src/charts/legend.js',
            'line': './src/charts/line.js',
            'tooltip': './src/charts/tooltip.js'
        },

        devtool: 'source-map',

        // tells webpack what to name your files after the build process, and where to place them
        output: {
            path:     'dist/umd',
            filename: '[name].js',
            libraryTarget: 'umd'
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

    // TODO: Check if this is actually right
    prod: {
        entry:  './src/charts/bar.js',
        devtool: 'source-map',
        resolve: {
            alias: {
                d3: vendorsPath + '/d3'
            }
        },
        output: {
            path:     'dist/bundled',
            filename: outputFile,
            libraryTarget: 'umd'
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
        plugins: plugins
    }
};

if (isDevelopment) {
}

module.exports = config[env];
