module.exports = function(grunt) {
    'use strict';

    var shell = require('shelljs');
    var path = require('path');

    grunt.renameTask('release', 'bump-version');
    grunt.config.set('bump-version', {
        'options': {
            additionalFiles: ['bower.json'],
            commitMessage: 'Bumped Project to <%= version %>',
            changelog: true, //default: false
            changelogText: '<%= version %>\n',
            bump: true,
            file: 'package.json',
            add: true,
            commit: true,
            tag: true,
            push: true,
            pushTags: true,
            npm: false,
            npmtag: false
        }
    });

    grunt.registerTask('publish', 'Publish package to reggie', function() {

        var pkg = grunt.file.readJSON('package.json'),
            cmd = './node_modules/reggie/client.js -u ' + pkg.publishConfig.registry + ' publish';

        if (grunt.option('no-write')) {
            grunt.log.ok('---DRY-RUN----');
            grunt.log.ok(cmd);
        } else {
            grunt.log.ok(cmd);
            shell.exec(cmd);
        }
        grunt.log.ok('Published to Reggie');
    });

    grunt.registerTask('release', function() {

        var bumpTask = 'bump-version' + Array.prototype.slice.call(arguments).map(function(val) {
            return ':' + val;
        });

        grunt.task.run(bumpTask);
        // grunt.task.run(bumpTask, 'publish', 'bump-dist');
    });

    grunt.registerTask('bump-dist', function() {
        shell.exec(path.resolve(__dirname, './helpers/push_dist.sh'));
    });

    grunt.registerTask('untrack', function() {
        shell.exec(path.resolve(__dirname, './helpers/untrack.sh'));
    });
};
