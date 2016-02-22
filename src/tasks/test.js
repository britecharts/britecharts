module.exports = function(grunt) {
    'use strict';

    // grunt-karma configuration.
    grunt.config.set('karma', {
        unit: {
            configFile: 'karma.conf.js',
            autoWatch: true
        }
    });

    grunt.registerTask('test', 'Run the unit tests of the charts', [
        'karma:unit'
    ]);
};
