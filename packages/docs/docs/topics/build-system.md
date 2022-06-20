---
sidebar_position: 5
---

# The Build System

### ES2015 transpiling

We built Britecharts modules with es2015 to create an ES5-compatible version of the charts before releasing a new version.

To work with the development version of the charts, you need to run:
`yarn run demos`

However, if you want to create the production version of the charts, you should run:
`yarn run build`

### The Tasks

The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `yarn run test` and `yarn run build` most of the time, the other tasks can be called independently or be combined to see the docs.

| Task                     | Description                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `yarn run test`          | Starts jest to run the tests of all package of the project.                              |
| `yarn run demos`         | Serves the storybook with its demos for the packages that have one.                      |
| `yarn run docs`          | Compiles the docs with JSDoc and opens a browser showing them.                           |
| `yarn run styles`        | Compiles the styles for the charts                                                       |
| `yarn run build`         | Builds everything and generates the distribution version of the charts.                  |
| `yarn run release`       | Creates a new release of the library wity a patch.                                       |
| `yarn run release:minor` | Creates a new release of the library by bumping the second number of the version (1.N.1) |
| `yarn run release:major` | Creates a new release of the library by bumping the third number of the version (N.1.1)  |

[node]: http://nodejs.org
