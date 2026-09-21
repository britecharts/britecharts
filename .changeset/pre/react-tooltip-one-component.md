---
'@britecharts/react': major
---

**Breaking:** the `Tooltip` component's `customMouseMove` callback receives what the chart dispatches: `(dataPoint, [x, y], [width, height], topicColorMap)` instead of `(dataPoint, topicColorMap, x, y)`. `Tooltip` now works for the single-value charts too: wrap a `Bar` (or a scatter plot or heatmap) in it and it shows the hovered element's name and value, as the core mini tooltip does; the `layout` prop forces `'list'` or `'single'` when the data's shape should not decide. The typings follow.
