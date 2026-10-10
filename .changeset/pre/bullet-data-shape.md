---
'@britecharts/core': minor
---

`BulletChartDataShape` now declares `title` and `subtitle`.

The chart reads `originalData.title` and `originalData.subtitle` and renders both, and its own `@typedef BulletChartData` documents them as optional strings — but the declared shape omitted them, so a consumer passing the data the documentation shows did not compile.

Found while converting the chart to TypeScript: the implementation cannot be typed against a data shape that is missing properties it reads.
