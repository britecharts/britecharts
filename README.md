# Britecharts

[![Britecharts Logo][36]][31]

> Britecharts is a client-side **reusable Charting Library** based on [D3.js v4][1] that allows easy and intuitive use of charts and components that can be composed together creating amazing visualizations.

Britecharts [components][32] have been written in ES2015 with a Test Driven methodology so they are **fully tested**, and we are commited to keep them that way.

## Key Features

The main characteristics of this library are:

- Reusability
- Composability
- Fully tested
- ES2015 source code (transpiled with [Babel][17])

## Usage

The typical use of Britecharts involves creating a chart using it's simple API, and rendering it on a container which has previously been applied some data. The code will look like this:

    barChart
        .width(500)
        .height(300);

    barContainer.datum(dataset).call(barChart);

## API

All the components expose some basic API methods like width, height and margin. Additionally, each chart or component can expose more methods. They will be ready to check in the documentation of the modules:

 - Bar Chart: [API][22] - [Demo][4]
 - Line Chart: [API][25] - [Demo][5]
 - Donut Chart: [API][21] - [Demo][6]
 - Brush Chart: [API][23] - [Demo][18]
 - Sparkline Chart: [API][29] - [Demo][7]
 - Stacked Area Chart: [API][30] - [Demo][8]
 - Tooltip Chart: [API][27] - [Demo][5]
 - Mini Tooltip Chart: [API][26] - [Demo][4]
 - Legend Chart: [API][24] - [Demo][6]
 - Step Chart: [API][28] - [Demo][11]

## Installation

Britecharts components are distributed in **UMD modules**, each one exposing a D3.js component written with the [Reusable API pattern][3]. In order to use any of the Britecharts modules, you will need to require the chart in your JS file using AMD/CommonJS modules. You would also need to load the [D3.js selection][37] library in order to select the chart container.

They also provide some minimal CSS styling, that can be loaded independently or as a bundle.

## Roadmap
This project is in active development, if you are interested on helping you can check the [contributing][35] document. Review the [issues page][16] for more info in what's coming and to give your feedback and to vote for your favorite proposals.

## See Also
- [Getting Started Guide][34]
- [Documentation][31]
- [Release Notes][13]
- [Contributing Guide][35]
- [Github Repo][33]

## Acknowledgments

Britecharts was inspired by two books, [Developing a D3.js Edge][19] and [Mastering D3.js][20]. It also leveraged a great number of examples and articles from the [D3.js][1] community overall.

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
[4]: tutorial-bar.html
[5]: tutorial-line.html
[6]: tutorial-donut.html
[7]: tutorial-sparkline.html
[8]: tutorial-stacked-area.html
[9]: tutorial-stacked-area.html
[10]: tutorial-donut.html
[11]: tutorial-step.html
[12]: https://nodejs.org/en/download/
[13]: https://github.com/eventbrite/britecharts/releases
[14]: https://www.apache.org/licenses/LICENSE-2.0
[15]: ../LICENSE.md
[16]: https://github.com/eventbrite/britecharts/issues
[17]: https://github.com/babel/babel
[18]: tutorial-brush.html
[19]: https://bleedingedgepress.com/our-books/developing-a-d3-js-edge/
[20]: https://www.packtpub.com/web-development/mastering-d3js
[21]: module-Donut.html
[22]: module-Bar.html
[23]: module-Brush.html
[24]: module-Legend.html
[25]: module-Line.html
[26]: module-Mini-tooltip.html
[27]: module-Tooltip.html
[28]: module-Step.html
[29]: module-Sparkline.html
[30]: module-Stacked-area.html
[31]: https://eventbrite.github.io/britecharts/
[32]: https://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html
[33]: https://github.com/eventbrite/britecharts
[34]: https://eventbrite.github.io/britecharts/tutorial--_GETTINGSTARTED.html
[35]: https://eventbrite.github.io/britecharts/tutorial--_CONTRIBUTING.html
[36]: https://eventbrite.github.io/britecharts/img/logo-stripes-small.png
[37]: https://github.com/d3/d3-selection
