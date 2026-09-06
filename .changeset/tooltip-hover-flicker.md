---
'@britecharts/core': patch
---

Fix the tooltip flickering and dead zones on the line, stacked area, stacked bar
and grouped bar charts.

Two problems, both in how the charts listen for the pointer.

The stacked bar and grouped bar charts attached their tooltip listeners to
`.chart-group`. A `<g>` has no geometry of its own, so it only receives events
where its children are — the gaps between bars, and the empty space above short
bars, were dead. v2 listened on the svg, and the line and stacked area charts
still do; these two now match again. This also makes the listener node agree
with the one `getMousePosition` measures against.

All four charts used `mouseover`/`mouseout` to show and hide. Both bubble, so
every crossing between children — from one stacked segment to the next, or from
a bar into the gap beside it — fired a spurious `mouseout` and hid the tooltip,
which is the flicker. They now use `mouseenter`/`mouseleave`, which do not
bubble and do not fire while the pointer moves between descendants.

The public `customMouseOver` and `customMouseOut` events are unchanged.
