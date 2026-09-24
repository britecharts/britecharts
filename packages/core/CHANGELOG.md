# @britecharts/core

## 3.0.0-beta.2

### Minor Changes

-   c01aecb: Retargeted the build to ES2020 and dropped Babel from it (H26). The browserslist that drove ES5 down-levelling matched only `android 4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`, `samsung`) whose reported versions don't reflect real feature support; none of them are served ES2020 syntax correctly anyway, since caniuse can't attribute features to their version numbers reliably. Browsers below the new target need a bundler or their own polyfills/transpilation, same as any package that ships modern syntax.

    `@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel removed entirely (no JSX, nothing left for `preset-env` to transform). `@britecharts/wrappers`: same treatment, also Babel-free. `@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX, but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5 regardless of target) is gone.

    `core`'s `build:check` now actually runs (chained into `build`, where it had never been wired in) and checks against `es2020` instead of `es5`, with its paths fixed to the dist layout the monorepo has actually produced since the move to packages — they pointed at files from the pre-monorepo build.

## 3.0.0-beta.1

### Major Changes

-   dca547e: Upgrade to the current d3 modules (the d3 v7 generation).

    -   `d3-collection` and `d3-voronoi`, both deprecated upstream, are replaced by `d3-array`'s `groups`/`rollups` and `d3-delaunay`.
    -   Event handling moves to the d3 v6 convention: handlers receive `(event, datum)`, and the ambient `d3.event`, `mouse()` and `touch()` are gone.
    -   `d3-array`, `d3-color`, `d3-dispatch`, `d3-ease` and `d3-interpolate` were imported but never declared as dependencies; they now are.
    -   Negative axis labels render with U+2212 MINUS SIGN rather than an ASCII hyphen, following d3-format's default. See the migration guide.

-   6ccba57: One tooltip component. `tooltip` renders a list (title and one row per topic) or a single value (title, name and a big value) by the shape of the data point it is given, or as told by the new `layout` accessor; `miniTooltip` is now that component with `layout('single')`, an empty title and `numberFormat('.2f')`, so it keeps working as it did and gains every tooltip accessor.

    **Breaking:** the line, stacked area, stacked bar and grouped bar charts dispatch `customMouseMove` with the same payload as every other chart: `(dataPoint, [x, y], [width, height], colorMap)` instead of `(dataPoint, colorMap, x, y)`. Wiring `chart.on('customMouseMove', tooltip.update)` is unaffected, and `tooltip.update` still accepts the old order (it warns once); a custom handler that reads the arguments by position has to take the new order. `tooltip.show()` accepts the data point and position the single-value charts dispatch on `customMouseOver`, and renders them at once. The typings merge: `MiniTooltipAPI` is `TooltipAPI`, `update` has both signatures, `TooltipDataShape` covers both shapes.

-   c686d1a: Settles the public API of `@britecharts/core` for 3.0.0. The entry is `src/index.js`: the 14 charts, `colors`, and a new `constants` export so `constants.axisTimeCombinations.HOUR_DAY` can be written instead of the string (the same object every time-series chart already exposes as `chart.axisTimeCombinations`). `loadingStates` is no longer exported: it was the charts' internal loading-state markup, and the typings never declared it. The unused second entry, `src/charts/index.js`, is deleted; its helpers stay reachable through the `./src/*` export without a support promise. The default export (what `require()` and the CDN global `core` return) is unchanged apart from those two names.

    Also fixes the typing of `xAxisFormat` on the time-series charts: it took the whole `axisTimeCombinations` _object_ as its parameter and typed that object's values as the key names, so the documented call `chart.xAxisFormat(chart.axisTimeCombinations.HOUR_DAY)` never compiled. It now accepts an `AxisTimeCombination` member or its string value.

-   dca547e: Define what each package publishes.

    -   `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
    -   `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.

