<a name="module_Stacked-area"></a>

# Stacked-area
Stacked Area Chart reusable API module that allows us
rendering a multi area and configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let stackedArea = stackedArea();

stackedArea
    .width(containerWidth);

d3Selection.select('.css-selector')
    .datum(dataset.data)
    .call(stackedArea);
```

* [Stacked-area](#module_Stacked-area)
    * [exports(_selection, _data)](#exp_module_Stacked-area--exports) ⏏
        * _static_
            * [.axisTimeCombinations](#module_Stacked-area--exports.axisTimeCombinations)
            * [.animationDuration(_x)](#module_Stacked-area--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.areaCurve([_x])](#module_Stacked-area--exports.areaCurve) ⇒ <code>String</code> \| <code>module</code>
            * [.areaOpacity(_x)](#module_Stacked-area--exports.areaOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Stacked-area--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Stacked-area--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * ~~[.dateLabel(_x)](#module_Stacked-area--exports.dateLabel) ⇒ <code>String</code> \| <code>module</code>~~
            * [.emptyDataConfig(_x)](#module_Stacked-area--exports.emptyDataConfig) ⇒ <code>Object</code> \| <code>module</code>
            * [.grid(_x)](#module_Stacked-area--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.hasOutline(_x)](#module_Stacked-area--exports.hasOutline) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Stacked-area--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Stacked-area--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * ~~[.keyLabel(_x)](#module_Stacked-area--exports.keyLabel) ⇒ <code>Number</code> \| <code>module</code>~~
            * [.margin(_x)](#module_Stacked-area--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
            * [.tooltipThreshold(_x)](#module_Stacked-area--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * [.topicsOrder(_x)](#module_Stacked-area--exports.topicsOrder) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Stacked-area--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.locale(_x)](#module_Stacked-area--exports.locale) ⇒ <code>String</code> \| <code>Module</code>
            * [.exportChart(filename, title)](#module_Stacked-area--exports.exportChart) ⇒ <code>Promise</code>
            * [.on()](#module_Stacked-area--exports.on) ⇒ <code>module</code>
            * ~~[.valueLabel(_x)](#module_Stacked-area--exports.valueLabel) ⇒ <code>Number</code> \| <code>module</code>~~
            * [.width(_x)](#module_Stacked-area--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xAxisCustomFormat(_x)](#module_Stacked-area--exports.xAxisCustomFormat) ⇒ <code>String</code> \| <code>Module</code>
            * [.xAxisFormat(_x)](#module_Stacked-area--exports.xAxisFormat) ⇒ <code>String</code> \| <code>Module</code>
            * [.xAxisValueType([_x])](#module_Stacked-area--exports.xAxisValueType) ⇒ <code>string</code> \| <code>module</code>
            * [.xAxisScale([_x])](#module_Stacked-area--exports.xAxisScale) ⇒ <code>string</code> \| <code>module</code>
            * [.xTicks(_x)](#module_Stacked-area--exports.xTicks) ⇒ <code>Number</code> \| <code>Module</code>
            * [.yAxisLabel(_x)](#module_Stacked-area--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset([_x])](#module_Stacked-area--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks([_x])](#module_Stacked-area--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisBaseline([_x])](#module_Stacked-area--exports.yAxisBaseline) ⇒ <code>Number</code> \| <code>module</code>
        * _inner_
            * [~AreaChartData](#module_Stacked-area--exports..AreaChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Stacked-area--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>AreaChartData</code> | The data to attach and generate the chart |

<a name="module_Stacked-area--exports.axisTimeCombinations"></a>

### exports.axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Example**  
```js
area.xAxisCustomFormat(area.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the area animation

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Stacked-area--exports.areaCurve"></a>

### exports.areaCurve([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the area curve of the stacked area.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current area curve setting or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;monotoneX&#x27;</code> | Desired curve for the stacked area, default 'monotoneX'. Other options are: basis, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

**Example**  
```js
stackedArea.areaCurve('step')
```
<a name="module_Stacked-area--exports.areaOpacity"></a>

### exports.areaOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current opacity or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Opacity to get/set |

<a name="module_Stacked-area--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
stackedArea.colorMap({name: 'colorHex', name2: 'colorString'})
```
<a name="module_Stacked-area--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Stacked-area--exports.dateLabel"></a>

### ~~exports.dateLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired dateLabel for the graph |

<a name="module_Stacked-area--exports.emptyDataConfig"></a>

### exports.emptyDataConfig(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the emptyDataConfig of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current config for when chart data is an empty array  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | emptyDataConfig object to get/set |

<a name="module_Stacked-area--exports.grid"></a>

### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Stacked-area--exports.hasOutline"></a>

### exports.hasOutline(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Enables or disables the outline at the top of the areas

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current state of the flag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = true   Whether if the areas in the chart have an outline at the top |

<a name="module_Stacked-area--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-area--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Stacked-area--exports.keyLabel"></a>

### ~~exports.keyLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the keyLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current keyLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired keyLabel for the graph |

<a name="module_Stacked-area--exports.margin"></a>

### exports.margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Stacked-area--exports.tooltipThreshold"></a>

### exports.tooltipThreshold(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Minimum width of the graph |

<a name="module_Stacked-area--exports.topicsOrder"></a>

### exports.topicsOrder(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Pass an override for the ordering of the topics

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current override order or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Array of the names of your tooltip items |

<a name="module_Stacked-area--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Stacked-area--exports.locale"></a>

### exports.locale(_x) ⇒ <code>String</code> \| <code>Module</code>
Pass language tag for the tooltip to localize the date.
Feature uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | A language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Stacked-area--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Stacked-area--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut,
customDataEntryClick and customTouchMove

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>module</code> - Stacked Area  
**Access**: public  
<a name="module_Stacked-area--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Stacked-area--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-area--exports.xAxisCustomFormat"></a>

### exports.xAxisCustomFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: localization not supported

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

**Example**  
```js
stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.xAxisFormat"></a>

### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x axis grouping

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR) Set it to 'custom' to make use of specific formats with xAxisCustomFormat |

