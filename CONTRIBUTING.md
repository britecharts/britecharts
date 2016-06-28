## Standards

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

3- Run the tests with:

    npm run test

This process will watch the test and spec files, re-running the tests when those change.

#### ES6 transpiling

Britecharts modules are written in ES6, so we would need to create an ES5-compatible version of the charts before releasing a new version.

In order to work with the development version of the charts, we just need to run:

    npm run dev

However, if you want to use the production version of the charts, you should run:

    npm run build:all
