---
sidebar_position: 4
---

# Migration Guide from version 2 to version 3
:::note
Version 3.0 is in beta: `@britecharts/core`, `@britecharts/wrappers` and `@britecharts/react` publish `3.0.0-beta` releases under the `beta` tag (`npm install @britecharts/core@beta`). `3.0.0-beta.6` is the last beta before 3.0.0. The last stable release is still `britecharts@2.18.2`. This guide describes the migration to 3.0 and is kept up to date until the release.
:::

Version 3.0 of Britecharts fixes many bugs, improves loading and animation performance, and adds minor features. It also introduces breaking changes that make the components' APIs and data shapes more consistent, and moves the library to the `@britecharts` scope on npm: `britecharts` becomes `@britecharts/core`, and `britecharts-react` becomes `@britecharts/react`. Both are now written in TypeScript.

When it lands, we recommend migrating as soon as possible to get all these benefits. For that, we have prepared the following migration guide.

## Migration Steps
Most of the migration tasks involve changing accessor names, but there are also changes in how we load the modules. Follow these steps to get your application updated in no time:

### Breaking changes
1. Update the way you load the charts

We moved Britecharts internally from the outdated AMD modules into ES Modules, which changed how you will import the components. See below some examples:

```js
// Version 2
// For ES modules
import bar from 'britecharts/dist/umd/bar.min';

// For AMD and CommonJS modules
const LineChart = require('britecharts/umd/line.min');

// Version 3
// As ES modules
import { bar } from '@britecharts/core';

// As CommonJS modules
const { bar } = require('@britecharts/core');

```

The stylesheets move too. `britecharts/dist/css/britecharts.min.css` is now `@britecharts/core/dist/styles/bundle/britecharts.min.css`, and each chart's own stylesheet is under `@britecharts/core/dist/styles/charts/`.

