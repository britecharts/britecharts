const configBase = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
    ...configBase,
    displayName: name,
};
