module.exports = function (grunt) {
    'use strict';

    const sass = require('node-sass');

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
    });
};
