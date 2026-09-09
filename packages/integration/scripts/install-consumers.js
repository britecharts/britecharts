/* eslint-disable no-console */
// Installs every consumers/<name>/ project from the tarballs in .tarballs/
// with npm, the way a user would, so dependency declarations are tested as
// well as file contents. Then copies the files the script-tag pages need
// into public/vendor/ so they can be served without touching the network.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const CONSUMERS_DIR = path.resolve(__dirname, '..', 'consumers');
const TARBALLS = path.resolve(__dirname, '..', '.tarballs');

// source (inside the consumer's node_modules) -> destination (inside public/)
const VENDOR = [
    ['@britecharts/core/dist/cdn', 'vendor/cdn'],
    ['@britecharts/core/dist/styles', 'vendor/styles'],
    ['d3-selection/dist/d3-selection.min.js', 'vendor/d3-selection.min.js'],
];

if (!fs.existsSync(TARBALLS)) {
    console.error('.tarballs/ is missing; run `yarn pack` (scripts/pack.js) first.');
    process.exit(1);
}

const consumers = fs
    .readdirSync(CONSUMERS_DIR)
    .filter((name) => fs.existsSync(path.join(CONSUMERS_DIR, name, 'package.json')));

for (const name of consumers) {
    const cwd = path.join(CONSUMERS_DIR, name);

    // A fresh install every time: npm's hidden lockfile would otherwise keep
    // a previously extracted tarball when only its contents changed.
    fs.rmSync(path.join(cwd, 'node_modules'), { recursive: true, force: true });
    fs.rmSync(path.join(cwd, 'public', 'vendor'), { recursive: true, force: true });

    console.log(`installing consumers/${name}`);
    execFileSync(
        'npm',
        ['install', '--no-package-lock', '--no-audit', '--no-fund', '--loglevel=error'],
        {
            cwd,
            stdio: 'inherit',
            env: {
                ...process.env,
                // The repo root pins packageManager to Yarn; Corepack would
                // otherwise refuse to let npm run underneath it.
                COREPACK_ENABLE_STRICT: '0',
            },
        }
    );

    for (const [from, to] of VENDOR) {
        const source = path.join(cwd, 'node_modules', from);

        if (fs.existsSync(source)) {
            fs.cpSync(source, path.join(cwd, 'public', to), { recursive: true });
        }
    }
}
