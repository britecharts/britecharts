const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lunrSearch = require.resolve('docusaurus-lunr-search');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'Britecharts',
    tagline: 'Build stunning D3.js-powered interactive charts with little code',
    url: 'https://britecharts.github.io',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/icons/favicon.ico',
    organizationName: 'britecharts',
    projectName: 'britecharts.github.io', // Usually your repo name.
    trailingSlash: false,

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/britecharts/britecharts/edit/main/website/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/britecharts/britecharts/edit/main/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                logo: {
                    alt: 'Britecharts Logo',
                    src: 'img/brand/britecharts-logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'Britecharts',
                        position: 'left',
                        label: 'Documentation',
                    },
                    {
                        type: 'doc',
                        docId: 'API/bar',
                        position: 'left',
                        label: 'API Reference',
                    },
                    {
                        type: 'doc',
                        docId: 'storybook',
                        position: 'left',
                        label: 'StoryBook',
                    },
                    {
                        to: '/blog',
                        label: 'Blog',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/britecharts/britecharts',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'light',
                links: [
                    {
                        title: 'Documentation',
                        items: [
                            {
                                label: 'Getting Started',
                                to: '/docs/tutorials/getting-started',
                            },
                            {
                                label: 'API Reference',
                                to: '/docs/API/bar',
                            },
                            {
                                label: 'How-to Guides',
                                to: '/docs/how-tos/how-to-index',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/britecharts',
                            },
                            {
                                label: 'Slack',
                                href: 'https://slack.com/app_redirect?channel=C7DHB2E72',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/britecharts',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/britecharts/britecharts',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Britecharts`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),

    plugins: [lunrSearch],
};
