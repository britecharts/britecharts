---
 sidebar_position: 2 
---
 # @britecharts/docs

> Documentation package to create the [documentation site][homepage] for Britecharts, built using [Docusaurus 2](https://docusaurus.io/).

## Usage
`@britecharts/docs` will extract the updated docs from the other packages when running `yarn start`. 

You can see [here][homepage] the production site deployed.

## Installation
To install the dependencies, just run:
```
$ yarn
```

### Local Development
To start developing this documentation site, run:
```
$ yarn start
```

This command does several things:
* Copies over the Readme from the root package
* Generates the API from the `@britecharts/core` chart comments
* Starts a local development server and opens up a browser window 

Changes in the markdown files of this package and configuration are reflected live without having to restart the server. However, to update the docs with the latest comments from the packages or the readme, you will need to re-run `yarn start`.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Checking links

```
$ yarn docs:build
$ yarn docs:links
```

A broken *internal* link already fails `yarn build`, since Docusaurus is set to throw on one. `docs:links` serves the built site and follows every link on every page, the external ones included, and fails on any that is broken. The **Link check** workflow runs it on every pull request, on `main`, and once a week, because links rot with nothing changing on our side. The few hosts it skips, and why, are listed at the top of `scripts/check-links.mjs`.

### Deployment*

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

[homepage]: https://britecharts.github.io/britecharts/
[contributing]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
