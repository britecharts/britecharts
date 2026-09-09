// Tier 3: every consumer page renders the chart, the stylesheet applies, and
// nothing errors on the way. One test per consumption path, so a failure
// names the path that broke.
const { test, expect } = require('@playwright/test');

const PAGES = [
    ['C1', 'cdn-bundle.html', 'CDN bundle via script tag, global `core`'],
    ['C2', 'cdn-chart.html', 'CDN per-chart file via script tag, global `core.bar`'],
    ['C3', 'umd-bundle.html', 'UMD bundle (package main) through a bundler'],
    ['C4', 'umd-chart.html', 'per-chart UMD build through a bundler'],
    ['C5', 'esm-bundle.html', 'ES modules (package module entry)'],
    ['C6', 'esm-chart.html', 'per-chart ES module by source path'],
];

// `.tick text { fill: #666a73 }` from styles/charts/common.css -- present in
// both the bundle and the per-chart stylesheets, and nothing else sets it.
const TICK_FILL = 'rgb(102, 106, 115)';

for (const [id, file, how] of PAGES) {
    test(`${id} · ${how}`, async ({ page }) => {
        const { barData } = await import('../consumers/vanilla/src/data.js');
        const problems = [];

        page.on('console', (message) => {
            if (message.type() === 'error') {
                problems.push(`console.error: ${message.text()}`);
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

        await page.goto(`/${file}`);

        const bars = page.locator('.bar-container svg.bar-chart rect.bar');

        await expect(bars).toHaveCount(barData.length);

        const tickFill = await page
            .locator('.bar-container .tick text')
            .first()
            .evaluate((element) => getComputedStyle(element).fill);

        expect(tickFill, 'stylesheet did not apply').toBe(TICK_FILL);
        expect(problems).toEqual([]);
    });
}
