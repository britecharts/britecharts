# Modules

<dl>
<dt><a href="#module_Line">Line</a></dt>
<dd><p>Line Chart reusable API module that allows us
rendering a multi line and configurable chart.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#D3Selection">D3Selection</a> : <code>Array.&lt;Array&gt;</code></dt>
<dd></dd>
<dt><a href="#LineChartFlatData">LineChartFlatData</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#LineChartDataByTopic">LineChartDataByTopic</a> : <code>object</code></dt>
<dd><p>Former data standard, it is currently calculated internally if not passed</p>
</dd>
<dt><a href="#LineChartDataSorted">LineChartDataSorted</a> : <code>Array.&lt;object&gt;</code></dt>
<dd><p>The Data Sorted is calculated internally in the chart in order to pass it to our tooltips</p>
</dd>
<dt><a href="#LineChartData">LineChartData</a> : <code>object</code></dt>
<dd><p>The data shape for the line chart.
Note that up to version 2.10.1, this required a &quot;dataByTopic&quot; array described on LineChartDataByTopic.
The &quot;dataByTopic&quot; schema still works, but we prefer a flat dataset as described here.</p>
</dd>
</dl>

<a name="module_Line"></a>

# Line
Line Chart reusable API module that allows us
rendering a multi line and configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let lineChart = line();

lineChart
    .width(500);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(lineChart);
