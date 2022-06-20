---
sidebar_position: 4
---

# Code and Project Structure

## Code Structure

We require contributors to preserve both the structure and the code standards based on the original [Reusable Chart API][reusableAPI]. The structure of a `@britecharts/core` chart would look more or less like this:

```
  // D3 module imports
  // helper imports
  // Constants

  // Module definition JSDoc comment
  // Data definition JSDoc comment

  export default function module() {
    // Private variables (more or less grouped)
    // Extractor functions
    // Format functions

    function exports (_selection) {
      // Locale formatter setup (if any)

      _selection.each(function (_data) {
        // Dimension setting
        // Data cleaning with 'cleanData' function

        buildSVG(this);
        // Main building blocks (optional)
        buildScales();
        buildAxis();
        drawGridLines();
        drawAxis();
        drawElements();

        // Conditional building blocks
      }
    }

    // Building block definitions
    // API definitions ordered alphabetically
  }

```

We like to do some light 'data cleaning' inside the `cleanData` method. That would usually include making sure that numbers are not strings. We also use a reduce function, so we create a **copy of the original data** and cast only the usual quantities or values we need for creating the chart.

Note that most of the building blocks depend on the chart type. For example, on the donut chart, we won't need to create axis or draw them so that those blocks won't be there.

## Project Structure
The project is set as a monorepo with the following packages:

| Package | Description |
| --- | --- |
| **core** | Where we keep the code for the Britecharts' modules |
| **demos** | Where we keep the root storybook that aggregates the package-specific demos |
| **docs** | Where we hold the generated documentation website |
| **wrappers** | Where we have wrappers to use Britecharts' modules with web frameworks |
| **react** | Where we keep React components that use Britecharts' modules |

## Core Helpers
Within the core package, we have a set of [helpers](https://github.com/britecharts/britecharts/tree/main/packages/core/src/charts/helpers):

**axis** Exposes `getTimeSeriesAxis`, the method that allows conditional formatting depending on the time series values.

**color** The color helper contains the objects with the color schemas, the color gradients, and their human-friendly names.

**constants** The constants file holds reusable constants that we use through-ought the project.

**date** Date related methods like addDays, diffDays, getLocaleDateFormatter and similar.

**export** This helper provides methods that enable the chart export feature of Britecharts.

**filter** Includes methods for creating SVG effects based on SVG filters. Provides blur and glows.

**grid** Exposes helpers to create horizontal, vertical or full grids. Used in many charts.

**load** The load helper provides SVG components that render the different loading states Britecharts support. These are bar, donut and line loading states.

**locale** Keeps code helpers like `setDefaultLocale` and `isValidLocaleDefinion` for helping with localization features.

**number** The number file supports developers by supplying methods that relate to numbers and number formatting. Includes a unique id generator, an integer checker and a method to calculate percentages.

**style** Methods for serializing styles used in the export feature.

**text** Functions to help with text related operations like wrapping text on a given width, adding ellipsis when not enough space is available or measuring text length.


[reusableAPI]: ./reusable-api.md