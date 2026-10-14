---
'@britecharts/wrappers': major
---

`@britecharts/wrappers` now ships a built ESM entry point at `dist/esm/` with generated type declarations, instead of serving authored source from `src/`. `module`, `exports["."].import` and the new `types` field all resolve there.

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