**Example**  
```js
stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.xAxisValueType"></a>

### exports.xAxisValueType([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisValueType`.
Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
be dates anymore, but can be arbitrary numbers.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;date&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
stackedArea.xAxisValueType('numeric')
```
<a name="module_Stacked-area--exports.xAxisScale"></a>

### exports.xAxisScale([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisScale`.
Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
'number' as well, otherwise it won't influence the visualization.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;linear&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
stackedArea.xAxisValueType('numeric').xAxisScale('logarithmic')
```
<a name="module_Stacked-area--exports.xTicks"></a>

### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Stacked-area--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
stackedArea.yAxisLabel('Ticket Sales')
```
<a name="module_Stacked-area--exports.yAxisLabelOffset"></a>

### exports.yAxisLabelOffset([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>-60</code> | Desired offset for the label |

**Example**  
```js
stackedArea.yAxisLabelOffset(-55)
```
<a name="module_Stacked-area--exports.yTicks"></a>

### exports.yTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current vertical ticks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired vertical ticks |

<a name="module_Stacked-area--exports.yAxisBaseline"></a>

### exports.yAxisBaseline([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
(default is 0). Change this value if you don't want to start your area from y=0.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current baseline or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0</code> | Desired baseline of the y axis |

**Example**  
```js
stackedArea.yAxisBaseline(20)
```
<a name="module_Stacked-area--exports..AreaChartData"></a>

### exports~AreaChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | Date of the entry in ISO8601 format (required) |
| name | <code>String</code> | Name of the entry (required) |
| value | <code>Number</code> | Value of the entry (required) |

**Example**  
```js
[
    {
        date: "2011-01-05T00:00:00Z",
        name: "Direct",
        value: 0
    }
]
```
