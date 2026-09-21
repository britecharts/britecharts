---
'@britecharts/react': major
---

Fixes the resize registry behind `ResponsiveContainer` and `withResponsiveness`, and converts both to function components. **The bug:** the first container to unmount ended resizing for every other container still on the page, and for every container mounted afterwards, because the registry stopped listening to the window but never forgot its callbacks. Each container now removes only its own callback, the window is listened to for as long as at least one is registered, and it is listened to again by the next one. The registry's unused `add()` and `clearAll()` are gone; `addHorizontal()` and the new `remove()` are its whole surface. `<ResponsiveContainer />` no longer throws without a `render` prop. `withResponsiveness(Component)` now returns a memoised function component instead of a class: there is no instance to reach with a `ref`, and a parent re-rendering with the same props still costs nothing.
