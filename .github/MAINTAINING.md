# Maintaining Guide
> Information for Britecharts maintainers
As maintainers of the project, this is our guide. Most of the steps and guidelines in the [Contributing](./CONTRIBUTING.md) document apply here, including how to set up your environment, write code to fit the code style, run tests, craft commits and manage branches.

Beyond this, this document provides some details that would be too low-level for contributors.

## Issue management

The triage and issue managing process will look like this:

1. New issues will automatically added the "Status: Needs Triage".
2. Once maintainers review the issue, they will remove the "Status: Needs Triage" label, add new ones and close the issue.
3. The Britecharts community will upvote the issues they want to be addressed by viewing the [features](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Afeature+) and [bug](https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Abug+) lists and reacting with a 👍.
4. Britecharts maintainers and community will tackle the features and bugs as they fit their roadmap and taking into account their popularity.

We've found labels to be useful for cataloging and marking progress on features and bugs. You can read about our labels on the issue labeling section below.


## Issue labeling
> On Britecharts, we aim to be methodical on using issue labels, offering our community a way to understand what are the issues about and their status within or development process.
We use a bunch of GitHub labels. They are a mix of custom labels and the default Github labels for open-source projects. We base these labels on four main types: **status labels**, **issue type labels**, and the **“other” category**. Read on to learn more about them.

### Status Labels
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

Here is a diagram representing these states within the lifecycles:
![Feature and Bug Lifecycle](https://raw.githubusercontent.com/britecharts/britecharts/main/packages/docs/static/img/process/issue_process_diagram.png)

### Type Labels
* They show the type of the issue
* Prefixed with "Type:", followed by the label

#### Labels
- **type:bug** – An unexpected problem or unintended behavior
- **type:feature** – A new feature request
- **type:maintenance** – A regular maintenance chore or task, including refactors, build system, CI, performance improvements
- **type:documentation** – A documentation improvement task
- **type:question** – An issue or PR that needs more information or a user question

### Other Labels
* Some of these are part of the standard GitHub labels and intended for OSS contributors
* Some are related to the tools we use to maintain the library
* They are not prefixed

### Labels
- **help wanted** – Indicates we are looking for contributors on this issue.
- **good first issue** – Indicates the issue is a great one to tackle by newcomers to the project or OSS in general.