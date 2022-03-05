### With animation
```js
    const sparklineData = require('./sparklineChart.fixtures.js').default;
    
    <Sparkline
        data={sparklineData.with1Source()}
        isAnimated={true}
        width={400}
        animationDuration={1000}
        height={100}
    />
```

### With fixed width and title
```js
    const sparklineData = require('./sparklineChart.fixtures.js').default;

    <Sparkline
        data={sparklineData.withLowValues()}
        height={100}
        width={400}
        titleText="Yearly prediction"
    />
```

### With loading state
```js
    <Sparkline
        data={[]}
        height={100}
        width={200}
        isLoading={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://britecharts.github.io/britecharts/module-Sparkline.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#SparklineChartData__anchor