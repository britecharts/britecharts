---
'@britecharts/react': major
---

The bullet and bar components are TypeScript, and their declared props match what the charts accept.

Converting a component makes its props checkable against core for the first time: they flow into the wrapper's `WrapperConfiguration<TChart>`, so a prop whose type contradicts the chart's accessor now fails to compile. Nothing compared those two sides before — `check:api-parity` reads core against core's own typings, and this package's structural specs never looked at a type. Two components in, it has found nine defects.

**Bar.** `nameLabel` and `valueLabel` were `number`, where they are the key names the chart reads its data under, so the correct call was a type error and the PropTypes warned about it too. `highlightBarFunction` and `orderingFunction` were the bare `Function` type, where core declares what each receives and returns. `data` was a structural copy of core's shape and is `BarChartDataShape[]` now. `colorSchema` is `ColorsSchemasType`, and `chart` is the wrapper it holds rather than `any`. **The three custom-event props were `Function`**, which no handler satisfies structurally — `Function` carries no call signature — so they were unusable from TypeScript; they are `ChartEventHandler`, the type the wrappers package publishes for them.

**Bullet.** `data` was a structural copy whose `ranges`, `measures` and `markers` were `number[]` where core declares fixed-length tuples. `colorSchema` is `ColorsSchemasType`, `chart` is the wrapper rather than `any`, and **`createTooltip` was missing entirely** though the component destructures it and its PropTypes declared it, so a TypeScript consumer could not pass it.

**Breaking**, type-only: code relying on any of those wrong types no longer compiles. PropTypes are gone from both components, so they no longer warn in development — the props are checked at build time instead, and each component declares them in its own file so Storybook's Controls and their descriptions are unchanged.
