// The SCSS rules for every package; oxfmt leaves .scss to Stylelint.
export default {
    plugins: ['stylelint-scss', '@stylistic/stylelint-plugin'],
    extends: [
        'stylelint-config-sass-guidelines',
        'stylelint-config-standard-scss',
        // Stylelint 16 removed the formatting rules; this plugin carries them.
        '@stylistic/stylelint-config',
    ],
    rules: {
        '@stylistic/indentation': 4,
        'scss/dollar-variable-colon-space-after': 'always',
        'no-descending-specificity': null,
        'selector-class-pattern': null,
        'max-nesting-depth': 2,
    },
};
