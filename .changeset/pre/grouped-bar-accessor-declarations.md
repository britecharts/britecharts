---
'@britecharts/core': major
---

The grouped bar chart's declarations match what it actually does. Eleven setter-only accessors, three of whose getters are wider than their setter.

**Eleven of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `betweenBarsPadding`, `betweenGroupsPadding`, `grid`, `isHorizontal`, `tooltipThreshold`, `valueLocale`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yTicks` and `yTickTextOffset` are each a getter/setter overload pair now. Its three label accessors — `groupLabel`, `nameLabel`, `valueLabel` — already had both and are unchanged.

**Three of those getters are wider than their setter**, because the chart has no usable default for any of them. `grid` and `valueLocale` are `null` in the module's own `let` block, and `yAxisLabel` has no initialiser at all, so reading any of the three before setting it gives the empty value: `GridTypes | null`, `LocalObject | null` and `string | undefined` respectively.

`grid`'s setter takes `GridTypes | null` to match: the chart's own JSDoc documents `null` as the default and assigns it straight through, so `grid(null)` is the documented way to turn a grid back off. `valueLocale` already accepted `null` and still does.

**Breaking**, type-only: code relying on one of those eleven getters' wrong return type no longer compiles, none of the eleven setters accepts an explicit `undefined` any more — `grid` and `valueLocale` take `null`, which the other nine do not — and the three wide getters now have to be guarded before use.

Found while preparing the grouped bar's TypeScript conversion, which lands separately, the way brush's and the donut's declarations were corrected ahead of theirs. `packages/integration`'s TypeScript consumer reads all eleven and chains the setters; `expect-errors.ts` holds the control for the three wide getters, since narrowing any of them back to its setter's type leaves a directive unused and fails the build.
