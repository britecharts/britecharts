import { defineProject, mergeConfig } from 'vitest/config';

import shared from '../../vitest.shared.mjs';

export default mergeConfig(
    shared,
    defineProject({ test: { name: '@britecharts/core' } })
);
