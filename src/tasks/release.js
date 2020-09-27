module.exports = function(grunt) {
    'use strict';

    const shell = require('shelljs');
    const path = require('path');

    const RELEASE_TASK_NAME = 'bump-version';

    grunt.renameTask('release', RELEASE_TASK_NAME);

    grunt.config.set(RELEASE_TASK_NAME, {
        'options': {
            commitMessage: 'Bumped Project to <%= version %>',
            changelog: true, //default: false
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
        const bumpTask = [...arguments].reduce(
            (accum, val) => accum + `:${val}`
        , RELEASE_TASK_NAME);

        grunt.task.run(bumpTask);
    });
};
