---
'@britecharts/core': patch
---

Both tooltips share one animation: they fade in once when shown, fade out when hidden, and move and resize with one eased 200 ms chase. An update no longer touches the opacity, so a tooltip that is already showing does not blink while the pointer moves. The tooltip updates its rows in place, keyed by topic name, instead of rebuilding every text node on each move. Calling the tooltip on its container again (as the React and wrapper layers do on every update) no longer hides it, which was making the React tooltip fade in again on every pointer move.
