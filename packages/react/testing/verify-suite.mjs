#!/usr/bin/env node
/* eslint-disable no-console -- a command-line reporter: the console is its output */
/**
 * verify:suite -- does the test suite notice when the hooks lifecycle breaks?
 *
 * Applies each maintained mutation patch (testing/mutants/*.patch) to the
 * source, runs the specs that are meant to catch it, and requires them to go
 * red. A mutant that leaves the specs green SURVIVED: the suite has a hole.
 *
 * A quality gate that silently reports green is worse than none, so the runner
 * never lets one of these pass for the wrong reason. Distinct exit codes:
 *
 *   0  every mutant was killed by a failing test
 *   1  a mutant SURVIVED: the specs stayed green
 *   2  a patch DID NOT APPLY: it rotted, regenerate it in the PR that changed
 *      its target (a patch that does not apply kills nothing)
 *   4  the baseline was already red: nothing can be concluded
 *   5  a mutant broke the build (no test failed): it was not killed by a test
 *
 * Patches apply with `git apply` from the repository root and are always
 * reverted, including on Ctrl-C.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const repoRoot = spawnSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: packageRoot,
    encoding: 'utf8',
}).stdout.trim();

const MUTANTS = [
    {
        id: 'm2',
        title: 'delete the recovery branch: a chart is only ever created on the first render',
        patch: 'm2-no-recovery.patch',
        specs: [
            'src/charts/helpers/useChart.spec.js',
            'src/charts/line/Line.lifecycle.spec.js',
        ],
    },
    {
        id: 'm3',
        title: 'call createTooltip after the creation too, not only after an update',
        patch: 'm3-tooltip-after-create.patch',
        specs: [
            'src/charts/helpers/useChart.spec.js',
            'src/charts/line/Line.lifecycle.spec.js',
        ],
    },
    {
        id: 'm6',
        title: 'rebuild the chart Tooltip wraps on every render instead of when its props change',
        patch: 'm6-tooltip-child-not-memoised.patch',
        specs: ['src/charts/tooltip/Tooltip.spec.js'],
    },
];

const EXIT = {
    killed: 0,
    survived: 1,
    notApplied: 2,
    baselineRed: 4,
    buildBroke: 5,
};

const run = (command, args, cwd) =>
    spawnSync(command, args, {
        cwd,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
    });

const jest = (specs) =>
    run('npx', ['jest', ...specs, '--coverage=false', '--ci'], packageRoot);

const strip = (text) => text.replace(/\u001b\[[0-9;]*m/g, '');

// Jest's `Tests:` summary counts assertions that failed. A suite that could not
// even load (a syntax error in the mutant) prints `● Test suite failed to run`
// and a summary with no failed tests: that is a broken build, not a kill.
const failedCount = (output) =>
    Number(
        (strip(output).match(/^Tests:\s+(?:.*?,\s*)?(\d+) failed/m) || [])[1] ||
            0
    );

const failedTests = (output) =>
    [...strip(output).matchAll(/^\s+● (.+)$/gm)]
        .map((match) => match[1])
        .filter((name) => !/^Test suite failed to run/.test(name))
        .filter((name, index, all) => all.indexOf(name) === index);

const filesOf = (patchPath) =>
    [...fs.readFileSync(patchPath, 'utf8').matchAll(/^\+\+\+ b\/(.+)$/gm)].map(
        ([, file]) => path.join(repoRoot, file)
    );

// Restores the touched files whatever happens
let restore = () => {};
const finish = (code) => {
    restore();
    process.exit(code);
};
process.on('SIGINT', () => finish(130));
process.on('SIGTERM', () => finish(143));

const allSpecs = [...new Set(MUTANTS.flatMap(({ specs }) => specs))];

console.log(
    `verify:suite  baseline: ${allSpecs.length} spec files, unmodified`
);
const baseline = jest(allSpecs);

if (baseline.status !== 0) {
    console.error(
        'BASELINE RED: the specs fail without any mutation, so nothing can be concluded.'
    );
    console.error(
        strip(baseline.stdout + baseline.stderr)
            .split('\n')
            .slice(-25)
            .join('\n')
    );
    finish(EXIT.baselineRed);
}

const killed = [];

for (const mutant of MUTANTS) {
    const patchPath = path.join(
        packageRoot,
        'testing',
        'mutants',
        mutant.patch
    );
    const label = `${mutant.id} (${mutant.title})`;

    if (!fs.existsSync(patchPath)) {
        console.error(
            `PATCH DID NOT APPLY: ${label}\n  ${mutant.patch} does not exist.`
        );
        finish(EXIT.notApplied);
    }

    const check = run('git', ['apply', '--check', patchPath], repoRoot);

    if (check.status !== 0) {
        console.error(
            `PATCH DID NOT APPLY: ${label}\n  ${mutant.patch} no longer applies to the source, so it kills nothing.\n  Regenerate it in the PR that changed its target.\n${check.stderr}`
        );
        finish(EXIT.notApplied);
    }

    const backups = new Map(
        filesOf(patchPath).map((file) => [file, fs.readFileSync(file)])
    );

    restore = () =>
        backups.forEach((content, file) => fs.writeFileSync(file, content));

    const applied = run('git', ['apply', patchPath], repoRoot);

    if (applied.status !== 0) {
        console.error(`PATCH DID NOT APPLY: ${label}\n${applied.stderr}`);
        finish(EXIT.notApplied);
    }

    const result = jest(mutant.specs);
    const output = strip(result.stdout + result.stderr);

    restore();
    restore = () => {};

    if (result.status === 0) {
        console.error(
            `MUTANT SURVIVED: ${label}\n  ${mutant.specs.join(
                ', '
            )} stayed green: the suite does not notice this break.`
        );
        finish(EXIT.survived);
    }

    const failed = failedTests(output);

    if (!failedCount(output) || !failed.length) {
        console.error(
            `MUTANT BROKE THE BUILD, NO TEST FAILED: ${label}\n  It was not killed by a test.\n${output
                .split('\n')
                .slice(-15)
                .join('\n')}`
        );
        finish(EXIT.buildBroke);
    }

    killed.push(mutant.id);
    console.log(`KILLED ${mutant.id}: ${mutant.title}`);
    failed.slice(0, 3).forEach((name) => console.log(`         by: ${name}`));
    if (failed.length > 3) {
        console.log(`         and ${failed.length - 3} more`);
    }
}

console.log(
    `\nverify:suite: ${killed.length}/${
        MUTANTS.length
    } mutants killed (${killed.join(', ')})`
);
finish(EXIT.killed);
