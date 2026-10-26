---
'@britecharts/core': minor
'@britecharts/wrappers': patch
'@britecharts/react': minor
---

The heatmap takes `xAxisLabels`, to match `yAxisLabels`: one label per column, from the first. With both sets, each box's `day` and `hour` index the labels, so a heatmap can show any two sets of categories, such as a square grid that compares six categories with each other. The columns, the keyboard navigation and the data table follow the labels' count. Without them, the columns stay the 24 hours of the day. Set it with `xAxisLabels([...])` in core, `xAxisLabels` in a wrapper's configuration, or the `xAxisLabels` prop in React.

The day labels now end just left of the boxes rather than start 30px left of them, so a longer label grows into the left margin instead of over the first column. Both axes' labels share one look: 12px, in the muted text colour, a little darker than the days were.

The labels' classes name rows and columns rather than days and hours, since they no longer have to be either: `.day-label` is now `.row-label`, `.hour-label` is `.column-label`, and their groups are `.row-labels-group` and `.column-labels-group`. Update any CSS or test that selects the old names.
