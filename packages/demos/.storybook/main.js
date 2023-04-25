module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/*.stories.[tj]s'],
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-a11y',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],

    // Reference: Storybook composition: https://storybook.js.org/docs/react/sharing/storybook-composition
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
