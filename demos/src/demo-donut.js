import { select, selectAll } from 'd3-selection';
import PubSub from 'pubsub-js';

import donut from './../../src/charts/donut';
import legend from './../../src/charts/legend';
import { DonutDataBuilder } from './../../test/fixtures/donutChartDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

const dataset = new DonutDataBuilder().withFivePlusOther().build();
const datasetNoPercentages = new DonutDataBuilder()
    .withFivePlusOtherNoPercent()
    .build();
const datasetWithThreeItems = new DonutDataBuilder()
    .withThreeCategories()
    .build();
let legendChart;
let redrawCharts;

require('./helpers/resizeHelper');

function createDonutChart(optionalColorSchema) {
    let legendChart = getLegendChart(dataset, optionalColorSchema),
        donutChart = donut(),
        donutContainer = select('.js-donut-chart-container'),
        containerWidth = donutContainer.node()
            ? donutContainer.node().getBoundingClientRect().width
            : false;

    if (containerWidth) {
        select('#button').on('click', function () {
            donutChart.exportChart();
        });

        donutChart
            .isAnimated(true)
            .highlightSliceById(2)
            .width(containerWidth)
            .height(containerWidth)
            .externalRadius(containerWidth / 2.5)
            .internalRadius(containerWidth / 5)
            .on('customMouseOver', function (data) {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.clearHighlight();
            });

        if (optionalColorSchema) {
            donutChart.colorSchema(optionalColorSchema);
        }

        donutContainer.datum(dataset).call(donutChart);

        select('#button').on('click', function () {
            donutChart.exportChart('donut.png', 'Britecharts Donut Chart');
        });
    }
}

function getLegendChart(dataset, optionalColorSchema) {
    let legendChart = legend(),
        legendContainer = select('.js-legend-chart-container'),
        containerWidth = legendContainer.node()
            ? legendContainer.node().getBoundingClientRect().width
            : false;

    if (containerWidth) {
        select('.js-legend-chart-container .britechart-legend').remove();

        legendChart
            .width(containerWidth * 0.8)
            .height(200)
            .numberFormat('s');

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function getInlineLegendChart(dataset, optionalColorSchema) {
    let legendChart = legend(),
        legendContainer = select('.js-inline-legend-chart-container'),
        containerWidth = legendContainer.node()
            ? legendContainer.node().getBoundingClientRect().width
            : false;

    if (containerWidth) {
        select('.js-inline-legend-chart-container .britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth * 0.6)
            .markerSize(8)
            .height(40);

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function getVerticalLegendChart(dataset, optionalColorSchema) {
    let legendChart = legend(),
        legendContainer = select('.js-vertical-legend-no-quantity-container'),
        containerWidth = legendContainer.node()
            ? legendContainer.node().getBoundingClientRect().width
            : false;

    if (containerWidth) {
        select(
            '.js-vertical-legend-no-quantity-container .britechart-legend'
        ).remove();

        legendChart.width(containerWidth).height(100);

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function createSmallDonutChart() {
    let donutChart = donut(),
        donutContainer = select('.js-small-donut-chart-container'),
        containerWidth = donutContainer.node()
            ? donutContainer.node().getBoundingClientRect().width
            : false,
        legendChart = getInlineLegendChart(datasetWithThreeItems);

    if (containerWidth) {
        donutChart
            .width(containerWidth)
            .height(containerWidth / 1.8)
            .externalRadius(containerWidth / 5)
            .internalRadius(containerWidth / 10)
            .on('customMouseOver', function (data) {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.clearHighlight();
            });

        donutContainer.datum(datasetWithThreeItems).call(donutChart);
    }
}

function createDonutWithHighlightSliceChart() {
    let dataNoQuantity = JSON.parse(JSON.stringify(datasetWithThreeItems)).map(
            (item) => {
                delete item.quantity;

                return item;
            }
        ),
        legendChart = getVerticalLegendChart(dataNoQuantity),
        donutChart = donut(),
        donutContainer = select('.js-donut-highlight-slice-chart-container'),
        containerWidth = donutContainer.node()
            ? donutContainer.node().getBoundingClientRect().width
            : false;

    if (containerWidth) {
        donutChart
            .highlightSliceById(11)
            .hasFixedHighlightedSlice(true)
            .width(containerWidth)
            .height(containerWidth / 1.8)
            .externalRadius(containerWidth / 5)
            .internalRadius(containerWidth / 10)
            .on('customMouseOver', function (slice) {
                legendChart.highlight(slice.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.highlight(11);
            });

        legendChart.highlight(11);
        donutContainer.datum(datasetWithThreeItems).call(donutChart);
    }
}

function createLoadingState() {
    let donutChart = donut(),
        donutContainer = select('.js-loading-container'),
        containerWidth = donutContainer.node()
            ? donutContainer.node().getBoundingClientRect().width
            : false,
        dataset = null;

    if (containerWidth) {
        donutContainer.html(donutChart.loadingState());
    }
}

// Show charts if container available
if (select('.js-donut-chart-container').node()) {
    createDonutChart();
    createSmallDonutChart();
    createDonutWithHighlightSliceChart();
    createLoadingState();

    redrawCharts = function () {
        selectAll('.donut-chart').remove();

        createDonutChart();
        createSmallDonutChart();
        createDonutWithHighlightSliceChart();
        createLoadingState();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.donut-chart',
        createDonutChart
    );
}
