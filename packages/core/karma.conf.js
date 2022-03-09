let webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'inline-source-map';

// Karma configuration
module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: ['./test/tests_index.js'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './test/tests_index.js': ['webpack', 'sourcemap'],
        },

        webpack: webpackConfig('test'),

        webpackServer: {
            noInfo: true,
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'coverage'],

        // Coverage reporter options, check more in:
        // https://github.com/karma-runner/karma-coverage
        coverageReporter: {
            type: 'text',
            reporters: [
                { type: 'lcov', subdir: '.coverage' },
                { type: 'text' },
            ],
            check: {
                global: {
                    statements: 75,
                    branches: 75,
                    functions: 75,
                    lines: 75,
                    excludes: [
                        'tests_index.js',
                        'src/charts/helpers/export.js',
                        'src/charts/helpers/date.js',
                        'src/charts/helpers/filter.js',
                        '*DataBuilder.js',
                    ],
                },
            },
        },

        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader'),
        ],

        // Setup of babel settings
        // Check more in: https://github.com/babel/karma-babel-preprocessor
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
            },
        },

        check: {
            global: {
                excludes: ['src/tests.webpack.js'],
            },
        },

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
        browsers: ['Chrome', 'ChromeHeadless'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        customLaunchers: {
            ChromeHeadlessCustom: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
    });
};