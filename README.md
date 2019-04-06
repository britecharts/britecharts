# Britecharts
> Britecharts is a client-side **reusable Charting Library** based on [D3.js v5][1] that offers easy and intuitive use of charts and components that can be composed together to create amazing visualizations.

[![Build Status](https://travis-ci.org/eventbrite/britecharts.svg?branch=master)](https://travis-ci.org/eventbrite/britecharts)
[![npm version](https://badge.fury.io/js/britecharts.svg)](https://badge.fury.io/js/britecharts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md)
[![Twitter Follow](https://img.shields.io/twitter/follow/britecharts.svg?style=social&label=Follow)](https://twitter.com/Britecharts/followers)

| [![Bar Chart][barChartImg]][barChartDemo] | [![Line Chart][lineChartImg]][lineChartDemo] | [![Donut Chart][donutChartImg]][donutChartDemo] |
| ------ | ----- | ----- |
| [![Stacked Bar Chart][stackedBarChartImg]][stackedBarChartDemo] | [![Stacked Area Chart][stackedAreaChartLargeImg]][stackedAreaChartDemo] | [![Grouped Bar Chart][groupedBarChartImg]][groupedBarChartDemo] |
| [![Sparkline Chart][sparklineChartImg]][sparklineChartDemo] | [![Legend Chart][legendChartImg]][donutChartDemo] | [![Brush Chart][brushChartImg]][brushChartDemo] |

Britecharts [components][32] have been written in ES2016 with a Test Driven methodology, so they are **fully tested**, and we are committed to keeping them that way.

## Key Features

- Reusability
- Composability
- Great design

## Usage

The typical use of Britecharts involves creating a chart using its simple API, then rendering it on a container which has previously had data applied to it. The code will look like this:

    barChart
        .width(500)
        .height(300);

    barContainer.datum(dataset).call(barChart);

## API

All the components expose some **common API methods** like width, height, and margin. Additionally, each chart or component can expose specific methods you can find in the documentation:

 - [API][25], [Demo][lineChartDemo] Line Chart
 - [API][22], [Demo][barChartDemo] Bar Chart
 - [API][21], [Demo][donutChartDemo] Donut Chart
 - [API][38], [Demo][stackedBarChartDemo] Stacked Bar Chart
 - [API][40], [Demo][groupedBarChartDemo] Grouped Bar Chart
 - [API][43], [Demo][bulletChartDemo] Bullet Chart
 - [API][23], [Demo][brushChartDemo] Brush Chart
 - [API][41], [Demo][scatterPlotDemo] Scatter Plot
 - [API][29], [Demo][sparklineChartDemo] Sparkline Chart
 - [API][30], [Demo][stackedAreaChartDemo] Stacked Area Chart
 - [API][28], [Demo][stepChartDemo] Step Chart
 - [API][26], [Demo][barChartDemo] Mini Tooltip
 - [API][27], [Demo][lineChartDemo] Tooltip
 - [API][24], [Demo][donutChartDemo] Legend

## Installation

Britecharts components are distributed in **UMD modules**, each one exposing a D3.js component written with the [Reusable API pattern][3]. To use any of the Britecharts modules, you will need to require the chart in your JS file using AMD/CommonJS modules or adding a script tag with the `src` pointing to the file. You would also need to load the [d3-selection][37] submodule to select the chart container.

```
   npm install britecharts d3-selection
```

You can also load Britecharts from our [CDN][cdnHome] as we do in this [demo][cdnDemo] page or play around in our [JSBin][jsbinSandbox] and [CodePen][codepenDemos] demo projects.

They also provide some minimal CSS styling, that can be loaded independently or as a bundle. Check our [Styling Britecharts tutorial][stylingBritecharts] to see more options.

## See Also
- [Documentation Homepage][31]
- [Getting Started Guide][gettingStarted]
- [Tutorials][tutorialsIndex]
- [How To Guides][howToIndex]
- [About Britecharts][topicsIndex]
- [Contributing Guide][35]
- [Github Repo][33]
- [Bar Chart Tutorial][screenCast][Video]
- [Release Notes][13]

## Roadmap
This project is in active development. You can check our [plans for the next release][release3Project] to see what's coming, and vote for your favorite [proposals][proposals] on the issues page.

To give your feedback, you can open a new issue. You can also find us in the [D3.js slack group][d3Slack], in the **#britecharts** channel. If you want to help, you can check the [contributing][35] guide.

If you work with Angular, check out [ngx-britecharts][angularWrapper] and their [demos][angularWrapperDemos]. We are also preparing a wrapper for React, and we will be talking about it on our [twitter][twitter].

## Acknowledgments

[Sun Dai][sunsDribble] designs Britecharts, and two books inspired the code, [Developing a D3.js Edge][19] and [Mastering D3.js][20]. It also leveraged a significant number of examples and articles from the [D3.js][1] community overall.

## Contributors ✨
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

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
[gettingStarted]: https://eventbrite.github.io/britecharts/getting-started.html
[35]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[36]: https://eventbrite.github.io/britecharts/img/logo-stripes-small.png
[37]: https://github.com/d3/d3-selection
[38]: https://eventbrite.github.io/britecharts/module-Stacked-bar.html
[40]: https://eventbrite.github.io/britecharts/module-Grouped-bar.html
[41]: https://eventbrite.github.io/britecharts/module-Scatter-plot.html
[42]: https://scrimba.com/casts/cZWm2tb
[43]: https://eventbrite.github.io/britecharts/module-Bullet.html

[cdnDemo]: https://eventbrite.github.io/britecharts/cdn.html
[cdnHome]: https://cdn.jsdelivr.net/npm/britecharts/dist/
[jsbinSandbox]: https://jsbin.com/wativun/3/edit?html,js,output
[codepenSandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[codepenDemos]: https://codepen.io/Britecharts/pens/forked/
[screenCast]: https://scrimba.com/casts/cZWm2tb
[angularWrapper]:  https://github.com/colapdev/ngx-britecharts
[angularWrapperDemos]:  https://colapdev.github.io/ngx-britecharts/
[twitter]: https://twitter.com/britecharts
[sunsDribble]: https://dribbble.com/sundai
[d3Slack]: https://d3js.slack.com/
[proposals]: https://github.com/eventbrite/britecharts/issues?q=is%3Aissue+is%3Aopen+label%3Aproposal
[release3Project]: https://github.com/eventbrite/britecharts/projects/2

[barChartDemo]: https://eventbrite.github.io/britecharts/tutorial-bar.html "Check the Demo"
[lineChartDemo]: https://eventbrite.github.io/britecharts/tutorial-line.html "Check the Demo"
[donutChartDemo]: https://eventbrite.github.io/britecharts/tutorial-donut.html "Check the Demo"
[scatterPlotDemo]: https://eventbrite.github.io/britecharts/tutorial-scatter-plot.html "Check the Demo"
[sparklineChartDemo]: https://eventbrite.github.io/britecharts/tutorial-sparkline.html "Check the Demo"
[stackedAreaChartDemo]: https://eventbrite.github.io/britecharts/tutorial-stacked-area.html "Check the Demo"
[stepChartDemo]: https://eventbrite.github.io/britecharts/tutorial-step.html "Check the Demo"
[brushChartDemo]: https://eventbrite.github.io/britecharts/tutorial-brush.html "Check the Demo"
[bulletChartDemo]: https://eventbrite.github.io/britecharts/tutorial-bullet.html "Check the Demo"
[stackedBarChartDemo]: https://eventbrite.github.io/britecharts/tutorial-stacked-bar.html "Check the Demo"
[groupedBarChartDemo]: https://eventbrite.github.io/britecharts/tutorial-grouped-bar.html "Check the Demo"
[stackedAreaDemo]: https://eventbrite.github.io/britecharts-react/#stacked-area-chart "Check the Demo"
[stackedAreaImg]: https://raw.githubusercontent.com/eventbrite/britecharts-react/master/src/docs/images/thumbnails/stacked-area.png

[barChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/bar-chart.png
[lineChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/line-chart.png
[donutChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/donut-chart.png
[sparklineChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/sparkline-chart.png
[stackedAreaChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/stacked-area-chart.png
[stackedAreaChartLargeImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/stacked-area-chart-large.png
[stepChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/step-chart.png
[brushChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/brush-chart.png
[stackedBarChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/stacked-bar-chart.png
[groupedBarChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/grouped-bar-chart.png
[legendChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/thumbnails/legend-chart.png

[tutorialsIndex]: http://eventbrite.github.io/britecharts/tutorials-index.html
[howToIndex]: http://eventbrite.github.io/britecharts/how-to-index.html
[topicsIndex]: http://eventbrite.github.io/britecharts/topics-index.html
[stylingBritecharts]: http://eventbrite.github.io/britecharts/styling-charts.html
