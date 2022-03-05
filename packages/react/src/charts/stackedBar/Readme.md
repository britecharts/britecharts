### With default properties
```js
    const stackedBarData = require('./stackedBarChart.fixtures.js').default;

    <StackedBar
        data={stackedBarData.with3Sources()}
    />
```

### With horizontal and fixed width and height
```js
    const stackedBarData = require('./stackedBarChart.fixtures.js').default;

    <StackedBar
        data={stackedBarData.with3Sources()}
        isHorizontal={true}
        width={600}
        height={400}
    />
```

### With default properties and tooltip
```js
    const Tooltip = require('../tooltip/Tooltip.js').default;
    const stackedBarData = require('./stackedBarChart.fixtures.js').default;
    const margin = {
        top: 60,
        right: 30,
        bottom: 60,
        left: 70,
    };

    const renderStackedBar = (props) => (
        <StackedBar
            margin={margin}
            {...props}
        />
    );

    <Tooltip
        data={stackedBarData.with3SourcesAndDates()}
        render={renderStackedBar}
        title="Tooltip Title"
        dateLabel="key"
        nameLabel="stack"
    />
```

### With loading state
```js
    <StackedBar
        data={[]}
        isLoading={true}
    />
```

See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://britecharts.github.io/britecharts/module-Stacked-bar.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#stackedBarData__anchor