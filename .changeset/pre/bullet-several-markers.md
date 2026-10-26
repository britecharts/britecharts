---
'@britecharts/core': patch
'@britecharts/wrappers': patch
---

A bullet's `markers` can hold any number of values, as the chart already draws one line for each. The `BulletChartDataShape` type allowed one at most, so TypeScript rejected a bullet with two markers, and the wrappers' bullet schema rejected it too.
