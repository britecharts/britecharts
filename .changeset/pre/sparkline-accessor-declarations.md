---
'@britecharts/core': major
---

The sparkline chart's own accessors now declare their getters.

**Its four chart-specific accessors were setter-only**, so `sparkline().areaGradient()` reported the chart rather than the two colours. This is the same gap bullet's seven had, and the correction is the same: `areaGradient`, `lineGradient`, `titleText` and `titleTextStyle` are each a getter/setter overload pair now, so reading reports the value and setting still chains. The chart's other three — `dateLabel`, `valueLabel` and `isLoading` — already read correctly and are untouched.

`titleText`'s getter is `string | undefined`: the chart has no default title, and `drawSparklineTitle` only runs once one is set. The two gradients stay the two-element tuple they have always been declared as, which is what the chart reads — `[0]` and `[1]` and nothing else.

**Breaking**, type-only: code relying on one of those four getters' wrong return type no longer compiles, and the setters no longer accept an explicit `undefined`.

Found while converting the chart to TypeScript. The getters are now asserted by `packages/integration`'s TypeScript consumer, which fails if the old single-signature declaration is reinstated.
