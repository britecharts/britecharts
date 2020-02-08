# Britecharts

> Britecharts is a client-side **reusable Charting Library** based on [D3.js v5][1] that offers easy and intuitive use of charts and components that can be composed together to create amazing visualizations.

[![Build Status](https://travis-ci.org/eventbrite/britecharts.svg?branch=master)](https://travis-ci.org/eventbrite/britecharts)
[![npm version](https://badge.fury.io/js/britecharts.svg)](https://badge.fury.io/js/britecharts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![Twitter Follow](https://img.shields.io/twitter/follow/britecharts.svg?style=social&label=Follow)](https://twitter.com/Britecharts/followers)

| [![Bar Chart][barchartimg]][barchartdemo]                       | [![Line Chart][linechartimg]][linechartdemo]                            | [![Donut Chart][donutchartimg]][donutchartdemo]                 |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| [![Stacked Bar Chart][stackedbarchartimg]][stackedbarchartdemo] | [![Stacked Area Chart][stackedareachartlargeimg]][stackedareachartdemo] | [![Grouped Bar Chart][groupedbarchartimg]][groupedbarchartdemo] |
| [![Sparkline Chart][sparklinechartimg]][sparklinechartdemo]     | [![Legend Chart][legendchartimg]][donutchartdemo]                       | [![Brush Chart][brushchartimg]][brushchartdemo]                 |

Britecharts [components][32] have been written in ES2016 with a Test Driven methodology, so they are **fully tested**, and we are committed to keeping them that way.

## Key Features

-   Reusability
-   Composability
-   Great design

## Usage

The typical use of Britecharts involves creating a chart using its simple API, then rendering it on a container which has previously had data applied to it. The code will look like this:

    barChart
        .width(500)
        .height(300);

    barContainer.datum(dataset).call(barChart);

## API

All the components expose some **common API methods** like width, height, and margin. Additionally, each chart or component can expose specific methods you can find in the documentation:

-   [API][25], [Demo][linechartdemo] Line Chart
-   [API][22], [Demo][barchartdemo] Bar Chart
-   [API][21], [Demo][donutchartdemo] Donut Chart
-   [API][38], [Demo][stackedbarchartdemo] Stacked Bar Chart
-   [API][40], [Demo][groupedbarchartdemo] Grouped Bar Chart
-   [API][43], [Demo][bulletchartdemo] Bullet Chart
-   [API][23], [Demo][brushchartdemo] Brush Chart
-   [API][41], [Demo][scatterplotdemo] Scatter Plot
-   [API][29], [Demo][sparklinechartdemo] Sparkline Chart
-   [API][30], [Demo][stackedareachartdemo] Stacked Area Chart
-   [API][28], [Demo][stepchartdemo] Step Chart
-   [API][26], [Demo][barchartdemo] Mini Tooltip
-   [API][27], [Demo][linechartdemo] Tooltip
-   [API][24], [Demo][donutchartdemo] Legend

## Installation

Britecharts components are distributed in **UMD modules**, each one exposing a D3.js component written with the [Reusable API pattern][3]. To use any of the Britecharts modules, you will need to require the chart in your JS file using AMD/CommonJS modules or adding a script tag with the `src` pointing to the file. You would also need to load the [d3-selection][37] submodule to select the chart container.

```
   npm install britecharts d3-selection
```

You can also load Britecharts from our [CDN][cdnhome] as we do in this [demo][cdndemo] page or play around in our [JSBin][jsbinsandbox] and [CodePen][codependemos] demo projects.

They also provide some minimal CSS styling, that can be loaded independently or as a bundle. Check our [Styling Britecharts tutorial][stylingbritecharts] to see more options.

## See Also

-   [Documentation Homepage][31]
-   [Getting Started Guide][gettingstarted]
-   [Tutorials][tutorialsindex]
-   [How To Guides][howtoindex]
-   [About Britecharts][topicsindex]
-   [Contributing Guide][35]
-   [Github Repo][33]
-   [Bar Chart Tutorial][screencast][Video]
-   [Release Notes][13]

## Roadmap

This project is in active development. You can check our [plans for the next release][release3project] to see what's coming, and vote for your favorite [proposals][proposals] on the issues page.

To give your feedback, you can open a new issue. You can also find us in the [D3.js slack group][d3slack], in the **#britecharts** channel. If you want to help, you can check the [contributing][35] guide.

If you work with Angular, check out [ngx-britecharts][angularwrapper] and their [demos][angularwrapperdemos]. We are also preparing a wrapper for React, and we will be talking about it on our [twitter][twitter].

## Acknowledgments

[Sun Dai][sunsdribble] designs Britecharts, and two books inspired the code, [Developing a D3.js Edge][19] and [Mastering D3.js][20]. It also leveraged a significant number of examples and articles from the [D3.js][1] community overall.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/DalerAsrorov"><img src="https://avatars2.githubusercontent.com/u/9118852?v=4" width="100px;" alt="Daler Asrorov"/><br /><sub><b>Daler Asrorov</b></sub></a><br /><a href="https://github.com/eventbrite/britecharts/commits?author=DalerAsrorov" title="Code">💻</a> <a href="https://github.com/eventbrite/britecharts/commits?author=DalerAsrorov" title="Documentation">📖</a> <a href="#ideas-DalerAsrorov" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-DalerAsrorov" title="Maintenance">🚧</a> <a href="#review-DalerAsrorov" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/eventbrite/britecharts/commits?author=DalerAsrorov" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/ryanwholey"><img src="https://avatars0.githubusercontent.com/u/8100360?v=4" width="100px;" alt="Ryan Wholey"/><br /><sub><b>Ryan Wholey</b></sub></a><br /><a href="https://github.com/eventbrite/britecharts/commits?author=ryanwholey" title="Code">💻</a> <a href="https://github.com/eventbrite/britecharts/commits?author=ryanwholey" title="Documentation">📖</a> <a href="#ideas-ryanwholey" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-ryanwholey" title="Maintenance">🚧</a> <a href="#review-ryanwholey" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/eventbrite/britecharts/commits?author=ryanwholey" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/jchen85"><img src="https://avatars2.githubusercontent.com/u/14088460?v=4" width="100px;" alt="jchen85"/><br /><sub><b>jchen85</b></sub></a><br /><a href="https://github.com/eventbrite/britecharts/commits?author=jchen85" title="Code">💻</a> <a href="#ideas-jchen85" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-jchen85" title="Maintenance">🚧</a> <a href="#review-jchen85" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/eventbrite/britecharts/commits?author=jchen85" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!

## License

Copyright 2019 Eventbrite

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[https://www.apache.org/licenses/LICENSE-2.0][14]

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Read more in the [license document][15]

[1]: https://d3js.org/
[2]: https://webpack.github.io/
[3]: https://bost.ocks.org/mike/chart/
[12]: https://nodejs.org/en/download/
[13]: https://github.com/eventbrite/britecharts/releases
[14]: https://www.apache.org/licenses/LICENSE-2.0
[15]: https://github.com/eventbrite/britecharts/blob/master/LICENSE.md
[16]: https://github.com/eventbrite/britecharts/issues
[17]: https://github.com/babel/babel
[19]: https://bleedingedgepress.com/our-books/developing-a-d3-js-edge/
[20]: https://www.packtpub.com/web-development/mastering-d3js
[21]: https://eventbrite.github.io/britecharts/module-Donut.html
[22]: https://eventbrite.github.io/britecharts/module-Bar.html
[23]: https://eventbrite.github.io/britecharts/module-Brush.html
[24]: https://eventbrite.github.io/britecharts/module-Legend.html
[25]: https://eventbrite.github.io/britecharts/module-Line.html
[26]: https://eventbrite.github.io/britecharts/module-Mini-tooltip.html
[27]: https://eventbrite.github.io/britecharts/module-Tooltip.html
[28]: https://eventbrite.github.io/britecharts/module-Step.html
[29]: https://eventbrite.github.io/britecharts/module-Sparkline.html
[30]: https://eventbrite.github.io/britecharts/module-Stacked-area.html
[31]: https://eventbrite.github.io/britecharts/
[32]: https://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html
[33]: https://github.com/eventbrite/britecharts
[gettingstarted]: https://eventbrite.github.io/britecharts/getting-started.html
[35]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[36]: https://eventbrite.github.io/britecharts/img/logo-stripes-small.png
[37]: https://github.com/d3/d3-selection
[38]: https://eventbrite.github.io/britecharts/module-Stacked-bar.html
[40]: https://eventbrite.github.io/britecharts/module-Grouped-bar.html
[41]: https://eventbrite.github.io/britecharts/module-Scatter-plot.html
[42]: https://scrimba.com/casts/cZWm2tb
[43]: https://eventbrite.github.io/britecharts/module-Bullet.html
[cdndemo]: https://eventbrite.github.io/britecharts/cdn.html
[cdnhome]: https://cdn.jsdelivr.net/npm/britecharts/dist/
[jsbinsandbox]: https://jsbin.com/wativun/3/edit?html,js,output
[codepensandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[codependemos]: https://codepen.io/Britecharts/pens/forked/
[screencast]: https://scrimba.com/casts/cZWm2tb
[angularwrapper]: https://github.com/colapdev/ngx-britecharts
[angularwrapperdemos]: https://colapdev.github.io/ngx-britecharts/
[twitter]: https://twitter.com/britecharts
[sunsdribble]: https://dribbble.com/sundai
[d3slack]: https://d3js.slack.com/
[proposals]: https://github.com/eventbrite/britecharts/issues?q=is%3Aissue+is%3Aopen+label%3Aproposal
[release3project]: https://github.com/eventbrite/britecharts/projects/2
[barchartdemo]: https://eventbrite.github.io/britecharts/tutorial-bar.html "Check the Demo"
[linechartdemo]: https://eventbrite.github.io/britecharts/tutorial-line.html "Check the Demo"
[donutchartdemo]: https://eventbrite.github.io/britecharts/tutorial-donut.html "Check the Demo"
[scatterplotdemo]: https://eventbrite.github.io/britecharts/tutorial-scatter-plot.html "Check the Demo"
[sparklinechartdemo]: https://eventbrite.github.io/britecharts/tutorial-sparkline.html "Check the Demo"
[stackedareachartdemo]: https://eventbrite.github.io/britecharts/tutorial-stacked-area.html "Check the Demo"
[stepchartdemo]: https://eventbrite.github.io/britecharts/tutorial-step.html "Check the Demo"
[brushchartdemo]: https://eventbrite.github.io/britecharts/tutorial-brush.html "Check the Demo"
[bulletchartdemo]: https://eventbrite.github.io/britecharts/tutorial-bullet.html "Check the Demo"
[stackedbarchartdemo]: https://eventbrite.github.io/britecharts/tutorial-stacked-bar.html "Check the Demo"
[groupedbarchartdemo]: https://eventbrite.github.io/britecharts/tutorial-grouped-bar.html "Check the Demo"
[stackedareademo]: https://eventbrite.github.io/britecharts-react/#stacked-area-chart "Check the Demo"
[stackedareaimg]: https://raw.githubusercontent.com/eventbrite/britecharts-react/master/src/docs/images/thumbnails/stacked-area.png
[barchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/bar-chart.png
[linechartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/line-chart.png
[donutchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/donut-chart.png
[sparklinechartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/sparkline-chart.png
[stackedareachartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/stacked-area-chart.png
[stackedareachartlargeimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/stacked-area-chart-large.png
[stepchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/step-chart.png
[brushchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/brush-chart.png
[stackedbarchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/stacked-bar-chart.png
[groupedbarchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/grouped-bar-chart.png
[legendchartimg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/legend-chart.png
[tutorialsindex]: http://eventbrite.github.io/britecharts/tutorials-index.html
[howtoindex]: http://eventbrite.github.io/britecharts/how-to-index.html
[topicsindex]: http://eventbrite.github.io/britecharts/topics-index.html
[stylingbritecharts]: http://eventbrite.github.io/britecharts/styling-charts.html
