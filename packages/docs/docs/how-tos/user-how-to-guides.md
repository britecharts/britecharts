---
sidebar_position: 2
---

# User How-To Guides
Our how-to guides are recipes to address specific and critical use cases when working with Britecharts. They assume some knowledge about Britecharts and the library structure. If this is the first time you work with Britecharts, we recommend you to read the [Getting Started Tutorial][gettingStarted] first.

## How to Customize the Chart's Colors
Follow these steps to customize Britecharts' charts to use different color schemas:
1. Find out if your chart supports the `.colorSchema()` configuration, if so, keep on reading
1. Check the [Color Palettes demo page][colorPalettesDemo] and find a palette you like
1. Import the `colors` helper at the top of your file
1. Set the color palette with `.colorSchema(colors.colorSchemas.orange)` or with any other color schema
1. Draw the chart

For readers with colour blindness, use `colors.colorSchemas.okabeIto`. Its eight colours, from Okabe and Ito's palette, stay distinct with the common kinds of colour blindness. Black comes last, so charts with up to seven categories never draw a series in black. Its yellow, orange and sky blue are light on a white background, so the palette suits filled marks such as bars and donut slices better than thin lines. Colour shouldn't be the only thing that tells series apart: a legend or labels help every reader.

Note that in some charts we can only configure a gradient. Use the `colorGradients` object instead of `colorSchemas` within the colors helper. You can explore other options in the source code of the [colors file][colorsHelper].

### Give each category its own colour
A palette assigns colours in order, so a category's colour changes when the data does. To pin one colour to each category, pass `colorMap` an object from category to colour:

```js
barChart.colorMap({
    Shiny: '#39c2c9',
    Blazing: '#fcc870',
});
```

A category the map leaves out keeps its palette colour. Each chart matches the keys against one field of its data:

| Chart | `colorMap` keys match |
| --- | --- |
| Bar, donut, scatter plot, stacked area | `name` |
| Line | `name`, the topic's identifier (not `topicName`) |
| Stacked bar | `stack` |
| Grouped bar | `group` |

The legend takes `colorMap` too: pass it the same object so its entries match the chart. In React, `colorMap` is a prop with the same shape.

## How to Theme a Chart and Support Dark Mode
Everything around the data (text, axes, grid lines, tooltips, the legend, loading skeletons) takes its colour from a CSS custom property. Each defaults to a light and a dark value, picked by the [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) the chart inherits from your page.

To follow the system's light or dark setting, declare both schemes on your page:

```css
:root {
    color-scheme: light dark;
}
```

To force one, set `color-scheme: light` or `color-scheme: dark` on the page, or on any element around the chart. An app with its own light/dark switch sets it there. A page that declares no colour scheme keeps the charts light, as before.

To change a colour, set its token on the charts:

```css
.britechart {
    --bc-text-muted: #555;
    --bc-background: #10141a; /* the colour behind your charts */
}
```

| Token | Colours |
| --- | --- |
| `--bc-text` | tooltip values and other primary text |
| `--bc-text-muted` | tick labels, data labels, tooltip titles |
| `--bc-text-subtle` | axis titles |
| `--bc-axis` | tick marks, the lines that extend the axes, custom line annotations |
| `--bc-grid`, `--bc-grid-highlight` | grid lines, and a highlighted one |
| `--bc-background` | what is behind the chart: the line chart's drawing mask and an export's background. It defaults to `Canvas`, the page's background in the current scheme; set it if your page uses another. |
| `--bc-surface` | the tooltip box, data point markers, hollow circles, heatmap borders |
| `--bc-border` | the tooltip's border and the hover marker |
| `--bc-skeleton`, `--bc-skeleton-strong` | loading states |
| `--bc-brush-area`, `--bc-brush-area-missing` | the brush's area, and its gaps |
| `--bc-sparkline-area-start`, `--bc-sparkline-area-end` | the sparkline's default area gradient |

The data colours come from `colorSchema` and `colorMap`, not from these tokens. Exports carry the resolved colours, so an image exported in dark mode keeps its dark background. Browsers without `light-dark()` (before 2024) show the light values.

## How to Add a Tooltip to a Chart
Give the chart a tooltip with its `tooltip` setting. The same `tooltip()` works on every chart that takes one: the line, stacked area, stacked bar and grouped bar charts list one row per topic, and the bar, heatmap and scatter plot show one value. It has no title until you set one, and it shows a single value with two decimals unless you set a `numberFormat`. The donut has no tooltip: it shows the hovered slice in its centre instead.

```js
stackedBar()
    .tooltip(tooltip().title('Visits'))
    .render('.js-chart', data);
```

