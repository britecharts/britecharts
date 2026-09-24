// preset-env reads its target from the browserslist field in package.json.
// forceAllTransforms used to override that with an always-ES5 target; at the
// current browserslist (H26) that downlevelled everything for nothing, since
// JSX is the only thing this build still needs Babel for.
module.exports = {
    presets: ['@babel/preset-react', '@babel/preset-env'],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};
