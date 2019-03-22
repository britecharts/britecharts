# Tutorials
Britechart tutorials allow new users to get started and learn the basic procedures and components of the library. They are meant to be a learning experience ideal for newcomers.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Tutorials](#tutorials)
	* [Getting Started Using Britecharts](#getting-started-using-britecharts)
		* [Downloading Britecharts](#downloading-britecharts)
		* [Setting up Container, Dataset and Chart](#setting-up-container-dataset-and-chart)
		* [Configuring and Rendering the Bar Chart](#configuring-and-rendering-the-bar-chart)
	* [Installing Britecharts](#installing-britecharts)
		* [Install with NPM](#install-with-npm)
		* [Download From the CDN](#download-from-the-cdn)
		* [Clone or Download the Source Code](#clone-or-download-the-source-code)
	* [Composing Your First Data Visualization](#composing-your-first-data-visualization)

<!-- /code_chunk_output -->

## Getting Started Using Britecharts
Britecharts has been created to help users consume and create D3.js charts. It leverages the Reusable API, a code pattern to encapsulate chart code. This pattern produces chart objects that can be configured, reused and composed to build data visualizations.

In this tutorial, we will create a simple data visualization using Britecharts. You will learn how to load Britecharts, instantiate and configure a chart and plot it within a container with a data set.

### Downloading Britecharts
To use a Britechart, we need to install the library. In this tutorial, we are going to use a simple CDN link to install it. For that, create a simple html file and add these script tags:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-selection/1.2.0/d3-selection.js"></script>
<script src="https://cdn.jsdelivr.net/npm/britecharts@2.10.0/dist/umd/bar.min.js"
        type="text/javascript"></script>
```
We are going to create a Bar Chart, so we download the bundle for that individual chart. Note that we also require `d3-selection`. We use this module to create a selection and load the data in the container where we render the chart.

We also need to load the styling of our chart, and we do it similarly by accesing the CDN link:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/britecharts/dist/css/britecharts.min.css" type="text/css" />
```

### Setting up Container, Dataset and Chart
To create a container, first we need to add a div in the DOM with a class:
```
<div class="bar"></div>
```
Next, we can create our D3.js container using the `d3-selection` module:
```
var container = d3.select('.bar');
```

We instantiate a new chart by calling the function bar() inside the britecharts object in the global namespace:

```
var barChart = britecharts.bar();
```
We will need a simple dataset to render the bar chart. We can find the right format of the data by visiting the [API documentation][barChartAPI] for the Bar Chart component. Developers need to find the data definition at the top of the page, in this case, it is a link labeled [BarChartData][barChartDataSchema]. It looks like this:
```
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
```
var barData = [
    { name: 'Luminous', value: 2 },
    { name: 'Glittering', value: 5 },
    { name: 'Intense', value: 4 },
    { name: 'Radiant', value: 3 }
];
```

### Configuring and Rendering the Bar Chart
We only need to configure our bar chart by calling the accessors. These are described in the [Bar Chart API reference][barChartAPI] page. In this tutorial, we set it up as a horizontal bar chart with height of 400px and width of 600px:
```
barChart
    .margin({left: 100})
    .isHorizontal(true)
    .height(400)
    .width(600);
```
Notice how we tweaked a bit the left margin in order to allow space for our left aligned labels to render.

We only need to combine our configured bar chart with the container and the data to render our chart:
```
container.datum(barData).call(barChart);
```
To render a simple bar chart:

![Simple Bar Chart][barChartImg]

Here is all the code inside the `<body>` tag of our HTML file:
```
<div class="bar"></div>

<script>
    // Instantiate Bar Chart and container
    var barChart = britecharts.bar();
    var container = d3.select('.bar');

    // Create Dataset with proper shape
    var barData = [
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

You can also check the full code [in this file][simpleBarChartTutorialHTML].

[barChartAPI]: http://eventbrite.github.io/britecharts/module-Bar.html
[barChartDataSchema]: http://eventbrite.github.io/britecharts/global.html#BarChartData
[barChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/tutorials/simple-bar-chart.png
[simpleBarChartTutorialHTML]: https://github.com/eventbrite/britecharts/blob/master/src/doc/html/tutorial-simple-bar-chart.html

## Installing Britecharts
To install Britecharts in your project you can to install it using different approaches:
* Using the Node Package Manager (NPM) or Yarn
* Using the CDN links
* Cloning the project via Github
* Downloading the Project from Github

### Install with NPM
The recommended way of installing Britecharts is to use NPM or Yarn:
```
npm install --save britecharts d3-selection
```
Or, using Yarn:
```
yarn add britecharts d3-selection
```
Notice this requires you to have in place a bundling system (Webpack, Parcel, Rollup, Gulp or Grunt). If you just want to drop a script in a HTML file and start working, use the CDN way below.

### Download From the CDN
To import the latest bundle (2.x.x version), use this URL:
```
https://cdn.jsdelivr.net/npm/britecharts@2/dist/bundled/britecharts.min.js
```
This bundle attaches to the global `window` object a JavaScript object called `britecharts`. Within it, you can find the charts and helpers you need.

With Britecharts, you can also download individual bundles of the charts and helpers. To do this, you can [browse all CDN files][jsDelivrDist], browsing inside the `umd` folder to find the chart URL you need.

You can see the CDN links in action in:
* our [CDN demo page][cdnDemo]
* this [JSBin][jsbinSandbox] sandbox project
* this [CodePen][codepenSandbox] pen

### Clone or Download the Source Code
You can clone the git repository:
```
   git clone https://github.com/eventbrite/britecharts.git
```
Or download the source code by navigating to the [Release Page][githubReleases] and click in the latest's release `zip` or `tar.gz` links.

Then, you would need to install the dependencies and build the project. Check the [Contributing Guide][contributingGuide] to learn about this process.

[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts/dist/
[cdnDemo]: https://eventbrite.github.io/britecharts/cdn.html
[jsbinSandbox]: https://jsbin.com/wativun/1/edit?html,js,output
[codepenSandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[contributingGuide]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[githubReleases]: https://github.com/eventbrite/britecharts/releases

## Composing Your First Data Visualization

