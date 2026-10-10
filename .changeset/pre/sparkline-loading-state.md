---
'@britecharts/core': major
---

`sparkline` no longer declares `loadingState`.

The chart has never had it. `loadingState` is the v2 name, which v3 renamed to `isLoading` — the 2-to-3 migration guide still shows the old call as `barChart.loadingState()`. Every one of the eleven charts with a loading state exposes `isLoading`; none exposes `loadingState`. Only sparkline's declaration kept the old name.

So `sparkline().loadingState('<svg/>')` type-checked and then threw `loadingState is not a function`. **Breaking** only in the sense that code which could never have run no longer compiles.

Removed rather than implemented, on grounds of consistency with the rest of the library: the API families are `isLoading` across the board.

A permanently skipped spec in `heatmap.spec.js` testing the same removed method goes with it — it was one of core's eleven skipped tests, kept green by never running.
