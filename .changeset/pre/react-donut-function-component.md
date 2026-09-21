---
'@britecharts/react': major
---

`Donut` is now a function component too, on the same shared hook as `Line`, with the same breaking changes: there is no `Donut` instance any more (a `ref` on `<Donut />` is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array). `isAnimated` still defaults to `true`, and `createTooltip`, which a `Tooltip` hands to the chart it wraps, is still not passed on to the chart.
