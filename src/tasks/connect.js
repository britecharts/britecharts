module.exports = function(grunt) {
    'use strict';

    var port = grunt.option('port') || 8000;


    // We set here the default page for the server
    // Small server configuration.
    grunt.config.set('connect', {
        server : {
            options: {
                port: port,
                base: './',
                open: {
                    target: 'http://localhost:' + port + '/demos/index.html' // target url to open
                },
                keepalive: true
            }
        }
    });

    grunt.registerTask('server', 'connect:server');
    grunt.registerTask('demos', 'connect:server');
};
