process.env.TZ = 'UTC';

module.exports = {
    globals: {
        'ts-jest': {
            disableSourceMapSupport: true,
        },
    },
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '\\.[jt]sx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    testMatch: ['**/*.(spec|test).{js,jsx,ts,tsx}'],
    setupFiles: ['jest-canvas-mock', '<rootDir>/../../jest.setup.js'],
    collectCoverage: true,
    // collectCoverageFrom: ['**/src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: './coverage/',
};
