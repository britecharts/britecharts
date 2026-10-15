---
'@britecharts/core': patch
---

`brush().dateRange([start, end])` works before the chart has drawn. It used to throw `xScale is not a function`, because the setter moved the brush at once and there was no scale or brush to move yet. A range set before the first render is now kept, and the first render draws the brush window there. Setting it after the chart has drawn moves the brush immediately, as before.
