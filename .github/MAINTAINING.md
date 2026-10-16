# Maintaining Guide
> Information for Britecharts maintainers

As maintainers of the project, this is our guide. Most of the steps and guidelines in the [Contributing](./CONTRIBUTING.md) document apply here, including how to set up your environment, write code to fit the code style, run tests, craft commits and manage branches.

Beyond this, this document provides some details that would be too low-level for contributors.

## Releasing

Versioning is owned by [Changesets](../.changeset): every change to a publishable package lands with a changeset file, and the **Release** workflow keeps a "Version Packages" pull request open on `main`. Merging that pull request is the release; the same workflow then publishes through `pnpm publish`.

Three things to know:

- **Integration must be a required check on `main`.** It packs the packages with pnpm's packer, installs them into consumer projects and tests them, so the "Version Packages" pull request cannot merge with a broken tarball, a broken `require()` path, broken typings or a chart that does not render. It is only enforced once branch protection on `main` lists it as required. Check that it does.
- **pnpm's packer is the authoritative one.** `pnpm publish` is what ships, and it does not read the `files` field the way `npm pack` does (see the `exports`/`files` comments in each package.json). Never verify publish contents with `npm pack`.
- **After a publish, check what actually shipped.** The **Smoke test the published packages** workflow runs on its own after every successful Release run and installs the consumers from the npm registry, with the CDN page loading from jsDelivr. It can also be started by hand from the Actions tab for any version or dist-tag. A red run there means users are affected now.

### Cutting a release, step by step

1. Check that `main` is green, and that every change since the last release that a user would notice has a changeset in `.changeset/`.
2. Open the "Version Packages" pull request the Release workflow keeps up to date. Read its changelog entries: they are what users see. The three packages share one version number, so all three move together.
3. Merge it. The Release workflow on that merge builds the packages and runs `scripts/publish-packages.js`, which publishes `@britecharts/core`, then `wrappers`, then `react`, skipping any version already on the registry.
4. Confirm the publish: `npm view @britecharts/core dist-tags` should show the new version under the tag you expect (see below), and the same for `wrappers` and `react`. The run also creates a `<package>@<version>` git tag and a GitHub release for each package it published.
5. Watch the smoke workflow that runs after Release. Green means the published packages install and render from npm and jsDelivr.

### Pre-release mode and dist-tags

`main` is in Changesets pre-release mode, tag `beta` (`.changeset/pre.json`). While it is:

- Every release is a `3.0.0-beta.N`, and `publish-packages.js` publishes it under the `beta` dist-tag.
- **`latest` does not move.** npm made the very first publish, `3.0.0-beta.1`, `latest`, and nothing since has touched it, so a bare `npm install @britecharts/core` installs `beta.1`. To point `latest` at the newest beta, run once per package, logged in to npm:

    ```sh
    npm dist-tag add @britecharts/core@<version> latest
    npm dist-tag add @britecharts/wrappers@<version> latest
    npm dist-tag add @britecharts/react@<version> latest
    ```

### Shipping 3.0.0 (leaving pre-release mode)

1. On a branch off `main`, run `pnpm changeset pre exit` and commit the change to `.changeset/pre.json`. Open a pull request and merge it.
2. The Release workflow updates "Version Packages" to `3.0.0`. Review and merge it as in any release.
3. Outside pre mode `publish-packages.js` passes no tag, so `3.0.0` publishes as `latest`. Check with `npm view @britecharts/core dist-tags`.
4. Then do the v2 handover: deprecate the unscoped packages with a message that names the replacement, and pin the end-of-life notice.

    ```sh
    npm deprecate britecharts "Britecharts 3 is @britecharts/core"
    npm deprecate britecharts-react "Britecharts 3 is @britecharts/react"
    ```

### When a release goes wrong

