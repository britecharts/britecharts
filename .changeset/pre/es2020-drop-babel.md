---
'@britecharts/core': minor
'@britecharts/wrappers': minor
'@britecharts/react': minor
---

Retargeted the build to ES2020 and dropped Babel from it (H26). The
browserslist that drove ES5 down-levelling matched only `android
4.4.3-4.4.4` and Opera Mini, plus two caniuse-lite entries (`and_uc`,
`samsung`) whose reported versions don't reflect real feature support; none
of them are served ES2020 syntax correctly anyway, since caniuse can't
attribute features to their version numbers reliably. Browsers below the new
target need a bundler or their own polyfills/transpilation, same as any
package that ships modern syntax.

`@britecharts/core`'s UMD bundle: 151,923 → 132,626 bytes (-12.7%), Babel
removed entirely (no JSX, nothing left for `preset-env` to transform).
`@britecharts/wrappers`: same treatment, also Babel-free.
`@britecharts/react`'s UMD bundle: 368 → 315 KB (-14%); Babel stays for JSX,
but `preset-env`'s `forceAllTransforms` (which downlevelled to ES5
regardless of target) is gone.

`core`'s `build:check` now actually runs (chained into `build`, where it had
never been wired in) and checks against `es2020` instead of `es5`, with its
paths fixed to the dist layout the monorepo has actually produced since the
move to packages — they pointed at files from the pre-monorepo build.
