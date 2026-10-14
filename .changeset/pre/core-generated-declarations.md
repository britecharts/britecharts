---
'@britecharts/core': major
---

`@britecharts/core`'s type declarations are now generated from source. `types` and `exports["."].types` resolve to `dist/types/index.d.ts`, and the hand-written `src/typings/index.d.ts` is gone.

Every chart's types live beside the chart now, and the declarations are compiled from the code that implements them, so they can no longer drift from what runs. The factory signatures that used to be written out by hand in the barrel come from the charts themselves.

**Breaking:**

- Deep imports from `@britecharts/core/src/typings/...` no longer resolve: `src/typings/index.d.ts` and `src/typings/charts/` are removed. Import types from the package root instead.
- The `*Keys` enums are type-only exports. The old declarations said `export enum`, but the built output never contained them, so a value import compiled and then gave `undefined` at run time. Now it is a compile error (TS1362). Use them in type position, as the data shapes do.

The surface is otherwise unchanged. Compiling the old barrel and the generated one and comparing their exports gives the same 116 names, plus `default`: the `britecharts` default export, which has always existed at run time and was never declared. It is declared for `import`, which is what bundlers use. Under `require`, the UMD bundle is that object itself, so `require('@britecharts/core').default` is still `undefined`: use the named exports or the module object directly.

`GridTypes` is newly exported: the type of the `grid` accessor on the line, stacked-area, stacked-bar, grouped-bar and scatter-plot charts, which consumers could see in those signatures and could not name.
