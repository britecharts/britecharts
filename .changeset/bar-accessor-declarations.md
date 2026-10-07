---
'@britecharts/core': major
---

The bar chart's declarations match what it actually does. Twenty-two setter-only accessors, one of them declared with the wrong callback type.

**`orderingFunction` was declared `=> void`**, and the chart hands it straight to `Array.prototype.sort`, which reads the sign of what the comparator returns. A callback returning nothing type-checked and would have left the bars in their original order. It returns a `number`, and its getter is `undefined` until one is set — the chart has no default ordering and only sorts once a comparator arrives. Same defect, and same fix, as the donut's `orderingFunction`.

**Twenty-two of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `betweenBarsPadding`, `chartGradient`, `enableLabels`, `hasPercentage`, `hasSingleBarHighlight`, `highlightBarFunction`, `isHorizontal`, `labelsMargin`, `labelsNumberFormat`, `labelsSize`, `orderingFunction`, `percentageAxisToMaxRatio`, `shouldReverseColorList`, `valueLabel`, `valueLocale`, `xAxisLabel`, `xAxisLabelOffset`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yAxisPaddingBetweenChart` and `yTicks` are each a getter/setter overload pair now. `nameLabel` already had both and is unchanged.

**Five getters are wider than their setter**, each for its own reason rather than one rule. `chartGradient`, `xAxisLabel`, `yAxisLabel` and `valueLocale` are `null` in the module's own `let` block — where the grouped and stacked bars left their axis labels uninitialised, this chart initialises them to `null`, so a consumer guards against `null` here and `undefined` there. `orderingFunction` has no initialiser at all and reads `undefined`.

**`hasPercentage` is not a stored value**, as on the stacked bar: its getter computes `numberFormat === PERCENTAGE_FORMAT` and its setter swaps `numberFormat` between the percentage and plain formats.

**`highlightBarFunction`'s getter is nullable** because `null` goes in to disable the highlight, which the chart's own example documents. It does not stay `null`: the first hover replaces it with a no-op, so reading it back after one reports that function rather than the `null` that was set.

**Breaking**, type-only: code relying on one of those twenty-two getters' wrong return type no longer compiles, a comparator that returns nothing is now rejected, none of the setters accepts an explicit `undefined` any more, and the five wide getters have to be guarded before use.

Found while preparing the bar chart's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all twenty-two, chains the setters, and sorts an array with the comparator it reads back; `expect-errors.ts` holds the controls for the five wide getters and for the callback that returns nothing, since that last one cannot be caught by a positive assertion.
