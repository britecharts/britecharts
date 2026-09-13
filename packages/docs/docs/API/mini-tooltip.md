---
title: Mini Tooltip
---

<a name="module_Mini-tooltip" id="module_Mini-tooltip"></a>

Mini Tooltip: the single-value preset of the [Tooltip](./tooltip.md)
component. It renders a title, the hovered element's name and its value
on one line each, for the bar, scatter plot, heatmap and donut charts, and
it is `tooltip().layout('single').title('').numberFormat('.2f')` -- every
accessor of the tooltip is available on it.

**Example**  
```js
const barChart = bar(),
    miniTooltip = miniTooltip();

barChart
    .width(500)
    .on('customMouseOver', miniTooltip.show)
    .on('customMouseMove', miniTooltip.update)
    .on('customMouseOut', miniTooltip.hide);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(barChart);

d3Selection.select('.metadata-group')
    .datum([])
    .call(miniTooltip);
```
