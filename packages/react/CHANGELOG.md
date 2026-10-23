# @britecharts/react

## 3.0.0-beta.8

### Minor Changes

- a077b5b: Every chart but the legend now renders its data as a table that screen readers can read cell by cell. The table is visually hidden, placed right after the chart's svg and linked from it with `aria-details`, and captioned with the chart's name. Charts with several series lay it out wide, with a row per date or name and a column per series. It is on by default; turn it off with `a11yDataTable(false)` in core, `a11yDataTable: false` in a wrapper's configuration, or the `a11yDataTable` prop in React. The wrappers' `destroy` removes the table along with the svg.
- 6c83336: A keyboard can now move through the data points of the bar, donut, grouped bar, heatmap, line, scatter plot, stacked area and stacked bar charts. Each chart is one tab stop: the arrow keys move between points (up and down move a day on the heatmap), Home and End go to the first and last, and Escape lets go. The chart responds as it does to a pointer, so the point is highlighted, the tooltip follows focus, and `customMouseOver`, `customMouseMove` and `customMouseOut` fire. It is on by default; turn it off with `a11yKeyboardNavigation(false)` in core, `a11yKeyboardNavigation: false` in a wrapper's configuration, or the `a11yKeyboardNavigation` prop in React.
- 9f71b12: The stacked bar and stacked area charts can stack to 100%. `isNormalized(true)` scales every stack, or every date's areas, to fill the value axis, so each segment shows its share of the total, and the value axis reads from 0% to 100%. The tooltip still shows the values. React takes it as the `isNormalized` prop and the wrappers as a config key, and the chart schemas list it.
- ea6fc0c: Add the brush and heatmap charts to the wrappers and React, so every chart has both. `@britecharts/wrappers` exports `BrushWrapper` and `HeatmapWrapper`, and `@britecharts/react` exports `Brush` and `Heatmap`, with `BrushProps` and `HeatmapProps`. The brush takes `customBrushStart` and `customBrushEnd`, which join `britechartsCustomEvents` in both packages; the heatmap takes the mouse events and works with `Tooltip`.

### Patch Changes

- e7d1605: Each package declares its license, Apache-2.0, in `package.json`. npm showed none, so license checkers flagged the packages as unlicensed.
- 1dd2e5a: Each package ships the Apache 2.0 license text as `LICENSE.md`. The packages declared the license in `package.json`, but their tarballs carried no license file, which the license requires when redistributing.
- bd7235c: `Bar`, `Bullet`, `Donut` and `ScatterPlot` declare the `exportChart` prop, as the other chart components do. It already reached the chart, but TypeScript rejected it.
- f8c3fb2: Each package declares `sideEffects`, so bundlers can drop the charts an app doesn't import. Core lists its CSS, which only has an effect when imported; wrappers and react ship no CSS and declare `false`. The charts' `import 'd3-transition'` stays in a kept chart, since d3-transition declares its own side effects.
- Updated dependencies [a077b5b]
- Updated dependencies [8f38ac8]
- Updated dependencies [f854bb5]
- Updated dependencies [9f54337]
- Updated dependencies [184d795]
- Updated dependencies [c80e934]
- Updated dependencies [acccdcd]
- Updated dependencies [ca040a4]
- Updated dependencies [6c83336]
- Updated dependencies [816c483]
- Updated dependencies [e7d1605]
- Updated dependencies [1dd2e5a]
- Updated dependencies [9f71b12]
- Updated dependencies [d4700ff]
- Updated dependencies [ea6fc0c]
- Updated dependencies [f69c628]
- Updated dependencies [cccf0d0]
- Updated dependencies [6c83336]
- Updated dependencies [f8c3fb2]
- Updated dependencies [5257ab2]
- Updated dependencies [d8884e3]
- Updated dependencies [afb2052]
    - @britecharts/core@3.0.0-beta.8
    - @britecharts/wrappers@3.0.0-beta.8

## 3.0.0-beta.7

### Major Changes

- a26ccd2: The data-key accessors are removed from the bar, grouped bar, stacked bar, line, stacked area and sparkline charts: `nameLabel`, `valueLabel`, `groupLabel`, `stackLabel`, `dateLabel`, `topicLabel` and `keyLabel`. They let a chart read its data under other keys, and had warned that they were deprecated since version 2. Each chart now reads the keys its data shape names, such as `name` and `value` for the bar chart. The React `Bar`, `GroupedBar`, `StackedBar`, `Line`, `StackedArea` and `Sparkline` components drop the matching props. The tooltip keeps its own `dateLabel`, `nameLabel`, `topicLabel` and `valueLabel`, because it reads the data points of charts that use different keys.

