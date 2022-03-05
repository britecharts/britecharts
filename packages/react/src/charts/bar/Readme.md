### Vertical
```js
    const barData = require('./barChart.fixtures.js').default;

    <Bar
        data={barData.withLetters()}
    />
```

### Horizontal with custom color schema
```js
    const colors = require('britecharts/dist/umd/colors.min');
    const barData = require('./barChart.fixtures.js').default;

    <Bar
        data={barData.withColors()}
        isHorizontal={true}
        height={400}
        betweenBarsPadding={0.3}
        colorSchema={colors.colorSchemas.orange}
        margin={{
            left: 100,
            right: 40,
            top: 40,
            bottom: 40
        }}
    />
```

### With loading state
```js

    <Bar
        data={[]}
        isLoading={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]


[APILink]: http://britecharts.github.io/britecharts/module-Bar.html
[DataLink]: http://britecharts.github.io/britecharts/global.html#BarChartData__anchor