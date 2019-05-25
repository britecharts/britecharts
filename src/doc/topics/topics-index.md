# Topics
In this section we discuss important concepts for Britecharts, giving context to some of our code decisions and helping understand why we have created the library this way.

## Code Standards
We have followed a couple of standards in this project: [JSDoc](http://usejsdoc.org) comments and Test Driven Development. You can also check other info in our [API guidelines][styleguide].

### Test Driven Development
D3.js charts are complex systems. As other Software Development projects, they start simple and become bloated at the end of the process. To overcome this, we have followed a component approach that allows us to create easily testable units.

We have chosen [Karma](http://karma-runner.github.io/) as our test runner, and [Jasmine](http://jasmine.github.io/) as our unit-testing library.

To install Karma and start running our test you would need to follow these steps:

1. Fork the repository by clicking the fork button on Github
2. Clone the repository with:
    ```git clone https://github.com/<your handle>/britecharts.git```
3. Get into the repository folder and install the dependencies with:
    ```yarn install```
4. Run the tests with:
    ```yarn run test```

This process watches the test and chart files, re-running the tests when those change.

### JSDoc Generated Documentation
JSDoc is an API documentation generator. It allows us to follow a methodology when commenting our code so that later we can automatically generate documentation from these comments. Check it's [getting started guide](http://usejsdoc.org/about-getting-started.html) to know more about it.

We enforce jsDoc comments in our review process, so all the functions need a comment. We require also to be mindful and when we change the code of a function. Please check if its comments need an update too. This is essential, as our documentation gets generated from these JSDoc comments.

We are also using [Grunt](http://gruntjs.com/) and a [grunt task](https://github.com/krampstudio/grunt-jsdoc) to generate the documentation.

Lastly, for the documentation site theme, we are using a custom [Bootswatch theme](https://bootswatch.com/). Its repository is [a fork](https://github.com/Golodhros/bootswatch) of the original, and to update it, we would only run:
```
grunt swatch_scss:custom
```
To generate the theme living in the `/custom` folder. We can also preview it by running `grunt` and check it out in `http://0.0.0.0:3000/custom/`.

## The Reusable Chart API
The Reusable Chart API is a modular structure to create and reuse D3.js components. We saw the first example of this pattern in Mike Bostock’s seminal post [Towards Reusable Charts (2012)][towardsReusableCharts].

We built Britecharts using this design pattern, so that all our components benefit from its characteristics. They are all *simple, modular, reusable, composable, and testable*.

The pattern is based in a closure that allows us to keep properties private and define the elements of the components' API. Take a look at the code:
```js
/**
* This function creates the graph using the selection as container
* @param {D3Selection} _selection A d3 selection that represents
* the container(s) where the chart(s) will be rendered
*/
function exports(_selection){
    /* @param {object} _data The data to attach and generate the chart */
    _selection.each(function(_data){
        chartWidth = width - margin.left - margin.right;
        chartHeight = height - margin.top - margin.bottom;
        data = _data;

        buildScales();
        buildAxis();
        buildSVG(this);
        buildContainerGroups();
        drawBars();
        drawAxis();
    });
}

/**
* Gets or Sets the margin of the chart
* @param {object} _x            Margin object to get/set
* @return { margin | module}    Current margin or Bar Chart module to chain calls
* @public
*/
exports.margin = function(_x) {
    if (!arguments.length) {
        return margin;
    }
    margin = _x;
    return this;
};

return exports;
```
This piece of code returns a function that accepts a D3.js selection as input. Then, it extracts the data of that selection to build a chart, using the selection as the container. It also accepts some configuration (the margin, in this case) that we can set beforehand.

To learn more about this pattern you can read [this blog post][reusableAPI] on Eventbrite's Engineering Blog.


## API Guidelines
Creating new features and charts for Britecharts is easy. However, naming the API methods is hard. We have created these API guidelines to help our contributors choosing the right names for their accessors and variables.

The guidelines help developers to improve the consistency of the library and lower the entry barrier to start contributing to Britecharts. They also help reviewers at the time of doing code reviews.

### General Considerations
Variable and accessor names should be on camelCase, and we try to use only one word that coincides with the internal variable we are using. Variables probably are nouns, while commands are verbs.

For example: _height, width, margin, title_.

### Variable and function names length
We will usually follow the 'Scope Rule':
* Variable names:
  * short in small scopes (d)
  * long in large scopes (percentageLabelMargin)
* Functions names:
  * short in large scopes like public commands (hide, width)
  * long in small scopes (drawVerticalExtendedLine)

### Event dispatchers
The custom events that are attached to the charts always are added using ‘on’.

As in: _.on('customHover')_

### Booleans
We want them to be predicates. They are prefixed with one of the following:
* should
* has
* is

As in: _isAnimated, hasFixedHighlightedSlice_.

### Commands
They must be a verb, and keep them as one word when possible.

As in: _hide, show, exportChart_

### Data labels
For API entries that configure the keys of the input data, we use the property name and the suffix ‘label’.

As in: _dateLabel, valueLabel_

### Formats
A simple name with the property name and ‘format’ suffix.

As in: _numberFormat, xLabelFormat_

### Ticks and Axis
We use the axis name and the 'axis' and ‘ticks’ suffix:

As in: _xTicks, yTicks_



## Code Structure
We want to keep a standard code structure that we base on the original Reusable Chart API. The structure of a chart would look more or less like this:

```
  // D3 module requires
  // helper requires
  // Constants

  // Data definition JSDoc comment
  // Module definition JSDoc comment

  return function module() {
    // Private variables (more or less grouped)
    // Extractor functions
    // Format functions

    function exports (_selection) {
      ...
      // Dimension setting
      // Data cleaning with 'cleanData' function

      // Main building blocks (optional)
      buildScales();
      buildAxis();
      buildSVG();
      drawGridLines();
      drawElements();
      drawAxis();

      // Conditional building blocks
    }

    // Building block definitions
    // API definitions ordered alphabetically
  }

```

We like to do some light 'data cleaning' inside the `cleanData` method. That would usually include making sure that numbers are not strings. We also tend to use a reduce function, so we create a copy of the original data and cast only the usual quantities or values we need for creating the chart.

Note that most of the building blocks depend on the chart type. For example, on the donut chart, we won't need to create axis or draw them so that those blocks won't be there.


## Project Structure

The default directory structure looks something like this:

```
britecharts
├── demos
├── dist
├── docs
├── src
│   ├── tasks
│   ├── doc
│   └── charts
│       └── helpers
└── test
    ├── fixtures
    ├── json
    ├── specs
    └── tools
```


| Folder | Description
| ---  | ---
| **demos** | Where we keep demo files for each of our charts and some extra docs
| **dist** | Where the production ready versions of our charts will be placed
| **docs** | Where the generated documentation website lives
| **src** | Where we will place the code we create
| **src/charts** | Where our charts live
| **src/charts/helpers** | Where the helping functions are
| **src/styles** | Where our .scss styles source code is
| **src/doc** | Where the templates and configuration for our docs are
| **src/tasks** | Some of our grunt tasks configuration
| **test** | Where our test related files live
| **test/fixtures** | Tools for generate data for our charts demos and tests
| **test/json** | Raw data for our charts
| **test/specs** | Our tests for the charts
| **test/tools** | Miscelaneous tools

## Helpers
**axis**
Exposes `getTimeSeriesAxis`, the method that allows conditional formatting depending on the time series values.

**color**
The color helper contains the objects with the color schemas, the color gradients, and their human-friendly names.

**constants**
The constants file holds reusable constants that we use through-ought the project.

**date**
Date related methods like addDays, diffDays, getLocaleDateFormatter and similar.

**export**
This helper provides methods that enable the chart export feature of Britecharts.

**filter**
Includes methods for creating SVG effects based on SVG filters. Provides blur and glows.

**load**
The load helper provides SVG components that render the different loading states Britecharts support. These are bar, donut and line loading states.

**number**
The number file supports developers by supplying methods that relate to numbers and number formatting. Includes a unique id generator, an integer checker and a method to calculate percentages.

**style**
Methods for serializing styles used in the export feature.

**text**
Functions to help with text related operations like wrapping text on a given width, adding ellipsis when not enough space is available or measuring text length.


## Append Indentation
It is a [usual pattern](https://bost.ocks.org/mike/d3/workshop/#35) in the D3.js world to apply a slightly different indentation to operations that change the selection, like the 'apply' method of a selection. When the selection changes, we indent with two spaces instead of four:

```
// good
let elements = svg.select('.element')
                .selectAll('rect.element')
                .data(data)
                .enter()
                  .append('rect')
                    .attr('class', 'element')
                    .attr('fill', 'red');

// bad (append is in the same level as other operations)
let elements = svg.select('.element')
                .selectAll('rect.element')
                .data(data)
                .enter()
                    .append('rect')
                    .attr('class', 'element')
                    .attr('fill', 'red');

```
This special indentation of the `append` call is highlighting a modification on the selection. Essentially, is helping developers know that the content of the 'elements' variable will contain a selection of `rect` items.



NOTE: This is still work in progress, don't hesitate to ask for more by opening a new [github issue](https://github.com/eventbrite/britecharts/issues).


## The Build System
### ES2015 transpiling
We wrote Britecharts modules in ES2015, so we would need to create an ES5-compatible version of the charts before releasing a new version.

To work with the development version of the charts, we need to run:
    ```yarn run demos:serve```

However, if you want to create the production version of the charts, you should run:
    ```yarn run build```

### The Tasks
The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `yarn run test` and `yarn run build` most of the time, the other tasks can be called independently or combined to see the docs.

| Task                      | Description
| ---                       | ---
| `yarn run test`            | Starts the Karma runner that tests the project and keep watching for changes.
| `yarn run demos:serve`     | Serves the demos for our tutorials.
| `yarn run docs`            | Compiles the docs with JSDoc and opens a browser showing them.
| `yarn run styles`          | Compiles the styles for the charts
| `yarn run build`           | Builds everything and generates the distribution version of the charts.
| `yarn run release`         | Creates a new release of the library.
| `yarn run release:minor`   | Creates a new release of the library by bumping the second number of the version (1.N.1)
| `yarn run release:major`   | Creates a new release of the library by bumping the third number of the version (N.1.1)

**Note that for running `yarn run docs`, you need first to have `yarn run demos:serve` in a different terminal.


[node]: http://nodejs.org
[styleguide]: http://eventbrite.github.io/britecharts/topics-index.html#toc5__anchor
[yarn]: https://yarnpkg.com/lang/en/docs/install/
[reusableAPI]: https://www.eventbrite.com/engineering/leveling-up-d3-the-reusable-chart-api/
[towardsReusableCharts]: http://bost.ocks.org/mike/chart/