---
"@britecharts/react": patch
---

Two fixes found by the new React 19 consumer in the integration tests.

- The UMD bundle (`dist/umd/bundle/react.bundled.min.js`, the package `main`)
  carried its own copy of React 16 because that build never applied the
  externals the per-component builds use. Under React 17+ the bundled React's
  elements are rejected at render time (React 19 error 525) and nothing
  draws. `react`, `react-dom` and `prop-types` are now externals there too
  (the bundled copy was React itself, not react-dom, so the bundle only
  shrinks by about 8 KB; the point is correctness, not size).
- The per-component builds (`dist/umd/charts/*.js`, `dist/cjs/charts/*.js`)
  exported `{ default: Component }` where core's per-chart builds export the
  module directly. Bundlers that follow Node's CommonJS interop (Vite 8 among
  them) then handed `import Donut from '…/Donut.js'` an object, and React
  refused to render it (error 130). The module is now the component, and the
  README documents it.