```

* [Line](#module_Line)
    * [exports(_selection, _data)](#exp_module_Line--exports) ⏏
        * [.axisTimeCombinations](#module_Line--exports.axisTimeCombinations)
        * [.animationDuration(_x)](#module_Line--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
        * [.xAxisLabel(_x)](#module_Line--exports.xAxisLabel) ⇒ <code>string</code> \| <code>module</code>
        * [.yAxisLabel(_x)](#module_Line--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.colorSchema(_x)](#module_Line--exports.colorSchema) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
        * [.colorMap([_x])](#module_Line--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
        * ~~[.dateLabel(_x)](#module_Line--exports.dateLabel) ⇒ <code>number</code> \| <code>module</code>~~
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
        * ~~[.topicLabel(_x)](#module_Line--exports.topicLabel) ⇒ <code>topicLabel</code> \| <code>module</code>~~
        * ~~[.valueLabel(_x)](#module_Line--exports.valueLabel) ⇒ <code>valueLabel</code> \| <code>module</code>~~
        * [.yAxisLabelPadding(_x&#x3D;)](#module_Line--exports.yAxisLabelPadding) ⇒ <code>yAxisLabelPadding</code> \| <code>module</code>
        * [.yTicks(_x)](#module_Line--exports.yTicks) ⇒ <code>number</code> \| <code>module</code>
        * [.width(_x)](#module_Line--exports.width) ⇒ <code>number</code> \| <code>Module</code>
        * [.exportChart(filename, title)](#module_Line--exports.exportChart) ⇒ <code>Promise</code>
        * [.on()](#module_Line--exports.on) ⇒ <code>module</code>
        * [.xAxisValueType([_x])](#module_Line--exports.xAxisValueType) ⇒ <code>string</code> \| <code>module</code>
        * [.xAxisScale([_x])](#module_Line--exports.xAxisScale) ⇒ <code>string</code> \| <code>module</code>

<a name="exp_module_Line--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>LineChartData</code>](#LineChartData) | The data to attach and generate the chart |

<a name="module_Line--exports.axisTimeCombinations"></a>

### exports.axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Line--exports)  
**Example**  
```js
line.xAxisFormat(line.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Line--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Line--exports.xAxisLabel"></a>

### exports.xAxisLabel(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the label of the X axis of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current label of the X axis or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired label for the X axis |

<a name="module_Line--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the label of the Y axis of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current label of the Y axis or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired label for the Y axis |

<a name="module_Line--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | Desired colorSchema for the graph |

<a name="module_Line--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
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
<a name="module_Line--exports.dateLabel"></a>

### ~~exports.dateLabel(_x) ⇒ <code>number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired dateLabel for the graph |

<a name="module_Line--exports.xAxisCustomFormat"></a>

### exports.xAxisCustomFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: localization not supported

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

<a name="module_Line--exports.xAxisFormat"></a>

### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
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
<a name="module_Line--exports.xTicks"></a>

### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Line--exports.grid"></a>

### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Line--exports.hasMinimumValueScale"></a>

### exports.hasMinimumValueScale(_x) ⇒ <code>hasMinimumValueScale</code> \| <code>module</code>
Gets or Sets the hasMinimumValueScale property of the chart, making yAxix bottom value
to adjust to the minimum dataset value.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>hasMinimumValueScale</code> \| <code>module</code> - Current hasMinimumValueScale flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired minimum value flag |

<a name="module_Line--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Line--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | = false     Desired animation flag |

<a name="module_Line--exports.lines"></a>

### exports.lines(_x) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>module</code>
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
<a name="module_Line--exports.lineCurve"></a>

### exports.lineCurve(_x) ⇒ <code>curve</code> \| <code>module</code>
Gets or Sets the curve of the line chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>curve</code> \| <code>module</code> - Current line curve or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>curve</code> | Desired curve for the lines, default 'linear'. Other options are: basis, natural, monotoneX, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

<a name="module_Line--exports.lineGradient"></a>

### exports.lineGradient(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the gradient colors of the line chart when there is only one line

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current color gradient or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | Desired color gradient for the line (array of two hexadecimal numbers) |

<a name="module_Line--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Line--exports.locale"></a>

### exports.locale(_x) ⇒ <code>string</code> \| <code>module</code>
Pass language tag for the tooltip to localize the date.
Uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | A language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Line--exports.margin"></a>

### exports.margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin object of the chart (top, bottom, left and right)

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Line--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the line chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Line--exports.shouldShowAllDataPoints"></a>

### exports.shouldShowAllDataPoints(_x) ⇒ <code>shouldShowAllDataPoints</code> \| <code>module</code>
Gets or Sets the topicLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>shouldShowAllDataPoints</code> \| <code>module</code> - Current shouldShowAllDataPoints or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Whether all data points should be drawn |

<a name="module_Line--exports.tooltipThreshold"></a>

### exports.tooltipThreshold(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltip threshold or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired tooltip threshold for the graph |

<a name="module_Line--exports.topicLabel"></a>

### ~~exports.topicLabel(_x) ⇒ <code>topicLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the topicLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>topicLabel</code> \| <code>module</code> - Current topicLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired topicLabel for the graph |

<a name="module_Line--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>valueLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>valueLabel</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired valueLabel for the graph |

<a name="module_Line--exports.yAxisLabelPadding"></a>

### exports.yAxisLabelPadding(_x&#x3D;) ⇒ <code>yAxisLabelPadding</code> \| <code>module</code>
Gets or Sets the yAxisLabelPadding of the chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>yAxisLabelPadding</code> \| <code>module</code> - Current yAxisLabelPadding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x= | <code>number</code> | 36                 Desired yAxisLabelPadding for the graph |

<a name="module_Line--exports.yTicks"></a>

### exports.yTicks(_x) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | = 5     Desired yTicks |

<a name="module_Line--exports.width"></a>

### exports.width(_x) ⇒ <code>number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>Module</code> - Current width or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Line--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | File title for the resulting picture |
| title | <code>string</code> | Title to add at the top of the exported picture |

<a name="module_Line--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseHover, customMouseMove, customMouseOut,
customDataEntryClick, and customTouchMove

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Line--exports.xAxisValueType"></a>

### exports.xAxisValueType([_x]) ⇒ <code>string</code> \| <code>module</code>
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
line.xAxisValueType('numeric')
```
<a name="module_Line--exports.xAxisScale"></a>

### exports.xAxisScale([_x]) ⇒ <code>string</code> \| <code>module</code>
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
line.xAxisValueType('numeric').xAxisScale('logarithmic')
```
<a name="D3Selection"></a>

# D3Selection : <code>Array.&lt;Array&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | Size of the selection |
| parentNode | <code>DOMElement</code> | Parent of the selection |

<a name="LineChartFlatData"></a>

# LineChartFlatData : <code>object</code>
**Kind**: global typedef  
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
<a name="LineChartDataByTopic"></a>

# LineChartDataByTopic : <code>object</code>
Former data standard, it is currently calculated internally if not passed

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| topicName | <code>string</code> | Topic name (required) |
| topic | <code>number</code> | Topic identifier (required) |
| dates | <code>Array.&lt;object&gt;</code> | All date entries with values for that topic in ISO8601 format (required) |

**Example**  
```js
{
    topicName: 'San Francisco',
    topic: 123,
    dates: [
        {
            date: '2017-01-16T16:00:00-08:00',
            value: 1
        },
        {
            date: '2017-01-16T17:00:00-08:00',
            value: 2
        }
    ]
}
```
<a name="LineChartDataSorted"></a>

# LineChartDataSorted : <code>Array.&lt;object&gt;</code>
The Data Sorted is calculated internally in the chart in order to pass it to our tooltips

**Kind**: global typedef  
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
<a name="LineChartData"></a>

# LineChartData : <code>object</code>
The data shape for the line chart.
Note that up to version 2.10.1, this required a "dataByTopic" array described on LineChartDataByTopic.
The "dataByTopic" schema still works, but we prefer a flat dataset as described here.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;LineChartFlatData&gt;</code>](#LineChartFlatData) | Data values to chart (required) |

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
