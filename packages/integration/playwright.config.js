const { defineConfig, devices } = require('@playwright/test');

// One static server per consumer; tests/browser.spec.js addresses them by
// origin, so the pages of different consumers never share a port.
const CONSUMERS = [
    { name: 'vanilla', port: 4173 },
    { name: 'react', port: 4174 },
    // The same React pages built with React's development build, so that
    // StrictMode double-invokes effects (it does nothing in production).
    {
        name: 'react',
        port: 4175,
        env: { BRITECHARTS_REACT_DEV: '1', NODE_ENV: 'development' },
        mode: 'development',
    },
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
    webServer: CONSUMERS.map(({ name, port, env, mode }) => ({
        // A build, then a static server over it: not the dev server, whose
        // esbuild pre-bundling would skip Rollup's CommonJS/UMD interop.
        // Production is the path users ship; the one development-mode server
        // exists because StrictMode does nothing in a production build.
        //
        // `exec` before the preview command matters: without it, this whole
        // line runs as `sh -c "build && preview"`, and shutting a webServer
        // down means sending SIGTERM to that shell -- which does not forward
        // it to the preview process, orphaning it instead of stopping it.
        // Playwright then has no way to observe the server actually exit and
        // stalls its teardown. `exec` replaces the shell with the preview
        // process outright, so the signal reaches it directly.
        command: `pnpm exec vite build ${
            mode ? `--mode ${mode} ` : ''
        }--config consumers/${name}/vite.config.js && exec pnpm exec vite preview --config consumers/${name}/vite.config.js`,
        env,
        url: `http://localhost:${port}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    })),
});
