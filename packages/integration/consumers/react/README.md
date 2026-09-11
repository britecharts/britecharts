# react consumer

A React 19 project that depends on `@britecharts/react` from the packed
tarball, plus `@britecharts/core` for the stylesheet. Every page mounts under
`StrictMode`, so components are mounted, unmounted and remounted in
development, which exercises the wrappers' create/update/destroy lifecycle.

| Page | Path exercised |
|---|---|
| `package.html` | `import { Donut, Line, axisTimeCombinations } from '@britecharts/react'` (the `exports` map sends every bundler condition to the UMD bundle) |
| `cjs-chart.html` | `import Donut from '@britecharts/react/dist/cjs/charts/Donut.js'` |
| `umd-chart.html` | `import Donut from '@britecharts/react/dist/umd/charts/Donut.js'` |

`tests/require.test.js` covers the same package and per-component files with
Node `require()`. `node_modules/` and `dist/` are gitignored.
