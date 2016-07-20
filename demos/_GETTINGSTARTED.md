## Getting Started with Britecharts

In this document, we show you the 3 main use cases you as developer will find when working with Britecharts:


### Using Britecharts in your project

In order to use a Britecharts chart in your project you would need to:

- Add Britecharts as a dependency in your package.json (not needed in core).
```
    "britecharts": "http://packages:8889/package/britecharts/1.0.13"
```
- Require the proper chart as a requirejs module, for example, in core we do:
```
    LineChart = require('britecharts/umd/line.min')
```
- Require D3 as a dependency too.
```
    d3 = require('d3')
```
- Call the chart with a container and data attached to the container.
```
    var container = d3.select(config.containerSelector),
        lineChart = new LineChart();

    if (container.node()) {
        lineChart
            .tooltipThreshold(config.tooltipShouldShowThreshold)
            .margin(config.chartMargin)
            .height(config.chartHeight)
            .width(config.chartWidth);
    }
    // This line mixes together container, data and chart
    container.datum(data).call(lineChart);
```
And that would generate your britechart!

You will probably want to set up a listener for the resize event to re-render the chart.



### Modifying a chart

We have created this charts with Tests First, and we encourage you to do the same. However, you can also write tests later.

For a TDD workflow, the process would look like this:

- Create a new branch for your modification
- Find the test of the chart you want to modify in ``/test/specs/*.spec.js``
- Write a failing test for the API accessor or the feature you want to add
- Check that it fails
- Write the code that would make that test pass
- Make the test pass
- Update the comments so that the proper documentation gets generated when running
```
npm run docs
```
- Check the demos to see the code in action (you can also add a new demo there if necessary)
- Create a pull request and ask people of the team to review it
- Once you have a shipit, merge it!
- If you are using it on core, you will need to release a new version of Britecharts:
```
npm run release
```
- Update the new version number on ``npm.json`` and ``npm-shinkwrap.json``
- Build your core-frontend container and reload your environment



### Creating a new chart

Adding a new chart is a bunch of work, but we hope the current code and documentation will help you in the process.

- Create a new branch for your new chart
- Create a file for the tests and the chart (on ``src/charts`` and ``test/specs``)
- Create a file for the demo too, and it's corresponding html (find them on ``demos/``)
- Using the bar chart tests as a jumpstart, add one test and make it fail
- Write the code that makes that test pass and keep on adding tests
- Once you think you are close to have something working, start adding JSDoc comments to your code
- Generate your docs with:
```
    npm run docs
```
- Create a pull request with your branch and ping one of the core authors to get it reviewed
- Once you have a shipit, merge it
- If you are using it on core, you will need to release a new version of Britecharts:
```
    npm run release
```
- Update the new version number on ``npm.json`` and ``npm-shinkwrap.json``
- Build your core-frontend container and reload your environment


