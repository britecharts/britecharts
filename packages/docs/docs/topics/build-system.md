---
sidebar_position: 5
---

# The Build System

Britecharts is a [Yarn][yarn] 3 workspace. Node comes from `.nvmrc` (24), Yarn from the `packageManager` field through Corepack, and one `yarn install` at the root sets up every package:

| Package | What it is |
| --- | --- |
| `@britecharts/core` | The charts, the tooltip and legend, the styles and the TypeScript typings. |
| `@britecharts/wrappers` | `create`/`update`/`destroy` wrappers around each chart, for frameworks. |
| `@britecharts/react` | React components built on the wrappers. |
| `@britecharts/docs` | This site, built with [Docusaurus][docusaurus]. Private. |
| `@britecharts/demos` | The Storybook shell that composes the core and React Storybooks. Private. |
| `@britecharts/integration` | Installs the packed packages into real consumer projects and tests what ships. Private. |

### Building the packages

Each published package is built with [webpack][webpack] 4 from `yarn build` in its folder, or all three at once with `yarn build:packages` at the root. Two things make that work on a current Node: `sass-loader` 10 with Dart Sass, and `scripts/patch-webpack4-md4.js`, which webpack's configs require first so the md4 hashing webpack 4 asks for is served by sha256 on OpenSSL 3. Babel's `preset-env` still emits ES5 output; that, and webpack itself, go with the Vite migration on the roadmap ([#1044][vite]).

What comes out of `packages/core/dist`:

| Path | Contents |
| --- | --- |
| `umd/bundle/core.bundled.min.js` | Every chart in one UMD bundle: the package's `main`. |
| `umd/charts/<chart>.min.js` | One UMD file per chart, plus `colors`. |
| `cdn/bundle/core.cdn.min.js`, `cdn/charts/` | The same, built for a `<script>` tag with d3 loaded separately. |
| `styles/bundle/britecharts.min.css` | Every stylesheet. |
| `styles/charts/common.min.css`, `styles/charts/<chart>.min.css` | The shared styles, and one file per chart to use alongside them. |

The wrappers package emits a UMD and a CommonJS bundle plus one file per chart; the React package a UMD bundle plus one UMD and one CommonJS file per component. `yarn build` at the root builds the three packages, this site and the Storybooks.

### Styles

The stylesheets are SCSS under `packages/core/src/styles`, written with the Sass module system (`@use`): `britecharts.scss` is the whole set, `common.scss` what every chart needs, and `charts/<chart>.scss` one chart. They compile through the same webpack build; `yarn lint:styles` runs stylelint over them.

### Tasks

From the root:

| Task | Description |
| --- | --- |
| `yarn test` | Runs the Jest suites of every package; `yarn test:ci` is the same command as CI runs it, and `yarn test:watch` watches. |
| `yarn test:integration` | Packs the three packages with Yarn's packer, installs them into the vanilla, TypeScript and React 19 consumers and checks tarball contents, `require()` paths, the typings and, in Chromium, that every way of loading a chart renders and every tooltip stays inside its chart. |
| `yarn lint` | ESLint over every package (`yarn lint:js`) and stylelint over the styles (`yarn lint:styles`). `yarn format` runs Prettier. |
| `yarn check` | Both linters and the test suite, what CI runs. |
| `yarn build` / `yarn build:packages` | Everything, or only the three published packages. |
| `yarn demos` | Serves the core, React and composed Storybooks together on ports 2001, 2002 and 2000. |
| `yarn docs` / `yarn docs:build` | Serves or builds this site, after copying the READMEs in and generating the API pages from the charts' JSDoc. |
| `yarn docs:links` | Serves the built site and follows every link on it, external ones included; the Link check workflow runs it on every pull request and weekly. |
| `yarn changeset` | Records what a change does and which packages it bumps, for the release. |
| `yarn version-packages` | Applies the pending changesets: bumps versions and writes the changelogs. |
| `yarn release` | Builds the packages and publishes every non-private workspace, in dependency order. |

### Docs and Storybooks

The API reference is generated: `packages/docs/scripts/generate-docs.js` runs [jsdoc-to-markdown][jsdoc2md] over `packages/core/src` and writes one page per chart into `docs/API`, and `copy-readme.js` brings the READMEs in. The three Storybooks build with `yarn build:demos` and are deployed next to the site, under `/storybook/`, by `scripts/compose-site.js`, so composition is same-origin.

### Releases

Versions are managed with [Changesets][changesets]. `@britecharts/core`, `@britecharts/wrappers` and `@britecharts/react` are a fixed group, so they always share a version; the docs, demos and integration packages are never published. The Release workflow publishes from `main` once the pending changesets are applied, the Integration check gates every merge, and the Smoke workflow re-checks the published packages from npm and jsDelivr afterwards. `MAINTAINING.md` has the steps.

[yarn]: https://yarnpkg.com/
[webpack]: https://webpack.js.org/
[docusaurus]: https://docusaurus.io/
[jsdoc2md]: https://github.com/jsdoc2md/jsdoc-to-markdown
[changesets]: https://github.com/changesets/changesets
[vite]: https://github.com/britecharts/britecharts/issues/1044
