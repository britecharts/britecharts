<a name="module_Grid"></a>

# Grid
Reusable Grid component helper that renders either a vertical, horizontal or full grid, and that
will usually be used inside charts. It could also be used as a standalone component to use on custom charts.

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

## Grid.gridHorizontal(scale) ⇒ <code>gridBaseGenerator</code>
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

## Grid.gridVertical(scale) ⇒ <code>gridBaseGenerator</code>
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
