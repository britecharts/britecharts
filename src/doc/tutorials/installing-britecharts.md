# Installing Britecharts
To install Britecharts in your project you can to install it using different approaches:
* Using the Node Package Manager (NPM) or Yarn
* Using the CDN links
* Building the Source Code

## Install with NPM
The recommended way of installing Britecharts is to use NPM or Yarn:
```
npm install --save britecharts d3-selection
```
Or, using Yarn:
```
yarn add britecharts d3-selection
```
Notice this requires you to have in place a bundling system (Webpack, Parcel, Rollup, Gulp or Grunt). If you just want to drop a script in a HTML file and start working, use the CDN way below.

To use the modules within your JavaScript code, you will follow a different approach depending on the type of modules you are using:
```js
// For AMD and CommonJS modules
const selection = require('d3-selection');
const LineChart = require('britecharts/umd/line.min');

// For ES modules
import bar from 'britecharts/dist/umd/bar.min';
```

When loading the styles, you have two options, loading the whole stylesheet of the library:
```html
<link type="text/css" rel="stylesheet" href="node_modules/britecharts/dist/css/britecharts.min.css">
```

Or loading only the styles for the current chart plus the common Britecharts styles:
```html
<link type="text/css" rel="stylesheet" href="node_modules/britecharts/dist/css/common/common.min.css">
<link type="text/css" rel="stylesheet" href="node_modules/britecharts/dist/css/charts/bar.min.css">
```

## Download From the CDN
To import the latest bundle (2.x.x version), use this URL:
```
https://cdn.jsdelivr.net/npm/britecharts@2/dist/bundled/britecharts.min.js
```
This bundle attaches to the global `window` object a JavaScript object called `britecharts`. Within it, you can find the charts and helpers you need.

With Britecharts, you can also download individual bundles of the charts and helpers. To do this, you can [browse all CDN files][jsDelivrDist], browsing inside the `umd` folder to find the chart URL you need.

You can see the CDN links in action in:
* our [CDN demo page][cdnDemo]
* this [JSBin][jsbinSandbox] sandbox project
* this [CodePen][codepenSandbox] pen

## Building the Source Code
In order to build the Soure Code, you need to first get the code. You can do it by cloning or downloading it from Github.com. You can clone the git repository by running:
```
   git clone https://github.com/eventbrite/britecharts.git
```
Or download the source code by navigating to the [Release Page][githubReleases] and click in the latest's release `zip` or `tar.gz` links.

Then, you would need to install the dependencies and build the project. Check the [Contributing Guide][contributingGuide] to learn about this process.

[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts/dist/
[cdnDemo]: https://eventbrite.github.io/britecharts/cdn.html
[jsbinSandbox]: https://jsbin.com/wativun/1/edit?html,js,output
[codepenSandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[contributingGuide]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[githubReleases]: https://github.com/eventbrite/britecharts/releases
