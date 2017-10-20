## Britecharts' JavaScript and D3 Style Guide
* A guide to build and edit Britecharts code *

## Table of Contents

  1. [API Guidelines](#api)
  1. [Code Structure](#structure)
  1. [Comments](#comments)

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

Note that most of the building blocks are dependant on the type of chart. For example, on the donut chart, we won't need to create axis or draw them, so those blocks won't be there.


**[⬆ back to top](#table-of-contents)**

## Comments
We enforce jsDoc comments in our review process, so all of the functions will need a comment. We need also to be mindful and when we change the code of a function, check if its comments need an update.

This is really important as our documentation gets generated from this same comments. You can read more about it [on the Contributing document](https://github.com/eventbrite/britecharts/blob/master/CONTRIBUTING.md#jsdoc).

**[⬆ back to top](#table-of-contents)**



NOTE: This is still work in progress, don't hesitate to ask for more by opening a new [github issue](https://github.com/eventbrite/britecharts/issues).