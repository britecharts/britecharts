### Why Britecharts React
Britecharts is a D3 based, high level charting library that allows users to create stunning data visualizations with little work. [React][react] is one of the most popular User Interface libraries that allows to create apps by composing small components in an intuitive way. Both libraries take control of the DOM, so how can we make them work together in a fluid way?

Britecharts-react proposes a way of integrating Britecharts and React that promotes a **clear separation of concerns** between the libraries and aims for **easy and effortless maintenance** of the charts.

### Integration Approach
The React and D3 integration can be done at different levels, leaning more one side or another. We don’t want to get too specific on the details, as for that there is [slides][d3-react] and [a recording][d3-react-video] that explain the different approaches.

For this project, we have chosen the approach called ‘Mapping Lifecycle methods’ based on [Nicholas Hery's article][integration-article]. You can see some [code example here][integration-article-code].

This way of integrating React and D3 creates a lightweight React component wrapper that maps React's lifecycle methods `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` into a d3 chart's create, update and unmount methods respectively.

This way, we will end up with a React component that has the usual React dependencies and imports a d3 chart file. This chart module usually contains the d3 dependencies and which, in this case, will contain Britecharts code.

### Implementation
Our initial idea is to create a prototype of this approach using a simple Britecharts chart, iterate over it until we feel confident and only then go ahead and implement the rest of Britecharts.

We have identified some challenges that we would be looking at in our prototype:
* The way to move props from the React wrapper to the D3 Chart
* How to keep ‘DRY' the propTypes, maybe using constants files
* Figure out the logic to do smart updates, triggering React updates only when a change on the data or configuration happens.

### Customizing Charts
Note that the aim of this project is to ‘wrap’ Britecharts with React, so any new features need to first be implemented on Britecharts. Only then we could update the props and logic that passes in the configuration.

Here is what we think is the primary challenge to this project: keeping it up to date with Britecharts. We should figure out smart ways of doing this, trying to parameterize most of the code.

[britecharts]: https://github.com/britecharts/britecharts
[react]: https://facebook.github.io/react/
[d3-react]: http://golodhros.github.io/react-d3/index.html
[d3-react-video]: https://www.youtube.com/watch?v=xGQtHckAauQ&feature=youtu.be&t=30m56s
[integration-article]: http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
[integration-article-code]: https://github.com/nicolashery/example-d3-react
