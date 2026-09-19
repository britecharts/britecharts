---
'@britecharts/react': patch
---

`Legend` now waits for its data like every other chart. `<Legend data={null} />` used to throw `Cannot read properties of undefined (reading 'filter')`; it now draws nothing until `data` is set, then draws the chart. `data` is no longer marked required in the propTypes, so passing `null` while the data loads no longer logs a prop-type warning.
