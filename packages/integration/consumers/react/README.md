# react consumer

A React 19 project that depends on `@britecharts/react` from the packed
tarball, plus `@britecharts/core` for the stylesheet. Every page mounts under
`StrictMode`, but StrictMode only does anything in a development build of
React: on the production build the preview serves, it is a no-op. `strict.html`
is therefore also built in development mode (`BRITECHARTS_REACT_DEV=1`, on
port 4175), which is where components are set up, cleaned up and set up again,
exercising the wrappers' create/destroy lifecycle.

| Page | Path exercised |
|---|---|
| `package.html` | `import { Donut, Line, axisTimeCombinations } from '@britecharts/react'` (the `exports` map sends every bundler condition to the UMD bundle) |
| `cjs-chart.html` | `import Donut from '@britecharts/react/dist/cjs/charts/Donut.js'` |
| `umd-chart.html` | `import Donut from '@britecharts/react/dist/umd/charts/Donut.js'` |
| `strict.html` | The blocks of `package.html`, on a React **development** build under StrictMode |
| `lifecycle.html` | The same blocks, mounted, unmounted and mounted again by hand, so it works on a production build |

`tests/require.test.js` covers the same package and per-component files with
Node `require()`. `node_modules/`, `dist/` and `dist-dev/` are gitignored.
