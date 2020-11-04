## The Build System

### ES2015 transpiling

We built Britecharts module in es2015 to create an ES5-compatible version of the charts before releasing a new version.

To work with the development version of the charts, we need to run:
`yarn run demos:serve`

However, if you want to create the production version of the charts, you should run:
`yarn run build`

### The Tasks

The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `yarn run test` and `yarn run build` most of the time, the other tasks can be called independently or be combined to see the docs.

| Task                     | Description                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `yarn run test`          | Starts the Karma runner that tests the project and keep watching for changes.            |
| `yarn run demos:serve`   | Serves the demos for our tutorials.                                                      |
| `yarn run docs`          | Compiles the docs with JSDoc and opens a browser showing them.                           |
| `yarn run styles`        | Compiles the styles for the charts                                                       |
| `yarn run build`         | Builds everything and generates the distribution version of the charts.                  |
| `yarn run release`       | Creates a new release of the library.                                                    |
| `yarn run release:minor` | Creates a new release of the library by bumping the second number of the version (1.N.1) |
| `yarn run release:major` | Creates a new release of the library by bumping the third number of the version (N.1.1)  |

\*\*Note that for running `yarn run docs`, you need first to have `yarn run demos:serve` in a different terminal.

[node]: http://nodejs.org
