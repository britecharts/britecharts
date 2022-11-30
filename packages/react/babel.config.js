const path = require('path');

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
    plugins: [
        '@babel/plugin-proposal-class-properties',
        [
            'babel-plugin-module-resolver',
            {
                alias: {
                    '@britecharts/wrappers': path.resolve(
                        __dirname,
                        './../wrappers/dist/cjs/bundle/wrappers.bundled.min.js'
                    ),
                },
            },
        ],
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};
