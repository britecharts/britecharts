---
title: Sparkline
sidebar_position: 1
---

<a name="module_Sparkline" id="module_Sparkline"></a>

Sparkline Chart reusable API module that allows us
rendering a sparkline configurable chart.

**Example**  
```js
import { select } from 'd3-selection';
import { sparkline } from '@britecharts/core';

// dataset: [{ date, value }]
const sparklineChart = sparkline();

sparklineChart
    .width(200)
    .height(100);

select('.css-selector')
    .datum(dataset)
    .call(sparklineChart);
```

* [Sparkline](#module_Sparkline)
    * [exports(_selection, _data)](#exp_module_Sparkline--exports) ⏏
        * _static_
            * [.a11yTitle(_x)](#module_Sparkline--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Sparkline--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Sparkline--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Sparkline--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.areaGradient(_x)](#module_Sparkline--exports.areaGradient) ⇒ <code>areaGradient</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Sparkline--exports.exportChart) ⇒ <code>Promise</code>
            * [.height(_x)](#module_Sparkline--exports.height) ⇒ <code>height</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Sparkline--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
            * [.lineGradient(_x)](#module_Sparkline--exports.lineGradient) ⇒ <code>lineGradient</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Sparkline--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Sparkline--exports.margin) ⇒ <code>object</code> \| <code>module</code>
            * [.width(_x)](#module_Sparkline--exports.width) ⇒ <code>width</code> \| <code>module</code>
        * _inner_
            * [~SparklineChartData](#module_Sparkline--exports..SparklineChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Sparkline--exports" id="exp_module_Sparkline--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>SparklineChartData</code> | The data to attach and generate the chart |

<a name="module_Sparkline--exports.a11yTitle" id="module_Sparkline--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Sparkline".

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Sparkline--exports.a11yDescription" id="module_Sparkline--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Sparkline--exports.a11yDataTable" id="module_Sparkline--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Sparkline--exports.animationDuration" id="module_Sparkline--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Sparkline--exports.areaGradient" id="module_Sparkline--exports.areaGradient"></a>

## areaGradient(_x) ⇒ <code>areaGradient</code> \| <code>module</code>
Gets or Sets the areaGradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>areaGradient</code> \| <code>module</code> - Current areaGradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = ['#F5FDFF', '#F6FEFC']   Desired areaGradient for the graph |

<a name="module_Sparkline--exports.exportChart" id="module_Sparkline--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>string</code> | Title to add at the top of the exported picture |

<a name="module_Sparkline--exports.height" id="module_Sparkline--exports.height"></a>

## height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>30</code> | Desired height for the graph |

<a name="module_Sparkline--exports.isAnimated" id="module_Sparkline--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired animation flag |

<a name="module_Sparkline--exports.lineGradient" id="module_Sparkline--exports.lineGradient"></a>

## lineGradient(_x) ⇒ <code>lineGradient</code> \| <code>module</code>
Gets or Sets the lineGradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>lineGradient</code> \| <code>module</code> - Current lineGradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = colorHelper.colorGradients.greenBlue     Desired lineGradient for the graph |

<a name="module_Sparkline--exports.isLoading" id="module_Sparkline--exports.isLoading"></a>

## isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Sparkline--exports.margin" id="module_Sparkline--exports.margin"></a>

## margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Sparkline--exports.width" id="module_Sparkline--exports.width"></a>

## width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>100</code> | Desired width for the graph |

<a name="module_Sparkline--exports..SparklineChartData" id="module_Sparkline--exports..SparklineChartData"></a>

## exports~SparklineChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value of the group (required) |
| name | <code>string</code> | Name of the group (required) |

**Example**  
```js
[
    {
        value: 1,
        date: '2011-01-06T00:00:00Z'
    },
    {
        value: 2,
        date: '2011-01-07T00:00:00Z'
    }
]
```
