# @britecharts/core

## 3.0.0-beta.3

### Major Changes

- 4efdab3: Core's accessors now declare their getter, not just their setter.

    Every accessor in this library is a get-or-set pair — `if (!arguments.length) { return value; }` — but the published typings described only one of the two:

    ```ts
    width(width?: number): T & ChartBaseAPI<T>;
    ```

    That says `chart.width()` hands back the chart. It hands back a number. The same was true of `height`, `margin`, `isLoading`, `numberFormat`, `colorSchema`, `colorMap`, `isAnimated`, `animationDuration`, `locale` and `xAxisCustomFormat` — every shared accessor of every chart. A consumer could not assign one to a typed variable:

    ```ts
    const w: number = chart.width();
    // Type 'ChartModuleSelection<...> & ChartBaseAPI<...>' is not assignable to type 'number'
    ```

    Each is now a pair of overloads, so both halves are described:

    ```ts
    width(): number;
    width(width: number): T & ChartBaseAPI<T>;
    ```

    **Breaking**, in two ways, both type-only — no runtime behaviour changes at all:

    - Code that relied on the getter's wrong return type, for example assigning `chart.width()` to a variable annotated as the chart, no longer compiles. It never worked at runtime.
    - Calling a setter with an explicit `undefined` — `chart.width(undefined)` — no longer matches either overload. Previously the single `width?: number` signature accepted it. At runtime that call is a _get_, not a set, so this is the type catching a mistake it used to wave through.

    Chaining is unaffected: `bar().width(100).height(200)` still returns the chart, which is what the setter overload says.

    Found while converting core's charts to TypeScript. An implementation cannot be typed against a declaration that contradicts it — the getter branch's `return width;` does not compile when the declaration promises the chart — so this had to be settled before the first chart could convert.

    `packages/integration`'s TypeScript consumer gained `src/charts/accessors.ts`, which reads every shared accessor into a typed variable and chains the setters alongside. Nothing there had ever _read_ an accessor, which is exactly why this survived so long; the file fails with 18 type errors against the old declarations and compiles clean against the new ones, under both the `node` and `bundler` resolution tiers.

    Chart-specific accessors (`boxSize`, `yAxisLabels` and the rest, declared per chart rather than in the shared interfaces) are corrected along with each chart's own conversion.

