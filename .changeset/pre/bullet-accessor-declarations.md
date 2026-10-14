---
'@britecharts/core': major
---

The bullet chart's accessors now declare their getters, and two of them declare the right type.

**`customTitle` and `customSubtitle` were declared `number`.** They are strings: the chart assigns them to `title` and `subtitle` and renders them as text, and its own documented examples are `bulletChart.customTitle('CPU Usage')` and `bulletChart.customSubtitle('GHz')`. Passing the string the examples show did not compile; passing the number the declaration asked for would have rendered a number. Both now read `string`, and `string | undefined` on the way out, since neither has a default.

**Its seven chart-specific accessors were setter-only**, so `bullet().ticks()` reported the chart rather than the number. The previous release corrected this for the shared interfaces in `common/base.d.ts`; it never reached the per-chart declarations. `colorSchema`, `customSubtitle`, `customTitle`, `isReverse`, `paddingBetweenAxisAndChart`, `startMaxRangeOpacity` and `ticks` are each a getter/setter overload pair now, so reading reports the value and setting still chains.

Also: `BulletChartBaseAPI` was `Omit<ChartBaseAPI<BulletChartModule>, 'locale' | 'isAnimated' | 'loadingState'>`, and `ChartBaseAPI` declares none of those three — the real member is `isLoading`, which the chart has and keeps. The `Omit` removed nothing while reading as though it removed three things, so it is spelled plainly.

**Breaking**, type-only: code relying on a getter's wrong return type no longer compiles, `customTitle(1)` is rejected where a string is now required, and a setter no longer accepts an explicit `undefined`.

Found while converting the chart to TypeScript. The other eleven charts' own accessors have the same setter-only shape and are corrected as each converts.
