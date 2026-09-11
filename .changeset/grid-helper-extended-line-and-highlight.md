---
"@britecharts/core": patch
---

The grid helper now draws the axis baseline and the zero-line highlight
itself. `gridHorizontal` and `gridVertical` gain `extendedLine(inset)` -- the
solid line at the start of the scale's range that every chart drew by hand,
inset by the room left for axis labels -- and `highlight(value)`, which adds
`horizontal-grid-line--highlighted` (or the new `vertical-grid-line--highlighted`)
to the grid line at that tick; the 2D `grid` gets `extendedLineH/V` and
`highlightH/V`. Bar, grouped bar, stacked bar, scatter plot, line and stacked
area use them in place of six copies of the same code, which also fixes two
things: the baseline is now updated on every render instead of being drawn
once and left stale after a resize, and the zero highlight is cleared again
when the data stops crossing zero. The JSDoc types the helper documented as
`*` are now named, and the H/V versus X/Y naming is written down. No visual
change; the extended line moved from the grid group's parent into the grid
group itself.
