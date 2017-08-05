'use strict';

const d3Selection = require('d3-selection');
const d3TimeFormat = require('d3-time-format');
const PubSub = require('pubsub-js');

const brush = require('./../src/charts/brush');
const dataBuilder = require('./../test/fixtures/brushChartDataBuilder');


function createBrushChart() {
    let brushChart = brush(),
        testDataSet = new dataBuilder.BrushDataBuilder(),
        brushContainer = d3Selection.select('.js-brush-chart-container'),
        containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.withSimpleData().build();

        brushChart
            .width(containerWidth)
            .height(125)
            .on('customBrushStart', function(brushExtent) {
                let format = d3TimeFormat.timeFormat('%m/%d/%Y');

                d3Selection.select('.js-start-date').text(format(brushExtent[0]));
                d3Selection.select('.js-end-date').text(format(brushExtent[1]));

                d3Selection.select('.js-date-range').classed('is-hidden', false);
            })
            .on('customBrushEnd', function(brushExtent) {
                console.log('rounded extent', brushExtent);
            });

        brushContainer.datum(dataset).call(brushChart);

        brushChart.dateRange(['9/15/2015', '1/25/2016'])
    }
}

// Show charts if container available
if (d3Selection.select('.js-brush-chart-container').node()){
    createBrushChart();

    let redrawCharts = function(){
        d3Selection.select('.brush-chart').remove();

        createBrushChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
