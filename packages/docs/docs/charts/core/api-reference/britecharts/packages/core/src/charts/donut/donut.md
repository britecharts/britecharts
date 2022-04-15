# Modules

<dl>
<dt><a href="#module_Donut">Donut</a></dt>
<dd><p>Reusable Donut Chart API class that renders a
simple and configurable donut chart.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#DonutChartData">DonutChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Donut"></a>

# Donut
Reusable Donut Chart API class that renders a
simple and configurable donut chart.

**Requires**: <code>module:d3-dispatch,</code>  
**Example**  
```js
const donutChart = donut();

donutChart
    .externalRadius(500)
    .internalRadius(200);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(donutChart);
```

* [Donut](#module_Donut)
    * [exports(_selection, _data)](#exp_module_Donut--exports) ⏏
        * [.animationDuration(_x)](#module_Donut--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
        * [.centeredTextFunction(_x)](#module_Donut--exports.centeredTextFunction) ⇒ <code>function</code> \| <code>module</code>
        * [.colorMap([_x])](#module_Donut--exports.colorMap) ⇒ <code>number</code> \| <code>module</code>
        * [.colorSchema(_x)](#module_Donut--exports.colorSchema) ⇒ <code>String</code> \| <code>module</code>
        * [.emptyDataConfig(_x)](#module_Donut--exports.emptyDataConfig) ⇒ <code>Object</code> \| <code>module</code>
        * [.exportChart(filename, title)](#module_Donut--exports.exportChart) ⇒ <code>Promise</code>
        * [.externalRadius(_x)](#module_Donut--exports.externalRadius) ⇒ <code>Number</code> \| <code>Module</code>
        * [.hasCenterLegend(_x)](#module_Donut--exports.hasCenterLegend) ⇒ <code>boolean</code> \| <code>Module</code>
        * [.hasHoverAnimation(_x)](#module_Donut--exports.hasHoverAnimation) ⇒ <code>boolean</code> \| <code>module</code>
        * [.hasFixedHighlightedSlice(_x)](#module_Donut--exports.hasFixedHighlightedSlice) ⇒ <code>boolean</code> \| <code>module</code>
        * [.hasLastHoverSliceHighlighted(_x)](#module_Donut--exports.hasLastHoverSliceHighlighted) ⇒ <code>boolean</code> \| <code>module</code>
        * [.height(_x)](#module_Donut--exports.height) ⇒ <code>Number</code> \| <code>Module</code>
        * [.highlightSliceById(_x)](#module_Donut--exports.highlightSliceById) ⇒ <code>Number</code> \| <code>Module</code>
        * [.internalRadius(_x)](#module_Donut--exports.internalRadius) ⇒ <code>Number</code> \| <code>Module</code>
        * [.isAnimated(_x)](#module_Donut--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.isLoading(flag)](#module_Donut--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
        * [.margin(_x)](#module_Donut--exports.margin) ⇒ <code>Object</code> \| <code>Module</code>
        * [.numberFormat(_x)](#module_Donut--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.on()](#module_Donut--exports.on) ⇒ <code>module</code>
        * [.orderingFunction(_x)](#module_Donut--exports.orderingFunction) ⇒ <code>function</code> \| <code>Module</code>
        * [.percentageFormat(_x)](#module_Donut--exports.percentageFormat) ⇒ <code>Number</code> \| <code>Module</code>
        * [.radiusHoverOffset(_x)](#module_Donut--exports.radiusHoverOffset) ⇒ <code>Number</code> \| <code>Module</code>
        * [.width(_x)](#module_Donut--exports.width) ⇒ <code>Number</code> \| <code>Module</code>

<a name="exp_module_Donut--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>DonutChartData</code>](#DonutChartData) | The data to attach and generate the chart |

<a name="module_Donut--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Donut--exports.centeredTextFunction"></a>

### exports.centeredTextFunction(_x) ⇒ <code>function</code> \| <code>module</code>
Gets or Sets the centeredTextFunction of the chart. If function is provided
the format will be changed by the custom function's value format.
The default format function value is "${d.percentage}% ${d.name}".
The callback will provide the data object with id, name, percentage, and quantity.
Also provides the component added by the user in each data entry.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>function</code> \| <code>module</code> - Current centeredTextFunction or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | Custom function that returns a formatted string |

**Example**  
```js
donutChart.centeredTextFunction(d => `${d.id} ${d.quantity}`)
```
<a name="module_Donut--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
stackedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Donut--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Donut--exports.emptyDataConfig"></a>

### exports.emptyDataConfig(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity
adds up to zero or there are no entries), the chart will render an empty slice
with a given color (light gray by default)

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current config for when chart data is an empty array  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | EmptyDataConfig object to get/set |

**Example**  
```js
donutChart.emptyDataConfig({showEmptySlice: true, emptySliceColor: '#000000'})
```
<a name="module_Donut--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Donut--exports.externalRadius"></a>

### exports.externalRadius(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the externalRadius of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current externalRadius or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | ExternalRadius number to get/set |

<a name="module_Donut--exports.hasCenterLegend"></a>

### exports.hasCenterLegend(_x) ⇒ <code>boolean</code> \| <code>Module</code>
Gets or Sets the hasCenterLegend property of the chart, making it display
legend at the center of the donut.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>Module</code> - Current hasCenterLegend flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | If we want to show legent at the center of the donut |

<a name="module_Donut--exports.hasHoverAnimation"></a>

### exports.hasHoverAnimation(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasHoverAnimation property of the chart. By default,
donut chart highlights the hovered slice. This property explicitly
disables this hover behavior.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasHoverAnimation flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Decide whether hover slice animation should be enabled |

<a name="module_Donut--exports.hasFixedHighlightedSlice"></a>

### exports.hasFixedHighlightedSlice(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
highlight the selected slice id set with `highlightSliceById` all the time.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasFixedHighlightedSlice flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | If we want to make the highlighted slice permanently highlighted |

<a name="module_Donut--exports.hasLastHoverSliceHighlighted"></a>

### exports.hasLastHoverSliceHighlighted(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or sets the hasLastHoverSliceHighlighted property.
If property is true, the last hovered slice will be highlighted
after 'mouseout` event is triggered. The last hovered slice will remain
in highlight state.
Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted
are true, the latter property will override the former.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasLastHoverSliceHighlighted value or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Decide whether the last hovered slice should be highlighted |

<a name="module_Donut--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current height or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Donut--exports.highlightSliceById"></a>

### exports.highlightSliceById(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the id of the slice to highlight

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current highlighted slice id or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Slice id |

<a name="module_Donut--exports.internalRadius"></a>

### exports.internalRadius(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the internalRadius of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current internalRadius or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | InternalRadius number to get/set |

<a name="module_Donut--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired animation flag |

<a name="module_Donut--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Donut--exports.margin"></a>

### exports.margin(_x) ⇒ <code>Object</code> \| <code>Module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Object</code> \| <code>Module</code> - Current margin or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Donut--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the donut chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Donut--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Donut--exports.orderingFunction"></a>

### exports.orderingFunction(_x) ⇒ <code>function</code> \| <code>Module</code>
Changes the order of items given custom function

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>function</code> \| <code>Module</code> - Void function with no return  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | A custom function that sets logic for ordering |

<a name="module_Donut--exports.percentageFormat"></a>

### exports.percentageFormat(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the percentage format for the percentage label

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current format or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Format for the percentage label (e.g. '.1f') |

<a name="module_Donut--exports.radiusHoverOffset"></a>

### exports.radiusHoverOffset(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the radiusHoverOffset of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current offset or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the hovered slice |

<a name="module_Donut--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current width or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="DonutChartData"></a>

# DonutChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| quantity | <code>Number</code> | Quantity of the group (required) |
| percentage | <code>Number</code> | Percentage of the total (optional) |
| name | <code>String</code> | Name of the group (required) |
| id | <code>Number</code> | Identifier for the group required for legend feature (optional) |

**Example**  
```js
[
    {
        quantity: 1,
        percentage: 50,
        name: 'glittering',
        id: 1
    },
    {
        quantity: 1,
        percentage: 50,
        name: 'luminous',
        id: 2
    }
]
```
