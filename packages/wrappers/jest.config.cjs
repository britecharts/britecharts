const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    displayName: name,
    // Resolve sibling workspaces to their source. Their package.json `main`
    // points at a built bundle, so without this every spec here needs
    // `pnpm build:core` to have run first.
    //
    // Extensionless on purpose, so this keeps working when core's barrel
    // converts to TypeScript in its own phase.
    moduleNameMapper: {
        // Spread, not replace: see the note in jest.config.base.js.
        ...configBase.moduleNameMapper,
        '^@britecharts/core$': '<rootDir>/../core/src/index',
    },
};
