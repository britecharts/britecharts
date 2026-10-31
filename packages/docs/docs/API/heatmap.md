---
title: Heatmap
sidebar_position: 1
---

<a name="module_Heatmap" id="module_Heatmap"></a>

Reusable Heatmap API module that renders a
simple and configurable heatmap chart.

**Example**  
```js
import { select } from 'd3-selection';
import { heatmap } from '@britecharts/core';

// dataset: [{ day, hour, value }], day 0-6 and hour 0-23, or indexes into
// yAxisLabels and xAxisLabels
const heatmapChart = heatmap();

heatmapChart
    .width(500);

select('.css-selector')
    .datum(dataset)
    .call(heatmapChart);
```

* [Heatmap](#module_Heatmap)
    * [heatmap(_selection)](#exp_module_Heatmap--exports)
        * _static_
            * [.a11yTitle(_x)](#module_Heatmap--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Heatmap--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Heatmap--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Heatmap--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Heatmap--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.boxSize(_x)](#module_Heatmap--exports.boxSize) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Heatmap--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Heatmap--exports.exportChart)
            * [.isLoading(_flag)](#module_Heatmap--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Heatmap--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Heatmap--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Heatmap--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * [.on()](#module_Heatmap--exports.on) ⇒ <code>module</code>
            * [.yAxisLabels(_x)](#module_Heatmap--exports.yAxisLabels) ⇒ <code>yAxisLabels</code> \| <code>module</code>
            * [.xAxisLabels(_x)](#module_Heatmap--exports.xAxisLabels) ⇒ <code>xAxisLabels</code> \| <code>module</code>
            * [.width(_x)](#module_Heatmap--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.tooltip(_x)](#module_Heatmap--exports.tooltip) ⇒ <code>module</code> \| <code>null</code>
            * [.render(target, [data])](#module_Heatmap--exports.render) ⇒ <code>module</code>
        * _inner_
            * [~HeatmapData](#module_Heatmap--exports..HeatmapData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Heatmap--exports" id="exp_module_Heatmap--exports"></a>

## heatmap(_selection)
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |

<a name="module_Heatmap--exports.a11yTitle" id="module_Heatmap--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Heatmap".

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Heatmap--exports.a11yDescription" id="module_Heatmap--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Heatmap--exports.a11yDataTable" id="module_Heatmap--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Heatmap--exports.a11yKeyboardNavigation" id="module_Heatmap--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Heatmap--exports.animationDuration" id="module_Heatmap--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Heatmap--exports.boxSize" id="module_Heatmap--exports.boxSize"></a>

## boxSize(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the boxSize of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current boxSize or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>30</code> | Desired boxSize for the heatmap boxes |

<a name="module_Heatmap--exports.colorSchema" id="module_Heatmap--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>britecharts-red</code> | Desired colorSchema for the heatma boxes |

<a name="module_Heatmap--exports.exportChart" id="module_Heatmap--exports.exportChart"></a>

## exportChart(filename, title)
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Heatmap--exports.isLoading" id="module_Heatmap--exports.isLoading"></a>

## isLoading(_flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _flag | <code>boolean</code> | Desired value for the loading state |

**Example**  
```js
chart.isLoading(true)
```
<a name="module_Heatmap--exports.height" id="module_Heatmap--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>270</code> | Desired height for the chart |

<a name="module_Heatmap--exports.isAnimated" id="module_Heatmap--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated value of the chart
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Decide whether to show chart animation |

<a name="module_Heatmap--exports.margin" id="module_Heatmap--exports.margin"></a>

## margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Heatmap--exports.on" id="module_Heatmap--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Heatmap--exports.yAxisLabels" id="module_Heatmap--exports.yAxisLabels"></a>

## yAxisLabels(_x) ⇒ <code>yAxisLabels</code> \| <code>module</code>
Gets or Sets the y-axis labels of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>yAxisLabels</code> \| <code>module</code> - Current yAxisLabels array or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>[&#x27;Mo&#x27;,</code> | 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']     An array of string labels across the y-axis |

<a name="module_Heatmap--exports.xAxisLabels" id="module_Heatmap--exports.xAxisLabels"></a>

## xAxisLabels(_x) ⇒ <code>xAxisLabels</code> \| <code>module</code>
Gets or Sets the x-axis labels of the chart. With them, `hour` indexes
these labels rather than the hours of the day, so together with
`yAxisLabels` the heatmap can show any two sets of categories.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>xAxisLabels</code> \| <code>module</code> - Current xAxisLabels array or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>[&#x27;00h&#x27;,&#x27;01h&#x27;,...,&#x27;23h&#x27;</code> | An array of string labels across the x-axis |

<a name="module_Heatmap--exports.width" id="module_Heatmap--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>780</code> | Desired width for the chart |

<a name="module_Heatmap--exports.tooltip" id="module_Heatmap--exports.tooltip"></a>

## tooltip(_x) ⇒ <code>module</code> \| <code>null</code>
Gets or Sets the tooltip the chart shows: a `tooltip()`, set on this
chart only. The chart connects it to its
pointer and keyboard events, draws it in place, and sets the labels its
data points need, unless they were set on the tooltip; it does so now
if the chart has drawn, and again on every draw. Its event handlers go
under the `britechartsTooltip` namespace. Null, or another tooltip,
removes the one it had.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>module</code> \| <code>null</code> - Current tooltip or Chart module to chain calls  
**Throws**:

- <code>Error</code> When the tooltip is already set on another chart

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>module</code> \| <code>null</code> | The tooltip to show |

**Example**  
```js
heatmap().tooltip(tooltip()).render('#chart', data);
```
<a name="module_Heatmap--exports.render" id="module_Heatmap--exports.render"></a>

## render(target, [data]) ⇒ <code>module</code>
Draws the chart into a target: a CSS selector, an element or a d3
selection, as `select(target).datum(data).call(chart)` does. A selector
draws into the first element it matches. Without data, the chart
redraws with the data it last drew there.

**Kind**: method of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>module</code> - The chart module, to chain calls  
**Throws**:

- <code>Error</code> When the target matches no element

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> \| <code>Element</code> \| <code>D3Selection</code> | Where to draw the chart |
| [data] | <code>Object</code> | The data to draw |

**Example**  
```js
heatmap().width(600).render('#chart', data);
```
<a name="module_Heatmap--exports..HeatmapData" id="module_Heatmap--exports..HeatmapData"></a>

## exports~HeatmapData : <code>Array.&lt;Object&gt;</code>
The data a heatmap takes: one entry per box.

**Kind**: inner typedef of [<code>heatmap</code>](#exp_module_Heatmap--exports)  
**Properties**

| Name | Type |
| --- | --- |
| day | <code>Number</code> | 
| hour | <code>Number</code> | 
| value | <code>Number</code> | 

**Example**  
```js
[
    {
        day: 0,
        hour: 0,
        value: 7
    },
    {
        day: 0,
        hour: 1,
        value: 10
    }
]
```
