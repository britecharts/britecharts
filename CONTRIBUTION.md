# Contributing Guide

## Setup

### Getting setup to contribute

1- Fork repository by clicking the fork button on github

2- Clone repository with `git clone https://github.com/<your handle>/britecharts.git`

3- Navigate to the repository folder and install dependencies with: `npm install`

### Cutting feature branches

1- in local master, set upstream to https://github.com/eventbrite/britecharts.git
`git remote add upstream https://github.com/eventbrite/britecharts.git`

2- pull the most recent changes`git pull --rebase upstream master`

3- branch name should be prefixed with either `fix-`or `feat-` depending on pr content. Create a new branch `git co -b [fix|feat]-<your branch name>`


### Running the Documentation and Demos

In order to generate the demos and see the documentation for the library you would need to:

 + Download and install [node][node] (note we need npm version 2.X)
 + Install the grunt task runner (if you don't have it yet) with:

    `npm install -g grunt-cli`

 + Clone the repository with:

    `git clone git@github.com:eventbrite/britecharts.git`

 + Change directory into the repository root and install its dependencies:

    `npm install`

 + In the root or the repository folder, run:

    `npm run demos:watch`

 + In another terminal, run:

    `npm run demos:serve`

 + In a third terminal window, run:

    `npm run docs`


This process will generate the docs with its current contents and open the interface where you will be able to navigate the API of each chart. You can also see some use examples under the "Tutorials" dropdown section. Use this demos as your testing platform when modifying the charts.


## Modifying a chart

We have created this charts with Tests First, and we encourage you to do the same. However, you can also write tests later.

For a TDD workflow, the process would look like this:

- Create a new branch for your modification
- Find the test of the chart you want to modify in ``/test/specs/*.spec.js``
- Write a failing test for the API accessor or the feature you want to add
- On a new terminal, run ``npm run test``
- Check that the test fails
- Write the code that would make that test pass
- Make the test pass
- Refactor until you get a nice and clean code
- Add/update the comments so that the proper documentation gets generated when you run
```
npm run docs
```
- Check the demos to see the code in action (you can also add a new demo there if necessary)
- Create a pull request and ask people of the team to review it
- Once you have a shipit, merge it!


## Creating a new chart

Adding a new chart is a bunch of work, but we hope the current code and documentation will help you in the process.

- Create a new branch for your new chart
- Create a file for the tests and the chart (on ``src/charts`` and ``test/specs``)
- Create a file for the demo too, and it's corresponding html (find them on ``demos/``)
- On a new terminal, run ``npm run test``
- Using the bar chart tests as a jumpstart, add one test and make it fail
- Write the code that makes that test pass and keep on adding tests
- Once you think you are close to have something working, start adding JSDoc comments to your code
- Generate your docs with:
```
    npm run docs
```
- Create a pull request with your branch and ping one of the core authors to get it reviewed
- Once you have a shipit, merge it


## Pull Requests

####Disclaimer
-> While it is true that Britecharts is currently live in Eventbrite production, this project is not being monitored closely for open source contributions. Please have patience and we will get to any issues and pull requests as soon as we can.

### Making pull requests

1- when you're finished coding, `git checkout master`

2- `git pull upstream master` (note that your local master should always reflect upstream master)

3- `git checkout <your branch>`

4- `git rebase master` & reconcile all conflicts

5- `git push origin <your branch>`

6- make your pr with a link to the original issue filed (if you see "unable to merge", please pull from your upstream and rebase again)

7- be patient :)

---

## Reporting an Issue/Feature Requests

Please use the [issues](https://github.com/eventbrite/britecharts/issues) section of the Britecharts github profile to submit any bugs found. Please be descriptive and feel free to add pictures or links to docs to make your point as clear as possible.

---
## Standards

We have followed a couple of standards outside of the regular Eventbrite workflow in this project: [JSDoc](http://usejsdoc.org) comments and Test Driven Development.


### Test Driven Development

D3 charts are complex systems. As other Software Development projects, they start simple and become really bloated at the end of the process. To overcome this, we have followed a component approach that allows us to create easily testable units.

We have chosen [Karma](http://karma-runner.github.io/0.13/index.html) as our test runner, and [Jasmine](http://jasmine.github.io/) as our unit-testing library.

To install Karma and start running test you would need to follow this steps:

1- Fork repository by clicking the fork button on github

2- Clone repository with:

    git clone https://github.com/<your handle>/britecharts.git

3- Get into the repository folder and install dependencies with:

    npm install

4- Run the tests with:

    npm run test

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

    npm run dev

However, if you want to use the production version of the charts, you should run:

    npm run build:all


### NPM Tasks

The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `npm run test` and `npm run prod` most of the time, the other tasks can be called independently or combined in order to see the docs.

| Task                      | Description
| ---                       | ---
| `npm run prod`            | Build everything and generate the distribution version of the charts.
| `npm run release`         | Create a new release of the library.
| `npm run release:minor`   | Create a new release of the library by bumping the second number of the version (1.N.1)
| `npm run release:major`   | Create a new release of the library by bumping the third number of the version (N.1.1)
| `npm run test`            | Start the Karma runner that will test the project and keep watching for changes.
| `npm run styles`          | Compiles the styles for the charts
| `npm run demos:compile`   | Compiles our demo files.
| `npm run demos:watch`     | Watches for changes in our demo files.
| `npm run demos:serve`     | Serves the demos for our tutorials.
| `npm run docs`            | Compiles the docs with JSDoc and opens a browser showing them.

**Note that for running `npm run docs`, you will need to first have `npm run demos:watch` and `npm run demos:serve` in two different terminal windows.

## Project Structure

The default directory structure looks something like this:

```
britecharts
├── demos
├── dist
├── docs
├── src
│   ├── charts
│   ├── doc
│   ├── fonts
│   └── tasks
└── test
    ├── fixtures
    ├── json
    ├── specs
    └── tools
```


| Folder | Description
| ---  | ---
| **demos** | Where we keep demo files for each of our charts and some extra docs
| **dist** | Where the production ready versions of our charts will be placed
| **docs** | Where the generated documentation website lives
| **src** | Where we will place the code we create
| **src/charts** | Where our charts live
| **src/doc** | Where the templates and configuration for our docs are
| **src/fonts** | Our fonts
| **src/tasks** | Some of our grunt tasks configuration
| **test** | Where our test related files live
| **test/fixtures** | Tools for generate data for our charts demos and tests
| **test/json** | Raw data for our charts
| **test/specs** | Our tests for the charts
| **test/tools** | Miscelaneous tools


[node]: http://nodejs.org
