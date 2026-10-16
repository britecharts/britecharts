const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    displayName: name,
    testPathIgnorePatterns: [
        '<rootDir>/src/charts(/.*)/(.*).fixtures.js',
        '<rootDir>/node_modules/',
        '<rootDir>/src/templates/',
        '<rootDir>/src/tasks/',
        '<rootDir>/build/',
        '<rootDir>/lib/',
    ],
    // Resolve sibling workspaces to their source rather than their built dist.
    //
    // Extensionless on purpose: moduleFileExtensions then decides whether that
    // is .ts or .js. Spelling it `index.js` breaks every suite here, since
    // wrappers' barrel is index.ts.
    moduleNameMapper: {
        // Spread, not replace: the base config's mapper carries the `.js` ->
        // extensionless rule that lets these source barrels reach .ts files.
        // Defining this key without it silently drops that rule.
        ...configBase.moduleNameMapper,
        '^@britecharts/core$': '<rootDir>/../core/src/index',
        '^@britecharts/wrappers$': '<rootDir>/../wrappers/src/index',
    },
    // Every extension, not just .js. A .ts file would otherwise drop out
    // of coverage silently: the per-file threshold fails loudly ("Coverage
    // data for ... was not found"), but the global ones would simply be
    // computed over a smaller set and keep passing.
    collectCoverageFrom: [
        'src/charts/**/*.{js,ts,tsx}',
        '!src/charts/**/*.{spec,stories,fixtures}.{js,ts,tsx}',
    ],
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
