---
'@britecharts/core': major
---

`@britecharts/core` now ships a built ESM entry point at `dist/esm/` instead of serving authored source from `src/`. `module` and `exports["."].import` both resolve there.

**This fixes a break that already shipped.** `module` was `src/index.js`, which imports `'./charts/helpers/color.js'` — and since the first helper converted, that file is `color.ts` on disk. The published tarball contained `src/charts/helpers/color.ts` beside an `index.js` that could not reach it. Measured against the packed tarball: `src/` held **91 specifiers a plain bundler cannot resolve**; `dist/esm/` holds **none**.

Nothing caught it, for the same reasons documented when `@britecharts/wrappers` hit this:

- Vite resolves `.js` → `.ts` and transpiles it, so the browser tiers in `packages/integration` passed.
- The require tier only exercises the CommonJS/UMD bundle, which was never affected.
- The tarball tier asserted `src/charts/*/*.js` with a hard-coded count, so it counted *down* as charts converted rather than failing. That assertion is now `src/charts/*/*.?s`, which holds across a conversion, and `dist/esm` is asserted alongside it.

**Breaking:** deep imports of converted files through the published `./src/*` subpath no longer resolve — `@britecharts/core/src/charts/helpers/color.js` is `color.ts` on disk now. `src/**` still ships, so deep imports of the charts that are still JavaScript keep working, but that set shrinks with every conversion. Import from the package root instead.

`types` deliberately still points at the hand-written `src/typings/index.d.ts` rather than at generated declarations. Those typings are the source of truth today and most charts are still JavaScript, so emitting declarations from source would produce something weaker than what is already there. Retiring `src/typings/` in favour of generated output is Phase 5's job, and `dist/esm` is where it will land.

Also: `dist/esm/**` had to be added to `files`. It was not packed at first, and the tarball tier is what caught that.
