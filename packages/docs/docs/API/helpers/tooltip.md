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

<a name="registerTooltipGroup" id="registerTooltipGroup"></a>

## registerTooltipGroup(tooltip, group)
Records the group a tooltip drew itself in. The tooltip calls this each
time it builds one.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tooltip | <code>Object</code> | The tooltip module |
| group | <code>Element</code> | The tooltip's group |

<a name="claimTooltip" id="claimTooltip"></a>

## claimTooltip(chart, tooltip)
Makes a chart the tooltip's only chart. Throws when another chart has it:
a tooltip draws into one chart, and a second chart would move it between
them on every draw.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| chart | <code>Object</code> | The chart module |
| tooltip | <code>Object</code> | The tooltip module |

<a name="releaseTooltip" id="releaseTooltip"></a>

## releaseTooltip(chart, tooltip)
Takes a tooltip off a chart: stops the chart's events from reaching it,
removes the group it drew, and frees it for another chart

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| chart | <code>Object</code> | The chart module |
| tooltip | <code>Object</code> | The tooltip module |

<a name="connectTooltip" id="connectTooltip"></a>

## connectTooltip(chart, tooltip, svg, labels, [toDataPoint])
Connects a tooltip to a chart that has drawn: sets the labels the chart
needs, follows the chart's pointer and keyboard events, and draws the
tooltip into the chart's vertical marker, or its metadata group when it
has no marker. The handlers go under their own namespace, so the user's
handlers on the same events keep running.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| chart | <code>Object</code> | The chart module |
| tooltip | <code>Object</code> | The tooltip module |
| svg | <code>D3Selection</code> | The chart's svg |
| labels | <code>Object</code> | The labels the chart needs |
| [toDataPoint] | <code>function</code> | Turns what the chart sends into the                                  data point the tooltip shows |

