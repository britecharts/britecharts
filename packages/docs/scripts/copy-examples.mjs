// Reads the runnable examples in the repository's examples/ folder into
// src/data/examples.json, which the Try page (src/pages/try.js) posts to
// StackBlitz. Posting the files opens a project in seconds; opening the
// folders from GitHub makes StackBlitz clone the whole repository first.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const examplesDir = path.join(docsDir, '..', '..', 'examples');
const target = path.join(docsDir, 'src', 'data', 'examples.json');

// What StackBlitz opens first in each example, and the order on the page
const EXAMPLES = [
    { id: 'vanilla', title: 'Plain JavaScript', openFile: 'main.js' },
    { id: 'react', title: 'React', openFile: 'src/App.jsx' },
];
const SKIPPED = new Set(['node_modules', 'dist', 'package-lock.json']);

const readFiles = (dir, prefix = '') =>
    readdirSync(dir, { withFileTypes: true })
        .filter((entry) => !SKIPPED.has(entry.name))
        .flatMap((entry) => {
            const relative = path.posix.join(prefix, entry.name);
            const absolute = path.join(dir, entry.name);

            return entry.isDirectory()
                ? readFiles(absolute, relative)
                : [[relative, readFileSync(absolute, 'utf8')]];
        });

const examples = EXAMPLES.map(({ id, title, openFile }) => {
    const files = Object.fromEntries(readFiles(path.join(examplesDir, id)));
    const { description } = JSON.parse(files['package.json']);

    return { id, title, description, openFile, files };
});

mkdirSync(path.dirname(target), { recursive: true });
writeFileSync(target, `${JSON.stringify(examples, null, 2)}\n`);

console.log(`Copied ${examples.length} examples to src/data/examples.json`);
