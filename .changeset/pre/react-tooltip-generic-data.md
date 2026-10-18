---
'@britecharts/react': minor
---

`Tooltip` infers its data type from its `data` prop and hands the same type to its `render` callback, so `render={(props) => <Line {...props} />}` type-checks without a cast or a second `data` prop. `TooltipProps` and `TooltipRenderArgs` take the data type as a parameter, defaulting to the union of every chart's data, so existing code compiles unchanged. `TooltipRenderArgs` and `TooltipData` are exported from the package.
