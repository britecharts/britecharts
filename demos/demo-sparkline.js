'use strict';

var d3 = require('d3'),
    sparklineChart = require('./../dist/charts/sparkline'),
    sparklineDataBuilder = require('./../test/fixtures/sparklineDataBuilder');


function createSparklineChart() {
    var sparkline = sparklineChart(),
        testDataSet = new sparklineDataBuilder.SparklineDataBuilder(),
        containerWidth = d3.select('.js-sparkline-chart-container').node().getBoundingClientRect().width,
        container = d3.select('.js-sparkline-chart-container'),
        dataset;

    d3.select("#button").on('click', function() {
        sparkline.exportChart();
    });

    dataset = testDataSet.with1Source().build();

    // Sparkline Chart Setup and start
    sparkline
        .dateLabel('dateUTC')
        .width(containerWidth / 2);

    container.datum(dataset.data).call(sparkline);
}

// Show charts if container available
if (d3.select('.js-sparkline-chart-container').node()){
    createSparklineChart();

    d3.select(window).on('resize', function(){
        d3.selectAll('.sparkline').remove();
        createSparklineChart();
    });
}
