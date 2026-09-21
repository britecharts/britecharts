---
'@britecharts/core': patch
---

Fix the d3 v6 event-signature leftovers that broke tooltips on the bar-family
and stacked-area charts.

`getMousePosition` in the stacked bar and grouped bar charts read
`pointer(event, event)` — passing the event as its own container — and both call
sites handed it the DOM node rather than the event. d3 then read `clientX` off
something that is not an event, throwing
`Failed to set the 'x' property on 'SVGPoint': The provided float value is
non-finite` on the first mouse move over either chart. It now measures against
the chart's svg root, which is the space `getNearestDataPoint` expects, and the
callers pass the event they were given.

`handleMouseMove` in the stacked area chart is called with `(this, d, event)`
but declared only `(e)`, so `event` resolved to the deprecated global
`window.event` instead of the handler's own argument. It now declares all three
parameters, matching every other handler in that file.
