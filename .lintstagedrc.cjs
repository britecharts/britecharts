// The functions below ignore the staged file list lint-staged would
// otherwise append to each command, and always run the whole-repo scripts
// instead -- these lint/format the whole tree on any staged JS/SCSS change,
// they don't take a file-scoped mode.
//
// This has to be a JS file, not the "lint-staged" key in package.json: JSON
// can't hold a function, and a plain string command still gets the staged
// paths appended. That used to be harmless under Yarn, whose `workspaces
// foreach` drops trailing arguments it doesn't understand, but pnpm's `-r`
// forwards them to every package's script -- so a JS file staged outside
// packages/core (a root script, another package's file) was linted a
// second time under core's own eslint config and its stricter rules
// (no-console, single quotes) failed on files that were never meant to run
// through it.
module.exports = {
    '*.js': [() => 'pnpm run lint:js', () => 'pnpm run format'],
    '*.scss': () => 'pnpm run lint:styles',
};
