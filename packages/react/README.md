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
- Tooltips [(API)][tooltipAPI]
- Step charts [(API)][stepChartAPI]
- Legends [(API)][legendAPI]

The following components haven't been adapted yet from Britecharts:
- Brush charts
- Heatmaps
- Mini Tooltips
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

You can also use individual bundles in UMD format (`dist/umd/`), CommonJS format (`lib/cjs`), and tree-shaking-enabling ES2015 modules (`lib/esm`) to add to your bundle. You can see more on our [test project][testProject].

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

[react]: https://facebook.github.io/react/
[integration-article]: http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
[storybook]: **
[barChartAPI]: **
[groupedBarChartAPI]: **
[donutChartAPI]: **
[lineChartAPI]: **
[sparklineChartAPI]: **
[stackedAreaChartAPI]: **
[stackedBarChartAPI]: **
[tooltipAPI]: **
[stepChartAPI]: **
[legendAPI]: **
[bulletAPI]: **
[jsDelivrLib]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/lib/
[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/dist/
[npmModule]: https://www.npmjs.com/package/britecharts-react
[contributing]: https://github.com/britecharts/britecharts/blob/master/.github/CONTRIBUTING.md
[d3Slack]: https://d3js.slack.com/
[codeOfConduct]: **
[homepage]: https://britecharts.github.io/britecharts/
[testProject]: https://github.com/Golodhros/britecharts-react-test-project
[howtoCreate]: https://github.com/britecharts/britecharts-react/blob/master/CONTRIBUTING.md#creating-a-new-chart
[britecharts-react]: https://github.com/britecharts/britecharts-react/