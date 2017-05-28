module.exports = function(grunt) {
    'use strict';

    grunt.config.set('watch', {
        readme: {
            files: ['README.md'],
            tasks: ['jsdoc:dist']
        },
        styles:{
            files:['demos/css/**'],
            tasks:['sync:fonts']
        },
        fonts:{
            files:['src/doc/template/static/fonts/**'],
            tasks:['sync:fonts']
        },
        manifest:{
            files:['src/doc/template/manifest.json'],
            tasks:['sync:manifest']
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
