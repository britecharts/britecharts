// Tier 1: what actually ships. Reads the tarballs produced by scripts/pack.js
// and checks them against what each package's `files` field intends.
//
// Counts are minimums, so adding a chart does not break this file; removing
// one, or a build config silently dropping an output directory, does.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const TARBALLS = path.resolve(__dirname, '..', '.tarballs');

// Things that must never ship from any package.
const COMMON_DENY = [
    '**/*.map',
    '**/*.spec.js',
    '**/*.stories.js',
    '**/*.stories.mdx',
    '**/*DataBuilder.js',
    '**/*.fixtures.js',
    '**/*.html',
    'dist/storybook/**',
    'coverage/**',
    '.storybook/**',
    'node_modules/**',
    'webpack.*.js',
    'jest.config.js',
    'jest.setup.js',
    'babel.config.js',
    '.eslintcache',
    '.sass-lint.yml',
];

// [glob, minimum number of matching entries]
const PACKAGES = {
    core: {
        allow: [
            ['README.md', 1],
            ['package.json', 1],
            ['dist/umd/bundle/core.bundled.min.js', 1],
            ['dist/umd/charts/*.min.js', 16],
            ['dist/cdn/bundle/core.cdn.min.js', 1],
            ['dist/cdn/charts/*.cdn.min.js', 16],
            ['dist/styles/bundle/britecharts.css', 1],
            ['dist/styles/bundle/britecharts.min.css', 1],
            ['dist/styles/charts/common.css', 1],
            ['dist/styles/charts/*.min.css', 10],
            ['src/index.js', 1],
            ['src/charts/*/*.js', 16],
            ['src/typings/index.d.ts', 1],
            ['src/typings/charts/*.d.ts', 14],
        ],
        deny: COMMON_DENY,
    },
    wrappers: {
        allow: [
            ['README.md', 1],
            ['package.json', 1],
            ['dist/umd/bundle/wrappers.bundled.min.js', 1],
            ['dist/cjs/bundle/wrappers.bundled.min.js', 1],
            ['dist/umd/charts/*.min.js', 10],
            ['src/index.js', 1],
            ['src/charts/*/*.js', 10],
        ],
        deny: COMMON_DENY,
    },
    react: {
        allow: [
            ['README.md', 1],
            ['CHANGELOG.md', 1],
            ['package.json', 1],
            ['dist/umd/bundle/react.bundled.min.js', 1],
            ['dist/umd/charts/*.js', 10],
            ['dist/cjs/charts/*.js', 10],
            ['src/index.js', 1],
            ['src/charts/*/*.js', 10],
            ['src/typings/index.d.ts', 1],
            ['src/typings/charts/*.d.ts', 11],
        ],
        deny: [
            ...COMMON_DENY,
            'src/docs/**',
            'src/templates/**',
            'src/tasks/**',
            'src/scripts/**',
        ],
    },
};

// Just enough glob for the lists above: `**`, `*` and `?`.
function globToRegExp(glob) {
    let re = '';

    for (let i = 0; i < glob.length; i++) {
        const c = glob[i];

        if (c === '*' && glob[i + 1] === '*') {
            i++;
            if (glob[i + 1] === '/') {
                i++;
                re += '(?:.*/)?';
            } else {
                re += '.*';
            }
        } else if (c === '*') {
            re += '[^/]*';
        } else if (c === '?') {
            re += '[^/]';
        } else if ('.+^$()[]{}|\\'.includes(c)) {
            re += `\\${c}`;
        } else {
            re += c;
        }
    }

    return new RegExp(`^${re}$`);
}

function matching(entries, glob) {
    const re = globToRegExp(glob);

    return entries.filter((entry) => re.test(entry));
}

function readTarball(name) {
    const file = path.join(TARBALLS, `${name}.tgz`);

    assert.ok(
        fs.existsSync(file),
        `${path.relative(process.cwd(), file)} is missing; run \`yarn pack\` (scripts/pack.js) first`
    );

    const entries = execFileSync('tar', ['-tzf', file], { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean)
        .map((entry) => entry.replace(/^package\//, ''));
    const manifest = JSON.parse(
        execFileSync('tar', ['-xzOf', file, 'package/package.json'], {
            encoding: 'utf8',
        })
    );

    return { entries, manifest };
}

for (const [name, { allow, deny }] of Object.entries(PACKAGES)) {
    test(`@britecharts/${name} tarball`, async (t) => {
        const { entries, manifest } = readTarball(name);

        await t.test('contains everything its files field promises', () => {
            const missing = allow
                .map(([glob, min]) => [glob, min, matching(entries, glob).length])
                .filter(([, min, found]) => found < min)
                .map(([glob, min, found]) => `${glob} (wanted ${min}, found ${found})`);

            assert.deepEqual(missing, []);
        });

        await t.test('ships no tests, stories, maps or tooling', () => {
            const leaked = deny.flatMap((glob) => matching(entries, glob));

            assert.deepEqual(leaked, []);
        });

        await t.test('entry points resolve to files in the tarball', () => {
            for (const field of ['main', 'module', 'types']) {
                if (!manifest[field]) {
                    continue;
                }
                assert.ok(
                    entries.includes(manifest[field]),
                    `${field} points at ${manifest[field]}, which is not in the tarball`
                );
            }
        });

        await t.test('is publishable', () => {
            assert.equal(manifest.name, `@britecharts/${name}`);
            assert.notEqual(manifest.private, true);

            const unresolved = Object.entries({
                ...manifest.dependencies,
                ...manifest.peerDependencies,
            }).filter(([, range]) => String(range).startsWith('workspace:'));

            assert.deepEqual(unresolved, [], 'workspace: ranges survived packing');
        });
    });
}
