# Code and Project Structure

## Code Structure

We require contributors to preserve both the structure and the code standards based on the original Reusable Chart API. The structure of a chart would look more or less like this:

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

| Folder                 | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| **demos**              | Where we keep demo files for each of our charts and some extra docs |
| **dist**               | Where the production ready versions of our charts will be placed    |
| **docs**               | Where the generated documentation website lives                     |
| **src**                | Where we will place the code we create                              |
| **src/charts**         | Where our charts live                                               |
| **src/charts/helpers** | Where the helping functions are                                     |
| **src/styles**         | Where our .scss styles source code is                               |
| **src/doc**            | Where the templates and configuration for our docs are              |
| **src/tasks**          | Some of our grunt tasks configuration                               |
| **test**               | Where our test related files live                                   |
| **test/fixtures**      | Tools for generate data for our charts demos and tests              |
| **test/json**          | Raw data for our charts                                             |
| **test/specs**         | Our tests for the charts                                            |
| **test/tools**         | Miscelaneous tools                                                  |

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
