const path = require('path');

/**
 * No package manager reliably hoists a workspace's Storybook packages to the
 * root -- pnpm's isolated node_modules never does, and Yarn didn't always either
 * -- and
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
    ],
    docs: {
        autodocs: 'tag',
    },
    // The docs site's brand assets, so the sidebar logo and the favicon are
    // literally the same files the documentation uses.
    staticDirs: [{ from: '../../docs/static/img', to: '/img' }],
    managerHead: (head) =>
        `${head}<link rel="icon" href="img/icons/favicon.ico" />`,
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
                        sassOptions: {
                            // sass-loader 10 uses the legacy JS API, which
                            // Dart Sass 2 removes. Moving off it needs
                            // webpack 5, so it goes with Vite.
                            silenceDeprecations: ['legacy-js-api'],
                        },
                    },
                },
            ],
            include: [path.resolve(__dirname, '../')],
        });

        return config;
    },
};
