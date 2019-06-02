let webpackConfig = require('./webpack.config')('testES6');

// webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

// Karma configuration
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
        // 'tests_index_es6.js'
    //   'src/es6charts/donut.js',
    //   'test/fixturesES6/*.js',
    //   'test/specsES6/*.spec.js',
        // { pattern: 'test/specsES6/*.spec.js', watched: false }
        'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
        { pattern: 'src/es6charts/donut.js', watched: false },
        { pattern: 'test/specsES6/donut.spec.js', watched: false }
    ],
    // list of files / patterns to exclude
    exclude: [
        'node_modules/**/*spec*',
        'node_modules/**/*Spec*'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    },
    plugins: [
        require('karma-webpack'),
        ('karma-jasmine'),
        ('karma-jasmine-jquery'),
        ('karma-coverage'),
        ('karma-chrome-launcher'),
        ('karma-babel-preprocessor'),
        ('karma-phantomjs-launcher'),
        ('karma-sourcemap-loader')
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/es6charts/donut.js': ['webpack'],
        'test/specsES6/*.spec.js': ['babel'],
        // 'tests_index_es6.js': ['webpack'],
        // 'tests_index_es6.js': ['webpack', 'sourcemap', 'coverage'],
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Setup of babel settings
    // Check more in: https://github.com/babel/karma-babel-preprocessor
    babelPreprocessor: {
        options: {
            presets: ['es2015']
        }
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
