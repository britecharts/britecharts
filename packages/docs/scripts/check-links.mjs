// Crawls the built docs site and fails on broken links.
//
// Docusaurus already fails the build on a broken *internal* link
// (onBrokenLinks: 'throw'). What it cannot see is everything that leaves the
// site -- GitHub, npm, jsDelivr, the d3 docs, the Storybooks -- and those
// links rot between edits. So this serves `build/` the way GitHub Pages will
// and follows every link on every page, external ones included.
//
// Run `yarn docs:build` first; then `yarn workspace @britecharts/docs docs:links`.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LinkChecker } from 'linkinator';

const docsDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const PORT = 3030;
// The site's baseUrl, as in docusaurus.config.js
const BASE = `http://localhost:${PORT}/britecharts/`;
// Where the site is deployed (url + baseUrl in docusaurus.config.js). Every
// page links to itself there -- canonical, Open Graph, the feeds -- and a page
// added in this change does not exist there yet, so those links are checked
// against the local build instead.
const DEPLOYED = 'https://britecharts.github.io/britecharts/';

// Links not worth failing a build over. Keep this list short and dated.
const SKIP = [
    // Slack refuses anything that is not a browser
    'slack\\.com',
    // The Storybooks are added to the site at deploy time (scripts/compose-site.js),
    // not by `docs:build`, so they are not in a local build; the deployed ones
    // are still checked through the absolute links the READMEs carry
    `^${BASE.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}storybook`,
    // Until 3.0.0 is published, nothing under @britecharts exists on npm or
    // jsDelivr. Remove these two after the first publish.
    'npmjs\\.com/package/@britecharts',
    'cdn\\.jsdelivr\\.net/npm/@britecharts',
];

if (!existsSync(path.join(docsDir, 'build', 'index.html'))) {
    console.error(
        'packages/docs/build is missing; run `yarn docs:build` first.'
    );
    process.exit(2);
}

const server = spawn(
    'yarn',
    ['docusaurus', 'serve', '--port', String(PORT), '--no-open'],
    { cwd: docsDir, stdio: 'ignore' }
);

const stop = () => {
    if (!server.killed) {
        server.kill();
    }
};

process.on('exit', stop);

async function waitForServer() {
    const deadline = Date.now() + 30000;

    while (Date.now() < deadline) {
        try {
            const response = await fetch(BASE);

            if (response.ok) {
                return;
            }
        } catch {
            // not up yet
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    throw new Error(`The docs server did not come up on ${BASE}`);
}

try {
    await waitForServer();

    const checker = new LinkChecker();
    const result = await checker.check({
        path: BASE,
        recurse: true,
        concurrency: 20,
        timeout: 20000,
        retry: true,
        retryErrors: true,
        retryErrorsCount: 2,
        linksToSkip: SKIP,
        urlRewriteExpressions: [{ pattern: DEPLOYED, replacement: BASE }],
    });
    const broken = result.links.filter((link) => link.state === 'BROKEN');
    const checked = result.links.filter((link) => link.state !== 'SKIPPED');

    if (broken.length === 0) {
        console.log(`✔️  ${checked.length} links checked, none broken`);
        process.exit(0);
    }

    const byParent = new Map();

    for (const link of broken) {
        const parent = (link.parent || '(start)').replace(BASE, '/');
        const list = byParent.get(parent) || [];

        list.push(`${link.status || 'ERR'}  ${link.url.replace(BASE, '/')}`);
        byParent.set(parent, list);
    }

    console.error(
        `✖ ${broken.length} broken link(s) on ${byParent.size} page(s):\n`
    );

    for (const [parent, links] of byParent) {
        console.error(`  ${parent}`);
        for (const line of links) {
            console.error(`    ${line}`);
        }
    }
    process.exit(1);
} finally {
    stop();
}
