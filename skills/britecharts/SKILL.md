---
name: britecharts
description: Write correct code with Britecharts v3, the D3-based charting library — @britecharts/core (vanilla JS), @britecharts/wrappers (framework glue) and @britecharts/react. Use this skill whenever the user wants to add, configure, fix or upgrade a Britecharts chart (bar, line, donut, stacked area, stacked bar, grouped bar, scatter plot, heatmap, sparkline, bullet, brush, legend or tooltip), when a project's package.json lists britecharts or @britecharts/*, when code calls things like bar().width(...) or imports from '@britecharts/react', or when migrating from britecharts v2 or britecharts-react. Also use it when the user asks for a chart in a project that already uses Britecharts, even if they don't name the library.
---

# Britecharts

Britecharts is a set of finished, reusable D3 charts. Each chart is a function you configure through chained getter/setter accessors and then call on a d3 selection that holds the data. Version 3 ships three packages:

| Package | Use it for |
|---|---|
| `@britecharts/core` | The charts themselves, in plain JavaScript or TypeScript. |
| `@britecharts/wrappers` | One `create` / `update` / `destroy` object per chart, for wiring charts into any framework. |
| `@britecharts/react` | The charts as React function components. |

Most mistakes come from three places: writing v2-era code (different package names, removed accessors, an old line data shape), guessing a chart's data field names, and attaching tooltips to the wrong element. The rules below cover those. Look up anything else in the references rather than guessing; the API is small and exact.

## Before writing code

1. **Find out what the project uses.** Check `package.json`. `britecharts` (no scope) or `britecharts-react` is version 2: if the user wants to stay there, say this skill covers v3, and if they want to move, read `references/migrating-from-v2.md`. `@britecharts/react` means React components; `@britecharts/core` alone means the vanilla API.
2. **Pick the chart from the data**, not the other way round: the data's shape decides it. See the table below.
3. **Shape the data exactly as the chart expects.** Field names are fixed: v3 removed the accessors that renamed them (`nameLabel`, `valueLabel`, `dateLabel` and the like on the charts). Map the user's data into the expected keys first.
4. **Open the chart's section in `references/charts.md`** for its accessors and events before using any accessor you are not sure of. An accessor that does not exist throws in the wrappers and React (`Method not supported by Britechart: …`) and silently fails in core.

## Install

```bash
npm install @britecharts/core d3-selection        # vanilla
npm install @britecharts/react                    # React (brings core and wrappers)
```

Every setup also needs the stylesheet, or charts render unstyled (black areas, no axes styling):

```js
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
```

Without a bundler, load the CDN bundle, which exposes a global `core`, plus d3-selection for `d3.select`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/styles/bundle/britecharts.min.css">
<script src="https://cdn.jsdelivr.net/npm/d3-selection@3/dist/d3-selection.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/cdn/bundle/core.cdn.min.js"></script>
<script>
  const barChart = core.bar().width(600).height(300);
  d3.select('.bar-container').datum(data).call(barChart);
</script>
```

## The pattern every chart follows (vanilla)

```js
import { select } from 'd3-selection';
import { bar } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const container = select('.bar-container');
const barChart = bar()
    .width(container.node().getBoundingClientRect().width) // charts don't size themselves
    .height(300)
    .isHorizontal(true)
    .margin({ left: 100 })
    .a11yTitle('Visits by source'); // what screen readers announce

