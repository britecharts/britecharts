import { fixupPluginRules } from '@eslint/compat';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

// eslint-plugin-react's rules still call context methods ESLint 10 removed
// (`context.getFilename()` and the like); fixupPluginRules puts them back.
const react = {
    ...reactPlugin,
    rules: fixupPluginRules(reactPlugin).rules,
};
const reactConfig = (config) => ({
    ...config,
    plugins: { ...config.plugins, react },
});

export default [
    {
        ignores: [
            '**/dist/**',
            '**/coverage/**',
            '**/node_modules/**',
            '**/*.min.js',
            'packages/docs/build/**',
            'packages/docs/scripts/**',
        ],
    },
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        ...reactConfig(reactPlugin.configs.flat.recommended),
    },
    reactConfig(reactPlugin.configs.flat['jsx-runtime']),
    testingLibrary.configs['flat/react'],
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: {
                ...globals.browser,
                ...globals.amd,
                sinon: 'readonly',
            },
        },
        settings: { react: { version: 'detect' } },
        rules: {
            'block-scoped-var': 1,
            'comma-style': [2, 'last'],
            complexity: 1,
            'consistent-this': [0, 'self'],
            'default-case': 1,
            'dot-notation': 0,
            'guard-for-in': 1,
            'keyword-spacing': 1,
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
            ],
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
            'one-var': [1, { var: 'always', const: 'never' }],
            radix: 1,
            'vars-on-top': 1,
            'wrap-iife': [2, 'inside'],
        },
    },
    ...tsPlugin.configs['flat/recommended'].map((config) => ({
        ...config,
        files: ['**/*.{ts,tsx,mts,cts}'],
    })),
    {
        files: ['**/*.{ts,tsx,mts,cts}'],
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                1,
                { varsIgnorePattern: '[d3Transition]' },
            ],
            '@typescript-eslint/no-explicit-any': 1,
        },
    },
    {
        files: ['packages/react/**/*.{js,jsx,ts,tsx}'],
        plugins: { 'react-hooks': reactHooks },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
        },
    },
];
