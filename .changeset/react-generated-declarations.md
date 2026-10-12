---
'@britecharts/react': major
---

`@britecharts/react`'s type declarations are now generated from the components. `types` and `exports["."].types` resolve to `dist/esm/index.d.ts`, beside the ESM build, and the hand-written `src/typings/` is gone.

Each component already declared its props in its own file, where Storybook's docgen reads them, and an assertion in every component kept that interface equal to the hand-written copy. With the copy gone, the assertions go too: the props a consumer compiles against are the ones the component is written with.

**Breaking:** deep imports from `@britecharts/react/src/typings/...` no longer resolve. Import the components and their props from the package root.

The surface is otherwise unchanged. Every component is still declared as `FunctionComponent<Props>`, so it works with any `@types/react` the peer range allows, and all twelve props types compare identical to the published ones. Four exports are new to the declarations, though not to the package: `britechartsCustomEvents`, `axisTimeCombinations` and their types `BritechartsCustomEvent` and `AxisTimeCombinationValue` have always been exported at run time and were never declared.