-   dca547e: Remove the line chart's `dataByTopic` data shape. The chart has accepted a flat `data` array since 2.10.1 and that is now the only shape it takes; passing `dataByTopic` throws. The migration guide shows both shapes side by side and includes a converter for existing data.
-   31144bd: Remove the Step chart.

    It is gone from all three packages rather than deprecated, so the breaking export change lands in this major. Removed: the `step` named export of `@britecharts/core` (and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`. The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js` and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and `react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no longer appear in the `britecharts.css` bundle. There is no drop-in replacement.

### Minor Changes

-   fe6ce63: Add loading states to the bullet, heatmap and scatter plot charts.

    `isLoading` now covers every data chart in the library. These three were the only ones left without it, and they are exactly the three the community asked for: [#940](https://github.com/britecharts/britecharts/issues/940), [#942](https://github.com/britecharts/britecharts/issues/942) and [#943](https://github.com/britecharts/britecharts/issues/943).

    Each gets a skeleton in the shape of its own chart — a grid of boxes for the heatmap, scattered circles over an axis for the scatter plot, a range bar with a measure and a marker for the bullet — drawn with the same shimmer as the rest.

    The bullet chart draws its loading state before `cleanData()` rather than after: the state stands in for data that has not arrived, so it must not require a datum with `ranges`, `measures` and `markers` to exist first.

-   9f23f9e: Support negative values in the bar, grouped bar, stacked bar and brush charts.

    [#338](https://github.com/britecharts/britecharts/issues/338) — the second most-voted request, `help wanted` since 2019. Until now a negative datum threw (`<rect> attribute width: A negative value is not valid`) rather than degrading, because these four charts hardcoded a `[0, max]` domain and drew every mark from the edge of the range. The stacked bar went further and clamped negatives to zero outright, which also closes [#695](https://github.com/britecharts/britecharts/issues/695).

    Two new helpers in `charts/helpers/domain.js` carry the change: `getValueDomain()` builds a value domain that always contains zero, and `getBaselineExtent()` returns where a mark growing from that baseline starts and how long it is, so a negative value comes back on the other side with a positive size. The stacked bar additionally uses d3's `stackOffsetDiverging`, stacking positive segments up from zero and negative ones down.

    For data that is entirely non-negative the domain is the same `[0, max]` as before and `scale(0)` is still the edge of the range, so existing charts render byte-for-byte identically. `line`, `stacked-area` and `scatter-plot` already scaled from `min()`/`max()` and are unchanged. The donut chart remains the exception: a negative slice has no meaning there.

    Every chart that can take negative values now ships a `withNegativeValues()` data builder and a matching Storybook story.

### Patch Changes

-   494742e: The stacked bar and grouped bar charts dispatch their hover events (`customMouseOver`, `customMouseMove`, `customMouseOut`) only while the pointer is over a bar. They used to treat the whole band as hoverable, so the tooltip stayed up over the empty space above and between the bars, with nothing on the chart showing what it referred to. Entering a bar from that space is now a mouse over, and leaving the bars for it is a mouse out.
-   b28c220: The grid helper now draws the axis baseline and the zero-line highlight itself. `gridHorizontal` and `gridVertical` gain `extendedLine(inset)` -- the solid line at the start of the scale's range that every chart drew by hand, inset by the room left for axis labels -- and `highlight(value)`, which adds `horizontal-grid-line--highlighted` (or the new `vertical-grid-line--highlighted`) to the grid line at that tick; the 2D `grid` gets `extendedLineH/V` and `highlightH/V`. Bar, grouped bar, stacked bar, scatter plot, line and stacked area use them in place of six copies of the same code, which also fixes two things: the baseline is now updated on every render instead of being drawn once and left stale after a resize, and the zero highlight is cleared again when the data stops crossing zero. The JSDoc types the helper documented as `*` are now named, and the H/V versus X/Y naming is written down. No visual change; the extended line moved from the grid group's parent into the grid group itself.
-   dca547e: Fix the loading state animation. The shimmer was only present in the full `britecharts.css` bundle, so anyone following the documented modular setup — `common.css` plus a per-chart stylesheet — got a static skeleton that never animated. It now lives in `common.css`. The sparkline's skeleton was also missing an animation rule entirely; the selector now matches on the shared `load-state` class rather than enumerating each chart.
-   31144bd: Fix two bugs that broke tooltips and line markers.

    `SVGGeometryElement.pathLength` reflects the _attribute_ of that name — it is an `SVGAnimatedNumber`, never the computed length — so arithmetic on it yields `NaN` and comparisons are always false. Three places read it as if it were a number:

    -   The line chart's `getPathYFromX` used it to seed a binary search, so every `getPointAtLength()` call failed and the y coordinate fell back to 0. Every highlight circle rendered at the top of the vertical marker rather than on its line.
    -   The line chart's `findLongestPath` returned 0, making the draw-in animation a silent no-op.
    -   The scatter plot's trend-line animation had the same no-op.

    All three now use `getTotalLength()`.

    Separately, `@britecharts/react`'s `Tooltip` re-rendered the chart it wraps with `data` alone on every update, dropping the `createTooltip`, `customMouseMove`, `customMouseOut` and `customMouseOver` callbacks the constructor passes. The first mouse interaction triggers an update, so the chart immediately lost the handlers that drive the tooltip and the tooltip element disappeared from the DOM. Both call sites now build the child chart through one method.

-   31144bd: Fix the d3 v6 event-signature leftovers that broke tooltips on the bar-family and stacked-area charts.

    `getMousePosition` in the stacked bar and grouped bar charts read `pointer(event, event)` — passing the event as its own container — and both call sites handed it the DOM node rather than the event. d3 then read `clientX` off something that is not an event, throwing `Failed to set the 'x' property on 'SVGPoint': The provided float value is non-finite` on the first mouse move over either chart. It now measures against the chart's svg root, which is the space `getNearestDataPoint` expects, and the callers pass the event they were given.

    `handleMouseMove` in the stacked area chart is called with `(this, d, event)` but declared only `(e)`, so `event` resolved to the deprecated global `window.event` instead of the handler's own argument. It now declares all three parameters, matching every other handler in that file.

-   c564f18: The stylesheets' SCSS sources use the Sass module system: `@use` in place of `@import`, the palette pulled in as a namespaced module by each partial, and `color.adjust` in place of the deprecated `desaturate()`. The compiled CSS is identical, so nothing changes for anyone loading the built stylesheets; a project that compiles the `src/styles` sources itself can keep `@import`-ing them or switch to `@use`, and no longer sees Dart Sass's deprecation warnings from them.
-   fe6ce63: Upgrade all three Storybooks from 6.5 to 8.6.14.

    8.6.14 is the last release with `@storybook/html-webpack5`; Storybook 10 offers only `@storybook/html-vite`, so going further means changing builder, not just version. That is deliberately left to the Vite migration.

    This is a dev-tooling change with one packaging consequence: the React package's own webpack build was silently using `html-webpack-plugin` hoisted out of Storybook 6's dependency tree, and never declared it. Removing Storybook 6 broke `yarn build:react` until it was declared properly.

-   a2f4df2: The scatter plot's tooltip is anchored to the hovered point, in the chart's own coordinate space, so it sits beside the point and never covers it (#923); it used to be placed from root-svg coordinates and landed a margin's worth off. The tooltip's `xAxisValueType` gains `'category'`, which shows the key as it is, and `'auto'`, now the default, which shows a date as a date, a number as a number and anything else as it is, so a category key no longer titles the tooltip "NaN" (#825); `'date'` and `'number'` still force a type. When the data point has no field named by `dateLabel`, the title falls back to its `key` (what the stacked and grouped bar charts dispatch) or its `date`. A new `maxEntries` accessor (default 12) folds the rows past it into a "+n more" row, so a tooltip with many topics keeps a height that fits in the chart (#788). The stacked bar and grouped bar charts dispatch `customClick` only when a bar is clicked, and pass the clicked bar's own data as a third argument, after the column and the pointer position (#864).
-   494742e: Both tooltips share one animation: they fade in once when shown, fade out when hidden, and move and resize with one eased 200 ms chase. An update no longer touches the opacity, so a tooltip that is already showing does not blink while the pointer moves. The tooltip updates its rows in place, keyed by topic name, instead of rebuilding every text node on each move. Calling the tooltip on its container again (as the React and wrapper layers do on every update) no longer hides it, which was making the React tooltip fade in again on every pointer move.
-   31144bd: Fix the tooltip flickering and dead zones on the line, stacked area, stacked bar and grouped bar charts.

    Two problems, both in how the charts listen for the pointer.

    The stacked bar and grouped bar charts attached their tooltip listeners to `.chart-group`. A `<g>` has no geometry of its own, so it only receives events where its children are — the gaps between bars, and the empty space above short bars, were dead. v2 listened on the svg, and the line and stacked area charts still do; these two now match again. This also makes the listener node agree with the one `getMousePosition` measures against.

    All four charts used `mouseover`/`mouseout` to show and hide. Both bubble, so every crossing between children — from one stacked segment to the next, or from a bar into the gap beside it — fired a spurious `mouseout` and hid the tooltip, which is the flicker. They now use `mouseenter`/`mouseleave`, which do not bubble and do not fire while the pointer moves between descendants.

    The public `customMouseOver` and `customMouseOut` events are unchanged.

-   31144bd: Fix the tooltip rendering with `height="NaN"` when its text cannot be measured.

    `updateTopicContent` guards against `getBBox().height` returning 0 by falling back to the previous measurement, but `textHeight` had no initial value — so the first unmeasurable entry left it `undefined` and every height derived from it became `NaN`, which the browser rejects with `<rect> attribute height: Expected length, "NaN"`, once per topic per mouse move. A browser reports 0 whenever the node is not laid out, which includes the whole time the tooltip is still hidden, so this fired on the first hover of any chart using the full tooltip. `textHeight` now starts at one line of the 12px tooltip text and the guard only ever replaces it with a real measurement.

-   0e5120e: Both tooltips now keep themselves inside the chart. The tooltip and the mini tooltip share one positioning engine: the box goes beside the anchor (the hovered data point for the line, stacked area, stacked bar and grouped bar charts; the pointer for the bar, scatter plot and heatmap charts), flips to the other side when there is no room, and slides vertically so it is never cut off at an edge. The tooltip no longer places itself with fixed offsets and now follows the pointer vertically, so its `tooltipOffset` default is `{ x: 0, y: 0 }` (was `{ x: 0, y: -55 }` for the old fixed-top placement). The tooltip now follows the pointer with the same eased delay as the mini tooltip, and no longer wobbles when the pointer crosses closely spaced data points: the chart moves the tooltip's container to each data point instantly, and the tooltip now compensates for that move before easing, so the box stays put on screen and glides to its new place. The charts do not need to pass their size any more: the mini tooltip's third `update` argument is accepted and ignored. The line and stacked area charts now dispatch the pointer's y in the same coordinate space as the x they already dispatched.

    Neither tooltip catches pointer events any more. The mini tooltip used to sit between the pointer and the bar, box or point under it, so running into it ended the hover and, on the way back, `show()` left a tooltip reading `0.00` until the next move. `show()` now also accepts the data point and pointer position the charts dispatch on `customMouseOver`, and renders them at once; without arguments it shows no value rather than a zero. A fade still running from the previous update no longer reveals a tooltip before its content is right.

    The stacked bar and grouped bar tooltips follow the pointer, like every other chart's, instead of sitting at a fixed spot on the hovered bar (#1042). Their vertical anchor was also off by the difference between the bottom and top margins.

-   b0aa041: Fixes found by compiling the published typings from a TypeScript consumer (the new `consumers/typescript` tier), plus an `exports` map on every package.

    -   `@britecharts/react`'s typings imported `LocalObject` from `britecharts/src/typings/common/local` -- the unscoped v2 package name, so they never resolved. `LocalObject` is now exported from `@britecharts/core` and imported from there.
    -   `@types/d3-selection` moves from core's devDependencies to its dependencies: the public typings import from `d3-selection`, so TypeScript consumers need those types whether or not they use d3 themselves.
    -   `highlightBarFunction`'s callback was typed as returning `void | null` (the `null` belonged to the callback itself), so any function that returned the selection was rejected. `legend().clearHighlight()` had no return type, which is an error for consumers with `noImplicitAny`. `on()` handlers were typed `(...args: unknown[])`, which rejected every typed handler such as `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType` accepted `'nunber'`.
    -   Each package now declares `exports`: `.` resolves types, the ES module entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*` and `./src/*` keep the deep paths working. For `@britecharts/react` every condition points at the UMD bundle because its `src/` contains JSX.

-   3b17605: Three consumer-side fixes found by the new integration tests.

    -   `line` and `stacked-area` imported `touch` from `d3-selection`, which v3 no longer exports. webpack 4 let that through silently, but Rollup, Vite and esbuild fail the build of any project that imports `@britecharts/core` as ES modules. The import was unused and is gone.
    -   The core and wrappers UMD builds (each package's `main`) were emitted with `window` as the global object, so `require()`-ing them in Node threw `ReferenceError: window is not defined`. They now use `this`, like the CDN and React builds already did.
    -   `require('@britecharts/wrappers')` returned `undefined`: the UMD bundle was built with `libraryExport: 'default'` but `wrappers/src/index.js` only has named exports. The bundle now exposes the namespace, matching its CommonJS build.

-   b71fe79: Publish what the `files` field promises. Yarn's packer (which `yarn release` uses) treated `dist/umd` as a pattern that matched nothing and ignored the `!` exclusions, so core would have shipped without its CSS, CDN and per-chart builds, react without its CommonJS builds, and all three with their spec and story files. The patterns now use `dist/umd/**` form, Yarn is bumped to 3.8.7 where the exclusions work, and each `build` cleans `dist/` itself because Yarn Berry never ran the `prebuild` hook (stale files were surviving into the tarball). The React library builds also no longer emit a stray `index.html`.
