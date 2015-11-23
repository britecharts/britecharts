module.exports = function(grunt) {
    'use strict';

    var port = grunt.option('port') || 8000;


    // We set here the default page for the server
    // Small server configuration.
    grunt.config.set('connect', {
        docs : {
            options: {
                port: port,
                base: './',
                open: {
                    target: 'http://localhost:' + port + '/docs/index.html' // target url to open
                },
                keepalive: true
            }
        }
    });
};
