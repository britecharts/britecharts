<a name="module_Brush"></a>

# Brush
Brush Chart reusable API class that renders a
simple and configurable brush chart.

**Requires**: <code>module:d3-array</code>, <code>module:d3-axis</code>, <code>module:d3-brush</code>, <code>module:d3-ease</code>, <code>module:d3-scale</code>, <code>module:d3-shape</code>, <code>module:d3-dispatch</code>, <code>module:d3-selection</code>, <code>module:d3-time</code>, <code>module:d3-transition</code>, <code>module:d3-time-format</code>  
**Example**  
```js
let brushChart = brush();

brushChart
    .height(500)
    .width(800);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(brushChart);
```

* [Brush](#module_Brush)
    * [exports(_selection, _data)](#exp_module_Brush--exports) ⏏
        * _static_
            * [.axisTimeCombinations](#module_Brush--exports.axisTimeCombinations)
            * [.animationDuration(_x)](#module_Brush--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.areaCurve([_x])](#module_Brush--exports.areaCurve) ⇒ <code>String</code> \| <code>module</code>
            * [.dateRange([_x])](#module_Brush--exports.dateRange) ⇒ <code>dateRange</code> \| <code>module</code>
            * [.gradient([_x])](#module_Brush--exports.gradient) ⇒ <code>String</code> \| <code>Module</code>
            * [.height(_x)](#module_Brush--exports.height) ⇒ <code>Number</code> \| <code>Module</code>
            * [.isAnimated(_x)](#module_Brush--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Brush--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.isLocked(_x)](#module_Brush--exports.isLocked) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.locale(_x)](#module_Brush--exports.locale) ⇒ <code>String</code> \| <code>Module</code>
            * [.margin(_x)](#module_Brush--exports.margin) ⇒ <code>Object</code> \| <code>Module</code>
            * [.on(typenames, [callback])](#module_Brush--exports.on) ⇒ [<code>exports</code>](#exp_module_Brush--exports)
            * [.width(_x)](#module_Brush--exports.width) ⇒ <code>Number</code> \| <code>Module</code>
            * [.xAxisCustomFormat(_x)](#module_Brush--exports.xAxisCustomFormat) ⇒ <code>String</code> \| <code>Module</code>
            * [.xAxisFormat(_x)](#module_Brush--exports.xAxisFormat) ⇒ <code>String</code> \| <code>Module</code>
            * [.xTicks([_x])](#module_Brush--exports.xTicks) ⇒ <code>Number</code> \| <code>Module</code>
            * [.roundingTimeInterval([_x])](#module_Brush--exports.roundingTimeInterval) ⇒ <code>roundingTimeInterval</code> \| <code>Module</code>
        * _inner_
            * ["customBrushStart"](#event_customBrushStart)
            * ["customBrushEnd"](#event_customBrushEnd)
            * [~BrushChartData](#module_Brush--exports..BrushChartData) : <code>Array.&lt;Object&gt;</code>
            * [~DateExtent](#module_Brush--exports..DateExtent) : <code>Array.&lt;Date&gt;</code>
            * [~eventCallback](#module_Brush--exports..eventCallback) : <code>function</code>

<a name="exp_module_Brush--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>BrushChartData</code> | The data to attach and generate the chart |

<a name="module_Brush--exports.axisTimeCombinations"></a>

### exports.axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Brush--exports)  
**Example**  
```js
brush.xAxisCustomFormat(brush.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Brush--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the area animation

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Brush--exports.areaCurve"></a>

### exports.areaCurve([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the area curve of the stacked area.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current area curve setting or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;basis&#x27;</code> | Desired curve for the area. Other options are: monotoneX, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

**Example**  
```js
brushChart.areaCurve('step')
```
<a name="module_Brush--exports.dateRange"></a>

### exports.dateRange([_x]) ⇒ <code>dateRange</code> \| <code>module</code>
Gets or Sets the dateRange for the selected part of the brush

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>dateRange</code> \| <code>module</code> - Current dateRange or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Array.&lt;String&gt;</code> | <code>[null, null]</code> | Desired dateRange for the graph |

<a name="module_Brush--exports.gradient"></a>

### exports.gradient([_x]) ⇒ <code>String</code> \| <code>Module</code>
Gets or Sets the gradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current gradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Array.&lt;String&gt;</code> | <code>colorHelper.colorGradients.greenBlue</code> | Desired gradient for the graph |

<a name="module_Brush--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Brush--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Brush--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Brush--exports.isLocked"></a>

### exports.isLocked(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isLocked property of the brush, enforcing the initial brush size set with dateRange

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isLocked flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Whether the brush window is locked, requires a value set with '.dateRange` when true |

<a name="module_Brush--exports.locale"></a>

### exports.locale(_x) ⇒ <code>String</code> \| <code>Module</code>
Pass language tag for the tooltip to localize the date.
Feature uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current locale or module to chain calls  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Must be a language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Brush--exports.margin"></a>

### exports.margin(_x) ⇒ <code>Object</code> \| <code>Module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Object</code> \| <code>Module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Brush--exports.on"></a>

### exports.on(typenames, [callback]) ⇒ [<code>exports</code>](#exp_module_Brush--exports)
Adds, removes, or gets the callback for the specified typenames.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Access**: public  
**See**: [d3-dispatch:on](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on)  

| Param | Type | Description |
| --- | --- | --- |
| typenames | <code>String</code> | One or more event type names, delimited by a space |
| [callback] | [<code>eventCallback</code>](#module_Brush--exports..eventCallback) | Callback to register |

<a name="module_Brush--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Brush--exports.xAxisCustomFormat"></a>

### exports.xAxisCustomFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

<a name="module_Brush--exports.xAxisFormat"></a>

### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x axis grouping

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR) Set it to 'custom' to make use of specific formats with xAxisCustomFormat |

**Example**  
```js
brushChart.xAxisCustomFormat(brushChart.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Brush--exports.xTicks"></a>

### exports.xTicks([_x]) ⇒ <code>Number</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisCustomFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code></code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Brush--exports.roundingTimeInterval"></a>

### exports.roundingTimeInterval([_x]) ⇒ <code>roundingTimeInterval</code> \| <code>Module</code>
Gets or Sets the rounding time interval of the selection boundary

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>roundingTimeInterval</code> \| <code>Module</code> - Current time interval or module to chain calls  
**Access**: public  
**See**: [https://github.com/d3/d3-time#intervals](https://github.com/d3/d3-time#intervals)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>roundingTimeInterval</code> | <code>&#x27;timeDay&#x27;</code> | Desired time interval for the selection, default 'timeDay'. |

**Example**  
```js
All options are:
timeMillisecond, utcMillisecond, timeSecond, utcSecond, timeMinute, utcMinute, timeHour, utcHour, timeDay, utcDay
timeWeek, utcWeek, timeSunday, utcSunday, timeMonday, utcMonday, timeTuesday, utcTuesday, timeWednesday,
utcWednesday, timeThursday, utcThursday, timeFriday, utcFriday, timeSaturday, utcSaturday, timeMonth, utcMonth,
timeYear and utcYear.
```
<a name="event_customBrushStart"></a>

### "customBrushStart"
Event indicating when the brush moves

**Kind**: event emitted by [<code>exports</code>](#exp_module_Brush--exports)  
**See**: [d3-brush:on(brush)](https://github.com/d3/d3-brush#brush_on)  
<a name="event_customBrushEnd"></a>

### "customBrushEnd"
Event indicating the end of a brush gesture

**Kind**: event emitted by [<code>exports</code>](#exp_module_Brush--exports)  
**See**: [d3-brush:on(end)](https://github.com/d3/d3-brush#brush_on)  
<a name="module_Brush--exports..BrushChartData"></a>

### exports~BrushChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Brush--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | Value to chart (required) |
| date | <code>Date</code> | Date of the value in ISO8601 format (required) |

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
<a name="module_Brush--exports..DateExtent"></a>

### exports~DateExtent : <code>Array.&lt;Date&gt;</code>
Date range

**Kind**: inner typedef of [<code>exports</code>](#exp_module_Brush--exports)  
**See**: [d3-brush:brushSelection](https://github.com/d3/d3-brush#brushSelection)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Date</code> | Lower bound date selection |
| 1 | <code>Date</code> | Upper bound date selection |

<a name="module_Brush--exports..eventCallback"></a>

### exports~eventCallback : <code>function</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Brush--exports)  

| Param | Type | Description |
| --- | --- | --- |
| dateExtent | [<code>DateExtent</code>](#module_Brush--exports..DateExtent) | Date range |