### Patch Changes

- Updated dependencies [74c8087]
- Updated dependencies [a26ccd2]
- Updated dependencies [c34273d]
- Updated dependencies [4e05928]
    - @britecharts/core@3.0.0-beta.7
    - @britecharts/wrappers@3.0.0-beta.7

## 3.0.0-beta.6

### Major Changes

- 469d999: React publishes its UMD bundle only. The per-component files in `dist/umd/charts/` and `dist/cjs/charts/` are removed: import the components from the package (`import { Donut } from '@britecharts/react'`). The bundle is now built with Vite instead of webpack, with the same exports, and is 11% smaller.
- 8fb30f9: The bullet chart and the sparkline no longer draw a title. Text inside the
  svg cannot wrap, clips at the chart's edge and ignores the page's
  typography, so these charts now draw only the data.

    Removed: the bullet chart's `customTitle` and `customSubtitle` accessors and
    its `title` and `subtitle` data fields, and the sparkline's `titleText` and
    `titleTextStyle` accessors, along with the `SparklineTitleTextStyle` type
    and the matching React props. The bullet chart no longer reserves 100px on
    the left for its title, so the bars now span the full width. Label these
    charts in your own markup next to them, and set `a11yTitle` for screen
    readers. The migration guide's step 14 shows how.

- 7c0fb2a: The package is now an ES module package (`"type": "module"`), so `import` works in Node as well as in bundlers, with matching types under each condition. `require` still works and resolves to the CommonJS bundle, renamed from `.js` to `.cjs` (`dist/umd/bundle/react.bundled.min.cjs`). Update any deep path that named the old file.

### Minor Changes

- 321e44a: `Tooltip` infers its data type from its `data` prop and hands the same type to its `render` callback, so `render={(props) => <Line {...props} />}` type-checks without a cast or a second `data` prop. `TooltipProps` and `TooltipRenderArgs` take the data type as a parameter, defaulting to the union of every chart's data, so existing code compiles unchanged. `TooltipRenderArgs` and `TooltipData` are exported from the package.

### Patch Changes

- 54bbef1: Charts take their accessible name from an `aria-label` on the svg instead of a `<title>` element, which browsers showed as a tooltip when the pointer rested on the chart. Screen readers announce the same name; `a11yDescription` is still a `<desc>` linked with `aria-describedby`.
- 983526c: `Bullet` declares its `isLoading` prop, which it already passed to the chart. `Tooltip`'s `topicsOrder` is typed `Array<string | number>`, the same type written out, so Storybook can describe the prop.
- Updated dependencies [54bbef1]
- Updated dependencies [90dc62c]
- Updated dependencies [d62400b]
- Updated dependencies [a3852c2]
- Updated dependencies [2d27ae5]
- Updated dependencies [8fb30f9]
- Updated dependencies [983526c]
- Updated dependencies [daca322]
- Updated dependencies [7c0fb2a]
- Updated dependencies [7c0fb2a]
- Updated dependencies [469d999]
    - @britecharts/core@3.0.0-beta.6
    - @britecharts/wrappers@3.0.0-beta.6

## 3.0.0-beta.5

### Minor Changes

- 7d3dc2f: Charts announce themselves to screen readers. Every chart that draws its own
  svg gives it `role="img"`, a `<title>` and, when one is set, a `<desc>`,
  linked with `aria-labelledby` and `aria-describedby`. The legend takes
  `role="group"` instead, so its entries stay readable.

    Two new accessors set the text, on all twelve charts: `a11yTitle` (unset, the
    chart is announced by its type, such as "Bar chart") and `a11yDescription`
    (unset, there is none). Both getters read `null` until set. The wrappers take
    them as configuration, and the ten React chart components as `a11yTitle` and
    `a11yDescription` props.

### Patch Changes

- Updated dependencies [7d3dc2f]
    - @britecharts/core@3.0.0-beta.5
    - @britecharts/wrappers@3.0.0-beta.5

## 3.0.0-beta.4

### Minor Changes

- b8fcb88: Seven settings the core charts have always had are now props:

    | Component     | New props                                                  |
    | ------------- | ---------------------------------------------------------- |
    | `Line`        | `lines`, `shouldShowAllDataPoints`, `hasMinimumValueScale` |
    | `StackedArea` | `hasOutline`, `xAxisScale`, `xAxisValueType`               |
    | `Donut`       | `hasCenterLegend`                                          |

    Each is passed straight to the chart's accessor of the same name, so it behaves as it does in `@britecharts/core`. `lines` takes core's `CustomLine[]`, and the stacked area's axis props take core's `StackedAreaXAxisScale` and `StackedAreaXAxisValueType`. Nothing existing changes.

