# @britecharts/wrappers

## 3.0.0-beta.8

### Minor Changes

- 184d795: Add a JSON Schema for each chart's spec, `{ chart, config, data }`, and check configuration values in the wrappers. The schemas are generated from the TypeScript types the wrappers take, published at `https://britecharts.github.io/britecharts/schema/v3/<chart>.json` and shipped as `@britecharts/wrappers/schemas/<chart>.json`, so editors and coding agents can check a spec before drawing it. `create` and `update` now also throw on a value of the wrong type, naming the type it should be, such as `height: expected a number, got the string "300"`, alongside the existing check for keys a chart doesn't have. `undefined` and `null` values are still skipped.
- ea6fc0c: Add the brush and heatmap charts to the wrappers and React, so every chart has both. `@britecharts/wrappers` exports `BrushWrapper` and `HeatmapWrapper`, and `@britecharts/react` exports `Brush` and `Heatmap`, with `BrushProps` and `HeatmapProps`. The brush takes `customBrushStart` and `customBrushEnd`, which join `britechartsCustomEvents` in both packages; the heatmap takes the mouse events and works with `Tooltip`.
- afb2052: A configuration key the chart has no accessor for still throws `Method not supported by Britechart: <keys>`, and the message now goes on to help fix it. For each key that looks like a typo or a miscased name, it suggests the accessor or event that was meant (`heigth: did you mean height?`), and it links the chart's API page. A missing container's error now says to pass an element that exists in the document.

### Patch Changes

- a077b5b: Every chart but the legend now renders its data as a table that screen readers can read cell by cell. The table is visually hidden, placed right after the chart's svg and linked from it with `aria-details`, and captioned with the chart's name. Charts with several series lay it out wide, with a row per date or name and a column per series. It is on by default; turn it off with `a11yDataTable(false)` in core, `a11yDataTable: false` in a wrapper's configuration, or the `a11yDataTable` prop in React. The wrappers' `destroy` removes the table along with the svg.
- f854bb5: `BrushWrapper` and `HeatmapWrapper` link their API page when given an unknown configuration key, as the other wrappers do.
- 937683e: A bullet's `markers` can hold any number of values, as the chart already draws one line for each. The `BulletChartDataShape` type allowed one at most, so TypeScript rejected a bullet with two markers, and the wrappers' bullet schema rejected it too.
- a38e8ea: The heatmap takes `xAxisLabels`, to match `yAxisLabels`: one label per column, from the first. With both sets, each box's `day` and `hour` index the labels, so a heatmap can show any two sets of categories, such as a square grid that compares six categories with each other. The columns, the keyboard navigation and the data table follow the labels' count. Without them, the columns stay the 24 hours of the day. Set it with `xAxisLabels([...])` in core, `xAxisLabels` in a wrapper's configuration, or the `xAxisLabels` prop in React.

    The day labels now end just left of the boxes rather than start 30px left of them, so a longer label grows into the left margin instead of over the first column. Both axes' labels share one look: 12px, in the muted text colour, a little darker than the days were.

    The labels' classes name rows and columns rather than days and hours, since they no longer have to be either: `.day-label` is now `.row-label`, `.hour-label` is `.column-label`, and their groups are `.row-labels-group` and `.column-labels-group`. Update any CSS or test that selects the old names.

- e7d1605: Each package declares its license, Apache-2.0, in `package.json`. npm showed none, so license checkers flagged the packages as unlicensed.
- 1dd2e5a: Each package ships the Apache 2.0 license text as `LICENSE.md`. The packages declared the license in `package.json`, but their tarballs carried no license file, which the license requires when redistributing.
- 9f71b12: The stacked bar and stacked area charts can stack to 100%. `isNormalized(true)` scales every stack, or every date's areas, to fill the value axis, so each segment shows its share of the total, and the value axis reads from 0% to 100%. The tooltip still shows the values. React takes it as the `isNormalized` prop and the wrappers as a config key, and the chart schemas list it.
- 6c83336: The chart schemas list `a11yDataTable` and `a11yKeyboardNavigation`.
- f8c3fb2: Each package declares `sideEffects`, so bundlers can drop the charts an app doesn't import. Core lists its CSS, which only has an effect when imported; wrappers and react ship no CSS and declare `false`. The charts' `import 'd3-transition'` stays in a kept chart, since d3-transition declares its own side effects.
- Updated dependencies [a077b5b]
- Updated dependencies [8f38ac8]
- Updated dependencies [9f54337]
- Updated dependencies [937683e]
- Updated dependencies [c80e934]
- Updated dependencies [acccdcd]
- Updated dependencies [ca040a4]
- Updated dependencies [a38e8ea]
- Updated dependencies [6c83336]
- Updated dependencies [816c483]
- Updated dependencies [e7d1605]
- Updated dependencies [1dd2e5a]
- Updated dependencies [9f71b12]
- Updated dependencies [d4700ff]
- Updated dependencies [f69c628]
- Updated dependencies [cccf0d0]
- Updated dependencies [f8c3fb2]
- Updated dependencies [5257ab2]
- Updated dependencies [d8884e3]
    - @britecharts/core@3.0.0-beta.8

