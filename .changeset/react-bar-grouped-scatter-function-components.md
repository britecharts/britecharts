---
'@britecharts/react': major
---

`Bar`, `GroupedBar` and `ScatterPlot` are now function components on the shared hook, like `Line` and `Donut`, with the same breaking changes: there is no component instance any more (a `ref` on them is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array or object). The chart is created as soon as its data arrives, and not while `data` is `null`.
