---
title: Donut
---

<a name="module_Donut" id="module_Donut"></a>

Reusable Donut Chart API class that renders a
simple and configurable donut chart.

**Example**  
```js
import { select } from 'd3-selection';
import { donut } from '@britecharts/core';

// dataset: [{ name, quantity, id }]
const donutChart = donut();

donutChart
    .externalRadius(500)
    .internalRadius(200);

select('.css-selector')
    .datum(dataset)
    .call(donutChart);
```

* [Donut](#module_Donut)
    * [exports(_selection, _data)](#exp_module_Donut--exports) ⏏
        * _static_
            * [.a11yTitle(_x)](#module_Donut--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Donut--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Donut--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.centeredTextFunction(_x)](#module_Donut--exports.centeredTextFunction) ⇒ <code>function</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Donut--exports.colorMap) ⇒ <code>number</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Donut--exports.colorSchema) ⇒ <code>String</code> \| <code>module</code>
            * [.emptyDataConfig(_x)](#module_Donut--exports.emptyDataConfig) ⇒ <code>Object</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Donut--exports.exportChart) ⇒ <code>Promise</code>
            * [.externalRadius(_x)](#module_Donut--exports.externalRadius) ⇒ <code>Number</code> \| <code>Module</code>
            * [.hasCenterLegend(_x)](#module_Donut--exports.hasCenterLegend) ⇒ <code>boolean</code> \| <code>Module</code>
            * [.hasHoverAnimation(_x)](#module_Donut--exports.hasHoverAnimation) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasFixedHighlightedSlice(_x)](#module_Donut--exports.hasFixedHighlightedSlice) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasLastHoverSliceHighlighted(_x)](#module_Donut--exports.hasLastHoverSliceHighlighted) ⇒ <code>boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Donut--exports.height) ⇒ <code>Number</code> \| <code>Module</code>
            * [.highlightSliceById(_x)](#module_Donut--exports.highlightSliceById) ⇒ <code>Number</code> \| <code>Module</code>
            * [.internalRadius(_x)](#module_Donut--exports.internalRadius) ⇒ <code>Number</code> \| <code>Module</code>
            * [.isAnimated(_x)](#module_Donut--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Donut--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Donut--exports.margin) ⇒ <code>Object</code> \| <code>Module</code>
            * [.numberFormat(_x)](#module_Donut--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.on()](#module_Donut--exports.on) ⇒ <code>module</code>
            * [.orderingFunction(_x)](#module_Donut--exports.orderingFunction) ⇒ <code>function</code> \| <code>Module</code>
            * [.percentageFormat(_x)](#module_Donut--exports.percentageFormat) ⇒ <code>Number</code> \| <code>Module</code>
            * [.radiusHoverOffset(_x)](#module_Donut--exports.radiusHoverOffset) ⇒ <code>Number</code> \| <code>Module</code>
            * [.width(_x)](#module_Donut--exports.width) ⇒ <code>Number</code> \| <code>Module</code>
        * _inner_
            * [~DonutChartData](#module_Donut--exports..DonutChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Donut--exports" id="exp_module_Donut--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>DonutChartData</code> | The data to attach and generate the chart |

<a name="module_Donut--exports.a11yTitle" id="module_Donut--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Donut chart".

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Donut--exports.a11yDescription" id="module_Donut--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Donut--exports.animationDuration" id="module_Donut--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Donut--exports.centeredTextFunction" id="module_Donut--exports.centeredTextFunction"></a>

## centeredTextFunction(_x) ⇒ <code>function</code> \| <code>module</code>
Gets or Sets the centeredTextFunction of the chart. If function is provided
the format will be changed by the custom function's value format.
The default format function value is "${d.percentage}% ${d.name}".
The callback will provide the data object with id, name, percentage, and quantity.
Also provides the component added by the user in each data entry.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>function</code> \| <code>module</code> - Current centeredTextFunction or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | Custom function that returns a formatted string |

**Example**  
```js
donutChart.centeredTextFunction(d => `${d.id} ${d.quantity}`)
```
<a name="module_Donut--exports.colorMap" id="module_Donut--exports.colorMap"></a>

## colorMap([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
stackedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Donut--exports.colorSchema" id="module_Donut--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Donut--exports.emptyDataConfig" id="module_Donut--exports.emptyDataConfig"></a>

## emptyDataConfig(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity
adds up to zero or there are no entries), the chart will render an empty slice
with a given color (light gray by default)

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current config for when chart data is an empty array  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | EmptyDataConfig object to get/set |

**Example**  
```js
donutChart.emptyDataConfig({showEmptySlice: true, emptySliceColor: '#000000'})
```
<a name="module_Donut--exports.exportChart" id="module_Donut--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Donut--exports.externalRadius" id="module_Donut--exports.externalRadius"></a>

## externalRadius(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the externalRadius of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current externalRadius or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | ExternalRadius number to get/set |

<a name="module_Donut--exports.hasCenterLegend" id="module_Donut--exports.hasCenterLegend"></a>

## hasCenterLegend(_x) ⇒ <code>boolean</code> \| <code>Module</code>
Gets or Sets the hasCenterLegend property of the chart, making it display
legend at the center of the donut.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>Module</code> - Current hasCenterLegend flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | If we want to show legent at the center of the donut |

<a name="module_Donut--exports.hasHoverAnimation" id="module_Donut--exports.hasHoverAnimation"></a>

## hasHoverAnimation(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasHoverAnimation property of the chart. By default,
donut chart highlights the hovered slice. This property explicitly
disables this hover behavior.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasHoverAnimation flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Decide whether hover slice animation should be enabled |

<a name="module_Donut--exports.hasFixedHighlightedSlice" id="module_Donut--exports.hasFixedHighlightedSlice"></a>

## hasFixedHighlightedSlice(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
highlight the selected slice id set with `highlightSliceById` all the time.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasFixedHighlightedSlice flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | If we want to make the highlighted slice permanently highlighted |

<a name="module_Donut--exports.hasLastHoverSliceHighlighted" id="module_Donut--exports.hasLastHoverSliceHighlighted"></a>

## hasLastHoverSliceHighlighted(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or sets the hasLastHoverSliceHighlighted property.
If property is true, the last hovered slice will be highlighted
after 'mouseout` event is triggered. The last hovered slice will remain
in highlight state.
Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted
are true, the latter property will override the former.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasLastHoverSliceHighlighted value or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Decide whether the last hovered slice should be highlighted |

<a name="module_Donut--exports.height" id="module_Donut--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current height or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Donut--exports.highlightSliceById" id="module_Donut--exports.highlightSliceById"></a>

## highlightSliceById(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the id of the slice to highlight

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current highlighted slice id or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Slice id |

<a name="module_Donut--exports.internalRadius" id="module_Donut--exports.internalRadius"></a>

## internalRadius(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the internalRadius of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current internalRadius or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | InternalRadius number to get/set |

<a name="module_Donut--exports.isAnimated" id="module_Donut--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired animation flag |

<a name="module_Donut--exports.isLoading" id="module_Donut--exports.isLoading"></a>

## isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Donut--exports.margin" id="module_Donut--exports.margin"></a>

## margin(_x) ⇒ <code>Object</code> \| <code>Module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Object</code> \| <code>Module</code> - Current margin or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Donut--exports.numberFormat" id="module_Donut--exports.numberFormat"></a>

## numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the donut chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired numberFormat for the chart. See examples [here](https://d3js.org/d3-format) |

<a name="module_Donut--exports.on" id="module_Donut--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Donut--exports.orderingFunction" id="module_Donut--exports.orderingFunction"></a>

## orderingFunction(_x) ⇒ <code>function</code> \| <code>Module</code>
Changes the order of items given custom function

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>function</code> \| <code>Module</code> - Void function with no return  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | A custom function that sets logic for ordering |

<a name="module_Donut--exports.percentageFormat" id="module_Donut--exports.percentageFormat"></a>

## percentageFormat(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the percentage format for the percentage label

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current format or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Format for the percentage label (e.g. '.1f') |

<a name="module_Donut--exports.radiusHoverOffset" id="module_Donut--exports.radiusHoverOffset"></a>

## radiusHoverOffset(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the radiusHoverOffset of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current offset or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the hovered slice |

<a name="module_Donut--exports.width" id="module_Donut--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current width or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Donut--exports..DonutChartData" id="module_Donut--exports..DonutChartData"></a>

## exports~DonutChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Donut--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| quantity | <code>Number</code> | Quantity of the group (required) |
| percentage | <code>Number</code> | Percentage of the total (optional) |
| name | <code>String</code> | Name of the group (required) |
| id | <code>Number</code> | Identifier for the group required for legend feature (optional) |

**Example**  
```js
[
    {
        quantity: 1,
        percentage: 50,
        name: 'glittering',
        id: 1
    },
    {
        quantity: 1,
        percentage: 50,
        name: 'luminous',
        id: 2
    }
]
```
