/* eslint-disable no-console */
// Copies the three built Storybooks into the docs site's build output so one
// GitHub Pages deploy carries the documentation and the demos:
//
//   /storybook/        the composed shell (packages/demos)
//   /storybook/core    @britecharts/core's Storybook
//   /storybook/react   @britecharts/react's Storybook
//
// The shell's production refs point at those two paths (see
// packages/demos/.storybook/main.js), so everything is same-origin.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'packages/docs/build');
const COPIES = [
    ['packages/demos/dist', 'storybook'],
    ['packages/core/dist/storybook', 'storybook/core'],
    ['packages/react/dist/storybook', 'storybook/react'],
];

if (!fs.existsSync(path.join(SITE, 'index.html'))) {
    console.error(
        'packages/docs/build is missing; run `yarn docs:build` first.'
    );
    process.exit(1);
}

// The shell is copied first and the others into it, so copy order matters and
// a stale /storybook from a previous run is removed rather than merged.
fs.rmSync(path.join(SITE, 'storybook'), { recursive: true, force: true });

for (const [from, to] of COPIES) {
    const source = path.join(ROOT, from);

    if (!fs.existsSync(path.join(source, 'index.html'))) {
        console.error(`${from} has no index.html; build that Storybook first.`);
        process.exit(1);
    }
    fs.cpSync(source, path.join(SITE, to), { recursive: true });
    console.log(`${from} -> build/${to}`);
}
