// Karma configuration
// Generated on Thu Aug 17 2023 09:44:31 GMT+0300 (שעון ישראל (קיץ))

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
        frameworks: ['jasmine', 'webpack'],

        // list of files / patterns to load in the browser
        files: [{ pattern: './test/tests_index.js', watch: false }],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {
            './test/tests_index.js': ['webpack', 'sourcemap'],
        },

        webpack: {},

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
            'karma-webpack',
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-sourcemap-loader',
        ],

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
        // how many browser instances should be started simultaneously
        concurrency: Infinity,

        customLaunchers: {
            ChromeHeadlessCustom: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
    });
};
