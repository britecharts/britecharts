# Getting Started Using Britecharts
Britecharts has been created to help users consume and create D3.js charts. It leverages the *Reusable API*, a code pattern to encapsulate D3.js charts. This pattern produces chart objects that can be configured, reused and composed to build data visualizations.

In this tutorial, we will *create a simple data visualization using Britecharts*. You will learn how to load Britecharts, instantiate and configure a chart and plot it within a container with a data set.

## Downloading Britecharts
To use a Britechart, we need to install the library. In this tutorial, we are going to use a simple CDN link to install it. For that, create a simple HTML file and add these script tags:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-selection/1.2.0/d3-selection.js"></script>
<script src="https://cdn.jsdelivr.net/npm/britecharts@2.10.0/dist/umd/bar.min.js"
        type="text/javascript"></script>
```
We are going to create a bar chart, so we download the bundle for that individual chart. Note that we also require `d3-selection`. We use this module to create a selection and load the data in the container where we render the chart.

We also need to load the styling of our chart, and we do it similarly by accesing the CDN link:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/britecharts/dist/css/britecharts.min.css" type="text/css" />
```

## Setting up Container, Dataset and Chart
To create a container, first we need to add a div in the DOM with a class:
```html
<div class="bar-container"></div>
```
Next, we can create our D3.js container using the `d3-selection` module:
```js
const container = d3.select('.bar-container');
```

We instantiate a new chart by calling the function bar() inside the britecharts object in the global namespace:
```js
const barChart = britecharts.bar();
```
We need a simple dataset to render the bar chart. We can find the right format of the data by visiting the [API documentation][barChartAPI] for the bar chart component. Developers need to find the data definition at the top of the page; in this case, it is a link labeled [BarChartData][barChartDataSchema]. It looks like this:
```json
[
    {
        value: 1,
        name: 'glittering'
    },
    {
        value: 1,
        name: 'luminous'
    }
]
```
We can extend that definition to have some more bars, for example:
```js
const barData = [
    { name: 'Luminous', value: 2 },
    { name: 'Glittering', value: 5 },
    { name: 'Intense', value: 4 },
    { name: 'Radiant', value: 3 }
];
```

## Configuring and Rendering the bar chart
We only need to configure our bar chart by calling the accessors. We describe these in the [bar chart API reference][barChartAPI] page. In this tutorial, we set it up as a horizontal bar chart with a height of 400px and a width of 600px:
```js
barChart
    .margin({left: 100})
    .isHorizontal(true)
    .height(400)
    .width(600);
```
Notice how we tweaked a bit the left margin in order to allow space for our left aligned labels to render.

We only need to combine our configured bar chart with the container and the data to render our chart:
```js
container.datum(barData).call(barChart);
```
To render a simple bar chart:

![Simple Bar Chart][barChartImg]

Here is all the code inside the `<body>` tag of our HTML file:
```html
<div class="bar-container"></div>

<script>
    // Instantiate bar chart and container
    const barChart = britecharts.bar();
    const container = d3.select('.bar-container');

    // Create Dataset with proper shape
    const barData = [
        { name: 'Luminous', value: 2 },
        { name: 'Glittering', value: 5 },
        { name: 'Intense', value: 4 },
        { name: 'Radiant', value: 3 }
    ];

    // Configure chart
    barChart
        .margin({left: 100})
        .isHorizontal(true)
        .height(400)
        .width(600);

    container.datum(barData).call(barChart);
</script>
```

## Making the Chart Responsive
To make this chart responsive, we want to listen to the browser's resize event. When the event triggers, we obtain the container's width, set it with the accessor and re-draw the chart.

As the resize event triggers multiple times, we probably want to debounce the callback, so it doesn't render too many times. The code would probably look like this:
```js
const redrawChart = () => {
    const newContainerWidth = container.node() ? container.node().getBoundingClientRect().width : false;

    // Setting the new width on the chart
    barChart.width(newContainerWidth);

    // Rendering the chart again
    container.call(barChart);
};
const throttledRedraw = _.throttle(redrawChart, 200);

window.addEventListener("resize", throttledRedraw);

```
We would need to load the Lodash or Underscore library; we could do it with a CDN link like:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"
            type="text/javascript"/></script>
```

This logic is not the only way to avoid multiple successive calls. You could also listen to requestAnimationFrame to time the execution of the callback.

You can check the full code of this tutorial [in this file][simpleBarChartTutorialHTML] and the [tutorial working here][simpleBarChartTutorial].

## Summary
In this tutorial, we have seen how to load Britecharts with a CDN link and how to draw a simple chart. We did this by checking the API Reference page for the chart and its data schema and by creating the elements needed in the HTML file.

To keep on learning more about Britecharts, you can follow our [Composing Your First Data Visualization tutorial][composingDataviz] or read abbout how to [install Britecharts in your project][installingBritecharts]. You can also check out our [Documentation Homepage][home] and our [kitchen sink][demos] to see all the available charts.

If you are excited about Britecharts, want to add more configurable properties or even create your own chart, please check our [Contributing Guide][contribute]. In it, we walk you through the development environment setup, running our docs and demos and creating new Pull Requests.

[home]: http://eventbrite.github.io/britecharts/
[demos]: http://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html
[contribute]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[barChartAPI]: http://eventbrite.github.io/britecharts/module-Bar.html
[barChartDataSchema]: http://eventbrite.github.io/britecharts/global.html#BarChartData
[barChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/tutorials/simple-bar-chart.png
[simpleBarChartTutorialHTML]: https://github.com/eventbrite/britecharts/blob/master/src/doc/html/tutorial-simple-bar-chart.html
[simpleBarChartTutorial]: http://eventbrite.github.io/britecharts/tutorial-simple-bar-chart.html
[composingDataviz]: http://eventbrite.github.io/britecharts/composing-dataviz.html
[installingBritecharts]: http://eventbrite.github.io/britecharts/installing-britecharts.html
