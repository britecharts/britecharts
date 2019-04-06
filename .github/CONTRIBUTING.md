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
The easiest way you can contribute to Britecharts is by creating issues. For that, please use the [issues][issues] section of the Britecharts repository to submit any bug, question, proposal or feature request.

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
3. Navigate to the repository folder and install dependencies with: `yarn install` (we are using node 6.9.x at the moment)
4. If you don't have yarn installed, you can install it following the instructions in the [yarn docs][yarn]

### Creating Feature and Fix Branches
1. In local master, set the upstream to https://github.com/eventbrite/britecharts.git
`git remote add upstream https://github.com/eventbrite/britecharts.git`
2. Pull the most recent changes with `git pull --rebase upstream master`
3. Create a new branch. Branch names should be prefixed with either `fix-` or `feat-` depending on your PR content. Run `git checkout -b [fix|feat]-<your branch name>`

### Running the Documentation and Demos
To generate the demos and see the library' documentation you would need to:

1. Download and install node (note we need npm version 2.X)
1. Ensure you have [yarn][yarn] installed as well
1. Clone the repository with:
    `git clone git@github.com:eventbrite/britecharts.git`
1. Change directory into the repository root and install its dependencies:
    `yarn install`
1. In the root or the repository folder, run:
    `yarn run demos:serve`
1. In a second terminal window, run:
    `yarn run docs`

This process generates docs and opens the user interface in a new browser tab. There you can navigate the API of each chart and see some examples under the “Demos” dropdown section. We recommend you to use these demos as your testing platform when modifying the charts.

## Next Steps
Once you have your environment set and ready to go, you can check our [Contributor How To Guides][contributorHowTo] to learn how to create a Pull Request, Modify or Create a chart.

Check also our [Topics Page][topicsPage] to learn about our Code Standards, API Guidelines, the library structure and build system.

You can add yourself or somebody else to the contributors list by using the [All Contributors bot][allContributorsBot].

[yarn]: https://yarnpkg.com/lang/en/docs/install/
[issues]: https://github.com/eventbrite/britecharts/issues
[contributorHowTo]: http://eventbrite.github.io/britecharts/contributor-how-to-guides.html
[topicsPage]: http://eventbrite.github.io/britecharts/topics-index.html
[allContributorsBot]: https://allcontributors.org/docs/en/bot/usage