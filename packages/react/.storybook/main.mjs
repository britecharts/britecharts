import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * No package manager reliably hoists a workspace's Storybook packages to the
 * root -- pnpm's isolated node_modules never does -- and Storybook resolves
 * presets relative to its own install rather than to this config -- so a
 * nested copy fails with "Cannot find module .../preset". Naming them by
 * absolute path makes resolution start here instead, which is what
 * Storybook's own monorepo setup generates.
 */
const getAbsolutePath = (value) =>
    dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));

export default {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {
            builder: { viteConfigPath: '.storybook/vite.config.mjs' },
        },
    },
    addons: [
        getAbsolutePath('@storybook/addon-docs'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-links'),
    ],
    // The docs site's brand assets, so the sidebar logo and the favicon are
    // literally the same files the documentation uses.
    staticDirs: [{ from: '../../docs/static/img', to: '/img' }],
    managerHead: (head) =>
        `${head}<link rel="icon" href="img/icons/favicon.ico" />`,
    core: {
        disableTelemetry: true,
    },
};
