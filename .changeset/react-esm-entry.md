---
'@britecharts/react': major
---

`@britecharts/react` builds an ESM entry instead of shipping its source.

`module` resolved to `src/index.js` and the package ships `src/**`, so the published ESM entry *was* the authored source. That is fine while every file is JavaScript and breaks the moment one is not: a consumer's bundler would be handed TypeScript it was never asked to compile. Core shipped exactly that in #1083 and no tier caught it, because Vite resolves `.js` to `.ts` and transpiles while the require tier only exercises the UMD bundle.

Babel now transpiles `src/` into `dist/esm` preserving the module structure, and **`module` and `exports.import` both point there**. `exports.import` used to serve the UMD bundle, which works but hands an ESM consumer a CommonJS wrapper and nothing to tree-shake.

`types` is unchanged: it still resolves to the hand-written `src/typings/index.d.ts`, exactly as core's does, because the generated declarations land in a later phase.

**Breaking** for anyone resolving this package's ESM entry to `src/` on purpose — a deep `./src/*` import still works, and `require` is untouched. Verified against the packed tarball by walking the module graph from `module`: every relative specifier resolves inside `dist/esm`, with no extension guessing and no `.ts` in the graph.
