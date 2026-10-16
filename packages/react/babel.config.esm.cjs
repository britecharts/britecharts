// The ESM build only, used by `build:esm` through --config-file.
//
// babel.config.cjs cannot serve this: it carries preset-env, which rewrites the
// modules to CommonJS, and a project-wide config is not disabled by
// --no-babelrc. Passing the presets as CLI flags does not help either, since
// the project config is still loaded and merged into them.
//
// Presets apply last-to-first, so preset-typescript strips the types before
// preset-react sees the JSX. There is no preset-env on purpose: the output
// keeps the syntax it was written in and stays ESM, as core's and wrappers'
// ESM builds do. A consumer's own bundler targets its own browsers.
module.exports = {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
};
