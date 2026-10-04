---
'@britecharts/core': patch
---

Fixed the scatter plot's trendline starting at the wrong height.

`calcLinearRegression` evaluated the line's left end at the *number of data points* rather than at the smallest x: `y1` was `slope * n + intercept` where it should be `slope * minX + intercept`. The scatter plot draws the trendline from `(x1, y1)` to `(x2, y2)` with `x1` being `minX`, so whenever `minX` differed from the point count — which is almost always — the left end hung above or below the fitted line while the right end sat correctly on it. `y2` already used `maxX`, and that asymmetry is what made it visible.

Only the trendline moves. Nothing else called this helper, and no other output changes.
