---
'@britecharts/core': patch
---

Fix the loading state animation. The shimmer was only present in the full `britecharts.css` bundle, so anyone following the documented modular setup — `common.css` plus a per-chart stylesheet — got a static skeleton that never animated. It now lives in `common.css`. The sparkline's skeleton was also missing an animation rule entirely; the selector now matches on the shared `load-state` class rather than enumerating each chart.
