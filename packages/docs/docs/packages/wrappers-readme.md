---
 sidebar_position: 3 
---
 # @britecharts/wrappers

> `@britecharts/wrappers` is a package that simplifies the use of [Britecharts'][britecharts] components with frontend frameworks. 

## Usage
`@britecharts/wrappers` components expose a simple API to allow its use in frontend frameworks. This API contains three methods: `create`, `update`, and `destroy`. 

To use them, you will pass a configuration object following the Britecharts core component API and a container:

```js
import { BarWrapper } from '@britecharts/wrappers';

const container = document.querySelector('.container');
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
const configuration = {
    width: 400,
    margin: {left: 10},
};

const barInstance = BarWrapper.create(container, data, configuration);

//...

BarWrapper.update(container, newData, {}, barInstance);

```

The wrappers include a lightweight configuration and container validation. 

A configuration value of `undefined` or `null` means "not set" and the chart keeps its own default. Any other value is applied, including the falsy ones: `false`, `0` and `''` reach the chart, so a setting can be turned back off with `{ isLoading: false }`.

In theory, you shouldn't be using this wrappers by themselves, but you might prefer this API (more OO-like) for your vanilla JavaScript projects.

## API
The API of the wrappers has only three methods: `create`, `update` and `destroy`. Note that each component wrapper's configuration options is a reflection of [Britecharts][britecharts-api] charts' APIs.

### Create
Creates a new Britechart chart and returns its instance.

Signature:
`<Wrapper>.create(HTMLElement, <ChartDataShape>, <ConfigurationObject>) => BritechartChart`

Example:
```js
const barInstance = BarWrapper.create(container, data, configuration);
```

### Update
Updates a chart with new data or configuration.

Signature:
`<Wrapper>.update(HTMLElement, <ChartDataShape>, <ConfigurationObject>, BritechartChart) => BritechartChart`

Example:
```js
BarWrapper.update(container, newData, {}, barInstance);
```

### Destroy
Removes the chart's `svg` from the container, so the container can be used again (a `create` after a `destroy` draws exactly one chart). It only removes that `svg`: never the container itself, which a framework may own, nor anything else inside it.

Signature:
`<Wrapper>.destroy(HTMLElement) => void`

Example:
```js
BarWrapper.destroy(container);
```

`TooltipWrapper.destroy` has its own contract: it removes the tooltip from inside the element and never an `svg`, because a tooltip is created inside the chart it decorates and destroyed against the element around it.

### Validation
`create` and `update` check the configuration before drawing, and throw an error that says what to fix: a key the chart has no accessor for, with the nearest one it does have, and a value of the wrong type, with the type it should be.

```
Value not supported by Britechart: height chartGradient
  height: expected a number, got the string "300"
  chartGradient: expected an array of 2 strings, got an array of 1
Supported accessors: https://britecharts.github.io/britecharts/docs/API/bar
```

An `undefined` or `null` value is skipped, and the chart keeps its default.

### Chart specs and their JSON Schemas
A chart can be written down as a spec: its name, its configuration and its data. Each chart has a JSON Schema for its spec, generated from the TypeScript types the wrappers take, so editors and coding agents can check a spec, and complete it, without running it:

```json
{
    "$schema": "https://britecharts.github.io/britecharts/schema/v3/bar.json",
    "chart": "bar",
    "config": { "isHorizontal": true, "a11yTitle": "Signups by plan" },
    "data": [{ "name": "Pro", "value": 412 }]
}
```

The schemas are published at `https://britecharts.github.io/britecharts/schema/v3/<chart>.json` and ship in this package as `@britecharts/wrappers/schemas/<chart>.json`, one per chart, named as core names it (`bar`, `groupedBar`, `scatterPlot`…). Draw a spec with its wrapper: `BarWrapper.create(element, spec.data, spec.config)`. Options that take a function, such as the events and the formatting functions, can't be written in JSON; set them from JavaScript.

## Availability
Every chart in `@britecharts/core` has a wrapper: `BarWrapper`, `BrushWrapper`, `BulletWrapper`, `DonutWrapper`, `GroupedBarWrapper`, `HeatmapWrapper`, `LegendWrapper`, `LineWrapper`, `ScatterPlotWrapper`, `SparklineWrapper`, `StackedAreaWrapper`, `StackedBarWrapper` and `TreemapWrapper`, plus `TooltipWrapper` for the tooltip.

## Installation

To install run:

```
pnpm add @britecharts/core @britecharts/wrappers
```
Or, with npm:

```
npm i --save @britecharts/core @britecharts/wrappers
```

### Roadmap
Our idea for the short term is to update this package to use TypeScript natively. [Let us know][d3Slack] if you want to help with it.

[britecharts]: https://github.com/britecharts/
[britecharts-api]: https://britecharts.github.io/britecharts/docs/Britecharts
[d3Slack]: https://d3js.slack.com/