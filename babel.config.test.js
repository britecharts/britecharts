/**
 * Babel config used by Jest across every package.
 *
 * Tests import sibling workspaces by source (see the moduleNameMapper in each
 * package's jest.config.js). Babel only applies a package.json#babel or
 * .babelrc config to files inside the package it was invoked from, so when
 * @britecharts/wrappers pulls in @britecharts/core's source, core's own config
 * does not apply and the ES modules arrive untransformed.
 *
 * Passing this file to babel-jest as an explicit `configFile` sidesteps that:
 * one config, applied to every file in every package, independent of where the
 * test run started. The per-package Babel configs still drive the builds.
 */
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { node: 'current' },
            },
        ],
        '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
};