The chart does the rest, on every draw. It shows the tooltip when the pointer or the keyboard reaches a data point, moves it as they move and hides it when they leave. It draws the tooltip in place, and sets the labels that tell the tooltip which fields of its data points to read, unless you set them on the tooltip yourself. Set `tooltip(null)` to remove it. A tooltip belongs to one chart, so give each chart its own.

### Connect a tooltip by hand
To change the data point before the tooltip shows it, connect the tooltip yourself.

Drawing the tooltip by hand takes d3's `select`, which the `tooltip` setting does not need. With npm, run `npm install d3-selection` and import `select` from it. On a CDN page, add `<script src="https://cdn.jsdelivr.net/npm/d3-selection@3.0.0/dist/d3-selection.min.js"></script>` and call `d3.select`.

1. Connect the chart's `customMouseOver`, `customMouseMove` and `customMouseOut` events to the tooltip's `show`, `update` and `hide`
1. Tell the tooltip where the chart keeps its data, if the table below lists a setting for it
1. Draw the chart, then call the tooltip on the chart's `.metadata-group` (for the line and stacked area, on `.metadata-group .vertical-marker-container`)

```js
import { stackedBar, tooltip } from '@britecharts/core';
import { select } from 'd3-selection';

const stackedBarChart = stackedBar();
const chartTooltip = tooltip()
    .topicLabel('values')
    .nameLabel('stack');

stackedBarChart
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide)
    .render('.js-chart', data);

select('.js-chart .metadata-group').datum([]).call(chartTooltip);
```

The charts do not all name the fields of the data point they send the tooltip the same way, so some need a setting. The `tooltip` setting sets these for you. By hand, or with React's `Tooltip`, set them yourself; without them, the tooltip shows no rows, rows without their colours, or no value:

| Chart | Tooltip settings | React `Tooltip` props |
| --- | --- | --- |
| Line | none | `topicLabel="topics"` |
| Stacked area | `topicLabel('values')` | none |
| Stacked bar | `topicLabel('values')`, `nameLabel('stack')` | `nameLabel="stack"` |
| Grouped bar | `topicLabel('values')`, `nameLabel('group')` | `nameLabel="group"` |
| Scatter plot | `valueLabel('y')` | `valueLabel="y"` |
| Bar, heatmap | none | none |

React's `Tooltip` starts from `topicLabel('values')`, which is why the line chart is the one that needs a prop there. The [tooltip reference][tooltipAPI] describes each setting, and the [Storybook][storybook] shows each chart with its tooltip configured.

## How to Format Numbers and Dates for Your Language
Three settings control how values read. They do different things, so check which one a chart has in its [API reference][apiReference]:

* `numberFormat` takes a [d3-format specifier][formatSpecifiers], such as `',.2f'` for two decimals with a thousands separator, or `'.0%'` for a percentage. It formats the values on the chart's axes and labels; the tooltip has a `numberFormat` of its own.
* `valueLocale` takes a [d3-format locale definition][formatLocale] and sets the separators and currency those values use. The bar, grouped bar, stacked bar and scatter plot charts have it. The definition needs at least `decimal`, `thousands`, `grouping` and `currency`, or the chart throws.
* `locale` takes a language tag such as `'fr-FR'`, and localizes the dates in the tooltip and the brush with `Intl.DateTimeFormat`.

```js
barChart
    .numberFormat(',.2f')
    .valueLocale({
        decimal: ',',
        thousands: '.',
        grouping: [3],
        currency: ['', ' €'],
    });
// The axis reads 1.000,00 instead of 1,000.00
```

Negative numbers use the typographic minus sign (`−`), as d3-format does. To get the ASCII hyphen back, add `minus: '-'` to the locale definition.

Each chart keeps its `valueLocale` to itself, so two charts on a page can use different ones.

## How to Show a Loading State
Every data chart can draw a skeleton in its own shape while the data loads:
1. Set `isLoading(true)` and draw the chart with whatever data you have, even an empty array
1. When the data arrives, set `isLoading(false)` and draw the chart again with it

```js
barChart.isLoading(true).render('.js-chart', []);

fetchData().then((data) => {
    barChart.isLoading(false).render('.js-chart', data);
});
```

In React, pass `isLoading` together with the data you have, an empty array included, and set it to `false` when the data arrives. With `data={null}`, the component draws nothing at all, skeleton included.

## How to Animate a Chart
Charts draw without animation by default. Set `isAnimated(true)` to animate them as they draw, and `animationDuration` to set how long that takes, in milliseconds (1200 by default):

```js
lineChart.isAnimated(true).animationDuration(600);
```

`animationDuration` does nothing while `isAnimated` is `false`. The bar, grouped bar, stacked bar, line, stacked area, donut, heatmap, scatter plot, sparkline and brush charts animate. React components take both as props.

