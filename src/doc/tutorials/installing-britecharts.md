# Installing Britecharts
In the [Getting Started Guide][gettingStarted] you saw how to use Britecharts using a CDN link. This is not the only way. Britecharts allows developers to add the library following several strategies.

In this tutorial, you will learn to install Britecharts in your project by using different approaches:
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
Notice this requires you to have in place a bundling system (Webpack, Parcel, Rollup, Gulp or Grunt). If you want to drop a script in an HTML file and start working, use the CDN way below.

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

## Download from the CDN
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

## Building the source code
To build the soure code, you need first to get the code. You can do it by cloning or downloading it from Github.com. You can clone the git repository by running:
```
   git clone https://github.com/eventbrite/britecharts.git
```
Or download the source code by navigating to the [Release Page][githubReleases] and click in the latest's release `zip` or `tar.gz` links.

Then, you would need to install the dependencies and build the project. Check the [Contributing Guide][contributingGuide] to learn about this process.

## Summary
In this tutorial, you have seen three different ways of adding Britecharts to  your site or web application.

To keep on learning more about Britecharts, you can follow our [Composing Your First Data Visualization][composingDataviz] or our [Styling Britecharts][stylingBritecharts] tutorials. You can also check out our [documentation Homepage][home] and our [kitchen sink][demos] to see all the available charts.

If you are excited about Britecharts, want to add more configurable properties or even create your own chart, please check our [Contributing Guide][contributingGuide]. In it, we walk you through the development environment setup, running our docs and demos and creating new Pull Requests.

[jsDelivrDist]: https://cdn.jsdelivr.net/npm/britecharts/dist/
[cdnDemo]: https://eventbrite.github.io/britecharts/cdn.html
[jsbinSandbox]: https://jsbin.com/wativun/1/edit?html,js,output
[codepenSandbox]: https://codepen.io/Golodhros/pen/PprGeP?editors=1010
[contributingGuide]: https://github.com/eventbrite/britecharts/blob/master/.github/CONTRIBUTING.md
[githubReleases]: https://github.com/eventbrite/britecharts/releases
[home]: http://eventbrite.github.io/britecharts/
[demos]: http://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html
[gettingStarted]: http://eventbrite.github.io/britecharts/getting-started.html
[composingDataviz]: http://eventbrite.github.io/britecharts/composing-dataviz.html
[stylingBritecharts]: http://eventbrite.github.io/britecharts/styling-dataviz.html
