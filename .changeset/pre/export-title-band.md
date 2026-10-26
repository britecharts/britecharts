---
'@britecharts/core': patch
---

`exportChart`'s title is escaped, so a title with `&` or `<` no longer breaks the png or svg file, and it is drawn in a band above the chart instead of over its top edge. The exported image grows by the band's 30 px, and the chart moves down into the space below it.
