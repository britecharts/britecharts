<a name="module_Mini-tooltip"></a>

# Mini-tooltip
Mini Tooltip Component reusable API class that renders a
simple and configurable tooltip element for Britechart's
bar and step chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
const barChart = line(),
    miniTooltip = miniTooltip();

barChart
    .width(500)
    .height(300)
    .on('customMouseHover', miniTooltip.show)
    .on('customMouseMove', miniTooltip.update)
    .on('customMouseOut', miniTooltip.hide);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(barChart);

d3Selection.select('.metadata-group .mini-tooltip-container')
    .datum([])
    .call(miniTooltip);
```

* [Mini-tooltip](#module_Mini-tooltip)
    * [exports(_selection)](#exp_module_Mini-tooltip--exports) ⏏
        * [.hide()](#module_Mini-tooltip--exports.hide) ⇒ <code>Module</code>
        * ~~[.nameLabel(_x)](#module_Mini-tooltip--exports.nameLabel) ⇒ <code>text</code> \| <code>module</code>~~
        * [.numberFormat(_x)](#module_Mini-tooltip--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.valueFormatter(_x)](#module_Mini-tooltip--exports.valueFormatter) ⇒ <code>function</code> \| <code>module</code>
        * [.show()](#module_Mini-tooltip--exports.show) ⇒ <code>Module</code>
        * [.title(_x)](#module_Mini-tooltip--exports.title) ⇒ <code>string</code> \| <code>module</code>
        * [.update(dataPoint, mousePosition, chartSize)](#module_Mini-tooltip--exports.update) ⇒ <code>module</code>
        * ~~[.valueLabel(_x)](#module_Mini-tooltip--exports.valueLabel) ⇒ <code>text</code> \| <code>module</code>~~

<a name="exp_module_Mini-tooltip--exports"></a>

## exports(_selection) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |

<a name="module_Mini-tooltip--exports.hide"></a>

### exports.hide() ⇒ <code>Module</code>
Hides the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>Module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Mini-tooltip--exports.nameLabel"></a>

### ~~exports.nameLabel(_x) ⇒ <code>text</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets data's nameLabel

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>text</code> \| <code>module</code> - nameLabel or Step Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>text</code> | Desired nameLabel |

<a name="module_Mini-tooltip--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format for the value displayed on the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = '.2f'      Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Mini-tooltip--exports.valueFormatter"></a>

### exports.valueFormatter(_x) ⇒ <code>function</code> \| <code>module</code>
Gets or Sets the formatter function for the value displayed on the tooltip.
Setting this property makes the tooltip ignore numberFormat. Set by default to
d3-format formatter with numberFormat.

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>function</code> \| <code>module</code> - Current valueFormatter or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | Desired formatter function |

**Example**  
```js
tooltipChart.valueFormatter(value => value.toString().length.toString())
```
<a name="module_Mini-tooltip--exports.show"></a>

### exports.show() ⇒ <code>Module</code>
Shows the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>Module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Mini-tooltip--exports.title"></a>

### exports.title(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the title of the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current title or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired title |

<a name="module_Mini-tooltip--exports.update"></a>

### exports.update(dataPoint, mousePosition, chartSize) ⇒ <code>module</code>
Updates the position and content of the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>module</code> - Current component  

| Param | Type | Description |
| --- | --- | --- |
| dataPoint | <code>Object</code> | Datapoint of the hovered element |
| mousePosition | <code>Array</code> | Mouse position relative to the parent chart [x, y] |
| chartSize | <code>Array</code> | Parent chart size [x, y] |

<a name="module_Mini-tooltip--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>text</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets data's valueLabel

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>text</code> \| <code>module</code> - valueLabel or Step Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>text</code> | Desired valueLabel |

