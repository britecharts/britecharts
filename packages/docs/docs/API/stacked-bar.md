<a name="module_Stacked-bar"></a>

# Stacked-bar
Stacked Area Chart reusable API module that allows us
rendering a multi area and configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let stackedBar = stackedBar();

stackedBar
    .width(containerWidth);

d3Selection.select('.css-selector')
    .datum(dataset.data)
    .call(stackedBar);
```

* [Stacked-bar](#module_Stacked-bar)
    * [exports(_selection, _data)](#exp_module_Stacked-bar--exports) ⏏
        * _static_
            * [.animationDuration(_x)](#module_Stacked-bar--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.betweenBarsPadding(_x)](#module_Stacked-bar--exports.betweenBarsPadding) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Stacked-bar--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Stacked-bar--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Stacked-bar--exports.exportChart) ⇒ <code>Promise</code>
            * [.grid(_x)](#module_Stacked-bar--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.hasPercentage(_x)](#module_Stacked-bar--exports.hasPercentage) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Stacked-bar--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.hasReversedStacks(_x)](#module_Stacked-bar--exports.hasReversedStacks) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Stacked-bar--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isHorizontal(_x)](#module_Stacked-bar--exports.isHorizontal) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Stacked-bar--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Stacked-bar--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
            * ~~[.nameLabel(_x)](#module_Stacked-bar--exports.nameLabel) ⇒ <code>Number</code> \| <code>module</code>~~
            * [.numberFormat(_x)](#module_Stacked-bar--exports.numberFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.on()](#module_Stacked-bar--exports.on) ⇒ <code>module</code>
            * [.percentageAxisToMaxRatio(_x)](#module_Stacked-bar--exports.percentageAxisToMaxRatio) ⇒ <code>Number</code> \| <code>module</code>
            * ~~[.stackLabel(_x)](#module_Stacked-bar--exports.stackLabel) ⇒ <code>String</code> \| <code>module</code>~~
            * [.tooltipThreshold([_x])](#module_Stacked-bar--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * ~~[.valueLabel(_x)](#module_Stacked-bar--exports.valueLabel) ⇒ <code>Number</code> \| <code>module</code>~~
            * [.valueLocale([_x])](#module_Stacked-bar--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
            * [.width(_x)](#module_Stacked-bar--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xTicks(_x)](#module_Stacked-bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Stacked-bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset(_x)](#module_Stacked-bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Stacked-bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
        * _inner_
            * [~StackedBarData](#module_Stacked-bar--exports..StackedBarData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Stacked-bar--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>StackedBarData</code> | The data to attach and generate the chart |

<a name="module_Stacked-bar--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Stacked-bar--exports.betweenBarsPadding"></a>

### exports.betweenBarsPadding(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding of the stacked bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 0.1    Padding value to get/set |

<a name="module_Stacked-bar--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
stackedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Stacked-bar--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | = colorSchemas.britecharts     Desired colorSchema for the graph |

<a name="module_Stacked-bar--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Stacked-bar--exports.grid"></a>

### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Stacked-bar--exports.hasPercentage"></a>

### exports.hasPercentage(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the hasPercentage status

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Is percentage used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Should use percentage as value format |

<a name="module_Stacked-bar--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-bar--exports.hasReversedStacks"></a>

### exports.hasReversedStacks(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current hasReversedStacks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired hasReversedStacks flag |

<a name="module_Stacked-bar--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Stacked-bar--exports.isHorizontal"></a>

### exports.isHorizontal(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is horizontal or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired horizontal direction for the graph |

<a name="module_Stacked-bar--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Stacked-bar--exports.margin"></a>

### exports.margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Stacked-bar--exports.nameLabel"></a>

### ~~exports.nameLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired dateLabel for the graph |

<a name="module_Stacked-bar--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the numberFormat of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | = ',f'     Desired numberFormat for the graph. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Stacked-bar--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Stacked-bar--exports.percentageAxisToMaxRatio"></a>

### exports.percentageAxisToMaxRatio(_x) ⇒ <code>Number</code> \| <code>module</code>
Configurable extension of the x axis
If your max point was 50% you might want to show x axis to 60%, pass 1.2

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current ratio or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Ratio to max data point to add to the x axis |

<a name="module_Stacked-bar--exports.stackLabel"></a>

### ~~exports.stackLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the stackLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current stackLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired stackLabel for the graph |

<a name="module_Stacked-bar--exports.tooltipThreshold"></a>

### exports.tooltipThreshold([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>480</code> | Minimum width of the graph |

<a name="module_Stacked-bar--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Stacked-bar--exports.valueLocale"></a>

### exports.valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>LocaleObject</code> \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>LocaleObject</code> | <code></code> | _x    Desired locale object format. |

**Example**  
```js
stackedBarChart
 .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Stacked-bar--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 960    Desired width for the graph |

<a name="module_Stacked-bar--exports.xTicks"></a>

### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired horizontal ticks |

<a name="module_Stacked-bar--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
stackedBar.yAxisLabel('Ticket Sales')
```
<a name="module_Stacked-bar--exports.yAxisLabelOffset"></a>

### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = -60        Desired offset for the label |

**Example**  
```js
stackedBar.yAxisLabelOffset(-55)
```
<a name="module_Stacked-bar--exports.yTicks"></a>

### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks of the axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired vertical ticks |

<a name="module_Stacked-bar--exports..StackedBarData"></a>

### exports~StackedBarData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the entry |
| stack | <code>String</code> | Stack of the entry |
| value | <code>Number</code> | Value of the entry |

**Example**  
```js
[
    {
        name: "2011-01",
        stack: "Direct",
        value: 0
    }
]
```
