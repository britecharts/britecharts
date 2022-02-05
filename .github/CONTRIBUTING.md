# Contributing Guide

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Contributing Guide](#contributing-guide)
	* [Reporting an Issue](#reporting-an-issue)
	* [Creating Pull Requests](#creating-pull-requests)
	* [Setup](#setup)
		* [Getting Set Up to Contribute](#getting-set-up-to-contribute)
		* [Creating Feature and Fix Branches](#creating-feature-and-fix-branches)
		* [Running the Documentation and Demos](#running-the-documentation-and-demos)

<!-- /code_chunk_output -->

## Reporting an Issue
The easiest way you can contribute to Britecharts is by creating issues. For that, please use the [issues][issues] section of the Britecharts repository and search for a similar problem. If you don't find it, submit your bug, question, proposal or feature request.

In the case of bugs, please be descriptive and, if possible, include a Codepen with the issue happening or add a screenshot of the issue. You can use [this Codepen bug template](https://codepen.io/Britecharts/pen/PRyZNy?editors=1010#0) as a jumping off point.


## Creating Pull Requests
Before sending a Pull Request with significant changes, please use the [issue tracker][issues] to discuss the potential improvements you want to make.

We always have tickets labeled 'help wanted' or 'good first issue.' They are a great starting point if you want to contribute. Don't hesitate to ask questions about the issue if you are not sure about the strategy to follow.

You may also take on any issues that don't currently have an assignee and we labeled as 'ready to go.'

## Setup
To start contributing to Britecharts, you need to set up your machine to develop with the library. Read on to learn how to set up your fork, create branches and run the project in your machine.

### Getting Set Up to Contribute
1. Fork the Britecharts repository by clicking the fork button on Github
2. Clone the repository with `git clone https://github.com/<your handle>/britecharts.git`
3. Navigate to the repository folder and install dependencies with: `yarn` (we are using node 12.2.0 at the moment)
4. If you don't have yarn installed, you can install it following the instructions in the [yarn docs][yarn]
5. Make sure you have Chrome installed, and your `CHROME_BIN` environment variable is set.

### Creating Feature and Fix Branches
1. In local master, set the upstream to https://github.com/britecharts/britecharts.git
`git remote add upstream https://github.com/britecharts/britecharts.git`
2. Pull the most recent changes with `git pull --rebase upstream master`
3. Create a new branch. Branch names should be prefixed with either `fix-`, `feat-` or `ref-` depending on your PR content. Run `git checkout -b [fix|feat|ref]-<your branch name>`

### Running the Documentation and Demos
To generate the demos and see the library' documentation you would need to:

1. Download and install node
1. Ensure you have [yarn][yarn] installed as well
1. Clone the repository with:
    `git clone git@github.com:britecharts/britecharts.git`
1. Change directory into the repository root and install its dependencies:
    `yarn`
1. In the root or the repository folder, run:
    `yarn start`
1. In the root or the repository folder, run:
    `yarn run test:watch`

This process generates docs and opens the user interface in a new browser tab. There you can navigate the API of each chart and see some examples under the “Demos” dropdown section. We recommend you to use these demos as your testing platform when modifying the charts.

## Next Steps
Once you have your environment set and ready to go, you can check our [Contributor How To Guides][contributorHowTo] to learn how to create a Pull Request, Modify or Create a chart.

Check also our [Topics Page][topicsPage] to learn about our Code Standards, API Guidelines, the library structure and build system.

You can add yourself or somebody else to the contributors list by using the [All Contributors bot][allContributorsBot].

## Good First Issues
We have a set of [good first issues][good-first-issues] that contain bugs and improvements which have a relatively limited scope. This is a great place to get started, gain experience with the project and the contributing workflow.

## Joining Britecharts
Britecharts is an open project looking to get your contributions (in whatever form you prefer) and ready to welcome new committers. We aspire to create a community based on meritocracy, and open to grow and evolve with our users.

[yarn]: https://yarnpkg.com/lang/en/docs/install/
[issues]: https://github.com/britecharts/britecharts/issues
[contributorHowTo]: http://britecharts.github.io/britecharts/contributor-how-to-guides.html
[topicsPage]: http://britecharts.github.io/britecharts/topics-index.html
[allContributorsBot]: https://allcontributors.org/docs/en/bot/usage
[good-first-issues]: https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22