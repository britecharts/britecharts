// D: the data tables in a real browser. jsdom builds the markup but has no
// accessibility tree and no layout, so this is where a table is checked to be
// what a screen reader finds, linked from its chart, and out of sight.
const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:4173/hover.html';

const CHARTS = [
    'line',
    'stacked-area',
    'stacked-bar',
    'grouped-bar',
    'bar',
    'scatter-plot',
    'heatmap',
    'treemap',
];

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.locator('.hover-heatmap svg.britechart').waitFor();
});

for (const name of CHARTS) {
    test(`D · the ${name} chart's data is a table a screen reader reaches`, async ({
        page,
    }) => {
        const container = page.locator(`.hover-${name}`);
        const svg = container.locator('svg.britechart');
        const label = await svg.getAttribute('aria-label');
        // Found by its role and accessible name, as assistive technology does
        const table = container.getByRole('table', { name: `${label}, data` });

        await expect(table).toHaveCount(1);
        const wrapper = container.locator('div.britechart-data-table');

        expect(await svg.getAttribute('aria-details')).toBe(
            await wrapper.getAttribute('id')
        );
        expect(await table.getByRole('columnheader').count()).toBeGreaterThan(
            1
        );
        expect(await table.getByRole('rowheader').count()).toBeGreaterThan(0);

        // Out of sight: a single pixel, which takes no room from the chart
        const box = await wrapper.boundingBox();

        expect(box.width).toBeLessThanOrEqual(1);
        expect(box.height).toBeLessThanOrEqual(1);
    });
}
