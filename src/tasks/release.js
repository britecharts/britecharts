module.exports = function(grunt) {
    'use strict';

    var shell = require('shelljs');
    var path = require('path');

    grunt.renameTask('release', 'bump-version');

    grunt.config.set('bump-version', {
        'options': {
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

    grunt.registerTask('release', function() {
        var bumpTask = 'bump-version' + Array.prototype.slice.call(arguments).map(function(val) {
            return ':' + val;
        });

        grunt.task.run(bumpTask);
    });

    grunt.registerTask('bump-dist', function() {
        shell.exec(path.resolve(__dirname, './helpers/push_dist.sh'));
    });

    grunt.registerTask('untrack', function() {
        shell.exec(path.resolve(__dirname, './helpers/untrack.sh'));
    });
};
