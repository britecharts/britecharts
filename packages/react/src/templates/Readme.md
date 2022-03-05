### With default properties
```js
    const chartData = require('./{{camelCase chartName}}Chart.fixtures.js').default;
    
    <{{pascalCase componentName}}
        data={chartData.firstDataMethod()}
        isLoading={true}
    />
```

### With loading state
```js

    <{{pascalCase componentName}}
        data={null}
        isLoading={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: YourLinkToComponentAPIHere
[DataLink]: YourLinkToExampleDataInputHere