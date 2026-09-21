---
"@britecharts/core": major
---

Settles the public API of `@britecharts/core` for 3.0.0. The entry is
`src/index.js`: the 14 charts, `colors`, and a new `constants` export so
`constants.axisTimeCombinations.HOUR_DAY` can be written instead of the
string (the same object every time-series chart already exposes as
`chart.axisTimeCombinations`). `loadingStates` is no longer exported: it was
the charts' internal loading-state markup, and the typings never declared it.
The unused second entry, `src/charts/index.js`, is deleted; its helpers stay
reachable through the `./src/*` export without a support promise. The
default export (what `require()` and the CDN global `core` return) is
unchanged apart from those two names.

Also fixes the typing of `xAxisFormat` on the time-series charts: it took
the whole `axisTimeCombinations` *object* as its parameter and typed that
object's values as the key names, so the documented call
`chart.xAxisFormat(chart.axisTimeCombinations.HOUR_DAY)` never compiled. It
now accepts an `AxisTimeCombination` member or its string value.
