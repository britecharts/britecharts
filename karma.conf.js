let webpackConfig = require('./webpack.config');

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
        'tests_index.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/charts/*.js': ['coverage'],
        'tests_index.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig('test'),

    webpackServer: {
        noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],

    // Coverage reporter options, check more in:
    // https://github.com/karma-runner/karma-coverage
    coverageReporter: {
        type: 'text',
        dir: 'coverage/',
        reporters: [
            { type: 'text' },
            { type: 'text-summary', subdir: '.', file: 'coverage-summary.txt' }
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests_index.js': ['webpack', 'sourcemap', 'coverage'],
        },

        // Coverage reporter options, check more in:
        // https://github.com/karma-runner/karma-coverage
        coverageReporter: {
            type: 'text',
            dir: 'stats/testCoverage/',
            reporters: [
                {type: 'text'},
                {type: 'text-summary', subdir: '.', file: 'text-summary.txt'}
            ],
            check: {
                global: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: [
                        'tests_index.js',
                        'src/charts/helpers/export.js',
                        'src/charts/helpers/date.js',
                        'src/charts/helpers/filter.js'
                    ]
                }
            }
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

        check: {
            global: {
                excludes: [
                    'src/tests.webpack.js',
                ]
            }
        }
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
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
