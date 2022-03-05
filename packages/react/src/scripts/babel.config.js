/* eslint-disable import/no-commonjs */
// Duplicated with ../.babelrc for now.
const baseConfig = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 2 versions', 'ie >= 10'],
                },
                forceAllTransforms: true,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};

module.exports = (type) =>
    ({
        es: {
            babelrc: false,
            presets: ['@babel/preset-react'],
            plugins: baseConfig.plugins,
        },
    }[type] ||
    (() => {
        throw new Error(`Unsupported type for babel ${type}`);
    })());
