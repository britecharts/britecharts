# Migration Guide from version 2.x to version 3
In February 2022, we released version 3.0 of Britecharts. The new version fixes many bugs, improves loading and animation performance, and adds a lot of new small features. We also introduced many breaking changes aimed to make more consistent the component's APIs and data shapes.

We recommend to migrate as soon as possible to get all these benefits. For that, we have prepared the following migration guide.

## Migration Steps
Most of the migration steps involve changing accessor names, but there are also changes on how we load the modules. Follow these steps to get your application updated in no time:

### Breaking changes
1. Update the way you load the charts
1. Update how you show loading states
1. Use 'valueLocale' to formatting values
1. Use 'locale' to set the localization options
1. Use 'xAxisCustomFormat' and 'xAxisFormat' on time series charts
1. Use 'numberFormat' in bar charts
1. Stop using 'aspectRatio' to set charts' dimensions

### New features
1. Start using TypeScript with Britecharts
1. Stop re-rendering charts when the viewport width changes
1. Use 'colorMap' to select the colors you want for each data category
1. Specify the duration of animations with 'animationDuration'


## Summary of Changes
We changed many things in the third version of Britecharts, here are some summaries:

### Breaking Changes
* Adds ES5 version to bundle
* Changes 'loadingMarkup' option into an explicit option for 'isLoading' in most of the charts
* Adds 'valueLocale' or renames 'locale' into 'valueLocale' for formatting values in the bar chart, grouped bar chart, scatter plot, and stacked bar
* Fixes the custom format feature on line and stacked area chart, renaming 'xAxisFormat' into 'xAxisCustomFormat' and  'xAxisCustomFormat' into 'xAxisFormat'. Removes 'axisTimeCombinations'
* Renames value formatting functions into 'numberFormat' in grouped bar, stacked bar
* Removed the 'aspectRatio' configuration chart from line, scatter plot, stacked area, bullet, grouped bar, stacked bar
* Changed exportChart to return a promise

### New Feature Changes
* Added TypeScript types via declaration files
* Charts are responsive by default using the viewBox property
* Adds colorMap to all charts
* Adds 'animationDuration' option to all animated charts
* Added grid helper on charts
* Adds zoom controls for scatter plot
* Added hasMinimumValueScale parameter to autoscale Line Chart y-axis
* Rework of Line Chart animation for better performance
* Allows brush to have missing data and to be animated
* Allows for fixed window in brush chart with 'isLocked' option
* Added Donut's hasCenterLegend to hide/show center legend
* Added Stacked Area loading state
* Added tooltip on heatmap

### Bug Fixes
* Fixes all critical security warnings due to dependencies
* Step loading and stracked and grouped bar charts tooltip issue mitigation
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
