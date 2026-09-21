---
'@britecharts/core': patch
---

Fix the tooltip rendering with `height="NaN"` when its text cannot be measured.

`updateTopicContent` guards against `getBBox().height` returning 0 by falling
back to the previous measurement, but `textHeight` had no initial value — so the
first unmeasurable entry left it `undefined` and every height derived from it
became `NaN`, which the browser rejects with
`<rect> attribute height: Expected length, "NaN"`, once per topic per mouse move.
A browser reports 0 whenever the node is not laid out, which includes the whole
time the tooltip is still hidden, so this fired on the first hover of any chart
using the full tooltip. `textHeight` now starts at one line of the 12px tooltip
text and the guard only ever replaces it with a real measurement.
