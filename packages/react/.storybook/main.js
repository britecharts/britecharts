// Storybook runs its own webpack 4 instance, which never loads this
// package's webpack.config.js -- so the md4 shim has to be applied here too.
require('../../../scripts/patch-webpack4-md4');

const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    // Storybook only serves stories.json behind this flag, and the demos
    // package composes this Storybook as a ref -- without it the nested
    // Storybook shows up empty.
    features: {
        buildStoriesJson: true,
    },
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-a11y',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    webpackFinal: async (config) => {
        // The preview pulls in the core package's Sass source, which lives
        // outside this package, so the rule has to cover both.
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        // These styles still use @import, global built-ins and
                        // desaturate(); sass-loader 10 also uses the legacy JS
                        // API. Migrating is tracked separately -- until then,
                        // silence the warnings rather than print several
                        // hundred lines on every build.
                        sassOptions: {
                            silenceDeprecations: [
                                'import',
                                'global-builtin',
                                'color-functions',
                                'legacy-js-api',
                            ],
                        },
                    },
                },
            ],
            include: [
                path.resolve(__dirname, '../'),
                path.resolve(__dirname, '../../core'),
            ],
        });

        return config;
    },
};
