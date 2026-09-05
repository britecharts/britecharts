const path = require('path');

// Aggregate run across every package: `yarn jest` at the repo root.
// Each package's jest.config.js is a project and can also be run on its own
// via `yarn workspace @britecharts/<name> test`.
module.exports = {
    projects: ['<rootDir>/packages/*/jest.config.js'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: path.join(__dirname, 'coverage'),
};
