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


    // Move demos code
    grunt.registerTask('moveDemos', 'Move demos code into /docs', function() {
        var copyJSCommand = 'cp -r demos/build/* docs/scripts/.';
        var copyStylesCommand = 'cp -r demos/css/* docs/styles/.';

        shell.exec(copyJSCommand);
        shell.exec(copyStylesCommand);
    });

    // Move fonts and more
    grunt.registerTask('moveFonts', 'Move demos code into /docs', function() {
        var copyFontsCommand = 'cp -r src/doc/template/static/fonts/* docs/fonts/.';
        var copyManifestCommand = 'cp -r src/doc/template/manifest.json docs/.';

        shell.exec(copyFontsCommand);
        shell.exec(copyManifestCommand);
    });

    grunt.registerTask('docs', 'Generates docs and triggers server to view them', [
        'jsdoc:dist',
        'moveDemos',
        'moveFonts'
    ]);
};
