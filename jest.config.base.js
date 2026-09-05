const path = require('path');

process.env.TZ = 'UTC';

module.exports = {
    globals: {
        'ts-jest': {
            disableSourceMapSupport: true,
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
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
    // d3 v2+ ships ESM only, so those packages have to go through Babel
    // rather than being skipped along with the rest of node_modules.
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\](?!(d3|d3-[a-z-]+|internmap|delaunator|robust-predicates)[/\\\\]).+\\.(js|jsx)$',
    ],
    testMatch: ['**/*.(spec|test).{js,jsx,ts,tsx}'],
    // Resolved from this file rather than <rootDir>, so the config works both
    // at the repo root and inside a package, where <rootDir> differs.
    setupFiles: ['jest-canvas-mock', path.join(__dirname, 'jest.setup.js')],
    // Coverage and reporting live in jest.config.js / the `test` scripts.
    // Jest rejects them in a project-level config and warns on every run.
};
