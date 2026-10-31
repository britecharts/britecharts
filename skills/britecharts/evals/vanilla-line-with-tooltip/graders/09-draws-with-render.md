---
type: llm
focus: trace
weight: 1
---

signups.js draws the line chart with the chart's render(...) method, not with select(...).datum(...).call(chart), and imports nothing from d3-selection unless it wires the tooltip by hand
