// H: a real pointer over every way a tooltip is attached to a chart. The
// unit specs cannot see geometry (jsdom has none), so this is where "the
// tooltip never leaves the chart" is actually checked -- at the corners and
// the middle, where it has to flip or slide to stay inside.
const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:4173/hover.html';

// Tall enough for a 600×300 chart and the tooltip that flips around it.
test.use({ viewport: { width: 1300, height: 900 } });

// How far inside an edge the pointer goes: enough to be over the element,
// not enough to be clear of the edge the tooltip has to respect.
const INSET = 4;
// Both tooltips move over a short transition; let it settle before measuring.
const SETTLE_MS = 300;

// [name, container, where the pointer goes, tooltip root]. The pointer has
// to land where the chart resolves a data point, which differs per chart:
//   svg          — anywhere over the svg: five points, corners and centre
//                  (line snaps to the nearest date; scatter to the nearest point)
//   span <sel>   — the left edge, a data point and the right edge of the
//                  first matching shape, at the top, centre and bottom of
//                  the svg (stacked area resolves a point only within half a
//                  step of a date, and its area path runs from the first
//                  date to the last)
//   shape <sel>  — inside the first, middle and last matching shapes (the
//                  charts whose tooltip is for their shapes only: bar,
//                  scatter and heatmap listen on the shapes; stacked and
//                  grouped bar listen on the svg but only over a bar)
const CHARTS = [
    ['line + tooltip', '.hover-line', 'svg', '.britechart-tooltip'],
    [
        'stacked area + tooltip',
        '.hover-stacked-area',
        'span path.layer',
        '.britechart-tooltip',
    ],
    [
        'stacked bar + tooltip',
        '.hover-stacked-bar',
        'shape rect.bar',
        '.britechart-tooltip',
    ],
    [
        'grouped bar + tooltip',
        '.hover-grouped-bar',
        'shape rect.bar',
        '.britechart-tooltip',
    ],
    [
        'bar + mini tooltip',
        '.hover-bar',
        'shape rect.bar',
        '.britechart-mini-tooltip',
    ],
    [
        'scatter plot + mini tooltip',
        '.hover-scatter-plot',
        'svg',
        '.britechart-mini-tooltip',
    ],
    [
        'heatmap + mini tooltip',
        '.hover-heatmap',
        'shape rect.box',
        '.britechart-mini-tooltip',
    ],
];

async function hoverPoints(container, frame, target) {
    const left = frame.x + INSET;
    const right = frame.x + frame.width - INSET;
    const top = frame.y + INSET;
    const bottom = frame.y + frame.height - INSET;
    const midX = frame.x + frame.width / 2;
    const midY = frame.y + frame.height / 2;

    if (target === 'svg') {
        return [
            [left, top],
            [right, top],
            [midX, midY],
            [left, bottom],
            [right, bottom],
        ];
    }

    const [strategy, selector] = target.split(' ');
    const shapes = container.locator(selector);

    if (strategy === 'span') {
        const span = await shapes.first().boundingBox();
        const first = span.x + 1;
        const last = span.x + span.width - 1;
        // The hover data has eight evenly spaced dates: 3/7 of the way
        // along is the fourth one exactly.
        const fourth = span.x + (span.width * 3) / 7;

        return [
            [first, top],
            [first, midY],
            [first, bottom],
            [fourth, midY],
            [last, top],
            [last, midY],
            [last, bottom],
        ];
    }

    const count = await shapes.count();
    const boxes = await Promise.all(
        [0, Math.floor(count / 2), count - 1].map((index) =>
            shapes.nth(index).boundingBox()
        )
    );
    const centreX = ({ x, width }) => x + width / 2;
    const centre = (box) => [centreX(box), box.y + box.height / 2];
    const [first, middle, last] = boxes;

    const topOf = (box) => [centreX(box), box.y + INSET];
    const bottomOf = (box) => [centreX(box), box.y + box.height - INSET];

    return [
        topOf(first),
        centre(first),
        bottomOf(first),
        centre(middle),
        topOf(last),
        centre(last),
        bottomOf(last),
    ];
}

// Any attribute in the container that reads "NaN" -- a NaN transform or
// size draws nothing, silently.
function nanAttributes(container) {
    return container.evaluate((root) =>
        Array.from(root.querySelectorAll('*'))
            .flatMap((el) =>
                Array.from(el.attributes)
                    .filter((attr) => /NaN/.test(attr.value))
                    .map(
                        (attr) =>
                            `<${el.tagName.toLowerCase()} ${attr.name}="${
                                attr.value
                            }">`
                    )
            )
            .slice(0, 5)
    );
}

