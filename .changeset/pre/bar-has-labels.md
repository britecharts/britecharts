---
'@britecharts/core': minor
'@britecharts/wrappers': minor
'@britecharts/react': minor
---

The bar chart's `enableLabels` is deprecated in favour of `hasLabels`, which follows the rule that booleans start with `has`, `is` or `should`. `hasLabels` is new in core and as a prop and configuration key in React and the wrappers. `enableLabels` still works, reads and sets the same value, logs a warning once, and goes in version 4.