A reader whose system asks for reduced motion (the `prefers-reduced-motion` setting) sees every chart drawn without animation, whatever `isAnimated` is set to. Charts check it each time they draw, so changing the setting applies from the next render. `isAnimated()` still reads back the value you set. The rest of the motion stops too: tooltips appear and move without fading or easing, the legend drops entries without a fade, and a hovered point is highlighted without its bounce.

## How to Export a Chart
Call `exportChart` with a filename to download the chart as it is drawn. The filename picks the format: one ending in `.svg` downloads an svg file, and any other a png. An optional second argument adds a title at the top:

```js
barChart.exportChart('visits.svg', 'Visits by month');
barChart.exportChart('visits.png');
```

The svg keeps the chart's styles inlined, so it looks the same in a design tool or a document, and it stays sharp at any size. `exportChart` returns a promise that resolves once the download starts. In React, every chart component except `Brush` and `Legend` takes the filename as its `exportChart` prop. Setting it downloads the chart once, so set a new filename to download again.

## How to Chart Negative Values
The bar, grouped bar, stacked bar, brush and scatter plot charts draw negative values with no setting to turn on:

* The bar charts draw bars below, or to the left of, a zero baseline, and a stacked bar stacks its negative parts down from zero.
* The scatter plot's value axis runs below zero when the data does, and a circle's size shows the size of its value, so -50 draws as large as 50.

