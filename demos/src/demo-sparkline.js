import { select, selectAll } from 'd3-selection';
// import PubSub from 'pubsub-js';

import sparklineChart from './../../src/charts/sparkline/sparkline';
import { SparklineDataBuilder } from './../../src/charts/sparkline/sparklineDataBuilder';

require('./helpers/resizeHelper');

const aTestDataSet = () => new SparklineDataBuilder();
let redrawCharts;

function createSparklineChart() {
    let sparkline = sparklineChart(),
        containerWidth = select('.js-sparkline-chart-container')
            .node()
            .getBoundingClientRect().width,
        container = select('.js-sparkline-chart-container'),
        dataset;

    select('#button').on('click', function () {
        sparkline.exportChart('sparkline.png', 'Britechart Sparkline Chart');
    });

    dataset = aTestDataSet().with1Source().build();

    // Sparkline Chart Setup and start
    sparkline
        .isAnimated(true)
        .height(containerWidth / 4)
        .width(containerWidth);

    container.datum(dataset).call(sparkline);
}

function createLoadingState(isLoading, instance) {
    let sparkLine = instance ? instance : sparklineChart(),
        container = select('.js-loading-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false;
    const dataset = aTestDataSet().with1Source().build();

    if (containerWidth) {
        sparkLine
            .width(containerWidth)
            .height(containerWidth / 4)
            .isAnimated(true)
            .isLoading(isLoading);

        container.datum(dataset).call(sparkLine);
    }

    return sparkLine;
}

// Show charts if container available
if (select('.js-sparkline-chart-container').node()) {
    createSparklineChart();
    createLoadingState(true);

    redrawCharts = function () {
        selectAll('.sparkline').remove();
        createSparklineChart();
        createLoadingState(false);
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);
}
