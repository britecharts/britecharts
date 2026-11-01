---
title: Scatter Plot
sidebar_position: 1
---

<a name="module_Scatter-plot" id="module_Scatter-plot"></a>

Reusable Scatter Plot API class that renders a
simple and configurable scatter chart.

**Example**  
```js
import { scatterPlot } from '@britecharts/core';

// dataset: [{ name, x, y }]
const scatterPlotChart = scatterPlot();

scatterPlotChart
    .grid('horizontal')
    .width(500)
    .render('.css-selector', dataset);
```

* [Scatter-plot](#module_Scatter-plot)
    * [scatterPlot(_selection, _data)](#exp_module_Scatter-plot--exports)
        * _static_
            * [.a11yTitle(_x)](#module_Scatter-plot--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Scatter-plot--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Scatter-plot--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Scatter-plot--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Scatter-plot--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.circleStrokeOpacity(_x)](#module_Scatter-plot--exports.circleStrokeOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.circleStrokeWidth(_x)](#module_Scatter-plot--exports.circleStrokeWidth) ⇒ <code>Number</code> \| <code>module</code>
            * [.circleOpacity(_x)](#module_Scatter-plot--exports.circleOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Scatter-plot--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Scatter-plot--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Scatter-plot--exports.exportChart) ⇒ <code>Promise</code>
            * [.grid(_x)](#module_Scatter-plot--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.hasCrossHairs(_x)](#module_Scatter-plot--exports.hasCrossHairs) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasHollowCircles(_x)](#module_Scatter-plot--exports.hasHollowCircles) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasTrendline(_x)](#module_Scatter-plot--exports.hasTrendline) ⇒ <code>boolean</code> \| <code>module</code>
            * [.enableZoom(_x)](#module_Scatter-plot--exports.enableZoom) ⇒ <code>boolean</code> \| <code>module</code>
            * [.isLoading(_flag)](#module_Scatter-plot--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Scatter-plot--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.highlightTextLegendOffset(_x)](#module_Scatter-plot--exports.highlightTextLegendOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Scatter-plot--exports.isAnimated) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Scatter-plot--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
            * [.maxCircleArea(_x)](#module_Scatter-plot--exports.maxCircleArea) ⇒ <code>Number</code> \| <code>module</code>
            * [.on()](#module_Scatter-plot--exports.on) ⇒ <code>module</code>
            * [.valueLocale([_x])](#module_Scatter-plot--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
            * [.width(_x)](#module_Scatter-plot--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xAxisLabel(_x)](#module_Scatter-plot--exports.xAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.xAxisLabelOffset(_x)](#module_Scatter-plot--exports.xAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.xAxisFormat(_x)](#module_Scatter-plot--exports.xAxisFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.xAxisFormatType(_x)](#module_Scatter-plot--exports.xAxisFormatType) ⇒ <code>string</code> \| <code>module</code>
            * [.xTicks(_x)](#module_Scatter-plot--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisFormat(_x)](#module_Scatter-plot--exports.yAxisFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Scatter-plot--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset(_x)](#module_Scatter-plot--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Scatter-plot--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.tooltip(_x)](#module_Scatter-plot--exports.tooltip) ⇒ <code>module</code> \| <code>null</code>
            * [.render(target, [data])](#module_Scatter-plot--exports.render) ⇒ <code>module</code>
        * _inner_
            * [~nameToColorMap](#module_Scatter-plot--exports..nameToColorMap)
            * [~ScatterPlotData](#module_Scatter-plot--exports..ScatterPlotData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Scatter-plot--exports" id="exp_module_Scatter-plot--exports"></a>

## scatterPlot(_selection, _data)
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>ScatterPlotData</code> | The data to attach and generate the chart |

<a name="module_Scatter-plot--exports.a11yTitle" id="module_Scatter-plot--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Scatter plot".

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Scatter-plot--exports.a11yDescription" id="module_Scatter-plot--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Scatter-plot--exports.a11yDataTable" id="module_Scatter-plot--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Scatter-plot--exports.a11yKeyboardNavigation" id="module_Scatter-plot--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Scatter-plot--exports.animationDuration" id="module_Scatter-plot--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the circle animation

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Scatter-plot--exports.circleStrokeOpacity" id="module_Scatter-plot--exports.circleStrokeOpacity"></a>

## circleStrokeOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets each circle's border opacity value of the chart.
It makes each circle border transparent if it's less than 1.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current circleStrokeOpacity or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1</code> | Desired border opacity of circles of the chart |

**Example**  
```js
scatterPlot.circleStrokeOpacity(0.6)
```
<a name="module_Scatter-plot--exports.circleStrokeWidth" id="module_Scatter-plot--exports.circleStrokeWidth"></a>

## circleStrokeWidth(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets each circle's border width value of the chart.
It makes each circle border transparent if it's less than 1.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current circleStrokeWidth or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1</code> | Desired border width of circles of the chart |

**Example**  
```js
scatterPlot.circleStrokeWidth(10)
```
<a name="module_Scatter-plot--exports.circleOpacity" id="module_Scatter-plot--exports.circleOpacity"></a>

## circleOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the circles opacity value of the chart.
Use this to set opacity of a circle for each data point of the chart.
It makes the area of each data point more transparent if it's less than 1.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current circleOpacity or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>0.24</code> | Desired opacity of circles of the chart |

**Example**  
```js
scatterPlot.circleOpacity(0.6)
```
<a name="module_Scatter-plot--exports.colorMap" id="module_Scatter-plot--exports.colorMap"></a>

## colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
scatterPlot.colorMap({name: 'colorHex', name2: 'colorString'})
```
<a name="module_Scatter-plot--exports.colorSchema" id="module_Scatter-plot--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the chart |

**Example**  
```js
scatterPlot.colorSchema(['#fff', '#bbb', '#ccc'])
```
<a name="module_Scatter-plot--exports.exportChart" id="module_Scatter-plot--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Scatter-plot--exports.grid" id="module_Scatter-plot--exports.grid"></a>

## grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Scatter-plot--exports.hasCrossHairs" id="module_Scatter-plot--exports.hasCrossHairs"></a>

## hasCrossHairs(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasCrossHairs status. If true,
the hovered data point will be highlighted with lines
and legend from both x and y axis. The user will see
values for x under x axis line and y under y axis. Lines
will be drawn with respect to highlighted data point

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasCrossHairs or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired hasCrossHairs status for chart |

<a name="module_Scatter-plot--exports.hasHollowCircles" id="module_Scatter-plot--exports.hasHollowCircles"></a>

## hasHollowCircles(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasHollowCircles value of the chart area

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasHollowCircles value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart's data points/circles should be hollow |

<a name="module_Scatter-plot--exports.hasTrendline" id="module_Scatter-plot--exports.hasTrendline"></a>

## hasTrendline(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasTrendline value of the chart area
If true, the trendline calculated based off linear regression
formula will be drawn

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasTrendline value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart's trendline should be drawn |

<a name="module_Scatter-plot--exports.enableZoom" id="module_Scatter-plot--exports.enableZoom"></a>

## enableZoom(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets weather the chart support zoom controls
If true, zoom event handling will be added to the chart.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current enableZoom value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart should support zoom controls |

<a name="module_Scatter-plot--exports.isLoading" id="module_Scatter-plot--exports.isLoading"></a>

## isLoading(_flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _flag | <code>boolean</code> | Desired value for the loading state |

**Example**  
```js
chart.isLoading(true)
```
<a name="module_Scatter-plot--exports.height" id="module_Scatter-plot--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.highlightTextLegendOffset" id="module_Scatter-plot--exports.highlightTextLegendOffset"></a>

## highlightTextLegendOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Sets a custom distance between legend
values with respect to both axises. The legends
show up when hasCrossHairs is true.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current highlightTextLegendOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired highlightTextLegendOffset for the chart |

**Example**  
```js
scatterPlot.highlightTextLegendOffset(-55)
```
<a name="module_Scatter-plot--exports.isAnimated" id="module_Scatter-plot--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets isAnimated value. If set to true,
the chart will be initialized or updated with animation.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current isAnimated or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired isAnimated properties for each side |

<a name="module_Scatter-plot--exports.margin" id="module_Scatter-plot--exports.margin"></a>

## margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin object of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Desired margin object properties for each side |

<a name="module_Scatter-plot--exports.maxCircleArea" id="module_Scatter-plot--exports.maxCircleArea"></a>

## maxCircleArea(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the maximum value of the chart area

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current maxCircleArea or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>10</code> | Desired margin object properties for each side |

<a name="module_Scatter-plot--exports.on" id="module_Scatter-plot--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customClick, customMouseOut, customMouseOver, and customMouseMove

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>module</code> - Scatter Plot  
**Access**: public  
<a name="module_Scatter-plot--exports.valueLocale" id="module_Scatter-plot--exports.valueLocale"></a>

## valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>LocaleObject</code> \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>LocaleObject</code> | <code></code> | _x        Desired locale object format. |

**Example**  
```js
scatterPlot
 .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Scatter-plot--exports.width" id="module_Scatter-plot--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.xAxisLabel" id="module_Scatter-plot--exports.xAxisLabel"></a>

## xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the xAxisLabel of the chart. Adds a
label bellow x-axis for better clarify of data representation.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired string for x-axis label of the chart |

<a name="module_Scatter-plot--exports.xAxisLabelOffset" id="module_Scatter-plot--exports.xAxisLabelOffset"></a>

## xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the xAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>-40</code> | Desired offset for the label |

**Example**  
```js
scatterPlot.xAxisLabelOffset(-55)
```
<a name="module_Scatter-plot--exports.xAxisFormat" id="module_Scatter-plot--exports.xAxisFormat"></a>

## xAxisFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes ability to set the format of x-axis values

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired xAxisFormat for the chart |

<a name="module_Scatter-plot--exports.xAxisFormatType" id="module_Scatter-plot--exports.xAxisFormatType"></a>

## xAxisFormatType(_x) ⇒ <code>string</code> \| <code>module</code>
Exposes ability to set the formatter of x-axis values

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>string</code> \| <code>module</code> - current xAxisFormatType or Chart module to chain calls  
**Access**: public  
**Value**: 'number'  
**Value**: 'time'  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | type of x-axis formatter |

<a name="module_Scatter-plot--exports.xTicks" id="module_Scatter-plot--exports.xTicks"></a>

## xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the xTicks of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired xTicks for the chart |

<a name="module_Scatter-plot--exports.yAxisFormat" id="module_Scatter-plot--exports.yAxisFormat"></a>

## yAxisFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes ability to set the format of y-axis values

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired yAxisForma for the chart |

<a name="module_Scatter-plot--exports.yAxisLabel" id="module_Scatter-plot--exports.yAxisLabel"></a>

## yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
scatterPlot.yAxisLabel('Ice Cream Consmuption Growth')
```
<a name="module_Scatter-plot--exports.yAxisLabelOffset" id="module_Scatter-plot--exports.yAxisLabelOffset"></a>

## yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>-40</code> | Desired offset for the label |

**Example**  
```js
scatterPlot.yAxisLabelOffset(-55)
```
<a name="module_Scatter-plot--exports.yTicks" id="module_Scatter-plot--exports.yTicks"></a>

## yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the xTicks of the chart

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.tooltip" id="module_Scatter-plot--exports.tooltip"></a>

## tooltip(_x) ⇒ <code>module</code> \| <code>null</code>
Gets or Sets the tooltip the chart shows: a `tooltip()`, set on this
chart only. The chart connects it to its
pointer and keyboard events, draws it in place, and sets the labels its
data points need, unless they were set on the tooltip; it does so now
if the chart has drawn, and again on every draw. Its event handlers go
under the `britechartsTooltip` namespace. Null, or another tooltip,
removes the one it had.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>module</code> \| <code>null</code> - Current tooltip or Chart module to chain calls  
**Throws**:

- <code>Error</code> When the tooltip is already set on another chart

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>module</code> \| <code>null</code> | The tooltip to show |

**Example**  
```js
scatterPlot().tooltip(tooltip()).render('#chart', data);
```
<a name="module_Scatter-plot--exports.render" id="module_Scatter-plot--exports.render"></a>

## render(target, [data]) ⇒ <code>module</code>
Draws the chart into a target: a CSS selector, an element or a d3
selection, as `select(target).datum(data).call(chart)` does. A selector
draws into the first element it matches. Without data, the chart
redraws with the data it last drew there.

**Kind**: method of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
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
scatterPlot().width(600).render('#chart', data);
```
<a name="module_Scatter-plot--exports..nameToColorMap" id="module_Scatter-plot--exports..nameToColorMap"></a>

## exports~nameToColorMap
Maps data point category name to
each color of the given color scheme
{
    name1: 'color1',
    name2: 'color2',
    name3: 'color3',
    ...
}

**Kind**: inner property of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
<a name="module_Scatter-plot--exports..ScatterPlotData" id="module_Scatter-plot--exports..ScatterPlotData"></a>

## exports~ScatterPlotData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>scatterPlot</code>](#exp_module_Scatter-plot--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the category or topic for data point |
| x | <code>Number</code> | Data point's position value relative to x-axis |
| y | <code>Number</code> | Data point's position value relative to y-axis |

**Example**  
```js
[
    {
        name: 'topic',
        x: 123,
        y: 24,
    },
    {
        name: 'topic1',
        x: 53,
        y: 31,
    },
    {
        name: 'topic2',
        x: 631,
        y: 321,
    },
    {
        name: 'topic1',
        x: 231,
        y: 111,
    }
]
```
