### With default properties
```js
    const chartData = require('./stepChart.fixtures.js').default;

    <Step
        data={chartData.firstDataMethod()}
    />
```

### With loading state
```js

    <Step
        data={[]}
        isLoading={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://britecharts.github.io/britecharts/module-Step.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#stackedBarData__anchor