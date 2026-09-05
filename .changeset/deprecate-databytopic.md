---
'@britecharts/core': minor
---

Deprecate the line chart's `dataByTopic` data shape. It still works and is unchanged, but it now reports itself as deprecated as of 3.0.0 and scheduled for removal in 4.0.0, and the deprecation warning points at the migration guide. Use the flat `data` array instead.
