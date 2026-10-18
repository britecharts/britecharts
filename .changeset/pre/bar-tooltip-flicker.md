---
'@britecharts/core': patch
---

The grouped and stacked bar charts keep their tooltip while the pointer crosses the gaps between bars. A hover ends only after the pointer has been off the bars for 150ms, so a fast move across the chart no longer fades the tooltip out and back in at every gap.
