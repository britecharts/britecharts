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
The shape of our data will necessarily change as well. We need to check the [Line Chart API Reference][lineChartAPIReference] to find the [data shape][lineChartDataSchema] for this chart. In our case, it will look like this:
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
## Drawing a Legend
## Filtering Data with a Brush
## Styling the charts
## Summary

You can see the full code of this tutorial [in this file][composingDatavizTutorialHTML].


[gettingStartedGuide]:
[lineChartImg]: https://raw.githubusercontent.com/eventbrite/britecharts/master/src/doc/images/tutorials/simple-line-chart.png
[composingDatavizTutorialHTML]: https://github.com/eventbrite/britecharts/blob/master/src/doc/html/tutorial-composing-dataviz.html
[lineChartAPIReference]: http://eventbrite.github.io/britecharts/module-Line.html
[lineChartDataSchema]: http://eventbrite.github.io/britecharts/global.html#LineChartData