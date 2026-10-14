---
'@britecharts/core': major
---

The stacked area chart's declarations match what it actually does. Seventeen setter-only accessors and three defects, one of which named the wrong chart.

**`InteractiveChartAPI` was parameterised with `StackedBarChartModule`** — the wrong chart, not merely the wrong one of this chart's own two types. So `stackedArea().on(...)` reported the stacked *bar*'s API: a chain crossing from `on` back to anything of this chart's own, such as `.on(...).areaCurve(...)`, did not compile, and the result could not be handed to `selection.call()` as a stacked area. Same class as the three brush generics corrected earlier, one step further out.

**`emptyDataConfig` was missing `minY`.** The chart's own default carries it and `getMinValue` reads it, so a config without one compiled and then gave the value scale an undefined lower bound — a `NaN` domain, and nothing drawn.

**`xAxisValueType` accepted the one value that does nothing.** It was declared `'date' | 'numeric'`, while the chart compares against `'number'` in three places. So `'numeric'` type-checked and was inert, and `'number'` — the value that actually switches the axis to plain numbers — was rejected. The accessor's own JSDoc has said `'number'` all along. It is `StackedAreaXAxisValueType` now, a named export, as is `StackedAreaXAxisScale`.

**Seventeen of its own accessors were setter-only**, so reading one reported the chart rather than its value: `areaCurve`, `areaOpacity`, `emptyDataConfig`, `grid`, `hasOutline`, `keyLabel`, `tooltipThreshold`, `topicsOrder`, `xAxisScale`, `xAxisValueType`, `xTicks`, `yAxisBaseline`, `yAxisLabel`, `yAxisLabelOffset` and `yTicks` are each a getter/setter overload pair now. `dateLabel` and `valueLabel` already had both.

**Four getters are wider than their setter:** `grid` and `xTicks` are `null` by default — `xTicks` hands that straight to d3 to mean "use the scale's own count" — and `topicsOrder` and `yAxisLabel` have no initialiser, so they read `undefined`.

**Breaking**, type-only: `on`'s result changes type, an empty-data config now needs `minY`, `'numeric'` is no longer accepted where `'number'` is, code relying on one of those seventeen getters' wrong return type no longer compiles, and the four wide getters have to be guarded.

Found while preparing the chart's TypeScript conversion, which lands separately. Each defect has its own control in `packages/integration`, and reverting any one of them fails only its own.
