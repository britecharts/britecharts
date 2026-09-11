/* eslint-disable no-console */
// Installs every consumers/<name>/ project with npm, the way a user would, so
// dependency declarations are tested as well as file contents. Then copies
// the files the script-tag pages need into public/vendor/ so they can be
// served without touching the network.
//
// Two sources for the @britecharts/* packages:
//   - tarballs (default): the `file:../../.tarballs/*.tgz` references in each
//     consumer's package.json, produced by scripts/pack.js. What every PR runs.
//   - registry: BRITECHARTS_SOURCE=registry BRITECHARTS_VERSION=<version>
//     rewrites those references to the version on npm for the duration of the
//     install. What smoke-published.yml runs after a release.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const CONSUMERS_DIR = path.resolve(__dirname, '..', 'consumers');
const TARBALLS = path.resolve(__dirname, '..', '.tarballs');

const SOURCE = process.env.BRITECHARTS_SOURCE === 'registry' ? 'registry' : 'tarballs';
const VERSION = process.env.BRITECHARTS_VERSION;

// source (inside the consumer's node_modules) -> destination (inside public/)
const VENDOR = [
    ['@britecharts/core/dist/cdn', 'vendor/cdn'],
    ['@britecharts/core/dist/styles', 'vendor/styles'],
    ['d3-selection/dist/d3-selection.min.js', 'vendor/d3-selection.min.js'],
];

if (SOURCE === 'registry' && !VERSION) {
    console.error('BRITECHARTS_SOURCE=registry needs BRITECHARTS_VERSION (a version or dist-tag).');
    process.exit(1);
}
if (SOURCE === 'tarballs' && !fs.existsSync(TARBALLS)) {
    console.error('.tarballs/ is missing; run `yarn pack` (scripts/pack.js) first.');
    process.exit(1);
}

const consumers = fs
    .readdirSync(CONSUMERS_DIR)
    .filter((name) => fs.existsSync(path.join(CONSUMERS_DIR, name, 'package.json')));

for (const name of consumers) {
    const cwd = path.join(CONSUMERS_DIR, name);
    const manifestPath = path.join(cwd, 'package.json');
    const original = fs.readFileSync(manifestPath, 'utf8');

    // A fresh install every time: npm's hidden lockfile would otherwise keep
    // a previously extracted tarball when only its contents changed.
    fs.rmSync(path.join(cwd, 'node_modules'), { recursive: true, force: true });
    fs.rmSync(path.join(cwd, 'public', 'vendor'), { recursive: true, force: true });

    if (SOURCE === 'registry') {
        const manifest = JSON.parse(original);

        for (const dependency of Object.keys(manifest.dependencies ?? {})) {
            if (dependency.startsWith('@britecharts/')) {
                manifest.dependencies[dependency] = VERSION;
            }
        }
        fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    }

    console.log(`installing consumers/${name} from ${SOURCE}${SOURCE === 'registry' ? ` (@britecharts/*@${VERSION})` : ''}`);
    try {
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
    } finally {
        // The committed package.json always points at the tarballs.
        fs.writeFileSync(manifestPath, original);
    }

    for (const [from, to] of VENDOR) {
        const source = path.join(cwd, 'node_modules', from);

        if (fs.existsSync(source)) {
            fs.cpSync(source, path.join(cwd, 'public', to), { recursive: true });
        }
    }
}
