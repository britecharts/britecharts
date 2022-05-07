<a name="module_Bullet"></a>

# Bullet
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
        * _static_
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
        * _inner_
            * [~BulletChartData](#module_Bullet--exports..BulletChartData) : <code>Object</code>

<a name="exp_module_Bullet--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>BulletChartData</code> | The data to attach and generate the chart |

<a name="module_Bullet--exports.colorSchema"></a>

### exports.colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
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

### exports.customTitle(_x) ⇒ <code>String</code> \| <code>module</code>
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

### exports.customSubtitle(_x) ⇒ <code>String</code> \| <code>module</code>
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

### exports.exportChart(filename, title) ⇒ <code>Promise</code>
Chart exported to png and a download action is fired

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | File title for the resulting picture |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Bullet--exports.height"></a>

### exports.height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired height for the chart |

<a name="module_Bullet--exports.isReverse"></a>

### exports.isReverse(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isReverse status of the chart. If true,
the elements will be rendered in reverse order.

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Desired height for the chart |

<a name="module_Bullet--exports.margin"></a>

### exports.margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Bullet--exports.numberFormat"></a>

### exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://observablehq.com/@d3/d3-format) |

<a name="module_Bullet--exports.paddingBetweenAxisAndChart"></a>

### exports.paddingBetweenAxisAndChart(_x) ⇒ <code>Number</code> \| <code>module</code>
Space between axis and chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current value of paddingBetweenAxisAndChart or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>5</code> | Space between y axis and chart |

<a name="module_Bullet--exports.startMaxRangeOpacity"></a>

### exports.startMaxRangeOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
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

### exports.ticks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current ticks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired horizontal ticks |

<a name="module_Bullet--exports.width"></a>

### exports.width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bullet--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the chart |

<a name="module_Bullet--exports..BulletChartData"></a>

### exports~BulletChartData : <code>Object</code>
**Kind**: inner typedef of [<code>exports</code>](#exp_module_Bullet--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ranges | <code>Array.&lt;Number&gt;</code> | Range that encodes the qualitative measure |
| measures | <code>Array.&lt;Number&gt;</code> | Range that encodes the performance measure |
| markers | <code>Array.&lt;Number&gt;</code> | Marker lines that encode the comparative measure |
| [title] | <code>String</code> | String that sets identification for the measure |
| [subtitle] | <code>String</code> | String that provides more details on measure identification |

**Example**  
```js
{
     ranges: [130, 160, 250],
     measures: [150, 180],
     markers: [175],
     title: 'Title for Bullet',
     subtitle: 'Subtitle'
}
```
