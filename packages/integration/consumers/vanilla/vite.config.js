import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../../../..');
const coreSrc = path.resolve(repoRoot, 'packages/core/src');

// One HTML page per consumption path; see the README in this folder.
const pages = [
    'index',
    'cdn-bundle',
    'cdn-chart',
    'umd-bundle',
    'umd-chart',
    'esm-bundle',
    'esm-chart',
    'cdn-jsdelivr', // published version only; see the page
    'hover', // every tooltip attachment point, for tests/hover.spec.js
];

// BRITECHARTS_SOURCE=1 (the `start` script) points the bare specifiers at
// the workspace source so chart work can be checked here without a build.
// dist/ paths still resolve to the installed tarball.
const useSource = process.env.BRITECHARTS_SOURCE === '1';

export default defineConfig({
    root: here,
    resolve: {
        alias: useSource
            ? [
                  {
                      find: /^@britecharts\/core$/,
                      replacement: path.join(coreSrc, 'index.js'),
                  },
                  {
                      find: /^@britecharts\/core\/src\/(.*)$/,
                      replacement: `${coreSrc}/$1`,
                  },
              ]
            : [],
    },
    build: {
        rollupOptions: {
            input: Object.fromEntries(
                pages.map((page) => [page, path.resolve(here, `${page}.html`)])
            ),
        },
    },
    server: {
        fs: { allow: [repoRoot] },
    },
    preview: {
        // Vite's default host ('localhost', unresolved) lands on an
        // IPv6-only bind on this toolchain's Node, while Playwright's
        // webServer readiness probe connects over IPv4 -- a permanent
        // mismatch that leaves it retrying for many minutes before giving
        // up on IPv6 and eventually succeeding. Binding IPv4 loopback
        // explicitly is what the probe actually reaches.
        host: '127.0.0.1',
        port: 4173,
        strictPort: true,
    },
});
