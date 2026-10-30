---
'@britecharts/core': minor
---

The bar, grouped bar, heatmap, line, scatter plot, stacked area and stacked bar charts take a tooltip: `bar().tooltip(miniTooltip()).render('#chart', data)`. On every draw the chart connects the tooltip to its pointer and keyboard events, draws it in place, and sets the labels its data points need, such as the stacked bar's `nameLabel('stack')`. Labels set on the tooltip itself are kept. Handlers registered on the same events keep running, and `tooltip(null)` disconnects it.

A tooltip drawn into the stacked area stays after the chart redraws. The chart replaces its vertical marker on every draw, and the tooltip kept drawing into the one it had replaced.
