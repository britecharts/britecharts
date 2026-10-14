---
'@britecharts/react': major
---

`axisTimeCombinations` is no longer a prop. It was never usable as one.

Stacked area, line and tooltip each declared it, and each also **exports the constants beside the component** — `export const axisTimeCombinations` — which is the real feature and stays. The prop was the same name in the wrong place.

Passing it got further than the stacked bar's phantom prop before failing, which is why it survived: the chart genuinely has an `axisTimeCombinations` key, so the wrapper's `validateConfiguration` guard is satisfied. But that key is a constant object, not an accessor, so `applyConfiguration` then called it — `chart.axisTimeCombinations(value)` — and threw a `TypeError`. Both steps are pinned by a probe against the real chart and the real helpers.

Use the module's export with `xAxisFormat`, which is what the charts' own examples show: `xAxisFormat(axisTimeCombinations.HOUR_DAY)`.

Also on stacked area: **`xAxisFormat` was `string`**, where core declares the four granularities plus `'custom'`. Any string compiled and only five values did anything.
