'use strict';

const d3Selection = require('d3-selection');

const PubSub = require('pubsub-js');

const sparklineChart = require('./../../src/charts/sparkline');
const dataBuilder = require('./../../test/fixtures/sparklineDataBuilder');

const aTestDataSet = () => new dataBuilder.SparklineDataBuilder();
let redrawCharts;

require('./helpers/resizeHelper');


function createSparklineChart() {
    let sparkline = sparklineChart(),
        containerWidth = d3Selection.select('.js-sparkline-chart-container').node().getBoundingClientRect().width,
        container = d3Selection.select('.js-sparkline-chart-container'),
        dataset;

    d3Selection.select('#button').on('click', function() {
        sparkline.exportChart('sparkline.png', 'Britechart Sparkline Chart');
    });

    dataset = aTestDataSet().with1Source().build();

    // Sparkline Chart Setup and start
    sparkline
        .dateLabel('dateUTC')
        .isAnimated(true)
        .duration(1000)
        .height(containerWidth / 4)
        .width(containerWidth);

    container.datum(dataset.data).call(sparkline);
}

function createLoadingState() {
    let sparkline = sparklineChart(),
        containerWidth = d3Selection.select('.js-loading-container').node().getBoundingClientRect().width,
        container = d3Selection.select('.js-loading-container'),
        dataset = null;

    if (containerWidth) {
        container.html(sparkline.loadingState());
    }
}

// Show charts if container available
if (d3Selection.select('.js-sparkline-chart-container').node()){
    createSparklineChart();
    createLoadingState();

    redrawCharts = function(){
        d3Selection.selectAll('.sparkline').remove();
        createSparklineChart();
        createLoadingState();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
