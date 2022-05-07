# Modules

<dl>
<dt><a href="#module_Heatmap">Heatmap</a></dt>
<dd><p>Reusable Heatmap API module that renders a
simple and configurable heatmap chart.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#HeatmapData">HeatmapData</a> : <code>Array.&lt;Array&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Heatmap"></a>

# Heatmap
Reusable Heatmap API module that renders a
simple and configurable heatmap chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let heatmap = heatmap();

heatmap
    .width(500);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(heatmap);
```

* [Heatmap](#module_Heatmap)
    * [exports(_selection, _data)](#exp_module_Heatmap--exports) ⏏
        * [.animationDuration(_x)](#module_Heatmap--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
        * [.boxSize(_x)](#module_Heatmap--exports.boxSize) ⇒ <code>Number</code> \| <code>module</code>
        * [.colorSchema(_x)](#module_Heatmap--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
        * [.exportChart(filename, title)](#module_Heatmap--exports.exportChart)
        * [.height(_x)](#module_Heatmap--exports.height) ⇒ <code>Number</code> \| <code>module</code>
        * [.isAnimated(_x)](#module_Heatmap--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.margin(_x)](#module_Heatmap--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
        * [.on()](#module_Heatmap--exports.on) ⇒ <code>module</code>
        * [.yAxisLabels(_x)](#module_Heatmap--exports.yAxisLabels) ⇒ <code>yAxisLabels</code> \| <code>module</code>
        * [.width(_x)](#module_Heatmap--exports.width) ⇒ <code>Number</code> \| <code>module</code>

<a name="exp_module_Heatmap--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>HeatmapData</code>](#HeatmapData) | The data to attach and generate the chart |

<a name="module_Heatmap--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Heatmap--exports.boxSize"></a>

### exports.boxSize(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the boxSize of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current boxSize or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>30</code> | Desired boxSize for the heatmap boxes |

<a name="module_Heatmap--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>britecharts-red</code> | Desired colorSchema for the heatma boxes |

<a name="module_Heatmap--exports.exportChart"></a>

### exports.exportChart(filename, title)
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Heatmap--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>270</code> | Desired height for the chart |

<a name="module_Heatmap--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated value of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Decide whether to show chart animation |

<a name="module_Heatmap--exports.margin"></a>

### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Heatmap--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Heatmap--exports.yAxisLabels"></a>

### exports.yAxisLabels(_x) ⇒ <code>yAxisLabels</code> \| <code>module</code>
Gets or Sets the y-axis labels of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>yAxisLabels</code> \| <code>module</code> - Current yAxisLabels array or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>[&#x27;Mo&#x27;,</code> | 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']     An array of string labels across the y-axis |

<a name="module_Heatmap--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>780</code> | Desired width for the chart |

<a name="HeatmapData"></a>

# HeatmapData : <code>Array.&lt;Array&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| week | <code>Number</code> | 
| day | <code>Number</code> | 
| value | <code>Number</code> | 

**Example**  
```js
[
    {
        day: 0,
        hour: 0,
        value: 7
    },
    {
        day: 0,
        hour: 1,
        value: 10
    }
]
```
