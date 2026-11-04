const base = require('../package.json').commitlint;

// Dependabot may capitalize "Bump" regardless of its configured prefix.
// Keep every other rule, including the Conventional Commit type and length.
module.exports = {
    ...base,
    rules: {
        ...base.rules,
        ...(process.env.COMMITLINT_DEPENDABOT === 'true'
            ? { 'subject-case': [0] }
            : {}),
    },
};
