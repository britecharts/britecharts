---
 sidebar_position: 4 
---
 # @britecharts/react

> `@britecharts/react` is a package that allows you use [Britecharts][britecharts] within [React][react] applications.

## Usage
Every chart in `@britecharts/react` is a function component: you pass in some props, and it renders a chart.

```jsx
import { Bar } from '@britecharts/react';

const data = [
    {
        name: 'Vibrant',
        value: 2,
    },
    {
        name: 'Opalescent',
        value: 4,
    },
    {
        name: 'Shining',
        value: 3,
    },
];

<Bar
    data={data}
    width={400}
    isHorizontal
/>
```

Check our [Storybook][storybook] for more examples and check the source to copy/paste code.

### Loading data

`data` is required. Pass `null` while it loads: nothing is drawn until it arrives, and the chart is drawn as soon as it does. Leaving `data` out, or passing `undefined`, is an error (and a type error, too).

```jsx
<Bar data={isLoading ? null : data} />
```

### Updating a chart

A chart is redrawn when its props change, and only then. On every render the data and each configuration value are compared with what was last drawn, so a re-render with the same props costs nothing. The consequence is that **the data has to be a new array or object to be redrawn**: mutating it in place and re-rendering with the same reference does nothing.

```jsx
setData([...data, newPoint]); // redraws
data.push(newPoint);
setData(data); // does not: same array, nothing changed
```

### No instance, no ref

Function components have no instance to point a `ref` at, so a `ref` on a chart is not accepted (the typings say so). A chart is drawn into a `<div>` the component owns, and removes what it drew when it unmounts.

### Tooltips

A `Tooltip` wraps the chart it decorates: give it a `render` prop that returns the chart, and pass on the props it hands you, which are what connect the two.

The charts name the fields of their data points differently, so some of them need the tooltip told where to look:

| Chart | `Tooltip` props |
| --- | --- |
| `Line` | `topicLabel="topics"` |
| `StackedArea` | none |
| `StackedBar` | `nameLabel="stack"` |
| `GroupedBar` | `nameLabel="group"` |
| `ScatterPlot` | `valueLabel="y"` |
| `Bar`, `Donut`, `Heatmap`, `Treemap` | none |

Without them, the tooltip shows no rows (line), rows without their colours (stacked and grouped bar) or no value (scatter plot).

```jsx
import { Line, Tooltip } from '@britecharts/react';

<Tooltip
    data={data}
    render={(props) => <Line {...props} />}
    topicLabel="topics"
    title="A title"
/>
```

### Responsive charts

`ResponsiveContainer` hands its `render` prop the width it has measured, and measures again when the window is resized. `withResponsiveness` does the same for a component you wrap, as its `width` prop (a `width` you pass yourself wins).

```jsx
import { Line, ResponsiveContainer, withResponsiveness } from '@britecharts/react';

<ResponsiveContainer
    render={({ width }) => <Line data={data} width={width} />}
/>

const ResponsiveLine = withResponsiveness(Line);

<ResponsiveLine data={data} />
```

## API
Each component's API is a reflection of [Britecharts][britecharts] charts and their APIs. They also have a bunch of React specific props, and there are some changes due to the declarative way of building with React. 

