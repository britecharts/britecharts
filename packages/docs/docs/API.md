## Modules

<dl>
<dt><a href="#module_Bar">Bar</a></dt>
<dd><p>Bar Chart reusable API class that renders a
simple and configurable bar chart.</p>
</dd>
<dt><a href="#module_Brush">Brush</a></dt>
<dd><p>Brush Chart reusable API class that renders a
simple and configurable brush chart.</p>
</dd>
<dt><a href="#module_Bullet">Bullet</a></dt>
<dd><p>Reusable Bullet Chart API class that renders a
simple and configurable Bullet Chart.</p>
</dd>
<dt><a href="#module_Donut">Donut</a></dt>
<dd><p>Reusable Donut Chart API class that renders a
simple and configurable donut chart.</p>
</dd>
<dt><a href="#module_Grouped-bar">Grouped-bar</a></dt>
<dd><p>Grouped Bar Chart reusable API module that allows us
rendering a multi grouped bar and configurable chart.</p>
</dd>
<dt><a href="#module_Heatmap">Heatmap</a></dt>
<dd><p>Reusable Heatmap API module that renders a
simple and configurable heatmap chart.</p>
</dd>
<dt><a href="#module_Grid">Grid</a></dt>
<dd><p>Reusable Grid component helper that renders either a vertical, horizontal or full grid, and that
will usually be used inside charts. It could also be used as a standalone component to use on custom charts.</p>
</dd>
<dt><a href="#module_Legend">Legend</a></dt>
<dd><p>Legend Component reusable API class that renders a
simple and configurable legend element.</p>
</dd>
<dt><a href="#module_Line">Line</a></dt>
<dd><p>Line Chart reusable API module that allows us
rendering a multi line and configurable chart.</p>
</dd>
<dt><a href="#module_Mini-tooltip">Mini-tooltip</a></dt>
<dd><p>Mini Tooltip Component reusable API class that renders a
simple and configurable tooltip element for Britechart&#39;s
bar and step chart.</p>
</dd>
<dt><a href="#module_Scatter-plot">Scatter-plot</a></dt>
<dd><p>Reusable Scatter Plot API class that renders a
simple and configurable scatter chart.</p>
</dd>
<dt><a href="#module_Sparkline">Sparkline</a></dt>
<dd><p>Sparkline Chart reusable API module that allows us
rendering a sparkline configurable chart.</p>
</dd>
<dt><a href="#module_Stacked-area">Stacked-area</a></dt>
<dd><p>Stacked Area Chart reusable API module that allows us
rendering a multi area and configurable chart.</p>
</dd>
<dt><a href="#module_Stacked-bar">Stacked-bar</a></dt>
<dd><p>Stacked Area Chart reusable API module that allows us
rendering a multi area and configurable chart.</p>
</dd>
<dt><del><a href="#module_Step">Step</a></del></dt>
<dd><p>Step Chart reusable API class that renders a
simple and configurable step chart.
NOTE: We will be deprecating this chart soon</p>
</dd>
<dt><a href="#module_Tooltip">Tooltip</a></dt>
<dd><p>Tooltip Component reusable API class that renders a
simple and configurable tooltip element for Britechart&#39;s
line chart or stacked area chart.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BarChartData">BarChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#LocaleObject">LocaleObject</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#BrushChartData">BrushChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#BulletChartData">BulletChartData</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DonutChartData">DonutChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#GroupedBarChartData">GroupedBarChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#HeatmapData">HeatmapData</a> : <code>Array.&lt;Array&gt;</code></dt>
<dd></dd>
<dt><a href="#LegendChartData">LegendChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#D3Selection">D3Selection</a> : <code>Array.&lt;Array&gt;</code></dt>
<dd></dd>
<dt><a href="#LineChartFlatData">LineChartFlatData</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#LineChartDataByTopic">LineChartDataByTopic</a> : <code>object</code></dt>
<dd><p>Former data standard, it is currently calculated internally if not passed</p>
</dd>
<dt><a href="#LineChartDataSorted">LineChartDataSorted</a> : <code>Array.&lt;object&gt;</code></dt>
<dd><p>The Data Sorted is calculated internally in the chart in order to pass it to our tooltips</p>
</dd>
<dt><a href="#LineChartData">LineChartData</a> : <code>object</code></dt>
<dd><p>The data shape for the line chart.
Note that up to version 2.10.1, this required a &quot;dataByTopic&quot; array described on LineChartDataByTopic.
The &quot;dataByTopic&quot; schema still works, but we prefer a flat dataset as described here.</p>
</dd>
<dt><a href="#ScatterPlotData">ScatterPlotData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#SparklineChartData">SparklineChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#AreaChartData">AreaChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#StackedBarData">StackedBarData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#StepChartData">StepChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Bar"></a>

## Bar
Bar Chart reusable API class that renders a
simple and configurable bar chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
var barChart = bar();

barChart
    .height(500)
    .width(800);

d3.select('.css-selector')
    .datum(dataset)
    .call(barChart);
```

* [Bar](#module_Bar)
    * [exports(_selection, _data)](#exp_module_Bar--exports) ⏏
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
        * [.valueLocale([_x])](#module_Bar--exports.valueLocale) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
        * [.width(_x)](#module_Bar--exports.width) ⇒ <code>width</code> \| <code>module</code>
        * [.xAxisLabel(_x)](#module_Bar--exports.xAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.xAxisLabelOffset(_x)](#module_Bar--exports.xAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
        * [.xTicks(_x)](#module_Bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
        * [.yAxisLabel(_x)](#module_Bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.yAxisLabelOffset(_x)](#module_Bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
        * [.yAxisPaddingBetweenChart(_x)](#module_Bar--exports.yAxisPaddingBetweenChart) ⇒ <code>Number</code> \| <code>module</code>
        * [.yTicks(_x)](#module_Bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>

<a name="exp_module_Bar--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>BarChartData</code>](#BarChartData) | The data to attach and generate the chart |

<a name="module_Bar--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Bar--exports.betweenBarsPadding"></a>

#### exports.betweenBarsPadding(_x) ⇒ <code>padding</code> \| <code>module</code>
Gets or Sets the padding of the chart (Default is 0.1)

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>padding</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> \| <code>module</code> | Padding value to get/set |

<a name="module_Bar--exports.chartGradient"></a>

#### exports.chartGradient(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the gradient colors of a bar in the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current color gradient or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired color gradient for the line (array of two hexadecimal numbers) |

<a name="module_Bar--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
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

#### exports.colorSchema(_x) ⇒ <code>colorSchema</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>colorSchema</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Bar--exports.enableLabels"></a>

#### exports.enableLabels([_x]) ⇒ <code>Boolean</code> \| <code>module</code>
If true, adds labels at the end of the bars

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current value of enableLabels or Chart module to chain calls  
**Access**: public  

| Param | Type | Default |
| --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | 

<a name="module_Bar--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Bar--exports.hasPercentage"></a>

#### exports.hasPercentage(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasPercentage status

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Is percentage used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Should use percentage as value format |

<a name="module_Bar--exports.hasSingleBarHighlight"></a>

#### exports.hasSingleBarHighlight(_x) ⇒ <code>boolean</code> \| <code>module</code>
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

#### exports.height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Bar--exports.highlightBarFunction"></a>

#### exports.highlightBarFunction(_x) ⇒ <code>highlightBarFunction</code> \| <code>module</code>
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

#### exports.isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired animation flag |

<a name="module_Bar--exports.isHorizontal"></a>

#### exports.isHorizontal(_x) ⇒ <code>isHorizontal</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>isHorizontal</code> \| <code>module</code> - If it is horizontal or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired horizontal direction for the graph |

<a name="module_Bar--exports.labelsMargin"></a>

#### exports.labelsMargin([_x]) ⇒ <code>number</code> \| <code>module</code>
Offset between end of bar and start of the percentage bars

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current offset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>7</code> | Margin offset from end of bar |

<a name="module_Bar--exports.labelsNumberFormat"></a>

#### exports.labelsNumberFormat([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the labels number format

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current labelsNumberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;\&quot;,f\&quot;&quot;</code> | desired label number format for the bar chart |

<a name="module_Bar--exports.labelsSize"></a>

#### exports.labelsSize([_x]) ⇒ <code>number</code> \| <code>module</code>
Get or Sets the labels text size

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current text size or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>12</code> | label font size |

<a name="module_Bar--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Bar--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Bar--exports.nameLabel"></a>

#### ~~exports.nameLabel(_x) ⇒ <code>number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired nameLabel for the graph |

<a name="module_Bar--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'     Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Bar--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Bar--exports.percentageAxisToMaxRatio"></a>

#### exports.percentageAxisToMaxRatio(_x) ⇒ <code>ratio</code> \| <code>module</code>
Configurable extension of the x axis. If your max point was 50% you might want to show x axis to 60%, pass 1.2

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>ratio</code> \| <code>module</code> - Current ratio or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | ratio to max data point to add to the x axis |

<a name="module_Bar--exports.shouldReverseColorList"></a>

#### exports.shouldReverseColorList(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets whether the color list should be reversed or not

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Is color list being reversed or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | Should reverse the color list |

<a name="module_Bar--exports.orderingFunction"></a>

#### exports.orderingFunction(_x) ⇒ <code>function</code> \| <code>Module</code>
Changes the order of items given the custom function

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>function</code> \| <code>Module</code> - A custom ordering function or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | A custom function that sets logic for ordering |

<a name="module_Bar--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>valueLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>valueLabel</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Bar--exports.valueLocale"></a>

#### exports.valueLocale([_x]) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | [<code>LocaleObject</code>](#LocaleObject) | <code></code> | _x    Desired locale object format. |

**Example**  
```js
barChart
 .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Bar--exports.width"></a>

