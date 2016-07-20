
## Overview

Britecharts is a client-side **reusable Charting Library** based on [D3.js](http://d3js.org/) that allows easy and intuitive use of charts and components that can be composed together creating amazing visualizations.

Britecharts is structured in UMD modules using [webpack](https://webpack.github.io/), each one exposing a D3.js component written with the [Reusable API pattern](http://bost.ocks.org/mike/chart/). They have been created with a Test Driven methodology so they are **fully tested**, and we are commited to keep it that way.

## Key Features

The main characteristics of this library are:

- Reusability
- Composability
- Fully tested
- ES6 source (transpiled to ES5)

### Charts

Currently Britecharts exposes 5 charts:

 - Bar Chart
 - Line Chart
 - Donut Chart
 - Stacked Area Chart
 - Tooltip Chart
 - Legend Chart

## TLDR: Using it

The typical use of Britecharts involves creating a chart using it's simple API, and render it on a container which has been previously applyied some data. The code will look like this:

    barChart
        .width(500)
        .height(300);

    barContainer.datum(dataset).call(barChart);

All the components expose some basic API methods like width, height and margin. Each specific chart or component can expose more methods, without any limit. They will be ready to check in the documentation, under the proper chart module section.

## Installing it

In order to use any of the Britecharts modules, you will need to require the chart in your JS file using AMD/CommonJS modules.


## Chart Documentation

In order to generate and see the documentation for this charts and the project in general you would need to:

 + Download and install [node](https://nodejs.org/en/download/) (note we need npm version 2.X)
 + Install the grunt task runner (if you don't have it yet) with:

    `npm install -g grunt-cli`

 + Clone the repository with:

    `git clone git@github.com:eventbrite/britecharts.git`

 + Change directory into the repository root and install its dependencies:

    `npm install`

 + In the root or the repository folder, run:

    `npm run demos:serve`

 + In another terminal window, run:

    `npm run docs`


This process will generate the docs with its current contents and open the interface where you will be able to navigate the API of each chart. You can also see some use examples under the "Tutorials" dropdown section.


## Roadmap
This project is in active development. We are working on:

- Style Bar Chart
- Document each graphs data input


## License

Copyright 2016 Eventbrite

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Read more in the [license document](../LICENSE.md)
