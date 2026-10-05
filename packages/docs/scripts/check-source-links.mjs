/**
 * Checks every link the docs make to a source file in this repository.
 *
 * `docs:links` already follows every link on the built site, but it resolves
 * them over the network against `main`. A link to a file this branch renames
 * therefore stays green for the whole life of the pull request and only turns
 * red once the branch merges and `main` catches up -- which is exactly what
 * happened when `color.js` became `color.ts`: #1083 passed, and `main` went red
 * the moment it landed.
 *
 * This resolves the same links against the working tree instead, so a rename
 * fails on the pull request that causes it. It needs no network and no build.
 *
 * The TypeScript migration renames roughly a hundred files, so this is the
 * difference between catching those links once each and catching them after the
 * fact, one merge at a time.
 */
import { glob, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../../..');
const docsRoot = path.resolve(scriptDir, '..');

// Only this repository's own blob links, and only the default branch: a link
// pinned to a tag or a commit refers to a file as it was then, which renaming
// something today does not break.
const BLOB_LINK =
    /https:\/\/github\.com\/britecharts\/britecharts\/blob\/main\/([^)\s"'>]+)/g;

// Node's own glob rather than the `glob` package, which is CommonJS here and
// would need a default-import dance in an ESM script for no benefit.
const pages = await Array.fromAsync(
    glob('{docs,blog,src}/**/*.{md,mdx,js,jsx,ts,tsx}', {
        cwd: docsRoot,
        exclude: (name) => name === 'node_modules',
    })
);

const dead = [];
let checked = 0;

for (const page of pages) {
    const absolute = path.join(docsRoot, page);
    const contents = await readFile(absolute, 'utf8');

    for (const [, target] of contents.matchAll(BLOB_LINK)) {
        // A link may carry a line anchor (`#L12`) or a query; neither is part
        // of the path on disk.
        const relativePath = target.split(/[#?]/)[0];

        checked += 1;

        if (!existsSync(path.join(repoRoot, relativePath))) {
            dead.push({
                page: path.relative(repoRoot, absolute),
                target: relativePath,
            });
        }
    }
}

if (dead.length) {
    console.error(
        `✖ ${dead.length} of ${checked} source link(s) point at files that do not exist:\n`
    );

    for (const { page, target } of dead) {
        console.error(`  ${page}`);
        console.error(`    ${target}\n`);
    }

    console.error(
        'A renamed or converted file needs its documentation links updated in the\n' +
            'same change, or they break on main the moment this merges.'
    );
    process.exit(1);
}

console.log(`✔️  ${checked} source links checked, all resolve`);
