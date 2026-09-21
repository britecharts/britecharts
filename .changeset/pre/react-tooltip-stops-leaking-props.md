---
'@britecharts/react': patch
---

Fixes three components that passed props on to the chart wrapper that the wrapper rejects. `Tooltip`'s documented `customMouseMove`, `customMouseOut` and `customMouseOver` props no longer throw `chart.on is not a function`: they are the component's own callbacks and no longer reach the tooltip. `Donut` and `Legend` now drop the `createTooltip` prop a `Tooltip` hands its child chart, so `<Tooltip render={(props) => <Donut {...props} />} />` renders instead of throwing `Method not supported by Britechart: createTooltip`.
