// Tier 2a: the CommonJS paths, resolved from the installed consumer the way
// Node (or a CommonJS bundler) would resolve them. No browser, no bundler:
// this is `require()` against the package `main` and the per-chart builds,
// which also proves the d3 dependencies the UMD wrappers `require` are
// declared and installed.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const path = require('node:path');

const CONSUMER = path.resolve(__dirname, '..', 'consumers', 'vanilla');
const requireFromConsumer = createRequire(path.join(CONSUMER, 'package.json'));

// What core/src/index.js exports; the bundle must expose the same names.
const CORE_EXPORTS = [
    'bar', 'brush', 'bullet', 'colors', 'donut', 'groupedBar', 'heatmap',
    'legend', 'line', 'loadingStates', 'miniTooltip', 'scatterPlot',
    'sparkline', 'stackedArea', 'stackedBar', 'tooltip',
];
const CORE_UMD_CHARTS = [
    'bar', 'brush', 'bullet', 'colors', 'donut', 'groupedBar', 'heatmap',
    'legend', 'line', 'loading', 'miniTooltip', 'scatterPlot', 'sparkline',
    'stackedArea', 'stackedBar', 'tooltip',
];
const WRAPPER_EXPORTS = [
    'BarWrapper', 'BulletWrapper', 'DonutWrapper', 'GroupedBarWrapper',
    'LegendWrapper', 'LineWrapper', 'SparklineWrapper', 'StackedAreaWrapper',
    'StackedBarWrapper', 'TooltipWrapper',
];

test('C3 · require("@britecharts/core") resolves main to the UMD bundle', () => {
    const core = requireFromConsumer('@britecharts/core');

    assert.deepEqual(Object.keys(core).sort(), CORE_EXPORTS);
    assert.equal(typeof core.bar, 'function');
});

test('C4 · every per-chart UMD build can be required', () => {
    for (const chart of CORE_UMD_CHARTS) {
        const module = requireFromConsumer(`@britecharts/core/dist/umd/charts/${chart}.min.js`);

        assert.ok(
            ['function', 'object'].includes(typeof module) && module !== null,
            `${chart}.min.js exported ${typeof module}`
        );
    }
});

test('W · require("@britecharts/wrappers") and its CommonJS bundle', () => {
    const umd = requireFromConsumer('@britecharts/wrappers');
    const cjs = requireFromConsumer('@britecharts/wrappers/dist/cjs/bundle/wrappers.bundled.min.js');

    // A wrapper is a { create, update, destroy } object, not a chart factory.
    for (const name of WRAPPER_EXPORTS) {
        for (const [flavour, bundle] of [['umd', umd], ['cjs', cjs]]) {
            assert.deepEqual(
                Object.keys(bundle[name] ?? {}).sort(),
                ['create', 'destroy', 'update'],
                `${flavour} bundle: ${name} is not a wrapper`
            );
        }
    }
});
