---
'@britecharts/core': patch
'@britecharts/wrappers': patch
---

Allow compatible d3-selection 3.x updates so npm can share one copy between charts, consumers and d3-transition. An exact 3.0.0 pin could install a second copy alongside 3.0.1, leaving chart selections without transition methods and preventing tooltips and subsequent charts from rendering.
