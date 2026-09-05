const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    displayName: name,
    // Resolve sibling workspaces to their source. Their package.json `main`
    // points at a built bundle, so without this every spec here needs
    // `yarn build:core` to have run first.
    moduleNameMapper: {
        '^@britecharts/core$': '<rootDir>/../core/src/index.js',
    },
};
