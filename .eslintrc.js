module.exports = {
    env: {
        es6: true,
        browser: true,
        jasmine: true,
        amd: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    globals: {
        sinon: true,
    },
    rules: {
        'block-scoped-var': 1,
        'comma-style': [2, 'last'],
        complexity: 1,
        'consistent-this': [0, 'self'],
        'default-case': 1,
        'dot-notation': 0,
        'guard-for-in': 1,
        'keyword-spacing': 1,
        'newline-after-var': 1,
        'no-alert': 2,
        'no-console': 2,
        'no-debugger': 2,
        'no-div-regex': 1,
        'no-eq-null': 1,
        'no-floating-decimal': 1,
        'no-multiple-empty-lines': [2, { max: 2 }],
        'no-nested-ternary': 1,
        'no-param-reassign': 0,
        'no-self-compare': 1,
        'no-throw-literal': 1,
        'no-void': 1,
        'no-unused-vars': [1, { varsIgnorePattern: '[d3Transition]' }],
        'no-underscore-dangle': 0,
        quotes: [2, 'single'],
        'one-var': [
            1,
            {
                var: 'always',
                const: 'never',
            },
        ],
        radix: 1,
        'vars-on-top': 1,
        'wrap-iife': [2, 'inside'],
    },
    overrides: [
        {
            files: ['*.d.ts'],
            parser: '@typescript-eslint/parser',
        },
    ],
};
