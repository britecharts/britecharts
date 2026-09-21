/**
 * Publishes every public workspace, with the dist-tag Changesets is on.
 *
 * `yarn npm publish` always tags `latest` unless told otherwise, so in
 * prerelease mode (.changeset/pre.json exists) a plain publish would make a
 * beta what `yarn add @britecharts/core` installs. Outside prerelease mode no
 * tag is passed and npm's default applies.
 *
 * Yarn publishes, not npm, because Yarn resolves the workspace:^ ranges
 * between these packages into real versions when it packs them.
 */
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const preFile = join(__dirname, '..', '.changeset', 'pre.json');
const pre = existsSync(preFile)
    ? JSON.parse(readFileSync(preFile, 'utf8'))
    : null;
const tag = pre && pre.mode === 'pre' ? pre.tag : null;

const args = [
    'workspaces',
    'foreach',
    '--no-private',
    '--topological',
    'npm',
    'publish',
    '--tolerate-republish',
    '--access',
    'public',
    ...(tag ? ['--tag', tag] : []),
];

console.log(`yarn ${args.join(' ')}`);

const result = spawnSync('yarn', args, { stdio: 'inherit' });

process.exit(result.status === null ? 1 : result.status);
