---
'@britecharts/react': patch
---

`Bullet` declares its `isLoading` prop, which it already passed to the chart. `Tooltip`'s `topicsOrder` is typed `Array<string | number>`, the same type written out, so Storybook can describe the prop.
