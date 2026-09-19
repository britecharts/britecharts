# testing/

`yarn verify:suite` answers one question: **does the test suite notice when the hooks lifecycle breaks?**

`verify-suite.mjs` applies each maintained mutation patch in `mutants/` to the source, runs the specs that are meant to catch it, and requires them to go red. Exit codes, all with their own message:

| Code | Meaning |
| --- | --- |
| 0 | every mutant was killed by a failing test |
| 1 | a mutant **survived**: the specs stayed green, the suite has a hole |
| 2 | a patch **did not apply**: it rotted (a patch that does not apply kills nothing) |
| 4 | the baseline was already red: nothing can be concluded |
| 5 | a mutant only broke the build (no test failed): not a kill |

## The mutants

|  | Target | Break | Caught by |
| --- | --- | --- | --- |
| m2 | `helpers/useChart.js` | a chart is only ever created on the first render (the recovery branch is gone) | `useChart.spec.js`, `Line.lifecycle.spec.js` |
| m3 | `helpers/useChart.js` | `createTooltip` is also called after the creation | same |
| m6 | `tooltip/Tooltip.js` | the wrapped chart is rebuilt on every render, not when the props change | `Tooltip.spec.js` |

## Keeping the patches alive

Each patch is regenerated **in the same PR that changes its target**. When a patch stops applying the run fails with `PATCH DID NOT APPLY` (exit 2), which is the signal to regenerate it, never to delete it. To regenerate one: make the one-line mutation by hand in the target and capture it, then put the file back:

```sh
git diff -- packages/react/src/charts/helpers/useChart.js \
    > packages/react/testing/mutants/<name>.patch
git checkout -- packages/react/src/charts/helpers/useChart.js
git apply --check packages/react/testing/mutants/<name>.patch   # from the repo root
```

m6 targets the class version of `Tooltip`. When `Tooltip` becomes a function component its patch changes with it (the plan's form is a `useMemo` for the child element), and so does the spec it is caught by.
