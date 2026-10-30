# Britecharts examples

Small apps that use Britecharts the way you would: they install `@britecharts/core` and `@britecharts/react` from npm, not from this repository. Each draws a bar chart and a line chart with their tooltips, switches between light and dark mode, and moves through the data with the keyboard.

- [Plain JavaScript](./vanilla), with Vite
- [React](./react), with Vite

To open one in your browser, use the [Try page](https://britecharts.github.io/britecharts/try): it sends the example's files to StackBlitz, which runs it in about half a minute. Opening a folder from GitHub instead makes StackBlitz clone this whole repository first, which takes minutes.

The docs build reads these folders into the Try page (`packages/docs/scripts/copy-examples.mjs`), so a change here reaches the page on the next deploy.

To run one on your machine, copy its folder, then run `npm install` and `npm run dev`.

They sit outside the pnpm workspace on purpose, so they always run against the published packages.
