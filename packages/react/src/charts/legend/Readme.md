### With default vertical layout and fixed width
```js
    const legendData = require('./legendChart.fixtures.js').default;

    <Legend
        data={legendData.with6Points()}
        height={250}
        width={400}
    />
```

### With horizontal orientation and responsive
```js
    const legendData = require('./legendChart.fixtures.js').default;
    const withResponsiveness = require('../helpers/withResponsiveness.js').default;
    const ResponsiveLegend = withResponsiveness(Legend);

    <ResponsiveLegend
        data={legendData.with6Points()}
        isHorizontal={true}
        marginRatio={1.8}
        height={100}
    />
```

### With horizontal orientation, smaller dots and fixed width
```js
    const legendData = require('./legendChart.fixtures.js').default;

    <Legend
        data={legendData.with6Points()}
        isHorizontal={true}
        markerSize={10}
        marginRatio={1.8}
        width={500}
        height={100}
    />
```

See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://britecharts.github.io/britecharts/module-Legend.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#LegendChartData__anchor
