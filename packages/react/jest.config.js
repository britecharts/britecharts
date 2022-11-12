const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    displayName: name,
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/packages/react/src/templates/',
        '<rootDir>/packages/react/src/tasks/',
        '<rootDir>/packages/react/build/',
        '<rootDir>/packages/react/lib/',
    ],
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
