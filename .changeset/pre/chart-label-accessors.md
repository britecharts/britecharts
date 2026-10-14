---
'@britecharts/core': minor
---

Eighteen accessors that have always shipped are now declared, across eight charts.

Nothing compared a chart's runtime surface against its published typings, so these had drifted out of the declarations and a consumer writing TypeScript could not call them at all:

| Chart | Accessors |
| --- | --- |
| `bar` | `nameLabel` |
| `donut` | `hasCenterLegend` |
| `groupedBar` | `groupLabel`, `nameLabel`, `valueLabel` |
| `legend` | `unit` |
| `line` | `dateLabel`, `topicLabel`, `valueLabel`, `hasMinimumValueScale` |
| `sparkline` | `dateLabel`, `valueLabel`, `isLoading` |
| `stackedArea` | `dateLabel`, `valueLabel` |
| `stackedBar` | `nameLabel`, `stackLabel`, `valueLabel` |

Fifteen of the eighteen are one family — the keys a chart reads its data by. **They are typed `string`, which is what they have always been at runtime**, not what their JSDoc claimed: most were documented `{number}` or `{Number}`, and several `@return` tags named no type at all (`{valueLabel | module}`). The types here come from each implementation's own default — `nameLabel` is `'name'`, `valueLabel` is `'value'`, `dateLabel` is `'date'` — rather than from the comments.

Each is declared as a getter/setter overload pair, matching the correction in the previous release, so `chart.valueLabel()` reports a `string` and `chart.valueLabel('value')` still chains.

`check:api-parity` in `@britecharts/core` now makes the comparison and runs in CI. It reads the declaration side through the TypeScript compiler, so inherited members, intersections and `Omit` all resolve — `Omit` especially, since a member removed on purpose must not be reported as missing. The runtime side is read from the source, because the accessors are properties assigned onto a function inside a closure and nothing infers them.

`brush`, `bullet`, `heatmap`, `scatterPlot` and `tooltip` were already complete.
