---
title: Stacked Bar
sidebar_position: 1
---

<a name="module_Stacked-bar" id="module_Stacked-bar"></a>

Stacked Bar Chart reusable API module that allows us
rendering a multi stacked bar and configurable chart.

**Example**  
```js
import { select } from 'd3-selection';
import { stackedBar } from '@britecharts/core';

// dataset: [{ name, stack, value }]
const stackedBarChart = stackedBar();

stackedBarChart
    .width(containerWidth);

select('.css-selector')
    .datum(dataset)
    .call(stackedBarChart);
```

* [Stacked-bar](#module_Stacked-bar)
    * [exports(_selection, _data)](#exp_module_Stacked-bar--exports) ⏏
        * _static_
            * [.a11yTitle(_x)](#module_Stacked-bar--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Stacked-bar--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Stacked-bar--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Stacked-bar--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
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
            * [.isNormalized(_x)](#module_Stacked-bar--exports.isNormalized) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isLoading(flag)](#module_Stacked-bar--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.margin(_x)](#module_Stacked-bar--exports.margin) ⇒ <code>Object</code> \| <code>module</code>
            * [.numberFormat(_x)](#module_Stacked-bar--exports.numberFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.on()](#module_Stacked-bar--exports.on) ⇒ <code>module</code>
            * [.percentageAxisToMaxRatio(_x)](#module_Stacked-bar--exports.percentageAxisToMaxRatio) ⇒ <code>Number</code> \| <code>module</code>
            * [.tooltipThreshold([_x])](#module_Stacked-bar--exports.tooltipThreshold) ⇒ <code>Number</code> \| <code>module</code>
            * [.valueLocale([_x])](#module_Stacked-bar--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>module</code>
            * [.width(_x)](#module_Stacked-bar--exports.width) ⇒ <code>Number</code> \| <code>module</code>
            * [.xTicks(_x)](#module_Stacked-bar--exports.xTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.yAxisLabel(_x)](#module_Stacked-bar--exports.yAxisLabel) ⇒ <code>String</code> \| <code>module</code>
            * [.yAxisLabelOffset(_x)](#module_Stacked-bar--exports.yAxisLabelOffset) ⇒ <code>Number</code> \| <code>module</code>
            * [.yTicks(_x)](#module_Stacked-bar--exports.yTicks) ⇒ <code>Number</code> \| <code>module</code>
            * [.tooltip(_x)](#module_Stacked-bar--exports.tooltip) ⇒ <code>module</code> \| <code>null</code>
            * [.render(target, [data])](#module_Stacked-bar--exports.render) ⇒ <code>module</code>
        * _inner_
            * [~StackedBarData](#module_Stacked-bar--exports..StackedBarData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Stacked-bar--exports" id="exp_module_Stacked-bar--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection and data provided

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents the container(s) where the chart(s) will be rendered |
| _data | <code>StackedBarData</code> | The data to attach and generate the chart |

<a name="module_Stacked-bar--exports.a11yTitle" id="module_Stacked-bar--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Stacked bar chart".

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Stacked-bar--exports.a11yDescription" id="module_Stacked-bar--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Stacked-bar--exports.a11yDataTable" id="module_Stacked-bar--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Stacked-bar--exports.a11yKeyboardNavigation" id="module_Stacked-bar--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Stacked-bar--exports.animationDuration" id="module_Stacked-bar--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Stacked-bar--exports.betweenBarsPadding" id="module_Stacked-bar--exports.betweenBarsPadding"></a>

## betweenBarsPadding(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the padding of the stacked bar chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current padding or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 0.1    Padding value to get/set |

<a name="module_Stacked-bar--exports.colorMap" id="module_Stacked-bar--exports.colorMap"></a>

## colorMap([_x]) ⇒ <code>object</code> \| <code>module</code>
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
<a name="module_Stacked-bar--exports.colorSchema" id="module_Stacked-bar--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | = colorSchemas.britecharts     Desired colorSchema for the graph |

<a name="module_Stacked-bar--exports.exportChart" id="module_Stacked-bar--exports.exportChart"></a>

## exportChart(filename, title) ⇒ <code>Promise</code>
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Promise</code> - Promise that resolves if the chart image was loaded and downloaded successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Stacked-bar--exports.grid" id="module_Stacked-bar--exports.grid"></a>

## grid(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the grid mode

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current mode of the grid or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired mode for the grid ('vertical'|'horizontal'|'full') |

<a name="module_Stacked-bar--exports.hasPercentage" id="module_Stacked-bar--exports.hasPercentage"></a>

## hasPercentage(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the hasPercentage status

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Is percentage used or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Should use percentage as value format |

<a name="module_Stacked-bar--exports.height" id="module_Stacked-bar--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Desired width for the graph |

<a name="module_Stacked-bar--exports.hasReversedStacks" id="module_Stacked-bar--exports.hasReversedStacks"></a>

## hasReversedStacks(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current hasReversedStacks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired hasReversedStacks flag |

<a name="module_Stacked-bar--exports.isAnimated" id="module_Stacked-bar--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated property of the chart, making it to animate when render.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.
By default this is 'false'

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated flag or Chart module  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired animation flag |

<a name="module_Stacked-bar--exports.isHorizontal" id="module_Stacked-bar--exports.isHorizontal"></a>

## isHorizontal(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the horizontal direction of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is horizontal or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Desired horizontal direction for the graph |

<a name="module_Stacked-bar--exports.isNormalized" id="module_Stacked-bar--exports.isNormalized"></a>

## isNormalized(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether every stack fills the whole value axis, a 100%
stacked bar chart: each segment shows its share of its stack, and the
value axis runs from 0% to 100%. The tooltip still shows the values.
Meant for data without negative values.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - If it is normalized or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | = false     Whether to stack to 100% |

**Example**  
```js
stackedBar.isNormalized(true)
```
<a name="module_Stacked-bar--exports.isLoading" id="module_Stacked-bar--exports.isLoading"></a>

## isLoading(flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | Desired value for the loading state |

<a name="module_Stacked-bar--exports.margin" id="module_Stacked-bar--exports.margin"></a>

## margin(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current margin or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Stacked-bar--exports.numberFormat" id="module_Stacked-bar--exports.numberFormat"></a>

## numberFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the numberFormat of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | = ',f'     Desired numberFormat for the graph. See examples [here](https://d3js.org/d3-format) |

<a name="module_Stacked-bar--exports.on" id="module_Stacked-bar--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>module</code> - Bar Chart  
**Access**: public  
<a name="module_Stacked-bar--exports.percentageAxisToMaxRatio" id="module_Stacked-bar--exports.percentageAxisToMaxRatio"></a>

## percentageAxisToMaxRatio(_x) ⇒ <code>Number</code> \| <code>module</code>
Configurable extension of the x axis
If your max point was 50% you might want to show x axis to 60%, pass 1.2

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current ratio or Bar Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | Ratio to max data point to add to the x axis |

<a name="module_Stacked-bar--exports.tooltipThreshold" id="module_Stacked-bar--exports.tooltipThreshold"></a>

## tooltipThreshold([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the minimum width of the graph in order to show the tooltip
NOTE: This could also depend on the aspect ratio

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current tooltipThreshold or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>480</code> | Minimum width of the graph |

<a name="module_Stacked-bar--exports.valueLocale" id="module_Stacked-bar--exports.valueLocale"></a>

## valueLocale([_x]) ⇒ <code>LocaleObject</code> \| <code>module</code>
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
<a name="module_Stacked-bar--exports.width" id="module_Stacked-bar--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Area Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 960    Desired width for the graph |

<a name="module_Stacked-bar--exports.xTicks" id="module_Stacked-bar--exports.xTicks"></a>

## xTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of ticks of the x axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current xTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired horizontal ticks |

<a name="module_Stacked-bar--exports.yAxisLabel" id="module_Stacked-bar--exports.yAxisLabel"></a>

## yAxisLabel(_x) ⇒ <code>String</code> \| <code>module</code>
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
<a name="module_Stacked-bar--exports.yAxisLabelOffset" id="module_Stacked-bar--exports.yAxisLabelOffset"></a>

## yAxisLabelOffset(_x) ⇒ <code>Number</code> \| <code>module</code>
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
<a name="module_Stacked-bar--exports.yTicks" id="module_Stacked-bar--exports.yTicks"></a>

## yTicks(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the number of vertical ticks of the axis on the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current yTicks or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Number</code> | = 5      Desired vertical ticks |

<a name="module_Stacked-bar--exports.tooltip" id="module_Stacked-bar--exports.tooltip"></a>

## tooltip(_x) ⇒ <code>module</code> \| <code>null</code>
Gets or Sets the tooltip the chart shows: a `tooltip()` or a
`miniTooltip()`. On every render the chart connects it to its pointer
and keyboard events, draws it in place, and sets the labels its data
points need, unless they were set on the tooltip. Null removes it.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
**Returns**: <code>module</code> \| <code>null</code> - Current tooltip or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>module</code> \| <code>null</code> | The tooltip to show |

**Example**  
```js
stackedBar().tooltip(tooltip().title('Uses')).render('#chart', data);
```
<a name="module_Stacked-bar--exports.render" id="module_Stacked-bar--exports.render"></a>

## render(target, [data]) ⇒ <code>module</code>
Draws the chart into a target: a CSS selector, an element or a d3
selection, as `select(target).datum(data).call(chart)` does. A selector
draws into the first element it matches. Without data, the chart
redraws with the data it last drew there.

**Kind**: static method of [<code>exports</code>](#exp_module_Stacked-bar--exports)  
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
stackedBar().width(600).render('#chart', data);
```
<a name="module_Stacked-bar--exports..StackedBarData" id="module_Stacked-bar--exports..StackedBarData"></a>

## exports~StackedBarData : <code>Array.&lt;Object&gt;</code>
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
