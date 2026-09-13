---
sidebar_position: 4
---

# Code and Project Structure

## Project Structure

Britecharts is a Yarn workspace with six packages under `packages/`:

| Package | Description |
| --- | --- |
| **core** | The charts, the tooltip and legend, their styles and their TypeScript typings. What `@britecharts/core` publishes. |
| **wrappers** | `create`/`update`/`destroy` wrappers around each chart, the seam for framework integrations. Published as `@britecharts/wrappers`. |
| **react** | React components built on the wrappers. Published as `@britecharts/react`. |
| **docs** | This site: Docusaurus, with the API reference generated from the charts' JSDoc and the READMEs copied in. |
| **demos** | The Storybook shell that composes the core and React Storybooks into one. |
| **integration** | Packs the three published packages and installs them into vanilla, TypeScript and React consumer projects to test what ships. Runs on every pull request. |

Inside `packages/core/src`:

| Path | Contents |
| --- | --- |
| `index.js` | The public entry: the 14 charts, `tooltip`, `miniTooltip`, `legend`, `brush`, `colors` and `constants`. This list is frozen for 3.x and held by the integration tests. |
| `charts/<chart>/` | One folder per chart: `<chart>.js`, its `<chart>.spec.js`, its `<chart>.stories.js` for Storybook, a `<chart>DataBuilder.js` and the JSON fixtures the specs and stories share. The tooltip folder also holds the modules it is built from (`frame.js`, `place.js`, `motion.js`). |
| `charts/helpers/` | Code shared by the charts, listed below. |
| `styles/` | The SCSS: `britecharts.scss` (everything), `common.scss` (what every chart needs), `charts/<chart>.scss`, and the palette and loading-state partials under `helpers/`. |
| `typings/` | Hand-written `.d.ts` files: one per chart under `charts/`, shared types under `common/`, and the `colors` and `constants` helpers. The integration package compiles a TypeScript consumer against them. |

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

Every chart dispatches the same hover events, `customMouseOver`, `customMouseMove` and `customMouseOut`, with the same payload, so the tooltip is wired the same way to all of them; the [tooltip's API page][tooltipAPI] has the table.

## Core Helpers

Within the core package, we have a set of [helpers](https://github.com/britecharts/britecharts/tree/main/packages/core/src/charts/helpers):

**axis** Exposes `getTimeSeriesAxis`, the method that allows conditional formatting depending on the time series values.

**classes** Turns a list of class names into the `class` attribute value or the matching CSS selector.

**color** The color helper contains the objects with the color schemas, the color gradients, and their human-friendly names. Exported as `colors`.

**constants** Reusable constants used throughout the project, such as the axis time combinations. Exported as `constants`.

**date** Date related methods like addDays, diffDays, getLocaleDateFormatter and similar.

**domain** `getValueDomain` builds a value domain that always contains zero, and `getBaselineExtent` says where a mark growing from that baseline starts and how long it is, so negative values render on the other side of the axis. The bar charts and the brush use them; see the [Domain helpers][domainAPI] page.

**export** This helper provides methods that enable the chart export feature of Britecharts.

**filter** Includes methods for creating SVG effects based on SVG filters. Provides blur and glows.

**grid** Exposes helpers to create horizontal, vertical or full grids, with the axis baseline and the zero-line highlight. Used in most charts; see the [Grid helpers][gridAPI] page.

**load** The load helper provides SVG components that render the loading state of each chart.

**locale** Keeps code helpers like `setDefaultLocale` and `isValidLocaleDefinion` for helping with localization features.

**number** The number file supports developers by supplying methods that relate to numbers and number formatting. Includes a unique id generator, an integer checker and a method to calculate percentages.

**project** The deprecation message the charts print when a deprecated data-key accessor is used.

**style** Methods for serializing styles used in the export feature.

**text** Functions to help with text related operations like wrapping text on a given width, adding ellipsis when not enough space is available or measuring text length.

**type** Small type checks and casts, such as `isDefined`.

[reusableAPI]: ./reusable-api.md
[tooltipAPI]: ../API/tooltip
[domainAPI]: ../API/domain
[gridAPI]: ../API/grid
