# Donut Chart

### With highlighted Legend

```js
const donutData = require('./donutChart.fixtures.js').default;
const Legend = require('../legend/Legend.js').default;

class LegendDonut extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { highlightedSlice: null };
    }

    handleMouseOver(data) {
        this.setState({
            highlightedSlice: data.data.id
        });
    }

    handleMouseOut() {
        this.setState({
            highlightedSlice: 99999
        });
    }

    render() {
        const legendMargin = {
            top: 10,
            bottom: 10,
            left: 0,
            right: 30
        };
        const width = 500;

        return (
            <div>
                <Donut
                    data={donutData.with4Slices()}
                    height={width}
                    width={width}
                    externalRadius={width / 2.5}
                    internalRadius={width / 5}
                    isAnimated={false}
                    highlightSliceById={
                        this.state.highlightedSlice
                    }
                    customMouseOver={this.handleMouseOver.bind(
                        this
                    )}
                    customMouseOut={this.handleMouseOut.bind(
                        this
                    )}
                />
                <Legend
                    data={donutData.with4Slices()}
                    height={200}
                    width={width}
                    margin={legendMargin}
                    highlightEntryById={
                        this.state.highlightedSlice
                    }
                />
            </div>
        );
    }
}

<LegendDonut />;
```

See more:

-   [API description][apilink]
-   [Data definition][datalink]

[apilink]: http://britecharts.github.io/britecharts/module-Donut.html
[datalink]: http://britecharts.github.io/britecharts/global.html#DonutChartData__anchor
