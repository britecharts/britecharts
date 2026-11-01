---
title: Treemap
sidebar_position: 1
---

<a name="module_Treemap" id="module_Treemap"></a>

Treemap Chart reusable API module that shows how a total divides into its
parts: each entry is a rectangle with an area proportional to its value.

**Example**  
```js
import { treemap } from '@britecharts/core';

// dataset: [{ name, value }]
treemap()
    .width(500)
    .height(300)
    .render('.css-selector', dataset);
```

* [Treemap](#module_Treemap)
    * [treemap(_selection)](#exp_module_Treemap--exports)
        * _static_
            * [.a11yTitle(_x)](#module_Treemap--exports.a11yTitle) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDescription(_x)](#module_Treemap--exports.a11yDescription) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
            * [.a11yDataTable(_x)](#module_Treemap--exports.a11yDataTable) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.a11yKeyboardNavigation(_x)](#module_Treemap--exports.a11yKeyboardNavigation) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.animationDuration(_x)](#module_Treemap--exports.animationDuration) ⇒ <code>duration</code> \| <code>module</code>
            * [.colorSchema(_x)](#module_Treemap--exports.colorSchema) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
            * [.hasLabels(_x)](#module_Treemap--exports.hasLabels) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.exportChart(filename, title)](#module_Treemap--exports.exportChart)
            * [.height(_x)](#module_Treemap--exports.height) ⇒ <code>Number</code> \| <code>module</code>
            * [.isAnimated(_x)](#module_Treemap--exports.isAnimated) ⇒ <code>Boolean</code> \| <code>module</code>
            * [.isLoading(_flag)](#module_Treemap--exports.isLoading) ⇒ <code>boolean</code> \| <code>module</code>
            * [.labelsNumberFormat(_x)](#module_Treemap--exports.labelsNumberFormat) ⇒ <code>String</code> \| <code>module</code>
            * [.margin(_x)](#module_Treemap--exports.margin) ⇒ <code>margin</code> \| <code>module</code>
            * [.on()](#module_Treemap--exports.on) ⇒ <code>module</code>
            * [.tooltip(_x)](#module_Treemap--exports.tooltip) ⇒ <code>module</code> \| <code>null</code>
            * [.render(target, [data])](#module_Treemap--exports.render) ⇒ <code>module</code>
            * [.valueLocale(_x)](#module_Treemap--exports.valueLocale) ⇒ <code>LocaleObject</code> \| <code>null</code> \| <code>module</code>
            * [.width(_x)](#module_Treemap--exports.width) ⇒ <code>Number</code> \| <code>module</code>
        * _inner_
            * [~TreemapData](#module_Treemap--exports..TreemapData) : <code>Array.&lt;Object&gt;</code>

<a name="exp_module_Treemap--exports" id="exp_module_Treemap--exports"></a>

## treemap(_selection)
This function creates the graph using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                  the container(s) where the chart(s) will be rendered |

<a name="module_Treemap--exports.a11yTitle" id="module_Treemap--exports.a11yTitle"></a>

## a11yTitle(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the name screen readers announce for the chart. It is
set as the svg's `aria-label`. Unset, the chart is announced as
"Treemap".

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yTitle or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible title for the chart |

<a name="module_Treemap--exports.a11yDescription" id="module_Treemap--exports.a11yDescription"></a>

## a11yDescription(_x) ⇒ <code>String</code> \| <code>null</code> \| <code>module</code>
Gets or Sets a longer description screen readers announce after the
chart's name, such as what the data shows. It is rendered as the svg's
`<desc>`. Unset, the chart has no description.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>String</code> \| <code>null</code> \| <code>module</code> - Current a11yDescription or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>String</code> \| <code>null</code> | Desired accessible description for the chart |

<a name="module_Treemap--exports.a11yDataTable" id="module_Treemap--exports.a11yDataTable"></a>

## a11yDataTable(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart renders its data as a visually hidden
table after its svg, which screen readers can read cell by cell. On by
default; set it to false when the app gives the data its own accessible
form.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yDataTable or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether to render the data table |

<a name="module_Treemap--exports.a11yKeyboardNavigation" id="module_Treemap--exports.a11yKeyboardNavigation"></a>

## a11yKeyboardNavigation(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether a keyboard can move through the chart's data
points: the chart takes one tab stop, the arrow keys move between
points, Home and End go to the first and last, and Escape lets go. The
tooltip and highlights follow focus as they follow the pointer. On by
default.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current a11yKeyboardNavigation or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Boolean</code> | Whether the keyboard can move through the data |

<a name="module_Treemap--exports.animationDuration" id="module_Treemap--exports.animationDuration"></a>

## animationDuration(_x) ⇒ <code>duration</code> \| <code>module</code>
Gets or Sets the duration of the animation

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>duration</code> \| <code>module</code> - Current animation duration or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>1200</code> | Desired animation duration for the graph |

<a name="module_Treemap--exports.colorSchema" id="module_Treemap--exports.colorSchema"></a>

## colorSchema(_x) ⇒ <code>Array.&lt;String&gt;</code> \| <code>module</code>
Gets or Sets the colorSchema of the chart. Each name takes a colour.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>module</code> - Current colorSchema or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Array.&lt;String&gt;</code> | <code>britecharts</code> | Desired colorSchema for the cells |

<a name="module_Treemap--exports.hasLabels" id="module_Treemap--exports.hasLabels"></a>

## hasLabels(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets whether the chart labels its cells. A label
shows only where it fits: a small cell has no name, and a slightly
bigger one no value.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current hasLabels or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>true</code> | Whether to draw the labels |

<a name="module_Treemap--exports.exportChart" id="module_Treemap--exports.exportChart"></a>

## exportChart(filename, title)
Exports the chart and fires a download: an svg file when the filename
ends in `.svg`, and a png otherwise

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the downloaded file, whose extension picks the format |
| title | <code>String</code> | Title to add at the top of the exported picture |

<a name="module_Treemap--exports.height" id="module_Treemap--exports.height"></a>

## height(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the height of the chart

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>400</code> | Desired height for the chart |

<a name="module_Treemap--exports.isAnimated" id="module_Treemap--exports.isAnimated"></a>

## isAnimated(_x) ⇒ <code>Boolean</code> \| <code>module</code>
Gets or Sets the isAnimated value of the chart. New cells fade in and
existing ones move to their new place.
The chart draws without animation when the reader's system asks for
reduced motion (`prefers-reduced-motion`), whatever this is set to.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Boolean</code> \| <code>module</code> - Current isAnimated value or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Boolean</code> | <code>false</code> | Decide whether to show chart animation |

<a name="module_Treemap--exports.isLoading" id="module_Treemap--exports.isLoading"></a>

## isLoading(_flag) ⇒ <code>boolean</code> \| <code>module</code>
Gets or Sets the loading state of the chart

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>boolean</code> \| <code>module</code> - Current loading state flag or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _flag | <code>boolean</code> | Desired value for the loading state |

**Example**  
```js
chart.isLoading(true)
```
<a name="module_Treemap--exports.labelsNumberFormat" id="module_Treemap--exports.labelsNumberFormat"></a>

## labelsNumberFormat(_x) ⇒ <code>String</code> \| <code>module</code>
Gets or Sets the d3-format string of the values on the cells

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>String</code> \| <code>module</code> - Current labelsNumberFormat or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>String</code> | <code>&#x27;,&#x27;</code> | Desired format |

**Example**  
```js
treemapChart.labelsNumberFormat('$,.0f')
```
<a name="module_Treemap--exports.margin" id="module_Treemap--exports.margin"></a>

## margin(_x) ⇒ <code>margin</code> \| <code>module</code>
Gets or Sets the margin of the chart

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>margin</code> \| <code>module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set |

<a name="module_Treemap--exports.on" id="module_Treemap--exports.on"></a>

## on() ⇒ <code>module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customClick.
Each sends the entry, the pointer's position and the chart's size.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>module</code> - Treemap Chart  
**Access**: public  
<a name="module_Treemap--exports.tooltip" id="module_Treemap--exports.tooltip"></a>

## tooltip(_x) ⇒ <code>module</code> \| <code>null</code>
Gets or Sets the tooltip the chart shows: a `tooltip()`, set on this
chart only. The chart connects it to its
pointer and keyboard events, draws it in place, and sets the labels its
data points need, unless they were set on the tooltip; it does so now
if the chart has drawn, and again on every draw. Its event handlers go
under the `britechartsTooltip` namespace. Null, or another tooltip,
removes the one it had.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>module</code> \| <code>null</code> - Current tooltip or Chart module to chain calls  
**Throws**:

- <code>Error</code> When the tooltip is already set on another chart

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>module</code> \| <code>null</code> | The tooltip to show |

**Example**  
```js
treemap().tooltip(tooltip()).render('#chart', data);
```
<a name="module_Treemap--exports.render" id="module_Treemap--exports.render"></a>

## render(target, [data]) ⇒ <code>module</code>
Draws the chart into a target: a CSS selector, an element or a d3
selection, as `select(target).datum(data).call(chart)` does. A selector
draws into the first element it matches. Without data, the chart
redraws with the data it last drew there.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
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
treemap().width(600).render('#chart', data);
```
<a name="module_Treemap--exports.valueLocale" id="module_Treemap--exports.valueLocale"></a>

## valueLocale(_x) ⇒ <code>LocaleObject</code> \| <code>null</code> \| <code>module</code>
Gets or Sets the locale the values on the cells are formatted with.
Check [the d3-format docs](https://github.com/d3/d3-format#formatLocale) for the required values.

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>LocaleObject</code> \| <code>null</code> \| <code>module</code> - Current locale or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>LocaleObject</code> \| <code>null</code> | Desired locale |

<a name="module_Treemap--exports.width" id="module_Treemap--exports.width"></a>

## width(_x) ⇒ <code>Number</code> \| <code>module</code>
Gets or Sets the width of the chart

**Kind**: method of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Returns**: <code>Number</code> \| <code>module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _x | <code>Number</code> | <code>780</code> | Desired width for the chart |

<a name="module_Treemap--exports..TreemapData" id="module_Treemap--exports..TreemapData"></a>

## exports~TreemapData : <code>Array.&lt;Object&gt;</code>
The data a treemap takes: one entry per cell. Entries with a value of zero
or less have no area, so they are not drawn, but they stay in the data
table.

**Kind**: inner typedef of [<code>treemap</code>](#exp_module_Treemap--exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The cell's name |
| value | <code>Number</code> | The cell's size |

**Example**  
```js
[
    {
        name: 'Rent',
        value: 1200
    },
    {
        name: 'Groceries',
        value: 480
    }
]
```
