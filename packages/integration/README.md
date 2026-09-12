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
   globs that must be present, a deny-list that must be absent, a check that
   `main`, `module` and `types` point at files that exist and that no
   `workspace:` range survived packing, then [publint] and [attw] with a
   short, commented waiver list (all three waivers share one cause: the
   packages have no `"type"` field, so Node reads the ES module sources as
   CommonJS; real ESM output arrives with the Vite build).
4. **Tier 2 · `tests/require.test.js`** — `require()` of the package `main`,
   every per-chart UMD build and the wrappers CommonJS bundle, resolved from
   the installed consumer. No browser, no bundler: this is what Node, Jest
   and CommonJS bundlers do.
5. **Tier 2 · `tests/types.test.js`** — `tsc --noEmit` over
   `consumers/typescript` under `moduleResolution: node` and `bundler`,
   with `skipLibCheck` off so the library's own `.d.ts` files are checked.
   Every chart factory, every React component's props, and one
   `@ts-expect-error` per API so a typing cannot regress to `any` unnoticed.
6. **Tier 3 · `tests/browser.spec.js`** — Playwright builds
   `consumers/vanilla` and `consumers/react` with Vite, serves each, and
   visits one page per consumption path (CDN script tags, UMD through a
   bundler, ES modules; the React package and its per-component builds on
   React 19 under StrictMode). Each page must draw the chart, have the
   stylesheet applied, and produce no console errors, page errors or failed
   requests — on the React pages, no console warnings either.
   `tests/hover.spec.js` runs on the same server against `hover.html`, one
   chart per way a tooltip is attached (line, stacked area, stacked bar and
   grouped bar with the tooltip; bar, scatter plot and heatmap with the mini
   tooltip): a real pointer visits the corners and the middle of each chart,
   and the tooltip has to stay inside the svg every time, with no `NaN`
   attribute anywhere. It is the only place hover geometry is tested; the
   unit specs run under jsdom, which has none.

Tiers 1 and 2 use Node's built-in test runner (`*.test.js`); tier 3 is
Playwright (`*.spec.js`).

[publint]: https://publint.dev
[attw]: https://arethetypeswrong.github.io

## After a release: the published packages

`yarn test:published` runs the same require, types and browser tiers, but
with the consumers installed from the npm registry instead of the tarballs,
plus a page that loads the CDN bundle from jsDelivr:

```sh
BRITECHARTS_SOURCE=registry BRITECHARTS_VERSION=3.0.0-beta.1 \
VITE_BRITECHARTS_VERSION=3.0.0-beta.1 SMOKE_REGISTRY=1 \
yarn workspace @britecharts/integration test:published
```

The **Smoke test the published packages** workflow does this on its own after
every successful Release run, and can be started from the Actions tab for any
version or dist-tag. It is the only test that touches the network.

## Local loop for chart work

```sh
yarn workspace @britecharts/integration start          # vanilla pages
yarn workspace @britecharts/integration start:react    # React pages
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
- The React typings importing from the unscoped v2 package name, so they
  never resolved; `@types/d3-selection` missing from core's dependencies;
  three typings that rejected valid calls (`on()` handlers,
  `highlightBarFunction`, `clearHighlight`) and a `'nunber'` literal.
- The React UMD bundle carrying its own React 16 (rejected by React 17+),
  and the per-component builds exporting `{ default }` where core's export
  the module.
