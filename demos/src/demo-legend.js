'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const donut = require('./../../src/charts/donut');
const legend = require('./../../src/charts/legend');

const dataBuilder = require('./../../test/fixtures/donutChartDataBuilder');
const colorSelectorHelper = require('./helpers/colorSelector');

const dataset = new dataBuilder.DonutDataBuilder()
        .withFivePlusOther().build();
const datasetWithThreeItems = new dataBuilder.DonutDataBuilder()
        .withThreeCategories()
        .build();
let redrawCharts;

require('./helpers/resizeHelper');

function createDonutChart(optionalColorSchema) {
    let legendChart = getLegendChart(dataset, optionalColorSchema),
        donutChart = donut(),
        donutContainer = d3Selection.select('.js-donut-chart-container'),
        containerWidth = d3Selection.select('.js-donut-chart-container').node().getBoundingClientRect().width;

    if (containerWidth) {
        donutChart
            .isAnimated(true)
            .width(containerWidth)
            .height(containerWidth)
            .externalRadius(containerWidth/2.5)
            .internalRadius(containerWidth/5)
            .on('customMouseOver', function(data) {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', function() {
                legendChart.clearHighlight();
            });

        if (optionalColorSchema) {
            donutChart.colorSchema(optionalColorSchema);
        }

        donutContainer.datum(dataset).call(donutChart);

        d3Selection.select('#button').on('click', function() {
            donutChart.exportChart('donut.png', 'Britecharts Donut Chart');
        });
    }
}

function getLegendChart(dataset, optionalColorSchema) {
    let legendChart = legend(),
        legendContainer = d3Selection.select('.js-legend-chart-container'),
        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3Selection.select('.js-legend-chart-container .britechart-legend').remove();

        legendChart
            .height(containerWidth / 3)
            .width(containerWidth / 2)
            .numberFormat('s');

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function createSmallDonutChart() {
    let donutChart = donut(),
        donutContainer = d3Selection.select('.js-small-donut-chart-container'),
        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false,
        legendChart = getInlineLegendChart(datasetWithThreeItems);

    if (containerWidth) {
        donutChart
            .width(containerWidth)
            .height(containerWidth/1.8)
            .externalRadius(containerWidth/5)
            .internalRadius(containerWidth/10)
            .on('customMouseOver', function(data) {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', function() {
                legendChart.clearHighlight();
            });

        donutContainer.datum(datasetWithThreeItems).call(donutChart);
    }
}

function getInlineLegendChart(dataset, optionalColorSchema) {
    let legendChart = legend(),
        legendContainer = d3Selection.select('.js-inline-legend-chart-container'),
        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3Selection.select('.js-inline-legend-chart-container .britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth*0.6)
            .markerSize(8)
            .height(40)

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

// Show charts if container available
if (d3Selection.select('.js-legend-chart-container').node()) {
    createDonutChart();
    createSmallDonutChart();

    redrawCharts = function(){
        d3Selection.selectAll('.donut-chart').remove();

        createDonutChart();
        createSmallDonutChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.donut-chart', createDonutChart);
}

