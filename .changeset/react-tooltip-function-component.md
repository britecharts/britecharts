---
'@britecharts/react': major
---

`Tooltip` is now a function component, the last of the stateful ones to move off classes. Its state lives in `useState`, and the tooltip is drawn once the chart it wraps has drawn itself, then follows every render. There is no component instance any more (a `ref` on it is not accepted, and the typings say so). Unlike the charts it does not compare props to skip an update: the pointer moving is a state change and must always reposition the tooltip. The chart it wraps is still rebuilt only when the `Tooltip`'s own props change, never on a pointer move.
