---
'@britecharts/react': minor
---

Seven settings the core charts have always had are now props:

| Component | New props |
| --- | --- |
| `Line` | `lines`, `shouldShowAllDataPoints`, `hasMinimumValueScale` |
| `StackedArea` | `hasOutline`, `xAxisScale`, `xAxisValueType` |
| `Donut` | `hasCenterLegend` |

Each is passed straight to the chart's accessor of the same name, so it behaves as it does in `@britecharts/core`. `lines` takes core's `CustomLine[]`, and the stacked area's axis props take core's `StackedAreaXAxisScale` and `StackedAreaXAxisValueType`. Nothing existing changes.
