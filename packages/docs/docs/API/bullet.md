---
title: Bullet
sidebar_position: 1
---

<a name="module_Bullet" id="module_Bullet"></a>

Reusable Bullet Chart API class that renders a
simple and configurable Bullet Chart.

**Example**  
```js
import { select } from 'd3-selection';
import { bullet } from '@britecharts/core';

// dataset: one object: { ranges, measures, markers }
const bulletChart = bullet();

bulletChart
    .width(containerWidth);

select('.css-selector')
    .datum(dataset)
    .call(bulletChart);
```

* [Bullet](#module_Bullet)
    * [exports(_selection, _data)](#exp_module_Bullet--exports) ⏏
        * _static_
            * [.a11yTitle(_x)](#module_Bullet--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Bullet--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Bullet--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Bullet--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Bullet--exports.exportChart) ⇒ <code>Promise</code>
            * [.isLoading(_flag)](#module_Bullet--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Bullet--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.isReverse(_x)](#module_Bullet--exports.isReverse) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Bullet--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * [.numberFormat(_x)](#module_Bullet--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.paddingBetweenAxisAndChart(_x)](#module_Bullet--exports.paddingBetweenAxisAndChart) ⇒ <code>Number</code> \| <code>module</code>
            * [.startMaxRangeOpacity(_x)](#module_Bullet--exports.startMaxRangeOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.ticks(_x)](#module_Bullet--exports.ticks) ⇒ <code>Number</code> \| <code>module</code>
            * [.width(_x)](#module_Bullet--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.render(target, [data])](#module_Bullet--exports.render) ⇒ <code>module</code>
        * _inner_
            * [~BulletChartData](#module_Bullet--exports..BulletChartData) : <code>Object</code>

<a name="exp_module_Bullet--exports" id="exp_module_Bullet--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>BulletChartData</code> | The data to attach and generate the chart |

<a name="module_Bullet--exports.a11yTitle" id="module_Bullet--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Bullet chart".

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Bullet--exports.a11yDescription" id="module_Bullet--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Bullet--exports.a11yDataTable" id="module_Bullet--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Bullet--exports.colorSchema" id="module_Bullet--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart.
The first color from the array will be applied to range bars (the wider bars).
The second color from the array will be applied to measure bars (the narrow bars) and
the third color will be applied to the marker lines.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Bullet--exports.exportChart" id="module_Bullet--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Bullet--exports.isLoading" id="module_Bullet--exports.isLoading"></a>

## isLoading(_flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _flag | <code>boolean</code> | Desired value for the loading state |

**Example**  
```js
chart.isLoading(true)
```
<a name="module_Bullet--exports.height" id="module_Bullet--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Bullet--exports.isReverse" id="module_Bullet--exports.isReverse"></a>

## isReverse(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isReverse status of the chart. If true,
the elements will be rendered in reverse order.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Desired height for the chart |

<a name="module_Bullet--exports.margin" id="module_Bullet--exports.margin"></a>

## margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Bullet--exports.numberFormat" id="module_Bullet--exports.numberFormat"></a>

## numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://d3js.org/d3-format) |

<a name="module_Bullet--exports.paddingBetweenAxisAndChart" id="module_Bullet--exports.paddingBetweenAxisAndChart"></a>

## paddingBetweenAxisAndChart(_x) ⇒ <code>Number</code> \| <code>module</code>
Space between axis and chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current value of paddingBetweenAxisAndChart or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>5</code> | Space between y axis and chart |

<a name="module_Bullet--exports.startMaxRangeOpacity" id="module_Bullet--exports.startMaxRangeOpacity"></a>

## startMaxRangeOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the starting point of the capacity range.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - current startMaxRangeOpacity or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>0.5</code> | Desired startMaxRangeOpacity for chart |

**Example**  
```js
bulletChart.startMaxRangeOpacity(0.8)
```
<a name="module_Bullet--exports.ticks" id="module_Bullet--exports.ticks"></a>

## ticks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current ticks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired horizontal ticks |

<a name="module_Bullet--exports.width" id="module_Bullet--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the chart |

<a name="module_Bullet--exports.render" id="module_Bullet--exports.render"></a>

## render(target, [data]) ⇒ <code>module</code>
Draws the chart into a target: a CSS selector, an element or a d3
selection, as `select(target).datum(data).call(chart)` does. A selector
draws into the first element it matches. Without data, the chart
redraws with the data it last drew there.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
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
bullet().width(600).render('#chart', data);
```
<a name="module_Bullet--exports..BulletChartData" id="module_Bullet--exports..BulletChartData"></a>

## exports~BulletChartData : <code>Object</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Bullet--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ranges | <code>Array.&lt;Number&gt;</code> | Range that encodes the qualitative measure |
| measures | <code>Array.&lt;Number&gt;</code> | Range that encodes the performance measure |
| markers | <code>Array.&lt;Number&gt;</code> | Marker lines that encode the comparative measure |

**Example**  
```js
{
     ranges: [130, 160, 250],
     measures: [150, 180],
     markers: [175]
}
```