container.datum(data).call(barChart);
```

- Create one chart instance per container and keep it. To redraw with new data or settings, change accessors on the same instance and call it again: `container.datum(newData).call(barChart)`.
- Setters return the chart, so they chain; getters (no argument) return the value, and an accessor you never set reads `null`.
- Charts take their width from you. For a responsive chart, measure the container and redraw on resize (React's `ResponsiveContainer` does this for you).
- `isLoading(true)` draws a skeleton in the chart's shape; set it back to `false` and call again when data arrives.
- `isAnimated(true)` animates the draw; it is skipped automatically when the reader's system asks for reduced motion.
- `colorSchema(colors.colorSchemas.okabeIto)` gives a colour-blind-safe palette (`import { colors } from '@britecharts/core'`). `colorMap({ category: '#hex' })` pins colours per category.
- `exportChart('name.svg')` downloads an SVG, any other filename a PNG; an optional second argument adds a title.
- Every chart but the legend renders its data as a visually hidden table after its svg, linked with `aria-details`, so screen readers can read the numbers. It is on by default; `a11yDataTable(false)` (a prop or config key of the same name) turns it off. Don't add your own hidden table unless you turn this one off.
- The bar, donut, grouped bar, heatmap, line, scatter plot, stacked area and stacked bar charts are keyboard navigable by default: one tab stop, arrow keys move between points, and the tooltip and `customMouse*` events follow focus. `a11yKeyboardNavigation(false)` turns it off. Don't add `tabindex` or key handlers to the svg yourself.
- Dark mode and theming are CSS, not accessors: the charts follow the page's `color-scheme` (`:root { color-scheme: light dark }`), and every non-data colour is a `--bc-*` custom property, such as `.britechart { --bc-text-muted: #555 }`. Don't hard-code axis or text colours in JavaScript.
- Number formats are d3-format strings (`numberFormat('.1%')`); locales are objects passed to `valueLocale` (bar, grouped bar, stacked bar, scatter plot) or BCP 47 tags to `locale` (dates, time-series charts).

## Which chart for which data

| Data | Chart | Each data point |
|---|---|---|
| One value per category | `bar` | `{ name, value }` |
| Several series per category, side by side | `groupedBar` | `{ name, group, value }` |
| Several series per category, stacked | `stackedBar` | `{ name, stack, value }` |
| Parts of a whole | `donut` | `{ name, quantity, id? }` |
| One or more series over time | `line` | data is `{ data: [{ topicName, name, date, value }] }` — note the wrapping object |
| Series over time, stacked | `stackedArea` | `{ date, name, value }` |
| Two numeric variables | `scatterPlot` | `{ name, x, y }` |
| Day × hour intensity | `heatmap` | `{ day, hour, value }` (day 0–6, hour 0–23) |
| A small trend, no axes | `sparkline` | `{ date, value }` |
| A measure against ranges and a target | `bullet` | one object per chart, not an array: `{ ranges: [n, n, n], measures: [n, n?], markers: [n] }` |
| Selecting a date window | `brush` | `{ date, value }` (value may be `null` for gaps) |
| A key for another chart | `legend` | `{ id, name, quantity? }` |

Dates are ISO strings (`'2020-01-01T00:00:00Z'`). In `line`, `name` is a numeric id for the series and `topicName` its label; every point of a series repeats both.

## Tooltips (vanilla)

There is one tooltip component; `miniTooltip` is its single-value preset. Wire the chart's events to it, draw the chart, then call the tooltip on the right element inside the chart's svg:

```js
import { line, tooltip } from '@britecharts/core';

const lineChart = line();
const chartTooltip = tooltip().title('Visits');

lineChart
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);

container.datum(lineData).call(lineChart);
container.select('.metadata-group .hover-marker').datum([]).call(chartTooltip);
```

| Chart | Tooltip | Attach to | Also set |
|---|---|---|---|
| `line` | `tooltip()` | `.metadata-group .hover-marker` | — |
| `stackedArea` | `tooltip()` | `.metadata-group .vertical-marker-container` | `.topicLabel('values')` |
| `stackedBar` | `tooltip()` | `.metadata-group` | `.topicLabel('values').nameLabel('stack')` |
| `groupedBar` | `tooltip()` | `.metadata-group` | `.topicLabel('values').nameLabel('group')` |
| `bar`, `donut`, `heatmap` | `miniTooltip()` | `.metadata-group` | — |
| `scatterPlot` | `miniTooltip()` | `.metadata-group` | `.valueLabel('y')`, optionally `.nameLabel('x')` |

Without those settings the tooltip shows no rows, rows without colours, or no value. Pass the handlers straight through: the charts dispatch `(dataPoint, [x, y], [width, height], colorMap)`, which `show` and `update` take as they come. To customise the title per point, set it before passing the point on: `(d, ...rest) => chartTooltip.title(d.name).update(d, ...rest)`.

## React

```jsx
import { Line, Tooltip, ResponsiveContainer } from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

<ResponsiveContainer
    render={({ width }) => (
        <Tooltip
            data={lineData}
            title="Visits"
            render={(props) => <Line {...props} width={width} height={300} />}
        />
    )}
/>
```

Props mirror the chart's accessors. `data` is required: pass `null` while loading. A chart redraws only when a prop changes, so give it a new array or object, never a mutated one. Read `references/react.md` for the component list, each chart's `Tooltip` props, events and export.

## Other frameworks (Vue, Svelte, Angular…)

Use `@britecharts/wrappers`: `BarWrapper.create(element, data, config)` returns the chart; `update(element, data, config, chart)` redraws; `destroy(element)` removes it on unmount. Read `references/wrappers.md`. The wrappers also throw on a value of the wrong type (`height: expected a number, got the string "300"`). To describe a chart as data, write a spec, `{ "$schema": "https://britecharts.github.io/britecharts/schema/v3/bar.json", "chart": "bar", "config": {…}, "data": […] }`, and check it against that chart's JSON Schema before drawing it with `BarWrapper.create(el, spec.data, spec.config)`.

## Check your work

- Every field name in the data matches the chart's row in the table above.
- The stylesheet is imported once.
- Each accessor used appears in the chart's list in `references/charts.md`; nothing from v2 (`aspectRatio`, `nameLabel` on a chart, `loadingMarkup`, `dataByTopic`, `step`).
- Tooltips are attached after the chart's first draw, to the element in the tooltip table.
- In React, data updates replace the array or object.

The full documentation, as one text file, is at https://britecharts.github.io/britecharts/llms-full.txt, and each chart's API page is at `https://britecharts.github.io/britecharts/docs/API/<chart>` (for example `grouped-bar`, `scatter-plot`).
