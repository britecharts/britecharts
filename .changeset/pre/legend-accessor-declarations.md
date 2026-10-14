---
'@britecharts/core': major
---

`colorMap`'s getter is nullable, and the legend component's own accessors declare their getters.

**`colorMap()` can return `null`, and now says so.** It is declared on the shared `ThemableChartAPI`, which promised `Record<string, string>`. Every one of the eight charts that exposes it defaults `nameToColorMap` to `null` and falls back to the colour scale until one is set, so the getter was wrong for all of them: bar, donut, grouped-bar, legend, line, scatter-plot, stacked-area and stacked-bar. Reading it now gives `Record<string, string> | null`, and a consumer indexing the result has to guard first.

**The legend's four own accessors were setter-only**, so `legend().markerSize()` reported the component rather than the number. `highlightEntryById`, `isHorizontal`, `marginRatio` and `markerSize` are each a getter/setter overload pair now, so reading reports the value and setting still chains. `highlightEntryById`'s getter is `number | null`: it has no default, and the component only fades the other entries once an id is set.

**The setters stay non-null, deliberately.** `null` is the unset state these accessors start in, not a value a consumer restores: `applyConfiguration` in `@britecharts/wrappers` treats `null` as "not set" and discards it, so passing one never reaches the chart. That makes the asymmetry intentional rather than an oversight, and it differs from `locale`, which is nullable on both sides because clearing it back to the default is a real operation.

**Breaking**, type-only: code that indexed `colorMap()` without a null check no longer compiles, code relying on one of the four getters' wrong return type no longer compiles, and those setters no longer accept an explicit `undefined`.

Found while converting the legend to TypeScript. `packages/integration`'s TypeScript consumer now asserts all of it, and its `expect-errors.ts` holds the control: against the old non-null `colorMap` getter the unguarded index compiles, which leaves the directive unused and fails the build.
