import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../../../..');

// One HTML page per consumption path; see the README in this folder.
const pages = [
    'index',
    'package',
    'cjs-chart',
    'umd-chart',
    'strict',
    'lifecycle',
];

// The same pages are built twice: for production (port 4174), and for
// development (port 4175), where React runs its development build and
// StrictMode therefore double-invokes effects. playwright.config.js sets the
// variable; NODE_ENV=development is what selects React's development build.
const development = process.env.BRITECHARTS_REACT_DEV === '1';

export default defineConfig({
    root: here,
    plugins: [react()],
    build: {
        outDir: development ? 'dist-dev' : 'dist',
        // A development build is the point: leave it readable and unminified.
        minify: !development,
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
        port: development ? 4175 : 4174,
        strictPort: true,
    },
});
