module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.config.set('jsdoc', {
      dist : {
          src: ['./src/charts/*.js'],
          jsdoc: './node_modules/.bin/jsdoc',
          options: {
              destination: 'docs',
              configure: './node_modules/jsdoc/conf.json',
              template: './node_modules/ink-docstrap/template'
          }
      }
  });
  grunt.loadNpmTasks( 'grunt-jsdoc' );
  grunt.registerTask('docs', 'jsdoc:dist');
};