You can also check more ways of loading (CommonJS, UMD and CDN) in the [vanilla consumer](https://github.com/britecharts/britecharts/tree/main/packages/integration/consumers/vanilla) of our integration tests, which CI runs against every change

2. Change how you show loading states

Search for any use of the 'loadingState' accessor for getting the loading state, and render the chart with 'isLoading' as true and a valid dataset (it can be empty). 

```js
// Version 2
barContainer.html(barChart.loadingState())

// Version 3
barChart
    .width(containerWidth)
    .height(300)
    .isAnimated(true)
    .isLoading(true);
    
barContainer.datum(dataset).call(barChart);
```

3. Use 'valueLocale' to format values

You must use the 'valueLocale' accessor to set the locale object (see [the d3-format docs](https://github.com/d3/d3-format#formatLocale)) of the component´s rendered values (axes ticks, numerical values, etc.).

Before, this used to be ´locale´ in the bar, grouped bar, scatted bar, and scatter plot.

```js
// Version 2
barChart
    .locale({
        thousands: '.', 
        grouping: [3], 
        currency: ["$", ""], 
        decimal: "."
    })
    //...other configurations

// Version 3
barChart
    .valueLocale({
        thousands: '.', 
        grouping: [3], 
        currency: ["$", ""], 
        decimal: "."
    })
    //...other configurations
```

In contrast, for time series charts (lineChart, stackedAreaChart), we use 'locale' to pass the language tag for the tooltip to localize the *date*. It uses Intl.DateTimeFormat, for compatibility and support.

4. Swap the use 'xAxisCustomFormat' and 'xAxisFormat' on brush charts

Whenever you were using 'xAxisCustomFormat' in a brush chart, now you should use 'xAxisFormat', and viceversa.

```js
// Version 2
brush
    .xAxisCustomFormat('custom')
    .xAxisFormat('%A');

// Version 3
brush
    .xAxisCustomFormat('%A')
    .xAxisFormat('custom');
```

This made this configuration consistent with the line and stacked area charts.

5. Use 'numberFormat' in bar charts

Search for uses of 'valueLabelFormat' and change them to 'numberFormat':

```js
// Version 2
groupedBarChart
    .valueLabelFormat(',s')
    // other configurations

// Version 3
groupedBarChart
    .numberFormat(',s')
    // other configurations

```

The 'numberFormat' configuration is available for the bar, bullet, donut, grouped bar, stacked-bar, legend, line, mini-tooltip, and tooltip components.

6. Stop using 'aspectRatio' to set charts' dimensions

We eliminated the 'aspectRatio' accessor from our charts. Instead, use the 'width' and 'height' attributes to set a explicit size and leave the chart to respond to container width changes.

```js
// Version 2
lineChart
    .width(100)
    .aspectRatio('0.5');

// Version 3
lineChart
    .width(100)
    .height(50)
```

7. Expect the typographic minus sign in negative axis labels

Britecharts v3 runs on the current d3 modules, and d3-format changed its default minus sign from the ASCII hyphen (`-`, U+002D) to the typographic minus (`−`, U+2212). Negative values on axes and in tooltips now render with the latter.

Nothing to change unless you assert on that text — snapshot tests and string comparisons against axis labels will need updating. If you would rather keep the ASCII hyphen, set it through a value locale on the charts that have one (the bar, grouped bar, stacked bar and scatter plot). The definition needs `decimal`, `thousands`, `grouping` and `currency` as well:

```js
barChart.valueLocale({
    decimal: '.',
    thousands: ',',
    grouping: [3],
    currency: ['$', ''],
    minus: '-',
});
```

8. Use the d3 v7 modules alongside Britecharts

Britecharts v3 runs on the d3 v7 generation of the `d3-*` modules. They are dependencies of `@britecharts/core`, so installing it from npm installs them, and the ES module and `dist/umd` builds load them from there rather than bundling them. If your own code uses d3 together with Britecharts, upgrade it to v7 at the same time. The CDN builds under `dist/cdn` bundle their own copy of d3 and need nothing else on the page.

The two d3 modules Britecharts used that are now deprecated upstream, `d3-collection` and `d3-voronoi`, have been replaced internally by `d3-array` and `d3-delaunay`. They are no longer dependencies.

9. Replace the 'dataByTopic' line chart data shape

The line chart no longer accepts the `dataByTopic` array it required up to 2.10.1. It has taken a flat `data` array since then, and that is now the only shape it accepts. Passing `dataByTopic` throws.

```js
// Version 2
lineChart.datum({
    dataByTopic: [
        {
            topicName: 'San Francisco',
            topic: 123,
            dates: [
                { date: '2017-01-16T16:00:00-08:00', value: 1 },
                { date: '2017-01-17T16:00:00-08:00', value: 2 }
            ]
        }
    ]
});

// Version 3
lineChart.datum({
    data: [
        { topicName: 'San Francisco', name: 123, date: '2017-01-16T16:00:00-08:00', value: 1 },
        { topicName: 'San Francisco', name: 123, date: '2017-01-17T16:00:00-08:00', value: 2 }
    ]
});
```

One entry per point instead of points nested under each topic, and the topic identifier moves from `topic` to `name`. Britecharts groups the data internally, so nothing else about how you configure the chart changes.

If you have data in the old shape, this converts it:

```js
const toFlatData = ({ dataByTopic }) =>
    dataByTopic.flatMap((topic) =>
        topic.dates.map(({ date, value }) => ({
            topicName: topic.topicName,
            name: topic.topic,
            date,
            value,
        }))
    );
```

10. Update custom tooltip handlers on the line, stacked area, stacked bar and grouped bar charts

Every chart now dispatches `customMouseMove` with the same payload: the hovered data point, its anchor `[x, y]` in pixels relative to the chart's drawing area, the chart's `[width, height]`, and, from these four charts, the map of topic names to colours. Before, they dispatched `(dataPoint, colorMap, x, y)`. If you wire the tooltip directly, nothing changes; a handler of your own that reads the arguments by position has to take the new order. `tooltip.update` still accepts the old order in 3.x and warns once.

```js
// Version 2
lineChart.on('customMouseMove', function (dataPoint, colorMap, x, y) {
    chartTooltip.update(dataPoint, colorMap, x, y);
    trackHover(dataPoint, x);
});

// Version 3
lineChart.on('customMouseMove', function (dataPoint, [x, y], size, colorMap) {
    chartTooltip.update(dataPoint, [x, y], size, colorMap);
    trackHover(dataPoint, x);
});

// Either version
lineChart.on('customMouseMove', chartTooltip.update);
```

With that, `tooltip` and `miniTooltip` are one component: `tooltip` shows a list or a single value by the shape of the data point (or as told by `layout`), and `miniTooltip` is `tooltip().layout('single').title('').numberFormat('.2f')`. The tooltip now keeps itself inside the chart, follows the pointer (the stacked and grouped bar charts show it over a bar only), and its `tooltipOffset` default is `{ x: 0, y: 0 }` (it was `{ x: 0, y: -55 }`, for a placement that no longer exists). `xAxisValueType` defaults to `'auto'`, which shows dates as dates, numbers as numbers and category names as they are; set `'date'` or `'number'` to force one, as before. In React, `Tooltip`'s `customMouseMove` callback receives the new order, and `Tooltip` now wraps the bar, scatter plot and heatmap charts too.

11. Replace the Step chart

The Step chart is removed from every package: the `step` export of `@britecharts/core`, its `StepWrapper` and the React `Step` component, with their stylesheets and builds. A bar chart draws the same data.

12. Transpile for older browsers yourself

The builds now target ES2020 instead of ES5. Every current browser runs them as they are. If you support a browser older than that, transpile Britecharts in your own build, as you would any package that ships modern syntax.

13. Move from `britecharts-react` to `@britecharts/react`

The React components are published as `@britecharts/react`, and they work differently in a few ways you may rely on:

```js
// Version 2
import { Bar } from 'britecharts-react';

// Version 3
import { Bar } from '@britecharts/react';
```

* React 16.8 or later is required, since the components are now function components built on hooks. They have no instances any more, so a `ref` on a chart component is not accepted.
* A chart redraws only when its props change. If you update your data by mutating it in place, pass a new array or object instead.
* `data` is required. Pass `null` while it loads: the chart draws nothing until the data arrives.
* `false`, `0` and `''` now reach the chart, so `isLoading={false}` ends a loading state. Leave a prop out, or pass `undefined`, to keep the chart's default.
* PropTypes are gone. Each component's props type is exported from the package root (`BarChartProps`, `LineProps` and so on) for TypeScript projects.
* `StackedBar`'s `nameLabelFormat` prop is removed. No chart had that setting, so passing it threw.
* `axisTimeCombinations` is no longer a prop of `Line`, `StackedArea` or `Tooltip`. Import the `axisTimeCombinations` constant from the package and pass one of its values to `xAxisFormat`.

14. Label bullet charts and sparklines outside the chart

The bullet chart no longer draws a title and subtitle, and the sparkline no longer draws a title. Text drawn inside the svg cannot wrap, clips at the chart's edge and does not follow the page's typography, so these charts now draw only the data. The `customTitle` and `customSubtitle` accessors and the `title` and `subtitle` data fields of the bullet chart are removed, as are the sparkline's `titleText` and `titleTextStyle`. The React `Bullet` and `Sparkline` components drop the matching props.

Put the label in your own markup next to the chart, and give screen readers the chart's name with `a11yTitle`:

```js
// Version 2
bulletChart.customTitle('CPU 1').customSubtitle('GHz');
sparklineChart.titleText('Signups');

// Version 3
// <h3>CPU 1 <small>GHz</small></h3> above the chart's container
bulletChart.a11yTitle('CPU 1, GHz');
sparklineChart.a11yTitle('Signups');
```

The legend still draws its own labels.

15. Load one bundle instead of a file per chart

Version 2 published a UMD file for each chart, like `britecharts/dist/umd/bar.min.js`. Version 3 publishes one UMD bundle and one CDN bundle with every chart, and ES modules for bundlers. Bundlers keep only the charts you import, so a per-chart file saves nothing there. On a page with a script tag, load the CDN bundle, which includes d3, and use the `core` global:

```html
<!-- Version 2 -->
<script src="https://cdn.jsdelivr.net/npm/britecharts/dist/umd/bar.min.js"></script>
<script>const barChart = britecharts.bar();</script>

<!-- Version 3 -->
<script src="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/cdn/bundle/core.cdn.min.js"></script>
<script>const barChart = core.bar();</script>
```

The colors come with the bundle as `core.colors`. The per-chart stylesheets under `dist/styles/charts/` are still published. `@britecharts/wrappers` and `@britecharts/react` also publish only their bundles: import the wrappers and components from the package, or use the `wrappers` and `react` globals.

The packages are ES modules (`"type": "module"`), so they load with `import` in Node as well as in bundlers. `require` still works and gets the CommonJS bundle, which is now a `.cjs` file. If you required a bundle by its path, update the extension: `@britecharts/core/dist/umd/bundle/core.bundled.min.js` is now `core.bundled.min.cjs`, and likewise for `wrappers` and `react`. The CDN bundle keeps its `.js` name.

16. Expect `null` from an accessor you have not set

An accessor that has not been set now reads `null` on every chart. Before, the same accessor read `null` on some charts and `undefined` on others: `yAxisLabel` on the grouped bar, stacked bar, scatter plot and stacked area, `xAxisLabel` on the scatter plot, `numberFormat` on the donut, line and stacked area, and `locale` on the line, stacked area and tooltip.

A truthiness check works as before. Update code that compares with `=== undefined`, and TypeScript code that annotated the old type: the getters are typed `T | null`.

```js
// Version 2
if (lineChart.numberFormat() === undefined) { /* ... */ }

// Version 3
if (lineChart.numberFormat() === null) { /* ... */ }
```

17. Name your data's keys as the charts expect

The accessors that let a chart read its data under other keys are removed: `nameLabel` and `valueLabel` on the bar chart, `groupLabel`, `nameLabel` and `valueLabel` on the grouped bar, `stackLabel`, `nameLabel` and `valueLabel` on the stacked bar, `dateLabel`, `topicLabel` and `valueLabel` on the line chart, `dateLabel`, `keyLabel` and `valueLabel` on the stacked area, and `dateLabel` and `valueLabel` on the sparkline. They warned that they were deprecated since version 2. The React components drop the matching props.

If you used them, rename the keys in your data to the ones each chart's data shape names, such as `name` and `value` for the bar chart:

```js
// Version 2
barChart.nameLabel('letter').valueLabel('frequency');
barContainer.datum([{ letter: 'A', frequency: 0.08 }]).call(barChart);

// Version 3
const data = rows.map(({ letter, frequency }) => ({ name: letter, value: frequency }));
barContainer.datum(data).call(barChart);
```

The tooltip keeps its `dateLabel`, `nameLabel`, `topicLabel` and `valueLabel`: it reads the data points of several charts, and they use different keys.

### New features
1. Start using TypeScript with Britecharts.

You can now use Britecharts in your TypeScript projects! The packages are written in TypeScript, and their type declarations are generated from that source, so they always match what the charts do. Import the types from the package root: each chart's data shape and module type from `@britecharts/core`, and each component's props from `@britecharts/react`.

2. Stop re-rendering charts when the viewport width changes.

In version 2 and our demos, we recommended listening to viewport width changes and re-render charts with the updated container width. This wasn't necessary, as SVGs provide a viewBox property that allows us to make our charts fully responsive out of the box. That's how Britecharts works starting version 3, so say bye-bye to those window 'resize' listeners!

3. Use 'colorMap' to select the colors you want for each data category.

One common request of our users was to specify the colors for each category on the different Britecharts components. Now you can! Use the ["colorMap"](../API/bar#module_Bar--exports.colorMap) property to specify a hash map between category names and HEX colors.

4. Specify the duration of animations with 'animationDuration'

Most Britecharts' components have animations that you can activate with the 'isAnimated' configuration. Since version 3, you can also set the duration of those animations in milliseconds with the 'animationDuration' accessor.

5. Rely on one tooltip for every chart

`tooltip` renders the line, stacked area, stacked bar and grouped bar charts' lists and the bar, scatter plot, heatmap and donut charts' single values; `maxEntries` caps the rows, `layout` forces a layout, `xAxisValueType('category')` shows a category key as it is. `customClick` on the stacked and grouped bar charts carries the clicked bar's own data as a third argument.

6. Chart negative values

The bar, grouped bar, stacked bar and brush charts draw negative values, below or to the left of a zero baseline. They used to throw on a negative datum. The scatter plot's value axis now runs below zero when the data does, and each circle's size shows the magnitude of its value. Before, points with a negative value were not drawn.

7. Show a loading state on every chart

`isLoading` now covers every data chart, including the bullet, heatmap and scatter plot, each with a skeleton in its own shape.

8. Name your charts for screen readers

Every chart gives its svg a role and an accessible name, so a screen reader announces it as an image called, for example, "Bar chart". Set `a11yTitle` to name it after what it shows, and `a11yDescription` to add a sentence that screen readers read after the name. The React components take both as props.

```js
barChart
    .a11yTitle('Monthly visits')
    .a11yDescription('Visits doubled in May');
```

## Summary of Changes
We changed many things in the third version of Britecharts; here are some summaries:

### Breaking Changes
* New monorepo organization of the code with `@britecharts/core` and `@britecharts/react` as the main packages.
* The builds target ES2020 instead of ES5.
* Runs on the d3 v7 modules; negative numbers render with the typographic minus sign.
* Removes the Step chart from every package.
* Removes the line chart's 'dataByTopic' data shape.
* Publishes one UMD bundle and one CDN bundle instead of a UMD file per chart. The per-chart stylesheets stay.
* The packages are ES modules: `import` works in Node, and the CommonJS bundles `require` loads end in `.cjs`.
* Removes the data-key accessors ('nameLabel', 'valueLabel', 'dateLabel', 'topicLabel', 'keyLabel', 'groupLabel', 'stackLabel') from the bar, grouped bar, stacked bar, line, stacked area and sparkline charts, and the matching React props. The tooltip keeps its own.
* An accessor that has not been set reads `null` on every chart, never `undefined`.
* Removes the bullet chart's title and subtitle ('customTitle', 'customSubtitle' and the 'title' and 'subtitle' data fields) and the sparkline's title ('titleText', 'titleTextStyle'), with the matching React props.
* Changes 'loadingMarkup' option into an explicit option for 'isLoading' in most of the charts.
* Adds 'valueLocale' or renames 'locale' into 'valueLocale' for formatting values in the bar chart, grouped bar chart, scatter plot, and stacked bar.
* Fixes the custom format feature in the line and stacked area chart, renaming 'xAxisFormat' into 'xAxisCustomFormat' and 'xAxisCustomFormat' into 'xAxisFormat'. The time combinations are exported as `constants.axisTimeCombinations`.
* Renames value formatting functions into 'numberFormat' in the grouped bar and stacked bar charts.
* Removed the 'aspectRatio' configuration chart from the line, scatter plot, stacked area, bullet, grouped bar, stacked bar.
* Changed 'exportChart' to return a promise.
* The line, stacked area, stacked bar and grouped bar charts dispatch 'customMouseMove' as `(dataPoint, [x, y], [width, height], colorMap)`, the same payload as every other chart; `tooltip.update` still accepts the old `(dataPoint, colorMap, x, y)` order and warns once. React's `Tooltip` passes the new order to its 'customMouseMove' callback.
* The tooltip's 'tooltipOffset' defaults to `{ x: 0, y: 0 }` and 'xAxisValueType' to 'auto'.
* The stacked and grouped bar charts show the tooltip, and dispatch 'customClick', only over a bar.
* React: the components are function components, need React 16.8 or later, redraw only when their props change, and pass `false`, `0` and `''` on to the chart. PropTypes, `StackedBar`'s `nameLabelFormat` prop and the `axisTimeCombinations` prop are removed.

### New Feature Changes
* Written in TypeScript, with type declarations generated from the source
* Negative values in the bar, grouped bar, stacked bar, brush and scatter plot charts
* Loading states on every data chart, including the bullet, heatmap and scatter plot
* Accessible names for every chart, set with 'a11yTitle' and 'a11yDescription'
* A `ScatterPlot` component in `@britecharts/react`
* `Brush` and `Heatmap` components in `@britecharts/react`, and `BrushWrapper` and `HeatmapWrapper` in `@britecharts/wrappers`, so every chart has both
* Charts are responsive by default using the viewBox property.
* Adds colorMap to all charts
* Adds 'animationDuration' option to all animated charts
* Added grid helper on charts
* Adds zoom controls for scatter plot
* Added hasMinimumValueScale parameter to autoscale Line Chart y-axis
* Rework of Line Chart animation for better performance
* Allows brush to have missing data and to be animated
* Allows for a fixed window in brush chart with 'isLocked' option
* Added Donut's hasCenterLegend to hide/show center legend
* Added Stacked Area loading state
* Added tooltip on the heatmap
* One tooltip component for every chart: 'tooltip' renders a list or a single value by the data's shape ('layout' forces one), 'miniTooltip' is its single-value preset, and React's 'Tooltip' wraps the bar, scatter plot and heatmap charts too
* The tooltip keeps itself inside the chart (flips and slides at the edges), follows the pointer, fades in and out and eases towards each position, and updates its rows in place
* Tooltip: 'xAxisValueType' gains 'category' and 'auto', 'maxEntries' caps the rows with a "+n more" row, 'show' takes the hovered point
* The stacked and grouped bar charts' 'customClick' carries the clicked bar's data

### Bug Fixes
* Fixes all critical security warnings due to dependencies
* Fixes step chart loading
* Mitigates the stacked and grouped bar charts tooltip issues
* Tooltips no longer get cut off at the chart's edges, wobble across close data points, blink when crossing bars, or catch the pointer; the scatter plot's sits beside its point and a category key no longer titles it "NaN"
* Improved Grouped bar chart animation
* Line chart animation fix on multiline
* Ordering of the horizontal bar chart elements
* Cleans up custom lines annotation text before rendering
* Fixes bullet chart issues 
* The scatter plot's trendline starts at the right height
* The brush chart honours 'locale', and the stacked area chart honours 'numberFormat'
* React: unmounting one responsive container no longer stops resizing for the others, and a chart is not drawn twice under StrictMode
* Tooltip tweaks
*Visual Fixes Summary*
* Added extended line on brush chart
* Extended line color matching ticks
* Normalized text sizes in line and stacked area charts

### Contributor's Developer Experience Changes
* Deprecated Travis into Github Actions
* Moved the tests from Karma to Vitest
* Moved from Yarn to pnpm, and the build from webpack to Vite
* Rewrote the packages in TypeScript, type-checked in CI
* Integration tests install the packed packages into vanilla, TypeScript and React projects
* Added linting and formatting for CSS and JS 
* Changed organization of tests and data builders to be colocated
