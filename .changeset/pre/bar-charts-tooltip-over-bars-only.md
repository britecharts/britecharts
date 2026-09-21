---
'@britecharts/core': patch
---

The stacked bar and grouped bar charts dispatch their hover events (`customMouseOver`, `customMouseMove`, `customMouseOut`) only while the pointer is over a bar. They used to treat the whole band as hoverable, so the tooltip stayed up over the empty space above and between the bars, with nothing on the chart showing what it referred to. Entering a bar from that space is now a mouse over, and leaving the bars for it is a mouse out.
