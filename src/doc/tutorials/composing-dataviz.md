# Composing Your First Data Visualization
In the [Getting Started Guide][gettingStartedGuide] we saw how to set up a responsive Bar chart using Britecharts. This was easy, however, most of the times your real world requirements include other components to help communicate your data.

In this tutorial, we will create a more complex data visualization. You will learn how to draw a Line Chart with Tooltip, how to add a Legend and a data filtering tool using a Bursh chart. You will also learn how you can use Britechart's color schemas to change the charts colors or customize your own.

## Rendering a Line Chart
Let's build on top of the Bar Chart tutorial by using its code structure. The first change will be that we will be downloading the full library bundle instead of just one chart:
```html
<script src="https://cdn.jsdelivr.net/npm/britecharts@2.10.0/dist/bundled/britecharts.min.js"></script>
```
Then, we will instantiate a Line Chart:
```js
const lineChart = britecharts.line();
```
The shape of our data will necessarily change as well. We need to check the [Line Chart API Refe2221021210201chema] for this chart. In our case, it will look like this:
```js
const lineData = {
    "dataByTopic": [
        {
            "topic": -1,
            "topicName": "Vivid",
            "dates": [
                {
                    "value": 0,
                    "date": "2016-08-01T00:00:00-07:00"
                },
                {
                    "value": 3,
                    "date": "2016-08-02T00:00:00-07:00"
                },
                ...
            ]
        }
    ]
};
```

Before configuring the chart, this time we will get the container's size to apply it as the chart width:
```js
const containerWidth = container.node().getBoundingClientRect().width;
```

Configuring and rendering the Line Chart will follow an identical approach:
```js
lineChart
    .margin({bottom: 50})
    .height(400)
    .width(containerWidth);

container.datum(lineData).call(lineChart);
```

That will render the following chart:
![Simple Line Chart][lineChartImg]

## Adding a Tooltip
Now that we have a line chart working, we will add a tooltip to allow users to check the specific values on each date.

We start by instantiating a new [Tooltip component][tooltipAPIReference]:
```js
const chartTooltip = tooltip();
```

In the next step, we are going to bind the events triggering when users hover, move or exit the line chart to the tooltip. The methods from the tooltip we are going to use are `show`, `update` and `hide`. Let's see how:
```js
lineChart
    .margin({bottom: 50})
    .height(400)
    .width(containerWidth)
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);
```
Following the previous code, we expect the tooltip to appear whenever the user passes his mouse over the chart. It should hide when the mouse goes out of the area of the chart. Finally, the tooltip should update its values whenever the mouse moves within the limits of the chart.

We still have to attach the tooltip to the rendered line chart. For that, and only after we render the line chart, we will render the tooltip inside the `metadata-group` within the line. Let's see it in code:
```js
const tooltipContainer = d3.select('.line-container .metadata-group .hover-marker');

tooltipContainer.call(chartTooltip);
```
After the previous code, we will see a tooltip like the following:
![Line Chart with Tooltip][lineChartTooltipImg]

## Drawing a Legend
Up to now, we have been working with a dataset that contains only one topic. But what happens if we have two topics? In this section, we will update our data to contain another set of entries. We will add a Legend component to show our users which line corresponds to which topic.

First, we make a copy of the topic we already have and change some values. We named the new topic "Radiant", and due to our default color schema, it shows as a dark green line.

Now we will instantiate our new [Legend component][legendAPIReference]:
```js
const chartLegend = britecharts.legend();
```
The same way as we needed a container for the chart, we will need another for the legend. For that, we first create a div:
```html
<div class="legend-container"></div>
```
And then select the container with a D3 selection and save the reference:
```js
const legendContainer = d3.select('.legend-container');
```

The legend is a component that depends on the data and in a specific data shape. We check the Legend data schema and it needs to be:
```json
[
    {
        id: 1,
        quantity: 2,
        name: 'glittering'
    },
    {
        id: 2,
        quantity: 3,
        name: 'luminous'
    }
]
```
As we want to show an inline legend, which doesn't show the quantity, we only need to pass an array with our topic names, an id and a random quantity. Here is how we will create that data:
```js
const legendData = lineData.dataByTopic.map(
    ({topicName, topic}) => ({
            id: topic,
            name: topicName,
            quantity: 0
    })
);
```
And we are ready to configure and draw the legend:
```js
chartLegend
    .width(containerWidth)
    .height(60)
    .isHorizontal(true);

legendContainer.datum(legendData).call(chartLegend);
```
Note how we have used the container width in order to position the legend centered. You can see the rest of options of the legend component in its [API reference page][legendAPIReference].

The resulting chart is:
![Line Chart with Legend][lineChartLegendImg]

## Filtering Data with a Brush
## Styling the charts
## Summary

You can see the full code of this tutorial [in this file][composingDatavizTutorialHTML].


[gettingStartedGuide]: X
[lineChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/tutorials/simple-line-chart.png
[composingDatavizTutorialHTML]: https://github.com/eventbrite/britecharts/blob/master/src/doc/html/tutorial-composing-dataviz.html
[lineChartAPIReference]: http://eventbrite.github.io/britecharts/module-Line.html
[lineChartDataSchema]: http://eventbrite.github.io/britecharts/global.html#LineChartData
[tooltipAPIReference]: http://eventbrite.github.io/britecharts/module-Tooltip.html
[lineChartTooltipImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/tutorials/line-chart-tooltip.png
[legendAPIReference]: http://eventbrite.github.io/britecharts/module-Legend.html
[lineChartLegendImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/tutorials/line-chart-legend.png