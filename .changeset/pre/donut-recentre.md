---
'@britecharts/core': patch
---

The donut centres itself on every draw. It set its centre only when it first drew, so redrawing it at a new width or height, as React's `ResponsiveContainer` does once it measures its container, left the donut where the first size put it, off-centre and sometimes cut off.
