import { defineConfig } from 'vitest/config';

// `pnpm exec vitest` at the repo root runs every package's suite. Each
// package's vitest.config.js also runs on its own, through its `test` script.
export default defineConfig({
    test: {
        projects: [
            'packages/core/vitest.config.js',
            'packages/wrappers/vitest.config.js',
            'packages/react/vitest.config.js',
        ],
    },
});
