'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    brush = require('./../src/charts/brush'),
    dataBuilder = require('./../test/fixtures/brushChartDataBuilder');


function createBrushChart() {
    var brushChart = brush(),
        testDataSet = new dataBuilder.BrushDataBuilder(),
        containerWidth = d3.select('.js-brush-chart-container').node().getBoundingClientRect().width,
        brushContainer = d3.select('.js-brush-chart-container'),
        dataset;

    dataset = testDataSet.withSimpleData().build();

    brushChart
        .width(containerWidth)
        .height(200)
        .onBrush(function(brushExtent) {
            var format = d3.time.format('%m/%d/%Y');

            d3.select('.js-start-date').text(format(brushExtent[0]));
            d3.select('.js-end-date').text(format(brushExtent[1]));

            d3.select('.js-date-range').classed('is-hidden', false);
        });

    brushContainer.datum(dataset).call(brushChart);
}

// Show charts if container available
if (d3.select('.js-brush-chart-container').node()){
    createBrushChart();

    d3.select(window).on('resize', _.debounce(function(){
        d3.select('.brush-chart').remove();
        createBrushChart();
    }, 200));
}