## 3.0.0-beta.7

### Patch Changes

- Updated dependencies [74c8087]
- Updated dependencies [a26ccd2]
- Updated dependencies [c34273d]
- Updated dependencies [4e05928]
    - @britecharts/core@3.0.0-beta.7

## 3.0.0-beta.6

### Major Changes

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

- 7c0fb2a: The package is now an ES module package (`"type": "module"`), so `import` works in Node as well as in bundlers, with matching types under each condition. `require` still works and resolves to the CommonJS bundle, renamed from `.js` to `.cjs` (`dist/umd/bundle/wrappers.bundled.min.cjs` and `dist/cjs/bundle/wrappers.bundled.min.cjs`). Update any deep path that named the old file.
- 469d999: Wrappers publishes its UMD and CommonJS bundles only. The per-chart UMD files in `dist/umd/charts/` are removed: import the wrappers from the package (`import { BarWrapper } from '@britecharts/wrappers'`), or use the bundle's `wrappers` global. The bundles are now built with Vite instead of webpack, with the same exports.

### Patch Changes

- Updated dependencies [54bbef1]
- Updated dependencies [90dc62c]
- Updated dependencies [d62400b]
- Updated dependencies [a3852c2]
- Updated dependencies [2d27ae5]
- Updated dependencies [8fb30f9]
- Updated dependencies [983526c]
- Updated dependencies [daca322]
- Updated dependencies [7c0fb2a]
    - @britecharts/core@3.0.0-beta.6

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

## 3.0.0-beta.4

### Major Changes

- 054a4bd: Every wrapper's `update` now keeps what the chart is showing when it is given no data: an empty array, `null` or `undefined`.

    `barChart`, `donutChart` and `scatterPlotChart` used to treat an empty array as new data, so `update(el, [], configuration, chart)` bound `[]` and redrew the chart empty, dropping what it had drawn. The other seven wrappers kept the data they had, and all ten already did for `null` and `undefined`. These three now do the same, so the wrappers agree.

    **Breaking** for a consumer who cleared a bar, donut or scatter plot by updating it with `[]`: the chart now keeps its data. To remove a chart, call `destroy(el)`. To show it as loading, pass `isLoading: true` in the configuration.

### Patch Changes

- Updated dependencies [a51fd98]
- Updated dependencies [8759296]
    - @britecharts/core@3.0.0-beta.4

## 3.0.0-beta.3

### Major Changes

