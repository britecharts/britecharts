---
'@britecharts/wrappers': major
---

Every wrapper's `update` now keeps what the chart is showing when it is given no data: an empty array, `null` or `undefined`.

`barChart`, `donutChart` and `scatterPlotChart` used to treat an empty array as new data, so `update(el, [], configuration, chart)` bound `[]` and redrew the chart empty, dropping what it had drawn. The other seven wrappers kept the data they had, and all ten already did for `null` and `undefined`. These three now do the same, so the wrappers agree.

**Breaking** for a consumer who cleared a bar, donut or scatter plot by updating it with `[]`: the chart now keeps its data. To remove a chart, call `destroy(el)`. To show it as loading, pass `isLoading: true` in the configuration.
