// Karma configuration
// Generated on Sun May 10 2015 18:32:15 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],
    // , 'traceur-compiler-requirejs'

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/require_config.js', included: true },
      'test-main.js',
      {pattern: 'jasmine*.js', included: false},
      {pattern: 'dist/**/*.js', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'node_modules/**/*.js', included: false, watched: false},
      {pattern: 'test/**/*.spec.js', watched: true, included: false},
      {pattern: 'test/fixtures/*.js', watched: true, served: true, included: false},
      {pattern: 'test/fixtures/*.html', watched: true, served: true, included: false},
      {pattern: 'test/fixtures/*.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [
        'node_modules/**/*spec*',
        'node_modules/**/*Spec*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'test/specs/*.spec.js': ['babel']
    },

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


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
