/* eslint-disable no-console */
// Packs the three publishable workspaces into .tarballs/ with Yarn's own
// packer -- the one `yarn release` publishes with. `npm pack` reads the
// `files` field differently and has already produced a misleading "all good"
// once, so nothing here goes through npm.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT_DIR = path.resolve(__dirname, '..', '.tarballs');

const PACKAGES = [
    { name: '@britecharts/core', dir: 'core' },
    { name: '@britecharts/wrappers', dir: 'wrappers' },
    { name: '@britecharts/react', dir: 'react' },
];

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const { name, dir } of PACKAGES) {
    const dist = path.join(REPO_ROOT, 'packages', dir, 'dist');

    if (!fs.existsSync(dist)) {
        console.error(
            `${name}: ${path.relative(REPO_ROOT, dist)} is missing. ` +
                'Run `yarn build:packages` first.'
        );
        process.exit(1);
    }

    const out = path.join(OUT_DIR, `${dir}.tgz`);

    console.log(`packing ${name} -> ${path.relative(REPO_ROOT, out)}`);
    execFileSync('yarn', ['workspace', name, 'pack', '--out', out], {
        cwd: REPO_ROOT,
        stdio: 'inherit',
    });
}
