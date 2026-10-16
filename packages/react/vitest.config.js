import { fileURLToPath } from 'node:url';
import { defineProject, mergeConfig } from 'vitest/config';

import shared from '../../vitest.shared.mjs';

const source = (path) => fileURLToPath(new URL(path, import.meta.url));

const config = mergeConfig(
    shared,
    defineProject({
        // tsconfig.json's `"jsx": "react"` would pick the classic transform,
        // which React 19 warns about; the UMD build sets its own.
        oxc: { jsx: { runtime: 'automatic' } },
        // Core and wrappers from their source, so the specs need no build.
        resolve: {
            alias: {
                '@britecharts/core': source('../core/src/index.ts'),
                '@britecharts/wrappers': source('../wrappers/src/index.ts'),
            },
        },
        test: {
            name: '@britecharts/react',
            coverage: {
                include: ['src/charts/**/*.{js,ts,tsx}'],
                exclude: [
                    'src/charts/**/*.{spec,stories,fixtures}.{js,ts,tsx}',
                ],
                thresholds: {
                    statements: 93,
                    branches: 85,
                    functions: 93,
                    lines: 94,
                    'src/charts/helpers/useChart.ts': {
                        statements: 95,
                        branches: 90,
                        functions: 95,
                        lines: 95,
                    },
                },
            },
        },
    })
);

// After the shared setup, whose jsdom polyfills d3's transitions need: this
// package's setup then fails a test on unexpected console output, on top of
// the shared console.warn silencer.
config.test.setupFiles.push(source('./vitest.setup.js'));

export default config;
