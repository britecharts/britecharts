'use strict';

var d3 = require('d3'),

    PubSub = require('pubsub-js'),

    sparklineChart = require('./../src/charts/sparkline'),
    sparklineDataBuilder = require('./../test/fixtures/sparklineDataBuilder');


function createSparklineChart() {
    var sparkline = sparklineChart(),
        testDataSet = new sparklineDataBuilder.SparklineDataBuilder(),
        containerWidth = d3.select('.js-sparkline-chart-container').node().getBoundingClientRect().width,
        container = d3.select('.js-sparkline-chart-container'),
        dataset;

    d3.select('#button').on('click', function() {
        sparkline.exportChart('sparkline.png', 'Britechart Sparkline Chart');
    });

    dataset = testDataSet.with1Source().build();

    // Sparkline Chart Setup and start
    sparkline
        .dateLabel('dateUTC')
        .isAnimated(true)
        .duration(1000)
        .height(containerWidth / 4)
        .width(containerWidth);

    container.datum(dataset.data).call(sparkline);
}

// Show charts if container available
if (d3.select('.js-sparkline-chart-container').node()){
    createSparklineChart();

    var redrawCharts = function(){
        d3.selectAll('.sparkline').remove();

        createSparklineChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
