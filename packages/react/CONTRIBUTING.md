# Contributing Guide

<!-- TOC -->

- [Contributing Guide](#contributing-guide)
    - [Setup](#setup)
        - [Getting setup to contribute](#getting-setup-to-contribute)
        - [Creating feature branches](#creating-feature-branches)
        - [Running the Demos](#running-the-demos)
    - [Modifying a chart](#modifying-a-chart)
    - [Creating a new chart](#creating-a-new-chart)
    - [Pull Requests](#pull-requests)
        - [Making pull requests](#making-pull-requests)
    - [Reporting an Issue/Feature Requests](#reporting-an-issuefeature-requests)
    - [The Workflow](#the-workflow)
        - [yarn Tasks](#yarn-tasks)
    - [Project Structure](#project-structure)

<!-- /TOC -->

## Setup

### Getting setup to contribute

0. Fork repository by clicking the fork button on github
0. Clone repository with `git clone https://github.com/<your handle>/britecharts-react.git`
0. Navigate to the repository folder and install dependencies with: `yarn install` (we use [node][node] 12.2.0 at the moment)
0. If you don't have yarn installed, it can be easily installed with homebrew following the instruction in the [yarn docs][yarn]


### Creating feature branches

0. in local master, set upstream to https://github.com/britecharts/britecharts-react.git

    `git remote add upstream https://github.com/britecharts/britecharts-react.git`

0. pull the most recent changes by rebasing master

    `git pull --rebase upstream master`

0. Branch names should be prefixed with either `fix-`, `feat-` or `ref-` depending on your PR content. Create a new branch by typing:

     `git checkout -b [fix|feat|ref]-<your branch name>`


### Running the Demos

In order to generate the demos and see the documentation for the library you would need to:

 + Download and install node
 + Ensure you have [yarn][yarn] installed as well
 + Clone the repository with:
    `git clone git@github.com:britecharts/britecharts-react.git`
 + Change directory into the repository root and install its dependencies:
    `yarn install`
 + In the root or the repository folder, run:
    `yarn run test`
 + In a second terminal window, run:
    `yarn start`


This process will generate the styleguide and show it in ``localhost:6060``. You can use this demos as your testing platform when creating new charts.


## Modifying a chart

We have created this components with Tests First, and we encourage you to do the same. However, you can also write tests later.

For a TDD workflow, the process would look like this:

1. Create a new branch for your modification
1. On a new terminal, run ``yarn start`` and ``yarn run styleguide`` and navigate to the chart's demo or create a new demo in ``/src/charts/*/Readme.md``
1. Find the test of the chart you want to modify in ``/src/charts/*/*.test.js``
1. Write a failing test for the feature you want to add
1. On a new terminal, run ``yarn run test:watch``
1. Check that the test fail
1. Write the code that would make that test pass on the chart located in ``/src/charts/*/*Component.js`` or ``/src/charts/*/*Chart.js``. Please follow the code style in the current files.
1. Make the test pass by writing the less amount of code
1. Refactor until you get a nice and clean code
1. Check the demo to see the code in action
1. Update the documentation so that the proper demos gets generated when you run ``yarn run styleguide:build``
1. Create a pull request and ask people of the team to review it
1. Once you have the OK, merge it!


## Creating a new chart

Adding a new chart is a bunch of work, but we hope that using the current code and documentation will help in the process.

1. Create a new branch for your new chart
1. On a new terminal, run ``yarn start`` ``yarn run styleguide`` to get ready the demos and turn on the dev server.
1. Given that you new chart is ``ChartName``, create in ``/src/charts/ChartName`` a new file ``ChartName.js`` and test file ``ChartName.test.js``.
1. Create also a new component in ``/src/charts/ChartName`` a new file ``ChartNameComponent.js`` and test file ``ChartNameComponent.test.js``.
1. Add the new demo entry on ``/src/charts/ChartName/Readme.md``, keeping the same format.
7. Go to ``webpack.config.js`` and add the new chart to the ``CHARTS`` object, follow the same style.
8. Go to your test file ``ChartName.test.js`` and, taking another test as an example, copy over pieces until you have the first test case.
1. Add one test and make it fail calling ``yarn run test:watch``.
1. Keep on coding according to the code style you can see in the current charts, using the stackedAreaChart as a reference.
1. Generate your docs with ``yarn run styleguide:build`` and manually test the demos.
1. Create a pull request with your branch and ping one of the core authors to get it reviewed.
1. Once you have a shipit, merge it

Alternatively, you can use Plop to generate the boilerplate for your new component, if the component already exists in Britecharts.

1. Create a new branch for your new chart
1. On a new terminal, run ``yarn start`` ``yarn run styleguide`` to prepare the demos and turn on the dev server.
1. On a new terminal, run ``yarn run plop``. When prompted, enter your chart's name (be sure to use PascalCase capitalization!). This will generate a new folder for your component in ``src/charts/chartName``, with all necessary files.
1. Before starting to modify the boilerplate, start the test suite: ``yarn run test:watch``.
1. Follow the tasks in ``src/charts/chartName/Checklist.md`` to complete your component
1. Once completed, create a pull request with your branch and ping one of the core authors to get it reviewed and merged.


## Pull Requests

*Disclaimer*
-> While it is true that Britecharts-React is currently live in Eventbrite production, this project is not being monitored closely for open source contributions. Please have patience and we will get to any issues and pull requests as soon as we can.

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

Please use the [issues](https://github.com/britecharts/britecharts-react/issues) section of the Britecharts-React github profile to submit any bugs found. Please be descriptive and feel free to add pictures or links to docs to make your point as clear as possible.

## The Workflow

### yarn Tasks

The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `yarn run test` and `yarn run build` most of the time, the other tasks can be called independently or combined in order to see the docs.

| Task                         | Description
| ---------                    | ---
| `yarn run start`             | Start the development process that is going to transpile the files
| `yarn run test`              | Run the Jest runner to see if the tests are running
| `yarn run test:watch`        | Start the Jest runner that will test the project and keep watching for changes.
| `yarn run styleguide`        | Serves the demos in localhost:6060.
| `yarn run styleguide:build`  | Builds the styleguide.
| `yarn run build`             | Build everything and generate the distribution version of the charts.
| `yarn run lint`              | Runs the eslint linter
| `yarn run lint:fix`          | Runs the eslint linter fixing easy problems
| `yarn run release`           | Create a new release of the library.
| `yarn run release:minor`     | Create a new release of the library by bumping the second number of the version (1.N.1)
| `yarn run release:major`     | Create a new release of the library by bumping the third number of the version (N.1.1)

## Project Structure

The default directory structure looks something like this:

``` static
britecharts-react
├── dist
├── docs
├── lib
├── src
│   ├── charts
│   ├── docs
│   ├── helpers
│   └── tasks
```


| Folder                  | Description
| ---                     | ---
| **dist**                | Where the production ready bundle of our charts will be placed
| **docs**                | Where the generated demo website lives
| **lib**                 | Where the production ready individual UMD bundles will live, alongside with the ES6 modules version of them
| **src**                 | Where we will place the code we create
| **src/charts**          | Where our charts live
| **src/charts/helpers**  | Where our chart helpers live
| **src/helpers**         | Where our general helpers live, like test data generators
| **src/tasks**           | Some of our grunt tasks configuration


[node]: http://nodejs.org
[yarn]: https://yarnpkg.com/lang/en/docs/install/
