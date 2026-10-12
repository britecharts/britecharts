---
'@britecharts/react': major
---

`<StackedBar nameLabelFormat={...} />` is gone. It threw.

The prop was declared in the component's PropTypes and in its published `.d.ts`, and **no chart has an accessor by that name** — not the stacked bar, not any of the other thirteen. So a consumer who passed it got the wrapper's own guard: `Method not supported by Britechart: nameLabelFormat`, thrown before anything was drawn.

Removed rather than implemented, because there is nothing behind it: unlike `exportChart`, which is a real command the prop was merely mistyped against, this names a chart feature that does not exist. Nothing in the repo passed it, and it could not have worked for anyone who tried.

Found by the conversion. The rest props now flow into `WrapperConfiguration<StackedBarChartModule>`, where a key the chart has no member for is `never` — so the component stopped compiling until the phantom was gone.
