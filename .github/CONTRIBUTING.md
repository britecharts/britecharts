# Contributing Guide

Britecharts is an open project and every contribution helps, from a bug report to a new chart. This guide covers how to report an issue, how to get the repository running on your machine and what a pull request needs to be merged.

- [Reporting an Issue](#reporting-an-issue)
- [Creating Pull Requests](#creating-pull-requests)
- [Setup](#setup)
  - [Getting Set Up to Contribute](#getting-set-up-to-contribute)
  - [The Repository](#the-repository)
  - [Creating Feature and Fix Branches](#creating-feature-and-fix-branches)
- [Working on the Charts](#working-on-the-charts)
  - [Running the Demos](#running-the-demos)
  - [Running the Tests](#running-the-tests)
  - [Running the Integration Tests](#running-the-integration-tests)
  - [Running the Documentation](#running-the-documentation)
- [Committing and Opening a Pull Request](#committing-and-opening-a-pull-request)
  - [Commit Messages](#commit-messages)
  - [Changesets](#changesets)
  - [What Runs on a Pull Request](#what-runs-on-a-pull-request)
- [Next Steps](#next-steps)
- [Good First Issues](#good-first-issues)
- [Joining Britecharts](#joining-britecharts)

## Reporting an Issue

The easiest way to contribute to Britecharts is by creating issues. Search the [issues][issues] of the repository for a similar problem first; if you don't find one, open a new issue with the bug report or feature request template. Issues stay open while they are being worked on and are closed once done, or once they have waited for enough interest (👍 reactions) from the community.

For bugs, please be descriptive: the chart, its configuration, the data you passed it, what you expected and what happened. A minimal reproduction (a Codepen, a StackBlitz or a small repository) or a screenshot makes a bug much faster to fix.

## Creating Pull Requests

Before sending a pull request with significant changes, please use the [issue tracker][issues] to discuss the improvement you want to make, so that you don't spend time on something that can't be merged.

We keep issues labeled [help wanted][help-wanted] and [good first issue][good-first-issues]. They are a great starting point if you want to contribute. Don't hesitate to ask questions on the issue if you are not sure about the strategy to follow.

## Setup

To start contributing to Britecharts, you need to set up your machine to develop with the library. Read on to learn how to set up your fork, what is in the repository, and how to create branches.

### Getting Set Up to Contribute

1. Fork the Britecharts repository by clicking the fork button on GitHub.
2. Clone your fork with `git clone https://github.com/<your handle>/britecharts.git`.
3. Install Node. We develop on the version in [`.nvmrc`](../.nvmrc) (Node 24; anything from Node 20 works), so `nvm use` or `fnm use` in the repository folder picks the right one.
4. Enable pnpm. The repository pins pnpm in `package.json`, so with [Corepack][corepack] you don't need to install it yourself: run `corepack enable` once.
5. Navigate to the repository folder and install the dependencies with `pnpm install`.

That is all the charts need: the unit tests run under jsdom, so no browser is required. The integration tests use Playwright, which downloads its own Chromium (see [Running the Integration Tests](#running-the-integration-tests)).

### The Repository

Britecharts is a monorepo of pnpm workspaces under `packages/`:

| Package | What it is |
| --- | --- |
| `@britecharts/core` | The charts, as D3.js reusable components, with their styles, tests and Storybook stories. Published. |
| `@britecharts/wrappers` | Thin `create`/`update`/`destroy` wrappers around the core charts, the seam that framework bindings are built on. Published. |
| `@britecharts/react` | The React components, built on the wrappers, with their tests and Storybook stories. Published. |
| `@britecharts/demos` | The Storybook that composes the core and React Storybooks into the demos site. |
| `@britecharts/docs` | The Docusaurus documentation site. Its API pages are generated from the JSDoc comments in core. |
| `@britecharts/integration` | Packs the three published packages and installs them into small consumer projects, to test what ships. |

The [code structure][codeStructure] and [build system][buildSystem] topics describe the layout of each package and how they are built.

### Creating Feature and Fix Branches

The development branch is `main`. Base your branches on it, not on `master`, which holds version 2.

1. Add the upstream remote: `git remote add upstream https://github.com/britecharts/britecharts.git`.
2. Pull the most recent changes: `git checkout main && git pull --rebase upstream main`.
3. Create a new branch. Prefix its name with `fix-`, `feat-`, `docs-` or `chore-` depending on what it will contain: `git checkout -b fix-<your branch name>`.

## Working on the Charts

### Running the Demos

The demos are Storybooks, one per package, and they are the best place to see your changes as you make them. From the repository root:

```sh
pnpm demos
```

That starts the core Storybook on [localhost:2001](http://localhost:2001), the React one on [localhost:2002](http://localhost:2002) and the composed demos site on [localhost:2000](http://localhost:2000). `pnpm demos:core` or `pnpm demos:react` runs just one of them.

Each chart's stories live next to its code, in `packages/core/src/charts/<chart>/<chart>.stories.js` and `packages/react/src/charts/<chart>/<chart>.stories.js`. Add a story when you add a feature.

### Running the Tests

```sh
pnpm test           # every package's unit tests, once
pnpm test:watch     # re-runs them as you edit
pnpm lint           # ESLint on the JavaScript, stylelint on the SCSS
pnpm check          # lint plus the tests, what CI runs
```

To iterate on a single package, run its scripts directly: `pnpm --filter @britecharts/core run test:watch`. The tests use Jest with jsdom; the core charts' specs sit next to the charts, as `<chart>.spec.js`.

### Running the Integration Tests

The unit tests check the charts; the integration package checks what ships. It packs the three publishable packages the way the release does, installs them into small consumer projects (plain JavaScript, TypeScript and React) with npm, and then checks the tarball contents, `require()` paths, the typings and, with Playwright, that every way of loading a chart renders in a browser:

```sh
pnpm build:packages
pnpm --filter @britecharts/integration exec playwright install chromium   # once
pnpm test:integration
```

It runs on every pull request as the **Integration** check. See [its README](../packages/integration/README.md) for the tiers and for how to add a consumption path, and `pnpm --filter @britecharts/integration run start` for a dev server over the consumer pages that uses the workspace source.

### Running the Documentation

```sh
pnpm docs
```

That generates the API pages from the JSDoc comments in `@britecharts/core`, copies the packages' READMEs in and starts the Docusaurus site with live reload. `pnpm docs:build` builds it the way the deployment does and fails on a broken internal link or anchor; `pnpm docs:links` then crawls the built site and checks the external links too.

The charts' API pages come from their JSDoc comments, so when you change an accessor, update its comment. The [Contributor How To Guides][contributorHowTo] cover how to modify and create charts step by step.

## Committing and Opening a Pull Request

### Commit Messages

We follow [Conventional Commits][conventionalCommits], and a commit hook checks the message: it must start with one of `feat`, `fix`, `docs` or `chore`, as in `fix: keep the tooltip inside the chart`. The same hook runs ESLint, Prettier and stylelint on the staged files, so a commit that doesn't lint doesn't go in.

Pull request titles follow the same convention, since they become the commit on `main`.

### Changesets

Versioning is owned by [Changesets](../.changeset). If your change is something users of `@britecharts/core`, `@britecharts/wrappers` or `@britecharts/react` would notice, a new feature, a fix, a breaking change, add a changeset and commit it with your change:

```sh
pnpm changeset
```

Pick the affected packages, pick major, minor or patch, and write the line that will appear in the changelog. The three packages are released together with one version number, so one changeset covers them all. Changes to the docs, the demos, the tests or the CI don't need a changeset.

### What Runs on a Pull Request

Every pull request runs:

- **Lint** and **Unit Tests**, the same as `pnpm check`.
- **Integration Tests**, which pack the packages and test them from the consumer projects.
- **Visual tests on Chromatic**, which snapshot every story and flag visual changes for review.
- **Test Docs Deployment** and **Link check**, which build the documentation site and check its links.

Fill in the [pull request template][prtemplate], link the issue the change addresses, and a maintainer will review it. Rebasing on `main` keeps the checks meaningful when your branch has been open for a while.

## Next Steps

Once your environment is set and ready to go, check our [Contributor How To Guides][contributorHowTo] to learn how to create a pull request and modify or create a chart.

Check also our [Topics page][topicsPage] to learn about our code standards, API guidelines, the library structure and the build system.

You can add yourself or somebody else to the contributors list by using the [All Contributors bot][allContributorsBot].

## Good First Issues

We have a set of [good first issues][good-first-issues] that contain bugs and improvements with a relatively limited scope. This is a great place to get started and gain experience with the project and the contributing workflow.

## Joining Britecharts

Britecharts is an open project looking to get your contributions, in whatever form you prefer, and ready to welcome new committers. We are looking for maintainers: if you would like to help keep the project going, say so on an issue or a pull request and we will take it from there. The [Maintaining guide](./MAINTAINING.md) describes what that involves.

[issues]: https://github.com/britecharts/britecharts/issues
[help-wanted]: https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22help+wanted%22
[good-first-issues]: https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22
[corepack]: https://nodejs.org/api/corepack.html
[conventionalCommits]: https://www.conventionalcommits.org/
[prtemplate]: https://github.com/britecharts/britecharts/blob/main/.github/PULL_REQUEST_TEMPLATE.md
[contributorHowTo]: https://britecharts.github.io/britecharts/docs/how-tos/contributor-how-to-guides
[topicsPage]: https://britecharts.github.io/britecharts/docs/topics/topics-index
[codeStructure]: https://britecharts.github.io/britecharts/docs/topics/code-structure
[buildSystem]: https://britecharts.github.io/britecharts/docs/topics/build-system
[allContributorsBot]: https://allcontributors.org/docs/en/bot/usage
