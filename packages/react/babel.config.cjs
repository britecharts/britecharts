// preset-env reads its target from the browserslist field in package.json.
// forceAllTransforms used to override that with an always-ES5 target; at the
// current browserslist (H26) that downlevelled everything for nothing, since
// JSX is the only thing this build still needs Babel for.
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
