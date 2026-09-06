module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                forceAllTransforms: true,
            },
        ],
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};
