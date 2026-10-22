---
'@britecharts/core': patch
---

The legend's `highlight()` and `clearHighlight()` commands no longer throw when called before the legend has drawn, as a wrapper or a React `clearHighlight` prop does on the first render. They do nothing until there is something to change.
