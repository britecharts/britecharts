---
"@britecharts/core": patch
"@britecharts/wrappers": patch
"@britecharts/react": patch
---

Fixes found by compiling the published typings from a TypeScript consumer
(the new `consumers/typescript` tier), plus an `exports` map on every package.

- `@britecharts/react`'s typings imported `LocalObject` from
  `britecharts/src/typings/common/local` -- the unscoped v2 package name, so
  they never resolved. `LocalObject` is now exported from `@britecharts/core`
  and imported from there.
- `@types/d3-selection` moves from core's devDependencies to its
  dependencies: the public typings import from `d3-selection`, so TypeScript
  consumers need those types whether or not they use d3 themselves.
- `highlightBarFunction`'s callback was typed as returning `void | null`
  (the `null` belonged to the callback itself), so any function that returned
  the selection was rejected. `legend().clearHighlight()` had no return type,
  which is an error for consumers with `noImplicitAny`. `on()` handlers were
  typed `(...args: unknown[])`, which rejected every typed handler such as
  `tooltip.update`; they are `any[]` now. `TooltipProps.xAxisValueType`
  accepted `'nunber'`.
- Each package now declares `exports`: `.` resolves types, the ES module
  entry for bundlers (`import`) and the UMD bundle for `require`; `./dist/*`
  and `./src/*` keep the deep paths working. For `@britecharts/react` every
  condition points at the UMD bundle because its `src/` contains JSX.
