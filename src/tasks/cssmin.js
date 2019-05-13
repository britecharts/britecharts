module.exports = function (grunt, configOptions) {
    'use strict';

    const distFiles = [
        // Main bundle with all the styles on the library
        {
            expand: true,
            cwd: './dist/css',
            src: ['britecharts.css', '!britecharts.min.css'],
            dest: './dist/css',
            ext: '.min.css'
        },
        // Common bundle including axes and gridlines
        // specified on common.scss
        {
            expand: true,
            cwd: './dist/css/common',
            src: ['common.css', '!common.min.css'],
            dest: './dist/css/common/',
            ext: '.min.css'
        },
        // Individual styles for each chart
        {
            expand: true,
            cwd: './dist/css/charts',
            src: ['*.css', '!*.min.css'],
            dest: './dist/css/charts',
            ext: '.min.css'
        }
    ];

    grunt.config.set('cssmin', {
        dist: {
            files: distFiles
        }
    });
};
