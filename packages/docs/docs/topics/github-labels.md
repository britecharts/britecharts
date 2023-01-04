---
sidebar_position: 7
---

# Issue and Feature Labeling

In this document we describe our approach to setting labels to our issues and PRs by using a combination of "status" and "type" based labels. We also describe the PR title prefixes that we apply.

## Labels

> On Britecharts, we aim to be methodical on using issue labels, offering our community a way to understand what are the issues about and their status within or development process.
We use a bunch of GitHub labels. They are a mix of custom labels and the default Github labels for open-source projects. We base these labels on four main types: **status labels**, **issue type labels**, and the **“other” category**. Read on to learn more about them.

#### Status Labels
* They show at a glance the status and progress of each issue
* Prefixed with "status:", followed by the label
* Only *one status label* will be applied to any particular issue


#### Labels
- **status:needs_triage** – For all issues that need to be processed
- **status:needs_reproducing** – For bugs that need to be reproduced in order to get fixed
- **status:needs_votes** – Issue or bug fix that needs support from the community to be considered
- **status:needs_design** – Issue that needs design input to continue.
- **status:in_progress** – Issue that is being worked on right now.
- **status:completed** – Issue is completed and on main
- **status:abandoned** – Issue we won’t go ahead and implement, or that needs a “champion” to take it through
- **status:blocked** – Issue blocked by any reason (dependencies, previous work, lack of resources, etc.)

-   The resulting **Feature Flow** is:
    -   Needs Triage >> Needs Votes >> Needs Design >> In Progress >> Completed
    -   Outside the flow: Blocked || Abandoned
-   The resulting **Issue Flow** is:
    -   Needs Triage >> Needs Reproducing >> Needs Votes >> In Progress >> Completed
    -   Outside the flow: Blocked || Abandoned

Here is a diagram representing these states within the lifecycles:
![Feature and Bug Lifecycle](https://raw.githubusercontent.com/britecharts/britecharts/main/packages/docs/static/img/process/issue_process_diagram.png)

#### Type Labels
* They show the type of the issue
* Prefixed with "Type:", followed by the label

##### Labels
- **type:bug** – An unexpected problem or unintended behavior
- **type:feature** – A new feature request
- **type:maintenance** – A regular maintenance chore or task, including refactors, build system, CI, performance improvements
- **type:documentation** – A documentation improvement task
- **type:question** – An issue or PR that needs more information or a user question

#### Other Labels
* Some of these are part of the standard GitHub labels and intended for OSS contributors
* Some are related to the tools we use to maintain the library
* They are not prefixed

#### Labels
- **help wanted** – Indicates we are looking for contributors on this issue.
- **good first issue** – Indicates the issue is a great one to tackle by newcomers to the project or OSS in general.
-   **dependencies** – For [snyk](https://snyk.io/), to manage dependencies updates

## PR Title and Commit Prefixes

As we adopted the Commitizen standard, we started using [@commitlint](https://commitlint.js.org/#/) to help us enforce meaningful PR and commit titles that will help us to generate the Changelog in the future.

The allowed commit and PR prefixes map to the issue types, so they would be:

-   fix – Fixes an unexpected problem or unintended behavior
-   feat – Adds a new feature
-   chore – Any regular maintenance chore or task, including: refactors, build system, CI, performance improvements
-   docs – A documentation improvement task
