---
'@britecharts/core': patch
---

The agent skill shipped in `@britecharts/core` teaches `render(target, data)` and the charts' `tooltip` setting: it draws charts without d3-selection, gives each chart its own tooltip instead of wiring one by hand, and keeps the hand wiring for the donut and custom titles.
