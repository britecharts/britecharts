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

Note that in some charts we can only configure a gradient. Use the `colorGradients` object instead of `colorSchemas` within the colors helper. You can explore other options in the source code of the [colors file][colorsHelper].

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
[storybook]: pathname:///storybook/
[timeFormatSpecifiers]: https://github.com/d3/d3-time-format#locale_format
[timeFormatsBlock]: https://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95