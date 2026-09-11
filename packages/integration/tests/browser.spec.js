// Tier 3: every consumer page renders its chart(s), the stylesheet applies,
// and nothing errors on the way. One test per consumption path, so a
// failure names the path that broke.
const { test, expect } = require('@playwright/test');

const VANILLA = 'http://localhost:4173';
const REACT = 'http://localhost:4174';

// `.tick text { fill: #666a73 }` from styles/charts/common.css -- present in
// both the bundle and the per-chart stylesheets, and nothing else sets it.
const TICK_FILL = 'rgb(102, 106, 115)';

const PAGES = [
    // id, url, description, expectations
    ['C1', `${VANILLA}/cdn-bundle.html`, 'CDN bundle via script tag, global `core`', { bars: true }],
    ['C2', `${VANILLA}/cdn-chart.html`, 'CDN per-chart file via script tag, global `core.bar`', { bars: true }],
    ['C3', `${VANILLA}/umd-bundle.html`, 'UMD bundle (package main) through a bundler', { bars: true }],
    ['C4', `${VANILLA}/umd-chart.html`, 'per-chart UMD build through a bundler', { bars: true }],
    ['C5', `${VANILLA}/esm-bundle.html`, 'ES modules (package module entry)', { bars: true }],
    ['C6', `${VANILLA}/esm-chart.html`, 'per-chart ES module by source path', { bars: true }],
    ['CDN', `${VANILLA}/cdn-jsdelivr.html`, 'published version: CDN bundle from jsDelivr', { bars: true, published: true }],
    ['R1–R2', `${REACT}/package.html`, 'React 19: named imports from @britecharts/react', { donut: true, line: true, react: true }],
    ['R3', `${REACT}/cjs-chart.html`, 'React 19: per-component CommonJS build', { donut: true, react: true }],
    ['R4', `${REACT}/umd-chart.html`, 'React 19: per-component UMD build', { donut: true, react: true }],
];

for (const [id, url, how, expects] of PAGES) {
    test(`${id} · ${how}`, async ({ page }) => {
        test.skip(
            Boolean(expects.published) && !process.env.SMOKE_REGISTRY,
            'needs a published version; run by smoke-published.yml'
        );

        const problems = [];

        page.on('console', (message) => {
            // React reports peer-version, act() and lifecycle problems through
            // console.error and console.warn; both count on the React pages.
            const types = expects.react ? ['error', 'warning'] : ['error'];

            if (types.includes(message.type())) {
                problems.push(`console.${message.type()}: ${message.text()}`);
            }
        });
        page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
        page.on('requestfailed', (request) =>
            problems.push(`request failed: ${request.url()} ${request.failure()?.errorText ?? ''}`)
        );
        page.on('response', (response) => {
            if (response.status() >= 400) {
                problems.push(`http ${response.status()}: ${response.url()}`);
            }
        });

        await page.goto(url);

        if (expects.bars) {
            const { barData } = await import('../consumers/vanilla/src/data.js');

            await expect(page.locator('.bar-container svg.bar-chart rect.bar')).toHaveCount(barData.length);
        }
        if (expects.donut) {
            const { donutData } = await import('../consumers/react/src/data.js');

            // `arc` is on the slice group; the chart nests a second group in each
            // slice, so count only the outer ones.
            await expect(page.locator('.donut-container svg.donut-chart g.arc:not(.arc .arc)')).toHaveCount(donutData.length);
        }
        if (expects.line) {
            const { lineData } = await import('../consumers/react/src/data.js');
            const topics = new Set(lineData.data.map((d) => d.topicName)).size;

            await expect(page.locator('.line-container svg.line-chart path.line')).toHaveCount(topics);
        }

        // Only charts with axes carry the tick rule; the donut pages prove the
        // stylesheet loaded through the request checks instead.
        if (expects.bars || expects.line) {
            const tickFill = await page
                .locator('.tick text')
                .first()
                .evaluate((element) => getComputedStyle(element).fill);

            expect(tickFill, 'stylesheet did not apply').toBe(TICK_FILL);
        }

        expect(problems).toEqual([]);
    });
}
