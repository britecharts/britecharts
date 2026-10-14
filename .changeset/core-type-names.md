---
'@britecharts/core': major
---

Two published types are corrected, and importing either old name is now a compile error:

- `SparkelineTitleTextStyle` is renamed `SparklineTitleTextStyle`, fixing the misspelling. The shape is unchanged: import the new name.
- `LineChartEmptyDataConfig` is removed. The line chart has no `emptyDataConfig` accessor, so nothing ever read the type.
