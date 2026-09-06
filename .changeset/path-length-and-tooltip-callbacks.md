---
'@britecharts/core': patch
'@britecharts/react': patch
---

Fix two bugs that broke tooltips and line markers.

`SVGGeometryElement.pathLength` reflects the *attribute* of that name — it is an
`SVGAnimatedNumber`, never the computed length — so arithmetic on it yields `NaN`
and comparisons are always false. Three places read it as if it were a number:

- The line chart's `getPathYFromX` used it to seed a binary search, so every
  `getPointAtLength()` call failed and the y coordinate fell back to 0. Every
  highlight circle rendered at the top of the vertical marker rather than on its
  line.
- The line chart's `findLongestPath` returned 0, making the draw-in animation a
  silent no-op.
- The scatter plot's trend-line animation had the same no-op.

All three now use `getTotalLength()`.

Separately, `@britecharts/react`'s `Tooltip` re-rendered the chart it wraps with
`data` alone on every update, dropping the `createTooltip`, `customMouseMove`,
`customMouseOut` and `customMouseOver` callbacks the constructor passes. The
first mouse interaction triggers an update, so the chart immediately lost the
handlers that drive the tooltip and the tooltip element disappeared from the
DOM. Both call sites now build the child chart through one method.
