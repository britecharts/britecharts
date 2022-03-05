const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');

const resolve = (searchPath) => path.join(__dirname, searchPath);

// Themes
// Check options in https://github.com/styleguidist/react-styleguidist/blob/master/src/styles/theme.js

module.exports = {
    title: 'Britecharts React - React charting library based in Britecharts',

    theme: {
        sidebarWidth: 262,
        color: {
            base: '#333',
            light: '#999',
            lightest: '#ccc',
            link: '#F6682f',
            linkHover: '#BF4C28',
            border: '#e8e8e8',
            name: '#FFA71A',
            type: '#b77daa',
            error: '#fff',
            baseBackground: '#fff',
            errorBackground: '#c00',
            codeBackground: '#f5f5f5',
            sidebarBackground: '#45494E',
        },
        fontFamily: {
            base: '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        },
    },

    styleguideComponents: {
        Logo: resolve('src/docs/styleguide/Logo'),
    },

    components: 'src/charts/**/[A-Z]*.js',

    require: [
        path.join(
            __dirname,
            'node_modules/britecharts/dist/css/britecharts.min.css'
        ),
        path.join(__dirname, 'src/docs/styles/custom.css'),
    ],

    assetsDir: resolve('src/docs/public'),

    template: {
        head: {
            meta: [
                {
                    name: 'description',
                    content:
                        'Britecharts-react is a React wrapper for the Britecharts charting library.',
                },
                {
                    name: 'keywords',
                    content: 'React, Britecharts, D3, D3.js, Charts',
                },
                { name: 'msapplication-tap-highlight', content: 'no' },
                {
                    name: 'msapplication-config',
                    content: 'icons/browserconfig.xml',
                },
                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'application-name', content: 'Britecharts React' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: '#009FA1',
                },
                { name: 'apple-mobile-web-app-title', content: 'Britecharts' },
                { name: 'theme-color', content: '#45494e' },
                { itemprop: 'name', content: 'Britecharts React' },
                {
                    itemprop: 'description',
                    content:
                        'Britecharts-react is a React wrapper for the Britecharts charting library.',
                },
                {
                    itemprop: 'image',
                    content:
                        'https://britecharts.github.io/britecharts-react/images/logo-light.png',
                },
                { property: 'og:title', content: 'Britecharts React' },
                { property: 'og:type', content: 'website' },
                {
                    property: 'og:image',
                    content:
                        'https://britecharts.github.io/britecharts-react/images/logo-light.png',
                },
                {
                    property: 'og:url',
                    content: 'https://britecharts.github.io/britecharts-react/',
                },
                {
                    property: 'og:description',
                    content:
                        'Britecharts-react is a React wrapper for the Britecharts charting library.',
                },
                { name: 'twitter:title', content: 'Britecharts React' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@britecharts' },
                {
                    name: 'twitter:description',
                    content:
                        'Britecharts-react is a React wrapper for the Britecharts charting library.',
                },
                {
                    name: 'twitter:image',
                    content:
                        'https://britecharts.github.io/britecharts-react/images/logo-light.png',
                },
            ],
            links: [
                { rel: 'manifest', href: 'icons/manifest.json' },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: 'icons/apple-touch-icon.png',
                },
                {
                    rel: 'mask-icon',
                    href: 'icons/safari-pinned-tab.svg',
                    color: '#5bbad5',
                },
                { rel: 'shortcut icon', href: 'icons/favicon.ico' },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: 'icons/favicon-32x32.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: 'icons/favicon-16x16.png',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Rubik:300,400',
                },
            ],
            raw: `
                <!--[if lt IE 9]>
                    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
                <![endif]-->
            `,
        },
        body: {
            raw: [
                `
                    <a class="ribbon" href="https://github.com/britecharts/britecharts-react" title="Check this project in github">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 250 250" fill="#fff" style="position: absolute; top: 0; right: 0">
                            <path d="M0 0l115 115h15l12 27 108 108V0z" fill="#000"/>
                            <path class="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" style="-webkit-transform-origin: 130px 106px; transform-origin: 130px 106px"/>
                            <path class="octo-body" d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"/>
                        </svg>
                    </a>
                    <div id="app"></div>
                `,
                `
                    <script>
                        const approximatedLayoutRefreshDelay = 1500;

                        setTimeout(() => {
                            window.dispatchEvent(new Event('resize'));
                        }, approximatedLayoutRefreshDelay);
                    </script>
                `,
                `
                    <script>
                        window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }
                        gtag('js', new Date());

                        gtag('config', 'UA-141520-33');
                    </script>
                `,
            ],
            scripts: [
                {
                    async: '',
                    src: 'https://www.googletagmanager.com/gtag/js?id=UA-141520-33',
                },
            ],
        },
    },

    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000',
                },
            ],
        },
    },

    sections: [
        {
            name: 'Introduction',
            content: './README.md',
        },
        {
            name: 'Components',
            components: 'src/charts/!(template|loading)/[A-Z]*.js',
        },
        {
            name: 'About',
            content: './TOPICS.md',
        },
    ],

    styleguideDir: 'docs',
};
