---
'@britecharts/core': patch
---

The scatter plot no longer sets a negative circle radius. A value below the bottom of the y scale got one, which SVG rejects with a console error for every such point; the radius is now clamped to 0.
