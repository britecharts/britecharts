module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.config.set('jsdoc', {
        dist : {
            src: ['./src/charts/*.js'],
            jsdoc: './node_modules/.bin/jsdoc',
            options: {
                destination: 'docs',
                configure: 'src/doc/jsdoc.conf.json',
                template: 'src/doc/template',
                tutorials: 'demos'
            }
        }
    });

    grunt.registerTask('docs', 'Generates docs and triggers server to view them', [
        'jsdoc:dist',
        'connect:docs'
    ]);
};
