# Modules

<dl>
<dt><a href="#module_Scatter-plot">Scatter-plot</a></dt>
<dd><p>Reusable Scatter Plot API class that renders a
simple and configurable scatter chart.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#ScatterPlotData">ScatterPlotData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Scatter-plot"></a>

# Scatter-plot
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
            * [.valueLocale([_x])](#module_Scatter-plot--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
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

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | [<code>ScatterPlotData</code>](#ScatterPlotData) | The data to attach and generate the chart |

<a name="module_Scatter-plot--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the circle animation

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Scatter-plot--exports.circleStrokeOpacity"></a>

### exports.circleStrokeOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.circleStrokeWidth(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.circleOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
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

### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
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

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Scatter-plot--exports.grid"></a>

### exports.grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Scatter-plot--exports.hasCrossHairs"></a>

### exports.hasCrossHairs(_x) ⇒ <code>boolean</code> \| <code>module</code>
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

### exports.hasHollowCircles(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the hasHollowCircles value of the chart area

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current hasHollowCircles value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart's data points/circles should be hollow |

<a name="module_Scatter-plot--exports.hasTrendline"></a>

### exports.hasTrendline(_x) ⇒ <code>boolean</code> \| <code>module</code>
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

### exports.enableZoom(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets weather the chart support zoom controls
If true, zoom event handling will be added to the chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current enableZoom value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Choose whether chart should support zoom controls |

<a name="module_Scatter-plot--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.highlightTextLegendOffset"></a>

### exports.highlightTextLegendOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.isAnimated(_x) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets isAnimated value. If set to true,
the chart will be initialized or updated with animation.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current isAnimated or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired isAnimated properties for each side |

<a name="module_Scatter-plot--exports.margin"></a>

### exports.margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin object of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Desired margin object properties for each side |

<a name="module_Scatter-plot--exports.maxCircleArea"></a>

### exports.maxCircleArea(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the maximum value of the chart area

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current maxCircleArea or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>10</code> | Desired margin object properties for each side |

<a name="module_Scatter-plot--exports.on"></a>

### exports.on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customClick, customMouseOut, customMouseOver, and customMouseMove

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>module</code> - Scatter Plot  
**Access**: public  
<a name="module_Scatter-plot--exports.valueLocale"></a>

### exports.valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
Gets or Sets the locale which our formatting functions use.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>LocaleObject</code> \| <code>module</code> - Current locale object or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>LocaleObject</code> | <code></code> | _x        Desired locale object format. |

**Example**  
```js
scatterPlot
 .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
```
<a name="module_Scatter-plot--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports.xAxisLabel"></a>

### exports.xAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the xAxisLabel of the chart. Adds a
label bellow x-axis for better clarify of data representation.

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired string for x-axis label of the chart |

<a name="module_Scatter-plot--exports.xAxisLabelOffset"></a>

### exports.xAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.xAxisFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes ability to set the format of x-axis values

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired xAxisFormat for the chart |

<a name="module_Scatter-plot--exports.xAxisFormatType"></a>

### exports.xAxisFormatType(_x) ⇒ <code>string</code> \| <code>module</code>
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

### exports.xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the xTicks of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired xTicks for the chart |

<a name="module_Scatter-plot--exports.yAxisFormat"></a>

### exports.yAxisFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes ability to set the format of y-axis values

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired yAxisForma for the chart |

<a name="module_Scatter-plot--exports.yAxisLabel"></a>

### exports.yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
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

### exports.yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the xTicks of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Scatter-plot--exports..nameToColorMap"></a>

### exports~nameToColorMap
Maps data point category name to
each color of the given color scheme
{
    name1: 'color1',
    name2: 'color2',
    name3: 'color3',
    ...
}

**Kind**: inner property of [<code>exports</code>](#exp_module_Scatter-plot--exports)  
<a name="ScatterPlotData"></a>

# ScatterPlotData : <code>Array.&lt;Object&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the category or topic for data point |
| x | <code>Number</code> | Data point's position value relative to x-axis |
| y | <code>Number</code> | Data point's position value relative to y-axis |

**Example**  
```js
[
    {
        name: 'topic',
        x: 123,
        y: 24,
    },
    {
        name: 'topic1',
        x: 53,
        y: 31,
    },
    {
        name: 'topic2',
        x: 631,
        y: 321,
    },
    {
        name: 'topic1',
        x: 231,
        y: 111,
    }
]
```
