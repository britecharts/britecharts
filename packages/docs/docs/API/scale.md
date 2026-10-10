---
title: Scale helpers
---

<a name="module_Scale" id="module_Scale"></a>

## Scale
Scale types and readers for the charts whose axes change kind with their
orientation.

**Requires**: <code>module:d3-scale</code>  
<a name="module_Scale..AxisScale" id="module_Scale..AxisScale"></a>

## Scale~AxisScale : <code>function</code>
What a chart calls on an axis scale, typed structurally rather than as a d3
scale class.

Several charts hold two different kinds of scale in one variable: `xScale` is
a `scaleLinear` when the chart is horizontal and a `scaleBand` when it is
vertical, and `yScale` is the mirror image. No single d3 class describes
either, and the `isHorizontal` flag cannot narrow a module-level `let`.
`GridScale` in grid.ts and `getBaselineExtent`'s `scale` parameter in
domain.ts already type scales this way, for the same reason -- narrower about
what is required, wider about what satisfies it.

The call signature returns `number | undefined` because a band scale's does:
it maps a category name and has nothing to return for a name outside its
domain. `bandwidth` and `ticks` are optional because only one kind of scale
has each.

**Kind**: inner typedef of [<code>Scale</code>](#module_Scale)  
