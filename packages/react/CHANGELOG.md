0.6.5

## 3.0.0-beta.2

### Minor Changes

-   c01aecb: Retargeted the build to ES2020 and dropped Babel from it (H26). The browserslist that drove ES5 down-levelling matched only `android 4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`, `samsung`) whose reported versions don't reflect real feature support; none of them are served ES2020 syntax correctly anyway, since caniuse can't attribute features to their version numbers reliably. Browsers below the new target need a bundler or their own polyfills/transpilation, same as any package that ships modern syntax.

    `@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel removed entirely (no JSX, nothing left for `preset-env` to transform). `@britecharts/wrappers`: same treatment, also Babel-free. `@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX, but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5 regardless of target) is gone.

    `core`'s `build:check` now actually runs (chained into `build`, where it had never been wired in) and checks against `es2020` instead of `es5`, with its paths fixed to the dist layout the monorepo has actually produced since the move to packages — they pointed at files from the pre-monorepo build.

### Patch Changes

-   Updated dependencies [c01aecb]
    -   @britecharts/core@3.0.0-beta.2
    -   @britecharts/wrappers@3.0.0-beta.2

## 3.0.0-beta.1

### Major Changes

-   dca547e: Define what each package publishes.

    -   `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
    -   `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.

-   f6c738d: `Bar`, `GroupedBar` and `ScatterPlot` are now function components on the shared hook, like `Line` and `Donut`, with the same breaking changes: there is no component instance any more (a `ref` on them is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array or object). The chart is created as soon as its data arrives, and not while `data` is `null`.
-   f6c738d: `Bullet` is now a function component on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on it is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (a consumer who mutates their data in place has to pass a new array or object). It also gains the `createTooltip` propType the other charts declare, so Storybook's Controls panel matches theirs.
-   878c6e6: `Donut` is now a function component too, on the same shared hook as `Line`, with the same breaking changes: there is no `Donut` instance any more (a `ref` on `<Donut />` is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array). `isAnimated` still defaults to `true`, and `createTooltip`, which a `Tooltip` hands to the chart it wraps, is still not passed on to the chart.
-   f6c738d: `Legend` is now a function component on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on it is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (a consumer who mutates their data in place has to pass a new array or object). Its lifecycle already matched the other charts (it waits for its data), and it still never asks for a tooltip.
-   878c6e6: `Line` is now a function component that draws through hooks, the first of the React components to move off classes.

    **Breaking:**

    -   `peerDependencies` for `react` and `react-dom` move from `>=15` to `>=16.8`, the first release with hooks. A React 15 or early 16 app will fail at runtime with no warning otherwise.
    -   There is no `Line` instance any more: a `ref` on `<Line />` used to give the component instance, and now is not accepted (the typings say so).
    -   **A re-render whose props did not change no longer redraws the chart.** `Line` used to call the chart's `update` on every render; it now compares the data and each configuration value with the last drawing (`Object.is`, field by field) and skips the update when nothing changed. A consumer who mutates their data array in place and re-renders with the same reference gets no redraw and has to pass a new array or object.

    Also: the chart is created as soon as its data arrives, whichever render that is, and is not created while `data` is `null`. Previously a render without data tried to create it and threw. `destroy` runs with the node the chart was created in.

