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
const { registryVersion } = require('./registry-version');

const preFile = join(__dirname, '..', '.changeset', 'pre.json');
const pre = existsSync(preFile)
    ? JSON.parse(readFileSync(preFile, 'utf8'))
    : null;
const tag = pre && pre.mode === 'pre' ? pre.tag : null;

// Listed in publish order: core has no workspace dependency, wrappers
// depends on core, react depends on both.
const PACKAGES = ['core', 'wrappers', 'react'];

const isAlreadyPublished = (name, version, attempts = 1) =>
    registryVersion(`${name}@${version}`, { attempts, delayMs: 20000 }) ===
    version;

// npm's answer when the version exists but its read API has not caught up:
// the check above missed it, and the publish is refused. Seen on 15 Oct as
// `409 Conflict ... Cannot publish over previously staged`.
const isConflict = (output) =>
    /\b409\b|cannot publish over|previously published/i.test(output);

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

    const result = spawnSync('pnpm', args, { encoding: 'utf8' });

    process.stdout.write(result.stdout || '');
    process.stderr.write(result.stderr || '');

    if (result.status !== 0) {
        // A conflict on a version the registry is still catching up on is a
        // publish that already happened: wait for the read side to agree, for
        // up to five minutes, before calling it a failure.
        const output = `${result.stdout}\n${result.stderr}`;

        if (isConflict(output) && isAlreadyPublished(name, version, 15)) {
            console.log(`${name}@${version} was already published, skipping`);
            continue;
        }

        failed = true;
    }
}

process.exit(failed ? 1 : 0);
