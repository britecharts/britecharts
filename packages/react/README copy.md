# Britecharts React
> Britecharts-react is a [React][react] wrapper for the [Britecharts][britecharts] charting library.

[![Build Status](https://travis-ci.org/britecharts/britecharts-react.svg?branch=master)](https://travis-ci.org/britecharts/britecharts-react)
[![npm version](https://badge.fury.io/js/britecharts-react.svg)](https://badge.fury.io/js/britecharts-react)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/britecharts/britecharts-react/blob/master/CONTRIBUTING.md)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Twitter Follow](https://img.shields.io/twitter/follow/britecharts.svg?style=social&label=Follow)](https://twitter.com/Britecharts/followers)


| [![Stacked Area Chart](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/stacked-area.png)](https://britecharts.github.io/britecharts-react/#stackedarea) | [![Bar Chart](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/bar-chart.png)](https://britecharts.github.io/britecharts-react/#bar) | [![Line Chart](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/line-chart.png)](https://britecharts.github.io/britecharts-react/#line) |
| ------------- | ------------- | ------------- |
| [![Donut Chart](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/donut-chart.png)](https://britecharts.github.io/britecharts-react/#donut) | [![Legend](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/legend.png)](https://britecharts.github.io/britecharts-react/#legend) | [![Tooltip](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/legend.png)](https://britecharts.github.io/britecharts-react/#tooltip) |
| [![Sparkline Chart](https://raw.githubusercontent.com/britecharts/britecharts-react/master/src/docs/images/thumbnails/sparkline.png)](https://britecharts.github.io/britecharts-react/#sparkline) |

## Usage
Import components from Britecharts-React:

```js static
//ES6 import syntax
import { StackedArea } from 'britecharts-react';

//CommonJS require syntax
const { StackedArea } = require('britecharts-react');
```

Britecharts-React components are used just like any other stateless React component. You will pass in some props, and it would render a chart:

```js static
<StackedArea
    data={stackedAreaData.with2Sources()}
    width={600}
    height={400}
/>

```

## API
Each component's API will be a reflection of [Britecharts][britecharts] charts and their APIs. That way, if we need to render a bar chart, we will first check the [bar chart's API][barChartAPI] in the main project API reference page. You can read more about the approach [here][topics]

From there, we will proceed to pass each of the configurations through the usual props as we do in React projects:
```js static
<Bar
    data={barData.with2Entries()}
    width={400}
    isHorizontal={true}
    margin={marginObject}
>
```

The complete set of components is in progress; the following components are currently implemented and available for use:
- Bar charts [(API)][barChartAPI]
- Bullet charts [(API)][bulletAPI]
- Grouped Bar charts [(API)][groupedBarChartAPI]
- Donut charts [(API)][donutChartAPI]
- Line charts [(API)][lineChartAPI]
- Sparkline charts [(API)][sparklineChartAPI]
- Stacked Area charts [(API)][stackedAreaChartAPI]
- Stacked Bar charts [(API)][stackedBarChartAPI]
- Tooltips [(API)][tooltipAPI]
- Step charts [(API)][stepChartAPI]
- Legends [(API)][legendAPI]

The following components haven't been migrated yet from Britecharts:
- Brush charts
- Heatmaps
- Mini Tooltips
- Scatter Plots

If you need to use one of the missing charts, check out our [how-to guide for creating new charts][howtoCreate].

## Installation
Britecharts-React is available as an [NPM module][npmModule] or through CDN links (in [different formats][jsDelivrLib] or a [bundle][jsDelivrDist]).

You can also use individual bundles in UMD format (`dist/umd/`), CommonJS format (`lib/cjs`), and tree-shaking-enabling ES2015 modules (`lib/esm`) to add to your bundle. You can see more on our [test project][testProject].

Developers also need to load the stylesheets located in `dist/britecharts-react.min.css` to style the charts correctly.

## Next steps
We are accepting PRs for creating wrappers for Britecharts components. Check our [contributing guide][contributingGuide], drop by the #britecharts channel in the [d3 slack][d3Slack], or create an issue if you want to know more.


## Acknowledgments
For this project, we have followed the approach called ‘Mapping Lifecycle methods’ based on [Nicholas Hery's article][integration-article]. We want to recognize all the contributors in the parent project [Britecharts][britecharts].


## See Also
- [Documentation Homepage][homepage]
- [Contributing Guide][contributingGuide]
- [Code of Conduct][codeOfConduct]

## License
Copyright 2017 Eventbrite

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[https://www.apache.org/licenses/LICENSE-2.0][license]

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Read more in the [license document][licenseGithub].

[britecharts]: https://github.com/britecharts/britecharts

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://davidgomez.dev"><img src="https://avatars0.githubusercontent.com/u/282903?v=4" width="100px;" alt="David Gómez"/><br /><sub><b>David Gómez</b></sub></a><br /><a href="https://github.com/britecharts/britecharts-react/commits?author=davegomez" title="Code">💻</a> <a href="#ideas-davegomez" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-davegomez" title="Maintenance">🚧</a> <a href="#review-davegomez" title="Reviewed Pull Requests">👀</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[react]: https://facebook.github.io/react/
[integration-article]: http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/

[barChartAPI]: http://britecharts.github.io/britecharts/module-Bar.html
[groupedBarChartAPI]: http://britecharts.github.io/britecharts/module-Grouped-Bar.html
[donutChartAPI]: http://britecharts.github.io/britecharts/module-Donut.html
[lineChartAPI]: http://britecharts.github.io/britecharts/module-Line.html
[sparklineChartAPI]: http://britecharts.github.io/britecharts/module-Sparkline.html
[stackedAreaChartAPI]: http://britecharts.github.io/britecharts/module-Stacked-area.html
[stackedBarChartAPI]: http://britecharts.github.io/britecharts/module-Stacked-bar.html
[tooltipAPI]: http://britecharts.github.io/britecharts/module-Tooltip.html
[stepChartAPI]: http://britecharts.github.io/britecharts/module-Step.html
[legendAPI]: http://britecharts.github.io/britecharts/module-Legend.html
[bulletAPI]: http://britecharts.github.io/britecharts/module-Bullet.html


[license]: https://www.apache.org/licenses/LICENSE-2.0
[licenseGithub]: https://github.com/britecharts/britecharts-react/blob/master/LICENSE.md
[topics]: https://github.com/britecharts/britecharts-react/blob/master/TOPICS.md
[jsDelivrLib]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/lib/
[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts-react@latest/dist/
[npmModule]: https://www.npmjs.com/package/britecharts-react
[contributingGuide]: https://github.com/britecharts/britecharts-react/blob/master/CONTRIBUTING.md
[d3Slack]: https://d3js.slack.com/
[codeOfConduct]: https://github.com/britecharts/britecharts-react/blob/master/CODE_OF_CONDUCT.md
[homepage]: https://britecharts.github.io/britecharts-react/
[testProject]: https://github.com/Golodhros/britecharts-react-test-project
[howtoCreate]: https://github.com/britecharts/britecharts-react/blob/master/CONTRIBUTING.md#creating-a-new-chart
