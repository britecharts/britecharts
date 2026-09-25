/**
 * Publishes every public workspace, with the dist-tag Changesets is on.
 *
 * `pnpm publish` always tags `latest` unless told otherwise, so in
 * prerelease mode (.changeset/pre.json exists) a plain publish would make a
 * beta what `pnpm add @britecharts/core` installs. Outside prerelease mode no
 * tag is passed and npm's default applies.
 *
 * pnpm publishes, not npm, because pnpm resolves the workspace:^ ranges
 * between these packages into real versions when it packs them.
 *
 * Unlike `yarn npm publish`, `pnpm publish` has no --tolerate-republish: by
 * default it refuses to republish a version already on the registry, the
 * same as plain npm. That is exactly the retry case this release has already
 * hit once for real -- the first 3.0.0-beta.1 attempt failed on
 * authentication after packing but before every package had published, and
 * the fix was to run this script again. So each package's version is checked
 * against the registry first and skipped, not retried, if it is already
 * there; a real publish failure still fails the whole run.
 */
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const preFile = join(__dirname, '..', '.changeset', 'pre.json');
const pre = existsSync(preFile)
    ? JSON.parse(readFileSync(preFile, 'utf8'))
    : null;
const tag = pre && pre.mode === 'pre' ? pre.tag : null;

// Listed in publish order: core has no workspace dependency, wrappers
// depends on core, react depends on both.
const PACKAGES = ['core', 'wrappers', 'react'];

const isAlreadyPublished = (name, version) => {
    const result = spawnSync('npm', ['view', `${name}@${version}`, 'version'], {
        encoding: 'utf8',
    });

    return result.status === 0 && result.stdout.trim() === version;
};

let failed = false;

for (const dir of PACKAGES) {
    const manifest = JSON.parse(
        readFileSync(join(__dirname, '..', 'packages', dir, 'package.json'))
    );
    const { name, version } = manifest;

    if (isAlreadyPublished(name, version)) {
        console.log(`${name}@${version} is already published, skipping`);
        continue;
    }

    const args = [
        'publish',
        '--filter',
        name,
        '--access',
        'public',
        '--no-git-checks',
        ...(tag ? ['--tag', tag] : []),
    ];

    console.log(`pnpm ${args.join(' ')}`);

    const result = spawnSync('pnpm', args, { stdio: 'inherit' });

    if (result.status !== 0) {
        failed = true;
    }
}

process.exit(failed ? 1 : 0);
