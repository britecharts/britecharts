---
title: Tooltip helpers
---

<a name="markLabelSet" id="markLabelSet"></a>

## markLabelSet(tooltip, labelName)
Records that a tooltip's label was set through its setter, so a chart
never replaces it with the one it would choose. The tooltip's label
setters call this.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tooltip | <code>Object</code> | The tooltip module |
| labelName | <code>String</code> | The label's setter name, such as 'topicLabel' |

<a name="applyChartLabels" id="applyChartLabels"></a>

## applyChartLabels(tooltip, labels)
Sets the labels a chart needs on a tooltip, leaving the ones its user set

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tooltip | <code>Object</code> | The tooltip module |
| labels | <code>Object</code> | The labels the chart needs, by setter name |

<a name="connectTooltip" id="connectTooltip"></a>

## connectTooltip(chart, tooltip, svg, labels)
Connects a tooltip to a chart that has just drawn: sets the labels the
chart needs, follows the chart's pointer and keyboard events, and draws
the tooltip into the chart's vertical marker, or its metadata group when
it has no marker. The events are namespaced, so handlers the user
registers on the same events keep running.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| chart | <code>Object</code> | The chart module |
| tooltip | <code>Object</code> | The tooltip module |
| svg | <code>D3Selection</code> | The chart's svg |
| labels | <code>Object</code> | The labels the chart needs |

<a name="disconnectTooltip" id="disconnectTooltip"></a>

## disconnectTooltip(chart)
Stops a chart's events from reaching the tooltip `connectTooltip` gave it

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| chart | <code>Object</code> | The chart module |

