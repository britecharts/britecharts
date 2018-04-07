'use strict';

const d3Selection = require('d3-selection');
const d3TimeFormat = require('d3-time-format');
const PubSub = require('pubsub-js');

const brush = require('./../../src/charts/brush');
const dataBuilder = require('./../../test/fixtures/brushChartDataBuilder');

require('./helpers/resizeHelper');


function createBrushChart() {
    const brushChart = brush();
    const testDataSet = new dataBuilder.BrushDataBuilder();
    const brushContainer = d3Selection.select('.js-brush-chart-container');
    const containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false;
    let dataset;

    let elementDateRange = d3Selection.select('.js-date-range');

    if (containerWidth) {
        dataset = testDataSet.withSimpleData().build();

        brushChart
            .width(containerWidth)
            .height(125)
            .on('customBrushStart', function(brushExtent) {
                let format = d3TimeFormat.timeFormat('%m/%d/%Y');

                d3Selection.select('.js-start-date').text(format(brushExtent[0]));
                d3Selection.select('.js-end-date').text(format(brushExtent[1]));

                elementDateRange.classed('is-hidden', false);
            })
            .on('customBrushEnd', function(brushExtent) {
                // eslint-disable-next-line no-console
                console.log('rounded extent', brushExtent);

                if (brushExtent[0] === null) {
                    elementDateRange.classed('is-hidden', true);
                }
            });

        brushContainer.datum(dataset).call(brushChart);

        brushChart.dateRange(['7/15/2015', '7/25/2015'])
    }

    return brushChart;
}

// Show charts if container available
if (d3Selection.select('.js-brush-chart-container').node()){
    let brushChart = createBrushChart();

    const redrawCharts = function () {
        d3Selection.select('.brush-chart').remove();

        brushChart = createBrushChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    d3Selection.select('#clear-selection').on('click', function (event) {
        brushChart.dateRange([null, null]);
        d3Selection.event.preventDefault();
    });
}
