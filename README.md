Britecharts
====

## Overview

Britecharts is a client-side **reusable Charting Library** based on [D3.js](http://d3js.org/) that allows easy and intuitive use of charts and components that can be composed together creating amazing visualizations.

It is structured in AMD modules using [requireJS](http://requirejs.org/), each one exposing a D3.js component written with the [Reusable API pattern](http://bost.ocks.org/mike/chart/). They have been created with a Test Driven methodology so they are **fully tested**, and we are commited to keep it that way.

The typical use of Britecharts involves creating a chart using it's simple API, and render it on a container which has been previously applyied some data. The code will look like this:

    barChart
        .width(500)
        .height(300);

    barContainer.datum(dataset).call(barChart);

All this charts expose some basic API methods like width, height and margin. Each specific chart or component can expose more methods, without any limit. They will be ready to check in the documentation, under the proper chart module section.


## Charts

Currently Britecharts exposes only 3 charts:

 - Bar Chart
 - Line Chart
 - Donut Chart


## Chart Documentation

In order to generate and see the documentation for this charts and the project in general you would need to:

 + Download and install [node](https://nodejs.org/en/download/) if you don't have it yet
 + Clone the repository with:

    git clone git@github.com:eventbrite/britecharts.git
 + Change directory into the repository root and install its dependencies:

    npm install
 + Again, in the root or the repository folder, run:

    grunt docs

This task will generate the docs with its current contents, and after finished, will open the docs interface where you will be able to check the specific methods for each chart. You can also see some use examples under the "Tutorials" dropdown section.


## To Contribute

We have followed a couple of standards outside of the regular Eventbrite workflow in this project: [JSDoc](http://usejsdoc.org) comments and Test Driven Development.

#### JSDoc

JSDoc is an API documentation generator. It allows us to follow a methodology when commenting our code, so that later we can automatically generate documentation from these comments. Check it's [getting started guide](http://usejsdoc.org/about-getting-started.html) to know more about it.

We are also using [Grunt](http://gruntjs.com/) and a [grunt task](https://github.com/krampstudio/grunt-jsdoc) to generate the documentation.


#### Test Driven Development

D3 charts are complex systems. As other Software Development projects, they start simple and become really bloated at the end of the process. To overcome this, we have followed a component approach that allows us to create easily testable units.

We have chosen [Karma](http://karma-runner.github.io/0.13/index.html) as our test runner, and [Jasmine](http://jasmine.github.io/) as our unit-testing library.

To install Karma and start running test you would need to follow this steps:

1- Clone repository with:

    git clone git@github.com:eventbrite/britecharts.git

2- Get into the repository folder and install dependencies with:

    npm install
    npm install -g karma-cli

3- Run the tests with:

    karma start


## Next Steps
This project is in active development. We are working on:

- Add documentation for donut chart
- Improve Demo pages
- Add getting started guide
