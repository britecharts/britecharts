<a name="module_Tooltip"></a>

# Tooltip
Tooltip Component reusable API class that renders a
simple and configurable tooltip element for Britechart's
line chart or stacked area chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
const lineChart = line(),
    tooltip = tooltip();

tooltip
    .title('Tooltip title');

lineChart
    .width(500)
    .on('customMouseOver', function() {
         tooltip.show();
    })
    .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
         tooltip.update(dataPoint, topicColorMap, dataPointXPosition);
    })
    .on('customMouseOut', function() {
         tooltip.hide();
    });

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(lineChart);

d3Selection.select('.metadata-group .hover-marker')
    .datum([])
    .call(tooltip);
```

* [Tooltip](#module_Tooltip)
    * [exports(_selection, _data)](#exp_module_Tooltip--exports) ⏏
        * [.axisTimeCombinations](#module_Tooltip--exports.axisTimeCombinations)
        * [.dateFormat(_x)](#module_Tooltip--exports.dateFormat) ⇒ <code>String</code> \| <code>module</code>
        * [.dateCustomFormat(_x)](#module_Tooltip--exports.dateCustomFormat) ⇒ <code>String</code> \| <code>module</code>
        * ~~[.dateLabel(_x)](#module_Tooltip--exports.dateLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.hide()](#module_Tooltip--exports.hide) ⇒ <code>module</code>
        * [.locale(_x)](#module_Tooltip--exports.locale) ⇒ <code>String</code> \| <code>module</code>
        * ~~[.nameLabel(_x)](#module_Tooltip--exports.nameLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.numberFormat(_x)](#module_Tooltip--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.valueFormatter(_x)](#module_Tooltip--exports.valueFormatter) ⇒ <code>function</code> \| <code>module</code>
        * [.shouldShowDateInTitle(_x)](#module_Tooltip--exports.shouldShowDateInTitle) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.show()](#module_Tooltip--exports.show) ⇒ <code>module</code>
        * [.title(_x)](#module_Tooltip--exports.title) ⇒ <code>String</code> \| <code>module</code>
        * [.tooltipOffset(tooltipOffset)](#module_Tooltip--exports.tooltipOffset) ⇒ <code>Object</code> \| <code>module</code>
        * [.topicsOrder(_x)](#module_Tooltip--exports.topicsOrder) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
        * ~~[.topicLabel(_x)](#module_Tooltip--exports.topicLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.update(dataPoint, colorMapping, position)](#module_Tooltip--exports.update) ⇒ <code>Module</code>
        * ~~[.valueLabel(_x)](#module_Tooltip--exports.valueLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.xAxisValueType([_x])](#module_Tooltip--exports.xAxisValueType) ⇒ <code>String</code> \| <code>module</code>

<a name="exp_module_Tooltip--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>Object</code> | The data to attach and generate the chart |

<a name="module_Tooltip--exports.axisTimeCombinations"></a>

### exports.axisTimeCombinations
constants to be used to force the x axis to respect a certain granularity
current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Example**  
```js
tooltip.dateFormat(tooltip.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Tooltip--exports.dateFormat"></a>

### exports.dateFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes the ability to force the tooltip to use a certain date format

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format |

<a name="module_Tooltip--exports.dateCustomFormat"></a>

### exports.dateCustomFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes the ability to use a custom date format

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired custom format |

**Example**  
```js
tooltip.dateFormat(tooltip.axisTimeCombinations.CUSTOM);
tooltip.dateCustomFormat('%H:%M %p')
```
<a name="module_Tooltip--exports.dateLabel"></a>

### ~~exports.dateLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired dateLabel |

<a name="module_Tooltip--exports.hide"></a>

### exports.hide() ⇒ <code>module</code>
Hides the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Tooltip--exports.locale"></a>

### exports.locale(_x) ⇒ <code>String</code> \| <code>module</code>
Pass locale for the tooltip to render the date in

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Must be a locale tag like 'en-US' or 'fr-FR' |

<a name="module_Tooltip--exports.nameLabel"></a>

### ~~exports.nameLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired nameLabel |

<a name="module_Tooltip--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format for the value displayed on the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Tooltip--exports.valueFormatter"></a>

### exports.valueFormatter(_x) ⇒ <code>function</code> \| <code>module</code>
Gets or Sets the formatter function for the value displayed on the tooltip.
Setting this property makes the tooltip ignore numberFormat.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>function</code> \| <code>module</code> - Current valueFormatter or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | Desired formatter function |

**Example**  
```js
tooltipChart.valueFormatter(value => value.toString().length.toString())
```
<a name="module_Tooltip--exports.shouldShowDateInTitle"></a>

### exports.shouldShowDateInTitle(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets shouldShowDateInTitle

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current shouldShowDateInTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired value |

<a name="module_Tooltip--exports.show"></a>

### exports.show() ⇒ <code>module</code>
Shows the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Tooltip--exports.title"></a>

### exports.title(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the title of the tooltip (to only show the date, set a blank title)

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current title or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired title |

<a name="module_Tooltip--exports.tooltipOffset"></a>

### exports.tooltipOffset(tooltipOffset) ⇒ <code>Object</code> \| <code>module</code>
Pass an override for the offset of your tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current tooltipOffset  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| tooltipOffset | <code>Object</code> | Object representing the X and Y offsets |

<a name="module_Tooltip--exports.topicsOrder"></a>

### exports.topicsOrder(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Pass an override for the ordering of your tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current overrideOrder or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Array of the names of your tooltip items |

<a name="module_Tooltip--exports.topicLabel"></a>

### ~~exports.topicLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the topicLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current topicLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired topicLabel |

<a name="module_Tooltip--exports.update"></a>

### exports.update(dataPoint, colorMapping, position) ⇒ <code>Module</code>
Updates the position and content of the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Module</code> - Tooltip module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dataPoint | <code>Object</code> | Datapoint to represent |
| colorMapping | <code>Object</code> | Color scheme of the topics |
| position | <code>Number</code> | X-scale position in pixels |

<a name="module_Tooltip--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired valueLabel |

<a name="module_Tooltip--exports.xAxisValueType"></a>

### exports.xAxisValueType([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the `xAxisValueType` of the data. Choose between 'date' and 'number'. When set to
number, the x-Axis values won't be parsed as dates anymore, but as numbers.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current keyType or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;date&#x27;</code> | Desired keyType |

