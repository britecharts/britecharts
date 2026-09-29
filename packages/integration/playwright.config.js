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
        // The preview command execs the vite bin shim directly rather than
        // going through `pnpm exec vite preview`. `pnpm exec` doesn't
        // reliably stay alive for the life of a long-running server it
        // spawns -- observed directly: with three of these servers running,
        // one `pnpm exec vite preview` process exited on its own well before
        // teardown, orphaning its vite child (still listening on its port,
        // reparented to pid 1) while Playwright kept trying to manage a pid
        // that no longer existed. All 21 tests would pass and the run would
        // then hang indefinitely at teardown -- every command in the chain
        // had already succeeded, so nothing failed, nothing retried, no
        // error ever surfaced; only GitHub's own 6h job cap (later this
        // repo's own timeout-minutes) ever ended it. `exec` alone doesn't
        // fix this -- `exec pnpm exec vite preview` still leaves `pnpm exec`
        // free to spawn its own child rather than being replaced by it, so
        // the orphaning risk is one layer below where `exec` operates.
        // Going straight at the bin shim removes that layer: the shim's own
        // `exec node .../vite.js "$@"` (see node_modules/.bin/vite) means
        // this line's `exec` replaces the shell with a process that *is*
        // the vite CLI the whole way down, with nothing in between able to
        // exit early and leave it behind.
        command: `pnpm exec vite build ${
            mode ? `--mode ${mode} ` : ''
        }--config consumers/${name}/vite.config.js && exec node_modules/.bin/vite preview --config consumers/${name}/vite.config.js`,
        env,
        url: `http://localhost:${port}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    })),
});
