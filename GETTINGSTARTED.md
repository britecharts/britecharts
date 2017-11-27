## Getting Started with Britecharts

Britecharts has been created to help users consume and create d3 charts. It leverages a reusable API, which produces chart objects that (after initialization) can be configured and then applied to a container with a data set to plot.

### Installing Britecharts
In order to use a Britecharts chart in your project you would need to install it using NPM, Bower or cloning it via Github:

##### Install with NPM
```
   npm install --save britecharts d3-selection
```

##### Install with Bower
```
   bower install --save britecharts d3-selection
```

##### Clone the git repository
```
   git clone https://github.com/eventbrite/britecharts.git
```

##### Directly from CDN
```
https://cdn.jsdelivr.net/npm/britecharts@2/dist/bundled/britecharts.min.js (latest 2.x.x version)
```
Or [browse all CDN files](https://cdn.jsdelivr.net/npm/britecharts/dist/). Check also our [CDN demo page][cdnDemo] or our [JSBin][jsbinSandbox] and [CodePen][codepenSandbox] sandbox projects.

### Using Britecharts

In order to use a Britecharts chart in your project you would need to:

- Require the proper chart as a module, we can do:
```
    // ES2015 Modules
    import LineChart from 'britecharts/dist/umd/line.min';

    // CommonJS or AMD modules
    LineChart = require('britecharts/dist/umd/line.min');
```
- Require d3-selection as a dependency, in order to select a container to execute the chart on.
```
    d3Selection = require('d3-selection');
```
- Instantiate a new line chart and select the chart container with `d3-selection`:
```
    var container = d3Selection.select('.js-chart-container'),
        lineChart = new LineChart();
```
- Configure the default chart with attributes:
```
    if (container.node()) {
        lineChart
            .tooltipThreshold(tooltipShouldShowThreshold)
            .margin(chartMargin)
            .height(chartHeight)
            .width(chartWidth);
    }
```
- And finally call the chart with a container and data attached to the container.
```
    // This line gets together container, data and chart
    container.datum(data).call(lineChart);
```
And that would generate your britechart!

Here is the whole code:

```
    var container = d3Selection.select('.js-chart-container'),
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

It won't look perfect though, you will need to load a small CSS file in order to see it styled. You can load the whole bundle:
```html
<link type="text/css" rel="stylesheet" href="node_modules/britecharts/dist/css/britecharts.min.css">
```
or just load the styles for the current chart plus the common Britecharts styles:
```html
<link type="text/css" rel="stylesheet" href="node_modules/britecharts/dist/css/common/common.css">
<link type="text/css" rel="stylesheet" href="node_modules/britecharts/dist/css/charts/line.css">
```

### Making it Responsive
You will probably want to set up a listener for the resize event to re-render the chart, and probably debounce it, so it doesn't render too many times.

This code would probably look like this:
```
const redrawChart = () => {
    let container = d3.select(‘.js-chart-container’);
    let newContainerWidth = container.node() ? container.node().getBoundingClientRect().width : false;

    // Setting the new width on the chart
    lineChart.width(newContainerWidth);

    // Rendering the chart again
    container.datum(data).call(lineChart);
};
const throttledRedraw =  _.throttle(redrawChart, 200);

window.addEventListener("resize", throttledRedraw);

```

### Learning More
Check out our [Documentation Homepage][home] and our [kitchen sink][demos] to see all the available charts.

If you are excited about Britecharts, want to add more configurable properties or even create your own chart, please check our [Contributing Guide][contribute]. In it, we walk you through the development environment setup, run our docs and demos and create new Pull Requests.


[demos]: http://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html
[contribute]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[home]: http://eventbrite.github.io/britecharts/
[cdnDemo]: https://eventbrite.github.io/britecharts/cdn.html
[jsbinSandbox]: https://jsbin.com/wativun/1/edit?html,js,output
[codepenSandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