- d853655: `@britecharts/wrappers` now ships a built ESM entry point at `dist/esm/` with generated type declarations, instead of serving authored source from `src/`. `module`, `exports["."].import` and the new `types` field all resolve there.

    **Why this had to happen now.** The TypeScript migration converts `src/` one file at a time, and the barrel keeps its `.js` import specifiers throughout (`export { default as BulletWrapper } from './charts/bullet/bulletChart.js'` pointing at `bulletChart.ts`). That works in this repo because the webpack build sets `resolve.extensionAlias`. It does not work for consumers, who were being handed TypeScript on the package's ESM entry path and expected to compile it:

    - Vite 8 happens to resolve `.js` → `.ts` and transpile it, so it looked fine.
    - webpack 5.111 appeared to work too, but only because **Node 26's experimental strip-only type stripping** was doing the transform. Adding an `enum` to a shipped file fails with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX: TypeScript enum is not supported in strip-only mode`. Any consumer not on a Node with `--experimental-strip-types` behaviour, or any file using an `enum`, decorator or namespace, breaks outright.

    Verified by building a plain webpack 5 consumer against the packed tarball, with no TypeScript loader and no `extensionAlias`: the module graph now contains only `dist/esm/**/*.js` and no `.ts` at all.

    **Breaking:** deep imports of converted files via the published `./src/*` subpath no longer resolve — `@britecharts/wrappers/src/charts/bullet/bulletChart.js` is `bulletChart.ts` on disk now. `src/**` still ships, so deep imports of the wrappers that are still JavaScript keep working, but that set shrinks with each conversion. Import from the package root instead.

    **New:** the package declares `types` for the first time, so `Wrapper<TData, TChart>`, `WrapperConfiguration<TChart>`, `ChartConfiguration<TChart>` and `ChartContainer` are reachable for consumers. `arethetypeswrong` runs against this package for the first time as a result, and passes.

    Alongside it:

    - `files` excluded `**/*.spec.js` but not `**/*.spec.ts`, so `bulletChart.spec.ts`, `configuration.spec.ts` and `destroy.spec.ts` were shipping in the published tarball. The guard meant to catch that — `COMMON_DENY` in `packages/integration/tests/tarball.test.js` — had the identical `.js`-only blind spot, which is why it went unnoticed. Both now spell out the TypeScript extensions.
    - `packages/integration`'s TypeScript consumer gained `src/charts/draw.ts`, which draws every chart through `selection.call(chart)`. Nothing there had ever done that, and the gap had already let a real defect ship in core's published typings. It also gained `src/wrappers/bullet.ts`, exercising the newly published wrapper declarations.
    - The tarball test now asserts `dist/esm` ships, and its `src/charts/*/*` assertion no longer hard-codes `.js` — spelled that way it kept passing by coincidence after the first conversion, counting ten matches where one was no longer the file being checked.
    - `jest.config.base.js` gained a `moduleNameMapper` that drops `.js` off relative specifiers, jest's missing counterpart to webpack's `resolve.extensionAlias`. Without it every react spec broke at once, since they all reach wrappers through its source barrel.

    Still outstanding, and still #1044's: `dist/esm/*.js` is ESM syntax in a package without `"type": "module"`, so the `FILE_INVALID_FORMAT` / `UnexpectedModuleSyntax` waivers stay. Adding a nested `dist/esm/package.json` was tried and rejected for now — it makes the ESM output genuinely ESM but then serves ESM declarations to the `require` condition, which resolves to the CommonJS UMD bundle, and `attw` correctly reports `FalseESM`. Fixing it properly needs per-condition types and a `.d.cts` build, which is a change of its own.

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

- fe68bbe: A wrapper's configuration carries the chart's **commands** as well as its accessors.

    `ChartConfiguration<TChart>` read each member as an accessor — `(value?) => chart` — and mapped everything else to `never`. A command does not have that shape: legend's `highlight(id)` and a chart's `exportChart(filename, title)` take a required argument and return void. So `legendChart.create(el, data, { highlight: 3 })` was a type error, while `applyConfiguration` called it perfectly well. `highlight` has always worked at run time and has never type-checked.

    Each key now contributes its accessor's value type, or, when it has none, the argument its command is called with. The two are chosen per key rather than intersected: intersecting `{ highlight?: never }` with `{ highlight?: number }` gives `never`, so a channel added that way would reject the props it exists to allow.

    A command's argument is still checked — `{ highlight: 'three' }` is an error — and only the first argument is reachable, which is all a single configuration value can carry.

### Patch Changes

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
    - @britecharts/core@3.0.0-beta.3

## 3.0.0-beta.2

### Minor Changes

- c01aecb: Retargeted the build to ES2020 and dropped Babel from it (H26). The browserslist that drove ES5 down-levelling matched only `android 4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`, `samsung`) whose reported versions don't reflect real feature support; none of them are served ES2020 syntax correctly anyway, since caniuse can't attribute features to their version numbers reliably. Browsers below the new target need a bundler or their own polyfills/transpilation, same as any package that ships modern syntax.

    `@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel removed entirely (no JSX, nothing left for `preset-env` to transform). `@britecharts/wrappers`: same treatment, also Babel-free. `@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX, but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5 regardless of target) is gone.

    `core`'s `build:check` now actually runs (chained into `build`, where it had never been wired in) and checks against `es2020` instead of `es5`, with its paths fixed to the dist layout the monorepo has actually produced since the move to packages — they pointed at files from the pre-monorepo build.

### Patch Changes

- Updated dependencies [c01aecb]
    - @britecharts/core@3.0.0-beta.2

