# Maintaining Guide
> Information for Britecharts maintainers

As maintainers of the project, this is our guide. Most of the steps and guidelines in the [Contributing](./CONTRIBUTING.md) document apply here, including how to set up your environment, write code to fit the code style, run tests, craft commits and manage branches.

Beyond this, this document provides some details that would be too low-level for contributors.

## Releasing

Versioning is owned by [Changesets](../.changeset): every change to a publishable package lands with a changeset file, and the **Release** workflow keeps a "Version Packages" pull request open on `main`. Merging that pull request is the release; the same workflow then publishes through `yarn npm publish`.

Three things to know:

- **Integration is a required check on `main`.** It packs the packages with Yarn's packer, installs them into consumer projects and tests them, so the "Version Packages" pull request cannot merge with a broken tarball, a broken `require()` path, broken typings or a chart that does not render. Keep it required.
- **Yarn's packer is the authoritative one.** `yarn npm publish` is what ships, and it does not read the `files` field the way `npm pack` does (see the `exports`/`files` comments in each package.json). Never verify publish contents with `npm pack`.
- **After a publish, check what actually shipped.** The **Smoke test the published packages** workflow runs on its own after every successful Release run and installs the consumers from the npm registry, with the CDN page loading from jsDelivr. It can also be started by hand from the Actions tab for any version or dist-tag. A red run there means users are affected now.

## Issue triage

The triage and issue managing process will look like this:

1. New issues will automatically added the "status:needs_triage".
2. Once maintainers review the issue, they will remove the "status:needs_triage" label, add new ones and close the issue.
3. The Britecharts community will upvote the issues they want to be addressed by viewing the [features](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Afeature+-label:status:completed) and [bug](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Abug+-label:status:completed) lists and reacting with a 👍.
4. Britecharts maintainers and community will tackle the features and bugs as they fit their roadmap and taking into account their popularity.

We've found labels to be useful for cataloging and marking progress on features and bugs. You can read about our labels on the [issue labeling topic document](https://britecharts.github.io/britecharts/docs/topics/github-labels).