'use strict';

var d3Selection = require('d3-selection'),
    d3TimeFormat = require('d3-time-format'),

    PubSub = require('pubsub-js'),

    brush = require('./../src/charts/brush'),
    dataBuilder = require('./../test/fixtures/brushChartDataBuilder');


function createBrushChart() {
    var brushChart = brush(),
        testDataSet = new dataBuilder.BrushDataBuilder(),
        brushContainer = d3Selection.select('.js-brush-chart-container'),
        containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.withSimpleData().build();

        brushChart
            .width(containerWidth)
            .height(125)
            .onBrush(function(brushExtent) {
                var format = d3TimeFormat.timeFormat('%m/%d/%Y');

                d3Selection.select('.js-start-date').text(format(brushExtent[0]));
                d3Selection.select('.js-end-date').text(format(brushExtent[1]));

                d3Selection.select('.js-date-range').classed('is-hidden', false);
            });

        brushContainer.datum(dataset).call(brushChart);
    }
}

// Show charts if container available
if (d3Selection.select('.js-brush-chart-container').node()){
    createBrushChart();

    var redrawCharts = function(){
        d3Selection.select('.brush-chart').remove();

        createBrushChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
