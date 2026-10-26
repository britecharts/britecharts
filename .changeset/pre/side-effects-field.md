---
'@britecharts/core': patch
'@britecharts/wrappers': patch
'@britecharts/react': patch
---

Each package declares `sideEffects`, so bundlers can drop the charts an app doesn't import. Core lists its CSS, which only has an effect when imported; wrappers and react ship no CSS and declare `false`. The charts' `import 'd3-transition'` stays in a kept chart, since d3-transition declares its own side effects.
