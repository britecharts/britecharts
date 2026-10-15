---
'@britecharts/core': major
---

An accessor that has not been set reads `null` on every chart. Before, the same accessor name read `null` on one chart and `undefined` on another, so a consumer writing one guard for it had to check both.

| Accessor | Was `undefined` on | Already `null` on |
| --- | --- | --- |
| `yAxisLabel` | grouped bar, stacked bar, scatter plot, stacked area | bar, line |
| `xAxisLabel` | scatter plot | bar, line |
| `numberFormat` | donut, line, stacked area | tooltip |
| `locale` | line, stacked area, tooltip and mini tooltip | brush |

**Breaking**, for TypeScript and for strict checks: each getter's declared type is now `T | null` rather than `T | undefined`, so code that annotated the old type, or compared with `=== undefined`, needs updating. A plain truthiness guard works as before.

`numberFormat` on the donut, line and stacked area also stops claiming to be a `string` when unset. The shared declaration promised one, but these three charts have no default format, so the getter now says `string | null`. Nothing changes at run time beyond the `null`: every chart already treated an unset value the same whichever of the two it was.
