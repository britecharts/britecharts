'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    line = require('./../src/charts/line'),
    tooltip = require('./../src/charts/tooltip'),
    dataBuilder = require('./../test/fixtures/lineChartDataBuilder'),
    colorSelectorHelper = require('./helpers/colorSelector');


function createLineChart(optionalColorSchema) {
    var lineChart1 = line(),
        chartTooltip = tooltip(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        containerWidth = d3.select('.js-line-chart-container').node().getBoundingClientRect().width,
        container = d3.select('.js-line-chart-container'),
        tooltipContainer,
        dataset;


    d3.select('#button').on('click', function() {
        lineChart1.exportChart();
    });

    dataset = testDataSet.with5Topics().build();

    // LineChart Setup and start
    lineChart1
        .aspectRatio(0.5)
        .tooltipThreshold(600)
        .width(containerWidth)
        .on('customMouseOver', function() {
            chartTooltip.show();
        })
        .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
            chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
        })
        .on('customMouseOut', function() {
            chartTooltip.hide();
        });

    if (optionalColorSchema) {
        lineChart1.colorSchema(optionalColorSchema);
    }

    container.datum(dataset).call(lineChart1);

    // Tooltip Setup and start
    chartTooltip
        .title('Quantity Sold');

    // Note that if the viewport width is less than the tooltipThreshold value,
    // this container won't exist, and the tooltip won't show up
    tooltipContainer = d3.select('.js-line-chart-container .metadata-group .hover-marker');
    tooltipContainer.datum([]).call(chartTooltip);
}

function createLineChartWithSingleLine() {
    var lineChart2 = line(),
        chartTooltip = tooltip(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        containerWidth = d3.select('.js-single-line-chart-container').node().getBoundingClientRect().width,
        container = d3.select('.js-single-line-chart-container'),
        tooltipContainer,
        dataset;

    dataset = testDataSet.withOneSource().build();

    d3.select('#button2').on('click', function() {
        lineChart2.exportChart();
    });

    lineChart2
        .tooltipThreshold(600)
        .height(500)
        .width(containerWidth)
        .on('customMouseOver', function() {
            chartTooltip.show();
        })
        .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
            chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
        })
        .on('customMouseOut', function() {
            chartTooltip.hide();
        });

    container.datum(dataset).call(lineChart2);

    // Tooltip Setup and start
    chartTooltip
        .title('Quantity Sold');

    // Note that if the viewport width is less than the tooltipThreshold value,
    // this container won't exist, and the tooltip won't show up
    tooltipContainer = d3.select('.js-single-line-chart-container .metadata-group .hover-marker');
    tooltipContainer.datum([]).call(chartTooltip);
}

function createLineChartWithFixedHeight() {
    var lineChart3 = line(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        containerWidth = d3.select('.js-fixed-line-chart-container').node().getBoundingClientRect().width,
        container = d3.select('.js-fixed-line-chart-container'),
        dataset;

    dataset = testDataSet.with5Topics().build();

    lineChart3
        .tooltipThreshold(600)
        .height(300)
        .width(containerWidth);

    container.datum(dataset).call(lineChart3);
}

// Show charts if container available
if (d3.select('.js-line-chart-container').node()) {
    createLineChart();
    createLineChartWithSingleLine();
    createLineChartWithFixedHeight();

    d3.select(window).on('resize', _.debounce(function(){
        d3.selectAll('.line-chart').remove();
        createLineChart();
        createLineChartWithSingleLine();
        createLineChartWithFixedHeight();
    }, 200));

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.line-chart', createLineChart);
}
