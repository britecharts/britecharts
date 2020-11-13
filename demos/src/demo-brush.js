import { select, event } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import PubSub from 'pubsub-js';

import brush from './../../src/charts/brush';
import { BrushDataBuilder } from './../../test/fixtures/brushChartDataBuilder';

require('./helpers/resizeHelper');

function createBrushChart() {
    const brushChart = brush();
    const testDataSet = new BrushDataBuilder();
    const brushContainer = select('.js-brush-chart-container');
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    let dataset;

    let elementDateRange = select('.js-date-range');

    if (containerWidth) {
        dataset = testDataSet.withSimpleData().build();

        brushChart
            .width(containerWidth)
            .height(125)
            .on('customBrushStart', function (brushExtent) {
                let format = timeFormat('%m/%d/%Y');

                select('.js-start-date').text(format(brushExtent[0]));
                select('.js-end-date').text(format(brushExtent[1]));

                elementDateRange.classed('is-hidden', false);
            })
            .on('customBrushEnd', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('rounded extent', brushExtent);

                if (brushExtent[0] === null) {
                    elementDateRange.classed('is-hidden', true);
                }
            });

        brushContainer.datum(dataset).call(brushChart);

        brushChart.dateRange(['7/15/2015', '7/25/2015']);
    }

    return brushChart;
}

function createOtherBrushChart() {
    const brushChart = brush();
    const testDataSet = new BrushDataBuilder();
    const brushContainer = select('.js-other-brush-chart-container');
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    let dataset;

    let elementDateRange = select('.js-other-date-range');

    if (containerWidth) {
        dataset = testDataSet.withShortData().build();

        brushChart
            .width(containerWidth)
            .height(125)
            .on('customBrushStart', function (brushExtent) {
                let format = timeFormat('%m/%d/%Y');

                select('.js-other-start-date').text(format(brushExtent[0]));
                select('.js-other-end-date').text(format(brushExtent[1]));

                elementDateRange.classed('is-hidden', false);
            })
            .on('customBrushEnd', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('rounded extent', brushExtent);

                if (brushExtent[0] === null) {
                    elementDateRange.classed('is-hidden', true);
                }
            });

        brushContainer.datum(dataset).call(brushChart);

        brushChart.dateRange(['1/06/2011', '1/07/2011']);
    }

    return brushChart;
}

// Show charts if container available
if (select('.js-brush-chart-container').node()) {
    const brushChart = createBrushChart();
    const otherBrushChart = createOtherBrushChart();

    const redrawCharts = function () {
        const brushContainer = select('.js-brush-chart-container');
        const containerWidth = brushContainer.node()
            ? brushContainer.node().getBoundingClientRect().width
            : false;
        const otherBrushContainer = select('.js-other-brush-chart-container');
        const otherContainerWidth = otherBrushContainer.node()
            ? otherBrushContainer.node().getBoundingClientRect().width
            : false;

        brushChart.width(containerWidth).dateRange([null, null]);
        otherBrushChart.width(otherContainerWidth).dateRange([null, null]);

        brushContainer.call(brushChart);
        otherBrushContainer.call(otherBrushChart);
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    select('#clear-selection').on('click', function (e) {
        brushChart.dateRange([null, null]);
        event.preventDefault();
    });
    select('#other-clear-selection').on('click', function (e) {
        otherBrushChart.dateRange([null, null]);
        event.preventDefault();
    });
}
