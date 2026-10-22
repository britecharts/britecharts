/**
 * Copies the repository's LICENSE.md into the package being packed, so the
 * license text ships in its tarball. npm includes a package's LICENSE file
 * whatever its `files` field says, but only from the package's own folder,
 * and the one license lives at the repository root.
 *
 * Runs as each published package's `prepack`, with that package's folder as
 * the working directory, which is where pnpm runs package scripts.
 */
import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(repoRoot, 'LICENSE.md');
const target = path.join(process.cwd(), 'LICENSE.md');

copyFileSync(source, target);
console.log(`-= Copied LICENSE.md into ${path.relative(repoRoot, process.cwd())} =-`);
