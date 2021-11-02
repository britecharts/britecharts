import { select, event } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
// import PubSub from 'pubsub-js';

import brush from './../../src/charts/brush/brush';
import { BrushDataBuilder } from './../../src/charts/brush/brushChartDataBuilder';

const aTestDataSet = () => new BrushDataBuilder();

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

                // eslint-disable-next-line no-console
                console.log('customBrushStart extent:', brushExtent);

                select('.js-start-date').text(format(brushExtent[0]));
                select('.js-end-date').text(format(brushExtent[1]));

                elementDateRange.classed('is-hidden', false);
            })
            .on('customBrushEnd', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('customBrushEnd extent:', brushExtent);

                if (brushExtent[0] === null) {
                    elementDateRange.classed('is-hidden', true);
                }
            });

        brushContainer.datum(dataset).call(brushChart);

        brushChart.dateRange(['7/15/2015', '7/25/2015']);
    }

    return brushChart;
}

function createMissingDataBrushChart() {
    const brushChart = brush();
    const testDataSet = new BrushDataBuilder();
    const brushContainer = select('.js-other-brush-chart-container');
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    let dataset;

    let elementDateRange = select('.js-other-date-range');

    if (containerWidth) {
        dataset = testDataSet.withMissingData().build();

        brushChart
            .width(containerWidth)
            .height(125)
            .isAnimated(true)
            .isLocked(true)
            .on('customBrushStart', function (brushExtent) {
                let format = timeFormat('%m/%d/%Y');
                // eslint-disable-next-line no-console
                console.log('customBrushStart extent:', brushExtent);

                select('.js-other-start-date').text(format(brushExtent[0]));
                select('.js-other-end-date').text(format(brushExtent[1]));

                elementDateRange.classed('is-hidden', false);
            })
            .on('customBrushEnd', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('customBrushEnd extent:', brushExtent);

                if (brushExtent[0] === null) {
                    elementDateRange.classed('is-hidden', true);
                }
            });

        brushContainer.datum(dataset).call(brushChart);

        brushChart.dateRange(['7/10/2015', '7/15/2015']);
    }

    return brushChart;
}

function createLoadingState(isLoading, instance) {
    const brushChart = instance ? instance : brush();
    const brushContainer = select('.js-loading-container');
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSimpleData().build();

    if (containerWidth) {
        brushChart
            .width(containerWidth)
            .height(125)
            .isAnimated(true)
            .isLoading(isLoading);

        brushContainer.datum(dataset).call(brushChart);
    }

    return brushChart;
}

// Show charts if container available
if (select('.js-brush-chart-container').node()) {
    const brushChart = createBrushChart();
    const missingDataBrushChart = createMissingDataBrushChart();
    const loadingChart = createLoadingState(true);

    const redrawCharts = function () {
        const brushContainer = select('.js-brush-chart-container');
        const containerWidth = brushContainer.node()
            ? brushContainer.node().getBoundingClientRect().width
            : false;
        const missingDataBrushContainer = select(
            '.js-other-brush-chart-container'
        );
        const missingDataContainerWidth = missingDataBrushContainer.node()
            ? missingDataBrushContainer.node().getBoundingClientRect().width
            : false;

        brushChart.width(containerWidth).dateRange([null, null]);
        missingDataBrushChart
            .width(missingDataContainerWidth)
            .dateRange([null, null]);

        brushContainer.call(brushChart);
        missingDataBrushContainer.call(missingDataBrushChart);
        createLoadingState(false, loadingChart);
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);

    select('#clear-selection').on('click', function (e) {
        brushChart.dateRange([null, null]);
        event.preventDefault();
    });
    select('#other-clear-selection').on('click', function (e) {
        missingDataBrushChart.dateRange([null, null]);
        event.preventDefault();
    });
}
