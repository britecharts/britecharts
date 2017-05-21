module.exports = function(grunt) {
    'use strict';

    grunt.config.set('sync', {
        scripts: {
            src: ['demos/build/*.js'],
            dest: 'docs/scripts/'
        },
        styles:{
             src: ['demos/css/*.css'],
            dest: 'docs/styles/'
        },
        fonts:{
             src: ['src/doc/template/static/fonts/*'],
            dest: 'docs/fonts/'
        },
        manifest:{
            src: ['src/doc/template/manifest.json'],
            dest: 'docs/'
        }
    });
}
