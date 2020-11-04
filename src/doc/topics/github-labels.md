## Issue and Feature Labelling

At Britecharts we used a bunch of Github labels. They were a mix of the default Github labels and some custom ones. However, the default labels were not wide enough for managing a complex project. Also, they mix different types of labels (types, status, etc.) without clarity.

In this document we describe our approach to setting labels to our issues and PRs, along with the PR title prefixes that we apply.

## Github Labels

We base our labels on three types:

-   status labels
-   type labels, and
-   the “other” category.

Read on to learn more about them.

#### Status Labels

-   Show at a glance the progress of each issue
-   Prefixed with Status: &lt;Name of Label>
-   Only one status label will be applied to any particular issue
-   They are:
    -   On Review – Request that we are pondering if including or not
    -   Needs Reproducing – For bugs that need to be reproduced in order to get fixed
    -   Needs Design – Feature that needs a design
    -   Ready to Go – Issue that has been defined and is ready to get started with
    -   In Progress – Issue that is being worked on right now.
    -   Completed – Finished feature or fix
    -   Outside the main flow:
        -   Abandoned – Issue we won’t go ahead and implement, or that needs a “champion” to take it through
        -   Blocked – Issue blocked by any reason (dependencies, previous work, etc.)
        -   On Hold – Issue that is being considered but stopped due to lack of resources or changes in the roadmap
-   The resulting **Feature Flow** is:
    -   On Review >> Ready to Go >> In Progress >> Completed
    -   Outside the flow: On Hold || Blocked || Abandoned
-   The resulting **Issue Flow** is:
    -   Needs Reproducing >> Ready to Go >> In Progress >> Completed
    -   Outside the flow: On Hold || Blocked || Abandoned

![alt_text](images/feature-issue-labels.png "image_tooltip")

#### Type Labels

-   They show the type of issue or feature
-   Prefixes with Type: &lt;Name of Label>
-   They are:
    -   Bug – An unexpected problem or unintended behavior
    -   Feature – A new feature request
    -   Maintenance – A regular maintenance chore or task, including refactors, build system, CI, performance improvements
    -   Documentation – A documentation improvement task
    -   Question – An issue or PR that needs more information or a user question

#### Other Labels

-   They are standard labels for regular OSS contributors and more
-   Not prefixed
-   They are:
    -   help wanted – Indicates we are looking for contributors on this issue
    -   good first issue – Indicates the issue is a great one to tackle by newcomers to the project or to OSS in general
    -   dependencies – For [snyk](https://snyk.io/), to manage dependencies updates
    -   rc3.0 – For Issues related to the new version of Britecharts

### Not Included

There are more options for labels that we could add but we are not considering for now.

#### Priority Labels

-   Show the priority of the issue
-   Prefixes with Priority: &lt;Name of Label>
-   Status:
    -   Not implemented for now
    -   They would add complexity and overhead due to the discussions
    -   However, they could be valuable for creating the roadmap

#### Technology Labels

-   Based on the specific technology that the issue goes about
-   Examples:
    -   frontend – Indicates a Frontend only issue
    -   design – Indicates a Design only issue
    -   build – Indicates a build system issue
    -   ci – Indicates an issue with our Continuous Integration system
-   Status:
    -   Not implemented for now
    -   It can create too much overhead, as properly tag with technologies all the issues could be time consuming
    -   However, these could be useful for people that want to dive deep on one technology or that are specialist on that technology

## PR Title Prefixes

As we adopted the [Title Lint](https://github.com/apps/title-lint) Github App to help us enforce meaningful PR titles, we need to be clear about the prefixes to use. These would map to the issue types, so they would be:

-   fix – Fixes an unexpected problem or unintended behavior
-   feat – Adds a new feature
-   main – A regular maintenance chore or task, including: refactors, build system, CI, performance improvements
-   docs – A documentation improvement task
