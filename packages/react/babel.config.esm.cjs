// The ESM build only, used by `build:esm` through --config-file.
//
// Presets apply last-to-first, so preset-typescript strips the types before
// preset-react sees the JSX. There is no preset-env on purpose: the output
// keeps the syntax it was written in and stays ESM, as core's and wrappers'
// ESM builds do. A consumer's own bundler targets its own browsers.
module.exports = {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
};
