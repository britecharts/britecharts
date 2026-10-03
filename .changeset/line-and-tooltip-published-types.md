---
'@britecharts/core': major
---

Three corrections to `@britecharts/core`'s published typings, each found by converting the wrappers to TypeScript and each a case where the declaration contradicted the runtime it describes. All are type-only — no runtime behaviour changes — but two narrow a type, so code that compiled before may not now.

**`ChartModuleSelection` takes only its selection.** It declared a second `_data` parameter that no chart has and `d3.call` never passes, so every correct `selection.call(chart)` failed to compile with "Expected 2 arguments, but got 1". All thirteen charts are `function exports(_selection)` and read their datum back out from inside. This was never caught because `packages/integration`'s TypeScript consumer only constructed and configured charts; nothing in it drew one. It does now (`src/charts/draw.ts`), and that test fails against the old declaration.

**`LineChartDataShape.name` is a `number`, not a `string`.** It is the topic identifier — `line.js` reads it as `topic: values[0]['name']`, then keys the colour map and the element id with it, and core's own JSDoc documents it as `@property {number} topic`. Everything in the repo already treated it as numeric: all fourteen of core's line datasets, react's `Line.d.ts`, react's and wrappers' fixtures, both doc pages, and the 2-to-3 migration guide. Only this declaration and the consumer sample written to satisfy it said `string`.

This is the breaking one: a consumer passing a string `name` compiled before. Runtime is unaffected either way, since `topic` is used as an object key and an element id and both coerce — which is how the mismatch survived this long. `string | number` was considered and rejected: no data source in the repo produces a non-numeric name, and it would leave core weaker than react.

**`TooltipTopic.name` likewise.** A list-layout tooltip row *is* a `LineChartDataShape` — line hands the tooltip its raw flat rows untouched — so once the above was corrected, core described the same runtime object two different ways. `TooltipSingleDataShape.name` stays `string`: that is the category name bar, donut and scatter plot dispatch, a different field.

**`TooltipAPI.locale` takes a locale tag, not a format definition.** It was declared `LocalObject | null`, which is d3-format's locale *definition* object. The tooltip's locale goes straight to `Intl.DateTimeFormat(locale, ...)`, so it is a BCP 47 string. Both kinds exist in this library under the same accessor name: the value-formatting charts pass theirs to `setDefaultLocale` and are rightly `LocalObject`, while the time-series charts' `locale` was already `LocaleString` in core's own `base.d.ts`. This brings the tooltip in line with the latter rather than introducing anything new.
