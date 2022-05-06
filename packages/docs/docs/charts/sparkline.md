# Modules

<dl>
<dt><a href="#module_Sparkline">Sparkline</a></dt>
<dd><p>Sparkline Chart reusable API module that allows us
rendering a sparkline configurable chart.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#SparklineChartData">SparklineChartData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Sparkline"></a>

# Sparkline
Sparkline Chart reusable API module that allows us
rendering a sparkline configurable chart.

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
const sparkLineChart = sparkline();

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

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | [<code>SparklineChartData</code>](#SparklineChartData) | The data to attach and generate the chart |

<a name="module_Sparkline--exports.animationDuration"></a>

### exports.animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Sparkline--exports.areaGradient"></a>

### exports.areaGradient(_x) ⇒ <code>areaGradient</code> \| <code>module</code>
Gets or Sets the areaGradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>areaGradient</code> \| <code>module</code> - Current areaGradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = ['#F5FDFF', '#F6FEFC']   Desired areaGradient for the graph |

<a name="module_Sparkline--exports.dateLabel"></a>

### ~~exports.dateLabel(_x) ⇒ <code>dateLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>dateLabel</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired dateLabel for the graph |

<a name="module_Sparkline--exports.exportChart"></a>

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | File title for the resulting picture |
| title | <code>string</code> | Title to add at the top of the exported picture |

<a name="module_Sparkline--exports.height"></a>

### exports.height(_x) ⇒ <code>height</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>height</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>30</code> | Desired height for the graph |

<a name="module_Sparkline--exports.isAnimated"></a>

### exports.isAnimated(_x) ⇒ <code>isAnimated</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>isAnimated</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>boolean</code> | <code>false</code> | Desired animation flag |

<a name="module_Sparkline--exports.lineGradient"></a>

### exports.lineGradient(_x) ⇒ <code>lineGradient</code> \| <code>module</code>
Gets or Sets the lineGradient of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>lineGradient</code> \| <code>module</code> - Current lineGradient or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;string&gt;</code> | = colorHelper.colorGradients.greenBlue     Desired lineGradient for the graph |

<a name="module_Sparkline--exports.isLoading"></a>

### exports.isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Sparkline--exports.margin"></a>

### exports.margin(_x) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>object</code> | Margin object to get/set |

<a name="module_Sparkline--exports.titleText"></a>

### exports.titleText(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the text of the title at the top of sparkline.
To style the title, use the titleTextStyle method below.

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current titleText or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = null   String to set |

<a name="module_Sparkline--exports.titleTextStyle"></a>

### exports.titleTextStyle(_x) ⇒ <code>Object</code> \| <code>module</code>
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

### ~~exports.valueLabel(_x) ⇒ <code>valueLabel</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>valueLabel</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>number</code> | Desired valueLabel for the graph |

<a name="module_Sparkline--exports.width"></a>

### exports.width(_x) ⇒ <code>width</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Sparkline--exports)  
**Returns**: <code>width</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>number</code> | <code>100</code> | Desired width for the graph |

<a name="SparklineChartData"></a>

# SparklineChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value of the group (required) |
| name | <code>string</code> | Name of the group (required) |

**Example**  
```js
[
    {
        value: 1,
        date: '2011-01-06T00:00:00Z'
    },
    {
        value: 2,
        date: '2011-01-07T00:00:00Z'
    }
]
```
