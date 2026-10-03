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
    // Resolve sibling workspaces to their source. babel.config.js aliases
    // @britecharts/wrappers to a built bundle for the webpack build; under
    // test that alias is switched off so these mappings apply instead.
    //
    // Extensionless on purpose: moduleFileExtensions then decides whether that
    // is .ts or .js, so a package converting its barrel does not break the
    // mapping. Spelling it `index.js` broke every suite here the moment
    // wrappers' index.js became index.ts.
    moduleNameMapper: {
        // Spread, not replace: the base config's mapper carries the `.js` ->
        // extensionless rule that lets these source barrels reach converted
        // .ts files. Defining this key without it silently drops that rule.
        ...configBase.moduleNameMapper,
        '^@britecharts/core$': '<rootDir>/../core/src/index',
        '^@britecharts/wrappers$': '<rootDir>/../wrappers/src/index',
    },
    collectCoverageFrom: [
        'src/charts/**/*.js',
        '!src/charts/**/*.{spec,stories,fixtures}.js',
    ],
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
