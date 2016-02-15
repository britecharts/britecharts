module.exports = function(grunt) {
    'use strict';

    grunt.config.set('babel', {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/charts/',
          src: ['*.js'],
          dest: 'dist/charts/'
        }]
      }
    });
};
