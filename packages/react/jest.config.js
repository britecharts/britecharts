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
    moduleNameMapper: {
        '^@britecharts/core$': '<rootDir>/../core/src/index.js',
        '^@britecharts/wrappers$': '<rootDir>/../wrappers/src/index.js',
    },
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
