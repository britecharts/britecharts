---
sidebar_position: 2
---

# Getting Started Using Britecharts
We created Britecharts to help users consume and create D3.js charts. It leverages the *Reusable API*, a code pattern to encapsulate D3.js charts. This pattern produces chart objects that can be configured, reused and composed to build data visualizations.

In this tutorial, we will *create a simple data visualization using Britecharts*. You will learn how to load Britecharts, instantiate and configure a chart and plot it within a container with a data set.

## Downloading Britecharts
To use a Britechart, we need to install the library. In this tutorial, we are going to use a simple CDN link to install it. For that, create a simple HTML file and add this script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/cdn/bundle/core.cdn.min.js"
        type="text/javascript"></script>
```
The bundle has every chart, and the d3 modules they use, so the page needs no other script.

We also need to load the styling of our chart, and we do it similarly by accesing the CDN link:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/styles/bundle/britecharts.min.css" type="text/css" />
```

## Setting up Container, Dataset and Chart
To create a container, we add a div in the DOM with a class:
```html
<div class="bar-container"></div>
```

We instantiate a new chart by calling the function bar() inside the `core` object in the global namespace:
```js
const barChart = core.bar();
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

We only need to render our configured bar chart into the container, with the data:
```js
barChart.render('.bar-container', barData);
```
`render` takes a CSS selector, an element or a d3 selection. Calling it again with new data redraws the chart.
To render a simple bar chart:

![Simple Bar Chart][barChartImg]

Here is all the code inside the `<body>` tag of our HTML file:
```html
<div class="bar-container"></div>

<script>
    // Instantiate bar chart
    const barChart = core.bar();

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

    barChart.render('.bar-container', barData);
</script>
```
In version 3 of Britecharts, the rendered charts are already responsive, so you can stretch and compress the viewport size to see the chart react.

You can check the full code of this tutorial [in this file][simpleBarChartTutorialHTML] and the [tutorial working here][simpleBarChartTutorial].

## Summary
In this tutorial, we have seen how to load Britecharts with a CDN link and how to draw a simple chart. We did this by checking the API Reference page for the chart and its data schema and by creating the elements needed in the HTML file.

To keep on learning more about Britecharts, you can follow our [Composing Your First Data Visualization tutorial][composingDataviz] or read abbout how to [install Britecharts in your project][installingBritecharts]. You can also check out our [Documentation Homepage][home] and our [kitchen sink][demos] to see all the available charts.

If you are excited about Britecharts, want to add more configurable properties or even create your own chart, please check our [Contributing Guide][contribute]. In it, we walk you through the development environment setup, running our docs and demos and creating new Pull Requests.

[home]: https://britecharts.github.io/britecharts/
[demos]: https://britecharts.github.io/britecharts/storybook/
[contribute]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
[barChartAPI]: /docs/API/bar
[barChartDataSchema]: /docs/API/bar#exportsbarchartdata--arrayobject
[barChartImg]: https://raw.githubusercontent.com/britecharts/britecharts/main/packages/docs/static/img/tutorial/simple-bar-chart.png
[simpleBarChartTutorialHTML]: https://github.com/britecharts/britecharts/blob/main/packages/docs/docs/tutorials/html/tutorial-simple-bar-chart.html
[simpleBarChartTutorial]: https://britecharts.github.io/britecharts/storybook/core/?path=/story/charts-bar--playground
[composingDataviz]: /docs/tutorials/composing-dataviz
[installingBritecharts]: /docs/tutorials/installing-britecharts
