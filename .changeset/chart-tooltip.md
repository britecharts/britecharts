---
'@britecharts/core': minor
---

The bar, grouped bar, heatmap, line, scatter plot, stacked area and stacked bar charts take a tooltip: `bar().tooltip(miniTooltip()).render('#chart', data)`. The chart connects the tooltip to its pointer and keyboard events, draws it in place, and sets the labels its data points need, such as the stacked bar's `nameLabel('stack')`; labels set on the tooltip itself are kept. It does so as soon as the tooltip is set on a chart that has drawn, and again on every draw. The heatmap's tooltip names each box by its row and column. Handlers registered on the same events keep running: the chart's go under the `britechartsTooltip` namespace. Setting `tooltip(null)`, or another tooltip, removes the one the chart had. A tooltip belongs to one chart: setting it on a second chart throws.

A tooltip moved to a new container no longer leaves its old group behind, so a stacked area keeps its tooltip after a redraw, and a line chart that grows wide enough to draw its vertical marker shows one tooltip, not two.
