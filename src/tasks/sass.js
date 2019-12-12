module.exports = function (grunt) {
    'use strict';

    const sass = require('node-sass');

    const distFiles = [
        // Main bundle with all the styles on the library
        {
            expand: true,
            cwd: 'src/styles/',
            src: ['britecharts.scss'],
            dest: './dist/css',
            ext: '.css',
        },
        // Common bundle including axes and gridlines
        // specified on common.scss
        {
            expand: true,
            cwd: 'src/styles/',
            src: ['common.scss'],
            dest: './dist/css/common/',
            ext: '.css',
        },
        // Individual styles for each chart
        {
            expand: true,
            cwd: 'src/styles/charts',
            src: ['*.scss'],
            dest: './dist/css/charts',
            ext: '.css',
        },
    ];
    const devFiles = [
        {
            expand: true,
            cwd: 'src/styles/',
            src: ['britecharts.scss'],
            dest: './demos/css',
            ext: '.css',
        },
    ];

    grunt.config.set('sass', {
        dev: {
            options: {
                implementation: sass,
                style: 'expanded',
            },
            files: devFiles,
        },
        dist: {
            options: {
                implementation: sass,
                style: 'expanded',
            },
            files: distFiles,
        },
    });
};
