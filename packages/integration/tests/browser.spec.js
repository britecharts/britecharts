// Tier 3: every consumer page renders its chart(s), the stylesheet applies,
// and nothing errors on the way. One test per consumption path, so a
// failure names the path that broke.
const { test, expect } = require('@playwright/test');

const VANILLA = 'http://localhost:4173';
const REACT = 'http://localhost:4174';
// The same React pages, built with React's development build (see
// playwright.config.js): the only place StrictMode double-invokes effects.
const REACT_DEV = 'http://localhost:4175';

// `.tick text { fill: #666a73 }` from styles/charts/common.css -- present in
// both the bundle and the per-chart stylesheets, and nothing else sets it.
const TICK_FILL = 'rgb(102, 106, 115)';

const PAGES = [
    // id, url, description, expectations
    [
        'C1',
        `${VANILLA}/cdn-bundle.html`,
        'CDN bundle via script tag, global `core`',
        { bars: true },
    ],
    [
        'C2',
        `${VANILLA}/cdn-render.html`,
        'one script tag: no d3 on the page, drawn with `render`',
        { bars: true, noD3: true, miniTooltip: 'Brightness' },
    ],
    [
        'C3',
        `${VANILLA}/umd-bundle.html`,
        'UMD bundle (package main) through a bundler',
        { bars: true },
    ],
    [
        'C5',
        `${VANILLA}/esm-bundle.html`,
        'ES modules (package module entry)',
        { bars: true },
    ],
    [
        'C6',
        `${VANILLA}/esm-chart.html`,
        'per-chart ES module by source path',
        { bars: true },
    ],
    [
        'CDN',
        `${VANILLA}/cdn-jsdelivr.html`,
        'published version: CDN bundle from jsDelivr',
        { bars: true, published: true },
    ],
    [
        'R1–R2',
        `${REACT}/package.html`,
        'React 19: named imports from @britecharts/react',
        {
            donut: true,
            line: true,
            react: true,
            // Every block must hold exactly one svg: this is where a chart
            // drawn twice under React 19 shows.
            oneSvg: [
                '.donut-container',
                '.plain-line',
                '.tooltip-line',
                '.responsive-line',
            ],
            composed: true,
        },
    ],
    [
        'R6',
        `${REACT}/lifecycle.html`,
        'React 19: create, destroy and create again by hand',
        {
            react: true,
            oneSvg: [
                '.donut-container',
                '.plain-line',
                '.tooltip-line',
                '.responsive-line',
            ],
            composed: true,
            lifecycle: true,
        },
    ],
    [
        'R5',
        `${REACT_DEV}/strict.html`,
        'React 19: development build under StrictMode',
        {
            react: true,
            oneSvg: [
                '.donut-container',
                '.plain-line',
                '.tooltip-line',
                '.responsive-line',
            ],
            composed: true,
            // StrictMode runs every component's setup, cleanup and setup again on
            // the same container: a wrapper whose destroy() leaves its svg behind
            // shows up here as a second svg per chart.
        },
    ],
];

// Console output known to be noise rather than a problem, and why.
//
// `tooltipChart.create` calls core's `topicLabel('values')`, which core itself
// deprecates -- so every tooltip logs the deprecation. Only react's UMD bundle
// drops console calls (`dropConsole`); the ESM entry, `dist/esm`, keeps them,
// so every consumer importing it sees the warning.
//
// Waived rather than fixed here: not calling the deprecated accessor changes
// which key the tooltip reads its topics under, which is a behaviour change
// of its own.
const WAIVED_CONSOLE = [/This method is being deprecated.*"topic" as the key/];

