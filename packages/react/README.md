# @britecharts/react

> `@britecharts/react` is a package that allows you use [Britecharts][britecharts] within [React][react] applications.

## Usage
`@britecharts/react` components are used just like any other stateless React component. You pass in some props, and it renders a chart:

```js
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
>
```

Check our [Storybook][storybook] for more examples and check the source to copy/paste code.

## API
Each component's API is a reflection of [Britecharts][britecharts] charts and their APIs. They also have a bunch of React specific props, and there are some changes due to the declarative way of building with React. 

For example, if we need to check the options of a bar chart, you will first check the [bar chart's API][barChartAPI] in the main project API reference page.

The complete set of components is in progress; the following components are currently implemented and available for use:
- Bar charts [(API)][barChartAPI]
- Bullet charts [(API)][bulletAPI]
- Grouped Bar charts [(API)][groupedBarChartAPI]
- Donut charts [(API)][donutChartAPI]
- Line charts [(API)][lineChartAPI]
- Sparkline charts [(API)][sparklineChartAPI]
- Stacked Area charts [(API)][stackedAreaChartAPI]
- Stacked Bar charts [(API)][stackedBarChartAPI]
- Tooltips [(API)][tooltipAPI], wrapping the line, stacked area, stacked bar and grouped bar charts with a list of values, and the bar, scatter plot and heatmap charts with a single value (the mini tooltip)
- Legends [(API)][legendAPI]

The following components haven't been adapted yet from Britecharts:
- Brush charts
- Heatmaps
- Scatter Plots

These components were previously hosted in the [britecharts-react][britecharts-react] repository, but became a package with Britecharts V3.

## Installation

To install run:

```
yarn add @britecharts/core @britecharts/wrappers @britecharts/react
```
Or, with npm:

```
npm i --save @britecharts/core @britecharts/wrappers @britecharts/react
```

Britecharts-React is available as an [NPM module][npmModule] or through CDN links (in [different formats][jsDelivrLib] or a [bundle][jsDelivrDist]).

Each component is also published on its own, in UMD format (`dist/umd/charts/<Component>.js`) and CommonJS format (`dist/cjs/charts/<Component>.js`); in both the module *is* the component, so `require('@britecharts/react/dist/cjs/charts/Donut.js')` returns `Donut`. The [React consumer][testProject] in the integration package shows every way of loading it, and is what CI runs.

### Supported React versions

`peerDependencies` allows `react` and `react-dom` `>=15`, and the components
themselves use no API newer than that. Be aware, though, that the test suite
still runs on Enzyme, whose last adapter targets React 16 — so **React 16 is the
only version covered by our tests**. React 17, 18 and 19 are expected to work
and are not known to break, but that is not something we verify on every commit.
If you hit a version-specific problem, please open an issue; it helps us
prioritise moving the specs to React Testing Library.

## Acknowledgments
For this project, we have followed the approach called ‘Mapping Lifecycle methods’ based on [Nicholas Hery's article][integration-article]. We want to recognize all the contributors in the parent project [Britecharts][britecharts].

## See Also
- [Documentation Homepage][homepage]
- [Contributing Guide][contributing]
- [Code of Conduct][codeOfConduct]

## Contribute
If you need to use one of the missing charts, check out our [how-to guide for creating new charts][howtoCreate]. Check also the [contributing guide][contributing] if you want to help us bringing these in. 

Note that the aim of this project is to allow the usage of Britecharts within your React applications. For that, we are ‘wrapping’ Britecharts with `@britecharts/wrappers`. This means that **any new features need to first be implemented on Britecharts**. Only then you could update the props and logic that passes in the configuration.

### Roadmap
Our idea for the short term is to update this package to use TypeScript natively. For that, we already have an initial version that we need to polish and reproduce. [Let us know][d3Slack] if you want to help with it.

[react]: https://react.dev/
[integration-article]: http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
[storybook]: https://britecharts.github.io/britecharts/storybook/react/
[barChartAPI]: https://britecharts.github.io/britecharts/docs/API/bar
[groupedBarChartAPI]: https://britecharts.github.io/britecharts/docs/API/grouped-bar
[donutChartAPI]: https://britecharts.github.io/britecharts/docs/API/donut
[lineChartAPI]: https://britecharts.github.io/britecharts/docs/API/line
[sparklineChartAPI]: https://britecharts.github.io/britecharts/docs/API/sparkline
[stackedAreaChartAPI]: https://britecharts.github.io/britecharts/docs/API/stacked-area
[stackedBarChartAPI]: https://britecharts.github.io/britecharts/docs/API/stacked-bar
[tooltipAPI]: https://britecharts.github.io/britecharts/docs/API/tooltip
[legendAPI]: https://britecharts.github.io/britecharts/docs/API/legend
[bulletAPI]: https://britecharts.github.io/britecharts/docs/API/bullet
[jsDelivrLib]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/lib/
[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/dist/
[npmModule]: https://www.npmjs.com/package/britecharts-react
[contributing]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
[d3Slack]: https://d3js.slack.com/
[codeOfConduct]: https://github.com/britecharts/britecharts/blob/main/CODE_OF_CONDUCT.md
[homepage]: https://britecharts.github.io/britecharts/
[testProject]: https://github.com/britecharts/britecharts/tree/main/packages/integration/consumers/react
[howtoCreate]: https://github.com/britecharts/britecharts-react/blob/master/CONTRIBUTING.md#creating-a-new-chart
[britecharts-react]: https://github.com/britecharts/britecharts-react/