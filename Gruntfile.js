module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt, { pattern: [
        'grunt-*'
    ]});

    grunt.loadTasks('src/tasks');
};
