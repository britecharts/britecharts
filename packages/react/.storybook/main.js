// Storybook runs its own webpack 4 instance, which never loads this
// package's webpack.config.js -- so the md4 shim has to be applied here too.
require('../../../scripts/patch-webpack4-md4');

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
};
