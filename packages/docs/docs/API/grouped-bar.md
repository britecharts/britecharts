---
title: Grouped Bar
sidebar_position: 1
---

<a name="module_Grouped-bar" id="module_Grouped-bar"></a>

Grouped Bar Chart reusable API module that allows us
rendering a multi grouped bar and configurable chart.

**Example**  
```js
import { select } from 'd3-selection';
import { groupedBar } from '@britecharts/core';

// dataset: [{ name, group, value }]
const groupedBarChart = groupedBar();

groupedBarChart
    .width(containerWidth);

select('.css-selector')
    .datum(dataset)
    .call(groupedBarChart);
```

* [Grouped-bar](#module_Grouped-bar)
    * [exports(_selection, _data)](#exp_module_Grouped-bar--exports) ⏏
        * _static_
            * [.a11yTitle(_x)](#module_Grouped-bar--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Grouped-bar--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Grouped-bar--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Grouped-bar--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Grouped-bar--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.betweenBarsPadding([_x])](#module_Grouped-bar--exports.betweenBarsPadding) ⇒ <code>Number</code> \| <code>module</code>
            * [.betweenGroupsPadding([_x])](#module_Grouped-bar--exports.betweenGroupsPadding) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Grouped-bar--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Grouped-bar--exports.colorSchema) ⇒ <code>colorSchema</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Grouped-bar--exports.exportChart) ⇒ <code>Promise</code>
            * [.grid([_x])](#module_Grouped-bar--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.height([_x])](#module_Grouped-bar--exports.height) ⇒ <code>height</code> \| <code>module</code>
            * [.isHorizontal([_x])](#module_Grouped-bar--exports.isHorizontal) ⇒ <code>isHorizontal</code> \| <code>module</code>
            * [.isAnimated([_x])](#module_Grouped-bar--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Grouped-bar--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Grouped-bar--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * [.numberFormat(_x)](#module_Grouped-bar--exports.numberFormat) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
            * [.on()](#module_Grouped-bar--exports.on) ⇒ <code>module</code>
            * [.tooltipThreshold([_x])](#module_Grouped-bar--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * [.valueLocale([_x])](#module_Grouped-bar--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
            * [.width([_x])](#module_Grouped-bar--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xTicks([_x])](#module_Grouped-bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Grouped-bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset([_x])](#module_Grouped-bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks([_x])](#module_Grouped-bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTickTextOffset([_x])](#module_Grouped-bar--exports.yTickTextOffset) ⇒ <code>Object</code> \| <code>module</code>
        * _inner_
            * [~GroupedBarChartData](#module_Grouped-bar--exports..GroupedBarChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Grouped-bar--exports" id="exp_module_Grouped-bar--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>GroupedBarChartData</code> | The data to attach and generate the chart |

<a name="module_Grouped-bar--exports.a11yTitle" id="module_Grouped-bar--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Grouped bar chart".

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Grouped-bar--exports.a11yDescription" id="module_Grouped-bar--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Grouped-bar--exports.a11yDataTable" id="module_Grouped-bar--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Grouped-bar--exports.a11yKeyboardNavigation" id="module_Grouped-bar--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Grouped-bar--exports.animationDuration" id="module_Grouped-bar--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Grouped-bar--exports.betweenBarsPadding" id="module_Grouped-bar--exports.betweenBarsPadding"></a>

## betweenBarsPadding([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding between bars.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0.1</code> | Padding value to get/set |

<a name="module_Grouped-bar--exports.betweenGroupsPadding" id="module_Grouped-bar--exports.betweenGroupsPadding"></a>

## betweenGroupsPadding([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding between groups of bars.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current group padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0.1</code> | Padding value to get/set |

<a name="module_Grouped-bar--exports.colorMap" id="module_Grouped-bar--exports.colorMap"></a>

## colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
groupedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Grouped-bar--exports.colorSchema" id="module_Grouped-bar--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>colorSchema</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>colorSchema</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Grouped-bar--exports.exportChart" id="module_Grouped-bar--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Grouped-bar--exports.grid" id="module_Grouped-bar--exports.grid"></a>

## grid([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code></code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Grouped-bar--exports.height" id="module_Grouped-bar--exports.height"></a>

## height([_x]) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>500</code> | Desired width for the graph |

<a name="module_Grouped-bar--exports.isHorizontal" id="module_Grouped-bar--exports.isHorizontal"></a>

## isHorizontal([_x]) ⇒ <code>isHorizontal</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>isHorizontal</code> \| <code>module</code> - If it is horizontal or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>false</code> | Desired horizontal direction for the graph |

<a name="module_Grouped-bar--exports.isAnimated" id="module_Grouped-bar--exports.isAnimated"></a>

## isAnimated([_x]) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | Desired animation flag |

<a name="module_Grouped-bar--exports.isLoading" id="module_Grouped-bar--exports.isLoading"></a>

## isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls     * @public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Grouped-bar--exports.margin" id="module_Grouped-bar--exports.margin"></a>

## margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Grouped-bar--exports.numberFormat" id="module_Grouped-bar--exports.numberFormat"></a>

## numberFormat(_x) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
Gets or Sets the numberFormat of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = ',f'     Desired numberFormat for the chart. See examples [here](https://d3js.org/d3-format) |

<a name="module_Grouped-bar--exports.on" id="module_Grouped-bar--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Grouped-bar--exports.tooltipThreshold" id="module_Grouped-bar--exports.tooltipThreshold"></a>

## tooltipThreshold([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>480</code> | Minimum width of chart to show the tooltip |

<a name="module_Grouped-bar--exports.valueLocale" id="module_Grouped-bar--exports.valueLocale"></a>

## valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>LocaleObject</code> \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>LocaleObject</code> | <code></code> | _x     Desired locale object format. |

**Example**  
```js
groupedBarChart
 .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Grouped-bar--exports.width" id="module_Grouped-bar--exports.width"></a>

## width([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>960</code> | Desired width for the graph |

<a name="module_Grouped-bar--exports.xTicks" id="module_Grouped-bar--exports.xTicks"></a>

## xTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired xTicks |

<a name="module_Grouped-bar--exports.yAxisLabel" id="module_Grouped-bar--exports.yAxisLabel"></a>

## yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
groupedBar.yAxisLabel('Ticket Sales')
```
<a name="module_Grouped-bar--exports.yAxisLabelOffset" id="module_Grouped-bar--exports.yAxisLabelOffset"></a>

## yAxisLabelOffset([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>-60</code> | Desired offset for the label |

**Example**  
```js
groupedBar.yAxisLabelOffset(-55)
```
<a name="module_Grouped-bar--exports.yTicks" id="module_Grouped-bar--exports.yTicks"></a>

## yTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired vertical ticks |

<a name="module_Grouped-bar--exports.yTickTextOffset" id="module_Grouped-bar--exports.yTickTextOffset"></a>

## yTickTextOffset([_x]) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the x and y offset of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current offset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Object</code> | <code>{ y: -8, x: -20 }</code> | Desired offset |

<a name="module_Grouped-bar--exports..GroupedBarChartData" id="module_Grouped-bar--exports..GroupedBarChartData"></a>

## exports~GroupedBarChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the entry |
| group | <code>String</code> | group of the entry |
| value | <code>Number</code> | Value of the entry |

**Example**  
```js
[
    {
        name: "2011-01",
        group: "Direct",
        value: 0
    }
]
```
