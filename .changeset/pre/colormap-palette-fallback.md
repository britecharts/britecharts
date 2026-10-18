---
'@britecharts/core': patch
---

A `colorMap` that leaves categories out no longer leaves them uncoloured: the bar, donut, line, stacked area, stacked bar, grouped bar and scatter plot charts draw with their palette, with the `colorMap` over it, as the legend already did. The palette is also rebuilt on every draw, so a category that only appears in a later update gets a colour, and a new `colorSchema` takes effect. `colorMap()` reads back the map that was set, or `null` when none was, instead of the palette the chart drew with.
