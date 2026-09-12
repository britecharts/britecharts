---
'@britecharts/react': patch
---

The `Tooltip` component no longer adds a new tooltip to the chart on every pointer move or prop change. The wrapped chart asks for the tooltip again after each of its own updates, and the component now creates one only when the chart does not hold one already. The wrapped chart is also rebuilt only when the `Tooltip`'s props change, so a pointer move no longer redraws the chart underneath.
