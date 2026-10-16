---
sidebar_position: 5
---

# The Build System

Britecharts is a [pnpm][pnpm] workspace. Node comes from `.nvmrc` (24), pnpm from the `packageManager` field (pnpm switches itself to that version; CI installs it with `pnpm/action-setup`), and one `pnpm install` at the root sets up every package:

| Package | What it is |
| --- | --- |
| `@britecharts/core` | The charts, the tooltip and legend, the styles and the TypeScript typings. |
| `@britecharts/wrappers` | `create`/`update`/`destroy` wrappers around each chart, for frameworks. |
| `@britecharts/react` | React components built on the wrappers. |
| `@britecharts/docs` | This site, built with [Docusaurus][docusaurus]. Private. |
| `@britecharts/demos` | The Storybook shell that composes the core and React Storybooks. Private. |
| `@britecharts/integration` | Installs the packed packages into real consumer projects and tests what ships. Private. |

### Building the packages

Each published package is built from `pnpm build` in its folder, or all three at once with `pnpm build:packages` at the root. Babel writes the ES modules file by file and only strips the TypeScript types, and `tsc` writes the declarations. Core's UMD bundle, CDN bundle and stylesheets come from `vite build` with [`packages/core/vite.config.js`][vite-build], one run per mode. Wrappers' UMD and CommonJS bundles come from one `vite build` with `packages/wrappers/vite.config.js`. React's UMD bundle comes from `vite build` with `packages/react/vite.config.js`. The Storybooks run on Storybook 10's Vite builders, each with its own `.storybook/vite.config.mjs`. The output targets ES2020.

What comes out of `packages/core/dist`:

| Path | Contents |
| --- | --- |
| `umd/bundle/core.bundled.min.cjs` | Every chart in one UMD bundle: the package's `main`, and what `require` loads. |
| `types-cjs/` | The type declarations again, marked CommonJS, for the `require` condition. |
| `cdn/bundle/core.cdn.min.js` | The same, built for a `<script>` tag, with d3 bundled in. |
| `styles/bundle/britecharts.min.css` | Every stylesheet. |
| `styles/charts/common.min.css`, `styles/charts/<chart>.min.css` | The shared styles, and one file per chart to use alongside them. |

The wrappers package emits a UMD and a CommonJS bundle; the React package a UMD bundle. `pnpm build` at the root builds the three packages, this site and the Storybooks.

### Styles

The stylesheets are SCSS under `packages/core/src/styles`, written with the Sass module system (`@use`): `britecharts.scss` is the whole set, `common.scss` what every chart needs, and `charts/<chart>.scss` one chart. They compile through core's Vite build; `pnpm lint:styles` runs stylelint over them.

### Tasks

From the root:

| Task | Description |
| --- | --- |
| `pnpm test` | Runs the Jest suites of every package; `pnpm test:ci` is the same command as CI runs it, and `pnpm test:watch` watches. |
| `pnpm test:integration` | Packs the three packages with pnpm's packer, installs them into the vanilla, TypeScript and React 19 consumers and checks tarball contents, `require()` paths, the typings and, in Chromium, that every way of loading a chart renders and every tooltip stays inside its chart. |
| `pnpm lint` | ESLint over every package (`pnpm lint:js`) and stylelint over the styles (`pnpm lint:styles`). `pnpm format` runs oxfmt. |
| `pnpm check` | Both linters, the type-check and the test suite, what CI runs. |
| `pnpm build` / `pnpm build:packages` | Everything, or only the three published packages. |
| `pnpm demos` | Serves the core, React and composed Storybooks together on ports 2001, 2002 and 2000. |
| `pnpm docs` / `pnpm docs:build` | Serves or builds this site, after copying the READMEs in and generating the API pages from the charts' JSDoc. |
| `pnpm docs:links` | Serves the built site and follows every link on it, external ones included; the Link check workflow runs it on every pull request and weekly. |
| `pnpm changeset` | Records what a change does and which packages it bumps, for the release. |
| `pnpm version-packages` | Applies the pending changesets: bumps versions and writes the changelogs. |
| `pnpm release` | Builds the packages and publishes every non-private workspace, in dependency order. |

### Docs and Storybooks

The API reference is generated: `packages/docs/scripts/generate-docs.js` runs [jsdoc-to-markdown][jsdoc2md] over `packages/core/src` and writes one page per chart into `docs/API`, and `copy-readme.js` brings the READMEs in. The three Storybooks build with `pnpm build:demos` and are deployed next to the site, under `/storybook/`, by `scripts/compose-site.js`, so composition is same-origin.

### Releases

Versions are managed with [Changesets][changesets]. `@britecharts/core`, `@britecharts/wrappers` and `@britecharts/react` are a fixed group, so they always share a version; the docs, demos and integration packages are never published. The Release workflow publishes from `main` once the pending changesets are applied, the Integration check gates every merge, and the Smoke workflow re-checks the published packages from npm and jsDelivr afterwards. `MAINTAINING.md` has the steps.

[pnpm]: https://pnpm.io/
[vite-build]: https://vite.dev/guide/build
[docusaurus]: https://docusaurus.io/
[jsdoc2md]: https://github.com/jsdoc2md/jsdoc-to-markdown
[changesets]: https://github.com/changesets/changesets
[vite]: https://github.com/britecharts/britecharts/issues/1044
