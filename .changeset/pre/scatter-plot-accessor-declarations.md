---
'@britecharts/core': major
---

The scatter plot's declarations match what it actually does. Twenty-one setter-only accessors, four of whose getters are wider than their setter.

**Twenty-one of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `circleStrokeOpacity`, `circleStrokeWidth`, `circleOpacity`, `enableZoom`, `grid`, `hasCrossHairs`, `hasHollowCircles`, `hasTrendline`, `highlightTextLegendOffset`, `maxCircleArea`, `valueLocale`, `xAxisFormat`, `xAxisFormatType`, `xAxisLabel`, `xAxisLabelOffset`, `xTicks`, `yAxisFormat`, `yAxisLabel`, `yAxisLabelOffset` and `yTicks` are each a getter/setter overload pair now.

**`yTicks` is `null` by default**, which is this chart's own idiom rather than an oversight: it hands the value straight to d3's `axis.ticks`, where `null` means "use the scale's own tick count". So reading it back before setting one gives `null`, not a number — the same shape brush's `xTicks` already has, and its setter takes a number only, following that precedent. `xTicks` defaults to `6` and is an ordinary number.

**The other three wide getters** are the familiar ones: `grid` and `valueLocale` are `null` in the module's own `let` block, and `xAxisLabel` and `yAxisLabel` have no initialiser, so they read `undefined`.

**Two JSDoc errors fixed in passing**, neither of which changes a type: `grid`'s parameter was named `opacity`, which this accessor has never had anything to do with, and `yTicks` was documented as "Gets or Sets the xTicks of the chart".

**Breaking**, type-only: code relying on one of those twenty-one getters' wrong return type no longer compiles, none of the setters accepts an explicit `undefined` any more, and the four wide getters have to be guarded before use.

Found while preparing the scatter plot's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all twenty-one and chains the setters; `expect-errors.ts` holds the control for the four wide getters.
