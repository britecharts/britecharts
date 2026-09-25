/* eslint-disable no-console */
// Packs the three publishable workspaces into .tarballs/ with pnpm's own
// packer -- the one `pnpm release` publishes with. `npm pack` reads the
// `files` field differently and has already produced a misleading "all good"
// once (I1), so nothing here goes through npm. Verified against pnpm's
// packer the same way: dist/umd/**, dist/cdn/** and dist/styles/** all land,
// with no *.spec.js, *.stories.js or *.fixtures.js leaking in.
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
                'Run `pnpm build:packages` first.'
        );
        process.exit(1);
    }

    const out = path.join(OUT_DIR, `${dir}.tgz`);
    const pkgDir = path.join(REPO_ROOT, 'packages', dir);

    console.log(`packing ${name} -> ${path.relative(REPO_ROOT, out)}`);
    execFileSync('pnpm', ['pack', '--dir', pkgDir, '--out', out], {
        cwd: REPO_ROOT,
        stdio: 'inherit',
    });
}
