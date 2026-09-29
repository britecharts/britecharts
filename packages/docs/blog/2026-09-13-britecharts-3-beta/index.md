---
slug: britecharts-3-beta
title: Britecharts 3.0 beta
authors: [marcos]
tags: [releases]
---

Britecharts 3.0 is in beta. I split it into three packages this time — `@britecharts/core` for the charts themselves, `@britecharts/react` for the React components, and `@britecharts/wrappers`, the layer the React components are built on and, I hope, the seam a Vue or Svelte binding will eventually grow out of.

```sh
npm install @britecharts/core@beta
```

<!-- truncate -->

## What is new

There is more here than a version bump, so let me go through it in the order I think you will actually notice it:

- **Modern modules.** Built on the current d3 modules, shipped as ES modules, CommonJS, UMD and CDN builds, with an `exports` map and TypeScript typings for every chart. Vite, Rollup, esbuild and webpack all work out of the box, which was not true of v2 — every bundler had its own workaround, and I was tired of maintaining them.
- **Smaller bundles.** The build now targets ES2020, and Babel is gone entirely from `@britecharts/core` and `@britecharts/wrappers` — the core UMD bundle drops 12.7% (151,923 → 132,626 bytes) and the React bundle 14% (368 → 315 KB). You do not need to do anything for this one; a browser below the new target already needs a bundler or its own polyfills to run modern syntax at all, so nothing that worked before stops working now.
- **One tooltip.** `tooltip` and `miniTooltip` used to be two components with two sets of bugs. They are one now, and it never gets cut off at the chart's edges, follows the pointer smoothly, and behaves the same way whichever chart it is attached to.
- **Negative values** on the bar, stacked bar, grouped bar and brush charts, stacking down from zero. This has been the second-most-requested thing since 2019, and the reason it took this long is that I kept underestimating how much of the domain math assumed zero was the floor.
- **Loading states** for every chart, `colorMap` to name the colour of each category, `animationDuration` on every animated chart, and charts that are responsive by default.
- **React 19** is tested end to end, not just claimed: the unit suite itself now runs on React 19, and the React package is also installed into a real React 19 project under `StrictMode` on every change. If you have been holding off upgrading because you weren't sure the wrappers would survive `StrictMode`'s double-invoked effects, that is exactly what this checks.

## Moving from version 2

Most of the work is renaming, and I tried to keep it that way on purpose — a rewrite nobody can follow is worse than a major version nobody wants to install. The [migration guide](/docs/how-tos/migration-guide-2-to-3) walks through every breaking change with a before and after for each. The ones you will hit first:

1. **Imports.** The charts are named exports of `@britecharts/core` (`import { bar } from '@britecharts/core'`) instead of files under `britecharts/dist/umd`. The CommonJS, UMD and CDN paths are in the guide too.
2. **Loading states.** `loadingState()` is gone; render the chart with `isLoading(true)` and a dataset, empty or not.
3. **Renamed accessors.** `locale` is `valueLocale` on the bar, grouped bar, stacked bar and scatter plot; the value formatters of the grouped and stacked bar are `numberFormat`; the line and stacked area swap `xAxisFormat` and `xAxisCustomFormat` back to what their names say; `aspectRatio` is removed.
4. **Tooltips.** The line, stacked area, stacked bar and grouped bar charts now dispatch `customMouseMove` the same way every other chart does, as `(dataPoint, [x, y], [width, height], colorMap)`. If you drive `tooltip.update` yourself, it still accepts the old argument order and warns once.
5. **`exportChart`** returns a promise.

Version 2 ends at 2.18.4. I am not going to pretend I will keep patching it once 3.0 ships, so if you are on v2 and this list looks manageable, better to do it now than after a security report forces the question.

## Where to start

- The [installation](/docs/tutorials/installing-britecharts) and [getting started](/docs/tutorials/getting-started) tutorials build a first chart from scratch, and [styling charts](/docs/tutorials/styling-charts) covers themes and CSS.
- The [API reference](/docs/API/bar) has a page per chart and one for the [tooltip](/docs/API/tooltip).
- The [Storybook](pathname:///storybook/) shows every chart, in core and in React, with its options live — that is usually faster than reading accessor names off a page.

## Tell us what breaks

A beta is only useful if people actually try to break it, so please do. Open an [issue](https://github.com/britecharts/britecharts/issues) with the chart, the data and what you expected instead — the more specific, the faster I can act on it.

I will also say plainly what the [contributing guide](https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md) says: Britecharts needs maintainers. I have carried this release mostly on my own, and a 3.7k-star library with one person behind it is not a sustainable place to leave it. If any part of this codebase is something you would enjoy owning, that guide is where to start the conversation.
