---
'@britecharts/core': patch
'@britecharts/react': patch
---

Upgrade all three Storybooks from 6.5 to 8.6.14.

8.6.14 is the last release with `@storybook/html-webpack5`; Storybook 10 offers
only `@storybook/html-vite`, so going further means changing builder, not just
version. That is deliberately left to the Vite migration.

This is a dev-tooling change with one packaging consequence: the React package's
own webpack build was silently using `html-webpack-plugin` hoisted out of
Storybook 6's dependency tree, and never declared it. Removing Storybook 6 broke
`yarn build:react` until it was declared properly.
