// Tier 1: what actually ships. Reads the tarballs produced by scripts/pack.js
// and checks them against what each package's `files` field intends.
//
// Counts are minimums, so adding a chart does not break this file; removing
// one, or a build config silently dropping an output directory, does.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const TARBALLS = path.resolve(__dirname, '..', '.tarballs');

// publint and attw findings we accept, each with the reason. Everything else
// they report fails the test.
//
// The three below share one root cause: the packages have no "type" field,
// so Node reads src/*.js as CommonJS even though the files are ES modules.
// Bundlers (the `import` condition's real audience), CommonJS consumers and
// TypeScript's node10/bundler resolutions are all unaffected, and Node 20.19+
// detects the syntax at runtime. Node ESM (`import` from a Node script) is
// not a supported consumer of a browser charting library; proper ESM output
// arrives with the Vite build (H22), which retires all three waivers.
const WAIVED_PUBLINT = new Set([
    'FILE_INVALID_FORMAT', // src/*.js is ESM in a CommonJS package
    'EXPORTS_TYPES_INVALID_FORMAT', // the .d.ts serving the import condition is read as CJS
]);
const WAIVED_ATTW = new Set([
    'UnexpectedModuleSyntax', // same: ESM syntax in a file Node treats as CJS
    'NamedExports', // Node ESM cannot see named exports on the webpack UMD bundle
]);

// Things that must never ship from any package.
// globToRegExp below escapes braces, so `*.spec.{js,ts}` would match nothing.
// Every extension is spelled out instead -- and it has to include the
// TypeScript ones: these globs mirror each package's `files` field, and when
// both only said `.js`, a converted `bulletChart.spec.ts` leaked into the
// wrappers tarball with this test still passing. The same blind spot in the
// manifest and in the guard meant to catch it is why that went unnoticed.
const COMMON_DENY = [
    '**/*.map',
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.stories.js',
    '**/*.stories.ts',
    '**/*.stories.tsx',
    '**/*.stories.mdx',
    '**/*DataBuilder.js',
    '**/*DataBuilder.ts',
    '**/*.fixtures.js',
    '**/*.fixtures.ts',
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
            // The ESM entry point and its declarations. These are what
            // `module`, `exports.import` and `types` resolve to, so a
            // consumer's bundler and tsc both land here rather than in src/ --
            // which is the whole point of building them: src/ holds authored
            // TypeScript that no consumer can be expected to compile.
            ['dist/esm/index.js', 1],
            ['dist/esm/index.d.ts', 1],
            ['dist/esm/charts/*/*.js', 11],
            ['dist/esm/charts/*/*.d.ts', 11],
            ['dist/esm/helpers/*.js', 4],
            ['dist/esm/helpers/*.d.ts', 4],
            // Source still ships, so deep `./src/*` imports of the wrappers
            // that are still JavaScript keep resolving. The extension is
            // deliberately loose: each conversion turns one of these from .js
            // into .ts, and the count has to hold either way. Spelling it
            // `*.js` made this assertion pass by coincidence after bullet
            // converted -- 10 charts, 10 matches, one of them no longer the
            // file this was meant to be checking.
            ['src/index.?s', 1],
            ['src/charts/*/*.?s', 11],
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
        `${path.relative(
            process.cwd(),
            file
        )} is missing; run \`pnpm run pack\` (scripts/pack.js) first`
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
                .map(([glob, min]) => [
                    glob,
                    min,
                    matching(entries, glob).length,
                ])
                .filter(([, min, found]) => found < min)
                .map(
                    ([glob, min, found]) =>
                        `${glob} (wanted ${min}, found ${found})`
                );

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

        await t.test(
            'passes publint (errors, and warnings not waived)',
            async () => {
                const { publint } = await import('publint');
                const { formatMessage } = await import('publint/utils');
                const tarball = fs.readFileSync(
                    path.join(TARBALLS, `${name}.tgz`)
                );
                const { messages, pkg } = await publint({ pack: { tarball } });
                const failing = messages
                    .filter(
                        (m) =>
                            m.type === 'error' ||
                            (m.type === 'warning' &&
                                !WAIVED_PUBLINT.has(m.code))
                    )
                    .map(
                        (m) =>
                            `${m.type} ${m.code}: ${formatMessage(
                                m,
                                pkg ?? manifest
                            )}`
                    );

                assert.deepEqual(failing, []);
            }
        );

        await t.test('passes attw (problems not waived)', () => {
            if (!manifest.types) {
                return; // nothing for attw to check
            }
            // attw exits non-zero when it finds problems, and a process that
            // exits with a pipe on stdout loses everything past 64 KB. A file
            // is written synchronously, so the report goes there.
            const reportFile = path.join(
                os.tmpdir(),
                `attw-${name}-${process.pid}.json`
            );
            const fd = fs.openSync(reportFile, 'w');
            const result = spawnSync(
                'pnpm',
                [
                    'exec',
                    'attw',
                    path.join(TARBALLS, `${name}.tgz`),
                    '--format',
                    'json',
                ],
                {
                    cwd: path.resolve(__dirname, '..'),
                    stdio: ['ignore', fd, 'pipe'],
                    encoding: 'utf8',
                }
            );
            fs.closeSync(fd);
            let report;
            try {
                report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
            } catch {
                assert.fail(
                    `attw produced no JSON (exit ${result.status}):\n${result.stderr}`
                );
            } finally {
                fs.rmSync(reportFile, { force: true });
            }
            const problems = Object.entries(report.problems ?? {})
                .filter(([kind]) => !WAIVED_ATTW.has(kind))
                .map(([kind, list]) => `${kind}: ${JSON.stringify(list)}`);

            assert.deepEqual(problems, []);
        });

        await t.test('is publishable', () => {
            assert.equal(manifest.name, `@britecharts/${name}`);
            assert.notEqual(manifest.private, true);

            const unresolved = Object.entries({
                ...manifest.dependencies,
                ...manifest.peerDependencies,
            }).filter(([, range]) => String(range).startsWith('workspace:'));

            assert.deepEqual(
                unresolved,
                [],
                'workspace: ranges survived packing'
            );
        });
    });
}
