---
sidebar_position: 3
title: Britecharts vs Highcharts
description: How Britecharts and Highcharts differ in license, accessibility, chart types and export, and how to move a Highcharts column chart to Britecharts.
---

# Britecharts vs Highcharts

Highcharts and Britecharts both give you finished, accessible charts that draw svg, in plain JavaScript and in React. Highcharts is commercial and covers more chart types. Britecharts is free, open source and smaller in scope.

As of October 2026, from each library's documentation.

## At a glance

| | Britecharts | Highcharts |
| --- | --- | --- |
| License | Apache 2.0, free | commercial; Highcharts Core from 366 USD per developer seat |
| Screen readers | a name and the data as a table, by default | descriptions and ARIA, with the accessibility module |
| Data as a table | on by default, hidden | with the export-data module |
| Keyboard through the data | on by default, 8 charts | with the accessibility module |
| Sonification | no | yes |
| Export | PNG and svg | PNG, JPEG, PDF and svg; data as CSV, XLS or an HTML table |
| Chart types | bar, grouped bar, stacked bar, line, stacked area, donut and pie, heatmap, treemap, scatter plot, bullet, sparkline, brush | many series types, plus Stock, Maps, Gantt and Dashboards as separate products |
| Frameworks | plain JavaScript, React | plain JavaScript; official React, Angular, Vue, Svelte and others |
| Dark mode | follows the page's `color-scheme`, with `--bc-*` custom properties | themes and CSS styling |

## Choose Highcharts when

-   **You need its range**: stock charts, maps, Gantt charts, or chart types Britecharts doesn't have.
-   **You need the deepest accessibility.** Highcharts adds sonification, voice input and tactile export.
-   **You want commercial support**, and the license fits your budget.

## Choose Britecharts when

-   **You can't buy seats, or don't want to.** Britecharts is free for any use under Apache 2.0, including commercial products.
-   **You want accessibility without setup.** The data table and keyboard navigation are on in every chart, with no module to load. See [accessible JavaScript charts](../accessibility.mdx).
-   **Your charts fit its set**: bars, lines, areas, donuts, heatmaps and scatter plots cover most dashboards.
-   **You want to own the code.** Britecharts is open source, so you can read, patch or fork any chart.

## Move a column chart

A Highcharts column chart takes categories and series:

```js
Highcharts.chart('uses', {
    chart: { type: 'column' },
    title: { text: 'Uses of each word' },
    xAxis: { categories: ['Shiny', 'Blazing', 'Radiant'] },
    series: [{ name: 'Uses', data: [12, 31, 24] }],
});
```

A Britecharts bar chart takes one object per bar. Put the title in your page's markup. Give screen readers the same words:

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

Several series, like Highcharts' multi-series column chart, map to the [grouped bar chart](../API/grouped-bar.md).

To try Britecharts with nothing to install, [open an example in your browser](https://britecharts.github.io/britecharts/try).

Sources: [Highcharts accessibility module](https://www.highcharts.com/docs/accessibility/accessibility-module), [Highcharts export module](https://www.highcharts.com/docs/export-module/export-module-overview), [Highcharts shop](https://shop.highcharts.com/), [Highcharts integrations](https://www.highcharts.com/integrations/).
