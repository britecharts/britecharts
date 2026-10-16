import { fileURLToPath } from 'node:url';

// Every test runs in UTC, so date formatting and axis ticks do not depend on
// the machine. Set here, before Vitest starts its workers, which inherit it.
process.env.TZ = 'UTC';

const setupFile = fileURLToPath(new URL('./vitest.setup.mjs', import.meta.url));

// What each package's vitest.config.js builds on.
export default {
    test: {
        globals: true,
        environment: 'jsdom',
        environmentOptions: {
            jsdom: { url: 'http://localhost' },
        },
        include: ['src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
        setupFiles: ['vitest-canvas-mock', setupFile],
    },
};
