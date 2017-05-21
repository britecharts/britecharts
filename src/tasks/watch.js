module.exports = function(grunt) {
    'use strict';

    grunt.config.set('watch', {
        scripts: {
            files: '<%= sync.scripts.src %>',
            tasks: ['sync:scripts']
        },
        styles: {
            files: '<%= sync.styles.src %>',
            tasks: ['sync:styles']
        },
         fonts: {
            files: '<%= sync.fonts.src %>',
            tasks: ['sync:fonts']
        },
         manifest: {
            files: '<%= sync.manifest.src %>',
            tasks: ['sync:manifest']
        },
        demos:{
            files:['demos/*.html'],
            tasks: ['jsdoc:dist']
        },
        tmpl:{
            files:['src/doc/template/tmpl/*.tmpl'],
            tasks: ['jsdoc:dist']
        },
        json:{
            files:['demos/*.json'],
            tasks: ['jsdoc:dist']
        }
    });
}
