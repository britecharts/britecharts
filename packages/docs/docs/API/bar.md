<a name="module_Bar"></a>

# Bar
Bar Chart reusable API class that renders a
simple and configurable bar chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
const barChart = bar();

barChart
    .height(500)
    .width(800);

d3.select('.css-selector')
    .datum(dataset)
    .call(barChart);
```

* [Bar](#module_Bar)
    * [exports(_selection, _data)](#exp_module_Bar--exports) ⏏
        * _static_
            * [.animationDuration(_x)](#module_Bar--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.betweenBarsPadding(_x)](#module_Bar--exports.betweenBarsPadding) ⇒ <code>padding</code> \| <code>module</code>
            * [.chartGradient(_x)](#module_Bar--exports.chartGradient) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Bar--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Bar--exports.colorSchema) ⇒ <code>colorSchema</code> \| <code>module</code>
            * [.enableLabels([_x])](#module_Bar--exports.enableLabels) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Bar--exports.exportChart) ⇒ <code>Promise</code>
            * [.hasPercentage(_x)](#module_Bar--exports.hasPercentage) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasSingleBarHighlight(_x)](#module_Bar--exports.hasSingleBarHighlight) ⇒ <code>boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Bar--exports.height) ⇒ <code>height</code> \| <code>module</code>
            * [.highlightBarFunction(_x)](#module_Bar--exports.highlightBarFunction) ⇒ <code>highlightBarFunction</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Bar--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
            * [.isHorizontal(_x)](#module_Bar--exports.isHorizontal) ⇒ <code>isHorizontal</code> \| <code>module</code>
            * [.labelsMargin([_x])](#module_Bar--exports.labelsMargin) ⇒ <code>number</code> \| <code>module</code>
            * [.labelsNumberFormat([_x])](#module_Bar--exports.labelsNumberFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.labelsSize([_x])](#module_Bar--exports.labelsSize) ⇒ <code>number</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Bar--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Bar--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * ~~[.nameLabel(_x)](#module_Bar--exports.nameLabel) ⇒ <code>number</code> \| <code>module</code>~~
            * [.numberFormat(_x)](#module_Bar--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.on()](#module_Bar--exports.on) ⇒ <code>module</code>
            * [.percentageAxisToMaxRatio(_x)](#module_Bar--exports.percentageAxisToMaxRatio) ⇒ <code>ratio</code> \| <code>module</code>
            * [.shouldReverseColorList(_x)](#module_Bar--exports.shouldReverseColorList) ⇒ <code>boolean</code> \| <code>module</code>
            * [.orderingFunction(_x)](#module_Bar--exports.orderingFunction) ⇒ <code>function</code> \| <code>Module</code>
            * ~~[.valueLabel(_x)](#module_Bar--exports.valueLabel) ⇒ <code>valueLabel</code> \| <code>module</code>~~
            * [.valueLocale([_x])](#module_Bar--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
            * [.width(_x)](#module_Bar--exports.width) ⇒ <code>width</code> \| <code>module</code>
            * [.xAxisLabel(_x)](#module_Bar--exports.xAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.xAxisLabelOffset(_x)](#module_Bar--exports.xAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.xTicks(_x)](#module_Bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset(_x)](#module_Bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisPaddingBetweenChart(_x)](#module_Bar--exports.yAxisPaddingBetweenChart) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
        * _inner_
            * [~BarChartData](#module_Bar--exports..BarChartData) : <code>Array.&lt;Object&gt;</code>
            * [~LocaleObject](#module_Bar--exports..LocaleObject) : <code>Object</code>

<a name="exp_module_Bar--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>BarChartData</code> | The data to attach and generate the chart |

<a name="module_Bar--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Bar--exports.betweenBarsPadding"></a>

### exports.betweenBarsPadding(_x) ⇒ <code>padding</code> \| <code>module</code>
Gets or Sets the padding of the chart (Default is 0.1)

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>padding</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> \| <code>module</code> | Padding value to get/set |

<a name="module_Bar--exports.chartGradient"></a>

### exports.chartGradient(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the gradient colors of a bar in the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current color gradient or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired color gradient for the line (array of two hexadecimal numbers) |

<a name="module_Bar--exports.colorMap"></a>

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
barChart.colorMap({name: 'colorHex', name2: 'colorString'})
```
<a name="module_Bar--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>colorSchema</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>colorSchema</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Bar--exports.enableLabels"></a>

### exports.enableLabels([_x]) ⇒ <code>Boolean</code> \| <code>module</code>
If true, adds labels at the end of the bars

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current value of enableLabels or Chart module to chain calls  
**Access**: public  

| Param | Type | Default |
| --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | 

<a name="module_Bar--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Bar--exports.hasPercentage"></a>

### exports.hasPercentage(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasPercentage status

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Is percentage used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Should use percentage as value format |

<a name="module_Bar--exports.hasSingleBarHighlight"></a>

### exports.hasSingleBarHighlight(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasSingleBarHighlight status.
If the value is true (default), only the hovered bar is considered to
be highlighted and will be darkened by default. If the value is false,
all the bars but the hovered bar are considered to be highlighted
and will be darkened (by default). To customize the bar highlight or
remove it completely, use highlightBarFunction instead.

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Is hasSingleBarHighlight used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Should highlight the hovered bar |

<a name="module_Bar--exports.height"></a>

### exports.height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Bar--exports.highlightBarFunction"></a>