#### exports.width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Bar--exports.xAxisLabel"></a>

#### exports.xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Bar--exports.xAxisLabelOffset"></a>

#### exports.xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Bar--exports.xTicks"></a>

#### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5          Desired horizontal ticks |

<a name="module_Bar--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Bar--exports.yAxisLabelOffset"></a>

#### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Bar--exports.yAxisPaddingBetweenChart"></a>

#### exports.yAxisPaddingBetweenChart(_x) ⇒ <code>Number</code> \| <code>module</code>
Space between y axis and chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current value of yAxisPaddingBetweenChart or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 10     Space between y axis and chart |

<a name="module_Bar--exports.yTicks"></a>

#### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 6         Desired number of vertical ticks for the graph |

<a name="module_Brush"></a>

## Brush
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
            * [~DateExtent](#module_Brush--exports..DateExtent) : <code>Array.&lt;Date&gt;</code>
            * [~eventCallback](#module_Brush--exports..eventCallback) : <code>function</code>

<a name="exp_module_Brush--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>BrushChartData</code>](#BrushChartData) | The data to attach and generate the chart |

<a name="module_Brush--exports.axisTimeCombinations"></a>

#### exports.axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Brush--exports)  
**Example**  
```js
brush.xAxisCustomFormat(brush.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Brush--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the area animation

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Brush--exports.areaCurve"></a>

#### exports.areaCurve([_x]) ⇒ <code>String</code> \| <code>module</code>
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

#### exports.dateRange([_x]) ⇒ <code>dateRange</code> \| <code>module</code>
Gets or Sets the dateRange for the selected part of the brush

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>dateRange</code> \| <code>module</code> - Current dateRange or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Array.&lt;String&gt;</code> | <code>[null, null]</code> | Desired dateRange for the graph |

<a name="module_Brush--exports.gradient"></a>

#### exports.gradient([_x]) ⇒ <code>String</code> \| <code>Module</code>
Gets or Sets the gradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current gradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Array.&lt;String&gt;</code> | <code>colorHelper.colorGradients.greenBlue</code> | Desired gradient for the graph |

<a name="module_Brush--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Brush--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Brush--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Brush--exports.isLocked"></a>

#### exports.isLocked(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isLocked property of the brush, enforcing the initial brush size set with dateRange

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isLocked flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Whether the brush window is locked, requires a value set with '.dateRange` when true |

<a name="module_Brush--exports.locale"></a>

#### exports.locale(_x) ⇒ <code>String</code> \| <code>Module</code>
Pass language tag for the tooltip to localize the date.
Feature uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current locale or module to chain calls  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Must be a language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Brush--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>Object</code> \| <code>Module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Object</code> \| <code>Module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Brush--exports.on"></a>

#### exports.on(typenames, [callback]) ⇒ [<code>exports</code>](#exp_module_Brush--exports)
Adds, removes, or gets the callback for the specified typenames.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Access**: public  
**See**: [d3-dispatch:on](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on)  

| Param | Type | Description |
| --- | --- | --- |
| typenames | <code>String</code> | One or more event type names, delimited by a space |
| [callback] | [<code>eventCallback</code>](#module_Brush--exports..eventCallback) | Callback to register |

<a name="module_Brush--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Brush--exports.xAxisCustomFormat"></a>

#### exports.xAxisCustomFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.

**Kind**: static method of [<code>exports</code>](#exp_module_Brush--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

<a name="module_Brush--exports.xAxisFormat"></a>

#### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
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

#### exports.xTicks([_x]) ⇒ <code>Number</code> \| <code>Module</code>
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

#### exports.roundingTimeInterval([_x]) ⇒ <code>roundingTimeInterval</code> \| <code>Module</code>
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

#### "customBrushStart"
Event indicating when the brush moves

**Kind**: event emitted by [<code>exports</code>](#exp_module_Brush--exports)  
**See**: [d3-brush:on(brush)](https://github.com/d3/d3-brush#brush_on)  
<a name="event_customBrushEnd"></a>

#### "customBrushEnd"
Event indicating the end of a brush gesture

**Kind**: event emitted by [<code>exports</code>](#exp_module_Brush--exports)  
**See**: [d3-brush:on(end)](https://github.com/d3/d3-brush#brush_on)  
<a name="module_Brush--exports..DateExtent"></a>

#### exports~DateExtent : <code>Array.&lt;Date&gt;</code>
Date range

**Kind**: inner typedef of [<code>exports</code>](#exp_module_Brush--exports)  
**See**: [d3-brush:brushSelection](https://github.com/d3/d3-brush#brushSelection)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Date</code> | Lower bound date selection |
| 1 | <code>Date</code> | Upper bound date selection |

<a name="module_Brush--exports..eventCallback"></a>

#### exports~eventCallback : <code>function</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Brush--exports)  

| Param | Type | Description |
| --- | --- | --- |
| dateExtent | [<code>DateExtent</code>](#module_Brush--exports..DateExtent) | Date range |

<a name="module_Bullet"></a>

## Bullet
Reusable Bullet Chart API class that renders a
simple and configurable Bullet Chart.

**Requires**: <code>module:d3-axis,</code>  
**Example**  
```js
let bulletChart = bullet();

bulletChart
    .width(containerWidth);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(bulletChart);
```

* [Bullet](#module_Bullet)
    * [exports(_selection, _data)](#exp_module_Bullet--exports) ⏏
        * [.colorSchema(_x)](#module_Bullet--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
        * [.customTitle(_x)](#module_Bullet--exports.customTitle) ⇒ <code>String</code> \| <code>module</code>
        * [.customSubtitle(_x)](#module_Bullet--exports.customSubtitle) ⇒ <code>String</code> \| <code>module</code>
        * [.exportChart(filename, title)](#module_Bullet--exports.exportChart) ⇒ <code>Promise</code>
        * [.height(_x)](#module_Bullet--exports.height) ⇒ <code>Number</code> \| <code>module</code>
        * [.isReverse(_x)](#module_Bullet--exports.isReverse) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.margin(_x)](#module_Bullet--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
        * [.numberFormat(_x)](#module_Bullet--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.paddingBetweenAxisAndChart(_x)](#module_Bullet--exports.paddingBetweenAxisAndChart) ⇒ <code>Number</code> \| <code>module</code>
        * [.startMaxRangeOpacity(_x)](#module_Bullet--exports.startMaxRangeOpacity) ⇒ <code>Number</code> \| <code>module</code>
        * [.ticks(_x)](#module_Bullet--exports.ticks) ⇒ <code>Number</code> \| <code>module</code>
        * [.width(_x)](#module_Bullet--exports.width) ⇒ <code>Number</code> \| <code>module</code>

<a name="exp_module_Bullet--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>BulletChartData</code>](#BulletChartData) | The data to attach and generate the chart |

<a name="module_Bullet--exports.colorSchema"></a>

#### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart.
The first color from the array will be applied to range bars (the wider bars).
The second color from the array will be applied to measure bars (the narrow bars) and
the third color will be applied to the marker lines.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Bullet--exports.customTitle"></a>

#### exports.customTitle(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the title for measure identifier
range.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current customTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired customTitle for chart |

**Example**  
```js
bulletChart.customTitle('CPU Usage')
```
<a name="module_Bullet--exports.customSubtitle"></a>

#### exports.customSubtitle(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the subtitle for measure identifier range.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>String</code> \| <code>module</code> - current customSubtitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired customSubtitle for chart |

**Example**  
```js
bulletChart.customSubtitle('GHz')
```
<a name="module_Bullet--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Bullet--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Bullet--exports.isReverse"></a>

#### exports.isReverse(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isReverse status of the chart. If true,
the elements will be rendered in reverse order.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Desired height for the chart |

<a name="module_Bullet--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Bullet--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Bullet--exports.paddingBetweenAxisAndChart"></a>

#### exports.paddingBetweenAxisAndChart(_x) ⇒ <code>Number</code> \| <code>module</code>
Space between axis and chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current value of paddingBetweenAxisAndChart or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>5</code> | Space between y axis and chart |

<a name="module_Bullet--exports.startMaxRangeOpacity"></a>

#### exports.startMaxRangeOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the starting point of the capacity range.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - current startMaxRangeOpacity or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>0.5</code> | Desired startMaxRangeOpacity for chart |

**Example**  
```js
bulletChart.startMaxRangeOpacity(0.8)
```
<a name="module_Bullet--exports.ticks"></a>

#### exports.ticks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current ticks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired horizontal ticks |

<a name="module_Bullet--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the chart |

<a name="module_Donut"></a>

## Donut
Reusable Donut Chart API class that renders a
simple and configurable donut chart.

**Requires**: <code>module:d3-dispatch,</code>  
**Example**  
```js
var donutChart = donut();

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

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>DonutChartData</code>](#DonutChartData) | The data to attach and generate the chart |

<a name="module_Donut--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Donut--exports.centeredTextFunction"></a>

#### exports.centeredTextFunction(_x) ⇒ <code>function</code> \| <code>module</code>
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

#### exports.colorMap([_x]) ⇒ <code>number</code> \| <code>module</code>
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

#### exports.colorSchema(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Donut--exports.emptyDataConfig"></a>

#### exports.emptyDataConfig(_x) ⇒ <code>Object</code> \| <code>module</code>
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

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Donut--exports.externalRadius"></a>

#### exports.externalRadius(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the externalRadius of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current externalRadius or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | ExternalRadius number to get/set |

<a name="module_Donut--exports.hasCenterLegend"></a>

#### exports.hasCenterLegend(_x) ⇒ <code>boolean</code> \| <code>Module</code>
Gets or Sets the hasCenterLegend property of the chart, making it display
legend at the center of the donut.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>Module</code> - Current hasCenterLegend flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | If we want to show legent at the center of the donut |

<a name="module_Donut--exports.hasHoverAnimation"></a>

#### exports.hasHoverAnimation(_x) ⇒ <code>boolean</code> \| <code>module</code>
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

#### exports.hasFixedHighlightedSlice(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
highlight the selected slice id set with `highlightSliceById` all the time.

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasFixedHighlightedSlice flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | If we want to make the highlighted slice permanently highlighted |

<a name="module_Donut--exports.hasLastHoverSliceHighlighted"></a>

#### exports.hasLastHoverSliceHighlighted(_x) ⇒ <code>boolean</code> \| <code>module</code>
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

#### exports.height(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current height or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Donut--exports.highlightSliceById"></a>

#### exports.highlightSliceById(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the id of the slice to highlight

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current highlighted slice id or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Slice id |

<a name="module_Donut--exports.internalRadius"></a>

#### exports.internalRadius(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the internalRadius of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current internalRadius or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | InternalRadius number to get/set |

<a name="module_Donut--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired animation flag |

<a name="module_Donut--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Donut--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>Object</code> \| <code>Module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Object</code> \| <code>Module</code> - Current margin or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Donut--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the donut chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Donut--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Donut--exports.orderingFunction"></a>

#### exports.orderingFunction(_x) ⇒ <code>function</code> \| <code>Module</code>
Changes the order of items given custom function

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>function</code> \| <code>Module</code> - Void function with no return  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | A custom function that sets logic for ordering |

<a name="module_Donut--exports.percentageFormat"></a>

#### exports.percentageFormat(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the percentage format for the percentage label

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current format or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Format for the percentage label (e.g. '.1f') |

<a name="module_Donut--exports.radiusHoverOffset"></a>

#### exports.radiusHoverOffset(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the radiusHoverOffset of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current offset or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the hovered slice |

<a name="module_Donut--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Donut--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current width or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Grouped-bar"></a>

## Grouped-bar
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
        * [.valueLocale([_x])](#module_Grouped-bar--exports.valueLocale) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
        * [.width([_x])](#module_Grouped-bar--exports.width) ⇒ <code>Number</code> \| <code>module</code>
        * [.xTicks([_x])](#module_Grouped-bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
        * [.yAxisLabel(_x)](#module_Grouped-bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.yAxisLabelOffset([_x])](#module_Grouped-bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
        * [.yTicks([_x])](#module_Grouped-bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
        * [.yTickTextOffset([_x])](#module_Grouped-bar--exports.yTickTextOffset) ⇒ <code>Object</code> \| <code>module</code>

<a name="exp_module_Grouped-bar--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | [<code>GroupedBarChartData</code>](#GroupedBarChartData) | The data to attach and generate the chart |

<a name="module_Grouped-bar--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Grouped-bar--exports.betweenBarsPadding"></a>

#### exports.betweenBarsPadding([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding between bars.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0.1</code> | Padding value to get/set |

<a name="module_Grouped-bar--exports.betweenGroupsPadding"></a>

#### exports.betweenGroupsPadding([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding between groups of bars.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current group padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0.1</code> | Padding value to get/set |

<a name="module_Grouped-bar--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
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

#### exports.colorSchema(_x) ⇒ <code>colorSchema</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>colorSchema</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Grouped-bar--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Grouped-bar--exports.groupLabel"></a>

#### ~~exports.groupLabel(_x) ⇒ <code>groupLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the groupLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>groupLabel</code> \| <code>module</code> - Current groupLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired groupLabel for the graph |

<a name="module_Grouped-bar--exports.grid"></a>

#### exports.grid([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code></code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Grouped-bar--exports.height"></a>

#### exports.height([_x]) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>500</code> | Desired width for the graph |

<a name="module_Grouped-bar--exports.isHorizontal"></a>

#### exports.isHorizontal([_x]) ⇒ <code>isHorizontal</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>isHorizontal</code> \| <code>module</code> - If it is horizontal or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>false</code> | Desired horizontal direction for the graph |

<a name="module_Grouped-bar--exports.isAnimated"></a>

#### exports.isAnimated([_x]) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | Desired animation flag |

<a name="module_Grouped-bar--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls     * @public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Grouped-bar--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Grouped-bar--exports.nameLabel"></a>

#### ~~exports.nameLabel(_x) ⇒ <code>nameLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>nameLabel</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired dateLabel for the graph |

<a name="module_Grouped-bar--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
Gets or Sets the numberFormat of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = ',f'     Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Grouped-bar--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Grouped-bar--exports.tooltipThreshold"></a>

#### exports.tooltipThreshold([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>480</code> | Minimum width of chart to show the tooltip |

<a name="module_Grouped-bar--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Grouped-bar--exports.valueLocale"></a>

#### exports.valueLocale([_x]) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | [<code>LocaleObject</code>](#LocaleObject) | <code></code> | _x     Desired locale object format. |

**Example**  
```js
groupedBarChart
 .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Grouped-bar--exports.width"></a>

#### exports.width([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>960</code> | Desired width for the graph |

<a name="module_Grouped-bar--exports.xTicks"></a>

#### exports.xTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired xTicks |

<a name="module_Grouped-bar--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
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

#### exports.yAxisLabelOffset([_x]) ⇒ <code>Number</code> \| <code>module</code>
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

#### exports.yTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired vertical ticks |

<a name="module_Grouped-bar--exports.yTickTextOffset"></a>

#### exports.yTickTextOffset([_x]) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the x and y offset of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Grouped-bar--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current offset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Object</code> | <code>{ y: -8, x: -20 }</code> | Desired offset |

<a name="module_Heatmap"></a>

## Heatmap
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

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>HeatmapData</code>](#HeatmapData) | The data to attach and generate the chart |

<a name="module_Heatmap--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Heatmap--exports.boxSize"></a>

#### exports.boxSize(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the boxSize of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current boxSize or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>30</code> | Desired boxSize for the heatmap boxes |

<a name="module_Heatmap--exports.colorSchema"></a>

#### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>britecharts-red</code> | Desired colorSchema for the heatma boxes |

<a name="module_Heatmap--exports.exportChart"></a>

#### exports.exportChart(filename, title)
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Heatmap--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>270</code> | Desired height for the chart |

<a name="module_Heatmap--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated value of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Decide whether to show chart animation |

<a name="module_Heatmap--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Heatmap--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Heatmap--exports.yAxisLabels"></a>

#### exports.yAxisLabels(_x) ⇒ <code>yAxisLabels</code> \| <code>module</code>
Gets or Sets the y-axis labels of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>yAxisLabels</code> \| <code>module</code> - Current yAxisLabels array or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>[&#x27;Mo&#x27;,</code> | 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']     An array of string labels across the y-axis |

<a name="module_Heatmap--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Heatmap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>780</code> | Desired width for the chart |

<a name="module_Grid"></a>

## Grid
Reusable Grid component helper that renders either a vertical, horizontal or full grid, and that
will usually be used inside charts. It could also be used as a standalone component to use on custom charts.

**Requires**: <code>module:d3-scale</code>  

* [Grid](#module_Grid)
    * [.grid(scaleX, scaleY)](#module_Grid.grid) ⇒ <code>gridGenerator</code>
    * [.gridHorizontal(scale)](#module_Grid.gridHorizontal) ⇒ <code>gridBaseGenerator</code>
    * [.gridVertical(scale)](#module_Grid.gridVertical) ⇒ <code>gridBaseGenerator</code>

<a name="module_Grid.grid"></a>

### Grid.grid(scaleX, scaleY) ⇒ <code>gridGenerator</code>
Constructor for a two-dimensional grid helper

**Kind**: static method of [<code>Grid</code>](#module_Grid)  

| Param | Type | Description |
| --- | --- | --- |
| scaleX | <code>\*</code> | d3 scale for the grid's x direction |
| scaleY | <code>\*</code> | d3 scale for the grid's y direction |

**Example**  
```js
const grid = grid(xScale, yScale)
        .offsetStart(5)
        .hideEdges(true)
        .ticks(4);

    grid(svg.select('.grid-lines-group'));
```
<a name="module_Grid.gridHorizontal"></a>

### Grid.gridHorizontal(scale) ⇒ <code>gridBaseGenerator</code>
Constructor for a horizontal grid helper

**Kind**: static method of [<code>Grid</code>](#module_Grid)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>\*</code> | d3 scale to initialize the grid |

**Example**  
```js
const grid = gridHorizontal(yScale)
        .range([0, chartWidth])
        .hideEdges('first')
        .ticks(yTicks);

    grid(svg.select('.grid-lines-group'));
```
<a name="module_Grid.gridVertical"></a>

### Grid.gridVertical(scale) ⇒ <code>gridBaseGenerator</code>
Constructor for a vertical grid helper

**Kind**: static method of [<code>Grid</code>](#module_Grid)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>\*</code> | d3 scale to initialize the grid |

**Example**  
```js
const grid = gridVertical(xScale)
        .range([0, chartHeight])
        .hideEdges('first')
        .ticks(xTicks);

    grid(svg.select('.grid-lines-group'));
```
<a name="module_Legend"></a>

## Legend
Legend Component reusable API class that renders a
simple and configurable legend element.

**Requires**: <code>module:d3-format,</code>  
**Example**  
```js
var donutChart = donut(),
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

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>LegendChartData</code>](#LegendChartData) | The data to attach and generate the chart |

<a name="module_Legend--exports.clearHighlight"></a>

#### exports.clearHighlight()
Command that clears all highlighted entries on a legend instance

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Access**: public  
<a name="module_Legend--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

<a name="module_Legend--exports.colorSchema"></a>

#### exports.colorSchema([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current colorSchema or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>array</code> | <code>colorHelper.colorSchemas.britecharts</code> | Color scheme array to get/set |

<a name="module_Legend--exports.height"></a>

#### exports.height([_x]) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>180</code> | Desired width for the chart in pixels |

<a name="module_Legend--exports.highlight"></a>

#### exports.highlight(entryId)
Command that highlights a line entry by fading the rest of lines on a legend instance

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| entryId | <code>number</code> | ID of the entry line |

<a name="module_Legend--exports.highlightEntryById"></a>

#### exports.highlightEntryById([_x]) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the id of the entry to highlight

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current highlighted slice id or Donut Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code></code> | Entry id |

<a name="module_Legend--exports.isHorizontal"></a>

#### exports.isHorizontal([_x]) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the horizontal mode on the legend

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is horizontal or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Boolean</code> | <code>false</code> | Desired horizontal mode for the graph |

<a name="module_Legend--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Legend module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Legend--exports.marginRatio"></a>

#### exports.marginRatio([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the margin ratio of the legend chart.
Used to determine spacing between legend elements.

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current marginRatio or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>1.5</code> | Margin Ratio to get/set |

<a name="module_Legend--exports.markerSize"></a>

#### exports.markerSize([_x]) ⇒ <code>object</code> \| <code>module</code>
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

#### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current number format or Legend module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = 's'      Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Legend--exports.unit"></a>

#### exports.unit([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the unit of the value

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current unit or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;&#x27;</code> | Desired unit |

<a name="module_Legend--exports.width"></a>

#### exports.width([_x]) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the width of the legend chart

**Kind**: static method of [<code>exports</code>](#exp_module_Legend--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current width or Legend module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>number</code> | <code>320</code> | Desired width for the graph in pixels |

<a name="module_Line"></a>

## Line
Line Chart reusable API module that allows us
rendering a multi line and configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let lineChart = line();

lineChart
    .width(500);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(lineChart);
```

* [Line](#module_Line)
    * [exports(_selection, _data)](#exp_module_Line--exports) ⏏
        * [.axisTimeCombinations](#module_Line--exports.axisTimeCombinations)
        * [.animationDuration(_x)](#module_Line--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
        * [.xAxisLabel(_x)](#module_Line--exports.xAxisLabel) ⇒ <code>string</code> \| <code>module</code>
        * [.yAxisLabel(_x)](#module_Line--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.colorSchema(_x)](#module_Line--exports.colorSchema) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
        * [.colorMap([_x])](#module_Line--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
        * ~~[.dateLabel(_x)](#module_Line--exports.dateLabel) ⇒ <code>number</code> \| <code>module</code>~~
        * [.xAxisCustomFormat(_x)](#module_Line--exports.xAxisCustomFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.xAxisFormat(_x)](#module_Line--exports.xAxisFormat) ⇒ <code>String</code> \| <code>Module</code>
        * [.xTicks(_x)](#module_Line--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
        * [.grid(_x)](#module_Line--exports.grid) ⇒ <code>String</code> \| <code>module</code>
        * [.hasMinimumValueScale(_x)](#module_Line--exports.hasMinimumValueScale) ⇒ <code>hasMinimumValueScale</code> \| <code>module</code>
        * [.height(_x)](#module_Line--exports.height) ⇒ <code>Number</code> \| <code>module</code>
        * [.isAnimated(_x)](#module_Line--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
        * [.lines(_x)](#module_Line--exports.lines) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>module</code>
        * [.lineCurve(_x)](#module_Line--exports.lineCurve) ⇒ <code>curve</code> \| <code>module</code>
        * [.lineGradient(_x)](#module_Line--exports.lineGradient) ⇒ <code>Number</code> \| <code>module</code>
        * [.isLoading(flag)](#module_Line--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
        * [.locale(_x)](#module_Line--exports.locale) ⇒ <code>string</code> \| <code>module</code>
        * [.margin(_x)](#module_Line--exports.margin) ⇒ <code>object</code> \| <code>module</code>
        * [.numberFormat(_x)](#module_Line--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.shouldShowAllDataPoints(_x)](#module_Line--exports.shouldShowAllDataPoints) ⇒ <code>shouldShowAllDataPoints</code> \| <code>module</code>
        * [.tooltipThreshold(_x)](#module_Line--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
        * ~~[.topicLabel(_x)](#module_Line--exports.topicLabel) ⇒ <code>topicLabel</code> \| <code>module</code>~~
        * ~~[.valueLabel(_x)](#module_Line--exports.valueLabel) ⇒ <code>valueLabel</code> \| <code>module</code>~~
        * [.yAxisLabelPadding(_x&#x3D;)](#module_Line--exports.yAxisLabelPadding) ⇒ <code>yAxisLabelPadding</code> \| <code>module</code>
        * [.yTicks(_x)](#module_Line--exports.yTicks) ⇒ <code>number</code> \| <code>module</code>
        * [.width(_x)](#module_Line--exports.width) ⇒ <code>number</code> \| <code>Module</code>
        * [.exportChart(filename, title)](#module_Line--exports.exportChart) ⇒ <code>Promise</code>
        * [.on()](#module_Line--exports.on) ⇒ <code>module</code>
        * [.xAxisValueType([_x])](#module_Line--exports.xAxisValueType) ⇒ <code>string</code> \| <code>module</code>
        * [.xAxisScale([_x])](#module_Line--exports.xAxisScale) ⇒ <code>string</code> \| <code>module</code>

<a name="exp_module_Line--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>LineChartData</code>](#LineChartData) | The data to attach and generate the chart |

<a name="module_Line--exports.axisTimeCombinations"></a>

#### exports.axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Line--exports)  
**Example**  
```js
line.xAxisFormat(line.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Line--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Line--exports.xAxisLabel"></a>

#### exports.xAxisLabel(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the label of the X axis of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current label of the X axis or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired label for the X axis |

<a name="module_Line--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the label of the Y axis of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current label of the Y axis or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired label for the Y axis |

<a name="module_Line--exports.colorSchema"></a>

#### exports.colorSchema(_x) ⇒ <code>Array.&lt;string&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | Desired colorSchema for the graph |

<a name="module_Line--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
lineChart.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
```
<a name="module_Line--exports.dateLabel"></a>

#### ~~exports.dateLabel(_x) ⇒ <code>number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired dateLabel for the graph |

<a name="module_Line--exports.xAxisCustomFormat"></a>

#### exports.xAxisCustomFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: localization not supported

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

<a name="module_Line--exports.xAxisFormat"></a>

#### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x axis grouping

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR) Set it to 'custom' to make use of specific formats with xAxisCustomFormat |

**Example**  
```js
line.xAxisCustomFormat(line.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Line--exports.xTicks"></a>

#### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Line--exports.grid"></a>

#### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Line--exports.hasMinimumValueScale"></a>

#### exports.hasMinimumValueScale(_x) ⇒ <code>hasMinimumValueScale</code> \| <code>module</code>
Gets or Sets the hasMinimumValueScale property of the chart, making yAxix bottom value
to adjust to the minimum dataset value.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>hasMinimumValueScale</code> \| <code>module</code> - Current hasMinimumValueScale flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired minimum value flag |

<a name="module_Line--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Line--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>boolean</code> | = false     Desired animation flag |

<a name="module_Line--exports.lines"></a>

#### exports.lines(_x) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>module</code>
Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
onto the chart with a specific color and a text annotation over the line.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Array.&lt;Object&gt;</code> \| <code>module</code> - Current lines or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;object&gt;</code> | Array of Objects describing the lines |

**Example**  
```js
line.lines([{
  y: 2,
  name: 'Maximum threshold',
  color: '#ff0000'
}])
```
<a name="module_Line--exports.lineCurve"></a>

#### exports.lineCurve(_x) ⇒ <code>curve</code> \| <code>module</code>
Gets or Sets the curve of the line chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>curve</code> \| <code>module</code> - Current line curve or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>curve</code> | Desired curve for the lines, default 'linear'. Other options are: basis, natural, monotoneX, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

<a name="module_Line--exports.lineGradient"></a>

#### exports.lineGradient(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the gradient colors of the line chart when there is only one line

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current color gradient or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | Desired color gradient for the line (array of two hexadecimal numbers) |

<a name="module_Line--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Line--exports.locale"></a>

#### exports.locale(_x) ⇒ <code>string</code> \| <code>module</code>
Pass language tag for the tooltip to localize the date.
Uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | A language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Line--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin object of the chart (top, bottom, left and right)

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Line--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the line chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Line--exports.shouldShowAllDataPoints"></a>

#### exports.shouldShowAllDataPoints(_x) ⇒ <code>shouldShowAllDataPoints</code> \| <code>module</code>
Gets or Sets the topicLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>shouldShowAllDataPoints</code> \| <code>module</code> - Current shouldShowAllDataPoints or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Whether all data points should be drawn |

<a name="module_Line--exports.tooltipThreshold"></a>

#### exports.tooltipThreshold(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltip threshold or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired tooltip threshold for the graph |

<a name="module_Line--exports.topicLabel"></a>

#### ~~exports.topicLabel(_x) ⇒ <code>topicLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the topicLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>topicLabel</code> \| <code>module</code> - Current topicLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired topicLabel for the graph |

<a name="module_Line--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>valueLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>valueLabel</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired valueLabel for the graph |

<a name="module_Line--exports.yAxisLabelPadding"></a>

#### exports.yAxisLabelPadding(_x&#x3D;) ⇒ <code>yAxisLabelPadding</code> \| <code>module</code>
Gets or Sets the yAxisLabelPadding of the chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>yAxisLabelPadding</code> \| <code>module</code> - Current yAxisLabelPadding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x= | <code>number</code> | 36                 Desired yAxisLabelPadding for the graph |

<a name="module_Line--exports.yTicks"></a>

#### exports.yTicks(_x) ⇒ <code>number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | = 5     Desired yTicks |

<a name="module_Line--exports.width"></a>

#### exports.width(_x) ⇒ <code>number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>number</code> \| <code>Module</code> - Current width or Line Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Line--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | File title for the resulting picture |
| title | <code>string</code> | Title to add at the top of the exported picture |

<a name="module_Line--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseHover, customMouseMove, customMouseOut,
customDataEntryClick, and customTouchMove

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Line--exports.xAxisValueType"></a>

#### exports.xAxisValueType([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisValueType`.
Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
be dates anymore, but can be arbitrary numbers.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;date&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
line.xAxisValueType('numeric')
```
<a name="module_Line--exports.xAxisScale"></a>

#### exports.xAxisScale([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisScale`.
Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
'number' as well, otherwise it won't influence the visualization.

**Kind**: static method of [<code>exports</code>](#exp_module_Line--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;linear&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
line.xAxisValueType('numeric').xAxisScale('logarithmic')
```
<a name="module_Mini-tooltip"></a>

## Mini-tooltip
Mini Tooltip Component reusable API class that renders a
simple and configurable tooltip element for Britechart's
bar and step chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
var barChart = line(),
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

### exports(_selection) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |

<a name="module_Mini-tooltip--exports.hide"></a>

#### exports.hide() ⇒ <code>Module</code>
Hides the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>Module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Mini-tooltip--exports.nameLabel"></a>

#### ~~exports.nameLabel(_x) ⇒ <code>text</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets data's nameLabel

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>text</code> \| <code>module</code> - nameLabel or Step Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>text</code> | Desired nameLabel |

<a name="module_Mini-tooltip--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format for the value displayed on the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = '.2f'      Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Mini-tooltip--exports.valueFormatter"></a>

#### exports.valueFormatter(_x) ⇒ <code>function</code> \| <code>module</code>
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

#### exports.show() ⇒ <code>Module</code>
Shows the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>Module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Mini-tooltip--exports.title"></a>

#### exports.title(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the title of the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current title or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired title |

<a name="module_Mini-tooltip--exports.update"></a>

#### exports.update(dataPoint, mousePosition, chartSize) ⇒ <code>module</code>
Updates the position and content of the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>module</code> - Current component  

| Param | Type | Description |
| --- | --- | --- |
| dataPoint | <code>Object</code> | Datapoint of the hovered element |
| mousePosition | <code>Array</code> | Mouse position relative to the parent chart [x, y] |
| chartSize | <code>Array</code> | Parent chart size [x, y] |

<a name="module_Mini-tooltip--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>text</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets data's valueLabel

**Kind**: static method of [<code>exports</code>](#exp_module_Mini-tooltip--exports)  
**Returns**: <code>text</code> \| <code>module</code> - valueLabel or Step Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>text</code> | Desired valueLabel |

<a name="module_Scatter-plot"></a>

## Scatter-plot
Reusable Scatter Plot API class that renders a
simple and configurable scatter chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let scatterPlot = scatterPlot();

scatterPlot
    .grid('horizontal')
    .width(500);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(scatterPlot);
```

* [Scatter-plot](#module_Scatter-plot)
    * [exports(_selection, _data)](#exp_module_Scatter-plot--exports) ⏏
        * _static_
            * [.animationDuration(_x)](#module_Scatter-plot--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.circleStrokeOpacity(_x)](#module_Scatter-plot--exports.circleStrokeOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.circleStrokeWidth(_x)](#module_Scatter-plot--exports.circleStrokeWidth) ⇒ <code>Number</code> \| <code>module</code>
            * [.circleOpacity(_x)](#module_Scatter-plot--exports.circleOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Scatter-plot--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Scatter-plot--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Scatter-plot--exports.exportChart) ⇒ <code>Promise</code>
            * [.grid(_x)](#module_Scatter-plot--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.hasCrossHairs(_x)](#module_Scatter-plot--exports.hasCrossHairs) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasHollowCircles(_x)](#module_Scatter-plot--exports.hasHollowCircles) ⇒ <code>boolean</code> \| <code>module</code>
            * [.hasTrendline(_x)](#module_Scatter-plot--exports.hasTrendline) ⇒ <code>boolean</code> \| <code>module</code>
            * [.enableZoom(_x)](#module_Scatter-plot--exports.enableZoom) ⇒ <code>boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Scatter-plot--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.highlightTextLegendOffset(_x)](#module_Scatter-plot--exports.highlightTextLegendOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Scatter-plot--exports.isAnimated) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Scatter-plot--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
            * [.maxCircleArea(_x)](#module_Scatter-plot--exports.maxCircleArea) ⇒ <code>Number</code> \| <code>module</code>
            * [.on()](#module_Scatter-plot--exports.on) ⇒ <code>module</code>
            * [.valueLocale([_x])](#module_Scatter-plot--exports.valueLocale) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
            * [.width(_x)](#module_Scatter-plot--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xAxisLabel(_x)](#module_Scatter-plot--exports.xAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.xAxisLabelOffset(_x)](#module_Scatter-plot--exports.xAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.xAxisFormat(_x)](#module_Scatter-plot--exports.xAxisFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.xAxisFormatType(_x)](#module_Scatter-plot--exports.xAxisFormatType) ⇒ <code>string</code> \| <code>module</code>
            * [.xTicks(_x)](#module_Scatter-plot--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisFormat(_x)](#module_Scatter-plot--exports.yAxisFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Scatter-plot--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset(_x)](#module_Scatter-plot--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Scatter-plot--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
        * _inner_
            * [~nameToColorMap](#module_Scatter-plot--exports..nameToColorMap)

<a name="exp_module_Scatter-plot--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>ScatterPlotData</code>](#ScatterPlotData) | The data to attach and generate the chart |

<a name="module_Scatter-plot--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the circle animation

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Scatter-plot--exports.circleStrokeOpacity"></a>

#### exports.circleStrokeOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets each circle's border opacity value of the chart.
It makes each circle border transparent if it's less than 1.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current circleStrokeOpacity or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1</code> | Desired border opacity of circles of the chart |

**Example**  
```js
scatterPlot.circleStrokeOpacity(0.6)
```
<a name="module_Scatter-plot--exports.circleStrokeWidth"></a>

#### exports.circleStrokeWidth(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets each circle's border width value of the chart.
It makes each circle border transparent if it's less than 1.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current circleStrokeWidth or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1</code> | Desired border width of circles of the chart |

**Example**  
```js
scatterPlot.circleStrokeWidth(10)
```
<a name="module_Scatter-plot--exports.circleOpacity"></a>

#### exports.circleOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the circles opacity value of the chart.
Use this to set opacity of a circle for each data point of the chart.
It makes the area of each data point more transparent if it's less than 1.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current circleOpacity or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>0.24</code> | Desired opacity of circles of the chart |

**Example**  
```js
scatterPlot.circleOpacity(0.6)
```
<a name="module_Scatter-plot--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
scatterPlot.colorMap({name: 'colorHex', name2: 'colorString'})
```
<a name="module_Scatter-plot--exports.colorSchema"></a>

#### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the chart |

**Example**  
```js
scatterPlot.colorSchema(['#fff', '#bbb', '#ccc'])
```
<a name="module_Scatter-plot--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Scatter-plot--exports.grid"></a>

#### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Scatter-plot--exports.hasCrossHairs"></a>

#### exports.hasCrossHairs(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasCrossHairs status. If true,
the hovered data point will be highlighted with lines
and legend from both x and y axis. The user will see
values for x under x axis line and y under y axis. Lines
will be drawn with respect to highlighted data point

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasCrossHairs or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired hasCrossHairs status for chart |

<a name="module_Scatter-plot--exports.hasHollowCircles"></a>

#### exports.hasHollowCircles(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasHollowCircles value of the chart area

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasHollowCircles value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart's data points/circles should be hollow |

<a name="module_Scatter-plot--exports.hasTrendline"></a>

#### exports.hasTrendline(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasTrendline value of the chart area
If true, the trendline calculated based off linear regression
formula will be drawn

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasTrendline value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart's trendline should be drawn |

<a name="module_Scatter-plot--exports.enableZoom"></a>

#### exports.enableZoom(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets weather the chart support zoom controls
If true, zoom event handling will be added to the chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current enableZoom value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart should support zoom controls |

<a name="module_Scatter-plot--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.highlightTextLegendOffset"></a>

#### exports.highlightTextLegendOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Sets a custom distance between legend
values with respect to both axises. The legends
show up when hasCrossHairs is true.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current highlightTextLegendOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired highlightTextLegendOffset for the chart |

**Example**  
```js
scatterPlot.highlightTextLegendOffset(-55)
```
<a name="module_Scatter-plot--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets isAnimated value. If set to true,
the chart will be initialized or updated with animation.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current isAnimated or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired isAnimated properties for each side |

<a name="module_Scatter-plot--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin object of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Desired margin object properties for each side |

<a name="module_Scatter-plot--exports.maxCircleArea"></a>

#### exports.maxCircleArea(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the maximum value of the chart area

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current maxCircleArea or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>10</code> | Desired margin object properties for each side |

<a name="module_Scatter-plot--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customClick, customMouseOut, customMouseOver, and customMouseMove

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>module</code> - Scatter Plot  
**Access**: public  
<a name="module_Scatter-plot--exports.valueLocale"></a>

#### exports.valueLocale([_x]) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | [<code>LocaleObject</code>](#LocaleObject) | <code></code> | _x        Desired locale object format. |

**Example**  
```js
scatterPlot
 .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Scatter-plot--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.xAxisLabel"></a>

#### exports.xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the xAxisLabel of the chart. Adds a
label bellow x-axis for better clarify of data representation.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired string for x-axis label of the chart |

<a name="module_Scatter-plot--exports.xAxisLabelOffset"></a>

#### exports.xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the xAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>-40</code> | Desired offset for the label |

**Example**  
```js
scatterPlot.xAxisLabelOffset(-55)
```
<a name="module_Scatter-plot--exports.xAxisFormat"></a>

#### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes ability to set the format of x-axis values

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired xAxisFormat for the chart |

<a name="module_Scatter-plot--exports.xAxisFormatType"></a>

#### exports.xAxisFormatType(_x) ⇒ <code>string</code> \| <code>module</code>
Exposes ability to set the formatter of x-axis values

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>string</code> \| <code>module</code> - current xAxisFormatType or Chart module to chain calls  
**Access**: public  
**Value**: 'number'  
**Value**: 'time'  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | type of x-axis formatter |

<a name="module_Scatter-plot--exports.xTicks"></a>

#### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the xTicks of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired xTicks for the chart |

<a name="module_Scatter-plot--exports.yAxisFormat"></a>

#### exports.yAxisFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes ability to set the format of y-axis values

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired yAxisForma for the chart |

<a name="module_Scatter-plot--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
scatterPlot.yAxisLabel('Ice Cream Consmuption Growth')
```
<a name="module_Scatter-plot--exports.yAxisLabelOffset"></a>

#### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>-40</code> | Desired offset for the label |

**Example**  
```js
scatterPlot.yAxisLabelOffset(-55)
```
<a name="module_Scatter-plot--exports.yTicks"></a>

#### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the xTicks of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports..nameToColorMap"></a>

#### exports~nameToColorMap
Maps data point category name to
each color of the given color scheme
{
    name1: 'color1',
    name2: 'color2',
    name3: 'color3',
    ...
}

**Kind**: inner property of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
<a name="module_Sparkline"></a>

## Sparkline
Sparkline Chart reusable API module that allows us
rendering a sparkline configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
var sparkLineChart = sparkline();

sparkLineChart
    .width(200)
    .height(100);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(sparkLineChart);
```

* [Sparkline](#module_Sparkline)
    * [exports(_selection, _data)](#exp_module_Sparkline--exports) ⏏
        * [.animationDuration(_x)](#module_Sparkline--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
        * [.areaGradient(_x)](#module_Sparkline--exports.areaGradient) ⇒ <code>areaGradient</code> \| <code>module</code>
        * ~~[.dateLabel(_x)](#module_Sparkline--exports.dateLabel) ⇒ <code>dateLabel</code> \| <code>module</code>~~
        * [.exportChart(filename, title)](#module_Sparkline--exports.exportChart) ⇒ <code>Promise</code>
        * [.height(_x)](#module_Sparkline--exports.height) ⇒ <code>height</code> \| <code>module</code>
        * [.isAnimated(_x)](#module_Sparkline--exports.isAnimated) ⇒ <code>isAnimated</code> \| <code>module</code>
        * [.lineGradient(_x)](#module_Sparkline--exports.lineGradient) ⇒ <code>lineGradient</code> \| <code>module</code>
        * [.isLoading(flag)](#module_Sparkline--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
        * [.margin(_x)](#module_Sparkline--exports.margin) ⇒ <code>object</code> \| <code>module</code>
        * [.titleText(_x)](#module_Sparkline--exports.titleText) ⇒ <code>string</code> \| <code>module</code>
        * [.titleTextStyle(_x)](#module_Sparkline--exports.titleTextStyle) ⇒ <code>Object</code> \| <code>module</code>
        * ~~[.valueLabel(_x)](#module_Sparkline--exports.valueLabel) ⇒ <code>valueLabel</code> \| <code>module</code>~~
        * [.width(_x)](#module_Sparkline--exports.width) ⇒ <code>width</code> \| <code>module</code>

<a name="exp_module_Sparkline--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | [<code>SparklineChartData</code>](#SparklineChartData) | The data to attach and generate the chart |

<a name="module_Sparkline--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Sparkline--exports.areaGradient"></a>

#### exports.areaGradient(_x) ⇒ <code>areaGradient</code> \| <code>module</code>
Gets or Sets the areaGradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>areaGradient</code> \| <code>module</code> - Current areaGradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = ['#F5FDFF', '#F6FEFC']   Desired areaGradient for the graph |

<a name="module_Sparkline--exports.dateLabel"></a>

#### ~~exports.dateLabel(_x) ⇒ <code>dateLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>dateLabel</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired dateLabel for the graph |

<a name="module_Sparkline--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | File title for the resulting picture |
| title | <code>string</code> | Title to add at the top of the exported picture |

<a name="module_Sparkline--exports.height"></a>

#### exports.height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>30</code> | Desired height for the graph |

<a name="module_Sparkline--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired animation flag |

<a name="module_Sparkline--exports.lineGradient"></a>

#### exports.lineGradient(_x) ⇒ <code>lineGradient</code> \| <code>module</code>
Gets or Sets the lineGradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>lineGradient</code> \| <code>module</code> - Current lineGradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = colorHelper.colorGradients.greenBlue     Desired lineGradient for the graph |

<a name="module_Sparkline--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Sparkline--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Sparkline--exports.titleText"></a>

#### exports.titleText(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the text of the title at the top of sparkline.
To style the title, use the titleTextStyle method below.

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current titleText or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = null   String to set |

<a name="module_Sparkline--exports.titleTextStyle"></a>

#### exports.titleTextStyle(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the text style object of the title at the top of sparkline.
Using this method, you can set font-family, font-size, font-weight, font-style,
and color (fill). The default text font settings:

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current titleTextStyle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Object with text font configurations |

**Example**  
```js
<pre>
<code>
{
   'font-family': 'sans-serif',
   'font-size': '22px',
   'font-weight': 0,
   'font-style': 'normal',
   'fill': linearGradient[0]
}
</code>
</pre>

You can set attributes individually. Setting just 'font-family'
within the object will set custom 'font-family` while the rest
of the attributes will have the default values provided above.
```
**Example**  
```js
sparkline.titleTextStyle({
   'font-family': 'Roboto',
   'font-size': '1.5em',
   'font-weight': 600,
   'font-style': 'italic',
   'fill': 'lightblue'
})
```
<a name="module_Sparkline--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>valueLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>valueLabel</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired valueLabel for the graph |

<a name="module_Sparkline--exports.width"></a>

#### exports.width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>100</code> | Desired width for the graph |

<a name="module_Stacked-area"></a>

## Stacked-area
Stacked Area Chart reusable API module that allows us
rendering a multi area and configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
let stackedArea = stackedArea();

stackedArea
    .width(containerWidth);

d3Selection.select('.css-selector')
    .datum(dataset.data)
    .call(stackedArea);
```

* [Stacked-area](#module_Stacked-area)
    * [exports(_selection, _data)](#exp_module_Stacked-area--exports) ⏏
        * [.axisTimeCombinations](#module_Stacked-area--exports.axisTimeCombinations)
        * [.animationDuration(_x)](#module_Stacked-area--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
        * [.areaCurve([_x])](#module_Stacked-area--exports.areaCurve) ⇒ <code>String</code> \| <code>module</code>
        * [.areaOpacity(_x)](#module_Stacked-area--exports.areaOpacity) ⇒ <code>Number</code> \| <code>module</code>
        * [.colorMap([_x])](#module_Stacked-area--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
        * [.colorSchema(_x)](#module_Stacked-area--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
        * ~~[.dateLabel(_x)](#module_Stacked-area--exports.dateLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.emptyDataConfig(_x)](#module_Stacked-area--exports.emptyDataConfig) ⇒ <code>Object</code> \| <code>module</code>
        * [.grid(_x)](#module_Stacked-area--exports.grid) ⇒ <code>String</code> \| <code>module</code>
        * [.hasOutline(_x)](#module_Stacked-area--exports.hasOutline) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.height(_x)](#module_Stacked-area--exports.height) ⇒ <code>Number</code> \| <code>module</code>
        * [.isAnimated(_x)](#module_Stacked-area--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
        * ~~[.keyLabel(_x)](#module_Stacked-area--exports.keyLabel) ⇒ <code>Number</code> \| <code>module</code>~~
        * [.margin(_x)](#module_Stacked-area--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
        * [.tooltipThreshold(_x)](#module_Stacked-area--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
        * [.topicsOrder(_x)](#module_Stacked-area--exports.topicsOrder) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
        * [.isLoading(flag)](#module_Stacked-area--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
        * [.locale(_x)](#module_Stacked-area--exports.locale) ⇒ <code>String</code> \| <code>Module</code>
        * [.exportChart(filename, title)](#module_Stacked-area--exports.exportChart) ⇒ <code>Promise</code>
        * [.on()](#module_Stacked-area--exports.on) ⇒ <code>module</code>
        * ~~[.valueLabel(_x)](#module_Stacked-area--exports.valueLabel) ⇒ <code>Number</code> \| <code>module</code>~~
        * [.width(_x)](#module_Stacked-area--exports.width) ⇒ <code>Number</code> \| <code>module</code>
        * [.xAxisCustomFormat(_x)](#module_Stacked-area--exports.xAxisCustomFormat) ⇒ <code>String</code> \| <code>Module</code>
        * [.xAxisFormat(_x)](#module_Stacked-area--exports.xAxisFormat) ⇒ <code>String</code> \| <code>Module</code>
        * [.xAxisValueType([_x])](#module_Stacked-area--exports.xAxisValueType) ⇒ <code>string</code> \| <code>module</code>
        * [.xAxisScale([_x])](#module_Stacked-area--exports.xAxisScale) ⇒ <code>string</code> \| <code>module</code>
        * [.xTicks(_x)](#module_Stacked-area--exports.xTicks) ⇒ <code>Number</code> \| <code>Module</code>
        * [.yAxisLabel(_x)](#module_Stacked-area--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.yAxisLabelOffset([_x])](#module_Stacked-area--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
        * [.yTicks([_x])](#module_Stacked-area--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
        * [.yAxisBaseline([_x])](#module_Stacked-area--exports.yAxisBaseline) ⇒ <code>Number</code> \| <code>module</code>

<a name="exp_module_Stacked-area--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | [<code>AreaChartData</code>](#AreaChartData) | The data to attach and generate the chart |

<a name="module_Stacked-area--exports.axisTimeCombinations"></a>

#### exports.axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Example**  
```js
area.xAxisCustomFormat(area.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the area animation

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Stacked-area--exports.areaCurve"></a>

#### exports.areaCurve([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the area curve of the stacked area.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current area curve setting or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;monotoneX&#x27;</code> | Desired curve for the stacked area, default 'monotoneX'. Other options are: basis, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

**Example**  
```js
stackedArea.areaCurve('step')
```
<a name="module_Stacked-area--exports.areaOpacity"></a>

#### exports.areaOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current opacity or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Opacity to get/set |

<a name="module_Stacked-area--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
stackedArea.colorMap({name: 'colorHex', name2: 'colorString'})
```
<a name="module_Stacked-area--exports.colorSchema"></a>

#### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Stacked-area--exports.dateLabel"></a>

#### ~~exports.dateLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired dateLabel for the graph |

<a name="module_Stacked-area--exports.emptyDataConfig"></a>

#### exports.emptyDataConfig(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the emptyDataConfig of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current config for when chart data is an empty array  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | emptyDataConfig object to get/set |

<a name="module_Stacked-area--exports.grid"></a>

#### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Stacked-area--exports.hasOutline"></a>

#### exports.hasOutline(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Enables or disables the outline at the top of the areas

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current state of the flag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = true   Whether if the areas in the chart have an outline at the top |

<a name="module_Stacked-area--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-area--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Stacked-area--exports.keyLabel"></a>

#### ~~exports.keyLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the keyLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current keyLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired keyLabel for the graph |

<a name="module_Stacked-area--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Stacked-area--exports.tooltipThreshold"></a>

#### exports.tooltipThreshold(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Minimum width of the graph |

<a name="module_Stacked-area--exports.topicsOrder"></a>

#### exports.topicsOrder(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Pass an override for the ordering of the topics

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current override order or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Array of the names of your tooltip items |

<a name="module_Stacked-area--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Stacked-area--exports.locale"></a>

#### exports.locale(_x) ⇒ <code>String</code> \| <code>Module</code>
Pass language tag for the tooltip to localize the date.
Feature uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | A language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Stacked-area--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Stacked-area--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut,
customDataEntryClick and customTouchMove

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>module</code> - Stacked Area  
**Access**: public  
<a name="module_Stacked-area--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Stacked-area--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-area--exports.xAxisCustomFormat"></a>

#### exports.xAxisCustomFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: localization not supported

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

**Example**  
```js
stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.xAxisFormat"></a>

#### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x axis grouping

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR) Set it to 'custom' to make use of specific formats with xAxisCustomFormat |

**Example**  
```js
stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.xAxisValueType"></a>

#### exports.xAxisValueType([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisValueType`.
Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
be dates anymore, but can be arbitrary numbers.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;date&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
stackedArea.xAxisValueType('numeric')
```
<a name="module_Stacked-area--exports.xAxisScale"></a>

#### exports.xAxisScale([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisScale`.
Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
'number' as well, otherwise it won't influence the visualization.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;linear&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
stackedArea.xAxisValueType('numeric').xAxisScale('logarithmic')
```
<a name="module_Stacked-area--exports.xTicks"></a>

#### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Stacked-area--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
stackedArea.yAxisLabel('Ticket Sales')
```
<a name="module_Stacked-area--exports.yAxisLabelOffset"></a>

#### exports.yAxisLabelOffset([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>-60</code> | Desired offset for the label |

**Example**  
```js
stackedArea.yAxisLabelOffset(-55)
```
<a name="module_Stacked-area--exports.yTicks"></a>

#### exports.yTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current vertical ticks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired vertical ticks |

<a name="module_Stacked-area--exports.yAxisBaseline"></a>

#### exports.yAxisBaseline([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
(default is 0). Change this value if you don't want to start your area from y=0.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current baseline or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0</code> | Desired baseline of the y axis |

**Example**  
```js
stackedArea.yAxisBaseline(20)
```
<a name="module_Stacked-bar"></a>

## Stacked-bar
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
        * [.valueLocale([_x])](#module_Stacked-bar--exports.valueLocale) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
        * [.width(_x)](#module_Stacked-bar--exports.width) ⇒ <code>Number</code> \| <code>module</code>
        * [.xTicks(_x)](#module_Stacked-bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
        * [.yAxisLabel(_x)](#module_Stacked-bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
        * [.yAxisLabelOffset(_x)](#module_Stacked-bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
        * [.yTicks(_x)](#module_Stacked-bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>

<a name="exp_module_Stacked-bar--exports"></a>

### exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | [<code>StackedBarData</code>](#StackedBarData) | The data to attach and generate the chart |

<a name="module_Stacked-bar--exports.animationDuration"></a>

#### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Stacked-bar--exports.betweenBarsPadding"></a>

#### exports.betweenBarsPadding(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding of the stacked bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 0.1    Padding value to get/set |

<a name="module_Stacked-bar--exports.colorMap"></a>

#### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
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

#### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | = colorSchemas.britecharts     Desired colorSchema for the graph |

<a name="module_Stacked-bar--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Stacked-bar--exports.grid"></a>

#### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Stacked-bar--exports.hasPercentage"></a>

#### exports.hasPercentage(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the hasPercentage status

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Is percentage used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Should use percentage as value format |

<a name="module_Stacked-bar--exports.height"></a>

#### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-bar--exports.hasReversedStacks"></a>

#### exports.hasReversedStacks(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current hasReversedStacks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired hasReversedStacks flag |

<a name="module_Stacked-bar--exports.isAnimated"></a>

#### exports.isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Stacked-bar--exports.isHorizontal"></a>

#### exports.isHorizontal(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is horizontal or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired horizontal direction for the graph |

<a name="module_Stacked-bar--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Stacked-bar--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Stacked-bar--exports.nameLabel"></a>

#### ~~exports.nameLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired dateLabel for the graph |

<a name="module_Stacked-bar--exports.numberFormat"></a>

#### exports.numberFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the numberFormat of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | = ',f'     Desired numberFormat for the graph. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Stacked-bar--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Stacked-bar--exports.percentageAxisToMaxRatio"></a>

#### exports.percentageAxisToMaxRatio(_x) ⇒ <code>Number</code> \| <code>module</code>
Configurable extension of the x axis
If your max point was 50% you might want to show x axis to 60%, pass 1.2

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current ratio or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Ratio to max data point to add to the x axis |

<a name="module_Stacked-bar--exports.stackLabel"></a>

#### ~~exports.stackLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the stackLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current stackLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired stackLabel for the graph |

<a name="module_Stacked-bar--exports.tooltipThreshold"></a>

#### exports.tooltipThreshold([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>480</code> | Minimum width of the graph |

<a name="module_Stacked-bar--exports.valueLabel"></a>

#### ~~exports.valueLabel(_x) ⇒ <code>Number</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired valueLabel for the graph |

<a name="module_Stacked-bar--exports.valueLocale"></a>

#### exports.valueLocale([_x]) ⇒ [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: [<code>LocaleObject</code>](#LocaleObject) \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | [<code>LocaleObject</code>](#LocaleObject) | <code></code> | _x    Desired locale object format. |

**Example**  
```js
stackedBarChart
 .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Stacked-bar--exports.width"></a>

#### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 960    Desired width for the graph |

<a name="module_Stacked-bar--exports.xTicks"></a>

#### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired horizontal ticks |

<a name="module_Stacked-bar--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
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

#### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
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

#### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks of the axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired vertical ticks |

<a name="module_Step"></a>

## ~~Step~~
***Deprecated***

Step Chart reusable API class that renders a
simple and configurable step chart.
NOTE: We will be deprecating this chart soon

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
var stepChart= step();

stepChart
    .height(500)
    .width(800);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(stepChart);
```

* ~~[Step](#module_Step)~~
    * ~~[exports(_selection, _data)](#exp_module_Step--exports) ⏏~~
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

<a name="exp_module_Step--exports"></a>

### ~~exports(_selection, _data) ⏏~~
***Deprecated***

This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | [<code>D3Selection</code>](#D3Selection) | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>StepChartData</code>](#StepChartData) | The data to attach and generate the chart |

<a name="module_Step--exports.exportChart"></a>

#### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Step--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Step--exports.yTicks"></a>

#### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks on the chart
(Default is 6)

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired number of vertical ticks for the graph |

<a name="module_Step--exports.height"></a>

#### exports.height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Step--exports.isLoading"></a>

#### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Step--exports.on"></a>

#### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove and customMouseOut

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Step--exports.width"></a>

#### exports.width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired width for the graph |

<a name="module_Step--exports.xAxisLabel"></a>

#### exports.xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>String</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Step--exports.xAxisLabelOffset"></a>

#### exports.xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the xAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired offset for the label |

<a name="module_Step--exports.yAxisLabel"></a>

#### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the text of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>String</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired text for the label |

<a name="module_Step--exports.yAxisLabelOffset"></a>

#### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Step--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - label or Chart module to chain calls  
**Access**: public  

| Param | Type | Descript