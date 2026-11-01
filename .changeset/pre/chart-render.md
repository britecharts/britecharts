---
'@britecharts/core': minor
---

Every chart has a `render(target, data)` method, so a page draws one without d3 code of its own: `bar().width(600).render('#chart', data)`. The target is a CSS selector, an element or a d3 selection, and `data` is optional on a redraw. A target that matches nothing throws an error that names it. `selection.datum(data).call(chart)` keeps working. The wrappers don't accept `render` in a configuration, since they draw the chart themselves.
