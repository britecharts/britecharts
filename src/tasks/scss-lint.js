module.exports = function (grunt) {
    'use strict';

    grunt.config.set('scsslint', {
        allFiles: [
          './src/styles/**/*.scss'
        ],
        options: {
          config: '.scss-lint.yml',
          colorizeOutput: true
        }
    });

    grunt.registerTask('lint', [
        'scsslint'
    ]);
};
