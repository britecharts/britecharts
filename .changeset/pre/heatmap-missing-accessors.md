---
'@britecharts/core': major
---

The heatmap chart's typings now describe all eleven of its accessors, not eight.

Comparing the implementation against its declaration, three accessors it has always shipped were never declared:

- **`on`** — the event bridge. This is how a consumer attaches a tooltip to a chart, which is the pattern this library's own examples show, so `heatmap().on('customMouseOver', tooltip.show)` was a compile error for every TypeScript consumer.
- **`isAnimated`**
- **`animationDuration`**

All three are marked `@public` in the chart's own JSDoc. `HeatmapChartAPI` now extends `InteractiveChartAPI` and `AnimatedChartAPI` alongside the interfaces it already had.

Its two own accessors, `boxSize` and `yAxisLabels`, also gained their getter overloads, the same correction described in the accessor-getter changeset. `yAxisLabels()` reports `string[] | undefined`, which is honest: the chart declares it with no default and falls back to `['Mo', 'Tu', ...]` at draw time, so reading it before setting it really does give `undefined`.

Found by converting the chart to TypeScript — the implementation cannot be typed against a declaration that is missing members it assigns. `packages/integration`'s TypeScript consumer now reads each of these and wires a mini tooltip through `on`, which fails with 10 type errors against the old declaration under both resolution tiers.

Heatmap has no wrapper or React component, so there is no cross-package parity to restore here. The other charts' own accessors are checked the same way as each converts.
