# @britecharts/demos

> Storybook installation to create the [demos site][demos] for Britecharts, using a multi-storybook setup.

## Usage
`@britecharts/demos` by itself is a simple Storybook installation that exports Storybooks from other Britecharts packages.

It has no stories of its own beyond an introduction: it *composes* the core and react Storybooks, which it expects on `localhost:2001` and `localhost:2002` in development. Running this package alone gives you the shell with both refs unavailable.

Run all three together from the repo root:

```sh
yarn demos:composed
```

That starts core on 2001, react on 2002 and this shell on 2000. Open [localhost:2000](http://localhost:2000).


You can see [here][demos] the production Storybook deployed.

If you want to help completing these, check our [contributing guide][contributing] and get started collaborating with Britecharts.

[demos]: **
[contributing]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
