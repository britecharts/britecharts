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

## How to Add a Tooltip to a Chart
Every chart dispatches the same three events, and the tooltip has a handler for each:
1. Create the tooltip: `tooltip()` for the line, stacked area, stacked bar and grouped bar charts, which list one row per topic, or `miniTooltip()` for the bar, donut, heatmap and scatter plot, which show one value
1. Connect the chart's `customMouseOver`, `customMouseMove` and `customMouseOut` events to the tooltip's `show`, `update` and `hide`
1. Tell the tooltip where the chart keeps its data, if the table below lists a setting for it
1. Draw the chart, then call the tooltip on the chart's `.metadata-group` (for the line and stacked area, on `.metadata-group .vertical-marker-container`)

```js
const stackedBarChart = stackedBar();
const chartTooltip = tooltip()
    .topicLabel('values')
    .nameLabel('stack');

stackedBarChart
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);

select('.js-chart').datum(data).call(stackedBarChart);
select('.js-chart .metadata-group').datum([]).call(chartTooltip);
```

The charts do not all name the fields of the data point they send the tooltip the same way, so some need a setting. Without it, the tooltip shows no rows, rows without their colours, or no value:

| Chart | Tooltip settings | React `Tooltip` props |
| --- | --- | --- |
| Line | none | `topicLabel="topics"` |
| Stacked area | `topicLabel('values')` | none |
| Stacked bar | `topicLabel('values')`, `nameLabel('stack')` | `nameLabel="stack"` |
| Grouped bar | `topicLabel('values')`, `nameLabel('group')` | `nameLabel="group"` |
| Scatter plot | `valueLabel('y')` | `valueLabel="y"` |
| Bar, donut, heatmap | none | none |

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
barChart.isLoading(true);
container.datum([]).call(barChart);

fetchData().then((data) => {
    barChart.isLoading(false);
    container.datum(data).call(barChart);
});
```

In React, pass `isLoading` together with the data you have, an empty array included, and set it to `false` when the data arrives. With `data={null}`, the component draws nothing at all, skeleton included.

## How to Animate a Chart
Charts draw without animation by default. Set `isAnimated(true)` to animate them as they draw, and `animationDuration` to set how long that takes, in milliseconds (1200 by default):

```js
lineChart.isAnimated(true).animationDuration(600);
```

`animationDuration` does nothing while `isAnimated` is `false`. The bar, grouped bar, stacked bar, line, stacked area, donut, heatmap, scatter plot, sparkline and brush charts animate. React components take both as props.

A reader whose system asks for reduced motion (the `prefers-reduced-motion` setting) sees every chart drawn without animation, whatever `isAnimated` is set to. Charts check it each time they draw, so changing the setting applies from the next render. `isAnimated()` still reads back the value you set.

## How to Export a Chart
Call `exportChart` with a filename to download the chart as it is drawn. The filename picks the format: one ending in `.svg` downloads an svg file, and any other a png. An optional second argument adds a title at the top:

```js
barChart.exportChart('visits.svg', 'Visits by month');
barChart.exportChart('visits.png');
```

The svg keeps the chart's styles inlined, so it looks the same in a design tool or a document, and it stays sharp at any size. `exportChart` returns a promise that resolves once the download starts. In React, the grouped bar, heatmap, line, sparkline, stacked area and stacked bar components take the filename as their `exportChart` prop.

## How to Chart Negative Values
The bar, grouped bar, stacked bar, brush and scatter plot charts draw negative values with no setting to turn on:

* The bar charts draw bars below, or to the left of, a zero baseline, and a stacked bar stacks its negative parts down from zero.
* The scatter plot's value axis runs below zero when the data does, and a circle's size shows the size of its value, so -50 draws as large as 50.

The line and stacked area charts plot negative values as they are. Axis labels for negative numbers use the typographic minus sign: see [how to format numbers](#how-to-format-numbers-and-dates-for-your-language) to change it.

## How to Make a Chart Accessible
Every chart gives its svg a role and a name that screen readers announce: "Bar chart" by default. Name it after what it shows, and add a sentence about what it means:

```js
barChart
    .a11yTitle('Monthly visits')
    .a11yDescription('Visits doubled in May');
```

The name goes in an `aria-label`, so browsers do not show it as a tooltip on hover. React components take `a11yTitle` and `a11yDescription` as props.

### Label a bullet chart or a sparkline
The bullet chart and the sparkline draw only their data, with no title: text inside an svg cannot wrap and ignores the page's typography. Put the label in your own markup, next to the chart, and give screen readers the same words:

```html
<h3>CPU load <small>GHz</small></h3>
<div class="js-bullet-chart"></div>
```

```js
bulletChart.a11yTitle('CPU load, GHz');
select('.js-bullet-chart').datum(data).call(bulletChart);
```

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