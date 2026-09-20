---
'@britecharts/react': major
---

`Bullet` is now a function component on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on it is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (a consumer who mutates their data in place has to pass a new array or object). It also gains the `createTooltip` propType the other charts declare, so Storybook's Controls panel matches theirs.
