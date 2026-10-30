# Britecharts examples

Small apps that use Britecharts the way you would: they install `@britecharts/core` and `@britecharts/react` from npm, not from this repository. Each draws a bar chart and a line chart with their tooltips, switches between light and dark mode, and moves through the data with the keyboard.

| Example | Open it |
| --- | --- |
| [Plain JavaScript](./vanilla), with Vite | [StackBlitz](https://stackblitz.com/github/britecharts/britecharts/tree/main/examples/vanilla?file=main.js) |
| [React](./react), with Vite | [StackBlitz](https://stackblitz.com/github/britecharts/britecharts/tree/main/examples/react?file=src/App.jsx) |

To run one on your machine, copy its folder, then run `npm install` and `npm run dev`.

They sit outside the pnpm workspace on purpose, so they always run against the published packages.
