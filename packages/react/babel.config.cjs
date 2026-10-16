// preset-env reads its target from the browserslist field in package.json,
// so it only downlevels what those browsers lack. Forcing an ES5 target would
// downlevel everything for nothing.
module.exports = {
    // Presets apply last-to-first, so preset-typescript strips the types
    // before preset-react sees the JSX. It keys off the file extension, so
    // .ts and .tsx are each parsed correctly with no further configuration.
    presets: [
        '@babel/preset-react',
        '@babel/preset-env',
        '@babel/preset-typescript',
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};
