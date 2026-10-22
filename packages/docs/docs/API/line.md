---
title: Line
sidebar_position: 1
---

<a name="module_Line" id="module_Line"></a>

Line Chart reusable API module that allows us
rendering a multi line and configurable chart.

**Example**  
```js
import { select } from 'd3-selection';
import { line } from '@britecharts/core';

// dataset: { data: [{ topicName, name, date, value }] }
const lineChart = line();

lineChart
    .width(500);

select('.css-selector')
    .datum(dataset)
    .call(lineChart);
```

* [Line](#module_Line)
    * [exports(_selection, _data)](#exp_module_Line--exports) ⏏
        * _static_
            * [.axisTimeCombinations](#module_Line--exports.axisTimeCombinations)
            * [.a11yTitle(_x)](#module_Line--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Line--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Line--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Line--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Line--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.xAxisLabel(_x)](#module_Line--exports.xAxisLabel) ⇒ <code>string</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Line--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Line--exports.colorSchema) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Line--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.xAxisCustomFormat(_x)](#module_Line--exports.xAxisCustomFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.xAxisFormat(_x)](#module_Line--exports.xAxisFormat) ⇒ <code>String</code> \| <code>Module</code>
            * [.xTicks(_x)](#module_Line--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.grid(_x)](#module_Line--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.hasMinimumValueScale(_x)](#module_Line--exports.hasMinimumValueScale) ⇒ <code>hasMinimumValueScale</code> \| <code>module</code>
            * [.height(_x)](#module_Line--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Line--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
            * [.lines(_x)](#module_Line--exports.lines) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>module</code>
            * [.lineCurve(_x)](#module_Line--exports.lineCurve) ⇒ <code>curve</code> \| <code>module</code>
            * [.lineGradient(_x)](#module_Line--exports.lineGradient) ⇒ <code>Number</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Line--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.locale(_x)](#module_Line--exports.locale) ⇒ <code>string</code> \| <code>module</code>
            * [.margin(_x)](#module_Line--exports.margin) ⇒ <code>object</code> \| <code>module</code>
            * [.numberFormat(_x)](#module_Line--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.shouldShowAllDataPoints(_x)](#module_Line--exports.shouldShowAllDataPoints) ⇒ <code>shouldShowAllDataPoints</code> \| <code>module</code>
            * [.tooltipThreshold(_x)](#module_Line--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabelPadding(_x&#x3D;)](#module_Line--exports.yAxisLabelPadding) ⇒ <code>yAxisLabelPadding</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Line--exports.yTicks) ⇒ <code>number</code> \| <code>module</code>
            * [.width(_x)](#module_Line--exports.width) ⇒ <code>number</code> \| <code>Module</code>
            * [.exportChart(filename, title)](#module_Line--exports.exportChart) ⇒ <code>Promise</code>
            * [.on()](#module_Line--exports.on) ⇒ <code>module</code>
            * [.xAxisValueType([_x])](#module_Line--exports.xAxisValueType) ⇒ <code>string</code> \| <code>module</code>
            * [.xAxisScale([_x])](#module_Line--exports.xAxisScale) ⇒ <code>string</code> \| <code>module</code>
        * _inner_
            * [~D3Selection](#module_Line--exports..D3Selection) : <code>Array.&lt;Array&gt;</code>
            * [~LineChartFlatData](#module_Line--exports..LineChartFlatData) : <code>object</code>
            * [~LineChartDataSorted](#module_Line--exports..LineChartDataSorted) : <code>Array.&lt;object&gt;</code>
            * [~LineChartData](#module_Line--exports..LineChartData) : <code>object</code>

<a name="exp_module_Line--exports" id="exp_module_Line--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>LineChartData</code> | The data to attach and generate the chart |

<a name="module_Line--exports.axisTimeCombinations" id="module_Line--exports.axisTimeCombinations"></a>

## axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Line--exports)  
**Example**  
```js
line.xAxisFormat(line.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Line--exports.a11yTitle" id="module_Line--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Line chart".

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Line--exports.a11yDescription" id="module_Line--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Line--exports.a11yDataTable" id="module_Line--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Line--exports.a11yKeyboardNavigation" id="module_Line--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Line--exports.animationDuration" id="module_Line--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Line--exports.xAxisLabel" id="module_Line--exports.xAxisLabel"></a>

## xAxisLabel(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the label of the X axis of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current label of the X axis or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired label for the X axis |

<a name="module_Line--exports.yAxisLabel" id="module_Line--exports.yAxisLabel"></a>

## yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the label of the Y axis of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current label of the Y axis or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired label for the Y axis |

<a name="module_Line--exports.colorSchema" id="module_Line--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | Desired colorSchema for the graph |

<a name="module_Line--exports.colorMap" id="module_Line--exports.colorMap"></a>

## colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
lineChart.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Line--exports.xAxisCustomFormat" id="module_Line--exports.xAxisCustomFormat"></a>

## xAxisCustomFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: localization not supported

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

<a name="module_Line--exports.xAxisFormat" id="module_Line--exports.xAxisFormat"></a>

## xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x axis grouping

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR) Set it to 'custom' to make use of specific formats with xAxisCustomFormat |

**Example**  
```js
line.xAxisCustomFormat(line.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Line--exports.xTicks" id="module_Line--exports.xTicks"></a>

## xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Line--exports.grid" id="module_Line--exports.grid"></a>

## grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Line--exports.hasMinimumValueScale" id="module_Line--exports.hasMinimumValueScale"></a>

## hasMinimumValueScale(_x) ⇒ <code>hasMinimumValueScale</code> \| <code>module</code>
Gets or Sets the hasMinimumValueScale property of the chart, making yAxix bottom value
to adjust to the minimum dataset value.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>hasMinimumValueScale</code> \| <code>module</code> - Current hasMinimumValueScale flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired minimum value flag |

<a name="module_Line--exports.height" id="module_Line--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Line--exports.isAnimated" id="module_Line--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | = false     Desired animation flag |

<a name="module_Line--exports.lines" id="module_Line--exports.lines"></a>

## lines(_x) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>module</code>
Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
onto the chart with a specific color and a text annotation over the line.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Array.&lt;Object&gt;</code> \| <code>module</code> - Current lines or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;object&gt;</code> | Array of Objects describing the lines |

**Example**  
```js
line.lines([{
  y: 2,
  name: 'Maximum threshold',
  color: '#ff0000'
}])
```
<a name="module_Line--exports.lineCurve" id="module_Line--exports.lineCurve"></a>

## lineCurve(_x) ⇒ <code>curve</code> \| <code>module</code>
Gets or Sets the curve of the line chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>curve</code> \| <code>module</code> - Current line curve or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>curve</code> | Desired curve for the lines, default 'linear'. Other options are: basis, natural, monotoneX, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

<a name="module_Line--exports.lineGradient" id="module_Line--exports.lineGradient"></a>

## lineGradient(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the gradient colors of the line chart when there is only one line

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current color gradient or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | Desired color gradient for the line (array of two hexadecimal numbers) |

<a name="module_Line--exports.isLoading" id="module_Line--exports.isLoading"></a>

## isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Line--exports.locale" id="module_Line--exports.locale"></a>

## locale(_x) ⇒ <code>string</code> \| <code>module</code>
Pass language tag for the tooltip to localize the date.
Uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | A language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Line--exports.margin" id="module_Line--exports.margin"></a>

## margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin object of the chart (top, bottom, left and right)

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Line--exports.numberFormat" id="module_Line--exports.numberFormat"></a>

## numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the line chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://d3js.org/d3-format) |

<a name="module_Line--exports.shouldShowAllDataPoints" id="module_Line--exports.shouldShowAllDataPoints"></a>

## shouldShowAllDataPoints(_x) ⇒ <code>shouldShowAllDataPoints</code> \| <code>module</code>
Gets or Sets whether every data point shows its marker, not just the hovered ones

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>shouldShowAllDataPoints</code> \| <code>module</code> - Current shouldShowAllDataPoints or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Whether all data points should be drawn |

<a name="module_Line--exports.tooltipThreshold" id="module_Line--exports.tooltipThreshold"></a>

## tooltipThreshold(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltip threshold or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired tooltip threshold for the graph |

<a name="module_Line--exports.yAxisLabelPadding" id="module_Line--exports.yAxisLabelPadding"></a>

## yAxisLabelPadding(_x&#x3D;) ⇒ <code>yAxisLabelPadding</code> \| <code>module</code>
Gets or Sets the yAxisLabelPadding of the chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>yAxisLabelPadding</code> \| <code>module</code> - Current yAxisLabelPadding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x= | <code>number</code> | 36                 Desired yAxisLabelPadding for the graph |

<a name="module_Line--exports.yTicks" id="module_Line--exports.yTicks"></a>

## yTicks(_x) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | = 5     Desired yTicks |

<a name="module_Line--exports.width" id="module_Line--exports.width"></a>

## width(_x) ⇒ <code>number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>Module</code> - Current width or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Line--exports.exportChart" id="module_Line--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>string</code> | Title to add at the top of the exported picture |

<a name="module_Line--exports.on" id="module_Line--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseHover, customMouseMove, customMouseOut,
customDataEntryClick, and customTouchMove

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Line--exports.xAxisValueType" id="module_Line--exports.xAxisValueType"></a>

## xAxisValueType([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisValueType`.
Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
be dates anymore, but can be arbitrary numbers.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;date&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
line.xAxisValueType('number')
```
<a name="module_Line--exports.xAxisScale" id="module_Line--exports.xAxisScale"></a>

## xAxisScale([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisScale`.
Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
'number' as well, otherwise it won't influence the visualization.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;linear&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
line.xAxisValueType('number').xAxisScale('logarithmic')
```
<a name="module_Line--exports..D3Selection" id="module_Line--exports..D3Selection"></a>

## exports~D3Selection : <code>Array.&lt;Array&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Line--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | Size of the selection |
| parentNode | <code>DOMElement</code> | Parent of the selection |

<a name="module_Line--exports..LineChartFlatData" id="module_Line--exports..LineChartFlatData"></a>

## exports~LineChartFlatData : <code>object</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Line--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| topicName | <code>string</code> | Topic name (required) |
| topic | <code>number</code> | Topic identifier (required) |
| dates | <code>Array.&lt;object&gt;</code> | All date entries with values for that topic in ISO8601 format (required) |

**Example**  
```js
[
    {
        topicName: 'San Francisco',
        name: 123,
        date: '2017-01-16T16:00:00-08:00',
        value: 1
    }
]
```
<a name="module_Line--exports..LineChartDataSorted" id="module_Line--exports..LineChartDataSorted"></a>

## exports~LineChartDataSorted : <code>Array.&lt;object&gt;</code>
The Data Sorted is calculated internally in the chart in order to pass it to our tooltips

**Kind**: inner typedef of [<code>exports</code>](#exp_module_Line--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | | number        Date in ISO8601 format or number (required)] |
| topics | <code>Array.&lt;object&gt;</code> | List of topics with values that date (required) |

**Example**  
```js
[
    {
        date: "2015-06-27T07:00:00.000Z",
        topics: [
            {
                "name": 1,
                "value": 1,
                "topicName": "San Francisco"
            },
            {
                "name": 2,
                "value": 20,
                "topicName": "Los Angeles"
            },
            {
                "name": 3,
                "value": 10,
                "topicName": "Oakland"
            }
        ]
    },
    {...}
]
```
<a name="module_Line--exports..LineChartData" id="module_Line--exports..LineChartData"></a>

## exports~LineChartData : <code>object</code>
The data shape for the line chart.
Up to version 2.10.1 this required a "dataByTopic" array. That shape was
removed in 3.0.0 -- pass the flat dataset described here instead.

**Kind**: inner typedef of [<code>exports</code>](#exp_module_Line--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;LineChartFlatData&gt;</code> | Data values to chart (required) |

**Example**  
```js
{
    data: [
        {
            topicName: 'San Francisco',
            name: 1,
            date: '2017-01-16T16:00:00-08:00',
            value: 1
        },
        {
            topicName: 'San Francisco',
            name: 1,
            date: '2017-01-17T16:00:00-08:00',
            value: 2
        },
        {
            topicName: 'Oakland',
            name: 2,
            date: '2017-01-16T16:00:00-08:00',
            value: 3
        },
        {
            topicName: 'Oakland',
            name: 2,
            date: '2017-01-17T16:00:00-08:00',
            value: 7
        }
    ]
}
```
