# @britecharts/wrappers

## 3.0.0-beta.2

### Minor Changes

-   c01aecb: Retargeted the build to ES2020 and dropped Babel from it (H26). The browserslist that drove ES5 down-levelling matched only `android 4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`, `samsung`) whose reported versions don't reflect real feature support; none of them are served ES2020 syntax correctly anyway, since caniuse can't attribute features to their version numbers reliably. Browsers below the new target need a bundler or their own polyfills/transpilation, same as any package that ships modern syntax.

    `@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel removed entirely (no JSX, nothing left for `preset-env` to transform). `@britecharts/wrappers`: same treatment, also Babel-free. `@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX, but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5 regardless of target) is gone.

    `core`'s `build:check` now actually runs (chained into `build`, where it had never been wired in) and checks against `es2020` instead of `es5`, with its paths fixed to the dist layout the monorepo has actually produced since the move to packages — they pointed at files from the pre-monorepo build.

### Patch Changes

-   Updated dependencies [c01aecb]
    -   @britecharts/core@3.0.0-beta.2

## 3.0.0-beta.1

### Major Changes

-   dca547e: Upgrade to the current d3 modules (the d3 v7 generation).

    -   `d3-collection` and `d3-voronoi`, both deprecated upstream, are replaced by `d3-array`'s `groups`/`rollups` and `d3-delaunay`.
    -   Event handling moves to the d3 v6 convention: handlers receive `(event, datum)`, and the ambient `d3.event`, `mouse()` and `touch()` are gone.
    -   `d3-array`, `d3-color`, `d3-dispatch`, `d3-ease` and `d3-interpolate` were imported but never declared as dependencies; they now are.
    -   Negative axis labels render with U+2212 MINUS SIGN rather than an ASCII hyphen, following d3-format's default. See the migration guide.

-   dca547e: Define what each package publishes.

    -   `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
    -   `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.

-   dca547e: Remove the line chart's `dataByTopic` data shape. The chart has accepted a flat `data` array since 2.10.1 and that is now the only shape it takes; passing `dataByTopic` throws. The migration guide shows both shapes side by side and includes a converter for existing data.
-   31144bd: Remove the Step chart.

    It is gone from all three packages rather than deprecated, so the breaking export change lands in this major. Removed: the `step` named export of `@britecharts/core` (and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`. The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js` and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and `react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no longer appear in the `britecharts.css` bundle. There is no drop-in replacement.

-   ca8f61f: `false`, `0` and `''` now reach the chart. The wrappers used to skip any configuration value that was falsy, so a chart could never have a setting turned back off: `isLoading={false}` could not end a loading state, and `isAnimated={false}`, `isHorizontal={false}` and `maxEntries={0}` were ignored too. Only `undefined` and `null` mean "not set" now, and the chart keeps its own default for them.

    Charts that were relying on a falsy value being ignored will change: a `false`, `0` or `''` that used to leave the chart's default in place now overrides it. Pass `undefined` (or leave the prop out) to keep the default. Event handlers (`customMouseOver`, ...) are unchanged: a falsy handler is still not registered.

### Minor Changes

-   958a49b: Adds the scatter plot to the wrappers and React packages: `ScatterPlotWrapper` in `@britecharts/wrappers` and a `ScatterPlot` component in `@britecharts/react`, with every accessor of the core chart as a prop, its typings, and Storybook stories for the default, trendline, tooltip, cross hairs, negative values and loading cases. Wrap it in `Tooltip` to get the hovered point's value.

### Patch Changes

-   b0aa041: Fixes found by compiling the published typings from a TypeScript consumer (the new `consumers/typescript` tier), plus an `exports` map on every package.

    -   `@britecharts/react`'s typings imported `LocalObject` from `britecharts/src/typings/common/local` -- the unscoped v2 package name, so they never resolved. `LocalObject` is now exported from `@britecharts/core` and imported from there.
    -   `@types/d3-selection` moves from core's devDependencies to its dependencies: the public typings import from `d3-selection`, so TypeScript consumers need those types whether or not they use d3 themselves.
    -   `highlightBarFunction`'s callback was typed as returning `void | null` (the `null` belonged to the callback itself), so any function that returned the selection was rejected. `legend().clearHighlight()` had no return type, which is an error for consumers with `noImplicitAny`. `on()` handlers were typed `(...args: unknown[])`, which rejected every typed handler such as `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType` accepted `'nunber'`.
    -   Each package now declares `exports`: `.` resolves types, the ES module entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*` and `./src/*` keep the deep paths working. For `@britecharts/react` every condition points at the UMD bundle because its `src/` contains JSX.

-   3b17605: Three consumer-side fixes found by the new integration tests.

    -   `line` and `stacked-area` imported `touch` from `d3-selection`, which v3 no longer exports. webpack 4 let that through silently, but Rollup, Vite and esbuild fail the build of any project that imports `@britecharts/core` as ES modules. The import was unused and is gone.
    -   The core and wrappers UMD builds (each package's `main`) were emitted with `window` as the global object, so `require()`-ing them in Node threw `ReferenceError: window is not defined`. They now use `this`, like the CDN and React builds already did.
    -   `require('@britecharts/wrappers')` returned `undefined`: the UMD bundle was built with `libraryExport: 'default'` but `wrappers/src/index.js` only has named exports. The bundle now exposes the namespace, matching its CommonJS build.

-   95e0363: `destroy()` now removes the chart. Every chart wrapper's `destroy(el)` used to do nothing, so a second `create` on the same container drew a second `svg` next to the first: React 18+ StrictMode does exactly that to every component in development, leaving two charts on the page. It now removes the chart's own `svg` from the container, and only that: never the container itself, which React owns. `TooltipWrapper.destroy` removes the tooltip from inside the element and never an `svg`, since the tooltip is created inside the chart it decorates and destroyed against the element around it. The React components call it when they unmount.
-   b71fe79: Publish what the `files` field promises. Yarn's packer (which `yarn release` uses) treated `dist/umd` as a pattern that matched nothing and ignored the `!` exclusions, so core would have shipped without its CSS, CDN and per-chart builds, react without its CommonJS builds, and all three with their spec and story files. The patterns now use `dist/umd/**` form, Yarn is bumped to 3.8.7 where the exclusions work, and each `build` cleans `dist/` itself because Yarn Berry never ran the `prebuild` hook (stale files were surviving into the tarball). The React library builds also no longer emit a stray `index.html`.
-   Updated dependencies [494742e]
-   Updated dependencies [dca547e]
-   Updated dependencies [b28c220]
-   Updated dependencies [dca547e]
-   Updated dependencies [fe6ce63]
-   Updated dependencies [9f23f9e]
-   Updated dependencies [6ccba57]
-   Updated dependencies [31144bd]
-   Updated dependencies [31144bd]
-   Updated dependencies [c686d1a]
-   Updated dependencies [dca547e]
-   Updated dependencies [dca547e]
-   Updated dependencies [31144bd]
-   Updated dependencies [c564f18]
-   Updated dependencies [fe6ce63]
-   Updated dependencies [a2f4df2]
-   Updated dependencies [494742e]
-   Updated dependencies [31144bd]
-   Updated dependencies [31144bd]
-   Updated dependencies [0e5120e]
-   Updated dependencies [b0aa041]
-   Updated dependencies [3b17605]
-   Updated dependencies [b71fe79]
    -   @britecharts/core@3.0.0-beta.1
