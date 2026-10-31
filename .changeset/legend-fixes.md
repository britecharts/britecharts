---
'@britecharts/core': patch
---

The legend draws more reliably. Its default number format is now `~s`, so values read `86`, `814` and `1.5k` rather than `86.0000`, `814.000` and `1.50000k`. Centred legends now respect the top margin, which stops short legends from having their dots cut off at the top of the chart, and legends without quantities are centred properly instead of drifting to the left, sometimes past the edge. `highlightEntryById(0)` now highlights the entry with id 0, `colorMap(undefined)` falls back to the color schema instead of throwing, and a narrow horizontal legend no longer throws when it has no entries or leaves an empty line when it has only one.
