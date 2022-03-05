### With default properties

```js
const chartData = require('./bulletChart.fixtures.js').default;

<Bullet data={chartData.fullTestData()} />;
```

### With measure under ranges

```js
const chartData = require('./bulletChart.fixtures.js').default;

<Bullet data={chartData.underRangeNoMarker()} />;
```

See more:

-   [API description][apilink]
-   [Data definition][datalink]

[apilink]: http://britecharts.github.io/britecharts/module-Bullet.html
[datalink]: http://britecharts.github.io/britecharts/global.html#BulletChartData