for (const [id, url, how, expects] of PAGES) {
    test(`${id} · ${how}`, async ({ page }) => {
        test.skip(
            Boolean(expects.published) && !process.env.SMOKE_REGISTRY,
            'needs a published version; run by smoke-published.yml'
        );

        test.fixme(Boolean(expects.fixme), expects.fixme);

        const problems = [];

        page.on('console', (message) => {
            // React reports peer-version, act() and lifecycle problems through
            // console.error and console.warn; both count on the React pages.
            const types = expects.react ? ['error', 'warning'] : ['error'];

            if (
                types.includes(message.type()) &&
                !WAIVED_CONSOLE.some((pattern) => pattern.test(message.text()))
            ) {
                problems.push(`console.${message.type()}: ${message.text()}`);
            }
        });
        page.on('pageerror', (error) =>
            problems.push(`pageerror: ${error.message}`)
        );
        page.on('requestfailed', (request) =>
            problems.push(
                `request failed: ${request.url()} ${request.failure()?.errorText ?? ''}`
            )
        );
        page.on('response', (response) => {
            if (response.status() >= 400) {
                problems.push(`http ${response.status()}: ${response.url()}`);
            }
        });

        await page.goto(url);

        if (expects.bars) {
            const { barData } =
                await import('../consumers/vanilla/src/data.js');

            await expect(
                page.locator('.bar-container svg.bar-chart rect.bar')
            ).toHaveCount(barData.length);
        }
        if (expects.noD3) {
            expect(
                await page.evaluate(() => typeof window.d3),
                'the page should need no d3 of its own'
            ).toBe('undefined');
        }
        if (expects.miniTooltip) {
            await page.locator('.bar-container rect.bar').first().hover();
            await expect(
                page.locator('.bar-container .britechart-mini-tooltip')
            ).toContainText(expects.miniTooltip);
        }
        if (expects.lifecycle) {
            const state = await page
                .locator('body[data-lifecycle]')
                .getAttribute('data-lifecycle');
            const { drawn, afterUnmount, remounted } = JSON.parse(state);

            expect(
                drawn,
                'nothing was drawn before the unmount'
            ).toBeGreaterThan(0);
            expect(afterUnmount, 'svgs survived the unmount').toBe(0);
            expect(remounted, 'the remount did not redraw every chart').toBe(
                drawn
            );
        }
        if (expects.donut) {
            const { donutData } =
                await import('../consumers/react/src/data.js');

            // `arc` is on the slice group; the chart nests a second group in each
            // slice, so count only the outer ones.
            await expect(
                page.locator(
                    '.donut-container svg.donut-chart g.arc:not(.arc .arc)'
                )
            ).toHaveCount(donutData.length);
        }
        if (expects.line) {
            const { lineData } = await import('../consumers/react/src/data.js');
            const topics = new Set(lineData.data.map((d) => d.topicName)).size;

            await expect(
                page.locator('.plain-line svg.line-chart path.line')
            ).toHaveCount(topics);
        }

        if (expects.composed) {
            const { lineData } = await import('../consumers/react/src/data.js');
            const topics = new Set(lineData.data.map((d) => d.topicName)).size;

            // A chart inside a Tooltip's render prop, and one sized by a
            // ResponsiveContainer: both must draw their lines.
            await expect(
                page.locator('.tooltip-line svg.line-chart path.line')
            ).toHaveCount(topics);
            await expect(
                page.locator('.responsive-line svg.line-chart path.line')
            ).toHaveCount(topics);

            // The tooltip is drawn once into the chart it wraps: none means it was
            // not (re)created after a remount, two means it was created twice.
            await expect(
                page.locator(
                    '.tooltip-line svg.line-chart .britechart-tooltip'
                ),
                'the Tooltip should draw exactly one tooltip into its chart'
            ).toHaveCount(1);

            // The container hands over its measured width after mount.
            const width = await page
                .locator('.responsive-line svg.line-chart')
                .evaluate((svg) => Number(svg.getAttribute('width')));

            expect(
                width,
                'the chart never received a measured width'
            ).toBeGreaterThan(0);
        }
        for (const selector of expects.oneSvg ?? []) {
            await expect(
                page.locator(`${selector} svg`),
                `${selector} should hold one svg`
            ).toHaveCount(1);
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
