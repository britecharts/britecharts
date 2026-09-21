---
'@britecharts/wrappers': major
'@britecharts/react': major
---

`false`, `0` and `''` now reach the chart. The wrappers used to skip any configuration value that was falsy, so a chart could never have a setting turned back off: `isLoading={false}` could not end a loading state, and `isAnimated={false}`, `isHorizontal={false}` and `maxEntries={0}` were ignored too. Only `undefined` and `null` mean "not set" now, and the chart keeps its own default for them.

Charts that were relying on a falsy value being ignored will change: a `false`, `0` or `''` that used to leave the chart's default in place now overrides it. Pass `undefined` (or leave the prop out) to keep the default. Event handlers (`customMouseOver`, ...) are unchanged: a falsy handler is still not registered.
