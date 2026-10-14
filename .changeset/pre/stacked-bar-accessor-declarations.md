---
'@britecharts/core': major
---

The stacked bar chart's declarations match what it actually does. Twelve setter-only accessors, three of whose getters are wider than their setter.

**Twelve of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `betweenBarsPadding`, `grid`, `hasPercentage`, `hasReversedStacks`, `isHorizontal`, `percentageAxisToMaxRatio`, `tooltipThreshold`, `valueLocale`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset` and `yTicks` are each a getter/setter overload pair now. Its three label accessors — `nameLabel`, `stackLabel`, `valueLabel` — already had both and are unchanged.

**Three of those getters are wider than their setter**, because the chart has no usable default: `grid` and `valueLocale` are `null` in the module's own `let` block and `yAxisLabel` has no initialiser, so reading any of the three before setting it gives `GridTypes | null`, `LocalObject | null` and `string | undefined` respectively. `grid`'s setter takes `GridTypes | null` to match, since the assignment goes straight through and putting the default back is how a grid is turned off — the same as on the grouped bar, whose JSDoc documents that default where this chart's does not.

**`hasPercentage` is not a stored value at all.** Its getter computes `numberFormat === PERCENTAGE_FORMAT`, and its setter swaps `numberFormat` between the percentage and plain formats. It reports a boolean either way, and the published declaration now says so.

**Breaking**, type-only: code relying on one of those twelve getters' wrong return type no longer compiles, none of the twelve setters accepts an explicit `undefined` any more — `grid` and `valueLocale` take `null`, which the other ten do not — and the three wide getters now have to be guarded before use.

Found while preparing the stacked bar's TypeScript conversion, which lands separately, the way the grouped bar's, brush's and the donut's declarations were corrected ahead of theirs. `packages/integration`'s TypeScript consumer reads all twelve, chains the setters, and reads `hasPercentage` and `numberFormat` back after setting the first; `expect-errors.ts` holds the control for the three wide getters.
