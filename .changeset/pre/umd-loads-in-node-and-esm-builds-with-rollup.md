---
"@britecharts/core": patch
"@britecharts/wrappers": patch
---

Three consumer-side fixes found by the new integration tests.

- `line` and `stacked-area` imported `touch` from `d3-selection`, which v3 no
  longer exports. webpack 4 let that through silently, but Rollup, Vite and
  esbuild fail the build of any project that imports `@britecharts/core` as ES
  modules. The import was unused and is gone.
- The core and wrappers UMD builds (each package's `main`) were emitted with
  `window` as the global object, so `require()`-ing them in Node threw
  `ReferenceError: window is not defined`. They now use `this`, like the CDN
  and React builds already did.
- `require('@britecharts/wrappers')` returned `undefined`: the UMD bundle was
  built with `libraryExport: 'default'` but `wrappers/src/index.js` only has
  named exports. The bundle now exposes the namespace, matching its CommonJS
  build.
