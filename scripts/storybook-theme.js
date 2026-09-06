/**
 * Shared Storybook theme for the core, react and demos Storybooks.
 *
 * Kept deliberately close to the Docusaurus docs site so the two read as one
 * product: the same brand orange for accents and the same logo lockup in the
 * sidebar. The greys are Britecharts' own ramp, from
 * packages/core/src/charts/helpers/color.js, rather than Storybook's defaults.
 */
const { create } = require('@storybook/theming');

// Docs site primary, from packages/docs/src/css/custom.css
const brandOrange = '#f6682f';
const brandOrangeDark = '#bf4c28';

// Britecharts grey ramp
const grey = {
    g0: '#F8F8FA',
    g1: '#EFF2F5',
    g2: '#D2D6DF',
    g5: '#666A73',
    g8: '#282C35',
};

module.exports = create({
    base: 'light',

    brandTitle: 'Britecharts',
    brandUrl: 'https://britecharts.github.io/britecharts/',
    brandImage: '/img/brand/britecharts-logo.svg',
    brandTarget: '_blank',

    colorPrimary: brandOrange,
    colorSecondary: brandOrange,

    // UI
    appBg: grey.g0,
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    appBorderColor: grey.g2,
    appBorderRadius: 4,

    // Text
    textColor: grey.g8,
    textInverseColor: '#ffffff',
    textMutedColor: grey.g5,

    // Toolbar and sidebar
    barTextColor: grey.g5,
    barHoverColor: brandOrangeDark,
    barSelectedColor: brandOrange,
    barBg: '#ffffff',

    // Form controls
    inputBg: '#ffffff',
    inputBorder: grey.g2,
    inputTextColor: grey.g8,
    inputBorderRadius: 4,

    fontBase:
        '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    fontCode: 'SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
});
