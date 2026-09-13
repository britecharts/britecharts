---
slug: britecharts-3-beta
title: Britecharts 3.0 beta
authors: [marcos]
tags: [releases]
---

Britecharts 3.0 is in beta, and it is a new set of packages: `@britecharts/core` for the charts, `@britecharts/react` for the React components, and `@britecharts/wrappers`, the layer the React components are built on and the seam for other frameworks.

```sh
npm install @britecharts/core@beta
```

<!-- truncate -->

## What is new

- **Modern modules.** Built on the current d3 modules, shipped as ES modules, CommonJS, UMD and CDN builds, with an `exports` map and TypeScript typings for every chart. Vite, Rollup, esbuild and webpack all work out of the box.
- **One tooltip.** `tooltip` and `miniTooltip` are one component that never gets cut off at the chart's edges, follows the pointer smoothly and works the same way on every chart.
- **Negative values** on the bar, stacked bar, grouped bar and brush charts, stacking down from zero.
- **Loading states** for every chart, `colorMap` to name the colour of each category, `animationDuration` on every animated chart, and charts that are responsive by default.
- **React 19** is tested: the React package is installed into a React 19 project under `StrictMode` on every change.

## Moving from version 2

Most of the work is renaming: the [migration guide](/docs/how-tos/migration-guide-2-to-3) walks through every breaking change with a before and after for each. The ones you will hit first:

1. **Imports.** The charts are named exports of `@britecharts/core` (`import { bar } from '@britecharts/core'`) instead of files under `britecharts/dist/umd`. The CommonJS, UMD and CDN paths are in the guide too.
2. **Loading states.** `loadingState()` is gone; render the chart with `isLoading(true)` and a dataset, empty or not.
3. **Renamed accessors.** `locale` is `valueLocale` on the bar, grouped bar, stacked bar and scatter plot; the value formatters of the grouped and stacked bar are `numberFormat`; the line and stacked area swap `xAxisFormat` and `xAxisCustomFormat` back to what their names say; `aspectRatio` is removed.
4. **Tooltips.** The line, stacked area, stacked bar and grouped bar charts now dispatch `customMouseMove` the same way every other chart does, as `(dataPoint, [x, y], [width, height], colorMap)`. If you drive `tooltip.update` yourself, it still accepts the old argument order and warns once.
5. **`exportChart`** returns a promise.

Version 2 ends at 2.18.4 and will not be updated.

## Where to start

- The [installation](/docs/tutorials/installing-britecharts) and [getting started](/docs/tutorials/getting-started) tutorials build a first chart from scratch, and [styling charts](/docs/tutorials/styling-charts) covers themes and CSS.
- The [API reference](/docs/API/bar) has a page per chart and one for the [tooltip](/docs/API/tooltip).
- The [Storybook](pathname:///storybook/) shows every chart, in core and in React, with its options live.

## Tell us what breaks

The beta is there to find what we missed. Open an [issue](https://github.com/britecharts/britecharts/issues) with the chart, the data and what you expected. And if you would like to help keep Britecharts going, the [contributing guide](https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md) is the place to start: we are looking for maintainers.
