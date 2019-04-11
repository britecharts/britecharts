# User How-To Guides
Our how-to guides are recipes to address specific and critical use cases when working with Britecharts. They assume some knowledge about Britecharts and the library structure. If this is the first time you work with Britecharts, we recommend you to read the [Getting Started Tutorial][gettingStarted] first.

## How to Customize the Chart's Colors
Follow these steps to customize Britecharts' charts to use different color schemas:
1. Find out if your chart supports `.colorSchema`, if so, keep on reading
1. Check the [Color Palettes demo page][colorPalettesDemo] and find a palette you like
1. Import the `colors` helper at the top of your file
1. Set the color palette with `.colorSchema(colors.colorSchemas.orange)` or with any other color schema
1. Draw the chart

Note that in some charts we can only configure a gradient. Use the `colorGradients` object instead of `colorSchemas` within the colors helper. You can explore other options in the source code of the [colors file][colorsHelper].

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


[gettingStarted]: http://eventbrite.github.io/britecharts/getting-started.html
[colorPalettesDemo]: http://eventbrite.github.io/britecharts/tutorial-color.html
[colorsHelper]: https://github.com/Golodhros/britecharts/blob/master/src/charts/helpers/color.js
[ISOFormat]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
[lineChartAPI]: http://eventbrite.github.io/britecharts/module-Line.html
[timeFormatSpecifiers]: https://github.com/d3/d3-time-format#locale_format
[timeFormatsBlock]: https://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95