### Patch Changes

- 3632ad4: `prop-types` is no longer a peer dependency. The components dropped their PropTypes when they moved to TypeScript, and nothing in the package imports it any more, so a consumer no longer has to install it. The UMD bundle's `prop-types` external goes with it.
- Updated dependencies [a51fd98]
- Updated dependencies [8759296]
- Updated dependencies [054a4bd]
    - @britecharts/core@3.0.0-beta.4
    - @britecharts/wrappers@3.0.0-beta.4

## 3.0.0-beta.3

### Major Changes

- fe68bbe: `axisTimeCombinations` is no longer a prop. It was never usable as one.

    Stacked area, line and tooltip each declared it, and each also **exports the constants beside the component** — `export const axisTimeCombinations` — which is the real feature and stays. The prop was the same name in the wrong place.

    Passing it got further than the stacked bar's phantom prop before failing, which is why it survived: the chart genuinely has an `axisTimeCombinations` key, so the wrapper's `validateConfiguration` guard is satisfied. But that key is a constant object, not an accessor, so `applyConfiguration` then called it — `chart.axisTimeCombinations(value)` — and threw a `TypeError`. Both steps are pinned by a probe against the real chart and the real helpers.

    Use the module's export with `xAxisFormat`, which is what the charts' own examples show: `xAxisFormat(axisTimeCombinations.HOUR_DAY)`.

    Also on stacked area: **`xAxisFormat` was `string`**, where core declares the four granularities plus `'custom'`. Any string compiled and only five values did anything.

- fe68bbe: Every component in `@britecharts/react` is TypeScript, and their declared props match what the charts accept.

    Converting a component makes its props checkable against core for the first time: they flow into the wrapper's `WrapperConfiguration<TChart>`, so a prop whose type contradicts the chart's accessor, or that names no accessor at all, stops compiling. Nothing compared those two sides before — `check:api-parity` reads core against core's own typings, and this package's structural specs never looked at a type. Across the eleven components it found this:

    **Eleven label props were `number`.** `nameLabel`, `valueLabel`, `topicLabel`, `dateLabel` and `keyLabel`, on bar, grouped bar, stacked bar, stacked area and line, are the key names a chart reads its data under. The correct call was a type error, and the PropTypes said `number` too, so it also warned in development.

    **Two props could never work, and are removed.** `nameLabelFormat` on stacked bar named a chart feature that does not exist — passing it threw `Method not supported by Britechart`. `axisTimeCombinations`, on stacked area, line and tooltip, got further before failing: the chart has a key by that name, so the wrapper's guard passed, but it is a constant object rather than an accessor, so applying it threw a `TypeError`. Each of those three components also _exports_ the constants under that name, which is the real feature and stays.

    **`exportChart` works now.** Four components declared it a callback and sparkline alone had it right: it is the filename the chart's export command takes. Setting it exports a png, through the command channel the wrappers package grew for this.

    **Six props were `string` where only a few values do anything**: five `grid` props, all missing the `null` that is the default and the way a grid is turned off, and line's `xAxisScale` and `xAxisValueType`. That last pair is how `'numeric'` type-checked and did nothing, which this migration corrected in core and which the component now rejects.

    **Every bare `Function` is a signature.** Twenty-eight custom-event props across seven components are `ChartEventHandler`, the type the wrappers package publishes and registers them through — `Function` carries no call signature, so no handler satisfied it. The callbacks core declares properly — `highlightBarFunction`, two `orderingFunction`s, `centeredTextFunction`, `valueFormatter`, tooltip's `render` — say what they receive and return.

    **Tooltip's three commands are each a different shape**: `hide` is a trigger (`boolean`), `show` takes the data point, `update` takes the first argument of the signature a configuration can reach. All three were callbacks. Legend's `clearHighlight` was the same mistake, and `highlight` now type-checks for the first time.

    **Six data shapes were structural copies** of core's and now import them, so there is one definition each. Legend's had both fields' optionality backwards: `name` optional though it renders for every entry, `quantity` required though the component supports data without it.

    **Four props were `any` or undeclared**: two `emptyDataConfig`s, and `createTooltip` was missing from bullet, donut and legend though each destructures it — so a consumer using Tooltip's render prop could not pass it from TypeScript.

    PropTypes are gone from all eleven, so they no longer warn in development; the props are checked at build time instead. Each component declares them in its own file, which is what Storybook's docgen reads, so the Controls and their descriptions are unchanged — asserted in CI rather than assumed.

    **Breaking**, type-only except for the two removed props: code relying on any of the wrong types no longer compiles.

