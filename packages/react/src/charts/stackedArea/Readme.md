### With tooltip
```js
    const Tooltip = require('../tooltip/Tooltip.js').default;
    const stackedAreaData = require('./stackedAreaChart.fixtures.js').default;

    const renderStackedArea = (props) => (
        <StackedArea
            data={stackedAreaData.with3Sources()}
            width={800}
            {...props}
        />
    );

    <Tooltip
        data={stackedAreaData.with3Sources()}
        render={renderStackedArea}
        topicLabel="values"
    />
```

### With mouse events (on console)
```js
    const stackedAreaData = require('./stackedAreaChart.fixtures.js').default;
    const logMouseOver = () => console.log('Mouse Over');
    const logMouseOut = () => console.log('Mouse Out');
    const logMouseMoveTooltip = (dataPoint, topicColorMap, dataPointXPosition) => {
        console.log('Mouse Move: dataPoint', dataPoint);
        console.log('Mouse Move: topicColorMap', topicColorMap);
        console.log('Mouse Move: dataPointXPosition', dataPointXPosition);
    };

    <StackedArea
        data={stackedAreaData.with2Sources()}
        customMouseOver={logMouseOver}
        customMouseMove={logMouseMoveTooltip}
        customMouseOut={logMouseOut}
    />
```

### With loading state
```js

    <StackedArea
        data={[]}
        isLoading={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://britecharts.github.io/britecharts/module-Stacked-area.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#areaChartData__anchor
