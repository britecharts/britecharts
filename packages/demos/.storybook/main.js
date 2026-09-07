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
    stories: ['../src/**/*.mdx', '../src/*.stories.[tj]s'],
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
    // The docs site's brand assets, so the sidebar logo and the favicon are
    // literally the same files the documentation uses.
    staticDirs: [{ from: '../../docs/static/img', to: '/img' }],
    managerHead: (head) =>
        `${head}<link rel="icon" href="/img/icons/favicon.ico" />`,
    core: {
        disableTelemetry: true,
    },

    // Reference: https://storybook.js.org/docs/sharing/storybook-composition
    refs: (_, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                core: {
                    title: 'Britecharts Core',
                    url: 'http://localhost:2001',
                },
                react: {
                    title: 'Britecharts React',
                    url: 'http://localhost:2002',
                },
            };
        }

        return {
            core: {
                title: 'Britecharts Core',
                url: 'https://main--63e47b02f004ed290364764f.chromatic.com',
            },
            react: {
                title: 'Britecharts React',
                url: 'https://main--63e48c5ee9db838c66d19aae.chromatic.com',
            },
        };
    },
};
