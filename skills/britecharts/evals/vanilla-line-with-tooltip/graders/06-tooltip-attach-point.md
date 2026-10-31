---
type: llm
focus: trace
weight: 1
---

the tooltip is set with the chart's tooltip(...) setting and is not also called on the chart's svg by hand, or, if wired by hand, is called on the chart's '.metadata-group .vertical-marker-container' or '.metadata-group .hover-marker' element (both name the same element) after the chart has been drawn
