module.exports = function(grunt) {
    'use strict';

    grunt.config.set('sync', {
        scripts: {
            files:[{
                cwd:'demos/build/',
                src: ['**'],
                dest: 'docs/scripts/'
            }],
            verbose: true
        },
        helpers: {
            files:[{
                cwd:'demos/helpers/',
                src: ['**'],
                dest: 'docs/scripts/'
            }],
            verbose: true
        },
        styles:{
            files:[{
                cwd:'demos/css/',
                src: ['**'],
                dest: 'docs/styles/'
            }],
            verbose: true
        },
        fonts:{
            files:[{
                cwd:'src/doc/template/static/fonts/',
                src: ['**'],
                dest: 'docs/fonts/'
            }],
            verbose: true
        },
        manifest:{
            files:[{
                cwd:'src/doc/template/',
                src: ['manifest.json'],
                dest: 'docs/'
            }],
            verbose: true
        }
    });
}
