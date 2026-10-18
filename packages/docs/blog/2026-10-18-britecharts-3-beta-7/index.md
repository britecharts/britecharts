---
slug: britecharts-3-beta-7
title: Britecharts 3.0 beta 7, the last beta
authors: [marcos]
tags: [releases]
---

Britecharts 3.0.0-beta.7 is out, and it is the last beta. The next release I plan to publish is 3.0.0 itself. Test against this version if you want your bug fixed before the stable release rather than after it.

```sh
npm install @britecharts/core@beta
```

<!-- truncate -->

## What changed since the first beta

When I announced the beta in September, I said it held more than a version bump. The betas since then have made the packages behave the way modern tooling expects. They also fixed the places where the charts said one thing and did another. Here is what you will notice:

- **One bundle per package, built with Vite.** Version 2 published a file for every chart. Version 3 now publishes one UMD bundle and one CDN bundle per package, plus ES modules for bundlers. Bundlers already drop the charts you do not import, so a file per chart saved nothing there. On a page with a script tag, one request is better than five.
- **Real ES module packages.** The three packages declare `"type": "module"`, so `import` works in Node as well as in bundlers, with matching types for each way of loading. `require` still works and loads the CommonJS bundle, which now ends in `.cjs`.
- **Charts that screen readers can name.** Every chart gives its svg a role and an accessible name, "Bar chart" by default. Set `a11yTitle` to name it after what it shows. Set `a11yDescription` to add a sentence about what it means.
- **Negative values in the scatter plot.** Its value axis now runs below zero when the data does, and each circle's size shows the size of its value. That completes the negative values work: the bar, grouped bar, stacked bar, brush and scatter plot charts all draw them.
- **Typings that match the charts.** I compared every chart's published types with what it does at run time, and fixed more than a hundred mismatches. Getters were declared as setters, callbacks had the wrong return type, and accessors were declared but never existed. If TypeScript accepts a call now, the chart does what the call says.
- **Smaller fixes you may have hit.** The brush honours `locale` and the stacked area honours `numberFormat`, which both used to do nothing. The scatter plot's zoom works again. The grouped and stacked bar tooltips no longer flicker when you move across the bars. Resting the pointer on a chart no longer pops up the browser's own tooltip.
- **Tooltips that say what each chart needs.** The charts name the fields of the data they send the tooltip differently. Some of them need the tooltip told where to look: `topicLabel('values')` for the stacked area, `nameLabel('stack')` or `nameLabel('group')` for the stacked and grouped bars, `valueLabel('y')` for the scatter plot. The [tooltip reference](/docs/API/tooltip) and a new [how-to](/docs/how-tos/user-how-to-guides) list them per chart. Every story shows them in use.
- **Leaner API pages.** Each accessor's heading starts with its name instead of `exports.`, in the pages and in their tables of contents.
- **In React,** `Tooltip` infers its data type from its `data` prop, so its `render` callback type-checks without a cast. Seven settings the charts always had are now props, and `prop-types` is no longer a peer dependency.

## What to check before you upgrade

If you tried an earlier beta, five changes in this stretch can break your code. The [migration guide](/docs/how-tos/migration-guide-2-to-3) covers each of them with a before and after:

1. **Per-chart files are gone.** Import the charts from the package, or load `dist/cdn/bundle/core.cdn.min.js` and use the `core` global.
2. **CommonJS bundles end in `.cjs`.** This matters only if you required a bundle by its path.
3. **The bullet chart and the sparkline no longer draw titles.** Text inside an svg cannot wrap and ignores your page's typography, so put the label in your own markup and pass the same text to `a11yTitle`.
4. **An accessor you have not set reads `null`,** on every chart. Before, some charts returned `undefined`. A truthiness check works as before.
5. **The data-key accessors are gone.** `nameLabel`, `valueLabel`, `dateLabel` and the rest no longer let a chart read your data under other keys. They had warned since version 2 that they would go. Rename the keys in your data to the ones the chart's data shape names, such as `name` and `value`. The tooltip keeps its own four.

If you are coming from version 2, the guide has the full list. Version 2 ends at 2.18.2.

## What happens next

Between now and 3.0.0, I only plan to fix bugs. The API is settled, so if something in it is wrong, now is the last cheap moment to say so. After 3.0.0 ships, changing it means another major version.

So please try this beta in a real project. Open an [issue](https://github.com/britecharts/britecharts/issues) with the chart, the data and what you expected. The [Storybook](pathname:///storybook/) shows every chart and its options, in core and in React. It is the fastest way to check whether something is a bug or a setting.

Britecharts still needs maintainers. If you would like to own part of it, the [contributing guide](https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md) is where to start.