- 8c5d63d: The bar chart's declarations match what it actually does. Twenty-two setter-only accessors, one of them declared with the wrong callback type.

    **`orderingFunction` was declared `=> void`**, and the chart hands it straight to `Array.prototype.sort`, which reads the sign of what the comparator returns. A callback returning nothing type-checked and would have left the bars in their original order. It returns a `number`, and its getter is `undefined` until one is set — the chart has no default ordering and only sorts once a comparator arrives. Same defect, and same fix, as the donut's `orderingFunction`.

    **Twenty-two of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `betweenBarsPadding`, `chartGradient`, `enableLabels`, `hasPercentage`, `hasSingleBarHighlight`, `highlightBarFunction`, `isHorizontal`, `labelsMargin`, `labelsNumberFormat`, `labelsSize`, `orderingFunction`, `percentageAxisToMaxRatio`, `shouldReverseColorList`, `valueLabel`, `valueLocale`, `xAxisLabel`, `xAxisLabelOffset`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yAxisPaddingBetweenChart` and `yTicks` are each a getter/setter overload pair now. `nameLabel` already had both and is unchanged.

    **Five getters are wider than their setter**, each for its own reason rather than one rule. `chartGradient`, `xAxisLabel`, `yAxisLabel` and `valueLocale` are `null` in the module's own `let` block — where the grouped and stacked bars left their axis labels uninitialised, this chart initialises them to `null`, so a consumer guards against `null` here and `undefined` there. `orderingFunction` has no initialiser at all and reads `undefined`.

    **`hasPercentage` is not a stored value**, as on the stacked bar: its getter computes `numberFormat === PERCENTAGE_FORMAT` and its setter swaps `numberFormat` between the percentage and plain formats.

    **`highlightBarFunction`'s getter is nullable** because `null` goes in to disable the highlight, which the chart's own example documents. It does not stay `null`: the first hover replaces it with a no-op, so reading it back after one reports that function rather than the `null` that was set.

    **Breaking**, type-only: code relying on one of those twenty-two getters' wrong return type no longer compiles, a comparator that returns nothing is now rejected, none of the setters accepts an explicit `undefined` any more, and the five wide getters have to be guarded before use.

    Found while preparing the bar chart's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all twenty-two, chains the setters, and sorts an array with the comparator it reads back; `expect-errors.ts` holds the controls for the five wide getters and for the callback that returns nothing, since that last one cannot be caught by a positive assertion.

- b3a6d3e: The brush chart's declarations match what it actually does. Three defects, two of them the kind that compiles and then fails the consumer.

    **Three inherited surfaces were parameterised with the wrong type.** `BrushChartAPI` extended `AnimatedChartAPI<BrushChartAPI>`, `TimeSeriesChartAPI<BrushChartAPI>` and `InteractiveChartAPI<BrushChartAPI>`, where every other chart passes its Module. Those interfaces return `T & XAPI<T>`, so `brush().isAnimated(true)` reported `BrushChartAPI & AnimatedChartAPI<BrushChartAPI>` — a type with no `ChartModuleSelection` in it. The result could not be passed to `selection.call()`, and chaining off it lost the rest of the chart. So `d3.select(...).datum(data).call(brush().isAnimated(true))` did not compile, although it works at runtime. The `ChartBaseAPIMinimal<BrushChartModule>` on the line above had it right.

    **`roundingTimeInterval`'s setter returned `BrushChartKeys`** — the `'value' | 'date'` data-key enum, which this accessor has nothing to do with. It holds a d3 time interval name such as `'timeDay'`, and setting it returns the module like every other accessor, so the declared type made it unchainable and described the wrong domain entirely.

    **Its six own accessors were setter-only**, so reading one reported the chart rather than its value: `areaCurve`, `dateRange`, `gradient`, `isLocked`, `roundingTimeInterval` and `xTicks` are each a getter/setter overload pair now. Two getters are nullable, matching the defaults the chart really has — `dateRange` is `[null, null]` until both ends are set, and `xTicks` is `null`, which leaves the tick count to d3.

    **Breaking**, type-only: code relying on one of those getters' wrong return type no longer compiles, and those setters no longer accept an explicit `undefined`. Everything this fixes was previously a compile error for consumers doing the correct thing.

    Found while preparing the brush chart's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer now asserts all three, and each is controlled: reinstating either the `BrushChartAPI` generics or the `BrushChartKeys` return fails the consumer build on its own.

    Note that `check:api-parity` passed brush at 17 exposed / 17 declared throughout. It compares accessor _names_ in both directions and cannot see a wrong return type, a wrong generic argument or a missing getter overload — so this class of defect is still found only by converting a chart or by typing a consumer against it.

- b3a6d3e: `BrushChartDataShape.value` is nullable, because a gap in the series is a case the brush chart is built to draw.

    The chart has three pieces of machinery for it: `acceptNullValue` preserves a null rather than coercing it to zero, `brushArea.defined()` skips those points so the area breaks instead of dropping to the baseline, and `brushMissingData.json` — the fixture the chart's own spec and Storybook story use — carries eleven of them.

    The declared shape said `value: number`, so a TypeScript consumer could not pass the data the library itself ships. `SAMPLE_BRUSH_DATA` in `packages/integration`'s consumer now includes a null row, which is the assertion: against the old shape that row did not compile.

    **Breaking**, type-only, and only for reading: code that passes brush data is unaffected, since the accepted type widened. Code that _reads_ `value` off a `BrushChartDataShape` now has to account for null — which it always did at runtime.

- 92c178c: The bullet chart's accessors now declare their getters, and two of them declare the right type.

    **`customTitle` and `customSubtitle` were declared `number`.** They are strings: the chart assigns them to `title` and `subtitle` and renders them as text, and its own documented examples are `bulletChart.customTitle('CPU Usage')` and `bulletChart.customSubtitle('GHz')`. Passing the string the examples show did not compile; passing the number the declaration asked for would have rendered a number. Both now read `string`, and `string | undefined` on the way out, since neither has a default.

    **Its seven chart-specific accessors were setter-only**, so `bullet().ticks()` reported the chart rather than the number. The previous release corrected this for the shared interfaces in `common/base.d.ts`; it never reached the per-chart declarations. `colorSchema`, `customSubtitle`, `customTitle`, `isReverse`, `paddingBetweenAxisAndChart`, `startMaxRangeOpacity` and `ticks` are each a getter/setter overload pair now, so reading reports the value and setting still chains.

    Also: `BulletChartBaseAPI` was `Omit<ChartBaseAPI<BulletChartModule>, 'locale' | 'isAnimated' | 'loadingState'>`, and `ChartBaseAPI` declares none of those three — the real member is `isLoading`, which the chart has and keeps. The `Omit` removed nothing while reading as though it removed three things, so it is spelled plainly.

    **Breaking**, type-only: code relying on a getter's wrong return type no longer compiles, `customTitle(1)` is rejected where a string is now required, and a setter no longer accepts an explicit `undefined`.

    Found while converting the chart to TypeScript. The other eleven charts' own accessors have the same setter-only shape and are corrected as each converts.

- 4efdab3: `@britecharts/core` now ships a built ESM entry point at `dist/esm/` instead of serving authored source from `src/`. `module` and `exports["."].import` both resolve there.

    **This fixes a break that already shipped.** `module` was `src/index.js`, which imports `'./charts/helpers/color.js'` — and since the first helper converted, that file is `color.ts` on disk. The published tarball contained `src/charts/helpers/color.ts` beside an `index.js` that could not reach it. Measured against the packed tarball: `src/` held **91 specifiers a plain bundler cannot resolve**; `dist/esm/` holds **none**.

    Nothing caught it, for the same reasons documented when `@britecharts/wrappers` hit this:

    - Vite resolves `.js` → `.ts` and transpiles it, so the browser tiers in `packages/integration` passed.
    - The require tier only exercises the CommonJS/UMD bundle, which was never affected.
    - The tarball tier asserted `src/charts/*/*.js` with a hard-coded count, so it counted _down_ as charts converted rather than failing. That assertion is now `src/charts/*/*.?s`, which holds across a conversion, and `dist/esm` is asserted alongside it.

    **Breaking:** deep imports of converted files through the published `./src/*` subpath no longer resolve — `@britecharts/core/src/charts/helpers/color.js` is `color.ts` on disk now. `src/**` still ships, so deep imports of the charts that are still JavaScript keep working, but that set shrinks with every conversion. Import from the package root instead.

    `types` deliberately still points at the hand-written `src/typings/index.d.ts` rather than at generated declarations. Those typings are the source of truth today and most charts are still JavaScript, so emitting declarations from source would produce something weaker than what is already there. Retiring `src/typings/` in favour of generated output is Phase 5's job, and `dist/esm` is where it will land.

    Also: `dist/esm/**` had to be added to `files`. It was not packed at first, and the tarball tier is what caught that.

- b3a6d3e: The donut chart's declarations match what it actually does. Two wrong callback types, and eleven setter-only accessors.

    **`centeredTextFunction` and `orderingFunction` were declared `=> void`**, and the chart reads both for what they return: the first's result goes to `.text()`, the second's to `.sort()`. The chart's own defaults say what they really are — `(d) => \`${d.percentage}% ${d.name}\``and`(a, b) => b.quantity - a.quantity`.

    TypeScript lets a value-returning function satisfy a `=> void` parameter, so a consumer's correct callback always compiled, which is why this went unnoticed. Two things were broken anyway: reading either accessor back gave a function whose result was `void` and unusable, and the declaration accepted a callback that returns nothing — a comparator returning `undefined` would have left the slices unsorted.

    **Its eleven own accessors were setter-only**, so reading one reported the chart rather than its value: `centeredTextFunction`, `emptyDataConfig`, `externalRadius`, `hasFixedHighlightedSlice`, `hasHoverAnimation`, `hasLastHoverSliceHighlighted`, `highlightSliceById`, `internalRadius`, `orderingFunction`, `percentageFormat` and `radiusHoverOffset` are each a getter/setter overload pair now. `highlightSliceById`'s getter is `number | undefined`: the chart has no default and only highlights a slice once an id arrives.

    **Breaking**, type-only: code relying on one of those getters' wrong return type no longer compiles, a callback that returns nothing is now rejected, and those setters no longer accept an explicit `undefined`.

    Found while preparing the donut's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all eleven and uses both callbacks for their results; `expect-errors.ts` holds the control for the two that were too loose rather than wrong, since reinstating `=> void` leaves those directives unused and fails the build.

- 8c5d63d: The grouped bar chart's declarations match what it actually does. Eleven setter-only accessors, three of whose getters are wider than their setter.

    **Eleven of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `betweenBarsPadding`, `betweenGroupsPadding`, `grid`, `isHorizontal`, `tooltipThreshold`, `valueLocale`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yTicks` and `yTickTextOffset` are each a getter/setter overload pair now. Its three label accessors — `groupLabel`, `nameLabel`, `valueLabel` — already had both and are unchanged.

    **Three of those getters are wider than their setter**, because the chart has no usable default for any of them. `grid` and `valueLocale` are `null` in the module's own `let` block, and `yAxisLabel` has no initialiser at all, so reading any of the three before setting it gives the empty value: `GridTypes | null`, `LocalObject | null` and `string | undefined` respectively.

    `grid`'s setter takes `GridTypes | null` to match: the chart's own JSDoc documents `null` as the default and assigns it straight through, so `grid(null)` is the documented way to turn a grid back off. `valueLocale` already accepted `null` and still does.

    **Breaking**, type-only: code relying on one of those eleven getters' wrong return type no longer compiles, none of the eleven setters accepts an explicit `undefined` any more — `grid` and `valueLocale` take `null`, which the other nine do not — and the three wide getters now have to be guarded before use.

    Found while preparing the grouped bar's TypeScript conversion, which lands separately, the way brush's and the donut's declarations were corrected ahead of theirs. `packages/integration`'s TypeScript consumer reads all eleven and chains the setters; `expect-errors.ts` holds the control for the three wide getters, since narrowing any of them back to its setter's type leaves a directive unused and fails the build.

- 4efdab3: The heatmap chart's typings now describe all eleven of its accessors, not eight.

    Comparing the implementation against its declaration, three accessors it has always shipped were never declared:

    - **`on`** — the event bridge. This is how a consumer attaches a tooltip to a chart, which is the pattern this library's own examples show, so `heatmap().on('customMouseOver', tooltip.show)` was a compile error for every TypeScript consumer.
    - **`isAnimated`**
    - **`animationDuration`**

    All three are marked `@public` in the chart's own JSDoc. `HeatmapChartAPI` now extends `InteractiveChartAPI` and `AnimatedChartAPI` alongside the interfaces it already had.

    Its two own accessors, `boxSize` and `yAxisLabels`, also gained their getter overloads, the same correction described in the accessor-getter changeset. `yAxisLabels()` reports `string[] | undefined`, which is honest: the chart declares it with no default and falls back to `['Mo', 'Tu', ...]` at draw time, so reading it before setting it really does give `undefined`.

    Found by converting the chart to TypeScript — the implementation cannot be typed against a declaration that is missing members it assigns. `packages/integration`'s TypeScript consumer now reads each of these and wires a mini tooltip through `on`, which fails with 10 type errors against the old declaration under both resolution tiers.

    Heatmap has no wrapper or React component, so there is no cross-package parity to restore here. The other charts' own accessors are checked the same way as each converts.

- b3a6d3e: `colorMap`'s getter is nullable, and the legend component's own accessors declare their getters.

    **`colorMap()` can return `null`, and now says so.** It is declared on the shared `ThemableChartAPI`, which promised `Record<string, string>`. Every one of the eight charts that exposes it defaults `nameToColorMap` to `null` and falls back to the colour scale until one is set, so the getter was wrong for all of them: bar, donut, grouped-bar, legend, line, scatter-plot, stacked-area and stacked-bar. Reading it now gives `Record<string, string> | null`, and a consumer indexing the result has to guard first.

    **The legend's four own accessors were setter-only**, so `legend().markerSize()` reported the component rather than the number. `highlightEntryById`, `isHorizontal`, `marginRatio` and `markerSize` are each a getter/setter overload pair now, so reading reports the value and setting still chains. `highlightEntryById`'s getter is `number | null`: it has no default, and the component only fades the other entries once an id is set.

    **The setters stay non-null, deliberately.** `null` is the unset state these accessors start in, not a value a consumer restores: `applyConfiguration` in `@britecharts/wrappers` treats `null` as "not set" and discards it, so passing one never reaches the chart. That makes the asymmetry intentional rather than an oversight, and it differs from `locale`, which is nullable on both sides because clearing it back to the default is a real operation.

    **Breaking**, type-only: code that indexed `colorMap()` without a null check no longer compiles, code relying on one of the four getters' wrong return type no longer compiles, and those setters no longer accept an explicit `undefined`.

    Found while converting the legend to TypeScript. `packages/integration`'s TypeScript consumer now asserts all of it, and its `expect-errors.ts` holds the control: against the old non-null `colorMap` getter the unguarded index compiles, which leaves the directive unused and fails the build.

- 8c5d63d: The line chart's declarations match what it actually does. Thirteen setter-only accessors, and the same x-axis defect the stacked area had.

    **`xAxisValueType` accepted the one value that does nothing.** It was declared `'date' | 'numeric'`, while the chart compares against `'number'` in four places. So `'numeric'` type-checked and was inert, and `'number'` — the value that actually switches the axis to plain numbers — was rejected. The accessor's own `@example` is `line.xAxisValueType('number')`. It is `LineChartXAxisValueType` now, a named export, as is `LineChartXAxisScale`. The stacked area chart had the identical defect, corrected in the same phase.

    **Thirteen of its own accessors were setter-only** — a single signature returning the chart — so reading one reported the chart rather than its value: `grid`, `lineCurve`, `lineGradient`, `lines`, `shouldShowAllDataPoints`, `tooltipThreshold`, `xAxisLabel`, `xAxisScale`, `xAxisValueType`, `xTicks`, `yAxisLabel`, `yAxisLabelPadding` and `yTicks` are each a getter/setter overload pair now. `dateLabel`, `hasMinimumValueScale`, `topicLabel` and `valueLabel` already had both.

    **`lineGradient` reports `ColorGradientType`**, the two-element tuple the colour helper already defines, rather than an inline `[string, string]` — the chart reads `[0]` and `[1]` and nothing else, as the sparkline's gradients do.

    **Four getters are wider than their setter:** `grid`, `xAxisLabel`, `yAxisLabel` and `xTicks` are `null` by default, and `xTicks` hands that straight to d3 to mean "use the scale's own count". This chart initialises its axis labels to `null` where the grouped and stacked bars leave theirs undefined — the same split the bar chart has, and still worth a consumer's attention when writing one guard for several charts.

    **Breaking**, type-only: `'numeric'` is no longer accepted where `'number'` is, code relying on one of those thirteen getters' wrong return type no longer compiles, none of the setters accepts an explicit `undefined` any more, and the four wide getters have to be guarded.

    Found while preparing the line chart's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all thirteen and chains the setters, including a chain off `on` back to one of the chart's own accessors — the assertion that catches a wrong generic on an inherited surface, which neither `check:api-parity` nor any setter-only assertion can see.

- d853655: Three corrections to `@britecharts/core`'s published typings, each found by converting the wrappers to TypeScript and each a case where the declaration contradicted the runtime it describes. All are type-only — no runtime behaviour changes — but two narrow a type, so code that compiled before may not now.

    **`ChartModuleSelection` takes only its selection.** It declared a second `_data` parameter that no chart has and `d3.call` never passes, so every correct `selection.call(chart)` failed to compile with "Expected 2 arguments, but got 1". All thirteen charts are `function exports(_selection)` and read their datum back out from inside. This was never caught because `packages/integration`'s TypeScript consumer only constructed and configured charts; nothing in it drew one. It does now (`src/charts/draw.ts`), and that test fails against the old declaration.

    **`LineChartDataShape.name` is a `number`, not a `string`.** It is the topic identifier — `line.js` reads it as `topic: values[0]['name']`, then keys the colour map and the element id with it, and core's own JSDoc documents it as `@property {number} topic`. Everything in the repo already treated it as numeric: all fourteen of core's line datasets, react's `Line.d.ts`, react's and wrappers' fixtures, both doc pages, and the 2-to-3 migration guide. Only this declaration and the consumer sample written to satisfy it said `string`.

    This is the breaking one: a consumer passing a string `name` compiled before. Runtime is unaffected either way, since `topic` is used as an object key and an element id and both coerce — which is how the mismatch survived this long. `string | number` was considered and rejected: no data source in the repo produces a non-numeric name, and it would leave core weaker than react.

    **`TooltipTopic.name` likewise.** A list-layout tooltip row _is_ a `LineChartDataShape` — line hands the tooltip its raw flat rows untouched — so once the above was corrected, core described the same runtime object two different ways. `TooltipSingleDataShape.name` stays `string`: that is the category name bar, donut and scatter plot dispatch, a different field.

    **`TooltipAPI.locale` takes a locale tag, not a format definition.** It was declared `LocalObject | null`, which is d3-format's locale _definition_ object. The tooltip's locale goes straight to `Intl.DateTimeFormat(locale, ...)`, so it is a BCP 47 string. Both kinds exist in this library under the same accessor name: the value-formatting charts pass theirs to `setDefaultLocale` and are rightly `LocalObject`, while the time-series charts' `locale` was already `LocaleString` in core's own `base.d.ts`. This brings the tooltip in line with the latter rather than introducing anything new.

- 8c5d63d: The scatter plot's declarations match what it actually does. Twenty-one setter-only accessors, four of whose getters are wider than their setter.

    **Twenty-one of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `circleStrokeOpacity`, `circleStrokeWidth`, `circleOpacity`, `enableZoom`, `grid`, `hasCrossHairs`, `hasHollowCircles`, `hasTrendline`, `highlightTextLegendOffset`, `maxCircleArea`, `valueLocale`, `xAxisFormat`, `xAxisFormatType`, `xAxisLabel`, `xAxisLabelOffset`, `xTicks`, `yAxisFormat`, `yAxisLabel`, `yAxisLabelOffset` and `yTicks` are each a getter/setter overload pair now.

    **`yTicks` is `null` by default**, which is this chart's own idiom rather than an oversight: it hands the value straight to d3's `axis.ticks`, where `null` means "use the scale's own tick count". So reading it back before setting one gives `null`, not a number — the same shape brush's `xTicks` already has, and its setter takes a number only, following that precedent. `xTicks` defaults to `6` and is an ordinary number.

    **The other three wide getters** are the familiar ones: `grid` and `valueLocale` are `null` in the module's own `let` block, and `xAxisLabel` and `yAxisLabel` have no initialiser, so they read `undefined`.

    **Two JSDoc errors fixed in passing**, neither of which changes a type: `grid`'s parameter was named `opacity`, which this accessor has never had anything to do with, and `yTicks` was documented as "Gets or Sets the xTicks of the chart".

    **Breaking**, type-only: code relying on one of those twenty-one getters' wrong return type no longer compiles, none of the setters accepts an explicit `undefined` any more, and the four wide getters have to be guarded before use.

    Found while preparing the scatter plot's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all twenty-one and chains the setters; `expect-errors.ts` holds the control for the four wide getters.

- ce4a559: Two accessors the typings promised and the charts never had are no longer declared.

    Both compiled and then threw, which is the worse half of a typings mismatch — an undeclared accessor merely cannot be called.

    **`scatterPlot.numberFormat`** came in from `ChartBaseAPI` and the chart has no implementation for it. Removed rather than implemented, on consistency grounds: this chart's own idiom is a format per axis, `xAxisFormat` and `yAxisFormat`, both of which it exposes. A chart-wide `numberFormat` would be a second way to say the same thing.

    **`stackedBar.locale`** was declared on the chart itself, described as "Pass language tag for the tooltip to localize the date". Every one of the four charts that exposes `locale` has a time axis; stacked-bar has none — no `getTimeSeriesAxis`, no `timeFormat`, no `Intl.DateTimeFormat` — so there is no date for a language tag to localise. Its `valueLocale`, the d3-format locale, is untouched and still exposed.

    While there: `ScatterPlotBaseAPI` omitted `'locale' | 'loadingState'` from `ChartBaseAPI`, and `ChartBaseAPI` declares neither — the loading accessor is `isLoading` and `locale` lives on `TimeSeriesChartAPI`. That `Omit` removed nothing while reading as though it removed two things, the same vestigial pattern corrected in the bullet chart.

    **Breaking**, type-only, and only for code that could never have run.

- b3a6d3e: The sparkline chart's own accessors now declare their getters.

    **Its four chart-specific accessors were setter-only**, so `sparkline().areaGradient()` reported the chart rather than the two colours. This is the same gap bullet's seven had, and the correction is the same: `areaGradient`, `lineGradient`, `titleText` and `titleTextStyle` are each a getter/setter overload pair now, so reading reports the value and setting still chains. The chart's other three — `dateLabel`, `valueLabel` and `isLoading` — already read correctly and are untouched.

    `titleText`'s getter is `string | undefined`: the chart has no default title, and `drawSparklineTitle` only runs once one is set. The two gradients stay the two-element tuple they have always been declared as, which is what the chart reads — `[0]` and `[1]` and nothing else.

    **Breaking**, type-only: code relying on one of those four getters' wrong return type no longer compiles, and the setters no longer accept an explicit `undefined`.

    Found while converting the chart to TypeScript. The getters are now asserted by `packages/integration`'s TypeScript consumer, which fails if the old single-signature declaration is reinstated.

- ce4a559: `sparkline` no longer declares `loadingState`.

    The chart has never had it. `loadingState` is the v2 name, which v3 renamed to `isLoading` — the 2-to-3 migration guide still shows the old call as `barChart.loadingState()`. Every one of the eleven charts with a loading state exposes `isLoading`; none exposes `loadingState`. Only sparkline's declaration kept the old name.

    So `sparkline().loadingState('<svg/>')` type-checked and then threw `loadingState is not a function`. **Breaking** only in the sense that code which could never have run no longer compiles.

    Removed rather than implemented, on grounds of consistency with the rest of the library: the API families are `isLoading` across the board.

    A permanently skipped spec in `heatmap.spec.js` testing the same removed method goes with it — it was one of core's eleven skipped tests, kept green by never running.

- 8c5d63d: The stacked area chart's declarations match what it actually does. Seventeen setter-only accessors and three defects, one of which named the wrong chart.

    **`InteractiveChartAPI` was parameterised with `StackedBarChartModule`** — the wrong chart, not merely the wrong one of this chart's own two types. So `stackedArea().on(...)` reported the stacked _bar_'s API: a chain crossing from `on` back to anything of this chart's own, such as `.on(...).areaCurve(...)`, did not compile, and the result could not be handed to `selection.call()` as a stacked area. Same class as the three brush generics corrected earlier, one step further out.

    **`emptyDataConfig` was missing `minY`.** The chart's own default carries it and `getMinValue` reads it, so a config without one compiled and then gave the value scale an undefined lower bound — a `NaN` domain, and nothing drawn.

    **`xAxisValueType` accepted the one value that does nothing.** It was declared `'date' | 'numeric'`, while the chart compares against `'number'` in three places. So `'numeric'` type-checked and was inert, and `'number'` — the value that actually switches the axis to plain numbers — was rejected. The accessor's own JSDoc has said `'number'` all along. It is `StackedAreaXAxisValueType` now, a named export, as is `StackedAreaXAxisScale`.

    **Seventeen of its own accessors were setter-only**, so reading one reported the chart rather than its value: `areaCurve`, `areaOpacity`, `emptyDataConfig`, `grid`, `hasOutline`, `keyLabel`, `tooltipThreshold`, `topicsOrder`, `xAxisScale`, `xAxisValueType`, `xTicks`, `yAxisBaseline`, `yAxisLabel`, `yAxisLabelOffset` and `yTicks` are each a getter/setter overload pair now. `dateLabel` and `valueLabel` already had both.

    **Four getters are wider than their setter:** `grid` and `xTicks` are `null` by default — `xTicks` hands that straight to d3 to mean "use the scale's own count" — and `topicsOrder` and `yAxisLabel` have no initialiser, so they read `undefined`.

    **Breaking**, type-only: `on`'s result changes type, an empty-data config now needs `minY`, `'numeric'` is no longer accepted where `'number'` is, code relying on one of those seventeen getters' wrong return type no longer compiles, and the four wide getters have to be guarded.

    Found while preparing the chart's TypeScript conversion, which lands separately. Each defect has its own control in `packages/integration`, and reverting any one of them fails only its own.

- 8c5d63d: The stacked bar chart's declarations match what it actually does. Twelve setter-only accessors, three of whose getters are wider than their setter.

    **Twelve of its own accessors were setter-only** — a single optional-parameter signature returning the chart — so reading one reported the chart rather than its value: `betweenBarsPadding`, `grid`, `hasPercentage`, `hasReversedStacks`, `isHorizontal`, `percentageAxisToMaxRatio`, `tooltipThreshold`, `valueLocale`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset` and `yTicks` are each a getter/setter overload pair now. Its three label accessors — `nameLabel`, `stackLabel`, `valueLabel` — already had both and are unchanged.

    **Three of those getters are wider than their setter**, because the chart has no usable default: `grid` and `valueLocale` are `null` in the module's own `let` block and `yAxisLabel` has no initialiser, so reading any of the three before setting it gives `GridTypes | null`, `LocalObject | null` and `string | undefined` respectively. `grid`'s setter takes `GridTypes | null` to match, since the assignment goes straight through and putting the default back is how a grid is turned off — the same as on the grouped bar, whose JSDoc documents that default where this chart's does not.

    **`hasPercentage` is not a stored value at all.** Its getter computes `numberFormat === PERCENTAGE_FORMAT`, and its setter swaps `numberFormat` between the percentage and plain formats. It reports a boolean either way, and the published declaration now says so.

    **Breaking**, type-only: code relying on one of those twelve getters' wrong return type no longer compiles, none of the twelve setters accepts an explicit `undefined` any more — `grid` and `valueLocale` take `null`, which the other ten do not — and the three wide getters now have to be guarded before use.

    Found while preparing the stacked bar's TypeScript conversion, which lands separately, the way the grouped bar's, brush's and the donut's declarations were corrected ahead of theirs. `packages/integration`'s TypeScript consumer reads all twelve, chains the setters, and reads `hasPercentage` and `numberFormat` back after setting the first; `expect-errors.ts` holds the control for the three wide getters.

- 8c5d63d: The tooltip's declarations match what it actually does. Sixteen setter-only accessors.

    **Sixteen of its accessors were setter-only** — a single optional-parameter signature returning the module — so reading one reported the module rather than its value: `layout`, `dateFormat`, `dateCustomFormat`, `dateLabel`, `locale`, `nameLabel`, `numberFormat`, `valueFormatter`, `shouldShowDateInTitle`, `title`, `tooltipOffset`, `topicsOrder`, `topicLabel`, `valueLabel`, `maxEntries` and `xAxisValueType` are each a getter/setter overload pair now. `hide`, `show` and `update` are commands rather than accessors: they return void and have never chained.

    **`dateFormat`'s getter never reports null**, where the two format accessors beside it do. It falls back to the default axis setting (`DAY_MONTH`) when none has been set, so it always answers with the format the tooltip would actually use, while `dateCustomFormat` and `numberFormat` report `null` until set. Three format accessors on one module, two different shapes.

    **`locale` is `LocaleString | null | undefined`.** The tooltip declares it with no initialiser, so it reads `undefined` until set, and its setter accepts `null` — where the time-series charts default theirs to `null` and so never report `undefined`.

    `TooltipXAxisValueType` is now a named export rather than an inline union repeated in two signatures.

    **Breaking**, type-only: code relying on one of those sixteen getters' wrong return type no longer compiles, none of the setters accepts an explicit `undefined` any more, and the four nullable getters have to be guarded before use.

    Found while preparing the tooltip's TypeScript conversion, which lands separately and which `mini-tooltip` is waiting on. `packages/integration`'s TypeScript consumer reads all sixteen, chains the setters and calls the formatter it reads back; `expect-errors.ts` holds the control for the four nullable ones.

- 8c5d63d: `TooltipTopic.name` is `string | number`, and `topicsOrder` matches it.

    Two charts feed the tooltip's list layout and they name their topics differently. **line** hands over its raw flat rows, where `name` is a numeric topic id and `topicName` is the label. **stacked area**'s topics are named by string — `"Direct"` in its own data-shape example, and the string names its story passes to `topicsOrder`. The tooltip only ever compares this field or sorts by it, so both work at runtime.

    Only the declaration had to pick one, and it had picked each in turn: `string` first, then `number` once `LineChartDataShape.name` was corrected. Both were half the story, and whichever was declared made the other chart's correct usage a type error.

    **`topicsOrder` is now `TooltipTopic['name'][]`.** It was declared `string[]`, which matched neither consistently: the tooltip orders with `topic.name === orderName`, and its own spec passes `[1, 2, 3, 4, 5]` while stacked area's story passes `['Other', 'Sunny', …]`. A consumer who passed the wrong kind got no error and a list that silently sorted to nothing, because no comparison ever matched.

    **Breaking**, type-only: code that narrowed a topic's `name` to `number` (or to `string`) now has to handle both, and `topicsOrder` accepts either kind.

    `packages/integration`'s TypeScript consumer asserts both: a numeric order and a string order, each read back. Narrowing the union to either half fails the other one, which is the control.

### Minor Changes

- b3a6d3e: `brush` honours `locale`, which it has always declared.

    The accessor stored the value and nothing read it, so setting it did nothing at all. `getTimeSeriesAxis` takes a locale as its fourth argument — `line` passes it, and brush passed three arguments — so the x axis always formatted its ticks in d3's default English however the accessor was set.

    This is the same shape as the `stackedArea.numberFormat` bug: an accessor that looks configurable and is inert. One line.

    The test asserts the rendered tick text rather than the accessor, because a getter/setter pair passes trivially and would have passed against this bug too. Controlled by removing the argument again: both axes then render identical English ticks and the test fails.

- 19cec87: `BulletChartDataShape` now declares `title` and `subtitle`.

    The chart reads `originalData.title` and `originalData.subtitle` and renders both, and its own `@typedef BulletChartData` documents them as optional strings — but the declared shape omitted them, so a consumer passing the data the documentation shows did not compile.

    Found while converting the chart to TypeScript: the implementation cannot be typed against a data shape that is missing properties it reads.

- a933bf6: Eighteen accessors that have always shipped are now declared, across eight charts.

    Nothing compared a chart's runtime surface against its published typings, so these had drifted out of the declarations and a consumer writing TypeScript could not call them at all:

    | Chart         | Accessors                                                       |
    | ------------- | --------------------------------------------------------------- |
    | `bar`         | `nameLabel`                                                     |
    | `donut`       | `hasCenterLegend`                                               |
    | `groupedBar`  | `groupLabel`, `nameLabel`, `valueLabel`                         |
    | `legend`      | `unit`                                                          |
    | `line`        | `dateLabel`, `topicLabel`, `valueLabel`, `hasMinimumValueScale` |
    | `sparkline`   | `dateLabel`, `valueLabel`, `isLoading`                          |
    | `stackedArea` | `dateLabel`, `valueLabel`                                       |
    | `stackedBar`  | `nameLabel`, `stackLabel`, `valueLabel`                         |

    Fifteen of the eighteen are one family — the keys a chart reads its data by. **They are typed `string`, which is what they have always been at runtime**, not what their JSDoc claimed: most were documented `{number}` or `{Number}`, and several `@return` tags named no type at all (`{valueLabel | module}`). The types here come from each implementation's own default — `nameLabel` is `'name'`, `valueLabel` is `'value'`, `dateLabel` is `'date'` — rather than from the comments.

    Each is declared as a getter/setter overload pair, matching the correction in the previous release, so `chart.valueLabel()` reports a `string` and `chart.valueLabel('value')` still chains.

    `check:api-parity` in `@britecharts/core` now makes the comparison and runs in CI. It reads the declaration side through the TypeScript compiler, so inherited members, intersections and `Omit` all resolve — `Omit` especially, since a member removed on purpose must not be reported as missing. The runtime side is read from the source, because the accessors are properties assigned onto a function inside a closure and nothing infers them.

    `brush`, `bullet`, `heatmap`, `scatterPlot` and `tooltip` were already complete.

- 5edf95b: `stackedArea` honours `numberFormat`, which it has always declared.

    The accessor came in from `ChartBaseAPI` with nothing behind it, so setting it did nothing at all. `getFormattedValue` is the line chart's equivalent function with one branch missing — line lets an explicit `numberFormat` override its integer/decimal choice, and stacked-area did not.

    It reaches both axes, as line's does: the y axis always, and the x axis when `xAxisValueType` is `'number'`.

    This closes the last disagreement between a chart's runtime surface and its typings, so `check:api-parity` now passes in both directions for all fourteen charts.

- 627bfa7: Upgraded the build from webpack 4.46 to webpack 5.111 across `core`, `wrappers` and `react` (`demos`' pin followed along for consistency, though its own build already ran through Storybook's bundled webpack 5). This supersedes #1044's "skip straight to Vite" plan with a smaller, lower-risk incremental step; #1044 stays open for the real ESM-output work (dropping the `src` entry from `exports`, retiring the publint/attw waivers) that motivated it, now decoupled from which bundler gets there.

    Alongside the version bump:
    - `optimize-css-assets-webpack-plugin` → `css-minimizer-webpack-plugin`, `webpack-fix-style-only-entries` → `webpack-remove-empty-scripts`, `uglifyjs-webpack-plugin` → `terser-webpack-plugin` (`react`'s prod bundle) — each package's own final release never shipped webpack 5 support.
    - `css-loader` 3 → 7 (`core`'s SCSS pipeline), with its loader options made explicit (`url: false, esModule: false`) now that the `?-url` query-string shorthand and the pre-v5 CommonJS-by-default output are both gone.
    - Dead code removed: `istanbul-instrumenter-loader`/`testConfig` in `core` and `wrappers` (unreachable — no script ever ran `webpack --env=test` for either), `copy-webpack-plugin` and `webpack-bundle-analyzer` wherever their only call site was already commented out, and `react-dev-utils`'s `WatchMissingNodeModulesPlugin` (no webpack-5-safe version exists; per Create React App's own migration, it mis-triggers rebuilds under webpack 5's filesystem cache). Losing the last one is a minor dev-UX change: the `start` dev server now needs a manual restart after installing a newly-required package, same as current CRA-based webpack 5 setups.
    - `scripts/patch-webpack4-md4.js` deleted, along with its `require()` at the top of every `webpack.config.js`. It shimmed `crypto.createHash` so webpack 4's hard-coded `md4` module-id hashing wouldn't hit `ERR_OSSL_EVP_UNSUPPORTED` on OpenSSL 3 (Node 17+); webpack 5.61+ hashes module ids without going through that code path at all, verified empirically package by package rather than assumed.

    Three breaking changes under the hood, found by actually running each build rather than from the webpack 5 migration guide alone:
    - `webpack-cli` 4+ normalizes a bare `--env=name` flag into `{ name: true, ... }` instead of passing `name` through as a string the way `webpack-cli` 3 did. Every package's `module.exports = (env) => {...}` dispatch now reads `env.name` instead of `env === 'name'`.
    - `devtool` is validated more strictly: `'cheap-module-eval-source-map'` (`react`'s dev config) no longer matches the accepted pattern — the `eval-` keyword has to lead, so it's `'eval-cheap-module-source-map'` now.
    - `externalsType` now defaults to `'var'`; `react`'s dev-server config has no `output.library` of its own (unlike the prod configs, which imply `'umd'`) to tell webpack otherwise, so its UMD-shaped `{ root, commonjs2, commonjs, amd }` externals values need an explicit `externalsType: 'umd'`.

    `webpack-dev-server` 3 → 6 (`react`'s `start` script, the only package that actually serves anything): `overlay` moved under `client`, and the top-level `stats` option moved to `devMiddleware.stats`.

    Verified package by package: `build`, `lint`, `test` and `demo:build` (Storybook) all green on all three packages, plus a manual smoke test of `react`'s dev server and the built CJS/UMD bundles. Bundle bytes will differ slightly from the minifier changes (Terser replacing UglifyJS, a newer `css-minimizer-webpack-plugin` preset) but nothing in the public API, export map, or bundle layout changes.

### Patch Changes

- 0d6a32e: Fixed the scatter plot's trendline starting at the wrong height.

    `calcLinearRegression` evaluated the line's left end at the _number of data points_ rather than at the smallest x: `y1` was `slope * n + intercept` where it should be `slope * minX + intercept`. The scatter plot draws the trendline from `(x1, y1)` to `(x2, y2)` with `x1` being `minX`, so whenever `minX` differed from the point count — which is almost always — the left end hung above or below the fitted line while the right end sat correctly on it. `y2` already used `maxX`, and that asymmetry is what made it visible.

    Only the trendline moves. Nothing else called this helper, and no other output changes.

- 8c5d63d: The scatter plot's zoom works. It has not run since the d3 v6 upgrade, and two separate defects were stacked behind each other.

    **The zoom handler kept d3 v5's signature.** It was written `updateChartAfterZoom(data, index, elements)` and read the transform with `zoomTransform(elements[0])`. d3-zoom v3 calls a listener with `(event, datum)` and no third argument, so `elements` was `undefined` and the first line threw a `TypeError` on the first zoom event. The handler now takes the event and reads `event.transform`, which is where v6 and later put it.

    **The highlight update then threw too.** `initHighlightComponents` binds the highlight circle to a single placeholder datum, so its attribute accessors always run, while `highlightPointData` is only set once a point has been hovered. Reading `.x` off it before the first hover threw. The update is guarded now: before anything is hovered there is no highlight to move.

    With both fixed, a zoom event rescales the axes and every data point as the feature always intended. `enableZoom` defaults to `false`, so nothing changes for a chart that does not ask for it.

    Four tests cover the path, which nothing did before: the pointer overlay appears only when zoom is enabled, a wheel event rescales every point and leaves none of them unset, and zooming before any hover does not throw. Reverting either fix fails two of them.

- 0d6a32e: Fixed the text-wrapping helper deriving one of its two offsets by string concatenation.

    `wrapText` reads the element's `y` with `attr('y')`, which returns a string, and then computes two offsets from it. `y - 5` subtracted numerically, but `y + smallTextOffset` _concatenated_: an element at `y="100"` produced a label positioned at `y="10010"` rather than `110`.

    No chart shipped today is affected — the only caller is the donut chart's centre text, which never sets `y`, so `null - 5` and `null + 10` both coerced to the right numbers. This matters for anyone calling the helper directly or wrapping text on an element that is positioned.

    The element's `dy` is still read with `parseFloat`, which is what handles the unit it normally carries: donut sets `.donut-text`'s to `.2em`. A `dy` that is absent entirely now falls back to `0` rather than `NaN`, which previously rendered as the string `"NaNem"` — reachable only from a direct caller, since donut always sets one.

## 3.0.0-beta.2

### Minor Changes

- c01aecb: Retargeted the build to ES2020 and dropped Babel from it (H26). The browserslist that drove ES5 down-levelling matched only `android 4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`, `samsung`) whose reported versions don't reflect real feature support; none of them are served ES2020 syntax correctly anyway, since caniuse can't attribute features to their version numbers reliably. Browsers below the new target need a bundler or their own polyfills/transpilation, same as any package that ships modern syntax.

    `@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel removed entirely (no JSX, nothing left for `preset-env` to transform). `@britecharts/wrappers`: same treatment, also Babel-free. `@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX, but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5 regardless of target) is gone.

    `core`'s `build:check` now actually runs (chained into `build`, where it had never been wired in) and checks against `es2020` instead of `es5`, with its paths fixed to the dist layout the monorepo has actually produced since the move to packages — they pointed at files from the pre-monorepo build.

## 3.0.0-beta.1

### Major Changes

- dca547e: Upgrade to the current d3 modules (the d3 v7 generation).

    - `d3-collection` and `d3-voronoi`, both deprecated upstream, are replaced by `d3-array`'s `groups`/`rollups` and `d3-delaunay`.
    - Event handling moves to the d3 v6 convention: handlers receive `(event, datum)`, and the ambient `d3.event`, `mouse()` and `touch()` are gone.
    - `d3-array`, `d3-color`, `d3-dispatch`, `d3-ease` and `d3-interpolate` were imported but never declared as dependencies; they now are.
    - Negative axis labels render with U+2212 MINUS SIGN rather than an ASCII hyphen, following d3-format's default. See the migration guide.

- 6ccba57: One tooltip component. `tooltip` renders a list (title and one row per topic) or a single value (title, name and a big value) by the shape of the data point it is given, or as told by the new `layout` accessor; `miniTooltip` is now that component with `layout('single')`, an empty title and `numberFormat('.2f')`, so it keeps working as it did and gains every tooltip accessor.

    **Breaking:** the line, stacked area, stacked bar and grouped bar charts dispatch `customMouseMove` with the same payload as every other chart: `(dataPoint, [x, y], [width, height], colorMap)` instead of `(dataPoint, colorMap, x, y)`. Wiring `chart.on('customMouseMove', tooltip.update)` is unaffected, and `tooltip.update` still accepts the old order (it warns once); a custom handler that reads the arguments by position has to take the new order. `tooltip.show()` accepts the data point and position the single-value charts dispatch on `customMouseOver`, and renders them at once. The typings merge: `MiniTooltipAPI` is `TooltipAPI`, `update` has both signatures, `TooltipDataShape` covers both shapes.

- c686d1a: Settles the public API of `@britecharts/core` for 3.0.0. The entry is `src/index.js`: the 14 charts, `colors`, and a new `constants` export so `constants.axisTimeCombinations.HOUR_DAY` can be written instead of the string (the same object every time-series chart already exposes as `chart.axisTimeCombinations`). `loadingStates` is no longer exported: it was the charts' internal loading-state markup, and the typings never declared it. The unused second entry, `src/charts/index.js`, is deleted; its helpers stay reachable through the `./src/*` export without a support promise. The default export (what `require()` and the CDN global `core` return) is unchanged apart from those two names.

    Also fixes the typing of `xAxisFormat` on the time-series charts: it took the whole `axisTimeCombinations` _object_ as its parameter and typed that object's values as the key names, so the documented call `chart.xAxisFormat(chart.axisTimeCombinations.HOUR_DAY)` never compiled. It now accepts an `AxisTimeCombination` member or its string value.

- dca547e: Define what each package publishes.

    - `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
    - `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.

- dca547e: Remove the line chart's `dataByTopic` data shape. The chart has accepted a flat `data` array since 2.10.1 and that is now the only shape it takes; passing `dataByTopic` throws. The migration guide shows both shapes side by side and includes a converter for existing data.
- 31144bd: Remove the Step chart.

    It is gone from all three packages rather than deprecated, so the breaking export change lands in this major. Removed: the `step` named export of `@britecharts/core` (and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`. The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js` and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and `react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no longer appear in the `britecharts.css` bundle. There is no drop-in replacement.

### Minor Changes

- fe6ce63: Add loading states to the bullet, heatmap and scatter plot charts.

    `isLoading` now covers every data chart in the library. These three were the only ones left without it, and they are exactly the three the community asked for: [#940](https://github.com/britecharts/britecharts/issues/940), [#942](https://github.com/britecharts/britecharts/issues/942) and [#943](https://github.com/britecharts/britecharts/issues/943).

    Each gets a skeleton in the shape of its own chart — a grid of boxes for the heatmap, scattered circles over an axis for the scatter plot, a range bar with a measure and a marker for the bullet — drawn with the same shimmer as the rest.

    The bullet chart draws its loading state before `cleanData()` rather than after: the state stands in for data that has not arrived, so it must not require a datum with `ranges`, `measures` and `markers` to exist first.

- 9f23f9e: Support negative values in the bar, grouped bar, stacked bar and brush charts.

    [#338](https://github.com/britecharts/britecharts/issues/338) — the second most-voted request, `help wanted` since 2019. Until now a negative datum threw (`<rect> attribute width: A negative value is not valid`) rather than degrading, because these four charts hardcoded a `[0, max]` domain and drew every mark from the edge of the range. The stacked bar went further and clamped negatives to zero outright, which also closes [#695](https://github.com/britecharts/britecharts/issues/695).

    Two new helpers in `charts/helpers/domain.js` carry the change: `getValueDomain()` builds a value domain that always contains zero, and `getBaselineExtent()` returns where a mark growing from that baseline starts and how long it is, so a negative value comes back on the other side with a positive size. The stacked bar additionally uses d3's `stackOffsetDiverging`, stacking positive segments up from zero and negative ones down.

    For data that is entirely non-negative the domain is the same `[0, max]` as before and `scale(0)` is still the edge of the range, so existing charts render byte-for-byte identically. `line`, `stacked-area` and `scatter-plot` already scaled from `min()`/`max()` and are unchanged. The donut chart remains the exception: a negative slice has no meaning there.

    Every chart that can take negative values now ships a `withNegativeValues()` data builder and a matching Storybook story.

### Patch Changes

- 494742e: The stacked bar and grouped bar charts dispatch their hover events (`customMouseOver`, `customMouseMove`, `customMouseOut`) only while the pointer is over a bar. They used to treat the whole band as hoverable, so the tooltip stayed up over the empty space above and between the bars, with nothing on the chart showing what it referred to. Entering a bar from that space is now a mouse over, and leaving the bars for it is a mouse out.
- b28c220: The grid helper now draws the axis baseline and the zero-line highlight itself. `gridHorizontal` and `gridVertical` gain `extendedLine(inset)` -- the solid line at the start of the scale's range that every chart drew by hand, inset by the room left for axis labels -- and `highlight(value)`, which adds `horizontal-grid-line--highlighted` (or the new `vertical-grid-line--highlighted`) to the grid line at that tick; the 2D `grid` gets `extendedLineH/V` and `highlightH/V`. Bar, grouped bar, stacked bar, scatter plot, line and stacked area use them in place of six copies of the same code, which also fixes two things: the baseline is now updated on every render instead of being drawn once and left stale after a resize, and the zero highlight is cleared again when the data stops crossing zero. The JSDoc types the helper documented as `*` are now named, and the H/V versus X/Y naming is written down. No visual change; the extended line moved from the grid group's parent into the grid group itself.
- dca547e: Fix the loading state animation. The shimmer was only present in the full `britecharts.css` bundle, so anyone following the documented modular setup — `common.css` plus a per-chart stylesheet — got a static skeleton that never animated. It now lives in `common.css`. The sparkline's skeleton was also missing an animation rule entirely; the selector now matches on the shared `load-state` class rather than enumerating each chart.
- 31144bd: Fix two bugs that broke tooltips and line markers.

    `SVGGeometryElement.pathLength` reflects the _attribute_ of that name — it is an `SVGAnimatedNumber`, never the computed length — so arithmetic on it yields `NaN` and comparisons are always false. Three places read it as if it were a number:

    - The line chart's `getPathYFromX` used it to seed a binary search, so every `getPointAtLength()` call failed and the y coordinate fell back to 0. Every highlight circle rendered at the top of the vertical marker rather than on its line.
    - The line chart's `findLongestPath` returned 0, making the draw-in animation a silent no-op.
    - The scatter plot's trend-line animation had the same no-op.

    All three now use `getTotalLength()`.

    Separately, `@britecharts/react`'s `Tooltip` re-rendered the chart it wraps with `data` alone on every update, dropping the `createTooltip`, `customMouseMove`, `customMouseOut` and `customMouseOver` callbacks the constructor passes. The first mouse interaction triggers an update, so the chart immediately lost the handlers that drive the tooltip and the tooltip element disappeared from the DOM. Both call sites now build the child chart through one method.

- 31144bd: Fix the d3 v6 event-signature leftovers that broke tooltips on the bar-family and stacked-area charts.

    `getMousePosition` in the stacked bar and grouped bar charts read `pointer(event, event)` — passing the event as its own container — and both call sites handed it the DOM node rather than the event. d3 then read `clientX` off something that is not an event, throwing `Failed to set the 'x' property on 'SVGPoint': The provided float value is non-finite` on the first mouse move over either chart. It now measures against the chart's svg root, which is the space `getNearestDataPoint` expects, and the callers pass the event they were given.

    `handleMouseMove` in the stacked area chart is called with `(this, d, event)` but declared only `(e)`, so `event` resolved to the deprecated global `window.event` instead of the handler's own argument. It now declares all three parameters, matching every other handler in that file.

- c564f18: The stylesheets' SCSS sources use the Sass module system: `@use` in place of `@import`, the palette pulled in as a namespaced module by each partial, and `color.adjust` in place of the deprecated `desaturate()`. The compiled CSS is identical, so nothing changes for anyone loading the built stylesheets; a project that compiles the `src/styles` sources itself can keep `@import`-ing them or switch to `@use`, and no longer sees Dart Sass's deprecation warnings from them.
- fe6ce63: Upgrade all three Storybooks from 6.5 to 8.6.14.

    8.6.14 is the last release with `@storybook/html-webpack5`; Storybook 10 offers only `@storybook/html-vite`, so going further means changing builder, not just version. That is deliberately left to the Vite migration.

    This is a dev-tooling change with one packaging consequence: the React package's own webpack build was silently using `html-webpack-plugin` hoisted out of Storybook 6's dependency tree, and never declared it. Removing Storybook 6 broke `yarn build:react` until it was declared properly.

- a2f4df2: The scatter plot's tooltip is anchored to the hovered point, in the chart's own coordinate space, so it sits beside the point and never covers it (#923); it used to be placed from root-svg coordinates and landed a margin's worth off. The tooltip's `xAxisValueType` gains `'category'`, which shows the key as it is, and `'auto'`, now the default, which shows a date as a date, a number as a number and anything else as it is, so a category key no longer titles the tooltip "NaN" (#825); `'date'` and `'number'` still force a type. When the data point has no field named by `dateLabel`, the title falls back to its `key` (what the stacked and grouped bar charts dispatch) or its `date`. A new `maxEntries` accessor (default 12) folds the rows past it into a "+n more" row, so a tooltip with many topics keeps a height that fits in the chart (#788). The stacked bar and grouped bar charts dispatch `customClick` only when a bar is clicked, and pass the clicked bar's own data as a third argument, after the column and the pointer position (#864).
- 494742e: Both tooltips share one animation: they fade in once when shown, fade out when hidden, and move and resize with one eased 200 ms chase. An update no longer touches the opacity, so a tooltip that is already showing does not blink while the pointer moves. The tooltip updates its rows in place, keyed by topic name, instead of rebuilding every text node on each move. Calling the tooltip on its container again (as the React and wrapper layers do on every update) no longer hides it, which was making the React tooltip fade in again on every pointer move.
- 31144bd: Fix the tooltip flickering and dead zones on the line, stacked area, stacked bar and grouped bar charts.

    Two problems, both in how the charts listen for the pointer.

    The stacked bar and grouped bar charts attached their tooltip listeners to `.chart-group`. A `<g>` has no geometry of its own, so it only receives events where its children are — the gaps between bars, and the empty space above short bars, were dead. v2 listened on the svg, and the line and stacked area charts still do; these two now match again. This also makes the listener node agree with the one `getMousePosition` measures against.

    All four charts used `mouseover`/`mouseout` to show and hide. Both bubble, so every crossing between children — from one stacked segment to the next, or from a bar into the gap beside it — fired a spurious `mouseout` and hid the tooltip, which is the flicker. They now use `mouseenter`/`mouseleave`, which do not bubble and do not fire while the pointer moves between descendants.

    The public `customMouseOver` and `customMouseOut` events are unchanged.

- 31144bd: Fix the tooltip rendering with `height="NaN"` when its text cannot be measured.

    `updateTopicContent` guards against `getBBox().height` returning 0 by falling back to the previous measurement, but `textHeight` had no initial value — so the first unmeasurable entry left it `undefined` and every height derived from it became `NaN`, which the browser rejects with `<rect> attribute height: Expected length, "NaN"`, once per topic per mouse move. A browser reports 0 whenever the node is not laid out, which includes the whole time the tooltip is still hidden, so this fired on the first hover of any chart using the full tooltip. `textHeight` now starts at one line of the 12px tooltip text and the guard only ever replaces it with a real measurement.

- 0e5120e: Both tooltips now keep themselves inside the chart. The tooltip and the mini tooltip share one positioning engine: the box goes beside the anchor (the hovered data point for the line, stacked area, stacked bar and grouped bar charts; the pointer for the bar, scatter plot and heatmap charts), flips to the other side when there is no room, and slides vertically so it is never cut off at an edge. The tooltip no longer places itself with fixed offsets and now follows the pointer vertically, so its `tooltipOffset` default is `{ x: 0, y: 0 }` (was `{ x: 0, y: -55 }` for the old fixed-top placement). The tooltip now follows the pointer with the same eased delay as the mini tooltip, and no longer wobbles when the pointer crosses closely spaced data points: the chart moves the tooltip's container to each data point instantly, and the tooltip now compensates for that move before easing, so the box stays put on screen and glides to its new place. The charts do not need to pass their size any more: the mini tooltip's third `update` argument is accepted and ignored. The line and stacked area charts now dispatch the pointer's y in the same coordinate space as the x they already dispatched.

    Neither tooltip catches pointer events any more. The mini tooltip used to sit between the pointer and the bar, box or point under it, so running into it ended the hover and, on the way back, `show()` left a tooltip reading `0.00` until the next move. `show()` now also accepts the data point and pointer position the charts dispatch on `customMouseOver`, and renders them at once; without arguments it shows no value rather than a zero. A fade still running from the previous update no longer reveals a tooltip before its content is right.

    The stacked bar and grouped bar tooltips follow the pointer, like every other chart's, instead of sitting at a fixed spot on the hovered bar (#1042). Their vertical anchor was also off by the difference between the bottom and top margins.

- b0aa041: Fixes found by compiling the published typings from a TypeScript consumer (the new `consumers/typescript` tier), plus an `exports` map on every package.

    - `@britecharts/react`'s typings imported `LocalObject` from `britecharts/src/typings/common/local` -- the unscoped v2 package name, so they never resolved. `LocalObject` is now exported from `@britecharts/core` and imported from there.
    - `@types/d3-selection` moves from core's devDependencies to its dependencies: the public typings import from `d3-selection`, so TypeScript consumers need those types whether or not they use d3 themselves.
    - `highlightBarFunction`'s callback was typed as returning `void | null` (the `null` belonged to the callback itself), so any function that returned the selection was rejected. `legend().clearHighlight()` had no return type, which is an error for consumers with `noImplicitAny`. `on()` handlers were typed `(...args: unknown[])`, which rejected every typed handler such as `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType` accepted `'nunber'`.
    - Each package now declares `exports`: `.` resolves types, the ES module entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*` and `./src/*` keep the deep paths working. For `@britecharts/react` every condition points at the UMD bundle because its `src/` contains JSX.

- 3b17605: Three consumer-side fixes found by the new integration tests.

    - `line` and `stacked-area` imported `touch` from `d3-selection`, which v3 no longer exports. webpack 4 let that through silently, but Rollup, Vite and esbuild fail the build of any project that imports `@britecharts/core` as ES modules. The import was unused and is gone.
    - The core and wrappers UMD builds (each package's `main`) were emitted with `window` as the global object, so `require()`-ing them in Node threw `ReferenceError: window is not defined`. They now use `this`, like the CDN and React builds already did.
    - `require('@britecharts/wrappers')` returned `undefined`: the UMD bundle was built with `libraryExport: 'default'` but `wrappers/src/index.js` only has named exports. The bundle now exposes the namespace, matching its CommonJS build.

- b71fe79: Publish what the `files` field promises. Yarn's packer (which `yarn release` uses) treated `dist/umd` as a pattern that matched nothing and ignored the `!` exclusions, so core would have shipped without its CSS, CDN and per-chart builds, react without its CommonJS builds, and all three with their spec and story files. The patterns now use `dist/umd/**` form, Yarn is bumped to 3.8.7 where the exclusions work, and each `build` cleans `dist/` itself because Yarn Berry never ran the `prebuild` hook (stale files were surviving into the tarball). The React library builds also no longer emit a stray `index.html`.
