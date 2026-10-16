const path = require('path');

// Aggregate run across every package: `pnpm exec jest` at the repo root.
// Each package's jest.config.cjs is a project and can also be run on its own
// via `pnpm --filter @britecharts/<name> test`.
module.exports = {
    projects: ['<rootDir>/packages/*/jest.config.cjs'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: path.join(__dirname, 'coverage'),
};
