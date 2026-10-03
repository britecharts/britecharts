---
'@britecharts/core': minor
'@britecharts/wrappers': minor
'@britecharts/react': minor
---

Upgraded the build from webpack 4.46 to webpack 5.111 across `core`, `wrappers` and `react` (`demos`' pin followed along for consistency, though its own build already ran through Storybook's bundled webpack 5). This supersedes #1044's "skip straight to Vite" plan with a smaller, lower-risk incremental step; #1044 stays open for the real ESM-output work (dropping the `src` entry from `exports`, retiring the publint/attw waivers) that motivated it, now decoupled from which bundler gets there.

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
