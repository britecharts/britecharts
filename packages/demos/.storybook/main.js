module.exports = {
    stories: ['../src/*.stories.[tj]s'],
    addons: [],

    // Reference: Storybook composition: https://storybook.js.org/docs/react/sharing/storybook-composition
    refs: (_, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                core: {
                    title: 'Britecharts Core',
                    url: 'http://localhost:1111',
                },
                react: {
                    title: 'Britecharts React',
                    url: 'http://localhost:2222',
                },
            };
        }
        return {
            core: {
                title: 'Britecharts Core',
                url: 'https://63e47b02f004ed290364764f-dmivwchyrh.chromatic.com',
            },
            react: {
                title: 'Britecharts React',
                url: 'http://localhost:2222',
            },
        };
    },
};
