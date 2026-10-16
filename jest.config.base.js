const path = require('path');

process.env.TZ = 'UTC';

module.exports = {
    // One transform for every extension: babel-jest strips TypeScript
    // (@babel/preset-typescript in babel.config.test.js) rather than
    // type-checking on the way through. Type-checking is the `type-check`
    // script's job; ts-jest would repeat that work on every test run and pin
    // the repo to TypeScript < 7.
    transform: {
        '\\.[jt]sx?$': [
            'babel-jest',
            { configFile: path.join(__dirname, 'babel.config.test.js') },
        ],
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Jest has no native equivalent of a bundler's `resolve.extensionAlias`,
    // so this drops the `.js` off a relative specifier and lets
    // `moduleFileExtensions` above decide what it resolves to, trying .ts and
    // .tsx before .js.
    //
    // The barrels use `.js` specifiers for .ts files
    // (`export { default as BulletWrapper } from './charts/bullet/bulletChart.js'`
    // points at bulletChart.ts), and jest otherwise resolves that string
    // literally and fails. It bites hardest across packages: wrappers' own
    // specs import each wrapper directly, while every react spec goes through
    // the wrappers barrel, so without this rule every react suite fails.
    //
    // Dropping the extension is safe for files that really are .js -- the same
    // lookup finds them -- so this needs no per-package exceptions.
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    // d3 v2+ ships ESM only, so those packages have to go through Babel
    // rather than being skipped along with the rest of node_modules.
    //
    // Two negative lookaheads, not one: under Yarn's flat node_modules a d3
    // package sits directly at node_modules/d3-selection/..., but pnpm nests
    // every package at node_modules/.pnpm/d3-selection@3.0.0/node_modules/
    // d3-selection/... . A single lookahead written for the flat form can be
    // satisfied by the pnpm form for the wrong reason -- .pnpm itself doesn't
    // match d3-[a-z-]+ either, so the pattern "matches" (meaning: ignore this
    // file) exactly when it should not. Both forms need their own check.
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\](?!(?:d3|d3-[a-z-]+|internmap|delaunator|robust-predicates)[/\\\\])(?!\\.pnpm[/\\\\][^/\\\\]+[/\\\\]node_modules[/\\\\](?:d3|d3-[a-z-]+|internmap|delaunator|robust-predicates)[/\\\\]).+\\.(js|jsx)$',
    ],
    testMatch: ['**/*.(spec|test).{js,jsx,ts,tsx}'],
    // Resolved from this file rather than <rootDir>, so the config works both
    // at the repo root and inside a package, where <rootDir> differs.
    setupFiles: ['jest-canvas-mock', path.join(__dirname, 'jest.setup.js')],
    // Coverage and reporting live in jest.config.js / the `test` scripts.
    // Jest rejects them in a project-level config and warns on every run.
};
