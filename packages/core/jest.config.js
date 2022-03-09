/* eslint-disable @typescript-eslint/no-var-requires */

const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    name,
    displayName: name,
};
