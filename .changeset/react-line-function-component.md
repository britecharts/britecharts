---
'@britecharts/react': major
---

`Line` is now a function component that draws through hooks, the first of the React components to move off classes.

**Breaking:**

-   `peerDependencies` for `react` and `react-dom` move from `>=15` to `>=16.8`, the first release with hooks. A React 15 or early 16 app will fail at runtime with no warning otherwise.
-   There is no `Line` instance any more: a `ref` on `<Line />` used to give the component instance, and now is not accepted (the typings say so).
-   **A re-render whose props did not change no longer redraws the chart.** `Line` used to call the chart's `update` on every render; it now compares the data and each configuration value with the last drawing (`Object.is`, field by field) and skips the update when nothing changed. A consumer who mutates their data array in place and re-renders with the same reference gets no redraw and has to pass a new array or object.

Also: the chart is created as soon as its data arrives, whichever render that is, and is not created while `data` is `null`. Previously a render without data tried to create it and threw. `destroy` runs with the node the chart was created in.
