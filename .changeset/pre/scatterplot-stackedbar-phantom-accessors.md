---
'@britecharts/core': major
---

Two accessors the typings promised and the charts never had are no longer declared.

Both compiled and then threw, which is the worse half of a typings mismatch — an undeclared accessor merely cannot be called.

**`scatterPlot.numberFormat`** came in from `ChartBaseAPI` and the chart has no implementation for it. Removed rather than implemented, on consistency grounds: this chart's own idiom is a format per axis, `xAxisFormat` and `yAxisFormat`, both of which it exposes. A chart-wide `numberFormat` would be a second way to say the same thing.

**`stackedBar.locale`** was declared on the chart itself, described as "Pass language tag for the tooltip to localize the date". Every one of the four charts that exposes `locale` has a time axis; stacked-bar has none — no `getTimeSeriesAxis`, no `timeFormat`, no `Intl.DateTimeFormat` — so there is no date for a language tag to localise. Its `valueLocale`, the d3-format locale, is untouched and still exposed.

While there: `ScatterPlotBaseAPI` omitted `'locale' | 'loadingState'` from `ChartBaseAPI`, and `ChartBaseAPI` declares neither — the loading accessor is `isLoading` and `locale` lives on `TimeSeriesChartAPI`. That `Omit` removed nothing while reading as though it removed two things, the same vestigial pattern corrected in the bullet chart.

**Breaking**, type-only, and only for code that could never have run.
