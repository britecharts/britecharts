// Tier 2b: the published typings compile for a TypeScript consumer, under the
// two module resolutions users actually have. skipLibCheck is off in the
// consumer, so the library's own .d.ts files are checked, not only their use.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const CONSUMER = path.resolve(__dirname, '..', 'consumers', 'typescript');
const TSC = path.join(CONSUMER, 'node_modules', 'typescript', 'bin', 'tsc');

const RESOLUTIONS = [
    ['node', 'moduleResolution: node (Jest, older setups; ignores exports)'],
    ['bundler', 'moduleResolution: bundler (Vite, TS 5; honours exports)'],
];

for (const [name, how] of RESOLUTIONS) {
    test(`T · typings compile under ${how}`, () => {
        assert.ok(
            fs.existsSync(TSC),
            'consumers/typescript is not installed; run `yarn install:consumers` first'
        );

        const result = spawnSync(
            process.execPath,
            [TSC, '-p', `tsconfig.${name}.json`, '--pretty', 'false'],
            { cwd: CONSUMER, encoding: 'utf8' }
        );

        assert.equal(
            result.status,
            0,
            `tsc -p tsconfig.${name}.json failed:\n${result.stdout}${result.stderr}`
        );
    });
}
