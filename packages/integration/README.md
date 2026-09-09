# @britecharts/integration

Private workspace. It answers, in CI, the question the three old stand-alone
test projects answered by hand: does every way of installing Britecharts still
work, and do the types still compile?

It is deliberately **not** run by `yarn test` — its script is `test:integration`
so the unit-test job's `yarn workspaces foreach run test` never picks it up.

## Running it

```sh
yarn build:packages       # the tarballs are built from dist/
yarn test:integration     # from the repo root; needs Chromium once:
                          #   yarn workspace @britecharts/integration playwright install chromium
```

`yarn test:integration` runs, in order:

1. `scripts/pack.js` — `yarn workspace <pkg> pack` for core, wrappers and
   react into `.tarballs/`. It uses Yarn's packer on purpose: that is what
   `yarn release` publishes with, and it does not produce the same tarball as
   `npm pack`.
2. `scripts/install-consumers.js` — `npm install` in every `consumers/<name>/`
   project, whose dependencies are `file:` references to those tarballs. A
   consumer is a real project installed the way a user would install it, so
   dependency declarations are tested too, not only file contents.
3. **Tier 1 · `tests/tarball.test.js`** — for each tarball, an allow-list of
   globs that must be present, a deny-list that must be absent, and a check
   that `main`, `module` and `types` point at files that exist and that no
   `workspace:` range survived packing.
4. **Tier 2 · `tests/require.test.js`** — `require()` of the package `main`,
   every per-chart UMD build and the wrappers CommonJS bundle, resolved from
   the installed consumer. No browser, no bundler: this is what Node, Jest
   and CommonJS bundlers do.
5. **Tier 3 · `tests/browser.spec.js`** — Playwright builds
   `consumers/vanilla` with Vite, serves it, and visits one page per
   consumption path (CDN script tags, UMD through a bundler, ES modules).
   Each page must draw the chart, have the stylesheet applied, and produce no
   console errors, page errors or failed requests.

Tiers 1 and 2 use Node's built-in test runner (`*.test.js`); tier 3 is
Playwright (`*.spec.js`).

## Local loop for chart work

```sh
yarn workspace @britecharts/integration start
```

Opens the vanilla consumer's pages with the bare `@britecharts/core` imports
aliased to `packages/core/src`, so a change in a chart shows up without a
build. Paths under `dist/` still come from the last installed tarball.

## Adding a consumption path

1. Add the file to the allow-list in `tests/tarball.test.js` with the minimum
   count you expect.
2. Add a page under `consumers/vanilla/` (see its README) and list it in
   `vite.config.js` and `tests/browser.spec.js`.
3. If it is a `require()` path, add it to `tests/require.test.js`.

## What it has caught so far

- Yarn's packer ignoring nested `files` paths and `!` exclusions (core would
  have shipped without CSS, CDN or per-chart builds).
- `prebuild` never running under Yarn Berry, so stale files survived in `dist/`.
- `touch` imported from `d3-selection` v3, which breaks every Rollup, Vite and
  esbuild consumer of the ES module entry.
- UMD builds emitted with `window` as the global object, unloadable in Node.
- `require('@britecharts/wrappers')` returning `undefined`.