for (const [name, selector, target, tooltipSelector] of CHARTS) {
    test(`H · ${name} stays inside the chart`, async ({ page }) => {
        const problems = [];

        page.on('console', (message) => {
            if (message.type() === 'error') {
                problems.push(`console.error: ${message.text()}`);
            }
        });
        page.on('pageerror', (error) =>
            problems.push(`pageerror: ${error.message}`)
        );

        await page.goto(URL);

        const container = page.locator(selector);
        const svg = container.locator('svg').first();
        const tooltip = container.locator(tooltipSelector);
        const background = tooltip.locator('.tooltip-background');

        await expect(svg).toBeVisible();
        expect(await nanAttributes(container)).toEqual([]);

        // Bounding boxes are viewport-relative and the pointer cannot reach
        // below the fold, so bring the chart into view before measuring.
        await svg.scrollIntoViewIfNeeded();

        const frame = await svg.boundingBox();
        const points = await hoverPoints(container, frame, target);

        // Come in from outside the chart, so mouseenter fires and the
        // tooltip is shown before the first move.
        await page.mouse.move(frame.x - 40, frame.y - 40);

        let isFirstPoint = true;

        for (const [x, y] of points) {
            const where = `pointer at (${Math.round(x - frame.x)}, ${Math.round(
                y - frame.y
            )}) in the chart`;

            await page.mouse.move(x, y, { steps: 4 });
            await expect(tooltip, where).toBeVisible();

            // The tooltip fades in once, when it is shown; an update must
            // not fade it again, and crossing from one shape to the next
            // (a hide and a show within one event) must not blink. So from
            // the second point on it is still opaque straight after the
            // move, rather than climbing back up from transparent.
            if (!isFirstPoint) {
                const opacity = await tooltip.evaluate(
                    (el) => getComputedStyle(el).opacity
                );

                expect(
                    Number(opacity),
                    `${where}: faded again on update`
                ).toBeGreaterThan(0.8);
            }
            isFirstPoint = false;

            await page.waitForTimeout(SETTLE_MS);

            // A tooltip that threw while updating is still "visible", just
            // never moved: name the error before measuring anything.
            expect(problems, where).toEqual([]);

            const box = await background.boundingBox();

            expect(box, where).not.toBeNull();
            expect(box.x, `${where}: left edge`).toBeGreaterThanOrEqual(
                frame.x - 1
            );
            expect(box.y, `${where}: top edge`).toBeGreaterThanOrEqual(
                frame.y - 1
            );
            expect(
                box.x + box.width,
                `${where}: right edge`
            ).toBeLessThanOrEqual(frame.x + frame.width + 1);
            expect(
                box.y + box.height,
                `${where}: bottom edge`
            ).toBeLessThanOrEqual(frame.y + frame.height + 1);
            expect(await nanAttributes(container), where).toEqual([]);
        }

        // Leaving the chart hides it again.
        await page.mouse.move(frame.x - 40, frame.y - 40);
        await expect(tooltip).toBeHidden();

        expect(problems).toEqual([]);
    });
}

// The stacked and grouped bar charts listen on their svg, so they could
// show a tooltip for the whole band; the policy is bars only, the empty
// space above and between them shows nothing.
for (const [name, selector] of [
    ['stacked bar', '.hover-stacked-bar'],
    ['grouped bar', '.hover-grouped-bar'],
]) {
    test(`H · ${name} shows the tooltip over the bars only`, async ({
        page,
    }) => {
        await page.goto(URL);

        const container = page.locator(selector);
        const svg = container.locator('svg').first();
        const tooltip = container.locator('.britechart-tooltip');

        await svg.scrollIntoViewIfNeeded();

        const frame = await svg.boundingBox();
        const bar = await container.locator('rect.bar').first().boundingBox();
        const barX = bar.x + bar.width / 2;
        const aboveTheBar = frame.y + INSET;

        await page.mouse.move(frame.x - 40, frame.y - 40);
        await page.mouse.move(barX, aboveTheBar, { steps: 4 });
        await page.waitForTimeout(SETTLE_MS);
        await expect(tooltip, 'above the bar').toBeHidden();

        await page.mouse.move(barX, bar.y + bar.height / 2, { steps: 4 });
        await expect(tooltip, 'over the bar').toBeVisible();

        await page.mouse.move(barX, aboveTheBar, { steps: 4 });
        await expect(tooltip, 'back above the bar').toBeHidden();
    });
}
