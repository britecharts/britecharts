module.exports = function(grunt) {
    'use strict';

    grunt.config.set('watch', {
        scripts: {
            files: ['demos/**/*'],
            tasks: ['moveDemos']
        }, 
        readme: {
            files: ['README.md'],
            tasks: ['jsdoc:dist']
        },
    });
}