## 3.0.0-beta.1

### Major Changes

- dca547e: Upgrade to the current d3 modules (the d3 v7 generation).

    - `d3-collection` and `d3-voronoi`, both deprecated upstream, are replaced by `d3-array`'s `groups`/`rollups` and `d3-delaunay`.
    - Event handling moves to the d3 v6 convention: handlers receive `(event, datum)`, and the ambient `d3.event`, `mouse()` and `touch()` are gone.
    - `d3-array`, `d3-color`, `d3-dispatch`, `d3-ease` and `d3-interpolate` were imported but never declared as dependencies; they now are.
    - Negative axis labels render with U+2212 MINUS SIGN rather than an ASCII hyphen, following d3-format's default. See the migration guide.

- dca547e: Define what each package publishes.

    - `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
    - `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.

- dca547e: Remove the line chart's `dataByTopic` data shape. The chart has accepted a flat `data` array since 2.10.1 and that is now the only shape it takes; passing `dataByTopic` throws. The migration guide shows both shapes side by side and includes a converter for existing data.
- 31144bd: Remove the Step chart.

    It is gone from all three packages rather than deprecated, so the breaking export change lands in this major. Removed: the `step` named export of `@britecharts/core` (and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`. The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js` and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and `react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no longer appear in the `britecharts.css` bundle. There is no drop-in replacement.

- ca8f61f: `false`, `0` and `''` now reach the chart. The wrappers used to skip any configuration value that was falsy, so a chart could never have a setting turned back off: `isLoading={false}` could not end a loading state, and `isAnimated={false}`, `isHorizontal={false}` and `maxEntries={0}` were ignored too. Only `undefined` and `null` mean "not set" now, and the chart keeps its own default for them.

    Charts that were relying on a falsy value being ignored will change: a `false`, `0` or `''` that used to leave the chart's default in place now overrides it. Pass `undefined` (or leave the prop out) to keep the default. Event handlers (`customMouseOver`, ...) are unchanged: a falsy handler is still not registered.

### Minor Changes

- 958a49b: Adds the scatter plot to the wrappers and React packages: `ScatterPlotWrapper` in `@britecharts/wrappers` and a `ScatterPlot` component in `@britecharts/react`, with every accessor of the core chart as a prop, its typings, and Storybook stories for the default, trendline, tooltip, cross hairs, negative values and loading cases. Wrap it in `Tooltip` to get the hovered point's value.

### Patch Changes

- b0aa041: Fixes found by compiling the published typings from a TypeScript consumer (the new `consumers/typescript` tier), plus an `exports` map on every package.

    - `@britecharts/react`'s typings imported `LocalObject` from `britecharts/src/typings/common/local` -- the unscoped v2 package name, so they never resolved. `LocalObject` is now exported from `@britecharts/core` and imported from there.
    - `@types/d3-selection` moves from core's devDependencies to its dependencies: the public typings import from `d3-selection`, so TypeScript consumers need those types whether or not they use d3 themselves.
    - `highlightBarFunction`'s callback was typed as returning `void | null` (the `null` belonged to the callback itself), so any function that returned the selection was rejected. `legend().clearHighlight()` had no return type, which is an error for consumers with `noImplicitAny`. `on()` handlers were typed `(...args: unknown[])`, which rejected every typed handler such as `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType` accepted `'nunber'`.
    - Each package now declares `exports`: `.` resolves types, the ES module entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*` and `./src/*` keep the deep paths working. For `@britecharts/react` every condition points at the UMD bundle because its `src/` contains JSX.

- 3b17605: Three consumer-side fixes found by the new integration tests.

    - `line` and `stacked-area` imported `touch` from `d3-selection`, which v3 no longer exports. webpack 4 let that through silently, but Rollup, Vite and esbuild fail the build of any project that imports `@britecharts/core` as ES modules. The import was unused and is gone.
    - The core and wrappers UMD builds (each package's `main`) were emitted with `window` as the global object, so `require()`-ing them in Node threw `ReferenceError: window is not defined`. They now use `this`, like the CDN and React builds already did.
    - `require('@britecharts/wrappers')` returned `undefined`: the UMD bundle was built with `libraryExport: 'default'` but `wrappers/src/index.js` only has named exports. The bundle now exposes the namespace, matching its CommonJS build.

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
- Updated dependencies [b71fe79]
    - @britecharts/core@3.0.0-beta.1
