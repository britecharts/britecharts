# Maintaining Guide
> Information for Britecharts maintainers
As maintainers of the project, this is our guide. Most of the steps and guidelines in the [Contributing](./CONTRIBUTING.md) document apply here, including how to set up your environment, write code to fit the code style, run tests, craft commits and manage branches.

Beyond this, this document provides some details that would be too low-level for contributors.

## Issue triage

The triage and issue managing process will look like this:

1. New issues will automatically added the "status:needs_triage".
2. Once maintainers review the issue, they will remove the "status:needs_triage" label, add new ones and close the issue.
3. The Britecharts community will upvote the issues they want to be addressed by viewing the [features](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Afeature+-label:status:completed) and [bug](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Abug+-label:status:completed) lists and reacting with a 👍.
4. Britecharts maintainers and community will tackle the features and bugs as they fit their roadmap and taking into account their popularity.

We've found labels to be useful for cataloging and marking progress on features and bugs. You can read about our labels on the [issue labeling topic document](https://britecharts.github.io/britecharts/docs/topics/github-labels).