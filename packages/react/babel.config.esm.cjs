// The ESM build only, used by `build:esm` through --config-file.
//
// Presets apply last-to-first, so preset-typescript strips the types before
// preset-react sees the JSX. There is no preset-env on purpose: the output
// keeps the syntax it was written in and stays ESM, as core's and wrappers'
// ESM builds do. A consumer's own bundler targets its own browsers.
//
// The classic JSX runtime, which Babel 8 no longer defaults to: the automatic
// one imports `react/jsx-runtime`, which React only ships from 16.14, and the
// package supports React from 16.8.
//
// onlyRemoveTypeImports: false keeps Babel 7's elision, which Babel 8 turned
// off by default: an import used only as a type, or not at all, is dropped
// rather than asked of a module that has no such export at run time.
module.exports = {
    presets: [
        ['@babel/preset-react', { runtime: 'classic' }],
        ['@babel/preset-typescript', { onlyRemoveTypeImports: false }],
    ],
};
