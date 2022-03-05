/* eslint-disable import/no-commonjs */
module.exports = function (grunt) {
    grunt.config.set('shell', {
        cleanNodeModules: {
            command: () => 'rm -rf node_modules',
        },
    });
};
