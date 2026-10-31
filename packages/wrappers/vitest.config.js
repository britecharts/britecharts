import { fileURLToPath } from 'node:url';
import { defineProject, mergeConfig } from 'vitest/config';

import shared from '../../vitest.shared.mjs';

const source = (path) => fileURLToPath(new URL(path, import.meta.url));

export default mergeConfig(
    shared,
    defineProject({
        // Core from its source, so the specs need no build of it first.
        resolve: {
            alias: { '@britecharts/core': source('../core/src/index.ts') },
        },
        test: {
            name: '@britecharts/wrappers',
            coverage: {
                include: ['src/**/*.ts'],
                exclude: ['src/**/*.spec.ts'],
                thresholds: {
                    statements: 96,
                    branches: 91,
                    functions: 93,
                    lines: 97,
                },
            },
        },
    })
);
