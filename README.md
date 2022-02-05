# Britecharts

> Britecharts is a client-side **reusable Charting Library** based on [D3.js v5][d3] that provides easy composition of charts and components to create amazing visualizations.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![test workflow](https://github.com/britecharts/britecharts/actions/workflows/tests.yml/badge.svg)](https://github.com/britecharts/britecharts/actions/workflows/tests.yml) [![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/britecharts/britecharts)](https://github.com/britecharts/britecharts/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc) [![](https://data.jsdelivr.com/v1/package/npm/britecharts/badge)](https://www.jsdelivr.com/package/npm/britecharts)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/britecharts/britecharts/blob/master/.github/CONTRIBUTING.md) [![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#toc8__anchor) [![Twitter Follow](https://img.shields.io/twitter/follow/britecharts.svg?style=social&label=Follow)](https://twitter.com/Britecharts/followers)

| [![Bar Chart][barchartimg]][barchartdemo] | [![Line Chart][linechartimg]][linechartdemo] | [![Donut Chart][donutchartimg]][donutchartdemo] |
| --- | --- | --- |
| [![Stacked Bar Chart][stackedbarchartimg]][stackedbarchartdemo] | [![Stacked Area Chart][stackedareachartlargeimg]][stackedareachartdemo] | [![Grouped Bar Chart][groupedbarchartimg]][groupedbarchartdemo] |
| [![Sparkline Chart][sparklinechartimg]][sparklinechartdemo] | [![Legend Chart][legendchartimg]][donutchartdemo] | [![Brush Chart][brushchartimg]][brushchartdemo] |

<h4 align="center">
  <a href="https://britecharts.github.io/britecharts/getting-started.html">Quickstart</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/tutorials-index.html">Tutorials</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/">Docs</a>
  <span> · </span>
  <a href="https://github.com/britecharts/britecharts-test-project">Test Project</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/tutorial-kitchen-sink.html">Kitchen Sink</a>
  <span> · </span>
  <a href="https://britecharts.github.io/britecharts/contributor-how-to-guides.html">Contribute</a>
  <br />
  Support: <a href="https://twitter.com/britecharts">Twitter</a>, <a href="https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">Issues</a>
  <span> & </span>
  <a href="https://d3js.slack.com/messages/tools-britecharts/">Slack</a>
</h2>

## Key Features

-   🛠 Reusability
-   🏗 Composability
-   🌈 Great design

Britecharts [components][kitchen-sink] have been written in ES2016 with a Test Driven methodology, so they are **fully tested**, and we are committed to keeping them that way.

## Usage

The typical use of Britecharts involves creating a chart using its simple API, then rendering it on a container which has previously had data applied to it. The code will look like this:

```js
    import { select } from 'd3-selection';
    import { bar } from 'britecharts';

    const barChart = bar();
    const barContainer = select('.bar-chart-container');
    const dataset = [...];

    barChart
        .width(500)
        .height(300);

    barContainer.datum(dataset).call(barChart);
```

## API 

All the components expose some **common API methods** like width, height, and margin. Additionally, each chart or component can expose specific methods you can find in the documentation:

-   [API][line-docs], [Demo][linechartdemo] Line Chart
-   [API][bar-docs], [Demo][barchartdemo] Bar Chart
-   [API][donut-docs], [Demo][donutchartdemo] Donut Chart
-   [API][stacked-bar-docs], [Demo][stackedbarchartdemo] Stacked Bar Chart
-   [API][grouped-bar-docs], [Demo][groupedbarchartdemo] Grouped Bar Chart
-   [API][bullet-docs], [Demo][bulletchartdemo] Bullet Chart
-   [API][brush-docs], [Demo][brushchartdemo] Brush Chart
-   [API][scatter-docs], [Demo][scatterplotdemo] Scatter Plot
-   [API][sparkline-docs], [Demo][sparklinechartdemo] Sparkline Chart
-   [API][stacked-area-docs], [Demo][stackedareachartdemo] Stacked Area Chart
-   [API][step-docs], [Demo][stepchartdemo] Step Chart
-   [API][mini-tooltip-docs], [Demo][barchartdemo] Mini Tooltip
-   [API][tooltip-docs], [Demo][linechartdemo] Tooltip
-   [API][legend-docs], [Demo][donutchartdemo] Legend

## Installation

Britecharts components are distributed in **UMD modules**, each one exposing a D3.js component written with the [Reusable API pattern][mike-chart]. To use any of the Britecharts modules, you will need to require the chart in your JS file using AMD/CommonJS modules or adding a script tag with the `src` pointing to the file. You would also need to load the [d3-selection][d3-selection] submodule to select the chart container.

```bash
   npm install --save britecharts d3-selection
   # or
   yarn add britecharts d3-selection
```

Then, in your JavaScript module file you can now import and use charts:

```js
import { bar } from 'britecharts';
import { select } from 'd3-selection';

const barChart = bar();
const container = select('#container');

const barData = [
    { name: 'Luminous', value: 2 },
    { name: 'Glittering', value: 5 },
    { name: 'Intense', value: 4 },
    { name: 'Radiant', value: 3 }
];

barChart
    .margin({ left: 100 })
    .isHorizontal(true)
    .height(400)
    .width(600);

container.datum(barData).call(barChart);
```

Britecharts comes with custom CSS - to load CSS in your html file you may include it in the `<head>` tag

```html
<link
    rel="stylesheet"
    href="./node_modules/britecharts/dist/css/britecharts.css"
/>
```

Alternatively, you can load Britecharts from our [CDN][cdnhome] as we do in this [demo][cdndemo] page or play around in our [JSBin][jsbinsandbox] and [CodePen][codependemos] demo projects. In addition, you have an option to customize CSS using new styles. Check our [Styling Britecharts tutorial][stylingbritecharts] to see more options.

## See Also

-   [Documentation Homepage][docs-homepage]
-   [Getting Started Guide][gettingstarted]
-   [Tutorials][tutorialsindex]
-   [How To Guides][howtoindex]
-   [About Britecharts][topicsindex]
-   [Contributing Guide][contributing-guide]
-   [Github Repo][main-repository]
-   [Changelog][changelog]

## Roadmap

This project is in active development. You can check our [plans for the next release][release3project] and our [projects][github-projects] to see what's coming, and vote for your favorite [proposals][proposals] on the issues page.

If you work with Angular, check out [ngx-britecharts][angularwrapper] and their [demos][angularwrapperdemos]. We are also preparing a wrapper for [React][britecharts-react], and we will be talking about it on our [twitter][twitter].

## Code of Conduct

Britecharts is dedicated to building a welcoming, diverse, and safe community. We expect everyone participating in the Britecharts community to abide by our [Code of Conduct][code-conduct]. Please read it and follow it.

## How to Contribute

Whether you're helping us fix bugs, improving the docs, or spreading the word, we'd love to have you as part of the Britecharts community!

To give your feedback, you can open a new issue. You can also find us in the [D3.js slack group][d3slack], in the **#tool-britecharts** channel. We are looking for contributors and commiters, so if you want to become a part of this project, check the [contributing][contributing-guide] guide and get started today!

Check out our Contributing Guide for ideas on contributing and setup steps for getting our repositories up and running on your local machine.

## Acknowledgments

[Sun Dai][sunsdribble] designs Britecharts, and two books inspired the code, [Developing a D3.js Edge][d3-edge] and [Mastering D3.js][mastering-d3]. It also leveraged a significant number of examples and articles from the [D3.js][d3] community overall.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table class="contributors-table">
  <tr>
    <td align="center"><a href="http://dalerasrorov.github.io/"><img src="https://avatars2.githubusercontent.com/u/9118852?v=4" width="100px;" alt=""/><br /><sub><b>Daler Asrorov</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=DalerAsrorov" title="Code">💻</a> <a href="https://github.com/britecharts/britecharts/commits?author=DalerAsrorov" title="Documentation">📖</a> <a href="#ideas-DalerAsrorov" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-DalerAsrorov" title="Maintenance">🚧</a> <a href="https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3ADalerAsrorov" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/britecharts/britecharts/commits?author=DalerAsrorov" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ryanwholey"><img src="https://avatars0.githubusercontent.com/u/8100360?v=4" width="100px;" alt=""/><br /><sub><b>Ryan Wholey</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=ryanwholey" title="Code">💻</a> <a href="https://github.com/britecharts/britecharts/commits?author=ryanwholey" title="Documentation">📖</a> <a href="#ideas-ryanwholey" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-ryanwholey" title="Maintenance">🚧</a> <a href="https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3Aryanwholey" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/britecharts/britecharts/commits?author=ryanwholey" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jchen85"><img src="https://avatars2.githubusercontent.com/u/14088460?v=4" width="100px;" alt=""/><br /><sub><b>jchen85</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=jchen85" title="Code">💻</a> <a href="#ideas-jchen85" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-jchen85" title="Maintenance">🚧</a> <a href="https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3Ajchen85" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/britecharts/britecharts/commits?author=jchen85" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ImADrafter"><img src="https://avatars3.githubusercontent.com/u/44379989?v=4" width="100px;" alt=""/><br /><sub><b>Marcos Gómez</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/commits?author=ImADrafter" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ajdani"><img src="https://avatars1.githubusercontent.com/u/16606530?v=4" width="100px;" alt=""/><br /><sub><b>ajdani</b></sub></a><br /><a href="https://github.com/britecharts/britecharts/issues?q=author%3Aajdani" title="Bug reports">🐛</a> <a href="https://github.com/britecharts/britecharts/commits?author=ajdani" title="Code">💻</a> <a href="#maintenance-ajdani" title="Maintenance">🚧</a></td>
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

[d3]: https://d3js.org/
[mike-chart]: https://bost.ocks.org/mike/chart/
[changelog]: https://github.com/britecharts/britecharts/blob/master/CHANGELOG.md
[license-original]: https://www.apache.org/licenses/LICENSE-2.0
[britecharts-license]: https://github.com/britecharts/britecharts/blob/master/LICENSE.md
[d3-edge]: https://bleedingedgepress.com/our-books/developing-a-d3-js-edge/
[mastering-d3]: https://www.packtpub.com/web-development/mastering-d3js
[donut-docs]: https://britecharts.github.io/britecharts/module-Donut.html
[bar-docs]: https://britecharts.github.io/britecharts/module-Bar.html
[brush-docs]: https://britecharts.github.io/britecharts/module-Brush.html
[legend-docs]: https://britecharts.github.io/britecharts/module-Legend.html
[line-docs]: https://britecharts.github.io/britecharts/module-Line.html
[mini-tooltip-docs]: https://britecharts.github.io/britecharts/module-Mini-tooltip.html
[tooltip-docs]: https://britecharts.github.io/britecharts/module-Tooltip.html
[step-docs]: https://britecharts.github.io/britecharts/module-Step.html
[sparkline-docs]: https://britecharts.github.io/britecharts/module-Sparkline.html
[stacked-area-docs]: https://britecharts.github.io/britecharts/module-Stacked-area.html
[docs-homepage]: https://britecharts.github.io/britecharts/
[kitchen-sink]: https://britecharts.github.io/britecharts/tutorial-kitchen-sink.html
[main-repository]: https://github.com/britecharts/britecharts
[gettingstarted]: https://britecharts.github.io/britecharts/getting-started.html
[contributing-guide]: https://github.com/britecharts/britecharts/blob/master/.github/CONTRIBUTING.md
[d3-selection]: https://github.com/d3/d3-selection
[stacked-bar-docs]: https://britecharts.github.io/britecharts/module-Stacked-bar.html
[grouped-bar-docs]: https://britecharts.github.io/britecharts/module-Grouped-bar.html
[scatter-docs]: https://britecharts.github.io/britecharts/module-Scatter-plot.html
[bullet-docs]: https://britecharts.github.io/britecharts/module-Bullet.html
[cdndemo]: https://britecharts.github.io/britecharts/cdn.html
[cdnhome]: https://cdn.jsdelivr.net/npm/britecharts/dist/
[jsbinsandbox]: https://jsbin.com/wativun/3/edit?html,js,output
[codepensandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[codependemos]: https://codepen.io/Britecharts/pens/forked/
[angularwrapper]: https://github.com/colapdev/ngx-britecharts
[angularwrapperdemos]: https://colapdev.github.io/ngx-britecharts/
[twitter]: https://twitter.com/britecharts
[sunsdribble]: https://dribbble.com/sundai
[d3slack]: https://d3js.slack.com/messages/tools-britecharts/
[proposals]: https://github.com/britecharts/britecharts/issues?q=is%3Aopen+label%3A%22Type%3A+Feature%22+sort%3Aupdated-desc
[release3project]: https://github.com/britecharts/britecharts/projects/2
[barchartdemo]: https://britecharts.github.io/britecharts/tutorial-bar.html 'Check the Demo'
[linechartdemo]: https://britecharts.github.io/britecharts/tutorial-line.html 'Check the Demo'
[donutchartdemo]: https://britecharts.github.io/britecharts/tutorial-donut.html 'Check the Demo'
[scatterplotdemo]: https://britecharts.github.io/britecharts/tutorial-scatter-plot.html 'Check the Demo'
[sparklinechartdemo]: https://britecharts.github.io/britecharts/tutorial-sparkline.html 'Check the Demo'
[stackedareachartdemo]: https://britecharts.github.io/britecharts/tutorial-stacked-area.html 'Check the Demo'
[stepchartdemo]: https://britecharts.github.io/britecharts/tutorial-step.html 'Check the Demo'
[brushchartdemo]: https://britecharts.github.io/britecharts/tutorial-brush.html 'Check the Demo'
[bulletchartdemo]: https://britecharts.github.io/britecharts/tutorial-bullet.html 'Check the Demo'
[stackedbarchartdemo]: https://britecharts.github.io/britecharts/tutorial-stacked-bar.html 'Check the Demo'
[groupedbarchartdemo]: https://britecharts.github.io/britecharts/tutorial-grouped-bar.html 'Check the Demo'
[stackedareademo]: https://britecharts.github.io/britecharts-react/#stacked-area-chart 'Check the Demo'
[stackedareaimg]: https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/stacked-area.png
[barchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/bar-chart.png
[linechartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/line-chart.png
[donutchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/donut-chart.png
[sparklinechartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/sparkline-chart.png
[stackedareachartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/stacked-area-chart.png
[stackedareachartlargeimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/stacked-area-chart-large.png
[stepchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/step-chart.png
[brushchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/brush-chart.png
[stackedbarchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/stacked-bar-chart.png
[groupedbarchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/grouped-bar-chart.png
[legendchartimg]: https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/legend-chart.png
[tutorialsindex]: http://britecharts.github.io/britecharts/tutorials-index.html
[howtoindex]: http://britecharts.github.io/britecharts/how-to-index.html
[topicsindex]: http://britecharts.github.io/britecharts/topics-index.html
[stylingbritecharts]: http://britecharts.github.io/britecharts/styling-charts.html
[code-conduct]: https://github.com/britecharts/britecharts/blob/master/CODE_OF_CONDUCT.md
[britecharts-react]: https://britecharts.github.io/britecharts-react/
[github-projects]: https://github.com/britecharts/britecharts/projects