- fe68bbe: `@britecharts/react` builds an ESM entry instead of shipping its source.

    `module` resolved to `src/index.js` and the package ships `src/**`, so the published ESM entry _was_ the authored source. That is fine while every file is JavaScript and breaks the moment one is not: a consumer's bundler would be handed TypeScript it was never asked to compile. Core shipped exactly that in #1083 and no tier caught it, because Vite resolves `.js` to `.ts` and transpiles while the require tier only exercises the UMD bundle.

    Babel now transpiles `src/` into `dist/esm` preserving the module structure, and **`module` and `exports.import` both point there**. `exports.import` used to serve the UMD bundle, which works but hands an ESM consumer a CommonJS wrapper and nothing to tree-shake.

    `types` is unchanged: it still resolves to the hand-written `src/typings/index.d.ts`, exactly as core's does, because the generated declarations land in a later phase.

    **Breaking** for anyone resolving this package's ESM entry to `src/` on purpose — a deep `./src/*` import still works, and `require` is untouched. Verified against the packed tarball by walking the module graph from `module`: every relative specifier resolves inside `dist/esm`, with no extension guessing and no `.ts` in the graph.

- 3cf0b12: `@britecharts/react`'s type declarations are now generated from the components. `types` and `exports["."].types` resolve to `dist/esm/index.d.ts`, beside the ESM build, and the hand-written `src/typings/` is gone.

    Each component already declared its props in its own file, where Storybook's docgen reads them, and an assertion in every component kept that interface equal to the hand-written copy. With the copy gone, the assertions go too: the props a consumer compiles against are the ones the component is written with.

    **Breaking:** deep imports from `@britecharts/react/src/typings/...` no longer resolve. Import the components and their props from the package root.

    The surface is otherwise unchanged. Every component is still declared as `FunctionComponent<Props>`, so it works with any `@types/react` the peer range allows, and all twelve props types compare identical to the published ones. Four exports are new to the declarations, though not to the package: `britechartsCustomEvents`, `axisTimeCombinations` and their types `BritechartsCustomEvent` and `AxisTimeCombinationValue` have always been exported at run time and were never declared.

- fe68bbe: `<StackedBar nameLabelFormat={...} />` is gone. It threw.

    The prop was declared in the component's PropTypes and in its published `.d.ts`, and **no chart has an accessor by that name** — not the stacked bar, not any of the other thirteen. So a consumer who passed it got the wrapper's own guard: `Method not supported by Britechart: nameLabelFormat`, thrown before anything was drawn.

    Removed rather than implemented, because there is nothing behind it: unlike `exportChart`, which is a real command the prop was merely mistyped against, this names a chart feature that does not exist. Nothing in the repo passed it, and it could not have worked for anyone who tried.

    Found by the conversion. The rest props now flow into `WrapperConfiguration<StackedBarChartModule>`, where a key the chart has no member for is `never` — so the component stopped compiling until the phantom was gone.

### Minor Changes

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

- fe68bbe: The package's helpers are TypeScript: `useChart`, `optimizedResize`, `responsiveContainer`, `withResponsiveness`, the constants and the barrel.

    No public type changes. `useChart` is typed against the `Wrapper` and `WrapperConfiguration` types the wrappers package publishes rather than a parallel shape of react's own, so the two tiers cannot drift, and `withResponsiveness` implements its already-published generic rather than being given a new one.

    The constants are `as const` now, so `xAxisFormat(axisTimeCombinations.HOUR_DAY)` hands over the literal the charts compare against rather than `string` — which is what makes the corrected `xAxisFormat` prop usable.

- Updated dependencies [4efdab3]
- Updated dependencies [8c5d63d]
- Updated dependencies [b3a6d3e]
- Updated dependencies [b3a6d3e]
- Updated dependencies [b3a6d3e]
- Updated dependencies [92c178c]
- Updated dependencies [19cec87]
- Updated dependencies [a933bf6]
- Updated dependencies [4efdab3]
- Updated dependencies [3cf0b12]
- Updated dependencies [90ca0d4]
- Updated dependencies [b3a6d3e]
- Updated dependencies [fe68bbe]
- Updated dependencies [8c5d63d]
- Updated dependencies [4efdab3]
- Updated dependencies [b3a6d3e]
- Updated dependencies [8c5d63d]
- Updated dependencies [d853655]
- Updated dependencies [8c5d63d]
- Updated dependencies [0d6a32e]
- Updated dependencies [8c5d63d]
- Updated dependencies [ce4a559]
- Updated dependencies [b3a6d3e]
- Updated dependencies [ce4a559]
- Updated dependencies [8c5d63d]
- Updated dependencies [5edf95b]
- Updated dependencies [8c5d63d]
- Updated dependencies [0d6a32e]
- Updated dependencies [8c5d63d]
- Updated dependencies [8c5d63d]
- Updated dependencies [627bfa7]
- Updated dependencies [fe68bbe]
- Updated dependencies [d853655]
    - @britecharts/core@3.0.0-beta.3
    - @britecharts/wrappers@3.0.0-beta.3

