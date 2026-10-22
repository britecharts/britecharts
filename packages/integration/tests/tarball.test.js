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

// Every publint and attw finding fails the test. Each package declares
// "type": "module", with its CommonJS bundles and types under the `require`
// condition, so the ES modules in dist/esm need no waiver.
const WAIVED_PUBLINT = new Set();
const WAIVED_ATTW = new Set();

// Things that must never ship from any package.
// globToRegExp below escapes braces, so `*.spec.{js,ts}` would match nothing.
// Every extension is spelled out instead -- and it has to include the
// TypeScript ones: these globs mirror each package's `files` field, and a
// blind spot shared by the manifest and this guard lets a `*.spec.ts` ship
// with this test still passing.
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
    'jest.config.cjs',
    'jest.setup.js',
    'vitest.config.js',
    'vitest.setup.js',
    'babel.config.js',
    'babel.config.cjs',
    '.eslintcache',
    '.sass-lint.yml',
];

// [glob, minimum number of matching entries]
const PACKAGES = {
    core: {
        allow: [
            ['README.md', 1],
            // Copied from the repository root by each package's prepack
            ['LICENSE.md', 1],
            ['package.json', 1],
            ['dist/umd/bundle/core.bundled.min.cjs', 1],
            ['dist/types-cjs/package.json', 1],
            ['dist/types-cjs/index.d.ts', 1],
            ['dist/cdn/bundle/core.cdn.min.js', 1],
            ['dist/styles/bundle/britecharts.css', 1],
            ['dist/styles/bundle/britecharts.min.css', 1],
            ['dist/styles/charts/common.css', 1],
            ['dist/styles/charts/*.min.css', 10],
            // The ESM entry point. This is what `module` and
            // `exports.import` resolve to, so a consumer's bundler lands here
            // rather than in src/ -- which is the whole point of building it:
            // src/ holds authored TypeScript that no consumer can be expected
            // to compile, and its `.js` specifiers name `.ts` files. Only this
            // line notices an ESM entry pointed back at src/: Vite resolves
            // `.js` to `.ts` and transpiles, so the browser tiers pass, and the
            // require tier only exercises the CJS bundle.
            ['dist/esm/index.js', 1],
            ['dist/esm/charts/*/*.js', 34],
            // Source still ships, so deep `./src/*` imports keep resolving.
            // The extension is deliberately loose, as in wrappers: a file can
            // be .js or .ts and the count has to hold either way. Spelled
            // `*.js`, this would silently count only the JavaScript files.
            ['src/index.?s', 1],
            ['src/charts/*/*.?s', 34],
            // The generated declarations, which `types` and `exports.types`
            // resolve to. Each chart's types live in the chart, so they
            // arrive beside it rather than in a typings directory of their
            // own: one declaration per file in dist/esm/charts, helpers
            // included.
            ['dist/types/index.d.ts', 1],
            ['dist/types/charts/*/*.d.ts', 34],
            ['dist/types/typings/*/*.d.ts', 8],
            // The agent skill, copied in by prepack from skills/britecharts
            // at the repository root, so coding agents find it in
            // node_modules. Its evals stay out (see deny).
            ['skills/britecharts/SKILL.md', 1],
            ['skills/britecharts/references/*.md', 4],
        ],
        deny: [...COMMON_DENY, 'skills/**/evals/**'],
    },
    wrappers: {
        allow: [
            ['README.md', 1],
            // Copied from the repository root by each package's prepack
            ['LICENSE.md', 1],
            ['package.json', 1],
            ['dist/umd/bundle/wrappers.bundled.min.cjs', 1],
            ['dist/types-cjs/package.json', 1],
            ['dist/types-cjs/index.d.ts', 1],
            ['dist/cjs/bundle/wrappers.bundled.min.cjs', 1],
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
            // Source still ships, so deep `./src/*` imports keep resolving.
            // The extension is deliberately loose: a file can be .js or .ts,
            // and the count has to hold either way. Spelled `*.js`, the
            // assertion can pass by coincidence, matching files other than
            // the ones it means to check.
            ['src/index.?s', 1],
            ['src/charts/*/*.?s', 11],
        ],
        deny: COMMON_DENY,
    },
    react: {
        allow: [
            ['README.md', 1],
            // Copied from the repository root by each package's prepack
            ['LICENSE.md', 1],
            ['CHANGELOG.md', 1],
            ['package.json', 1],
            ['dist/umd/bundle/react.bundled.min.cjs', 1],
            ['dist/types-cjs/package.json', 1],
            ['dist/types-cjs/index.d.ts', 1],
            // The ESM entry, which `module` and `exports.import` resolve to.
            // Built for the same reason wrappers' and core's are: src/ holds
            // authored TypeScript, and no consumer can be expected to compile
            // it.
            ['dist/esm/index.js', 1],
            ['dist/esm/charts/*/*.js', 15],
            // And its generated declarations, which `types` resolves to. The
            // props are declared in each component, so they arrive beside it.
            ['dist/esm/index.d.ts', 1],
            ['dist/esm/charts/*/*.d.ts', 15],
            // Source still ships, so deep `./src/*` imports keep resolving.
            // The extensions are deliberately loose: a file can be .js or
            // .tsx, and the count has to hold either way. Spelled `*.js`, this
            // would quietly count only the JavaScript files.
            ['src/index.?s*', 1],
            ['src/charts/*/*.?s*', 15],
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
