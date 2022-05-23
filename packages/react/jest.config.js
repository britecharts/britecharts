const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    name,
    displayName: name,
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/src/templates/',
        '<rootDir>/lib/',
    ],
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
