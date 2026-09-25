---
 sidebar_position: 2 
---
 # @britecharts/docs

> Documentation package to create the [documentation site][homepage] for Britecharts, built using [Docusaurus 3](https://docusaurus.io/).

## Usage
`@britecharts/docs` will extract the updated docs from the other packages when running `pnpm start`. 

You can see [here][homepage] the production site deployed.

## Installation
To install the dependencies, just run:
```
$ pnpm install
```

### Local Development
To start developing this documentation site, run:
```
$ pnpm start
```

This command does several things:
* Copies over the Readme from the root package
* Generates the API from the `@britecharts/core` chart comments
* Starts a local development server and opens up a browser window 

Changes in the markdown files of this package and configuration are reflected live without having to restart the server. However, to update the docs with the latest comments from the packages or the readme, you will need to re-run `pnpm start`.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Checking links

```
$ pnpm docs:build
$ pnpm docs:links
```

A broken *internal* link already fails `pnpm build`, since Docusaurus is set to throw on one. `docs:links` serves the built site and follows every link on every page, the external ones included, and fails on any that is broken. The **Link check** workflow runs it on every pull request, on `main`, and once a week, because links rot with nothing changing on our side. The few hosts it skips, and why, are listed at the top of `scripts/check-links.mjs`.

### Deployment*

Using SSH:

```
$ USE_SSH=true pnpm deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

[homepage]: https://britecharts.github.io/britecharts/
[contributing]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
