---
'@britecharts/core': minor
---

Charts respect `prefers-reduced-motion`. When the reader's system asks for reduced motion, the bar, grouped bar, stacked bar, line, stacked area, donut, heatmap, scatter plot, sparkline and brush charts draw without animation, whatever `isAnimated` is set to. They check on every render, so a change to the setting applies from the next one. `isAnimated()` still reads back the value that was set.
