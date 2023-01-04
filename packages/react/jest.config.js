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
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