The line and stacked area charts plot negative values as they are. Axis labels for negative numbers use the typographic minus sign: see [how to format numbers](#how-to-format-numbers-and-dates-for-your-language) to change it.

## How to Make a Chart Accessible
For an overview with live charts to try, and how other libraries compare, see [Accessible JavaScript Charts](../accessibility.mdx).

Every chart gives its svg a role and a name that screen readers announce: "Bar chart" by default. Name it after what it shows, and add a sentence about what it means:

```js
barChart
    .a11yTitle('Monthly visits')
    .a11yDescription('Visits doubled in May');
```

The name goes in an `aria-label`, so browsers do not show it as a tooltip on hover. React components take `a11yTitle` and `a11yDescription` as props.

### Read the data as a table
Every chart but the legend also renders its data as a table, right after its svg, which screen readers reach as a table: they can read it row by row, move along a row or down a column, and hear each cell's headings. It is hidden from sight, takes no room on the page, and is linked from the chart with `aria-details`. Its caption is the chart's name, so set `a11yTitle` and the table is named after it too.

Charts with several series lay it out wide, as a reader would expect: a line chart has a row per date and a column per topic, and a heatmap a row per day and a column per hour.

The table is on by default. If your page already shows the data in an accessible form, turn it off:

```js
barChart.a11yDataTable(false);
```

In React, pass `a11yDataTable={false}`; in the wrappers, `a11yDataTable: false` in the configuration.

### Move through the data with a keyboard
The bar, donut, grouped bar, heatmap, line, scatter plot, stacked area and stacked bar charts can be explored without a pointer. Each chart is one stop in the page's tab order; once it has focus:

| Key | Does |
| --- | --- |
| Right or Left arrow | moves to the next or previous data point: a bar, a slice, a date, a point |
| Down or Up arrow | the same, except on the heatmap, where they move a day |
| Home, End | moves to the first or last point |
| Escape | lets go of the point; leaving the chart does too |

The chart responds as it does to a pointer: the point is highlighted, the tooltip follows focus, and the `customMouseOver`, `customMouseMove` and `customMouseOut` events fire, so your own hover code works from the keyboard too. The browser's focus ring shows which chart has focus.

It is on by default. To take the charts out of the tab order, for example in a list of thumbnails, turn it off:

```js
barChart.a11yKeyboardNavigation(false);
```

In React, pass `a11yKeyboardNavigation={false}`; in the wrappers, `a11yKeyboardNavigation: false` in the configuration.

### Label a bullet chart or a sparkline
The bullet chart and the sparkline draw only their data, with no title: text inside an svg cannot wrap and ignores the page's typography. Put the label in your own markup, next to the chart, and give screen readers the same words:

```html
<h3>CPU load <small>GHz</small></h3>
<div class="js-bullet-chart"></div>
```

```js
bulletChart.a11yTitle('CPU load, GHz').render('.js-bullet-chart', data);
```

## How to Describe a Chart as a Spec and Check It
A chart can be written down as a spec, a plain object with its name, its configuration and its data, which you can store, send from a server, or have a coding agent write:

```json
{
    "$schema": "https://britecharts.github.io/britecharts/schema/v3/bar.json",
    "chart": "bar",
    "config": { "isHorizontal": true, "a11yTitle": "Signups by plan" },
    "data": [{ "name": "Pro", "value": 412 }]
}
```

Each chart has a JSON Schema for its spec at `https://britecharts.github.io/britecharts/schema/v3/<chart>.json`: `bar`, `brush`, `bullet`, `donut`, `groupedBar`, `heatmap`, `legend`, `line`, `scatterPlot`, `sparkline`, `stackedArea`, `stackedBar` and `tooltip`. They are generated from the charts' TypeScript types, so they list every accessor with its type and description. With the `$schema` line, editors such as VS Code check and complete the spec as you type, and any JSON Schema validator (Ajv, for example) can check one before you draw it.

Draw a spec with the chart's wrapper, which checks it too:

```js
import { BarWrapper } from '@britecharts/wrappers';

BarWrapper.create(element, spec.data, spec.config);
```

A key the chart doesn't have, or a value of the wrong type, throws an error that names each one and says what it should be. Options that take a function, such as the events and the formatting functions, can't be written in JSON: set them from JavaScript.

## How to Add a Chart to a shadcn App
Britecharts has a [shadcn registry](https://ui.shadcn.com/docs/registry), so in an app set up with shadcn/ui one command adds a chart:

```bash
npx shadcn@latest add https://britecharts.github.io/britecharts/r/bar-chart.json
```

It copies a component into `components/charts/bar-chart.tsx`, installs `@britecharts/react` and `@britecharts/core`, and adds a rule to your CSS that colours the charts with your shadcn theme: text with `--foreground` and `--muted-foreground`, axes and grid with `--border`, tooltips with `--popover`. The charts follow your app's light and dark modes, and the data keeps Britecharts' palettes. The component is yours to edit.

```tsx
import { BarChart } from '@/components/charts/bar-chart';

<BarChart data={data} height={300} tooltipTitle="Signups" a11yTitle="Signups by plan" />;
```

Each chart fills the width of its container, so put it in an element that has a width, and comes with its tooltip set up. Every other prop is the chart's own, as on its API page.

| Chart | Add it with |
| --- | --- |
| Bar | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/bar-chart.json` |
| Grouped bar | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/grouped-bar-chart.json` |
| Line | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/line-chart.json` |
| Scatter plot | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/scatter-plot.json` |
| Stacked area | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/stacked-area-chart.json` |
| Stacked bar | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/stacked-bar-chart.json` |
| Heatmap | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/heatmap.json` |
| Donut | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/donut-chart.json` |
| Sparkline | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/sparkline.json` |
| Brush | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/brush.json` |
| Bullet | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/bullet-chart.json` |
| Legend | `npx shadcn@latest add https://britecharts.github.io/britecharts/r/legend.json` |

The registry's index, for `shadcn list` and shadcn's MCP server, is at `https://britecharts.github.io/britecharts/r/registry.json`.

## How to Configure Time Scales
Britecharts has some logic to try guessing the best date format on time series charts from the time period of the dataset. As we haven't bulletproofed this algorithm, and sometimes users want specific formats, we also expose configuration options to set custom formats.

The next steps apply to time series charts like the line chart, stacked area chart and brush chart:
1. Render the chart using the default settings, see if the x-axis format is satisfactory. If not, keep on reading.
1. Check the chart's reference to find out the configuration options, for example, the [line chart reference][lineChartAPI]
1. Check the options within the `axisTimeCombinations` object of the chart instance:
```
console.log('combinations', line.axisTimeCombinations);
// Returns
{
    MINUTE_HOUR: 'minute-hour',
    HOUR_DAY: 'hour-daymonth',
    DAY_MONTH: 'day-month',
    MONTH_YEAR: 'month-year',
    CUSTOM: 'custom'
}
```
1. Set the `xAxisFormat` parameter to a value from the ones below (except 'custom')
1. Draw the chart and see if it meets your criteria. If not, try with other time combination. If still doesn't feel right, see next step.
1. Set the `xAxisFormat` parameter to the value `'custom'`
1. Set the `xAxisCustomFormat` parameter to a valid [D3.js time format specifier string][timeFormatSpecifiers]. For example: `line.xAxisCustomFormat('%H')`
1. Play around with different specifiers until finding something that works. You can experiment in [this block example][timeFormatsBlock].

Remember that for increased accuracy, all date formats in Britecharts should be provided in [ISO 8601 Extended Format][ISOFormat].


[gettingStarted]: ../tutorials/getting-started
[colorPalettesDemo]: https://britecharts.github.io/britecharts/storybook/core/?path=/story/attributes-colors--color-schemas
[colorsHelper]: https://github.com/britecharts/britecharts/blob/main/packages/core/src/charts/helpers/color.ts
[ISOFormat]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
[lineChartAPI]: /docs/API/line
[tooltipAPI]: /docs/API/tooltip
[apiReference]: /docs/API/bar
[formatSpecifiers]: https://github.com/d3/d3-format#locale_format
[formatLocale]: https://github.com/d3/d3-format#formatLocale
[storybook]: pathname:///storybook/
[timeFormatSpecifiers]: https://github.com/d3/d3-time-format#locale_format
[timeFormatsBlock]: https://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95