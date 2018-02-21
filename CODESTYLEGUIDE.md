## Britecharts' JavaScript and D3 Style Guide
* A guide to build and edit Britecharts code *

<!-- TOC -->

- [Britecharts' JavaScript and D3 Style Guide](#britecharts-javascript-and-d3-style-guide)
- [API Guidelines](#api-guidelines)
    - [General Considerations](#general-considerations)
    - [Variable and function names length](#variable-and-function-names-length)
    - [Event dispatchers](#event-dispatchers)
    - [Booleans](#booleans)
    - [Commands](#commands)
    - [Data labels](#data-labels)
    - [Formats](#formats)
    - [Ticks and Axis](#ticks-and-axis)
- [Code Structure](#code-structure)
- [Project Structure](#project-structure)
- [Helpers](#helpers)
- [Comments](#comments)
- [Append Indentation](#append-indentation)

<!-- /TOC -->

## API Guidelines
It’s easy to create new features and charts for Britecharts. However, naming the API methods is hard. We have created this API guidelines to help our contributors choosing the right names for their accessors and variables.

This guidelines will help developers and improve the consistency of the library and lower the entry barrier to start contributing on Britecharts. They will also help reviewers at the time of doing code reviews.

### General Considerations
Variable and accesor names should be on camelCase, and we will try to use only one word that will coincide with the internal variable we are using. Variables will probably be nouns, while commands will be verbs.

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
The custom events that are attached to the charts will always be added using ‘on’.

As in: _.on('customHover')_

### Booleans
We want them to be predicates. They will be prefixed with one of the following:
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
We will use the axis name and the 'axis' and ‘ticks’ suffix:

As in: _xTicks, yTicks_

**[⬆ back to top](#table-of-contents)**


## Code Structure
We want to keep a standard code structure that is based on the original Reusable Chart API. The structure of a chart would look more or less like this:

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

We like to do some light 'data cleaning' inside the `cleanData` method. That would usually include making sure that numbers are not strings. We also tend to use a reduce function, so we will create a copy of the original data and cast only the usual quantities or values we need for creating the chart.

Note that most of the building blocks depend on the chart type. For example, on the donut chart, we won't need to create axis or draw them, so those blocks won't be there.

**[⬆ back to top](#table-of-contents)**

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
Exposes `getTimeSeriesAxis`, the method that allows a conditional formatting depending on the time series values.

**color**
Contains the objects with the color schemas, the color gradients and their human friendly names.

**constants**
Reusable constants that are used through-ought the project.

**date**
Date related methods like addDays, diffDays, getLocaleDateFormatter and similar.

**export**
Methods that enable the chart export feature of Britecharts.

**filter**
Methods for creating SVG effects based on SVG filters. Includes blur and glows.

**load**
SVG components that render the different loading states Britecharts support. These are bar, donut and line loading states.

**number**
Methods that relate with numbers and number formatting. Includes a unique id generator, an integer checker and a method to calculate percentages.

**style**
Methods for serializing styles used in the export feature.

**text**
Functions to help with text related operantions like wrapping text on a given width, adding ellipsis when not enough space is available or measuring text length.

**[⬆ back to top](#table-of-contents)**


## Comments
We enforce jsDoc comments in our review process, so all the functions will need a comment. We need also to be mindful and when we change the code of a function, check if its comments need an update.

This is really important as our documentation gets generated from these jsDoc comments. You can read more about it [on the Contributing document](https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md#jsdoc).

**[⬆ back to top](#table-of-contents)**


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

**[⬆ back to top](#table-of-contents)**



NOTE: This is still work in progress, don't hesitate to ask for more by opening a new [github issue](https://github.com/eventbrite/britecharts/issues).