- **The publish failed partway.** Re-run the Release workflow, or run `pnpm run release` locally with npm credentials. `publish-packages.js` skips every version already on the registry, so it only publishes what is missing.
- **Release failed with `409 Conflict` right after a publish.** npm's read API can lag a fresh publish by a few minutes, so the "already published?" check can miss a version that did ship, and `pnpm publish` refuses it. `publish-packages.js` waits up to five minutes for the registry to show the version before failing. If it still fails, check `npm view @britecharts/<pkg>@<version> version`. If all three are there, nothing is wrong on npm, and re-running Release passes.
- **The smoke workflow failed.** Read which tier failed. It runs the consumer tests from the commit that published the version, so a failure there is about what shipped, not about `main`. To re-test a version by hand, start the workflow from the Actions tab with that version or a dist-tag.
- **A broken version shipped.** npm does not allow republishing a version. Fix forward with a new changeset and release, then `npm deprecate @britecharts/<pkg>@<bad version> "<reason>; use <good version>"` for each of the three packages.

## Credentials and access

Everything a release depends on, and where it lives. Check this list whenever a maintainer joins or leaves.

| What | Used by | Where it lives | Notes |
|---|---|---|---|
| `NPM_TOKEN` | Release workflow (`release.yml`), to publish | An organisation secret: it is not in the repository's own secrets | An npm automation token with publish rights on the `@britecharts` scope. When it is rotated, update the secret before the next release. |
| `GITHUB_TOKEN` | Release (version pull request), docs deploy (`gh-pages`) | Provided by GitHub Actions | Nothing to manage. |
| `CHROMATIC_TOKEN_CORE`, `CHROMATIC_TOKEN_REACT` | Storybook publish (`storybook-publish.yml`) | Repository secrets | One per Chromatic project: core and react. |
| npm `@britecharts` organisation | Publishing, `npm dist-tag`, `npm deprecate` | npmjs.com | Every maintainer who releases needs to be a member with publish rights. Check with `npm org ls britecharts`. |
| GitHub `britecharts` organisation | Merging, workflows, secrets, settings | github.com | Admins can change secrets, branch protection and Dependabot settings. |
| Google Analytics property `G-W3BQXCKSD9` | The docs site (`docusaurus.config.js`) | analytics.google.com | Add each maintainer as a user of the property. |
| `DEPENDABOT_LOCKFILE_TOKEN` | Dependabot lockfile workflow (`dependabot-lockfile.yml`), to push relocked lockfiles | A Dependabot secret (Settings → Secrets and variables → Dependabot) | A fine-grained token with Contents read and write on this repository only. Without it the lockfile still lands, but the checks do not re-run. |
| Unused: `ACCESS_TOKEN` (2020), `CHROMATIC_PROJECT_TOKEN` | Nothing | Repository secrets | Delete both, and the Chromatic project behind the second. |

## Dependency updates

Dependabot alerts are on. For a direct dependency, Dependabot's pull requests change a `package.json` but leave `pnpm-lock.yaml` stale. The **Dependabot lockfile** workflow relocks each of them and pushes the lockfile to the pull request's branch, using the `DEPENDABOT_LOCKFILE_TOKEN` Dependabot secret (a fine-grained token with Contents read and write on this repository) so the checks run again on the new commit. If the secret is missing or expired, the workflow still pushes, with `GITHUB_TOKEN`, but no checks run: close and reopen the pull request to start them, or relock by hand with `pnpm install` on its branch.

## Issue triage

The triage and issue managing process will look like this:

1. New issues will automatically added the "status:needs_triage".
2. Once maintainers review the issue, they will remove the "status:needs_triage" label, add new ones and close the issue.
3. The Britecharts community will upvote the issues they want to be addressed by viewing the [features](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Afeature+-label:status:completed) and [bug](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Abug+-label:status:completed) lists and reacting with a 👍.
4. Britecharts maintainers and community will tackle the features and bugs as they fit their roadmap and taking into account their popularity.

We've found labels to be useful for cataloging and marking progress on features and bugs. You can read about our labels on the [issue labeling topic document](https://britecharts.github.io/britecharts/docs/topics/github-labels).