---
sidebar_position: 4
---

# Migration Guide from version 2 to version 3
In February 2022, we released version 3.0 of Britecharts. The new version fixes many bugs, improves loading and animation performance, and adds minor features. We also introduced many breaking changes to make the component's APIs and data shapes more consistent.

We recommend migrating as soon as possible to get all these benefits. For that, we have prepared the following migration guide.

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
import { bar } from 'britecharts';
import bar from 'britecharts/dist/umd/bar.min';

// As CommonJS modules
const { bar } = require('britecharts');
const bar = require('britecharts/dist/umd/bar.min');

```
You can also check more ways of loading (CommonJS and CDN) in our [Britecharts Test Project](https://github.com/britecharts/britecharts-test-project#usage)

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

### New features
1. Start using TypeScript with Britecharts.

You can now use Britecharts in your TypeScript projects! The Britecharts package includes a "types" entry that points to our type declaration files. We plan to re-write Britecharts in TypeScript, but type definition files will do for now!

2. Stop re-rendering charts when the viewport width changes.

In version 2 and our demos, we recommended listening to viewport width changes and re-render charts with the updated container width. This wasn't necessary, as SVGs provide a viewBox property that allows us to make our charts fully responsive out of the box. That's how Britecharts works starting version 3, so say bye-bye to those window 'resize' listeners!

3. Use 'colorMap' to select the colors you want for each data category.

One common request of our users was to specify the colors for each category on the different Britecharts components. Now you can! Use the ["colorMap"](https://britecharts.github.io/britecharts/module-Bar.html#.colorMap__anchor) property to specify a hash map between category names and HEX colors.

4. Specify the duration of animations with 'animationDuration'

Most Britecharts' components have animations that you can activate with the 'isAnimated' configuration. Since version 3, you can also set the duration of those animations in milliseconds with the 'animationDuration' accessor.

## Summary of Changes
We changed many things in the third version of Britecharts; here are some summaries:

### Breaking Changes
* Adds ES5 version to bundle.
* Changes 'loadingMarkup' option into an explicit option for 'isLoading' in most of the charts.
* Adds 'valueLocale' or renames 'locale' into 'valueLocale' for formatting values in the bar chart, grouped bar chart, scatter plot, and stacked bar.
* Fixes the custom format feature in the line and stacked area chart, renaming 'xAxisFormat' into 'xAxisCustomFormat' and  'xAxisCustomFormat' into 'xAxisFormat'. Removes 'axisTimeCombinations'.
* Renames value formatting functions into 'numberFormat' in the grouped bar and stacked bar charts.
* Removed the 'aspectRatio' configuration chart from the line, scatter plot, stacked area, bullet, grouped bar, stacked bar.
* Changed 'exportChart' to return a promise.

### New Feature Changes
* Added TypeScript types via declaration files
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

### Bug Fixes
* Fixes all critical security warnings due to dependencies
* Fixes step chart loading
* Mitigates the stacked and grouped bar charts tooltip issues
* Improved Grouped bar chart animation
* Line chart animation fix on multiline
* Ordering of the horizontal bar chart elements
* Cleans up custom lines annotation text before rendering
* Fixes bullet chart issues 
* Tooltip tweaks
*Visual Fixes Summary*
* Added extended line on brush chart
* Extended line color matching ticks
* Normalized text sizes in line and stacked area charts

### Contributor's Developer Experience Changes
* Deprecated Travis into Github Actions
* Updated Karma test runner version
* Added linting and formatting for CSS and JS 
* Changed organization of tests and data builders to be colocated
