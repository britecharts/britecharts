---
'@britecharts/core': major
'@britecharts/react': major
---

The data-key accessors are removed from the bar, grouped bar, stacked bar, line, stacked area and sparkline charts: `nameLabel`, `valueLabel`, `groupLabel`, `stackLabel`, `dateLabel`, `topicLabel` and `keyLabel`. They let a chart read its data under other keys, and had warned that they were deprecated since version 2. Each chart now reads the keys its data shape names, such as `name` and `value` for the bar chart. The React `Bar`, `GroupedBar`, `StackedBar`, `Line`, `StackedArea` and `Sparkline` components drop the matching props. The tooltip keeps its own `dateLabel`, `nameLabel`, `topicLabel` and `valueLabel`, because it reads the data points of charts that use different keys.
