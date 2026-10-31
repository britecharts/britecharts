---
sidebar_position: 1
title: Britecharts vs Chart.js
description: How Britecharts and Chart.js differ in rendering, accessibility, styling and export, and how to move a Chart.js bar chart to Britecharts.
---

# Britecharts vs Chart.js

Chart.js and Britecharts both draw finished charts from plain JavaScript, with no framework needed. The main difference is what they draw on: Chart.js draws pixels on a canvas, and Britecharts draws an svg. That decides what screen readers get, how you style a chart, and how many points it can draw quickly.

As of October 2026, from each library's documentation.

## At a glance

| | Britecharts | Chart.js |
| --- | --- | --- |
| Draws on | svg | canvas |
| Screen readers | a name and the data as a table, by default | the canvas is not accessible; you add `aria-label`, `role` or fallback content |
| Keyboard through the data | on by default, 8 charts | no |
| Styling | CSS, with `--bc-*` custom properties | the chart's options; canvas ignores CSS |
| Dark mode | follows the page's `color-scheme` | set colours in the options |
| Export | PNG and svg, `exportChart('chart.svg')` | PNG or JPEG data URL, `toBase64Image()` |
| Chart types | bar, grouped bar, stacked bar, line, stacked area, donut and pie, heatmap, scatter plot, bullet, sparkline, brush | bar, line and area, pie and doughnut, scatter, bubble, radar, polar area, mixed, plus community chart types |
| Frameworks | plain JavaScript, React | plain JavaScript; React, Vue, Svelte and Angular through community wrappers |
| License | Apache 2.0 | MIT |

## Choose Chart.js when

-   **You draw thousands of points.** A canvas draws large datasets faster than an svg with one element per point.
-   **You need radar, polar area or bubble charts.** Britecharts has none of these.
-   **You want its ecosystem.** Chart.js is one of the most used chart libraries, with many plugins and answers to most questions online.

## Choose Britecharts when

-   **Your charts must be accessible.** A canvas is one image to a screen reader, and Chart.js leaves its text alternative to you. Britecharts names every chart and renders its data as a table that screen readers can read. It also lets keyboards move through the data. See [accessible JavaScript charts](../accessibility.mdx).
-   **You style with CSS.** Every colour around the data is a CSS custom property, and the charts switch to dark mode with your page.
-   **You need vector output.** `exportChart` saves an svg with its styles inlined. The svg stays sharp in a document or a design tool.
-   **You use React.** Britecharts ships its own React components, and a [shadcn registry](../how-tos/user-how-to-guides.md#how-to-add-a-chart-to-a-shadcn-app).

## Move a bar chart

A Chart.js bar chart takes labels and datasets:

```js
new Chart(document.getElementById('uses'), {
    type: 'bar',
    data: {
        labels: ['Shiny', 'Blazing', 'Radiant'],
        datasets: [{ label: 'Uses', data: [12, 31, 24] }],
    },
});
```

A Britecharts bar chart takes one object per bar and draws into any element:

```js
import { bar, tooltip } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const data = [
    { name: 'Shiny', value: 12 },
    { name: 'Blazing', value: 31 },
    { name: 'Radiant', value: 24 },
];
bar()
    .width(600)
    .height(300)
    .a11yTitle('Uses of each word')
    .tooltip(tooltip())
    .render('#uses', data);
```

Chart.js shows a tooltip by default. In Britecharts, the chart's `tooltip` setting adds one, as above: see [how to add a tooltip](../how-tos/user-how-to-guides.md#how-to-add-a-tooltip-to-a-chart). To try both on a page with no build step, use the [CDN bundle](../tutorials/getting-started.md), or [open an example in your browser](https://britecharts.github.io/britecharts/try).

Sources: [Chart.js accessibility](https://www.chartjs.org/docs/latest/general/accessibility.html), [Chart.js introduction](https://www.chartjs.org/docs/latest/), [Chart.js API](https://www.chartjs.org/docs/latest/developers/api.html), [Chart.js integration](https://www.chartjs.org/docs/latest/getting-started/integration.html).
