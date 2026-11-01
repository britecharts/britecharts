---
'@britecharts/core': minor
'@britecharts/wrappers': minor
'@britecharts/react': minor
---

There's a new chart, the treemap: `treemap()` in core, `TreemapWrapper` in the wrappers and `Treemap` in React. It shows how a total divides into its parts, from an array of `{ name, value }`. It takes `tooltip()`, keyboard navigation, the data table, export and the loading state like the other charts, and a label shows only where it fits. Core gains `d3-hierarchy` as a dependency.
