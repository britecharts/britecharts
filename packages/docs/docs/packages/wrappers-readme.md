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
Doing nothing at the moment. Thinking about removing it as the users already have the instance and can remove it themselves.

## Availability
The following components haven't been adapted yet from Britecharts:
- Brush charts
- Heatmaps
- Mini Tooltips
- Scatter Plots

Feel free to [send a PR][contributing] if you want them included.

## Installation

To install run:

```
yarn add @britecharts/core @britecharts/wrappers
```
Or, with npm:

```
npm i --save @britecharts/core @britecharts/wrappers
```

### Roadmap
Our idea for the short term is to update this package to use TypeScript natively. [Let us know][d3Slack] if you want to help with it.

[britecharts]: /
[britecharts-api]: /docs/API/bar
[contributing]: https://github.com/britecharts/britecharts/blob/master/.github/CONTRIBUTING.md
[d3Slack]: https://d3js.slack.com/