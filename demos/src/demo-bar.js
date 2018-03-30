'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const bar = require('./../../src/charts/bar');
const miniTooltip = require('./../../src/charts/mini-tooltip');
const colors = require('./../../src/charts/helpers/color');
const dataBuilder = require('./../../test/fixtures/barChartDataBuilder');

const aTestDataSet = () => new dataBuilder.BarDataBuilder();

require('./helpers/resizeHelper');

function createSimpleBarChart() {
    let barChart = bar(),
        barContainer = d3Selection.select('.js-bar-chart-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .hasPercentage(true)
            .enableLabels(true)
            .labelsNumberFormat('.0%')
            .height(300);

        barContainer.datum(dataset).call(barChart);
    }
}

function createHorizontalBarChart() {
    let barChart = bar(),
        tooltip = miniTooltip(),
        barContainer = d3Selection.select('.js-horizontal-bar-chart-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withColors().build();

        barChart
            .isHorizontal(true)
            .isAnimated(true)
            .margin({
                left: 120,
                right: 20,
                top: 20,
                bottom: 30
            })
            .colorSchema(colors.colorSchemas.britecharts)
            .width(containerWidth)
            .yAxisPaddingBetweenChart(30)
            .height(300)
            .percentageAxisToMaxRatio(1.3)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltipContainer = d3Selection.select('.js-horizontal-bar-chart-container .bar-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createBarChartWithTooltip() {
    let barChart = bar(),
        tooltip = miniTooltip(),
        barContainer = d3Selection.select('.js-bar-chart-tooltip-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        d3Selection.select('.js-download-button').on('click', function() {
            barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
        });

        dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltip
            .numberFormat('.2%')

        tooltipContainer = d3Selection.select('.bar-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createLoadingState() {
    let barChart = bar(),
        barContainer = d3Selection.select('.js-loading-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        dataset = null;

    if (containerWidth) {
        barContainer.html(barChart.loadingState());
    }
}

// Show charts if container available
if (d3Selection.select('.js-bar-chart-tooltip-container').node()){
    createBarChartWithTooltip();
    createHorizontalBarChart();
    createSimpleBarChart();
    createLoadingState();

    let redrawCharts = function(){
        d3Selection.selectAll('.bar-chart').remove();
        createBarChartWithTooltip();
        createHorizontalBarChart();
        createSimpleBarChart();
        createLoadingState();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
