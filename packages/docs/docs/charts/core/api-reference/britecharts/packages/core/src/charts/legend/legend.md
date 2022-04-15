# Modules

<dl>
<dt><a href="#module_Legend">Legend</a></dt>
<dd><p>Legend Component reusable API class that renders a
simple and configurable legend element.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#LegendChartData">LegendChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Legend"></a>

# Legend
Legend Component reusable API class that renders a
simple and configurable legend element.

**Requires**: <code>module:d3-format,</code>  
**Example**  
```js
const donutChart = donut(),
    legendBox = legend();

donutChart
    .externalRadius(500)
    .internalRadius(200)
    .on('customMouseOver', function(data) {
        legendBox.highlight(data.data.id);
    })
    .on('customMouseOut', function() {
        legendBox.clearHighlight();
    });

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(donutChart);

d3Selection.select('.other-css-selector')
    .datum(dataset)
    .call(legendBox);
```

* [Legend](#module_Legend)
    * [exports(_selection, _data)](#exp_module_Legend--exports) ⏏
        * [.clearHighlight()](#module_Legend--exports.clearHighlight)
        * [.colorMap([_x])](#module_Legend--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
        * [.colorSchema([_x])](#module_Legend--exports.colorSchema) ⇒ <code>number</code> \| <code>module</code>
        * [.height([_x])](#module_Legend--exports.height) ⇒ <code>height</code> \| <code>module</code>
        * [.highlight(entryId)](#module_Legend--exports.highlight)
        * [.highlightEntryById([_x])](#module_Legend--exports.highlightEntryById) ⇒ <code>Number</code> \| <code>Module</code>
        * [.isHorizontal([_x])](#module_Legend--exports.isHorizontal) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.margin(_x)](#module_Legend--exports.margin) ⇒ <code>object</code> \| <code>module</code>
        * [.marginRatio([_x])](#module_Legend--exports.marginRatio) ⇒ <code>number</code> \| <code>module</code>
        * [.markerSize([_x])](#module_Legend--exports.markerSize) ⇒ <code>object</code> \| <code>module</code>
        * [.numberFormat(_x)](#module_Legend--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.unit([_x])](#module_Legend--exports.unit) ⇒ <code>String</code> \| <code>module</code>
        * [.width([_x])](#module_Legend--exports.width) ⇒ <code>number</code> \| <code>module</code>

<a name="exp_module_Legend--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>LegendChartData</code>](#LegendChartData) | The data to attach and generate the chart |

<a name="module_Legend--exports.clearHighlight"></a>

### exports.clearHighlight()
Command that clears all highlighted entries on a legend instance

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Access**: public  
<a name="module_Legend--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

<a name="module_Legend--exports.colorSchema"></a>

### exports.colorSchema([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current colorSchema or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>array</code> | <code>colorHelper.colorSchemas.britecharts</code> | Color scheme array to get/set |

<a name="module_Legend--exports.height"></a>

### exports.height([_x]) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>180</code> | Desired width for the chart in pixels |

<a name="module_Legend--exports.highlight"></a>

### exports.highlight(entryId)
Command that highlights a line entry by fading the rest of lines on a legend instance

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| entryId | <code>number</code> | ID of the entry line |

<a name="module_Legend--exports.highlightEntryById"></a>

### exports.highlightEntryById([_x]) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the id of the entry to highlight

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current highlighted slice id or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code></code> | Entry id |

<a name="module_Legend--exports.isHorizontal"></a>

### exports.isHorizontal([_x]) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the horizontal mode on the legend

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is horizontal or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | Desired horizontal mode for the graph |

<a name="module_Legend--exports.margin"></a>

### exports.margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Legend module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Legend--exports.marginRatio"></a>

### exports.marginRatio([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the margin ratio of the legend chart.
Used to determine spacing between legend elements.

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current marginRatio or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>1.5</code> | Margin Ratio to get/set |

<a name="module_Legend--exports.markerSize"></a>

### exports.markerSize([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the markerSize of the legend chart.
This markerSize will determine the horizontal and vertical size of the colored marks
added as color identifiers for the chart's categories.

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current markerSize or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code>16</code> | Margin object to get/set |

<a name="module_Legend--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current number format or Legend module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = 's'      Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Legend--exports.unit"></a>

### exports.unit([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the unit of the value

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current unit or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;&#x27;</code> | Desired unit |

<a name="module_Legend--exports.width"></a>

### exports.width([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the width of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current width or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>320</code> | Desired width for the graph in pixels |

<a name="LegendChartData"></a>

# LegendChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | Id of the group (required) |
| name | <code>String</code> | Name of the group (required) |
| quantity | <code>Number</code> | Quantity of the group (optional) |

**Example**  
```js
[
    {
        id: 1,
        quantity: 2,
        name: 'glittering'
    },
    {
        id: 2,
        quantity: 3,
        name: 'luminous'
    }
]
```
