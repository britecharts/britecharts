var webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'inline-source-map';

// Karma configuration
module.exports = function(config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-jquery', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'tests_index.js',
            {pattern: 'test/fixtures/*.html', watched: true, served: true, included: false},
            './node_modules/phantomjs-polyfill-find/find-polyfill.js'
        ],


        // list of files to exclude
        exclude: [
            'node_modules/**/*spec*',
            'node_modules/**/*Spec*'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests_index.js': ['webpack', 'sourcemap', 'coverage'],
        },

        // Coverage reporter options, check more in:
        // https://github.com/karma-runner/karma-coverage
        coverageReporter: {
            type: 'text'
        },

        webpack: webpackConfig('test'),

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-jasmine-jquery'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader')
        ],

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
        reporters: ['progress', 'coverage'],


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
        // possible values: 'PhantomJS', 'Chrome'
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
