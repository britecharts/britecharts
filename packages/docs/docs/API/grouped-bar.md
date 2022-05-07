<a name="module_Grouped-bar"></a>

# Grouped-bar
Grouped Bar Chart reusable API module that allows us
rendering a multi grouped bar and configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let groupedBar = GroupedBar();

groupedBar
    .width(containerWidth);

d3Selection.select('.css-selector')
    .datum(dataset.data)
    .call(groupedBar);
```

* [Grouped-bar](#module_Grouped-bar)
    * [exports(_selection, _data)](#exp_module_Grouped-bar--exports) ⏏
        * _static_
            * [.animationDuration(_x)](#module_Grouped-bar--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.betweenBarsPadding([_x])](#module_Grouped-bar--exports.betweenBarsPadding) ⇒ <code>Number</code> \| <code>module</code>
            * [.betweenGroupsPadding([_x])](#module_Grouped-bar--exports.betweenGroupsPadding) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Grouped-bar--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Grouped-bar--exports.colorSchema) ⇒ <code>colorSchema</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Grouped-bar--exports.exportChart) ⇒ <code>Promise</code>
            * ~~[.groupLabel(_x)](#module_Grouped-bar--exports.groupLabel) ⇒ <code>groupLabel</code> \| <code>module</code>~~
            * [.grid([_x])](#module_Grouped-bar--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.height([_x])](#module_Grouped-bar--exports.height) ⇒ <code>height</code> \| <code>module</code>
            * [.isHorizontal([_x])](#module_Grouped-bar--exports.isHorizontal) ⇒ <code>isHorizontal</code> \| <code>module</code>
            * [.isAnimated([_x])](#module_Grouped-bar--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Grouped-bar--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Grouped-bar--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * ~~[.nameLabel(_x)](#module_Grouped-bar--exports.nameLabel) ⇒ <code>nameLabel</code> \| <code>module</code>~~
            * [.numberFormat(_x)](#module_Grouped-bar--exports.numberFormat) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
            * [.on()](#module_Grouped-bar--exports.on) ⇒ <code>module</code>
            * [.tooltipThreshold([_x])](#module_Grouped-bar--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * ~~[.valueLabel(_x)](#module_Grouped-bar--exports.valueLabel) ⇒ <code>Number</code> \| <code>module</code>~~
            * [.valueLocale([_x])](#module_Grouped-bar--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
            * [.width([_x])](#module_Grouped-bar--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xTicks([_x])](#module_Grouped-bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Grouped-bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset([_x])](#module_Grouped-bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks([_x])](#module_Grouped-bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTickTextOffset([_x])](#module_Grouped-bar--exports.yTickTextOffset) ⇒ <code>Object</code> \| <code>module</code>
        * _inner_
            * [~GroupedBarChartData](#module_Grouped-bar--exports..GroupedBarChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Grouped-bar--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>GroupedBarChartData</code> | The data to attach and generate the chart |

<a name="module_Grouped-bar--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Grouped-bar--exports.betweenBarsPadding"></a>

### exports.betweenBarsPadding([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding between bars.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0.1</code> | Padding value to get/set |

<a name="module_Grouped-bar--exports.betweenGroupsPadding"></a>

### exports.betweenGroupsPadding([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding between groups of bars.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current group padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0.1</code> | Padding value to get/set |

<a name="module_Grouped-bar--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
groupedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Grouped-bar--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>colorSchema</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>colorSchema</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Grouped-bar--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Grouped-bar--exports.groupLabel"></a>

### ~~exports.groupLabel(_x) ⇒ <code>groupLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the groupLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>groupLabel</code> \| <code>module</code> - Current groupLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired groupLabel for the graph |

<a name="module_Grouped-bar--exports.grid"></a>

### exports.grid([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code></code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Grouped-bar--exports.height"></a>

### exports.height([_x]) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>500</code> | Desired width for the graph |

<a name="module_Grouped-bar--exports.isHorizontal"></a>

### exports.isHorizontal([_x]) ⇒ <code>isHorizontal</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>isHorizontal</code> \| <code>module</code> - If it is horizontal or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>false</code> | Desired horizontal direction for the graph |

<a name="module_Grouped-bar--exports.isAnimated"></a>

### exports.isAnimated([_x]) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | Desired animation flag |

<a name="module_Grouped-bar--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls     * @public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Grouped-bar--exports.margin"></a>

### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Grouped-bar--exports.nameLabel"></a>

### ~~exports.nameLabel(_x) ⇒ <code>nameLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>nameLabel</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired dateLabel for the graph |

<a name="module_Grouped-bar--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
Gets or Sets the numberFormat of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = ',f'     Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Grouped-bar--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Grouped-bar--exports.tooltipThreshold"></a>

### exports.tooltipThreshold([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>480</code> | Minimum width of chart to show the tooltip |

<a name="module_Grouped-bar--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Grouped-bar--exports.valueLocale"></a>

### exports.valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>LocaleObject</code> \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>LocaleObject</code> | <code></code> | _x     Desired locale object format. |

**Example**  
```js
groupedBarChart
 .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Grouped-bar--exports.width"></a>

### exports.width([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>960</code> | Desired width for the graph |

<a name="module_Grouped-bar--exports.xTicks"></a>

### exports.xTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired xTicks |

<a name="module_Grouped-bar--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
groupedBar.yAxisLabel('Ticket Sales')
```
<a name="module_Grouped-bar--exports.yAxisLabelOffset"></a>

### exports.yAxisLabelOffset([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>-60</code> | Desired offset for the label |

**Example**  
```js
groupedBar.yAxisLabelOffset(-55)
```
<a name="module_Grouped-bar--exports.yTicks"></a>

### exports.yTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired vertical ticks |

<a name="module_Grouped-bar--exports.yTickTextOffset"></a>

### exports.yTickTextOffset([_x]) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the x and y offset of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current offset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Object</code> | <code>{ y: -8, x: -20 }</code> | Desired offset |

<a name="module_Grouped-bar--exports..GroupedBarChartData"></a>

### exports~GroupedBarChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the entry |
| group | <code>String</code> | group of the entry |
| value | <code>Number</code> | Value of the entry |

**Example**  
```js
[
    {
        name: "2011-01",
        group: "Direct",
        value: 0
    }
]
```