For example, if we need to check the options of a bar chart, you will first check the [bar chart's API][barChartAPI] in the main project API reference page.

Every Britecharts chart has a component:
- Bar charts [(API)][barChartAPI]
- Brush charts [(API)][brushAPI]
- Bullet charts [(API)][bulletAPI]
- Grouped Bar charts [(API)][groupedBarChartAPI]
- Donut charts [(API)][donutChartAPI]
- Heatmaps [(API)][heatmapAPI]
- Treemaps [(API)][treemapAPI]
- Line charts [(API)][lineChartAPI]
- Scatter Plots [(API)][scatterPlotAPI]
- Sparkline charts [(API)][sparklineChartAPI]
- Stacked Area charts [(API)][stackedAreaChartAPI]
- Stacked Bar charts [(API)][stackedBarChartAPI]
- Tooltips [(API)][tooltipAPI], wrapping the line, stacked area, stacked bar and grouped bar charts with a list of values, and the bar, scatter plot and heatmap charts with a single value (the mini tooltip)
- Legends [(API)][legendAPI]
- The `ResponsiveContainer` component and the `withResponsiveness` function, described above

These components were previously hosted in the [britecharts-react][britecharts-react] repository, but became a package with Britecharts V3.

## Installation

To install run:

```
pnpm add @britecharts/core @britecharts/wrappers @britecharts/react
```
Or, with npm:

```
npm i --save @britecharts/core @britecharts/wrappers @britecharts/react
```

Britecharts-React is available as an [NPM module][npmModule] or through CDN links (in [different formats][jsDelivrLib] or a [bundle][jsDelivrDist]).

Import the components from the package: bundlers get ES modules, and `require('@britecharts/react')` gets the UMD bundle. The [React consumer][testProject] in the integration package shows every way of loading it, and is what CI runs.

### Supported React versions

`peerDependencies` requires `react` and `react-dom` `>=16.8`: the components use hooks, which arrived in that release. What is actually verified on every commit:

- **React 19**, by the unit tests, which now run on React Testing Library, and in a real browser: CI packs the package the way a release does, installs it into a React 19 project, and loads it in production and in a development build under `StrictMode`, which runs every effect's setup, cleanup and setup again.

React 17 and 18 are expected to work and are not exercised. If you hit a version-specific problem on an older React, please open an issue.

## Acknowledgments
For this project, we have followed the approach called ‘Mapping Lifecycle methods’ based on [Nicholas Hery's article][integration-article]: a chart's `create`, `update` and `destroy` are called from the component's mount, update and unmount, which one internal hook now does for every chart. We want to recognize all the contributors in the parent project [Britecharts][britecharts].

## See Also
- [Documentation Homepage][homepage]
- [Contributing Guide][contributing]
- [Code of Conduct][codeOfConduct]

## Contribute
When Britecharts adds a chart, check out our [how-to guide for creating new charts][howtoCreate] to bring it to React. Check also the [contributing guide][contributing] if you want to help.

Note that the aim of this project is to allow the usage of Britecharts within your React applications. For that, we are ‘wrapping’ Britecharts with `@britecharts/wrappers`. This means that **any new features need to first be implemented on Britecharts**. Only then you could update the props and logic that passes in the configuration.

### TypeScript
The package is written in TypeScript, and its type declarations are generated from the components at build time. Each component's props type is exported from the package root (`BarChartProps`, `LineProps` and so on), and CI compiles a TypeScript project against the packed package.

[react]: https://react.dev/
[integration-article]: http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
[storybook]: https://britecharts.github.io/britecharts/storybook/react/
[barChartAPI]: https://britecharts.github.io/britecharts/docs/API/bar
[groupedBarChartAPI]: https://britecharts.github.io/britecharts/docs/API/grouped-bar
[donutChartAPI]: https://britecharts.github.io/britecharts/docs/API/donut
[lineChartAPI]: https://britecharts.github.io/britecharts/docs/API/line
[scatterPlotAPI]: https://britecharts.github.io/britecharts/docs/API/scatter-plot
[sparklineChartAPI]: https://britecharts.github.io/britecharts/docs/API/sparkline
[stackedAreaChartAPI]: https://britecharts.github.io/britecharts/docs/API/stacked-area
[stackedBarChartAPI]: https://britecharts.github.io/britecharts/docs/API/stacked-bar
[tooltipAPI]: https://britecharts.github.io/britecharts/docs/API/tooltip
[legendAPI]: https://britecharts.github.io/britecharts/docs/API/legend
[bulletAPI]: https://britecharts.github.io/britecharts/docs/API/bullet
[brushAPI]: https://britecharts.github.io/britecharts/docs/API/brush
[heatmapAPI]: https://britecharts.github.io/britecharts/docs/API/heatmap
[treemapAPI]: https://britecharts.github.io/britecharts/docs/API/treemap
[jsDelivrLib]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/lib/
[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/dist/
[npmModule]: https://www.npmjs.com/package/britecharts-react
[contributing]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
[codeOfConduct]: https://github.com/britecharts/britecharts/blob/main/CODE_OF_CONDUCT.md
[homepage]: https://britecharts.github.io/britecharts/
[britecharts]: https://britecharts.github.io/britecharts/
[testProject]: https://github.com/britecharts/britecharts/tree/main/packages/integration/consumers/react
[howtoCreate]: https://github.com/britecharts/britecharts-react/blob/master/CONTRIBUTING.md#creating-a-new-chart
[britecharts-react]: https://github.com/britecharts/britecharts-react/
