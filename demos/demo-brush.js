'use strict';

var d3 = require('d3'),

    PubSub = require('pubsub-js'),

    brush = require('./../src/charts/brush'),
    dataBuilder = require('./../test/fixtures/brushChartDataBuilder');


function createBrushChart() {
    var brushChart = brush(),
        testDataSet = new dataBuilder.BrushDataBuilder(),
        brushContainer = d3.select('.js-brush-chart-container'),
        containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.withSimpleData().build();

        brushChart
            .width(containerWidth)
            .height(200)
            .onBrush(function(brushExtent) {
                var format = d3.timeFormat('%m/%d/%Y');

                d3.select('.js-start-date').text(format(brushExtent[0]));
                d3.select('.js-end-date').text(format(brushExtent[1]));

                d3.select('.js-date-range').classed('is-hidden', false);
            });

        brushContainer.datum(dataset).call(brushChart);
    }
}

// Show charts if container available
if (d3.select('.js-brush-chart-container').node()){
    createBrushChart();

    var redrawCharts = function(){
        d3.select('.brush-chart').remove();

        createBrushChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
