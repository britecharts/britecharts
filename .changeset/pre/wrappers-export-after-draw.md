---
'@britecharts/wrappers': patch
'@britecharts/react': patch
---

The `exportChart` setting and React prop download the chart. The wrappers called the export before the chart had drawn, so the file held no chart. They now call it once the draw is done, and log the error if the export fails.
