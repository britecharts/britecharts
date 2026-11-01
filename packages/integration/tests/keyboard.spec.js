// K: keyboard navigation in a real browser. jsdom has no layout, so every
// point sits at the origin there; this is where an arrow key is checked to
// move the tooltip from one data point to the next.
const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:4173/hover.html';

test.use({ viewport: { width: 1300, height: 900 } });

const CHARTS = [
    ['line', '.britechart-tooltip'],
    ['stacked-area', '.britechart-tooltip'],
    ['stacked-bar', '.britechart-tooltip'],
    ['grouped-bar', '.britechart-tooltip'],
    ['bar', '.britechart-mini-tooltip'],
    ['scatter-plot', '.britechart-mini-tooltip'],
    ['heatmap', '.britechart-mini-tooltip'],
    ['treemap', '.britechart-mini-tooltip'],
];

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.locator('.hover-heatmap svg.britechart').waitFor();
});

test('K · Tab reaches the first chart', async ({ page }) => {
    await page.keyboard.press('Tab');

    await expect(page.locator('.hover-line svg.britechart')).toBeFocused();
});

for (const [name, tooltipSelector] of CHARTS) {
    test(`K · the ${name} chart's tooltip follows the arrow keys`, async ({
        page,
    }) => {
        const container = page.locator(`.hover-${name}`);
        const tooltip = container.locator(tooltipSelector);
        const text = () => tooltip.evaluate((el) => el.textContent);

        await container.locator('svg.britechart').focus();
        await page.keyboard.press('ArrowRight');
        await expect(tooltip).toBeVisible();

        const first = await text();

        await page.keyboard.press('ArrowRight');
        await expect(tooltip).toBeVisible();
        await expect.poll(text).not.toBe(first);

        await page.keyboard.press('Escape');
        await expect(tooltip).toBeHidden();
    });
}
