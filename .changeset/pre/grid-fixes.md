---
'@britecharts/core': patch
---

The grid helper now does what its accessors promise. A date passed to `highlight` marks the matching line on a time scale, where it used to mark nothing. `ticks(0)` draws no lines, as on a d3 axis, instead of the default ticks, so a chart with `xTicks(0)` or `yTicks(0)` now loses those grid lines along with its axis ticks. On the two-dimensional `grid`, `direction('horizontal')` and `direction('vertical')` draw only their own extended line, and a line removed this way comes back when the direction does. `grid()` with no scales draws with default linear scales and `scaleX()` and `scaleY()` return them, where it used to throw. The `tickValues()`, `tickValuesH()` and `tickValuesV()` accessors of `grid` keep and return copies, so changing an array after passing it in or reading it back no longer changes the grid.
