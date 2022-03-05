### With one line with tooltip and basis curve

```js
const Tooltip = require('../tooltip/Tooltip.js').default;
const lineData = require("./lineChart.fixtures").default;
const margin = {
    top: 60,
    right: 30,
    bottom: 60,
    left: 70,
};

const renderLine = (props) => (
    <Line margin={margin} lineCurve="basis" {...props} />
);

<Tooltip
    data={lineData.oneSet()}
    render={renderLine}
    topicLabel="topics"
    title="Tooltip Title"
/>;
```

### With multiple lines with tooltip

```js
const Tooltip = require('../tooltip/Tooltip.js').default;
const lineData = require("./lineChart.fixtures").default;
const margin = {
    top: 60,
    right: 30,
    bottom: 60,
    left: 70,
};

const renderLine = (props) => (
    <Line tooltipThreshold={0} margin={margin} {...props} />
);

<Tooltip
    data={lineData.fiveTopics()}
    render={renderLine}
    topicLabel="topics"
    title=""
/>;
```

### With multiple lines with stepBefore curve and teal colorSchema

```js
const lineData = require("./lineChart.fixtures").default;
const colors = require("../helpers/colors.js");
const margin = {
    top: 60,
    right: 30,
    bottom: 60,
    left: 70,
};

<Line
    data={lineData.fiveTopics()}
    margin={margin}
    lineCurve="stepBefore"
    tooltipThreshold={2000}
    colorSchema={colors.colorSchemas.teal}
/>;
```

### With loading state

```js
<Line data={{data: []}} isLoading={true} />
```

See more:

-   [API description][apilink]
-   [Data definition][datalink]

[apilink]: http://britecharts.github.io/britecharts/module-Line.html
[datalink]: http://britecharts.github.io/britecharts/global.html#LineChartData__anchor
