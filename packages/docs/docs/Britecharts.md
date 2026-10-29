---
 sidebar_position: 1 
---
 # Britecharts

> Finished, accessible charts that any page, and any agent, can add with one script tag or one validated JSON config.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![test workflow](https://github.com/britecharts/britecharts/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/britecharts/britecharts/actions/workflows/unit-tests.yml) [![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/britecharts/britecharts)](https://github.com/britecharts/britecharts/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc) [![](https://data.jsdelivr.com/v1/package/npm/britecharts/badge)](https://www.jsdelivr.com/package/npm/britecharts)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md) [![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-) [![Twitter Follow](https://img.shields.io/twitter/follow/britecharts.svg?style=social&label=Follow)](https://twitter.com/Britecharts/followers)

| [![Bar Chart][barchartimg]][barchart-story] | [![Line Chart][linechartimg]][linechart-story] | [![Donut Chart][donutchartimg]][donutchart-story] |
| --- | --- | --- |
| [![Stacked Bar Chart][stackedbarchartimg]][stackedbarchart-story] | [![Stacked Area Chart][stackedareachartlargeimg]][stackedareachart-story] | [![Grouped Bar Chart][groupedbarchartimg]][groupedbarchart-story] |
| [![Sparkline Chart][sparklinechartimg]][sparklinechart-story] | [![Legend Chart][legendchartimg]][donutchart-story] | [![Brush Chart][brushchartimg]][brushchart-story] |

<div align="center">
  <a href="https://britecharts.github.io/britecharts/docs/tutorials/getting-started">Quickstart</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/docs/tutorials/tutorials-index">Tutorials</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/">Docs</a>
  <span> · </span>
  <a href="https://github.com/britecharts/britecharts/tree/main/packages/integration/consumers">Test Projects</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/storybook/">Storybook</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/docs/how-tos/contributor-how-to-guides">Contribute</a>
  <br />
  Support: <a href="https://twitter.com/britecharts">Twitter</a>, <a href="https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">Issues</a>
  <span> & </span>
  <a href="https://d3js.slack.com/messages/tool-britecharts/">Slack</a>
</div>
<br/>

Britecharts is a library of finished [D3.js][d3] charts: bar, line, donut, stacked and grouped bar, stacked area, scatter plot, heatmap, sparkline, bullet and brush, plus a tooltip and a legend. You choose a chart, give it data and a few settings, and get a polished, interactive, accessible chart that works the same in plain HTML, any framework or React.

## Why Britecharts

### Finished charts, not a grammar
Grammar libraries hand you scales, marks and axes to assemble. Britecharts hands you a bar chart. Every chart shares one vocabulary (`width`, `colorSchema`, `isLoading`, `numberFormat`, `exportChart`, `a11yTitle`) and comes with loading and empty states, animation, tooltips and export already built. There are fewer ways to go wrong, for people and for coding agents alike.

### Accessible by default, and free
Every chart is accessible without any setup:
-   🔊 **Named for screen readers**, with its data as a table they can read cell by cell.
-   ⌨️ **Keyboard navigable**: tab to a chart, move between data points with the arrow keys, and the tooltip follows focus.
-   🎞 **Still when the reader asks for reduced motion.**
-   🎨 **A colour-blind-safe palette**, Okabe–Ito, one setting away.

Commercial libraries charge per seat for this set. In Britecharts it is on by default, and each part can be turned off.

### One script tag or one config, in any page
The vanilla core runs anywhere: a server-rendered template, a static site, a Web Component, or an AI sandbox that only allows CDN scripts. The same chart is available as a framework-agnostic wrapper and as a React component. And because a chart is a name, a configuration and data, it can be written down as a JSON spec that a schema checks before it's drawn.

### Made for coding agents too
Agents write Britecharts correctly on the first try more often when the library helps them:
-   📄 **[llms.txt][llms-txt]** and **llms-full.txt** describe every chart and accessor.
-   🧠 **An agent skill** ships inside `@britecharts/core`, with each chart's data shape, accessors and common traps.
-   ✅ **A JSON Schema for every chart's spec**, so an editor or an agent can validate a config without running it.
-   💬 **Errors that say how to fix them**: a misspelt key gets "did you mean `height`?" and a link to the chart's API page, and a value of the wrong type says what it should be.

## What's New in Version 3

Version 3 is a rewrite of Britecharts in TypeScript, on D3 v7, as three packages: [`@britecharts/core`][core-package], [`@britecharts/wrappers`][wrappers-package] and [`@britecharts/react`][react-package].

-   **Accessibility built in.** Named charts, [data tables and keyboard navigation][a11y-howto], reduced motion and the Okabe–Ito palette, all on by default.
-   **[Theming and dark mode][theming-howto]** with standard CSS. Every colour around the data is a `--bc-*` custom property, and the charts follow the page's `color-scheme` through `light-dark()`.
-   **[Export to SVG or PNG][export-howto]** from one call: `exportChart('chart.svg')`.
-   **[Chart specs and JSON Schemas][spec-howto]**, generated from the TypeScript types, with value checks in the wrappers.
-   **TypeScript types** for every chart's data, configuration and React props.
-   **Every chart in every package**, the brush and heatmap included, and **one tooltip** for all of them.
-   **Responsive by default**: every svg scales to fit its container, with no resize listeners.
-   **Negative values** in the bar, grouped bar, stacked bar, brush and scatter plot charts, and **loading states** on every chart.
-   **Smaller bundles**: ES modules that tree-shake, so an app only ships the charts it imports.

Coming from version 2? Read the [migration guide][migration-guide].

## Quick Start

### From a CDN, with no build step

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/styles/bundle/britecharts.min.css" />
<script src="https://cdn.jsdelivr.net/npm/d3-selection@3.0.0/dist/d3-selection.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@britecharts/core/dist/cdn/bundle/core.cdn.min.js"></script>

<div class="bar-container"></div>

<script>
    const barChart = core.bar().height(300).a11yTitle('Signups by plan');

    d3.select('.bar-container')
        .datum([
            { name: 'Pro', value: 412 },
            { name: 'Team', value: 236 },
            { name: 'Free', value: 1200 },
        ])
        .call(barChart);
</script>
```

### From npm

```bash
npm install @britecharts/core d3-selection
```

```js
import { select } from 'd3-selection';
import { bar } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const barChart = bar().isHorizontal(true).height(300).a11yTitle('Signups by plan');

select('.bar-container').datum(data).call(barChart);
```

### With React

```bash
npm install @britecharts/react
```

```jsx
import { Bar } from '@britecharts/react';

<Bar data={data} isHorizontal a11yTitle="Signups by plan" />;
```

To use Britecharts with another framework, use the `create`, `update` and `destroy` methods of the [wrappers package][wrappers-package]. For Angular, check out [ngx-britecharts][angularwrapper].

### As a JSON spec

```json
{
    "$schema": "https://britecharts.github.io/britecharts/schema/v3/bar.json",
    "chart": "bar",
    "config": { "isHorizontal": true, "a11yTitle": "Signups by plan" },
    "data": [{ "name": "Pro", "value": 412 }]
}
```

Editors validate and complete it from the schema, and `BarWrapper.create(element, spec.data, spec.config)` draws it.

## Charts

Every chart shares the common accessors (`width`, `height`, `margin`, `colorSchema`, `isLoading`, `a11yTitle` and so on) and adds its own:

-   [API][line-docs], [Demo][linechart-story] Line Chart
-   [API][bar-docs], [Demo][barchart-story] Bar Chart
-   [API][donut-docs], [Demo][donutchart-story] Donut Chart
-   [API][stacked-bar-docs], [Demo][stackedbarchart-story] Stacked Bar Chart
-   [API][grouped-bar-docs], [Demo][groupedbarchart-story] Grouped Bar Chart
-   [API][stacked-area-docs], [Demo][stackedareachart-story] Stacked Area Chart
-   [API][scatter-docs], [Demo][scatterplot-story] Scatter Plot
-   [API][heatmap-docs], [Demo][heatmap-story] Heatmap
-   [API][sparkline-docs], [Demo][sparklinechart-story] Sparkline Chart
-   [API][bullet-docs], [Demo][bulletchart-story] Bullet Chart
-   [API][brush-docs], [Demo][brushchart-story] Brush Chart
-   [API][tooltip-docs], [Demo][linechart-story] Tooltip, and its [single-value preset][mini-tooltip-docs]
-   [API][legend-docs], [Demo][donutchart-story] Legend

[line-docs]: https://britecharts.github.io/britecharts/docs/API/line
[bar-docs]: https://britecharts.github.io/britecharts/docs/API/bar
[donut-docs]: https://britecharts.github.io/britecharts/docs/API/donut
[stacked-bar-docs]: https://britecharts.github.io/britecharts/docs/API/stacked-bar
[grouped-bar-docs]: https://britecharts.github.io/britecharts/docs/API/grouped-bar
[bullet-docs]: https://britecharts.github.io/britecharts/docs/API/bullet
[brush-docs]: https://britecharts.github.io/britecharts/docs/API/brush
[scatter-docs]: https://britecharts.github.io/britecharts/docs/API/scatter-plot
[heatmap-docs]: https://britecharts.github.io/britecharts/docs/API/heatmap
[sparkline-docs]: https://britecharts.github.io/britecharts/docs/API/sparkline
[stacked-area-docs]: https://britecharts.github.io/britecharts/docs/API/stacked-area
[mini-tooltip-docs]: https://britecharts.github.io/britecharts/docs/API/tooltip#minitooltip-the-single-value-preset
[tooltip-docs]: https://britecharts.github.io/britecharts/docs/API/tooltip
[legend-docs]: https://britecharts.github.io/britecharts/docs/API/legend

Britecharts is built with the [reusable chart pattern][mike-chart] on plain D3.js code you can read, fork and modify, and every chart is covered by unit tests and by browser tests in real consumer apps. To customise the look, see [Styling Britecharts][stylingbritecharts].

## See Also

-   [Documentation Homepage][docs-homepage]
-   [Getting Started Guide][gettingstarted]
-   [Tutorials][tutorialsindex]
-   [How To Guides][howtoindex]
-   [Topics][topicsindex]
-   [Contributing Guide][contributing-guide]
-   [Github Repo][main-repository]
-   [Changelog][changelog]

## Community Roadmap
This project is in active development. We want your input about what is important, for that, add your votes using the 👍 reaction:
* [Top Feature Requests](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Afeature+-label:status:completed)
* [Documentation Requests](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Adocumentation+-label:status:completed)
* [Top Bugs](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Abug+-label:status:completed)

## How to Contribute

Whether you're helping us fix bugs, improving the docs, or spreading the word, we'd love to have you as part of the Britecharts community!

To give your feedback, you can open a new issue. You can also find us in the [D3.js slack group][d3slack], in the **#tool-britecharts** channel. We are looking for contributors and committers, so if you want to become a part of this project, check the [contributing guide][contributing-guide] for ideas on contributing and get started today!

## Code of Conduct

Britecharts is dedicated to building a welcoming, diverse, and safe community. We expect everyone participating in the Britecharts community to abide by our [Code of Conduct][code-conduct]. Please read it and follow it.

## Acknowledgments

[Sun Dai][sunsdribble] designs Britecharts, and two books inspired the code, [Developing a D3.js Edge][d3-edge] and [Mastering D3.js][mastering-d3]. It also leveraged a significant number of examples and articles from the [D3.js][d3] community overall.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table class="contributors-table">
  <tr>
    <td align="center"><a href="http://dalerasrorov.github.io/"><img src="https://avatars2.githubusercontent.com/u/9118852?v=4" width="100px;" alt=""/><br /><sub><b>Daler Asrorov</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=DalerAsrorov" title="Code">💻</a> <a href="https://github.com/britecharts/britecharts/commits?author=DalerAsrorov" title="Documentation">📖</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Maintenance">🚧</a> <a href="https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3ADalerAsrorov" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/britecharts/britecharts/commits?author=DalerAsrorov" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ryanwholey"><img src="https://avatars0.githubusercontent.com/u/8100360?v=4" width="100px;" alt=""/><br /><sub><b>Ryan Wholey</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=ryanwholey" title="Code">💻</a> <a href="https://github.com/britecharts/britecharts/commits?author=ryanwholey" title="Documentation">📖</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Maintenance">🚧</a> <a href="https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3Aryanwholey" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/britecharts/britecharts/commits?author=ryanwholey" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jchen85"><img src="https://avatars2.githubusercontent.com/u/14088460?v=4" width="100px;" alt=""/><br /><sub><b>jchen85</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=jchen85" title="Code">💻</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Maintenance">🚧</a> <a href="https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3Ajchen85" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/britecharts/britecharts/commits?author=jchen85" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ImADrafter"><img src="https://avatars3.githubusercontent.com/u/44379989?v=4" width="100px;" alt=""/><br /><sub><b>Marcos Gómez</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=ImADrafter" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ajdani"><img src="https://avatars1.githubusercontent.com/u/16606530?v=4" width="100px;" alt=""/><br /><sub><b>ajdani</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/issues?q=author%3Aajdani" title="Bug reports">🐛</a> <a href="https://github.com/britecharts/britecharts/commits?author=ajdani" title="Code">💻</a> <a href="https://allcontributors.org/en/reference/emoji-key/" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/shayh"><img src="https://avatars3.githubusercontent.com/u/366321?v=4" width="100px;" alt=""/><br /><sub><b>shayh</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=shayh" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any kind are welcome!

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[https://www.apache.org/licenses/LICENSE-2.0][license-original]

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Read more in the [license document][britecharts-license]

[core-package]: https://britecharts.github.io/britecharts/docs/packages/core-readme
[wrappers-package]: https://britecharts.github.io/britecharts/docs/packages/wrappers-readme
[llms-txt]: https://britecharts.github.io/britecharts/llms.txt
[a11y-howto]: https://britecharts.github.io/britecharts/docs/how-tos/user-how-to-guides#how-to-make-a-chart-accessible
[theming-howto]: https://britecharts.github.io/britecharts/docs/how-tos/user-how-to-guides#how-to-theme-a-chart-and-support-dark-mode
[export-howto]: https://britecharts.github.io/britecharts/docs/how-tos/user-how-to-guides#how-to-export-a-chart
[spec-howto]: https://britecharts.github.io/britecharts/docs/how-tos/user-how-to-guides#how-to-describe-a-chart-as-a-spec-and-check-it
[migration-guide]: https://britecharts.github.io/britecharts/docs/how-tos/migration-guide-2-to-3
[heatmap-story]: https://britecharts.github.io/britecharts/docs/API/heatmap 'Check the API reference'
[d3]: https://d3js.org/
[mike-chart]: https://bost.ocks.org/mike/chart/
[changelog]: https://github.com/britecharts/britecharts/blob/main/CHANGELOG.md
[license-original]: https://www.apache.org/licenses/LICENSE-2.0
[britecharts-license]: https://github.com/britecharts/britecharts/blob/main/LICENSE.md
[d3-edge]: https://www.goodreads.com/book/show/22252178-developing-a-d3-js-edge
[mastering-d3]: https://www.packtpub.com/web-development/mastering-d3js
[docs-homepage]: https://britecharts.github.io/britecharts/
[storybook]: https://britecharts.github.io/britecharts/docs/tutorials/tutorials-index
[main-repository]: https://github.com/britecharts/britecharts
[gettingstarted]: https://britecharts.github.io/britecharts/docs/tutorials/getting-started
[contributing-guide]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
[d3-selection]: https://github.com/d3/d3-selection
[cdndemo]: https://britecharts.github.io/britecharts/docs/tutorials/installing-britecharts
[cdnhome]: https://www.jsdelivr.com/package/npm/britecharts
[jsbinsandbox]: https://jsbin.com/wativun/3/edit?html,js,output
[codepensandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[codependemos]: https://codepen.io/Britecharts/pens/forked/
[angularwrapper]: https://github.com/colapdev/ngx-britecharts
[angularwrapperdemos]: https://colapdev.github.io/ngx-britecharts/
[twitter]: https://twitter.com/britecharts
[sunsdribble]: https://dribbble.com/sundai
[d3slack]: https://d3js.slack.com/messages/tool-britecharts/
[proposals]: https://github.com/britecharts/britecharts/issues?q=is%3Aopen+label%3A%22Type%3A+Feature%22+sort%3Aupdated-desc
[release4project]: https://github.com/britecharts/britecharts/issues
[barchart-story]: https://britecharts.github.io/britecharts/docs/API/bar 'Check the API reference'
[linechart-story]: https://britecharts.github.io/britecharts/docs/API/line 'Check the API reference'
[donutchart-story]: https://britecharts.github.io/britecharts/docs/API/donut 'Check the API reference'
[scatterplot-story]: https://britecharts.github.io/britecharts/docs/API/scatter-plot 'Check the API reference'
[sparklinechart-story]: https://britecharts.github.io/britecharts/docs/API/sparkline 'Check the API reference'
[stackedareachart-story]: https://britecharts.github.io/britecharts/docs/API/stacked-area 'Check the API reference'
[brushchart-story]: https://britecharts.github.io/britecharts/docs/API/brush 'Check the API reference'
[bulletchart-story]: https://britecharts.github.io/britecharts/docs/API/bullet 'Check the API reference'
[stackedbarchart-story]: https://britecharts.github.io/britecharts/docs/API/stacked-bar 'Check the API reference'
[groupedbarchart-story]: https://britecharts.github.io/britecharts/docs/API/grouped-bar 'Check the API reference'
[stackedarea-story]: https://britecharts.github.io/britecharts-react/#stacked-area-chart 'Check the Demo'
[barchartimg]: https://britecharts.github.io/britecharts/img/thumbnails/bar-chart.png
[linechartimg]: https://britecharts.github.io/britecharts/img/thumbnails/line-chart.png
[donutchartimg]: https://britecharts.github.io/britecharts/img/thumbnails/donut-chart.png
[sparklinechartimg]: https://britecharts.github.io/britecharts/img/thumbnails/sparkline-chart.png
[stackedareachartlargeimg]: https://britecharts.github.io/britecharts/img/thumbnails/stacked-area-chart-large.png
[brushchartimg]: https://britecharts.github.io/britecharts/img/thumbnails/brush-chart.png
[stackedbarchartimg]: https://britecharts.github.io/britecharts/img/thumbnails/stacked-bar-chart.png
[groupedbarchartimg]: https://britecharts.github.io/britecharts/img/thumbnails/grouped-bar-chart.png
[legendchartimg]: https://britecharts.github.io/britecharts/img/thumbnails/legend-chart.png
[tutorialsindex]: https://britecharts.github.io/britecharts/docs/tutorials/tutorials-index
[howtoindex]: how-tos/how-to-index
[topicsindex]: topics/topics-index
[stylingbritecharts]: https://britecharts.github.io/britecharts/docs/tutorials/styling-charts
[code-conduct]: https://github.com/britecharts/britecharts/blob/main/CODE_OF_CONDUCT.md
[britecharts-react]: https://britecharts.github.io/britecharts-react/
[github-projects]: https://github.com/orgs/britecharts/projects
[react-package]: https://britecharts.github.io/britecharts/docs/packages/react-readme
