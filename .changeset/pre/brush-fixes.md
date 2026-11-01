---
'@britecharts/core': patch
---

The brush keeps its window where it belongs. A locked window slides back at the right edge of the chart instead of running past it, and every event reports dates inside the data. Redrawing the chart now places the window from `dateRange()`, which a drag keeps up to date, so a dragged window stays on its dates when the data or the size changes, and the selection clears when those dates are not in the new data. A redraw also picks up a new gradient and width, removes the month axis when `xAxisFormat` switches to `'custom'`, and draws it again when it switches back. Passing `dateRange(null)` before the first render no longer throws.