-   f6c738d: Fixes the resize registry behind `ResponsiveContainer` and `withResponsiveness`, and converts both to function components. **The bug:** the first container to unmount ended resizing for every other container still on the page, and for every container mounted afterwards, because the registry stopped listening to the window but never forgot its callbacks. Each container now removes only its own callback, the window is listened to for as long as at least one is registered, and it is listened to again by the next one. The registry's unused `add()` and `clearAll()` are gone; `addHorizontal()` and the new `remove()` are its whole surface. `<ResponsiveContainer />` no longer throws without a `render` prop. `withResponsiveness(Component)` now returns a memoised function component instead of a class: there is no instance to reach with a `ref`, and a parent re-rendering with the same props still costs nothing.
-   f6c738d: `Sparkline`, `StackedArea` and `StackedBar` are now function components on the shared hook, like the other charts, with the same breaking changes: there is no component instance any more (a `ref` on them is not accepted, and the typings say so), and a re-render whose props did not change no longer redraws the chart (the data and each configuration value are compared with the last drawing; a consumer who mutates their data in place has to pass a new array or object). The chart is created as soon as its data arrives, and not while `data` is `null`.
-   f6c738d: `Tooltip` is now a function component, the last of the stateful ones to move off classes. Its state lives in `useState`, and the tooltip is drawn once the chart it wraps has drawn itself, then follows every render. There is no component instance any more (a `ref` on it is not accepted, and the typings say so). Unlike the charts it does not compare props to skip an update: the pointer moving is a state change and must always reposition the tooltip. The chart it wraps is still rebuilt only when the `Tooltip`'s own props change, never on a pointer move.
-   6ccba57: **Breaking:** the `Tooltip` component's `customMouseMove` callback receives what the chart dispatches: `(dataPoint, [x, y], [width, height], topicColorMap)` instead of `(dataPoint, topicColorMap, x, y)`. `Tooltip` now works for the single-value charts too: wrap a `Bar` (or a scatter plot or heatmap) in it and it shows the hovered element's name and value, as the core mini tooltip does; the `layout` prop forces `'list'` or `'single'` when the data's shape should not decide. The typings follow.
-   31144bd: Remove the Step chart.

    It is gone from all three packages rather than deprecated, so the breaking export change lands in this major. Removed: the `step` named export of `@britecharts/core` (and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`. The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js` and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and `react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no longer appear in the `britecharts.css` bundle. There is no drop-in replacement.

-   ca8f61f: `false`, `0` and `''` now reach the chart. The wrappers used to skip any configuration value that was falsy, so a chart could never have a setting turned back off: `isLoading={false}` could not end a loading state, and `isAnimated={false}`, `isHorizontal={false}` and `maxEntries={0}` were ignored too. Only `undefined` and `null` mean "not set" now, and the chart keeps its own default for them.

    Charts that were relying on a falsy value being ignored will change: a `false`, `0` or `''` that used to leave the chart's default in place now overrides it. Pass `undefined` (or leave the prop out) to keep the default. Event handlers (`customMouseOver`, ...) are unchanged: a falsy handler is still not registered.

### Minor Changes

-   958a49b: Adds the scatter plot to the wrappers and React packages: `ScatterPlotWrapper` in `@britecharts/wrappers` and a `ScatterPlot` component in `@britecharts/react`, with every accessor of the core chart as a prop, its typings, and Storybook stories for the default, trendline, tooltip, cross hairs, negative values and loading cases. Wrap it in `Tooltip` to get the hovered point's value.
-   9eaab2b: The typings now say what the components do. Every chart's `data` is declared `T | null`: it is required, and `null` means the data has not arrived yet, so nothing is drawn until it does. Leaving `data` out, or passing `undefined`, throws at runtime, and is now a type error too. `ResponsiveContainer` and `withResponsiveness`, which were exported but had no typings at all, are typed: the container hands its `render` prop the measured `{ width }`, and the wrapper takes over the `width` prop of what it wraps.

### Patch Changes

-   e79b7d3: Fix the React Storybook preview crashing on load.

    `.storybook/main.js` adds a babel-loader rule so Storybook's nested React preset does not leave JSX unparsed. It was scoped with `exclude: /node_modules/`, which also swept in `storybook-stories.js` — the entry module Storybook generates at the root of the package. That entry is `async`, this package's babel config sets `forceAllTransforms`, and nothing loads `regeneratorRuntime`, so the preview died with `ReferenceError: regeneratorRuntime is not defined` before a single story rendered. The rule is now scoped by `include` to this package's own sources.

-   31144bd: Fix two bugs that broke tooltips and line markers.

    `SVGGeometryElement.pathLength` reflects the _attribute_ of that name — it is an `SVGAnimatedNumber`, never the computed length — so arithmetic on it yields `NaN` and comparisons are always false. Three places read it as if it were a number:

    -   The line chart's `getPathYFromX` used it to seed a binary search, so every `getPointAtLength()` call failed and the y coordinate fell back to 0. Every highlight circle rendered at the top of the vertical marker rather than on its line.
    -   The line chart's `findLongestPath` returned 0, making the draw-in animation a silent no-op.
    -   The scatter plot's trend-line animation had the same no-op.

    All three now use `getTotalLength()`.

    Separately, `@britecharts/react`'s `Tooltip` re-rendered the chart it wraps with `data` alone on every update, dropping the `createTooltip`, `customMouseMove`, `customMouseOut` and `customMouseOver` callbacks the constructor passes. The first mouse interaction triggers an update, so the chart immediately lost the handlers that drive the tooltip and the tooltip element disappeared from the DOM. Both call sites now build the child chart through one method.

-   7b216e8: Two fixes found by the new React 19 consumer in the integration tests.

    -   The UMD bundle (`dist/umd/bundle/react.bundled.min.js`, the package `main`) carried its own copy of React 16 because that build never applied the externals the per-component builds use. Under React 17+ the bundled React's elements are rejected at render time (React 19 error 525) and nothing draws. `react`, `react-dom` and `prop-types` are now externals there too (the bundled copy was React itself, not react-dom, so the bundle only shrinks by about 8 KB; the point is correctness, not size).
    -   The per-component builds (`dist/umd/charts/*.js`, `dist/cjs/charts/*.js`) exported `{ default: Component }` where core's per-chart builds export the module directly. Bundlers that follow Node's CommonJS interop (Vite 8 among them) then handed `import Donut from '…/Donut.js'` an object, and React refused to render it (error 130). The module is now the component, and the README documents it.

-   95e0363: `Legend` now waits for its data like every other chart. `<Legend data={null} />` used to throw `Cannot read properties of undefined (reading 'filter')`; it now draws nothing until `data` is set, then draws the chart. `data` is no longer marked required in the propTypes, so passing `null` while the data loads no longer logs a prop-type warning.
-   9eaab2b: The package's ES module entry named every component's file with its `.js` extension except `Sparkline`, which is now spelled the same way. A bundler or Node resolver that does not add the extension for you could not follow that one export.
-   a2f4df2: The `Tooltip` component's `xAxisValueType` prop accepts `'auto'` (the default) and `'category'` besides `'date'` and `'number'`, and a `maxEntries` prop caps the rows shown; both in the typings too.
-   0e5120e: The `Tooltip` component no longer adds a new tooltip to the chart on every pointer move or prop change. The wrapped chart asks for the tooltip again after each of its own updates, and the component now creates one only when the chart does not hold one already. The wrapped chart is also rebuilt only when the `Tooltip`'s props change, so a pointer move no longer redraws the chart underneath.
-   95e0363: Fixes three components that passed props on to the chart wrapper that the wrapper rejects. `Tooltip`'s documented `customMouseMove`, `customMouseOut` and `customMouseOver` props no longer throw `chart.on is not a function`: they are the component's own callbacks and no longer reach the tooltip. `Donut` and `Legend` now drop the `createTooltip` prop a `Tooltip` hands its child chart, so `<Tooltip render={(props) => <Donut {...props} />} />` renders instead of throwing `Method not supported by Britechart: createTooltip`.
-   fe6ce63: Upgrade all three Storybooks from 6.5 to 8.6.14.

    8.6.14 is the last release with `@storybook/html-webpack5`; Storybook 10 offers only `@storybook/html-vite`, so going further means changing builder, not just version. That is deliberately left to the Vite migration.

    This is a dev-tooling change with one packaging consequence: the React package's own webpack build was silently using `html-webpack-plugin` hoisted out of Storybook 6's dependency tree, and never declared it. Removing Storybook 6 broke `yarn build:react` until it was declared properly.

-   b0aa041: Fixes found by compiling the published typings from a TypeScript consumer (the new `consumers/typescript` tier), plus an `exports` map on every package.

    -   `@britecharts/react`'s typings imported `LocalObject` from `britecharts/src/typings/common/local` -- the unscoped v2 package name, so they never resolved. `LocalObject` is now exported from `@britecharts/core` and imported from there.
    -   `@types/d3-selection` moves from core's devDependencies to its dependencies: the public typings import from `d3-selection`, so TypeScript consumers need those types whether or not they use d3 themselves.
    -   `highlightBarFunction`'s callback was typed as returning `void | null` (the `null` belonged to the callback itself), so any function that returned the selection was rejected. `legend().clearHighlight()` had no return type, which is an error for consumers with `noImplicitAny`. `on()` handlers were typed `(...args: unknown[])`, which rejected every typed handler such as `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType` accepted `'nunber'`.
    -   Each package now declares `exports`: `.` resolves types, the ES module entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*` and `./src/*` keep the deep paths working. For `@britecharts/react` every condition points at the UMD bundle because its `src/` contains JSX.

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
-   Updated dependencies [958a49b]
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
-   Updated dependencies [95e0363]
-   Updated dependencies [ca8f61f]
-   Updated dependencies [b71fe79]
    -   @britecharts/core@3.0.0-beta.1
    -   @britecharts/wrappers@3.0.0-beta.1 0.6.4 0.6.3 0.6.2 0.6.1 0.6.0 0.5.1

---

-   Fixes responsive container and responsive HOC

    0.5.0

---

Features

-   Updates dependencies
-   Updates React version to 16
-   Added click handlers on Donut

Fixes

-   Moved setRef to the class constructor

    0.4.1

---

Features

-   Changing loading states of stacked area and step charts
-   Updating Readme
-   Updating Britecharts version to 2.8.0 and fixing tests
-   Updating meta tags and logo
-   Implemented Sparkline chart
-   Adds donut + legend demo

Fixes

-   Allow setChartProperty to handle empty string values
-   Added correct twitter link and fixed alignment of imgs
-   Updating props of Donut and Bar charts
-   Updating props of Legend, Line and Grouped bar charts
-   Updating props of StackedArea, StackedBar, Step and Tooltip
-   Removing validateData helper
-   Updating paths to work on github pages
-   Updates authors and tags in package.json
-   Fix boolean proptypes for Donut

    0.4.0

---

Features

-   Changing bundle from commonjs into umd
-   Adds Step component with Plop workflow, and fixes bugs preventing documentation from rendering properly
-   Switches custom css to responsive chart, per Bar.js
-   Auto-generated component boilerplate with Plop
-   Adds StackedBar component, tests and Readme for same
-   Grouped Bar Charts

Fixes

-   Fixing proptypes naming on Donut chart
-   Updating issue and PR templates
-   Fixed links in demos to charts and corrected demos local port
-   Fix docs update

    0.3.32, 0.3.31, 0.3.30

---

-   Fix loading state styles
-   Fixes legend chart test
-   Updating dependencies
-   Fixes loading states style/bugs and adds them to demos
-   Adding google analytics tracking
-   Updating fixtures to use a valid date format

    0.3.29

---

-   Switches -> in (leftover change from pull request
-   Updating readme with test project
-   Adds esm modules with babel-cli

    0.3.28

---

-   Add loading states
-   Copying Britecharts styles over
-   Updating docs and renaming charts by removing 'component' from the name
-   Adding badges and hiding introduction header
-   Featured img update
-   Cleaning demo thumbnails stuff
-   Adds a set of thumbnails of our charts at the top of the readme file
-   Fix Linechart demos and update docs

    0.3.27

---

-   Retrieving old yarn.lock

    0.3.26

---

-   Removing d3-selection from externals

    0.3.25

---

-   Adding CommonJS target on lib folder
-   Updating demos and hacking fix for responsive container
-   Adds simple github link in docs homepage

    0.3.24

---

-   Upgrade to latest britecharts
-   Fix tooltip not rendering the first data item due to falsy number check

    0.3.23 0.3.22 0.3.21 0.3.20 0.3.19 0.3.18 0.3.17 0.3.16 0.3.15 0.3.14 0.3.13 0.3.12 0.3.11 0.3.10 0.3.9 0.3.8 0.3.7 0.3.6 0.3.5 0.3.4 0.3.3 0.3.2 0.3.1 0.3.0

    0.2.4

---

Fixes:

-   Bumped Britecharts to 2.4.1 with new fixes

    0.2.1

---

Features:

-   Updating Legend and Tooltip prototypes

    0.2.0

    0.1.13 - 0.1.17 - Debugging

---

Features:

-   Changed minification strategy
-   Commonjs target

    0.1.12 0.1.11 0.1.10 0.1.9 0.1.8 0.1.7 0.1.5 0.1.4 0.1.3 0.1.2 0.1.1 0.1.0 0.0.3
