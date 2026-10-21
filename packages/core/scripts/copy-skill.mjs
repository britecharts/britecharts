/**
 * Copies the Britecharts agent skill into this package before it is packed,
 * so it ships in node_modules/@britecharts/core/skills/britecharts, where
 * coding agents look for a library's skills.
 *
 * The skill's source lives at the repository root, in skills/britecharts, so
 * it can also be installed straight from GitHub. Its evals/ folder holds the
 * tests the skill was measured with and stays out of the package.
 *
 * Runs as `prepack`, which `pnpm pack` and `pnpm publish` both trigger.
 */
import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const source = path.resolve(packageDir, '../../skills/britecharts');
const target = path.join(packageDir, 'skills/britecharts');

if (!existsSync(path.join(source, 'SKILL.md'))) {
    console.error(`No skill to copy: ${source}/SKILL.md is missing.`);
    process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, {
    recursive: true,
    filter: (file) => !file.split(path.sep).includes('evals'),
});
console.log(`-= Copied the britecharts skill into ${path.relative(packageDir, target)} =-`);
