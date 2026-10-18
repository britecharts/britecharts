---
'@britecharts/core': patch
---

The tooltip's `dateLabel`, `nameLabel`, `topicLabel` and `valueLabel` are no longer deprecated, and stop warning when set. The charts name the fields of their data points differently, so the tooltip needs them: `topicLabel('values')` for the stacked area, stacked bar and grouped bar, `nameLabel('stack')` and `nameLabel('group')` for the stacked and grouped bar, and `valueLabel('y')` for the scatter plot. The tooltip's API page lists them per chart.
