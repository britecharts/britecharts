---
sidebar_position: 2
title: Britecharts vs Recharts
description: How Britecharts and Recharts differ in accessibility, frameworks, export and API, and how to move a Recharts bar chart to Britecharts.
---

# Britecharts vs Recharts

Recharts is the most used React chart library, and shadcn/ui's charts are built on it. Britecharts has React components too, over a core that also runs without React. Both draw svg, and both let keyboards move through the data by default.

As of October 2026, from each library's documentation.

## At a glance

| | Britecharts | Recharts |
| --- | --- | --- |
| Frameworks | React, and plain JavaScript in any page | React |
| API | one component per chart, configured with props | charts composed from JSX parts: axes, grid, bars, tooltip |
| Screen readers | a name and the data as a table, by default | ARIA labels and roles, by default since 3.0; no data table |
| Keyboard through the data | on by default, 8 charts | arrow keys, on by default since 3.0 |
| Export | PNG and svg, with the `exportChart` prop | none built in |
| Chart types | bar, grouped bar, stacked bar, line, stacked area, donut and pie, heatmap, scatter plot, bullet, sparkline, brush | area, bar, line, composed, scatter, pie, radar, radial bar, funnel, treemap, sankey, sunburst |
| shadcn | a [registry](../how-tos/user-how-to-guides.md#how-to-add-a-chart-to-a-shadcn-app) of chart components | shadcn/ui's chart component |
| License | Apache 2.0 | MIT |

## Choose Recharts when

-   **You want to compose a chart from parts**, such as a bar and a line on the same axes, or reference lines and areas.
-   **You need a funnel, treemap, sankey or radar chart.**
-   **You already use shadcn/ui's chart component**, and want the examples and answers its users share.

## Choose Britecharts when

-   **Screen readers must read the data.** Recharts adds labels and keyboard access. Britecharts also renders each chart's data as a table that screen readers read row by row. See [accessible JavaScript charts](../accessibility.mdx).
-   **Your charts live outside React too.** The same charts work in a server-rendered page, a Web Component or a script tag, with one API across both.
-   **You want export.** `exportChart="uses.svg"` downloads the chart, with its styles inlined.
-   **You want finished charts with fewer decisions.** Each chart includes tooltips, loading states and animation, and every chart uses the same prop names.

## Move a bar chart

A Recharts bar chart composes its parts:

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

<BarChart width={600} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" />
</BarChart>;
```

A Britecharts bar chart reads `name` and `value` from each row, and draws its axes itself. The tooltip wraps the chart:

```jsx
import { Bar, Tooltip } from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

<Tooltip
    data={data}
    title="Uses"
    render={(props) => (
        <Bar {...props} width={600} height={300} a11yTitle="Uses of each word" />
    )}
/>;
```

To fill the container's width, wrap it in `ResponsiveContainer`, as the [React example](https://github.com/britecharts/britecharts/tree/main/examples/react) does. You can also [open the example in your browser](https://britecharts.github.io/britecharts/try).

Sources: [Recharts README](https://github.com/recharts/recharts), [Recharts 3.0 migration guide](https://github.com/recharts/recharts/wiki/3.0-migration-guide), [Recharts and accessibility](https://github.com/recharts/recharts/wiki/Recharts-and-accessibility), [shadcn/ui chart](https://ui.shadcn.com/docs/components/chart).
