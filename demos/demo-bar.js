'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    bar = require('./../src/charts/bar'),
    miniTooltip = require('./../src/charts/mini-tooltip'),
    dataBuilder = require('./../test/fixtures/barChartDataBuilder');


function createBarChart() {
    var barChart = bar(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        containerWidth = d3.select('.js-bar-chart-container').node().getBoundingClientRect().width,
        barContainer = d3.select('.js-bar-chart-container'),
        dataset;

    dataset = testDataSet.withLettersFrequency().build();

    barChart
        .width(containerWidth)
        .height(300);

    barContainer.datum(dataset).call(barChart);
}

function createHorizontalBarChart() {
    var barChart = bar(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        containerWidth = d3.select('.js-horizontal-bar-chart-container').node().getBoundingClientRect().width,
        barContainer = d3.select('.js-horizontal-bar-chart-container'),
        dataset;

    dataset = testDataSet.withColors().build();

    barChart
        .margin({
            left: 80,
            right: 20,
            top: 30,
            bottom: 30
        })
        .horizontal(true)
        .width(containerWidth)
        .height(300);

    barContainer.datum(dataset).call(barChart);
}

function createBarChartWithTooltip() {
    var barChart = bar(),
        tooltip = miniTooltip(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        containerWidth = d3.select('.js-bar-chart-tooltip-container').node().getBoundingClientRect().width,
        barContainer = d3.select('.js-bar-chart-tooltip-container'),
        tooltipContainer,
        dataset;

    d3.select('.js-download-button').on('click', function() {
        barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
    });

    dataset = testDataSet.withLettersFrequency().build();

    barChart
        .width(containerWidth)
        .height(300)
        .on('customMouseOver', tooltip.show)
        .on('customMouseMove', tooltip.update)
        .on('customMouseOut', tooltip.hide);

    barContainer.datum(dataset).call(barChart);

    tooltipContainer = d3.select('.bar-chart .metadata-group');
    tooltipContainer.datum([]).call(tooltip);
}

// Show charts if container available
if (d3.select('.js-bar-chart-container').node()){
    createBarChart();
    createHorizontalBarChart();
    createBarChartWithTooltip();

    d3.select(window).on('resize', _.debounce(function(){
        d3.selectAll('.bar-chart').remove();

        createBarChart();
        createHorizontalBarChart();
        createBarChartWithTooltip();
    }, 200));
}
