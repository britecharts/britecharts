---
'@britecharts/core': major
'@britecharts/wrappers': major
'@britecharts/react': major
---

The bullet chart and the sparkline no longer draw a title. Text inside the
svg cannot wrap, clips at the chart's edge and ignores the page's
typography, so these charts now draw only the data.

Removed: the bullet chart's `customTitle` and `customSubtitle` accessors and
its `title` and `subtitle` data fields, and the sparkline's `titleText` and
`titleTextStyle` accessors, along with the `SparklineTitleTextStyle` type
and the matching React props. The bullet chart no longer reserves 100px on
the left for its title, so the bars now span the full width. Label these
charts in your own markup next to them, and set `a11yTitle` for screen
readers. The migration guide's step 14 shows how.
