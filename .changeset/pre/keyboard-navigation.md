---
'@britecharts/core': minor
'@britecharts/react': minor
---

A keyboard can now move through the data points of the bar, donut, grouped bar, heatmap, line, scatter plot, stacked area and stacked bar charts. Each chart is one tab stop: the arrow keys move between points (up and down move a day on the heatmap), Home and End go to the first and last, and Escape lets go. The chart responds as it does to a pointer, so the point is highlighted, the tooltip follows focus, and `customMouseOver`, `customMouseMove` and `customMouseOut` fire. It is on by default; turn it off with `a11yKeyboardNavigation(false)` in core, `a11yKeyboardNavigation: false` in a wrapper's configuration, or the `a11yKeyboardNavigation` prop in React.
