## Getting Started with Britecharts

Britecharts has been created to help users consume and create d3 charts. It leverages a reusable API, which produces chart objects that (after initialization) can be configured and then applied to a container with a data set to plot.

### Using Britecharts in your project

In order to use a Britecharts chart in your project you would need to:

- Add Britecharts as a dependency in your package.json (not needed in core).
```
    "britecharts": "git+https://git@github.com/eventbrite/britecharts.git"
```
- Require the proper chart as a requirejs module, we can do:
```
    LineChart = require('britecharts/dist/umd/line.min')
```
- Require D3Selection as a dependency, in order to select a container to execute the chart on.
```
    d3Selection = require('d3-selection')
```
- Call the chart with a container and data attached to the container.
```
    var container = d3Selection.select('.chart-container'),
        lineChart = new LineChart();

    if (container.node()) {
        lineChart
            .tooltipThreshold(tooltipShouldShowThreshold)
            .margin(chartMargin)
            .height(chartHeight)
            .width(chartWidth);
    }
    // This line gets together container, data and chart
    container.datum(data).call(lineChart);
```
And that would generate your britechart!

It won't look perfect though, you will need to load a small CSS file in order to see it styled. You can load the whole bundle:
```html
<link type="text/css" rel="stylesheet" href="pathToBritecharts/dist/css/bundle.css">
```
or just load the styles for the current chart:
```html
<link type="text/css" rel="stylesheet" href="pathToBritecharts/dist/css/charts/line.css">
```

### Making it Responsive
You will probably want to set up a listener for the resize event to re-render the chart, and probably debounce it, so it doesn't render too many times.

Check in our [kitchen sink][demos] all the available charts. If you already know d3.js and you enjoy the project, we hope you could try to [make your own chart][contribute].


[demos]: http://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html
[contribute]: https://github.com/eventbrite/britecharts/CONTRIBUTING.md
