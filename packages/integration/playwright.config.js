const { defineConfig, devices } = require('@playwright/test');

// One static server per consumer; tests/browser.spec.js addresses them by
// origin, so the pages of different consumers never share a port.
const CONSUMERS = [
    { name: 'vanilla', port: 4173 },
    { name: 'react', port: 4174 },
];

module.exports = defineConfig({
    testDir: './tests',
    // Node's test runner owns *.test.js; Playwright owns *.spec.js.
    testMatch: '**/*.spec.js',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    reporter: 'list',
    use: {
        trace: 'retain-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: CONSUMERS.map(({ name, port }) => ({
        // A production build, then a static server over it: that is the path
        // users ship, and it exercises Rollup's CommonJS/UMD interop rather
        // than the dev server's esbuild pre-bundling.
        command: `yarn vite build --config consumers/${name}/vite.config.js && yarn vite preview --config consumers/${name}/vite.config.js`,
        url: `http://localhost:${port}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    })),
});
