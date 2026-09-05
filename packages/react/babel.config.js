const path = require('path');

// Jest sets NODE_ENV=test. Under test the specs resolve @britecharts/wrappers
// through jest.config.js's moduleNameMapper, which points at the sibling
// package's source; rewriting the specifier here would pre-empt that and
// re-introduce the dependency on `yarn build:wrappers` having run.
const isTest = process.env.NODE_ENV === 'test';

const resolveWrappersToBuiltBundle = [
    'babel-plugin-module-resolver',
    {
        alias: {
            '@britecharts/wrappers': path.resolve(
                __dirname,
                './../wrappers/dist/cjs/bundle/wrappers.bundled.min.js'
            ),
        },
    },
];

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
        ...(isTest ? [] : [resolveWrappersToBuiltBundle]),
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};
