const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;
const VANILLA = 'consumers/vanilla/vite.config.js';

module.exports = defineConfig({
    testDir: './tests',
    // Node's test runner owns *.test.js; Playwright owns *.spec.js.
    testMatch: '**/*.spec.js',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    reporter: 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        // A production build, then a static server over it: that is the path
        // users ship, and it exercises Rollup's CommonJS/UMD interop rather
        // than the dev server's esbuild pre-bundling.
        command: `yarn vite build --config ${VANILLA} && yarn vite preview --config ${VANILLA}`,
        url: `http://localhost:${PORT}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
