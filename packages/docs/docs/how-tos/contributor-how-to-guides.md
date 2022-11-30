---
sidebar_position: 3
---

# Contributor How To Guides

Our contributor how to guides are recipes to address specific use cases when working with Britecharts. They assume contributor knowledge about Britecharts and the library structure. If this is the first time you contribute to Britecharts, we recommend you to read the [Contributing Guide][contributing] first.

## How to Create a Pull Request

When you have a branch that you want to contribute back to Britecharts, you need to create a Pull Request(PR) to propose the addition of the code. Follow these steps:

1. When you're finished coding, `git checkout master`
2. Run `git pull upstream master` (note that your local master should always reflect upstream master)
3. Run `git checkout <your branch>`
4. Execute `git rebase master` & reconcile all conflicts
5. Make sure everything looks OK codewise by running `yarn run check`
6. Push the branch to your fork with `git push origin <your branch>`
7. Create a new PR, filling the [PR template][prtemplate], and adding a link to the original issue filed (if you see "unable to merge", please pull from your upstream and rebase again)
8. Be patient while you wait for the maintainers to check it :)

If you are new to Open Source, you can learn how to create [Pull Requests here](makeapr).

## How to Modify a Chart in @britecharts/core

This how-to guide helps you in modifying a chart. We assume you already created [an issue][issues] and got the green light form the maintainers of the project (or maybe you are working your fork if you are not contributing back to Britecharts).

We have created our charts with a Test-First approach, and we encourage you to keep it the same. However, you can also write tests later too. For a TDD workflow, the process of modifying a component would look like this:

1. Create a new branch for your modification
1. On a new terminal, run `yarn run demos` in the root folder and navigate to the chart's demo in storybook
1. Find the test of the chart you want to modify in `/packages/core/src/charts/<chartName>` with at `.spec.js` extension
1. Write a failing test for the API accessor or the feature you want to add
1. On a new terminal, run `yarn run test` from the root folder
1. Check that the test fails
1. Write the code that would make that test pass on the chart located in `/packages/core/src/charts/<chartName>`. Please follow our [API Guidelines][styleguide].
1. Make the test pass by writing the less amount of code
1. Refactor until you get a nice and clean code
1. Add/update the JSDoc comments so that the proper documentation gets generated when you run `yarn run docs`
1. Check the storybook demo to see the code in action (you can also add a new demo there if necessary)
1. Create a pull request and ask the maintainers to review it
1. Once you have their OK, they will merge your pull request

## How to Create a New Chart in @britecharts/core

Adding a new chart is a bunch of work, but we hope that using the current code and documentation helps you in the process. The steps are:

1. Create a new branch for your component
1. On a new terminal, run `yarn run demos` to see the storybook running.
1. Given that your new chart is `chart-name`, create a folder within `/packages/core/src/charts` named `chart-name` and in the same folder a new test file `chart-name.spec.js`.
1. Create a new data builder file. Name it something like `chartNameChartDataBuilder.js`.
1. In the chart folder, create a new chart file called `chart-name.js`.
1. Create a `<chartName>.stories.js` file to hold a new demo for the new chart. Re-run the demos script to get it showing in the storybook.
1. Go to `webpack.config.js` and add the new chart to the `CHARTS` object, give it a camel case name.
1. Go to your test file `/packages/core/src/charts/chart-name.spec.js` and, taking another test as an example, copy over pieces until you have the first test case.
1. Add one test and make it fail by calling `yarn run test` or keep the tests running with `yarn run test:watch`.
1. Keep on coding according to our [API Guidelines][styleguide]
1. Once you think you are close to having something working, start adding JSDoc comments to your code
1. Generate your docs with `yarn run docs` and manually test the API definition in the docs site.
1. Create a pull request with your branch and ping one of the core maintainers to get it reviewed
1. Once you have addressed all the comments and got the green light, the maintainers will merge the PR

[styleguide]: ../topics/api-guidelines.md
[contributing]: https://github.com/britecharts/britecharts/blob/master/.github/CONTRIBUTING.md
[issues]: https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[prtemplate]: https://github.com/britecharts/britecharts/blob/master/.github/PULL_REQUEST_TEMPLATE.md
[makeapr]: http://makeapullrequest.com/
