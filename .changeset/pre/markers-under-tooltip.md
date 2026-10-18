---
'@britecharts/core': patch
---

The line and stacked area charts draw their data point markers under a tooltip mounted in the chart's marker container (`.metadata-group .hover-marker`), instead of on top of it.