### exports.highlightBarFunction(_x) ⇒ <code>highlightBarFunction</code> \| <code>module</code>
Gets or Sets the highlightBarFunction function. The callback passed to
this function returns a bar selection from the bar chart. Use this function
if you want to apply a custom behavior to the highlighted bar on hover.
When hasSingleBarHighlight is true the highlighted bar will be the
one that was hovered by the user. When hasSingleBarHighlight is false
the highlighted bars are all the bars but the hovered one. The default
highlight effect on a bar is darkening the highlighted bar(s) color.

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>highlightBarFunction</code> \| <code>module</code> - Is highlightBarFunction used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | Desired operation operation on a hovered bar passed through callback |

**Example**  
```js
barChart.highlightBarFunction(bar => bar.attr('fill', 'blue'))
barChart.highlightBarFunction(null) // will disable the default highlight effect
```
<a name="module_Bar--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired animation flag |

<a name="module_Bar--exports.isHorizontal"></a>

### exports.isHorizontal(_x) ⇒ <code>isHorizontal</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>isHorizontal</code> \| <code>module</code> - If it is horizontal or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired horizontal direction for the graph |

<a name="module_Bar--exports.labelsMargin"></a>

### exports.labelsMargin([_x]) ⇒ <code>number</code> \| <code>module</code>
Offset between end of bar and start of the percentage bars

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current offset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>7</code> | Margin offset from end of bar |

<a name="module_Bar--exports.labelsNumberFormat"></a>

### exports.labelsNumberFormat([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the labels number format

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current labelsNumberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;\&quot;,f\&quot;&quot;</code> | desired label number format for the bar chart |

<a name="module_Bar--exports.labelsSize"></a>

### exports.labelsSize([_x]) ⇒ <code>number</code> \| <code>module</code>
Get or Sets the labels text size

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current text size or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>12</code> | label font size |

<a name="module_Bar--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Bar--exports.margin"></a>

### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Bar--exports.nameLabel"></a>

### ~~exports.nameLabel(_x) ⇒ <code>number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired nameLabel for the graph |

<a name="module_Bar--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'     Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Bar--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Bar--exports.percentageAxisToMaxRatio"></a>

### exports.percentageAxisToMaxRatio(_x) ⇒ <code>ratio</code> \| <code>module</code>
Configurable extension of the x axis. If your max point was 50% you might want to show x axis to 60%, pass 1.2

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>ratio</code> \| <code>module</code> - Current ratio or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | ratio to max data point to add to the x axis |

<a name="module_Bar--exports.shouldReverseColorList"></a>

### exports.shouldReverseColorList(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets whether the color list should be reversed or not

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Is color list being reversed or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Should reverse the color list |

<a name="module_Bar--exports.orderingFunction"></a>

### exports.orderingFunction(_x) ⇒ <code>function</code> \| <code>Module</code>
Changes the order of items given the custom function

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>function</code> \| <code>Module</code> - A custom ordering function or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | A custom function that sets logic for ordering |

<a name="module_Bar--exports.valueLabel"></a>

### ~~exports.valueLabel(_x) ⇒ <code>valueLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>valueLabel</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Bar--exports.valueLocale"></a>

### exports.valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>LocaleObject</code> \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>LocaleObject</code> | <code></code> | _x    Desired locale object format. |

**Example**  
```js
barChart
 .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Bar--exports.width"></a>

### exports.width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Bar--exports.xAxisLabel"></a>

### exports.xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Bar--exports.xAxisLabelOffset"></a>

### exports.xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Bar--exports.xTicks"></a>

### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5          Desired horizontal ticks |

<a name="module_Bar--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Bar--exports.yAxisLabelOffset"></a>

### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Bar--exports.yAxisPaddingBetweenChart"></a>

### exports.yAxisPaddingBetweenChart(_x) ⇒ <code>Number</code> \| <code>module</code>
Space between y axis and chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current value of yAxisPaddingBetweenChart or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 10     Space between y axis and chart |

<a name="module_Bar--exports.yTicks"></a>

### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 6         Desired number of vertical ticks for the graph |

<a name="module_Bar--exports..BarChartData"></a>

### exports~BarChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Bar--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | Value of the group (required) |
| name | <code>String</code> | Name of the group (required) |

**Example**  
```js
[
    {
        value: 1,
        name: 'glittering'
    },
    {
        value: 1,
        name: 'luminous'
    }
]
```
<a name="module_Bar--exports..LocaleObject"></a>

### exports~LocaleObject : <code>Object</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Bar--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| decimal | <code>String</code> | the decimal point(e.g., ".") |
| thousands | <code>String</code> | the group separator(e.g., ",") |
| grouping | <code>Array.&lt;Number&gt;</code> | the array of group sizes(e.g., [3]), cycled as needed |
| currency | <code>Array.&lt;String&gt;</code> | the currency prefix and suffix(e.g., ["$", ""]) |
| numerals | <code>Array.&lt;String&gt;</code> | optional; an array of ten strings to replace the numerals 0 - 9. |
| percent | <code>String</code> | optional; the percent sign(defaults to "%") |
| minus | <code>String</code> | optional; the minus sign(defaults to hyphen - minus, "-") |
| nan | <code>String</code> | optional; the not - a - number value(defaults "NaN") See some standard locale object values [here](https://cdn.jsdelivr.net/npm/d3-format/locale/). |

**Example**  
```js
{
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["", "\u00a0€"]
}
```