## 3.0.0-beta.2

### Minor Changes

- c01aecb: Retargeted the build to ES2020 and dropped Babel from it (H26). The browserslist that drove ES5 down-levelling matched only `android 4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`, `samsung`) whose reported versions don't reflect real feature support; none of them are served ES2020 syntax correctly anyway, since caniuse can't attribute features to their version numbers reliably. Browsers below the new target need a bundler or their own polyfills/transpilation, same as any package that ships modern syntax.

    `@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel removed entirely (no JSX, nothing left for `preset-env` to transform). `@britecharts/wrappers`: same treatment, also Babel-free. `@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX, but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5 regardless of target) is gone.

    `core`'s `build:check` now actually runs (chained into `build`, where it had never been wired in) and checks against `es2020` instead of `es5`, with its paths fixed to the dist layout the monorepo has actually produced since the move to packages — they pointed at files from the pre-monorepo build.

### Patch Changes

- Updated dependencies [c01aecb]
    - @britecharts/core@3.0.0-beta.2
    - @britecharts/wrappers@3.0.0-beta.2

## 3.0.0-beta.1

### Major Changes

- dca547e: Define what each package publishes.

    - `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
    - `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.

- f6c738d: `Bar`, `GroupedBar` and `ScatterPlot` are now function components on the shared hook, like `Line` and `Donut`, with the same breaking changes: there is no component instance any more (a `ref` on them is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array or object). The chart is created as soon as its data arrives, and not while `data` is `null`.
- f6c738d: `Bullet` is now a function component on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on it is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (a consumer who mutates their data in place has to pass a new array or object). It also gains the `createTooltip` propType the other charts declare, so Storybook's Controls panel matches theirs.
- 878c6e6: `Donut` is now a function component too, on the same shared hook as `Line`, with the same breaking changes: there is no `Donut` instance any more (a `ref` on `<Donut />` is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array). `isAnimated` still defaults to `true`, and `createTooltip`, which a `Tooltip` hands to the chart it wraps, is still not passed on to the chart.
- f6c738d: `Legend` is now a function component on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on it is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (a consumer who mutates their data in place has to pass a new array or object). Its lifecycle already matched the other charts (it waits for its data), and it still never asks for a tooltip.
- 878c6e6: `Line` is now a function component that draws through hooks, the first of the React components to move off classes.

    **Breaking:**

    - `peerDependencies` for `react` and `react-dom` move from `>=15` to `>=16.8`, the first release with hooks. A React 15 or early 16 app will fail at runtime with no warning otherwise.
    - There is no `Line` instance any more: a `ref` on `<Line />` used to give the component instance, and now is not accepted (the typings say so).
    - **A re-render whose props did not change no longer redraws the chart.** `Line` used to call the chart's `update` on every render; it now compares the data and each configuration value with the last drawing (`Object.is`, field by field) and skips the update when nothing changed. A consumer who mutates their data array in place and re-renders with the same reference gets no redraw and has to pass a new array or object.

    Also: the chart is created as soon as its data arrives, whichever render that is, and is not created while `data` is `null`. Previously a render without data tried to create it and threw. `destroy` runs with the node the chart was created in.

