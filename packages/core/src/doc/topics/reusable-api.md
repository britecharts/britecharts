## The Reusable Chart API

The Reusable Chart API is a modular structure to create and reuse D3.js components. We saw the first example of this pattern in Mike Bostock’s seminal post [Towards Reusable Charts (2012)][towardsreusablecharts].

We built Britecharts using this design pattern, so that all our components benefit from its characteristics. They are all _simple, modular, reusable, composable, and testable_.

The pattern is based in a closure that allows us to keep properties private and define the elements of the components' API. Take a look at the code:

```js
/**
 * This function creates the graph using the selection as container
 * @param {D3Selection} _selection A d3 selection that represents
 * the container(s) where the chart(s) will be rendered
 */
function exports(_selection) {
    /* @param {object} _data The data to attach and generate the chart */
    _selection.each(function (_data) {
        chartWidth = width - margin.left - margin.right;
        chartHeight = height - margin.top - margin.bottom;
        data = _data;

        buildScales();
        buildAxis();
        buildSVG(this);
        buildContainerGroups();
        drawBars();
        drawAxis();
    });
}

/**
 * Gets or Sets the margin of the chart
 * @param {object} _x            Margin object to get/set
 * @return { margin | module}    Current margin or Bar Chart module to chain calls
 * @public
 */
exports.margin = function (_x) {
    if (!arguments.length) {
        return margin;
    }
    margin = _x;
    return this;
};

return exports;
```

This piece of code returns a function that accepts a D3.js selection as input. Then, it extracts the data of that selection to build a chart, using the selection as the container. It also accepts some configuration (the margin, in this case) that we can set beforehand.

To learn more about this pattern you can read [this blog post][reusableapi] on Eventbrite's Engineering Blog.

[reusableapi]: https://www.eventbrite.com/engineering/leveling-up-d3-the-reusable-chart-api/
[towardsreusablecharts]: http://bost.ocks.org/mike/chart/
