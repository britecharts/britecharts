---
'@britecharts/react': minor
---

The typings now say what the components do. Every chart's `data` is declared `T | null`: it is required, and `null` means the data has not arrived yet, so nothing is drawn until it does. Leaving `data` out, or passing `undefined`, throws at runtime, and is now a type error too. `ResponsiveContainer` and `withResponsiveness`, which were exported but had no typings at all, are typed: the container hands its `render` prop the measured `{ width }`, and the wrapper takes over the `width` prop of what it wraps.
