const path = require('path');

/**
 * Yarn does not always hoist a workspace's Storybook packages to the root, and
 * Storybook resolves presets relative to its own install rather than to this
 * config -- so a nested copy fails with "Cannot find module .../preset". Naming
 * them by absolute path makes resolution start here instead, which is what
 * Storybook's own monorepo setup generates.
 */
const getAbsolutePath = (value) =>
    path.dirname(require.resolve(path.join(value, 'package.json')));

module.exports = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.[tj]s'],
    framework: {
        name: getAbsolutePath('@storybook/html-webpack5'),
        options: {},
    },
    addons: [
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-interactions'),
    ],
    docs: {
        autodocs: 'tag',
    },
    core: {
        disableTelemetry: true,
    },
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        // These styles still use @import, global built-ins and
                        // desaturate(); sass-loader also uses the legacy JS API.
                        // Migrating is tracked separately -- until then, silence
                        // the warnings rather than print several hundred lines
                        // on every build.
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
            include: [path.resolve(__dirname, '../')],
        });

        return config;
    },
};
