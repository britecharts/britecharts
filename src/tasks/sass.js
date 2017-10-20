module.exports = function (grunt) {
    'use strict';

    var distFiles = [
            // Main bundle with all the styles on the library
            {
                expand: true,
                cwd: 'src/styles/',
                src: ['britecharts.scss'],
                dest: './dist/css',
                ext: '.css'
            },
            // Common bundle including axes and gridlines
            // specified on common.scss
            {
                expand: true,
                cwd: 'src/styles/',
                src: ['common.scss'],
                dest: './dist/css/common/',
                ext: '.css'
            },
            // Individual styles for each chart
            {
                expand: true,
                cwd: 'src/styles/charts',
                src: ['*.scss'],
                dest: './dist/css/charts',
                ext: '.css'
            }
        ],
        devFiles = [
            {
                expand: true,
                cwd: 'src/styles/',
                src: ['britecharts.scss'],
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
