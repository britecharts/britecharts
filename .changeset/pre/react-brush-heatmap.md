---
'@britecharts/wrappers': minor
'@britecharts/react': minor
---

Add the brush and heatmap charts to the wrappers and React, so every chart has both. `@britecharts/wrappers` exports `BrushWrapper` and `HeatmapWrapper`, and `@britecharts/react` exports `Brush` and `Heatmap`, with `BrushProps` and `HeatmapProps`. The brush takes `customBrushStart` and `customBrushEnd`, which join `britechartsCustomEvents` in both packages; the heatmap takes the mouse events and works with `Tooltip`.
