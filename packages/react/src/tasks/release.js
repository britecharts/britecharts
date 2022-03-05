/* eslint-disable import/no-commonjs */
module.exports = function (grunt) {
    grunt.renameTask('release', 'bump-version');
    grunt.config.set('bump-version', {
        options: {
            commitMessage: 'Bumped Project to <%= version %>',
            changelog: true,
            changelogText: '<%= version %>\n',
            bump: true,
            file: 'package.json',
            add: true,
            commit: true,
            tag: true,
            push: true,
            pushTags: true,
            npm: false,
            npmtag: false,
        },
    });

    grunt.registerTask('release', (...args) => {
        const bumpTask = `bump-version${args.map((val) => `:${val}`)}`;

        grunt.task.run(bumpTask);
    });
};
