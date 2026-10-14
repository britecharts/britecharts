---
'@britecharts/react': major
---

Every component in `@britecharts/react` is TypeScript, and their declared props match what the charts accept.

Converting a component makes its props checkable against core for the first time: they flow into the wrapper's `WrapperConfiguration<TChart>`, so a prop whose type contradicts the chart's accessor, or that names no accessor at all, stops compiling. Nothing compared those two sides before — `check:api-parity` reads core against core's own typings, and this package's structural specs never looked at a type. Across the eleven components it found this:

**Eleven label props were `number`.** `nameLabel`, `valueLabel`, `topicLabel`, `dateLabel` and `keyLabel`, on bar, grouped bar, stacked bar, stacked area and line, are the key names a chart reads its data under. The correct call was a type error, and the PropTypes said `number` too, so it also warned in development.

**Two props could never work, and are removed.** `nameLabelFormat` on stacked bar named a chart feature that does not exist — passing it threw `Method not supported by Britechart`. `axisTimeCombinations`, on stacked area, line and tooltip, got further before failing: the chart has a key by that name, so the wrapper's guard passed, but it is a constant object rather than an accessor, so applying it threw a `TypeError`. Each of those three components also *exports* the constants under that name, which is the real feature and stays.

**`exportChart` works now.** Four components declared it a callback and sparkline alone had it right: it is the filename the chart's export command takes. Setting it exports a png, through the command channel the wrappers package grew for this.

**Six props were `string` where only a few values do anything**: five `grid` props, all missing the `null` that is the default and the way a grid is turned off, and line's `xAxisScale` and `xAxisValueType`. That last pair is how `'numeric'` type-checked and did nothing, which this migration corrected in core and which the component now rejects.

**Every bare `Function` is a signature.** Twenty-eight custom-event props across seven components are `ChartEventHandler`, the type the wrappers package publishes and registers them through — `Function` carries no call signature, so no handler satisfied it. The callbacks core declares properly — `highlightBarFunction`, two `orderingFunction`s, `centeredTextFunction`, `valueFormatter`, tooltip's `render` — say what they receive and return.

**Tooltip's three commands are each a different shape**: `hide` is a trigger (`boolean`), `show` takes the data point, `update` takes the first argument of the signature a configuration can reach. All three were callbacks. Legend's `clearHighlight` was the same mistake, and `highlight` now type-checks for the first time.

**Six data shapes were structural copies** of core's and now import them, so there is one definition each. Legend's had both fields' optionality backwards: `name` optional though it renders for every entry, `quantity` required though the component supports data without it.

**Four props were `any` or undeclared**: two `emptyDataConfig`s, and `createTooltip` was missing from bullet, donut and legend though each destructures it — so a consumer using Tooltip's render prop could not pass it from TypeScript.

PropTypes are gone from all eleven, so they no longer warn in development; the props are checked at build time instead. Each component declares them in its own file, which is what Storybook's docgen reads, so the Controls and their descriptions are unchanged — asserted in CI rather than assumed.

**Breaking**, type-only except for the two removed props: code relying on any of the wrong types no longer compiles.
