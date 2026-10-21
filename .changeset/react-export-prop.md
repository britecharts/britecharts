---
'@britecharts/react': patch
---

`Bar`, `Bullet`, `Donut` and `ScatterPlot` declare the `exportChart` prop, as the other chart components do. It already reached the chart, but TypeScript rejected it.
