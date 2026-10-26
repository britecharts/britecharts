---
'@britecharts/core': minor
'@britecharts/react': minor
'@britecharts/wrappers': patch
---

The stacked bar and stacked area charts can stack to 100%. `isNormalized(true)` scales every stack, or every date's areas, to fill the value axis, so each segment shows its share of the total, and the value axis reads from 0% to 100%. The tooltip still shows the values. React takes it as the `isNormalized` prop and the wrappers as a config key, and the chart schemas list it.
