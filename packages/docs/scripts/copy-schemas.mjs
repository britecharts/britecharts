// Copies the chart spec schemas from the wrappers package to static/schema/v3,
// which Docusaurus serves at the URLs their $id and a spec's $schema name, such
// as https://britecharts.github.io/britecharts/schema/v3/bar.json. The wrappers
// package generates them from the chart types; they're copied, not rebuilt.
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const source = path.join(docsDir, '..', 'wrappers', 'schemas');
const target = path.join(docsDir, 'static', 'schema', 'v3');

mkdirSync(target, { recursive: true });

const files = readdirSync(source).filter((file) => file.endsWith('.json'));

files.forEach((file) =>
    cpSync(path.join(source, file), path.join(target, file))
);

console.log(`Copied ${files.length} chart schemas to static/schema/v3`);
