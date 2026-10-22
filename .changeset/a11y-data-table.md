---
'@britecharts/core': minor
'@britecharts/wrappers': patch
'@britecharts/react': minor
---

Every chart but the legend now renders its data as a table that screen readers can read cell by cell. The table is visually hidden, placed right after the chart's svg and linked from it with `aria-details`, and captioned with the chart's name. Charts with several series lay it out wide, with a row per date or name and a column per series. It is on by default; turn it off with `a11yDataTable(false)` in core, `a11yDataTable: false` in a wrapper's configuration, or the `a11yDataTable` prop in React. The wrappers' `destroy` removes the table along with the svg.
