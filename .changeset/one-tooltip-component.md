---
'@britecharts/core': major
---

One tooltip component. `tooltip` renders a list (title and one row per topic) or a single value (title, name and a big value) by the shape of the data point it is given, or as told by the new `layout` accessor; `miniTooltip` is now that component with `layout('single')`, an empty title and `numberFormat('.2f')`, so it keeps working as it did and gains every tooltip accessor.

**Breaking:** the line, stacked area, stacked bar and grouped bar charts dispatch `customMouseMove` with the same payload as every other chart: `(dataPoint, [x, y], [width, height], colorMap)` instead of `(dataPoint, colorMap, x, y)`. Wiring `chart.on('customMouseMove', tooltip.update)` is unaffected, and `tooltip.update` still accepts the old order (it warns once); a custom handler that reads the arguments by position has to take the new order. `tooltip.show()` accepts the data point and position the single-value charts dispatch on `customMouseOver`, and renders them at once. The typings merge: `MiniTooltipAPI` is `TooltipAPI`, `update` has both signatures, `TooltipDataShape` covers both shapes.
