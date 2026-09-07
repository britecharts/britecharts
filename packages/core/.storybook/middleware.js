// Storybook composition fetches this Storybook from the shell's origin; see the
// shared middleware for why the wildcard CORS header is not enough.
module.exports = require('../../../scripts/storybook-cors');
