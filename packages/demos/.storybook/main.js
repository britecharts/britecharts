module.exports = {
    stories: ['../src/*.stories.[tj]s'],
    addons: [],

    // Reference: Storybook composition: https://storybook.js.org/docs/react/sharing/storybook-composition
    refs: (_, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                core: {
                    title: 'Britecharts Core',
                    url: 'http://localhost:1001',
                },
                react: {
                    title: 'Britecharts React',
                    url: 'http://localhost:1002',
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
