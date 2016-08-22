module.exports = function (grunt) {
    'use strict';

    var distFiles = [
            {
                expand: true,
                cwd: 'src/styles/',
                src: ['*.scss'],
                dest: './dist/css',
                ext: '.css'
            }
        ],
        devFiles = [
            {
                expand: true,
                cwd: 'src/styles/',
                src: ['*.scss'],
                dest: './demos/css',
                ext: '.css'
            }
        ];

    grunt.config.set('sass', {
        dev: {
            options: {
                style: 'expanded'
            },
            files: devFiles
        },
        dist: {
            options: {
                style: 'expanded'
            },
            files: distFiles
        }
    });
};
