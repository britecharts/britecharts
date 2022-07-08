---
sidebar_position: 2
---

# Code Standards

We have followed a couple of standards in this project: [JSDoc](http://usejsdoc.org) comments and Test Driven Development. You can also check other info in our [API guidelines][styleguide].

### Test Driven Development

D3.js charts are complex systems. As other Software Development projects, they start simple and become bloated at the end of the process. To overcome this, we have followed a component approach that allows us to create easily testable units.

We have chosen [Jest](https://jestjs.io/) as our test runner, and [Jasmine](http://jasmine.github.io/) as our unit-testing library in core.

To install Jest and start running our test you would need to follow these steps:

1. Fork the repository by clicking the fork button on Github
2. Clone the repository with:
   `git clone https://github.com/<your handle>/britecharts.git`
3. Get into the repository folder and install the dependencies with:
   `yarn`
4. Run the tests with:
   `yarn run test`

This process watches the test and chart files, re-running the tests when those change.

### JSDoc Generated Documentation

JSDoc is an API documentation generator. It allows us to follow a methodology when commenting our code so that later we can automatically generate documentation from these comments. Check its [getting started guide](http://usejsdoc.org/about-getting-started.html) to know more about it.

We enforce jsDoc comments in our review process, hence each function should be commented. We require also to be mindful and when we change the code of a function. Please check if comments need to be updated too. This is essential, as our documentation gets generated from these JSDoc comments.

[styleguide]: ./api-guidelines.md
