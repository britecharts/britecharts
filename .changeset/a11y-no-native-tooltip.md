---
'@britecharts/core': patch
'@britecharts/react': patch
---

Charts take their accessible name from an `aria-label` on the svg instead of a `<title>` element, which browsers showed as a tooltip when the pointer rested on the chart. Screen readers announce the same name; `a11yDescription` is still a `<desc>` linked with `aria-describedby`.
