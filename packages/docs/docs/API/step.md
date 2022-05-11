<a name="module_Step"></a>

# ~~Step~~
***Deprecated***

Step Chart reusable API class that renders a
simple and configurable step chart.
NOTE: We will be deprecating this chart soon

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
const stepChart= step();

stepChart
    .height(500)
    .width(800);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(stepChart);
```

* ~~[Step](#module_Step)~~
    * ~~[exports(_selection, _data)](#exp_module_Step--exports) ⏏~~
        * _static_
            * [.exportChart(filename, title)](#module_Step--exports.exportChart) ⇒ <code>Promise</code>
            * [.margin(_x)](#module_Step--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Step--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.height(_x)](#module_Step--exports.height) ⇒ <code>height</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Step--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.on()](#module_Step--exports.on) ⇒ <code>module</code>
            * [.width(_x)](#module_Step--exports.width) ⇒ <code>width</code> \| <code>module</code>
            * [.xAxisLabel(_x)](#module_Step--exports.xAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.xAxisLabelOffset(_x)](#module_Step--exports.xAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Step--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset(_x)](#module_Step--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
        * _inner_
            * [~StepChartData](#module_Step--exports..StepChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Step--exports"></a>

## ~~exports(_selection, _data) ⏏~~
***Deprecated***

This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>StepChartData</code> | The data to attach and generate the chart |

<a name="module_Step--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Step--exports.margin"></a>

### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Step--exports.yTicks"></a>

### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks on the chart
(Default is 6)

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired number of vertical ticks for the graph |

<a name="module_Step--exports.height"></a>

### exports.height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Step--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Step--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove and customMouseOut

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Step--exports.width"></a>

### exports.width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Step--exports.xAxisLabel"></a>

### exports.xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>String</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Step--exports.xAxisLabelOffset"></a>

### exports.xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Step--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>String</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Step--exports.yAxisLabelOffset"></a>

### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Step--exports..StepChartData"></a>

### exports~StepChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Step--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Key we measure (required) |
| value | <code>Number</code> | value of the key (required) |

**Example**  
```js
[
    {
        value: 1,
        key: 'glittering'
    },
    {
        value: 1,
        key: 'luminous'
    }
]
```
