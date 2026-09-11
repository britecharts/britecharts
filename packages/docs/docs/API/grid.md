# Modules

<dl>
<dt><a href="#module_Grid">Grid</a></dt>
<dd><p>Reusable Grid component helper that renders either a vertical, horizontal or full grid, and that
will usually be used inside charts. It could also be used as a standalone component to use on custom charts.</p>
<p>Naming: H and V describe the lines a grid draws, X and Y name scales.
gridHorizontal(yScale) draws horizontal lines from the y-scale&#39;s ticks; on
the 2D grid, ticksH() sets the ticks of the horizontal lines (from scaleY())
and ticksV() those of the vertical lines (from scaleX()).</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#GridScale">GridScale</a> : <code>function</code></dt>
<dd><p>A d3 scale with a numeric range: continuous (<code>scaleLinear</code>, <code>scaleTime</code>, ...)
or band (<code>scaleBand</code>, <code>scalePoint</code>). Band scales are recognised through
<code>bandwidth()</code> and their lines are centred on the band.</p>
</dd>
<dt><a href="#GridContext">GridContext</a> : <code>Object</code></dt>
<dd><p>A d3 selection to render into, or a d3 transition on one. Given a
transition, entering and exiting lines fade and slide between positions.</p>
</dd>
</dl>

<a name="module_Grid"></a>

# Grid
Reusable Grid component helper that renders either a vertical, horizontal or full grid, and that
will usually be used inside charts. It could also be used as a standalone component to use on custom charts.

Naming: H and V describe the lines a grid draws, X and Y name scales.
gridHorizontal(yScale) draws horizontal lines from the y-scale's ticks; on
the 2D grid, ticksH() sets the ticks of the horizontal lines (from scaleY())
and ticksV() those of the vertical lines (from scaleX()).

**Requires**: <code>module:d3-scale</code>  

* [Grid](#module_Grid)
    * [.grid(scaleX, scaleY)](#module_Grid.grid) ⇒ <code>gridGenerator</code>
    * [.gridHorizontal(scale)](#module_Grid.gridHorizontal) ⇒ <code>gridBaseGenerator</code>
    * [.gridVertical(scale)](#module_Grid.gridVertical) ⇒ <code>gridBaseGenerator</code>

<a name="module_Grid.grid"></a>

## Grid.grid(scaleX, scaleY) ⇒ <code>gridGenerator</code>
Constructor for a two-dimensional grid helper

**Kind**: static method of [<code>Grid</code>](#module_Grid)  

| Param | Type | Description |
| --- | --- | --- |
| scaleX | [<code>GridScale</code>](#GridScale) | d3 scale for the grid's x direction |
| scaleY | [<code>GridScale</code>](#GridScale) | d3 scale for the grid's y direction |

**Example**  
```js
const grid = grid(xScale, yScale)
        .offsetStart(5)
        .hideEdges(true)
        .ticks(4);

    grid(svg.select('.grid-lines-group'));
```
<a name="module_Grid.gridHorizontal"></a>

## Grid.gridHorizontal(scale) ⇒ <code>gridBaseGenerator</code>
Constructor for a horizontal grid helper

**Kind**: static method of [<code>Grid</code>](#module_Grid)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| scale | [<code>GridScale</code>](#GridScale) | d3 scale to initialize the grid |

**Example**  
```js
const grid = gridHorizontal(yScale)
        .range([0, chartWidth])
        .hideEdges('first')
        .ticks(yTicks);

    grid(svg.select('.grid-lines-group'));
```
<a name="module_Grid.gridVertical"></a>

## Grid.gridVertical(scale) ⇒ <code>gridBaseGenerator</code>
Constructor for a vertical grid helper

**Kind**: static method of [<code>Grid</code>](#module_Grid)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| scale | [<code>GridScale</code>](#GridScale) | d3 scale to initialize the grid |

**Example**  
```js
const grid = gridVertical(xScale)
        .range([0, chartHeight])
        .hideEdges('first')
        .ticks(xTicks);

    grid(svg.select('.grid-lines-group'));
```
<a name="GridScale"></a>

# GridScale : <code>function</code>
A d3 scale with a numeric range: continuous (`scaleLinear`, `scaleTime`, ...)
or band (`scaleBand`, `scalePoint`). Band scales are recognised through
`bandwidth()` and their lines are centred on the band.

**Kind**: global typedef  
<a name="GridContext"></a>

# GridContext : <code>Object</code>
A d3 selection to render into, or a d3 transition on one. Given a
transition, entering and exiting lines fade and slide between positions.

**Kind**: global typedef  
