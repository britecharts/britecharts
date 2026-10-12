---
'@britecharts/core': major
---

A donut datum needs a quantity and a name. The other two fields are optional, as the chart has always documented.

`DonutChartDataShape` declared all four as required, so **the data the chart documents, and draws, did not compile.** Its own `@typedef DonutChartData` says otherwise, and has all along: *"Percentage of the total (optional)"* and *"Identifier for the group required for legend feature (optional)"*.

The runtime agrees. `cleanData` skips a datum only when its `quantity` is missing, sets `percentage` to `d[percentageLabel] || null`, and then computes it — `String(d.percentage || calculatePercent(...))` — so a percentage that is absent is derived from the quantities rather than required from the caller. `id` is read by the legend bridge and by `highlightSliceById`, neither of which the chart needs in order to draw.

`highlightSliceById`'s setter takes `NonNullable<DonutChartDataShape['id']>`, so it keeps rejecting an explicit `undefined` now that the field it points at is optional. Its getter is unchanged in meaning.

**Breaking**, type-only: code that reads `datum.percentage` or `datum.id` off this type now has to handle them being absent, which the chart's own documentation always implied. Passing data is strictly easier — the two-field form the chart's examples show compiles for the first time.

`packages/integration`'s TypeScript consumer carries both shapes now: the full one it already had, and a minimal `{ name, quantity }` one that only compiles with this correction.
