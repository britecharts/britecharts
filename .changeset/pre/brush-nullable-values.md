---
'@britecharts/core': major
---

`BrushChartDataShape.value` is nullable, because a gap in the series is a case the brush chart is built to draw.

The chart has three pieces of machinery for it: `acceptNullValue` preserves a null rather than coercing it to zero, `brushArea.defined()` skips those points so the area breaks instead of dropping to the baseline, and `brushMissingData.json` — the fixture the chart's own spec and Storybook story use — carries eleven of them.

The declared shape said `value: number`, so a TypeScript consumer could not pass the data the library itself ships. `SAMPLE_BRUSH_DATA` in `packages/integration`'s consumer now includes a null row, which is the assertion: against the old shape that row did not compile.

**Breaking**, type-only, and only for reading: code that passes brush data is unaffected, since the accepted type widened. Code that *reads* `value` off a `BrushChartDataShape` now has to account for null — which it always did at runtime.
