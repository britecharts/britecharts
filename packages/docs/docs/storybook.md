---
sidebar_position: 7
---

# Storybook

Every chart and every React component has a Storybook story, and the stories
are the demos: browse them at
[britecharts.github.io/britecharts/storybook](https://britecharts.github.io/britecharts/storybook/).

That page is a *composed* Storybook. It has an introduction and the changelog
of its own, and pulls in two others as sections:

| Section | Package | Direct link |
|---|---|---|
| Britecharts Core | `@britecharts/core` | [/storybook/core](https://britecharts.github.io/britecharts/storybook/core/) |
| Britecharts React | `@britecharts/react` | [/storybook/react](https://britecharts.github.io/britecharts/storybook/react/) |

All three are built and deployed with the documentation on every push to
`main`, so they always show what is on `main`.

## Running them locally

```sh
yarn demos
```

starts core on port 2001, React on 2002 and the composed shell on 2000. See
the [contributing guide](https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md)
for the details.

## Visual review

The core and React Storybooks are also published to Chromatic from every pull
request, where maintainers review visual changes story by story. That is a
review tool, not a public site: the links above are the ones to share.
