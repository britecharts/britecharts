import { defineProject, mergeConfig } from 'vitest/config';

import shared from '../../vitest.shared.mjs';

export default mergeConfig(
    shared,
    defineProject({
        test: {
            name: '@britecharts/core',
            coverage: {
                include: ['src/charts/**/*.ts'],
                exclude: ['src/charts/**/*.spec.ts'],
                thresholds: {
                    statements: 93,
                    branches: 85,
                    functions: 91,
                    lines: 93,
                    'src/charts/brush/brush.ts': {
                        statements: 95,
                        branches: 90,
                        functions: 95,
                        lines: 95,
                    },
                    'src/charts/helpers/export.ts': {
                        statements: 95,
                        branches: 90,
                        functions: 95,
                        lines: 95,
                    },
                    'src/charts/helpers/grid.ts': {
                        statements: 95,
                        branches: 90,
                        functions: 95,
                        lines: 95,
                    },
                    'src/charts/legend/legend.ts': {
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
