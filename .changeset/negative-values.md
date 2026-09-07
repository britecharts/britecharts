---
'@britecharts/core': minor
---

Support negative values in the bar, grouped bar, stacked bar and brush charts.

[#338](https://github.com/britecharts/britecharts/issues/338) — the second
most-voted request, `help wanted` since 2019. Until now a negative datum threw
(`<rect> attribute width: A negative value is not valid`) rather than degrading,
because these four charts hardcoded a `[0, max]` domain and drew every mark from
the edge of the range. The stacked bar went further and clamped negatives to zero
outright, which also closes [#695](https://github.com/britecharts/britecharts/issues/695).

Two new helpers in `charts/helpers/domain.js` carry the change:
`getValueDomain()` builds a value domain that always contains zero, and
`getBaselineExtent()` returns where a mark growing from that baseline starts and
how long it is, so a negative value comes back on the other side with a positive
size. The stacked bar additionally uses d3's `stackOffsetDiverging`, stacking
positive segments up from zero and negative ones down.

For data that is entirely non-negative the domain is the same `[0, max]` as
before and `scale(0)` is still the edge of the range, so existing charts render
byte-for-byte identically. `line`, `stacked-area` and `scatter-plot` already
scaled from `min()`/`max()` and are unchanged. The donut chart remains the
exception: a negative slice has no meaning there.

Every chart that can take negative values now ships a `withNegativeValues()`
data builder and a matching Storybook story.
