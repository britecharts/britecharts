// B: a real pointer selecting windows on a brush. jsdom has no geometry, so a
// brush gesture cannot run in the unit specs; this is where a selection is
// checked to be drawn where the pointer drags it.
const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:4173/brush.html';

// The brush eases a finished selection to whole days; let that settle.
const SETTLE_MS = 600;

const overlayBox = (page) =>
    page.locator('.brush-chart .brush-group .overlay').boundingBox();

async function drag(page, box, from, to) {
    const y = box.y + box.height / 2;

    await page.mouse.move(box.x + box.width * from, y);
    await page.mouse.down();
    for (let step = 1; step <= 12; step++) {
        await page.mouse.move(
            box.x + box.width * (from + ((to - from) * step) / 12),
            y
        );
        await page.waitForTimeout(25);
    }
    await page.mouse.up();
}

// The selection's left edge on every animation frame, from now on
const recordSelectionX = (page) =>
    page.evaluate(() => {
        const selection = document.querySelector(
            '.brush-chart .brush-group .selection'
        );

        window.selectionXs = [];
        const record = () => {
            window.selectionXs.push(Number(selection.getAttribute('x')));
            requestAnimationFrame(record);
        };

        requestAnimationFrame(record);
    });

test('B · a second window is drawn where it is dragged, without flickering back to the first', async ({
    page,
}) => {
    await page.goto(URL);
    const box = await overlayBox(page);

    await drag(page, box, 0.05, 0.25);
    await page.waitForTimeout(SETTLE_MS);

    const firstX = await page
        .locator('.brush-chart .brush-group .selection')
        .evaluate((selection) => Number(selection.getAttribute('x')));

    await recordSelectionX(page);
    await drag(page, box, 0.6, 0.85);

    const secondStart = box.width * 0.6;
    const xs = await page.evaluate(() => window.selectionXs);
    // The frames from the first one drawn at the second window: those before
    // it show the first window, as they should until the pointer goes down
    const atSecond = (x) => Math.abs(x - secondStart) <= 20;
    const duringSecondDrag = xs.slice(xs.findIndex(atSecond));
    // While the second window is dragged rightwards its left edge stays put.
    // A frame drawn back towards the first window is the flicker.
    const framesNearFirst = duringSecondDrag.filter((x) => !atSecond(x));

    expect(duringSecondDrag.length).toBeGreaterThan(0);

    expect(firstX).toBeLessThan(secondStart - 100);
    expect(framesNearFirst).toEqual([]);
});

test('B · each selection is reported once', async ({ page }) => {
    await page.goto(URL);
    const box = await overlayBox(page);

    await drag(page, box, 0.05, 0.25);
    await page.waitForTimeout(SETTLE_MS * 2);
    await drag(page, box, 0.6, 0.85);
    await page.waitForTimeout(SETTLE_MS * 2);

    const ends = await page.evaluate(() => window.brushEnds.length);

    expect(ends).toBe(2);
});
