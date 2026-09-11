import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../../../..');

// One HTML page per consumption path; see the README in this folder.
const pages = ['index', 'package', 'cjs-chart', 'umd-chart'];

export default defineConfig({
    root: here,
    plugins: [react()],
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
        port: 4174,
        strictPort: true,
    },
});
