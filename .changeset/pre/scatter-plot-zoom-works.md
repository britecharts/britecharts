---
'@britecharts/core': patch
---

The scatter plot's zoom works. It has not run since the d3 v6 upgrade, and two separate defects were stacked behind each other.

**The zoom handler kept d3 v5's signature.** It was written `updateChartAfterZoom(data, index, elements)` and read the transform with `zoomTransform(elements[0])`. d3-zoom v3 calls a listener with `(event, datum)` and no third argument, so `elements` was `undefined` and the first line threw a `TypeError` on the first zoom event. The handler now takes the event and reads `event.transform`, which is where v6 and later put it.

**The highlight update then threw too.** `initHighlightComponents` binds the highlight circle to a single placeholder datum, so its attribute accessors always run, while `highlightPointData` is only set once a point has been hovered. Reading `.x` off it before the first hover threw. The update is guarded now: before anything is hovered there is no highlight to move.

With both fixed, a zoom event rescales the axes and every data point as the feature always intended. `enableZoom` defaults to `false`, so nothing changes for a chart that does not ask for it.

Four tests cover the path, which nothing did before: the pointer overlay appears only when zoom is enabled, a wheel event rescales every point and leaves none of them unset, and zooming before any hover does not throw. Reverting either fix fails two of them.
