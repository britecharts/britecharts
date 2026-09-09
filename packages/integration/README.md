# @britecharts/integration

Private workspace. It answers, in CI, the question the three old stand-alone
test projects answered by hand: does every way of installing Britecharts still
work, and do the types still compile?

It is deliberately **not** run by `yarn test` — its script is `test:integration`
so the unit-test job's `yarn workspaces foreach run test` never picks it up.

## Running it

```sh
yarn build:packages       # the tarballs are built from dist/
yarn test:integration     # from the repo root
```

`yarn test:integration` runs, in order:

1. `scripts/pack.js` — `yarn workspace <pkg> pack` for core, wrappers and
   react into `.tarballs/`. It uses Yarn's packer on purpose: that is what
   `yarn release` publishes with, and it does not produce the same tarball as
   `npm pack`.
2. `tests/tarball.test.js` — for each tarball, an allow-list of globs that must
   be present, a deny-list that must be absent, and a check that `main`,
   `module` and `types` point at files that exist and that no `workspace:`
   range survived packing.

Later tiers (type checks over `consumers/typescript`, Playwright over the
`consumers/*` pages) plug into the same script; see
`managing-docs/integration-test-package-plan.md` in the working notes.

## Adding a consumption path

Add the file to the allow-list in `tests/tarball.test.js` with the minimum
count you expect, then add a consumer page for it under `consumers/`.