- f6c738d: Fixes the resize registry behind `ResponsiveContainer` and `withResponsiveness`, and converts both to function components. **The bug:** the first container to unmount ended resizing for every other container still on the page, and for every container mounted afterwards, because the registry stopped listening to the window but never forgot its callbacks. Each container now removes only its own callback, the window is listened to for as long as at least one is registered, and it is listened to again by the next one. The registry's unused `add()` and `clearAll()` are gone; `addHorizontal()` and the new `remove()` are its whole surface. `<ResponsiveContainer />` no longer throws without a `render` prop. `withResponsiveness(Component)` now returns a memoised function component instead of a class: there is no instance to reach with a `ref`, and a parent re-rendering with the same props still costs nothing.
- f6c738d: `Sparkline`, `StackedArea` and `StackedBar` are now function components on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on them is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array or object). The chart is created as soon as its data arrives, and not while `data` is `null`.
- f6c738d: `Tooltip` is now a function component, the last of the stateful ones to move off classes. Its state lives in `useState`, and the tooltip is drawn once the chart it wraps has drawn itself, then follows every render. There is no component instance any more (a `ref` on it is not accepted, and the typings say so). Unlike the charts it does not compare props to skip an update: the pointer moving is a state change and must always reposition the tooltip. The chart it wraps is still rebuilt only when the `Tooltip`'s own props change, never on a pointer move.
- 6ccba57: **Breaking:** the `Tooltip` component's `customMouseMove` callback receives what the chart dispatches: `(dataPoint, [x, y], [width, height], topicColorMap)` instead of `(dataPoint, topicColorMap, x, y)`. `Tooltip` now works for the single-value charts too: wrap a `Bar` (or a scatter plot or heatmap) in it and it shows the hovered element's name and value, as the core mini tooltip does; the `layout` prop forces `'list'` or `'single'` when the data's shape should not decide. The typings follow.
- 31144bd: Remove the Step chart.

    It is gone from all three packages rather than deprecated, so the breaking export change lands in this major. Removed: the `step` named export of `@britecharts/core` (and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`. The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js` and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and `react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no longer appear in the `britecharts.css` bundle. There is no drop-in replacement.

- ca8f61f: `false`, `0` and `''` now reach the chart. The wrappers used to skip any configuration value that was falsy, so a chart could never have a setting turned back off: `isLoading={false}` could not end a loading state, and `isAnimated={false}`, `isHorizontal={false}` and `maxEntries={0}` were ignored too. Only `undefined` and `null` mean "not set" now, and the chart keeps its own default for them.

    Charts that were relying on a falsy value being ignored will change: a `false`, `0` or `''` that used to leave the chart's default in place now overrides it. Pass `undefined` (or leave the prop out) to keep the default. Event handlers (`customMouseOver`, ...) are unchanged: a falsy handler is still not registered.

### Minor Changes

- 958a49b: Adds the scatter plot to the wrappers and React packages: `ScatterPlotWrapper` in `@britecharts/wrappers` and a `ScatterPlot` component in `@britecharts/react`, with every accessor of the core chart as a prop, its typings, and Storybook stories for the default, trendline, tooltip, cross hairs, negative values and loading cases. Wrap it in `Tooltip` to get the hovered point's value.
- 9eaab2b: The typings now say what the components do. Every chart's `data` is declared `T | null`: it is required, and `null` means the data has not arrived yet, so nothing is drawn until it does. Leaving `data` out, or passing `undefined`, throws at runtime, and is now a type error too. `ResponsiveContainer` and `withResponsiveness`, which were exported but had no typings at all, are typed: the container hands its `render` prop the measured `{ width }`, and the wrapper takes over the `width` prop of what it wraps.

### Patch Changes

- e79b7d3: Fix the React Storybook preview crashing on load.

    `.storybook/main.js` adds a babel-loader rule so Storybook's nested React preset does not leave JSX unparsed. It was scoped with `exclude: /node_modules/`, which also swept in `storybook-stories.js` — the entry module Storybook generates at the root of the package. That entry is `async`, this package's babel config sets `forceAllTransforms`, and nothing loads `regeneratorRuntime`, so the preview died with `ReferenceError: regeneratorRuntime is not defined` before a single story rendered. The rule is now scoped by `include` to this package's own sources.

- 31144bd: Fix two bugs that broke tooltips and line markers.

    `SVGGeometryElement.pathLength` reflects the _attribute_ of that name — it is an `SVGAnimatedNumber`, never the computed length — so arithmetic on it yields `NaN` and comparisons are always false. Three places read it as if it were a number:

    - The line chart's `getPathYFromX` used it to seed a binary search, so every `getPointAtLength()` call failed and the y coordinate fell back to 0. Every highlight circle rendered at the top of the vertical marker rather than on its line.
    - The line chart's `findLongestPath` returned 0, making the draw-in animation a silent no-op.
    - The scatter plot's trend-line animation had the same no-op.

    All three now use `getTotalLength()`.

    Separately, `@britecharts/react`'s `Tooltip` re-rendered the chart it wraps with `data` alone on every update, dropping the `createTooltip`, `customMouseMove`, `customMouseOut` and `customMouseOver` callbacks the constructor passes. The first mouse interaction triggers an update, so the chart immediately lost the handlers that drive the tooltip and the tooltip element disappeared from the DOM. Both call sites now build the child chart through one method.

- 7b216e8: Two fixes found by the new React 19 consumer in the integration tests.

    - The UMD bundle (`dist/umd/bundle/react.bundled.min.js`, the package `main`) carried its own copy of React 16 because that build never applied the externals the per-component builds use. Under React 17+ the bundled React's elements are rejected at render time (React 19 error 525) and nothing draws. `react`, `react-dom` and `prop-types` are now externals there too (the bundled copy was React itself, not react-dom, so the bundle only shrinks by about 8 KB; the point is correctness, not size).
    - The per-component builds (`dist/umd/charts/*.js`, `dist/cjs/charts/*.js`) exported `{ default: Component }` where core's per-chart builds export the module directly. Bundlers that follow Node's CommonJS interop (Vite 8 among them) then handed `import Donut from '…/Donut.js'` an object, and React refused to render it (error 130). The module is now the component, and the README documents it.

- 95e0363: `Legend` now waits for its data like every other chart. `<Legend data={null} />` used to throw `Cannot read properties of undefined (reading 'filter')`; it now draws nothing until `data` is set, then draws the chart. `data` is no longer marked required in the propTypes, so passing `null` while the data loads no longer logs a prop-type warning.
- 9eaab2b: The package's ES module entry named every component's file with its `.js` extension except `Sparkline`, which is now spelled the same way. A bundler or Node resolver that does not add the extension for you could not follow that one export.
- a2f4df2: The `Tooltip` component's `xAxisValueType` prop accepts `'auto'` (the default) and `'category'` besides `'date'` and `'number'`, and a `maxEntries` prop caps the rows shown; both in the typings too.
- 0e5120e: The `Tooltip` component no longer adds a new tooltip to the chart on every pointer move or prop change. The wrapped chart asks for the tooltip again after each of its own updates, and the component now creates one only when the chart does not hold one already. The wrapped chart is also rebuilt only when the `Tooltip`'s props change, so a pointer move no longer redraws the chart underneath.
- 95e0363: Fixes three components that passed props on to the chart wrapper that the wrapper rejects. `Tooltip`'s documented `customMouseMove`, `customMouseOut` and `customMouseOver` props no longer throw `chart.on is not a function`: they are the component's own callbacks and no longer reach the tooltip. `Donut` and `Legend` now drop the `createTooltip` prop a `Tooltip` hands its child chart, so `<Tooltip render={(props) => <Donut {...props} />} />` renders instead of throwing `Method not supported by Britechart: createTooltip`.
- fe6ce63: Upgrade all three Storybooks from 6.5 to 8.6.14.

    8.6.14 is the last release with `@storybook/html-webpack5`; Storybook 10 offers only `@storybook/html-vite`, so going further means changing builder, not just version. That is deliberately left to the Vite migration.

    This is a dev-tooling change with one packaging consequence: the React package's own webpack build was silently using `html-webpack-plugin` hoisted out of Storybook 6's dependency tree, and never declared it. Removing Storybook 6 broke `yarn build:react` until it was declared properly.

- b0aa041: Fixes found by compiling the published typings from a TypeScript consumer (the new `consumers/typescript` tier), plus an `exports` map on every package.

    - `@britecharts/react`'s typings imported `LocalObject` from `britecharts/src/typings/common/local` -- the unscoped v2 package name, so they never resolved. `LocalObject` is now exported from `@britecharts/core` and imported from there.
    - `@types/d3-selection` moves from core's devDependencies to its dependencies: the public typings import from `d3-selection`, so TypeScript consumers need those types whether or not they use d3 themselves.
    - `highlightBarFunction`'s callback was typed as returning `void | null` (the `null` belonged to the callback itself), so any function that returned the selection was rejected. `legend().clearHighlight()` had no return type, which is an error for consumers with `noImplicitAny`. `on()` handlers were typed `(...args: unknown[])`, which rejected every typed handler such as `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType` accepted `'nunber'`.
    - Each package now declares `exports`: `.` resolves types, the ES module entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*` and `./src/*` keep the deep paths working. For `@britecharts/react` every condition points at the UMD bundle because its `src/` contains JSX.

- 95e0363: `destroy()` now removes the chart. Every chart wrapper's `destroy(el)` used to do nothing, so a second `create` on the same container drew a second `svg` next to the first: React 18+ StrictMode does exactly that to every component in development, leaving two charts on the page. It now removes the chart's own `svg` from the container, and only that: never the container itself, which React owns. `TooltipWrapper.destroy` removes the tooltip from inside the element and never an `svg`, since the tooltip is created inside the chart it decorates and destroyed against the element around it. The React components call it when they unmount.
- b71fe79: Publish what the `files` field promises. Yarn's packer (which `yarn release` uses) treated `dist/umd` as a pattern that matched nothing and ignored the `!` exclusions, so core would have shipped without its CSS, CDN and per-chart builds, react without its CommonJS builds, and all three with their spec and story files. The patterns now use `dist/umd/**` form, Yarn is bumped to 3.8.7 where the exclusions work, and each `build` cleans `dist/` itself because Yarn Berry never ran the `prebuild` hook (stale files were surviving into the tarball). The React library builds also no longer emit a stray `index.html`.
- Updated dependencies [494742e]
- Updated dependencies [dca547e]
- Updated dependencies [b28c220]
- Updated dependencies [dca547e]
- Updated dependencies [fe6ce63]
- Updated dependencies [9f23f9e]
- Updated dependencies [6ccba57]
- Updated dependencies [31144bd]
- Updated dependencies [31144bd]
- Updated dependencies [c686d1a]
- Updated dependencies [dca547e]
- Updated dependencies [958a49b]
- Updated dependencies [dca547e]
- Updated dependencies [31144bd]
- Updated dependencies [c564f18]
- Updated dependencies [fe6ce63]
- Updated dependencies [a2f4df2]
- Updated dependencies [494742e]
- Updated dependencies [31144bd]
- Updated dependencies [31144bd]
- Updated dependencies [0e5120e]
- Updated dependencies [b0aa041]
- Updated dependencies [3b17605]
- Updated dependencies [95e0363]
- Updated dependencies [ca8f61f]
- Updated dependencies [b71fe79]
    - @britecharts/core@3.0.0-beta.1
    - @britecharts/wrappers@3.0.0-beta.1 0.6.4 0.6.3 0.6.2 0.6.1 0.6.0 0.5.1

---

- Fixes responsive container and responsive HOC

    0.5.0

---

Features

- Updates dependencies
- Updates React version to 16
- Added click handlers on Donut

Fixes

- Moved setRef to the class constructor

    0.4.1

---

Features

- Changing loading states of stacked area and step charts
- Updating Readme
- Updating Britecharts version to 2.8.0 and fixing tests
- Updating meta tags and logo
- Implemented Sparkline chart
- Adds donut + legend demo

Fixes

- Allow setChartProperty to handle empty string values
- Added correct twitter link and fixed alignment of imgs
- Updating props of Donut and Bar charts
- Updating props of Legend, Line and Grouped bar charts
- Updating props of StackedArea, StackedBar, Step and Tooltip
- Removing validateData helper
- Updating paths to work on github pages
- Updates authors and tags in package.json
- Fix boolean proptypes for Donut

    0.4.0

---

Features

- Changing bundle from commonjs into umd
- Adds Step component with Plop workflow, and fixes bugs preventing documentation from rendering properly
- Switches custom css to responsive chart, per Bar.js
- Auto-generated component boilerplate with Plop
- Adds StackedBar component, tests and Readme for same
- Grouped Bar Charts

Fixes

- Fixing proptypes naming on Donut chart
- Updating issue and PR templates
- Fixed links in demos to charts and corrected demos local port
- Fix docs update

    0.3.32, 0.3.31, 0.3.30

---

- Fix loading state styles
- Fixes legend chart test
- Updating dependencies
- Fixes loading states style/bugs and adds them to demos
- Adding google analytics tracking
- Updating fixtures to use a valid date format

    0.3.29

---

- Switches -> in (leftover change from pull request
- Updating readme with test project
- Adds esm modules with babel-cli

    0.3.28

---

- Add loading states
- Copying Britecharts styles over
- Updating docs and renaming charts by removing 'component' from the name
- Adding badges and hiding introduction header
- Featured img update
- Cleaning demo thumbnails stuff
- Adds a set of thumbnails of our charts at the top of the readme file
- Fix Linechart demos and update docs

    0.3.27

---

- Retrieving old yarn.lock

    0.3.26

---

- Removing d3-selection from externals

    0.3.25

---

- Adding CommonJS target on lib folder
- Updating demos and hacking fix for responsive container
- Adds simple github link in docs homepage

    0.3.24

---

- Upgrade to latest britecharts
- Fix tooltip not rendering the first data item due to falsy number check

    0.3.23 0.3.22 0.3.21 0.3.20 0.3.19 0.3.18 0.3.17 0.3.16 0.3.15 0.3.14 0.3.13 0.3.12 0.3.11 0.3.10 0.3.9 0.3.8 0.3.7 0.3.6 0.3.5 0.3.4 0.3.3 0.3.2 0.3.1 0.3.0

    0.2.4

---

Fixes:

- Bumped Britecharts to 2.4.1 with new fixes

    0.2.1

---

Features:

- Updating Legend and Tooltip prototypes

    0.2.0

    0.1.13 - 0.1.17 - Debugging

---

Features:

- Changed minification strategy
- Commonjs target

    0.1.12 0.1.11 0.1.10 0.1.9 0.1.8 0.1.7 0.1.5 0.1.4 0.1.3 0.1.2 0.1.1 0.1.0 0.0.3
