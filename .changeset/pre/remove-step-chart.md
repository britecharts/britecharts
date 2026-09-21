---
'@britecharts/core': major
'@britecharts/wrappers': major
'@britecharts/react': major
---

Remove the Step chart.

It is gone from all three packages rather than deprecated, so the breaking export
change lands in this major. Removed: the `step` named export of `@britecharts/core`
(and of `charts/index.js`), the `StepWrapper` export of `@britecharts/wrappers`, and
the `Step` component and its `Step`/`StepProps` typings from `@britecharts/react`.
The packages no longer emit a `step` entry, so `core`'s `dist/umd/charts/step.min.js`
and `dist/styles/charts/step.css`, `wrappers`' `dist/umd/charts/step.min.js` and
`react`'s `dist/{umd,cjs}/charts/Step.js` are gone, and the `.step-chart` rules no
longer appear in the `britecharts.css` bundle. There is no drop-in replacement.
