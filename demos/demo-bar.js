'use strict';

var d3Selection = require('d3-selection'),

    PubSub = require('pubsub-js'),

    bar = require('./../src/charts/bar'),
    miniTooltip = require('./../src/charts/mini-tooltip'),
    colors = require('./../src/charts/helpers/colors'),

    dataBuilder = require('./../test/fixtures/barChartDataBuilder');

    require('./helpers/resizeHelper');

function createSimpleBarChart() {
    var barChart = bar(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        barContainer = d3Selection.select('.js-bar-chart-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .height(300);

        barContainer.datum(dataset).call(barChart);
    }
}

function createHorizontalBarChart() {
    var barChart = bar(),
        tooltip = miniTooltip(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        barContainer = d3Selection.select('.js-horizontal-bar-chart-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.withColors().build();

        barChart
            .horizontal(true)
            .isAnimated(true)
            .margin({
                left: 120,
                right: 20,
                top: 20,
                bottom: 30
            })
            .colorSchema(colors.colorSchemas.britechartsColorSchema)
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
    var barChart = bar(),
        tooltip = miniTooltip(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        barContainer = d3Selection.select('.js-bar-chart-tooltip-container'),
        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        d3Selection.select('.js-download-button').on('click', function() {
            barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
        });

        dataset = testDataSet.withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .usePercentage(true)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltipContainer = d3Selection.select('.bar-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

// Show charts if container available
if (d3Selection.select('.js-bar-chart-tooltip-container').node()){
    createBarChartWithTooltip();
    createHorizontalBarChart();
    createSimpleBarChart();

    var redrawCharts = function(){
        d3Selection.selectAll('.bar-chart').remove();

        createBarChartWithTooltip();
        createHorizontalBarChart();
        createSimpleBarChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
