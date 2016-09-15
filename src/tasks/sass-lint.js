module.exports = function (grunt) {
    'use strict';

    grunt.config.set('sasslint', {
        options: {
            configFile: '.sass-lint.yml'
        },
        target: ['./src/styles/**/*.scss']
    });

    grunt.registerTask('lint', [
        'sasslint'
    ]);
}
