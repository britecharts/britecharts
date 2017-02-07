'use strict';

var d3Selection = require('d3-selection'),

    PubSub = require('pubsub-js'),

    line = require('./../src/charts/line'),
    tooltip = require('./../src/charts/tooltip'),
    dataBuilder = require('./../test/fixtures/lineChartDataBuilder'),
    colorSelectorHelper = require('./helpers/colorSelector');


function createLineChart(optionalColorSchema) {
    var lineChart1 = line(),
        chartTooltip = tooltip(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        container = d3Selection.select('.js-line-chart-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        d3Selection.select('#button').on('click', function() {
            lineChart1.exportChart('linechart.png', 'Britecharts Line Chart');
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
        tooltipContainer = d3Selection.select('.js-line-chart-container .metadata-group .hover-marker');
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createLineChartWithSingleLine() {
    var lineChart2 = line(),
        chartTooltip = tooltip(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        container = d3Selection.select('.js-single-line-chart-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.withOneSource().build();

        d3Selection.select('#button2').on('click', function() {
            lineChart2.exportChart('linechart.png', 'Britecharts Line Chart');
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
        tooltipContainer = d3Selection.select('.js-single-line-chart-container .metadata-group .hover-marker');
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createLineChartWithFixedHeight() {
    var lineChart3 = line(),
        chartTooltip = tooltip(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        container = d3Selection.select('.js-fixed-line-chart-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.with5Topics().build();

        lineChart3
            .height(300)
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

        container.datum(dataset).call(lineChart3);

        // Tooltip Setup and start
        chartTooltip
            .title('Quantity Sold');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = d3Selection.select('.js-fixed-line-chart-container .metadata-group .hover-marker');
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

// Show charts if container available
if (d3Selection.select('.js-line-chart-container').node()) {
    createLineChart();
    createLineChartWithSingleLine();
    createLineChartWithFixedHeight();

    var redrawCharts = function(){
        d3Selection.selectAll('.line-chart').remove();

        createLineChart();
        createLineChartWithSingleLine();
        createLineChartWithFixedHeight();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.line-chart', createLineChart);
}


