---
'@britecharts/react': patch
---

The package's helpers are TypeScript: `useChart`, `optimizedResize`, `responsiveContainer`, `withResponsiveness`, the constants and the barrel.

No public type changes. `useChart` is typed against the `Wrapper` and `WrapperConfiguration` types the wrappers package publishes rather than a parallel shape of react's own, so the two tiers cannot drift, and `withResponsiveness` implements its already-published generic rather than being given a new one.

The constants are `as const` now, so `xAxisFormat(axisTimeCombinations.HOUR_DAY)` hands over the literal the charts compare against rather than `string` — which is what makes the corrected `xAxisFormat` prop usable.
