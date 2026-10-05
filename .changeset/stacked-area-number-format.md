---
'@britecharts/core': minor
---

`stackedArea` honours `numberFormat`, which it has always declared.

The accessor came in from `ChartBaseAPI` with nothing behind it, so setting it did nothing at all. `getFormattedValue` is the line chart's equivalent function with one branch missing — line lets an explicit `numberFormat` override its integer/decimal choice, and stacked-area did not.

It reaches both axes, as line's does: the y axis always, and the x axis when `xAxisValueType` is `'number'`.

This closes the last disagreement between a chart's runtime surface and its typings, so `check:api-parity` now passes in both directions for all fourteen charts.
