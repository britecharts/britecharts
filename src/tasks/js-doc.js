module.exports = function(grunt) {
    'use strict';

    var shell = require('shelljs');

    // Project configuration.
    grunt.config.set('jsdoc', {
        dist : {
            src: ['./src/charts/*.js'],
            jsdoc: './node_modules/.bin/jsdoc',
            options: {
                destination: 'docs',
                configure: 'src/doc/jsdoc.conf.json',
                template: 'src/doc/template',
                tutorials: 'demos'
            }
        }
    });

    // Open docs
    grunt.registerTask('openDocs', 'Open docs page on browser', function() {
        var cmd = 'open http://localhost:8001/docs/';

        shell.exec(cmd);
    });

    grunt.registerTask('docs', 'Generates docs and triggers server to view them', [
        'jsdoc:dist',
        'openDocs'
    ]);
};
