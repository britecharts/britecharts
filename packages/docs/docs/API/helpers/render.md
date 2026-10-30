---
title: Render helpers
---

<a name="isSelection" id="isSelection"></a>

## isSelection()
A d3 selection, recognised by its methods rather than with `instanceof`:
on a CDN page the page's own d3 is a different copy from the bundle's, and
its selections are not instances of the bundle's class.

**Kind**: global function  
<a name="renderChart" id="renderChart"></a>

## renderChart(chart, target, [data]) ⇒ <code>TChart</code>
Draws a chart into a target, as `select(target).datum(data).call(chart)`
does, so a page needs no d3 code of its own. The charts' `render` accessor
calls this.

**Kind**: global function  
**Returns**: <code>TChart</code> - {Function}         The chart, to chain calls  

| Param | Type | Description |
| --- | --- | --- |
| chart | <code>function</code> | The chart module to draw |
| target | <code>String</code> \| <code>Element</code> \| <code>D3Selection</code> | Where to draw it |
| [data] | <code>Object</code> | The data to draw; left out, the chart redraws                            with the data already bound to the target |

