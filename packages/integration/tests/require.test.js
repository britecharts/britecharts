// Tier 2a: the CommonJS paths, resolved from the installed consumer the way
// Node (or a CommonJS bundler) would resolve them. No browser, no bundler:
// this is `require()` against the package `main` and the CommonJS builds,
// which also proves the d3 dependencies the UMD wrappers `require` are
// declared and installed.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const path = require('node:path');

const CONSUMER = path.resolve(__dirname, '..', 'consumers', 'vanilla');
const requireFromConsumer = createRequire(path.join(CONSUMER, 'package.json'));

// The public API of @britecharts/core, frozen for 3.0.0:
// the 14 charts, `colors` and `constants`. The bundle must expose exactly
// these names, no more and no fewer.
const CORE_EXPORTS = [
    'bar',
    'brush',
    'bullet',
    'colors',
    'constants',
    'donut',
    'groupedBar',
    'heatmap',
    'legend',
    'line',
    'miniTooltip',
    'scatterPlot',
    'sparkline',
    'stackedArea',
    'stackedBar',
    'tooltip',
];
const WRAPPER_EXPORTS = [
    'BarWrapper',
    'BrushWrapper',
    'BulletWrapper',
    'DonutWrapper',
    'GroupedBarWrapper',
    'HeatmapWrapper',
    'LegendWrapper',
    'LineWrapper',
    'ScatterPlotWrapper',
    'SparklineWrapper',
    'StackedAreaWrapper',
    'StackedBarWrapper',
    'TooltipWrapper',
];

test('C3 · require("@britecharts/core") resolves main to the UMD bundle', () => {
    const core = requireFromConsumer('@britecharts/core');

    // The named exports, plus `default` holding the same object, as
    // `export default britecharts` in the declarations says.
    assert.deepEqual(
        Object.keys(core)
            .filter((name) => name !== 'default')
            .sort(),
        CORE_EXPORTS
    );
    assert.deepEqual(Object.keys(core.default).sort(), CORE_EXPORTS);
    assert.equal(typeof core.bar, 'function');
});

test('W · require("@britecharts/wrappers") and its CommonJS bundle', () => {
    const umd = requireFromConsumer('@britecharts/wrappers');
    const cjs = requireFromConsumer(
        '@britecharts/wrappers/dist/cjs/bundle/wrappers.bundled.min.cjs'
    );

    // A wrapper is a { create, update, destroy } object, not a chart factory.
    for (const name of WRAPPER_EXPORTS) {
        for (const [flavour, bundle] of [
            ['umd', umd],
            ['cjs', cjs],
        ]) {
            assert.deepEqual(
                Object.keys(bundle[name] ?? {}).sort(),
                ['create', 'destroy', 'update'],
                `${flavour} bundle: ${name} is not a wrapper`
            );
        }
    }
});

// --- @britecharts/react, resolved from the React consumer ---------------

const REACT_CONSUMER = path.resolve(__dirname, '..', 'consumers', 'react');
const requireFromReact = createRequire(
    path.join(REACT_CONSUMER, 'package.json')
);

const REACT_COMPONENTS = [
    'Bar',
    'Brush',
    'Bullet',
    'Donut',
    'GroupedBar',
    'Heatmap',
    'Legend',
    'Line',
    'ScatterPlot',
    'Sparkline',
    'StackedArea',
    'StackedBar',
    'Tooltip',
];

test('R1 · require("@britecharts/react") resolves main to the UMD bundle', () => {
    const react = requireFromReact('@britecharts/react');

    for (const name of REACT_COMPONENTS) {
        assert.equal(typeof react[name], 'function', `bundle lacks ${name}`);
    }
    assert.equal(typeof react.axisTimeCombinations, 'object');
    assert.equal(typeof react.ResponsiveContainer, 'function');
});
