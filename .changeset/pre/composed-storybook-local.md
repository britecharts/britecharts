---
'@britecharts/react': patch
---

Fix the React Storybook preview crashing on load.

`.storybook/main.js` adds a babel-loader rule so Storybook's nested React preset
does not leave JSX unparsed. It was scoped with `exclude: /node_modules/`, which
also swept in `storybook-stories.js` — the entry module Storybook generates at
the root of the package. That entry is `async`, this package's babel config sets
`forceAllTransforms`, and nothing loads `regeneratorRuntime`, so the preview died
with `ReferenceError: regeneratorRuntime is not defined` before a single story
rendered. The rule is now scoped by `include` to this package's own sources.
