# Contributing Guide

<!-- TOC -->

- [Contributing Guide](#contributing-guide)
    - [Setup](#setup)
        - [Getting setup to contribute](#getting-setup-to-contribute)
        - [Creating feature branches](#creating-feature-branches)
        - [Running the Documentation and Demos](#running-the-documentation-and-demos)
    - [Modifying a chart](#modifying-a-chart)
    - [Creating a new chart](#creating-a-new-chart)
    - [Pull Requests](#pull-requests)
    - [Reporting an Issue](#reporting-an-issue)
        - [Making pull requests](#making-pull-requests)
    - [Standards](#standards)
        - [Test Driven Development](#test-driven-development)
        - [JSDoc](#jsdoc)
    - [The Workflow](#the-workflow)
        - [ES6 transpiling](#es6-transpiling)
        - [yarn Tasks](#yarn-tasks)

<!-- /TOC -->

## Setup

### Getting setup to contribute

1- Fork repository by clicking the fork button on github

2- Clone repository with `git clone https://github.com/<your handle>/britecharts.git`

3- Navigate to the repository folder and install dependencies with: `yarn install` (we are using node 6.9.x at the moment)

4- If you don't have yarn installed, it can be easily installed with homebrew following the instruction in the [yarn docs][yarn]


### Creating feature branches

1- in local master, set upstream to https://github.com/eventbrite/britecharts.git
`git remote add upstream https://github.com/eventbrite/britecharts.git`

2- pull the most recent changes`git pull --rebase upstream master`

3- Branch names should be prefixed with either `fix-` or `feat-` depending on your PR content. Create a new branch `git checkout -b [fix|feat]-<your branch name>`


### Running the Documentation and Demos

In order to generate the demos and see the documentation for the library you would need to:

 + Download and install node (note we need npm version 2.X)

 + Ensure you have [yarn][yarn] installed as well

 + Clone the repository with:

    `git clone git@github.com:eventbrite/britecharts.git`

 + Change directory into the repository root and install its dependencies:

    `yarn install`

 + In the root or the repository folder, run:

    `yarn run demos:serve`

 + In a second terminal window, run:

    `yarn run docs`


This process will generate the docs with its current contents and open the interface where you will be able to navigate the API of each chart. You can also see some use examples under the "Demos" dropdown section. Use this demos as your testing platform when modifying the charts.


## Modifying a chart

We have created this charts with Tests First, and we encourage you to do the same. However, you can also write tests later.

For a TDD workflow, the process would look like this:

1. Create a new branch for your modification
1. On a new terminal, run ``yarn run demos:serve`` and navigate to the chart's demo
1. Find the test of the chart you want to modify in ``/test/specs/*.spec.js``
1. Write a failing test for the API accessor or the feature you want to add
1. On a new terminal, run ``yarn run test``
1. Check that the test fails
1. Write the code that would make that test pass on the chart located in ``/src/charts/``. Please follow our code [styleguide][styleguide].
1. Make the test pass by writing the less amount of code
1. Refactor until you get a nice and clean code
1. Add/update the JSDoc comments so that the proper documentation gets generated when you run ``yarn run docs``
1. Check the demo to see the code in action (you can also add a new demo there if necessary)
1. Create a pull request and ask people of the team to review it
1. Once you have the OK, merge it!


## Creating a new chart

Adding a new chart is a bunch of work, but we hope that using the current code and documentation will help in the process.

1. Create a new branch for your new chart
1. On a new terminal, run ``yarn run demos:serve`` to get ready the docs and turn on the dev server.
1. Given that you new chart is ``ChartName``, create in ``/test/specs`` a new test file ``ChartName.spec.js``.
2. Go to ``/test/fixtures`` and create a new data builder file. Name it something like ``chartNameChartDataBuilder.js``.
3. Go to ``/test/json`` and create a JSON file for the test data of your new chart. You will load it with the previously created data builder.
4. Go to ``/src/charts`` and create a new chart file called ``ChartName.js``.
5. Go to ``/demos/src`` and create a new demo script for the new chart, add it to ``/demos/src/index.js``.
6. Also in ``/demos``, create a new html page called ``chartName.html`` and its .json file with the demo title.
7. Go to ``webpack.config.js`` and:
    1. add the new chart to the ``currentCharts`` object, give it a camel case name.
    2. add the new demo page to the ``currentDemos`` object, keeping the same format.
8. Go to your test file ``ChartName.spec.js`` and, taking another test as an example, copy over pieces until you have the first test case.
1. Add one test and make it fail callin ``yarn run test``.
1. Keep on coding according to our code [styleguide][styleguide].
1. Once you think you are close to have something working, start adding JSDoc comments to your code
1. Generate your docs with ``yarn run docs`` and manually test the demos.
1. Create a pull request with your branch and ping one of the core authors to get it reviewed.
1. Once you have a shipit, merge it


## Pull Requests
Please use the [issue tracker](https://github.com/eventbrite/britecharts/issues) to discuss potential improvements you want to make before sending a Pull Request for larger changes.

We always have tickets labeled 'help wanted' or 'good first issue'. They are a great starting point if you want to contribute. Don't hesitate to ask questions about the issue if you are not sure about the strategy to follow.

You may also take on any issues that don't currently have an assignee and are labeled as 'ready to go'.

---

## Reporting an Issue

Please use the [issues](https://github.com/eventbrite/britecharts/issues) section of the Britecharts github profile to submit any bug, question, proposal or feature request.

In the case of bugs, please be descriptive and, if possible, include a codepen with the issue happening or add a screenshot of the issue. You can use [this codepen bug template](https://codepen.io/Britecharts/pen/PRyZNy?editors=1010#0) as a jumping off point.



### Making pull requests

1- when you're finished coding, `git checkout master`

2- `git pull upstream master` (note that your local master should always reflect upstream master)

3- `git checkout <your branch>`

4- `git rebase master` & reconcile all conflicts

5- `git push origin <your branch>`

6- make your pr with a link to the original issue filed (if you see "unable to merge", please pull from your upstream and rebase again)

7- be patient :)

If you are new to Open Source, you can learn how to create [Pull Requests here](makeAPR).


---
## Standards

We have followed a couple of standards outside of the regular Eventbrite workflow in this project: [JSDoc](http://usejsdoc.org) comments and Test Driven Development. You can also check other info in our code [styleguide][styleguide].


### Test Driven Development

D3 charts are complex systems. As other Software Development projects, they start simple and become really bloated at the end of the process. To overcome this, we have followed a component approach that allows us to create easily testable units.

We have chosen [Karma](http://karma-runner.github.io/0.13/index.html) as our test runner, and [Jasmine](http://jasmine.github.io/) as our unit-testing library.

To install Karma and start running test you would need to follow this steps:

1- Fork repository by clicking the fork button on github

2- Clone repository with:

    git clone https://github.com/<your handle>/britecharts.git

3- Get into the repository folder and install dependencies with:

    yarn install

4- Run the tests with:

    yarn run test

This process will watch the test and spec files, re-running the tests when those change.


### JSDoc

JSDoc is an API documentation generator. It allows us to follow a methodology when commenting our code, so that later we can automatically generate documentation from these comments. Check it's [getting started guide](http://usejsdoc.org/about-getting-started.html) to know more about it.

We are also using [Grunt](http://gruntjs.com/) and a [grunt task](https://github.com/krampstudio/grunt-jsdoc) to generate the documentation.

Lastly, for the documentation site theme we are using a custom [Bootswatch theme](https://bootswatch.com/). Its repository is [a fork](https://github.com/Golodhros/bootswatch) of the original, and in order to update it, we would simply run:
```
grunt swatch_scss:custom
```
to generate the theme living in the `/custom` folder. We can also preview it by running `grunt` and check it out in `http://0.0.0.0:3000/custom/`.

---

## The Workflow

### ES6 transpiling

Britecharts modules are written in ES6, so we would need to create an ES5-compatible version of the charts before releasing a new version.

In order to work with the development version of the charts, we just need to run:

    yarn run demos:serve

However, if you want to create the production version of the charts, you should run:

    yarn run build


### yarn Tasks

The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `yarn run test` and `yarn run build` most of the time, the other tasks can be called independently or combined in order to see the docs.

| Task                      | Description
| ---                       | ---
| `yarn run test`            | Start the Karma runner that will test the project and keep watching for changes.
| `yarn run demos:serve`     | Serves the demos for our tutorials.
| `yarn run docs`            | Compiles the docs with JSDoc and opens a browser showing them.
| `yarn run styles`          | Compiles the styles for the charts
| `yarn run build`           | Build everything and generate the distribution version of the charts.
| `yarn run release`         | Create a new release of the library.
| `yarn run release:minor`   | Create a new release of the library by bumping the second number of the version (1.N.1)
| `yarn run release:major`   | Create a new release of the library by bumping the third number of the version (N.1.1)

**Note that for running `yarn run docs`, you will need to first have `yarn run demos:serve` in a different terminal.

[node]: http://nodejs.org
[styleguide]: https://github.com/eventbrite/britecharts/blob/master/CODESTYLEGUIDE.md
[yarn]: https://yarnpkg.com/lang/en/docs/install/
[makeAPR]: http://makeapullrequest.com/
