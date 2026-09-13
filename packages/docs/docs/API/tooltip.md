---
title: Tooltip
---

<a name="module_Tooltip" id="module_Tooltip"></a>

Tooltip component: one box, drawn inside the chart's svg, that follows the
pointer and shows what it is over. It renders a **list** (a title and one
row per topic, with a colour dot, the topic's name and its value) for the
multi-value charts -- line, stacked area, stacked bar and grouped bar --
or a **single value** (a title, the element's name and a big value) for
the single-value charts -- bar, scatter plot, heatmap and donut. By
default it picks the layout from the data point it is given; `layout()`
forces one. `miniTooltip` is this component with the single layout, an
empty title and a `.2f` number format.

The tooltip keeps itself inside the chart: it measures the svg it is drawn
in, sits beside its anchor, flips to the other side when there is no room
and slides so it is never cut off. It fades in when shown, fades out when
hidden and eases towards each new position.

Every chart dispatches the same three events, so wiring is always
`chart.on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide)`.
What they carry, and where to `.call()` the tooltip:

| Chart | `customMouseOver` | `customMouseMove` | anchor `[x, y]` | attach to |
| --- | --- | --- | --- | --- |
| line, stacked area | `(data, [x, y])` | `(dataPoint, [x, y], [width, height], colorMap)` | the hovered date's x, the pointer's y | `.metadata-group .vertical-marker-container` |
| stacked bar, grouped bar | `(data, [x, y])` | `(dataPoint, [x, y], [width, height], colorMap)` | the pointer, over a bar only | `.metadata-group` |
| bar, heatmap, donut | `(dataPoint, [x, y], [width, height])` | `(dataPoint, [x, y], [width, height])` | the pointer, over a shape only | `.metadata-group` |
| scatter plot | `(dataPoint, [x, y])` | `(dataPoint, [x, y], [width, height])` | the hovered point | `.metadata-group` |

Positions are in pixels relative to the chart's drawing area (inside the
margins). The chart's size is accepted and ignored: the tooltip measures
the chart itself. The line and stacked area charts dispatch nothing while
narrower than `tooltipThreshold` (480 px by default).

## miniTooltip, the single-value preset

`miniTooltip()` is `tooltip().layout('single').title('').numberFormat('.2f')`:
the same component with the single-value layout, no title and a `.2f`
number format, for the bar, scatter plot, heatmap and donut charts. Every
accessor documented on this page is available on it.

```js
const barChart = bar(),
    chartTooltip = miniTooltip();

barChart
    .width(500)
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(barChart);

d3Selection.select('.metadata-group')
    .datum([])
    .call(chartTooltip);
```

**Requires**: <code>module:d3-array,</code>  
**Example**  
```js
const lineChart = line(),
    chartTooltip = tooltip();

chartTooltip
    .title('Tooltip title');

lineChart
    .width(500)
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(lineChart);

d3Selection.select('.metadata-group .vertical-marker-container')
    .datum([])
    .call(chartTooltip);
```

* [Tooltip](#module_Tooltip)
    * [exports(_selection, _data)](#exp_module_Tooltip--exports) ⏏
        * [.axisTimeCombinations](#module_Tooltip--exports.axisTimeCombinations)
        * [.dateFormat(_x)](#module_Tooltip--exports.dateFormat) ⇒ <code>String</code> \| <code>module</code>
        * [.dateCustomFormat(_x)](#module_Tooltip--exports.dateCustomFormat) ⇒ <code>String</code> \| <code>module</code>
        * ~~[.dateLabel(_x)](#module_Tooltip--exports.dateLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.hide()](#module_Tooltip--exports.hide) ⇒ <code>module</code>
        * [.locale(_x)](#module_Tooltip--exports.locale) ⇒ <code>String</code> \| <code>module</code>
        * ~~[.nameLabel(_x)](#module_Tooltip--exports.nameLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.numberFormat(_x)](#module_Tooltip--exports.numberFormat) ⇒ <code>string</code> \| <code>module</code>
        * [.valueFormatter(_x)](#module_Tooltip--exports.valueFormatter) ⇒ <code>function</code> \| <code>module</code>
        * [.shouldShowDateInTitle(_x)](#module_Tooltip--exports.shouldShowDateInTitle) ⇒ <code>Boolean</code> \| <code>module</code>
        * [.show([dataPoint], [position])](#module_Tooltip--exports.show) ⇒ <code>module</code>
        * [.title(_x)](#module_Tooltip--exports.title) ⇒ <code>String</code> \| <code>module</code>
        * [.tooltipOffset(_x)](#module_Tooltip--exports.tooltipOffset) ⇒ <code>Object</code> \| <code>module</code>
        * [.layout([_x])](#module_Tooltip--exports.layout) ⇒ <code>String</code> \| <code>module</code>
        * [.maxEntries([_x])](#module_Tooltip--exports.maxEntries) ⇒ <code>Number</code> \| <code>module</code>
        * [.topicsOrder(_x)](#module_Tooltip--exports.topicsOrder) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
        * ~~[.topicLabel(_x)](#module_Tooltip--exports.topicLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.update(dataPoint, position, [chartSize], [colorMap])](#module_Tooltip--exports.update) ⇒ <code>module</code>
        * ~~[.valueLabel(_x)](#module_Tooltip--exports.valueLabel) ⇒ <code>String</code> \| <code>module</code>~~
        * [.xAxisValueType([_x])](#module_Tooltip--exports.xAxisValueType) ⇒ <code>String</code> \| <code>module</code>

<a name="exp_module_Tooltip--exports" id="exp_module_Tooltip--exports"></a>

## exports(_selection, _data) ⏏
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |
| _data | <code>Object</code> | The data to attach and generate the chart |

<a name="module_Tooltip--exports.axisTimeCombinations" id="module_Tooltip--exports.axisTimeCombinations"></a>

## exports.axisTimeCombinations
constants to be used to force the x axis to respect a certain granularity
current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR

**Kind**: static property of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Example**  
```js
tooltip.dateFormat(tooltip.axisTimeCombinations.HOUR_DAY)
```
<a name="module_Tooltip--exports.dateFormat" id="module_Tooltip--exports.dateFormat"></a>

## exports.dateFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes the ability to force the tooltip to use a certain date format

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired format |

<a name="module_Tooltip--exports.dateCustomFormat" id="module_Tooltip--exports.dateCustomFormat"></a>

## exports.dateCustomFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Exposes the ability to use a custom date format

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current format or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired custom format |

**Example**  
```js
tooltip.dateFormat(tooltip.axisTimeCombinations.CUSTOM);
tooltip.dateCustomFormat('%H:%M %p')
```
<a name="module_Tooltip--exports.dateLabel" id="module_Tooltip--exports.dateLabel"></a>

## ~~exports.dateLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the dateLabel of the data: the field of the data point
shown in the title. When the data point has no such field, its `key`
(what the stacked and grouped bar charts dispatch) or its `date` is
used, so the default works for every chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current dateLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired dateLabel |

<a name="module_Tooltip--exports.hide" id="module_Tooltip--exports.hide"></a>

## exports.hide() ⇒ <code>module</code>
Hides the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>module</code> - Tooltip module to chain calls  
**Access**: public  
<a name="module_Tooltip--exports.locale" id="module_Tooltip--exports.locale"></a>

## exports.locale(_x) ⇒ <code>String</code> \| <code>module</code>
Pass locale for the tooltip to render the date in

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current locale or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Must be a locale tag like 'en-US' or 'fr-FR' |

<a name="module_Tooltip--exports.nameLabel" id="module_Tooltip--exports.nameLabel"></a>

## ~~exports.nameLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the nameLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current nameLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired nameLabel |

<a name="module_Tooltip--exports.numberFormat" id="module_Tooltip--exports.numberFormat"></a>

## exports.numberFormat(_x) ⇒ <code>string</code> \| <code>module</code>
Gets or Sets the number format for the value displayed on the tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>string</code> \| <code>module</code> - Current numberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>string</code> | Desired numberFormat for the chart. See examples [here](https://d3js.org/d3-format) |

<a name="module_Tooltip--exports.valueFormatter" id="module_Tooltip--exports.valueFormatter"></a>

## exports.valueFormatter(_x) ⇒ <code>function</code> \| <code>module</code>
Gets or Sets the formatter function for the value displayed on the tooltip.
Setting this property makes the tooltip ignore numberFormat.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>function</code> \| <code>module</code> - Current valueFormatter or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>function</code> | Desired formatter function |

**Example**  
```js
tooltipChart.valueFormatter(value => value.toString().length.toString())
```
<a name="module_Tooltip--exports.shouldShowDateInTitle" id="module_Tooltip--exports.shouldShowDateInTitle"></a>

## exports.shouldShowDateInTitle(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets shouldShowDateInTitle

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current shouldShowDateInTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Desired value |

<a name="module_Tooltip--exports.show" id="module_Tooltip--exports.show"></a>

## exports.show([dataPoint], [position]) ⇒ <code>module</code>
Shows the tooltip. Given the hovered data point and its position, as
the single-value charts dispatch them on `customMouseOver`, it renders
and places the tooltip at once; otherwise it shows empty until the
first `update`, which is what the multi-value charts need.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>module</code> - Tooltip module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| [dataPoint] | <code>Object</code> | Data point to render |
| [position] | <code>Array.&lt;Number&gt;</code> | [x, y] to anchor the tooltip to, in pixels |

<a name="module_Tooltip--exports.title" id="module_Tooltip--exports.title"></a>

## exports.title(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the title of the tooltip (to only show the date, set a blank title)

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current title or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired title |

<a name="module_Tooltip--exports.tooltipOffset" id="module_Tooltip--exports.tooltipOffset"></a>

## exports.tooltipOffset(_x) ⇒ <code>Object</code> \| <code>module</code>
Gets or Sets an offset, in pixels, applied to the point the tooltip is
placed next to: `x` moves the anchor along the chart, `y` moves the box
up (negative) or down. The box still stays inside the chart.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Object</code> \| <code>module</code> - Current tooltipOffset or module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Object with the x and y offsets |

**Example**  
```js
tooltip.tooltipOffset({ x: 0, y: -20 })
```
<a name="module_Tooltip--exports.layout" id="module_Tooltip--exports.layout"></a>

## exports.layout([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the layout: 'list' shows the title and one row per topic,
with a colour dot, the topic's name and its value (the multi-value
charts: line, stacked area, stacked bar and grouped bar); 'single'
shows the title, the name and a big value (the single-value charts:
bar, scatter plot, heatmap and donut -- what `miniTooltip` renders);
'auto', the default, picks by the data point: a list when it carries
an array under the topic label, a single value otherwise. Set before
the tooltip is drawn.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current layout or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;auto&#x27;</code> | 'auto', 'list' or 'single' |

**Example**  
```js
tooltip.layout('single')
```
<a name="module_Tooltip--exports.maxEntries" id="module_Tooltip--exports.maxEntries"></a>

## exports.maxEntries([_x]) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the most rows the tooltip shows. Past that, the last row
reads "+n more" instead, so the box keeps a height that fits in the
chart. 0 shows every row.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current maxEntries or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>12</code> | Most rows to show |

**Example**  
```js
tooltip.maxEntries(6)
```
<a name="module_Tooltip--exports.topicsOrder" id="module_Tooltip--exports.topicsOrder"></a>

## exports.topicsOrder(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Pass an override for the ordering of your tooltip

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current overrideOrder or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | Array of the names of your tooltip items |

<a name="module_Tooltip--exports.topicLabel" id="module_Tooltip--exports.topicLabel"></a>

## ~~exports.topicLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the topicLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current topicLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired topicLabel |

<a name="module_Tooltip--exports.update" id="module_Tooltip--exports.update"></a>

## exports.update(dataPoint, position, [chartSize], [colorMap]) ⇒ <code>module</code>
Updates the content and position of the tooltip. The arguments are
what every chart dispatches with `customMouseMove`, so
`chart.on('customMouseMove', tooltip.update)` is all the wiring
needed: the data point, its anchor `[x, y]` in pixels relative to the
chart's drawing area, the chart's size (ignored; the tooltip measures
the chart itself) and, from the multi-value charts, the map of topic
names to colours. The order the multi-value charts used before 3.0,
`update(dataPoint, colorMap, x, y)`, still works and warns once.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>module</code> - Tooltip module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dataPoint | <code>Object</code> | Data point to render |
| position | <code>Array.&lt;Number&gt;</code> | [x, y] to anchor the tooltip to, in pixels |
| [chartSize] | <code>Array.&lt;Number&gt;</code> | [width, height] of the chart; ignored |
| [colorMap] | <code>Object</code> | Topic name to colour, for the list layout |

**Example**  
```js
chart.on('customMouseMove', tooltip.update)
```
<a name="module_Tooltip--exports.valueLabel" id="module_Tooltip--exports.valueLabel"></a>

## ~~exports.valueLabel(_x) ⇒ <code>String</code> \| <code>module</code>~~
***Deprecated***

Gets or Sets the valueLabel of the data

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current valueLabel or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> | Desired valueLabel |

<a name="module_Tooltip--exports.xAxisValueType" id="module_Tooltip--exports.xAxisValueType"></a>

## exports.xAxisValueType([_x]) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets how the key of the data point is shown in the title:
'date' formats it as a date, 'number' as a number, 'category' shows
it as it is, and 'auto' (the default) picks one per key -- a Date or
a string that parses as one is a date, a number or a numeric string
is a number, anything else is a category. Set 'date' for keys that
happen to parse as numbers, or 'category' for names that happen to
parse as dates.

**Kind**: static method of [<code>exports</code>](#exp_module_Tooltip--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current xAxisValueType or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>String</code> | <code>&#x27;auto&#x27;</code> | 'auto', 'date', 'number' or 'category' |

**Example**  
```js
tooltip.xAxisValueType('category')
```
