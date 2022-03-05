### With default properties
```js
    const groupedBarData = require('./groupedBarChart.fixtures.js').default;

    <GroupedBar
        data={groupedBarData.with3Groups()}
    />
```

### Horizontal, with fixed width and height
```js
    const groupedBarData = require('./groupedBarChart.fixtures.js').default;

    <GroupedBar
        data={groupedBarData.with3Groups()}
        isHorizontal={true}
        width={500}
        height={200}
    />
```

### With loading state
```js

    <GroupedBar
        data={[]}
        isLoading={true}
    />
```

See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://britecharts.github.io/britecharts/module-Grouped-bar.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#GroupedBarChartData__anchor