---
'@britecharts/wrappers': patch
'@britecharts/react': patch
---

`destroy()` now removes the chart. Every chart wrapper's `destroy(el)` used to do nothing, so a second `create` on the same container drew a second `svg` next to the first: React 18+ StrictMode does exactly that to every component in development, leaving two charts on the page. It now removes the chart's own `svg` from the container, and only that: never the container itself, which React owns. `TooltipWrapper.destroy` removes the tooltip from inside the element and never an `svg`, since the tooltip is created inside the chart it decorates and destroyed against the element around it. The React components call it when they unmount.
