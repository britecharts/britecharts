---
title: Stacked Area
sidebar_position: 1
---

<a name="module_Stacked-area" id="module_Stacked-area"></a>

Stacked Area Chart reusable API module that allows us
rendering a multi area and configurable chart.

**Example**  
```js
import { stackedArea } from '@britecharts/core';

// dataset: [{ date, name, value }]
const stackedAreaChart = stackedArea();

stackedAreaChart
    .width(containerWidth)
    .render('.css-selector', dataset);
```

* [Stacked-area](#module_Stacked-area)
    * [stackedArea(_selection, _data)](#exp_module_Stacked-area--exports)
        * _static_
            * [.axisTimeCombinations](#module_Stacked-area--exports.axisTimeCombinations)
            * [.a11yTitle(_x)](#module_Stacked-area--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Stacked-area--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Stacked-area--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Stacked-area--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Stacked-area--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.areaCurve([_x])](#module_Stacked-area--exports.areaCurve) ⇒ <code>String</code> \| <code>module</code>
            * [.areaOpacity(_x)](#module_Stacked-area--exports.areaOpacity) ⇒ <code>Number</code> \| <code>module</code>
            * [.colorMap([_x])](#module_Stacked-area--exports.colorMap) ⇒ <code>object</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Stacked-area--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.emptyDataConfig(_x)](#module_Stacked-area--exports.emptyDataConfig) ⇒ <code>Object</code> \| <code>module</code>
            * [.grid(_x)](#module_Stacked-area--exports.grid) ⇒ <code>String</code> \| <code>module</code>
            * [.hasOutline(_x)](#module_Stacked-area--exports.hasOutline) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.height(_x)](#module_Stacked-area--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Stacked-area--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isNormalized(_x)](#module_Stacked-area--exports.isNormalized) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.numberFormat(_x)](#module_Stacked-area--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
            * [.margin(_x)](#module_Stacked-area--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
            * [.tooltipThreshold(_x)](#module_Stacked-area--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * [.topicsOrder(_x)](#module_Stacked-area--exports.topicsOrder) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Stacked-area--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.locale(_x)](#module_Stacked-area--exports.locale) ⇒ <code>String</code> \| <code>Module</code>
            * [.exportChart(filename, title)](#module_Stacked-area--exports.exportChart) ⇒ <code>Promise</code>
            * [.on()](#module_Stacked-area--exports.on) ⇒ <code>module</code>
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
            * [.tooltip(_x)](#module_Stacked-area--exports.tooltip) ⇒ <code>module</code> \| <code>null</code>
            * [.render(target, [data])](#module_Stacked-area--exports.render) ⇒ <code>module</code>
        * _inner_
            * [~AreaChartData](#module_Stacked-area--exports..AreaChartData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Stacked-area--exports" id="exp_module_Stacked-area--exports"></a>

## stackedArea(_selection, _data)
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>AreaChartData</code> | The data to attach and generate the chart |

<a name="module_Stacked-area--exports.axisTimeCombinations" id="module_Stacked-area--exports.axisTimeCombinations"></a>

## axisTimeCombinations
Exposes the constants to be used to force the x axis to respect a certain granularity
current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: property of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Example**  
```js
area.xAxisCustomFormat(area.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.a11yTitle" id="module_Stacked-area--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Stacked area chart".

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Stacked-area--exports.a11yDescription" id="module_Stacked-area--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Stacked-area--exports.a11yDataTable" id="module_Stacked-area--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Stacked-area--exports.a11yKeyboardNavigation" id="module_Stacked-area--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Stacked-area--exports.animationDuration" id="module_Stacked-area--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the area animation

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Stacked-area--exports.areaCurve" id="module_Stacked-area--exports.areaCurve"></a>

## areaCurve([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the area curve of the stacked area.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current area curve setting or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;monotoneX&#x27;</code> | Desired curve for the stacked area, default 'monotoneX'. Other options are: basis, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and catmullRom. Visit https://github.com/d3/d3-shape#curves for more information. |

**Example**  
```js
stackedArea.areaCurve('step')
```
<a name="module_Stacked-area--exports.areaOpacity" id="module_Stacked-area--exports.areaOpacity"></a>

## areaOpacity(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current opacity or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Opacity to get/set |

<a name="module_Stacked-area--exports.colorMap" id="module_Stacked-area--exports.colorMap"></a>

## colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
Gets or Sets the colorMap of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>object</code> \| <code>module</code> - Current colorMap or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>object</code> | <code></code> | Color map |

**Example**  
```js
stackedArea.colorMap({name: 'colorHex', name2: 'colorString'})
```
<a name="module_Stacked-area--exports.colorSchema" id="module_Stacked-area--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Desired colorSchema for the graph |

<a name="module_Stacked-area--exports.emptyDataConfig" id="module_Stacked-area--exports.emptyDataConfig"></a>

## emptyDataConfig(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the emptyDataConfig of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current config for when chart data is an empty array  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | emptyDataConfig object to get/set |

<a name="module_Stacked-area--exports.grid" id="module_Stacked-area--exports.grid"></a>

## grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Stacked-area--exports.hasOutline" id="module_Stacked-area--exports.hasOutline"></a>

## hasOutline(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Enables or disables the outline at the top of the areas

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current state of the flag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = true   Whether if the areas in the chart have an outline at the top |

<a name="module_Stacked-area--exports.height" id="module_Stacked-area--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-area--exports.isAnimated" id="module_Stacked-area--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Stacked-area--exports.isNormalized" id="module_Stacked-area--exports.isNormalized"></a>

## isNormalized(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the areas fill the whole value axis, a 100%
stacked area chart: each area shows its share of each date's total, and
the value axis runs from 0% to 100%. The tooltip still shows the values.
Meant for data without negative values.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is normalized or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Whether to stack to 100% |

**Example**  
```js
stackedArea.isNormalized(true)
```
<a name="module_Stacked-area--exports.numberFormat" id="module_Stacked-area--exports.numberFormat"></a>

## numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format of the stacked area chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | = ',f'       Desired numberFormat for the chart. See examples [here](https://d3js.org/d3-format) |

<a name="module_Stacked-area--exports.margin" id="module_Stacked-area--exports.margin"></a>

## margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Stacked-area--exports.tooltipThreshold" id="module_Stacked-area--exports.tooltipThreshold"></a>

## tooltipThreshold(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Minimum width of the graph |

<a name="module_Stacked-area--exports.topicsOrder" id="module_Stacked-area--exports.topicsOrder"></a>

## topicsOrder(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Pass an override for the ordering of the topics

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current override order or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Array of the names of your tooltip items |

<a name="module_Stacked-area--exports.isLoading" id="module_Stacked-area--exports.isLoading"></a>

## isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Stacked-area--exports.locale" id="module_Stacked-area--exports.locale"></a>

## locale(_x) ⇒ <code>String</code> \| <code>Module</code>
Pass language tag for the tooltip to localize the date.
Feature uses Intl.DateTimeFormat, for compatability and support, refer to
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | A language tag (BCP 47) like 'en-US' or 'fr-FR' |

<a name="module_Stacked-area--exports.exportChart" id="module_Stacked-area--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Stacked-area--exports.on" id="module_Stacked-area--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut,
customDataEntryClick and customTouchMove

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>module</code> - Stacked Area  
**Access**: public  
<a name="module_Stacked-area--exports.width" id="module_Stacked-area--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-area--exports.xAxisCustomFormat" id="module_Stacked-area--exports.xAxisCustomFormat"></a>

## xAxisCustomFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x format
It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: localization not supported

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format for x axis, one of the d3.js date formats [here](https://github.com/d3/d3-time-format#locale_format) |

**Example**  
```js
stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.xAxisFormat" id="module_Stacked-area--exports.xAxisFormat"></a>

## xAxisFormat(_x) ⇒ <code>String</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x axis grouping

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>Module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR) Set it to 'custom' to make use of specific formats with xAxisCustomFormat |

**Example**  
```js
stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Stacked-area--exports.xAxisValueType" id="module_Stacked-area--exports.xAxisValueType"></a>

## xAxisValueType([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisValueType`.
Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
be dates anymore, but can be arbitrary numbers.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;date&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
stackedArea.xAxisValueType('number')
```
<a name="module_Stacked-area--exports.xAxisScale" id="module_Stacked-area--exports.xAxisScale"></a>

## xAxisScale([_x]) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the `xAxisScale`.
Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
'number' as well, otherwise it won't influence the visualization.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current value type of the x-axis or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>string</code> | <code>&quot;&#x27;linear&#x27;&quot;</code> | Desired value type of the x-axis |

**Example**  
```js
stackedArea.xAxisValueType('number').xAxisScale('logarithmic')
```
<a name="module_Stacked-area--exports.xTicks" id="module_Stacked-area--exports.xTicks"></a>

## xTicks(_x) ⇒ <code>Number</code> \| <code>Module</code>
Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
how many and where the ticks will appear.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current number or ticks or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired number of x axis ticks (multiple of 2, 5 or 10) |

<a name="module_Stacked-area--exports.yAxisLabel" id="module_Stacked-area--exports.yAxisLabel"></a>

## yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the y-axis label of the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current yAxisLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired label string |

**Example**  
```js
stackedArea.yAxisLabel('Ticket Sales')
```
<a name="module_Stacked-area--exports.yAxisLabelOffset" id="module_Stacked-area--exports.yAxisLabelOffset"></a>

## yAxisLabelOffset([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the offset of the yAxisLabel of the chart.
The method accepts both positive and negative values.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yAxisLabelOffset or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>-60</code> | Desired offset for the label |

**Example**  
```js
stackedArea.yAxisLabelOffset(-55)
```
<a name="module_Stacked-area--exports.yTicks" id="module_Stacked-area--exports.yTicks"></a>

## yTicks([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the y axis on the chart

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current vertical ticks or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>5</code> | Desired vertical ticks |

<a name="module_Stacked-area--exports.yAxisBaseline" id="module_Stacked-area--exports.yAxisBaseline"></a>

## yAxisBaseline([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
(default is 0). Change this value if you don't want to start your area from y=0.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current baseline or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>0</code> | Desired baseline of the y axis |

**Example**  
```js
stackedArea.yAxisBaseline(20)
```
<a name="module_Stacked-area--exports.tooltip" id="module_Stacked-area--exports.tooltip"></a>

## tooltip(_x) ⇒ <code>module</code> \| <code>null</code>
Gets or Sets the tooltip the chart shows: a `tooltip()`, set on this
chart only. The chart connects it to its
pointer and keyboard events, draws it in place, and sets the labels its
data points need, unless they were set on the tooltip; it does so now
if the chart has drawn, and again on every draw. Its event handlers go
under the `britechartsTooltip` namespace. Null, or another tooltip,
removes the one it had.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>module</code> \| <code>null</code> - Current tooltip or Chart module to chain calls  
**Throws**:

- <code>Error</code> When the tooltip is already set on another chart

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>module</code> \| <code>null</code> | The tooltip to show |

**Example**  
```js
stackedArea().tooltip(tooltip().title('Uses')).render('#chart', data);
```
<a name="module_Stacked-area--exports.render" id="module_Stacked-area--exports.render"></a>

## render(target, [data]) ⇒ <code>module</code>
Draws the chart into a target: a CSS selector, an element or a d3
selection, as `select(target).datum(data).call(chart)` does. A selector
draws into the first element it matches. Without data, the chart
redraws with the data it last drew there.

**Kind**: method of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Returns**: <code>module</code> - The chart module, to chain calls  
**Throws**:

- <code>Error</code> When the target matches no element

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> \| <code>Element</code> \| <code>D3Selection</code> | Where to draw the chart |
| [data] | <code>Object</code> | The data to draw |

**Example**  
```js
stackedArea().width(600).render('#chart', data);
```
<a name="module_Stacked-area--exports..AreaChartData" id="module_Stacked-area--exports..AreaChartData"></a>

## exports~AreaChartData : <code>Array.&lt;Object&gt;</code>
**Kind**: inner typedef of [<code>stackedArea</code>](#exp_module_Stacked-area--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | Date of the entry in ISO8601 format (required) |
| name | <code>String</code> | Name of the entry (required) |
| value | <code>Number</code> | Value of the entry (required) |

**Example**  
```js
[
    {
        date: "2011-01-05T00:00:00Z",
        name: "Direct",
        value: 0
    }
]
```
