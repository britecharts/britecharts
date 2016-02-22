var webpack = require('webpack'),
    path = require('path'),
    chartModulesPath = path.resolve('./src/charts'),
    fixturesPath = path.resolve('./test/fixtures');

var config = {
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
    plugins: [
    ],
    resolve: {
        root: [chartModulesPath, fixturesPath]
    }
};

module.exports = config;
