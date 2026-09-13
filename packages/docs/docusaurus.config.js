const { themes: prismThemes } = require('prism-react-renderer');
const lunrSearch = require.resolve('docusaurus-lunr-search');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'Britecharts',
    tagline: 'Build stunning D3.js-powered interactive charts with little code',
    url: 'https://britecharts.github.io',
    baseUrl: '/britecharts/',
    // A broken internal link fails the build. External links are checked by
    // scripts/check-links.mjs (the Link check workflow) against the built site.
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',
    markdown: {
        // `.md` pages -- the generated API reference and the copied READMEs
        // among them -- are plain CommonMark; only `.mdx` gets MDX's JSX
        // parsing, which would trip over the `{`, `<` and comments those
        // files legitimately contain.
        format: 'detect',
        hooks: {
            onBrokenMarkdownLinks: 'throw',
        },
    },
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
                    editUrl:
                        'https://github.com/britecharts/britecharts/edit/main/packages/docs/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        'https://github.com/britecharts/britecharts/edit/main/packages/docs/blog/',
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
                        // Deployed next to the docs by docs-deploy.yml; pathname:// keeps
                        // Docusaurus from treating it as a route of its own.
                        href: 'pathname:///storybook/',
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
                                href: 'https://stackoverflow.com/search?q=britecharts',
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
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),

    plugins: [lunrSearch],
};
