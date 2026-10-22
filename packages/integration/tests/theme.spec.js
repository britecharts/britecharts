// T: the colour tokens in a real browser. light-dark() follows the
// color-scheme a chart inherits, and jsdom resolves neither, so this is where
// a dark container is checked to give a chart its dark colours.
const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:4173/theme.html';

// The colour a chart's element resolves to, in each of the three containers
const fillIn = (page, container, selector) =>
    page
        .locator(`.${container} ${selector}`)
        .first()
        .evaluate((el) => getComputedStyle(el).fill);

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.locator('.override .britechart').waitFor();
});

test('T · a chart under color-scheme light keeps the light colours', async ({
    page,
}) => {
    // --bc-text-muted's light value, #666a73
    expect(await fillIn(page, 'light', '.tick text')).toBe(
        'rgb(102, 106, 115)'
    );
});

test('T · a chart under color-scheme dark takes the dark colours', async ({
    page,
}) => {
    // --bc-text-muted's dark value, #c3c6cf
    expect(await fillIn(page, 'dark', '.tick text')).toBe('rgb(195, 198, 207)');
});

test('T · a token the page sets wins over the default', async ({ page }) => {
    expect(await fillIn(page, 'override', '.tick text')).toBe('rgb(200, 0, 0)');
});
