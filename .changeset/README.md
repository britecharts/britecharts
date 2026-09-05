# Changesets

This folder is how Britecharts records what changed and decides the next
version number. [Full documentation.](https://github.com/changesets/changesets)

## Adding a change

After making a change that users would notice, run:

```sh
yarn changeset
```

Pick the affected packages, pick major / minor / patch, and write a line that
will appear in the changelog. That writes a small markdown file here — commit
it alongside your change.

Changes nobody outside the repo would notice (CI config, tests, internal
refactors) don't need one.

## Releasing

`@britecharts/core`, `@britecharts/wrappers` and `@britecharts/react` are a
**fixed** group: they always share a version number, so a bump to one bumps
all three. `@britecharts/docs` and `@britecharts/demos` are private and never
published.

```sh
yarn version-packages   # applies the changesets, bumps versions, writes changelogs
yarn release            # builds, then publishes every public package
```

`yarn release` publishes with `yarn npm publish`, not `npm publish`, because
Yarn is what resolves the `workspace:^` ranges between these packages into
real version numbers at pack time.
