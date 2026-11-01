---
'@britecharts/core': minor
---

`tooltip()` now works on every chart that takes one, so there's nothing to choose: `bar().tooltip(tooltip())`. It no longer shows the placeholder "Tooltip title": it has no title until you set one, so a list shows only its date. A single value shows two decimals unless you set a `numberFormat`, and carries the `britechart-mini-tooltip` class whichever way it was chosen. `miniTooltip()` is deprecated: it still works, logs a warning once, and goes in version 4.
