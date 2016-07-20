## Pull Requests

####Disclaimer
While it is true that Britecharts is currently live in Eventbrite production, this project is not being monitored closely for open source contributions. Please have patience and we will get to any issues and pull requests as soon as we can.


#### Getting setup to contribute

1- Fork repository by clicking the fork button on github

2- Clone repository with `git clone https://github.com/<your handle>/britecharts.git`

3- Navigate to the repository folder and install dependencies with: `npm install`

#### Cutting feature branches


1- in local master, set upstream to https://github.com/eventbrite/britecharts.git
`git remote add upstream https://github.com/eventbrite/britecharts.git`

2- pull the most recent changes`git pull upstream master`

3- branch name should be prefixed with either `fix-`or `feat-` depending on pr content. Create a new branch `git co -b [fix|feat]-<your branch name>`

#### Making pull requests

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
| `npm run test`            | Start the Karma runner that will test the project and keep watching for changes.
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
