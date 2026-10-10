---
'@britecharts/core': major
---

The line chart's declarations match what it actually does. Thirteen setter-only accessors, and the same x-axis defect the stacked area had.

**`xAxisValueType` accepted the one value that does nothing.** It was declared `'date' | 'numeric'`, while the chart compares against `'number'` in four places. So `'numeric'` type-checked and was inert, and `'number'` — the value that actually switches the axis to plain numbers — was rejected. The accessor's own `@example` is `line.xAxisValueType('number')`. It is `LineChartXAxisValueType` now, a named export, as is `LineChartXAxisScale`. The stacked area chart had the identical defect, corrected in the same phase.

**Thirteen of its own accessors were setter-only** — a single signature returning the chart — so reading one reported the chart rather than its value: `grid`, `lineCurve`, `lineGradient`, `lines`, `shouldShowAllDataPoints`, `tooltipThreshold`, `xAxisLabel`, `xAxisScale`, `xAxisValueType`, `xTicks`, `yAxisLabel`, `yAxisLabelPadding` and `yTicks` are each a getter/setter overload pair now. `dateLabel`, `hasMinimumValueScale`, `topicLabel` and `valueLabel` already had both.

**`lineGradient` reports `ColorGradientType`**, the two-element tuple the colour helper already defines, rather than an inline `[string, string]` — the chart reads `[0]` and `[1]` and nothing else, as the sparkline's gradients do.

**Four getters are wider than their setter:** `grid`, `xAxisLabel`, `yAxisLabel` and `xTicks` are `null` by default, and `xTicks` hands that straight to d3 to mean "use the scale's own count". This chart initialises its axis labels to `null` where the grouped and stacked bars leave theirs undefined — the same split the bar chart has, and still worth a consumer's attention when writing one guard for several charts.

**Breaking**, type-only: `'numeric'` is no longer accepted where `'number'` is, code relying on one of those thirteen getters' wrong return type no longer compiles, none of the setters accepts an explicit `undefined` any more, and the four wide getters have to be guarded.

Found while preparing the line chart's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all thirteen and chains the setters, including a chain off `on` back to one of the chart's own accessors — the assertion that catches a wrong generic on an inherited surface, which neither `check:api-parity` nor any setter-only assertion can see.
