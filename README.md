# Britecharts

[![Britecharts Logo][36]][31]

> Britecharts is a client-side **reusable Charting Library** based on [D3.js v4][1] that allows easy and intuitive use of charts and components that can be composed together creating amazing visualizations.

[![Build Status](https://travis-ci.org/eventbrite/britecharts.svg?branch=master)](https://travis-ci.org/eventbrite/britecharts)
[![npm version](https://badge.fury.io/js/britecharts.svg)](https://badge.fury.io/js/britecharts)
[![Bower version](https://badge.fury.io/bo/britecharts.svg)](https://badge.fury.io/bo/britecharts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Britecharts [components][32] have been written in ES2016 with a Test Driven methodology so they are **fully tested**, and we are commited to keeping them that way.

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

All the components expose some **common API methods** like width, height and margin. Additionally, each chart or component can expose specific methods. Those can be found in the documentation:

 - [API][25], [Demo][5] Line Chart
 - [API][22], [Demo][4] Bar Chart
 - [API][21], [Demo][6] Donut Chart
 - [API][38], [Demo][39] Stacked Bar Chart
 - [API][40], [Demo][41] Grouped Bar Chart
 - [API][23], [Demo][18] Brush Chart
 - [API][29], [Demo][7] Sparkline Chart
 - [API][30], [Demo][8] Stacked Area Chart
 - [API][28], [Demo][11] Step Chart
 - [API][26], [Demo][4] Mini Tooltip 
 - [API][27], [Demo][5] Tooltip 
 - [API][24], [Demo][6] Legend 

## Installation

Britecharts components are distributed in **UMD modules**, each one exposing a D3.js component written with the [Reusable API pattern][3]. To use any of the Britecharts modules, you will need to require the chart in your JS file using AMD/CommonJS modules or adding a script tag with the `src` pointing to the file. You would also need to load the [d3-selection][37] submodule to select the chart container.

```
   npm install britecharts d3-selection
```

They also provide some minimal CSS styling, that can be loaded independently or as a bundle. 

You can also load Britecharts from our [CDN][cdnHome] as we do in this [demo][cdnDemo] page or play around in our [JSBin][jsbinSandbox] and [CodePen][codepenDemos] demo projects.

## See Also
- [Getting Started Guide][34]
- [Documentation Homepage][31]
- [Release Notes][13]
- [Contributing Guide][35]
- [Github Repo][33]
- [Bar Chart Tutorial][screenCast][Video]

## Roadmap
This project is in active development! If you want to help, you can check the [contributing][35] guide. Also review the [issues page][16] for more info on what's coming, to give your feedback, and to vote for your favorite [proposals][proposals]. You can also find us in the [D3.js slack group][d3Slack], in the **#britecharts** channel.

If you work with Angular, check out [ngx-britecharts][angularWrapper] and their [demos][angularWrapperDemos]. We are also preparing a wrapper for React, and we will be talking about it on our [twitter][twitter]. 



## Acknowledgments

[Sun Dai][sunsDribble] designs Britecharts, and two books inspired the code, [Developing a D3.js Edge][19] and [Mastering D3.js][20]. It also leveraged a significant number of examples and articles from the [D3.js][1] community overall.

## License

Copyright 2017 Eventbrite

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
[4]: https://eventbrite.github.io/britecharts/tutorial-bar.html
[5]: https://eventbrite.github.io/britecharts/tutorial-line.html
[6]: https://eventbrite.github.io/britecharts/tutorial-donut.html
[7]: https://eventbrite.github.io/britecharts/tutorial-sparkline.html
[8]: https://eventbrite.github.io/britecharts/tutorial-stacked-area.html
[9]: https://eventbrite.github.io/britecharts/tutorial-stacked-area.html
[10]: https://eventbrite.github.io/britecharts/tutorial-donut.html
[11]: https://eventbrite.github.io/britecharts/tutorial-step.html
[12]: https://nodejs.org/en/download/
[13]: https://github.com/eventbrite/britecharts/releases
[14]: https://www.apache.org/licenses/LICENSE-2.0
[15]: https://github.com/eventbrite/britecharts/blob/master/LICENSE.md
[16]: https://github.com/eventbrite/britecharts/issues
[17]: https://github.com/babel/babel
[18]: https://eventbrite.github.io/britecharts/tutorial-brush.html
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
[34]: https://eventbrite.github.io/britecharts/getting-started.html
[35]: https://github.com/eventbrite/britecharts/blob/master/CONTRIBUTING.md
[36]: https://eventbrite.github.io/britecharts/img/logo-stripes-small.png
[37]: https://github.com/d3/d3-selection
[38]: https://eventbrite.github.io/britecharts/module-Stacked-bar.html
[39]: https://eventbrite.github.io/britecharts/tutorial-stacked-bar.html
[40]: https://eventbrite.github.io/britecharts/module-Grouped-bar.html
[41]: https://eventbrite.github.io/britecharts/tutorial-Grouped-bar.html
[42]: https://scrimba.com/casts/cZWm2tb

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


