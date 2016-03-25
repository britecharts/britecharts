// require([
//     'd3',
//     'stacked-area',
//     'stackedDataBuilder',
//     'tooltip'
//     ],
//     function(
//         d3,
//         stackedAreaChart,
//         stackedDataBuilder,
//         tooltip
//     ){
    // 'use strict';

    var d3 = require('d3');
    var _ = require('underscore');
    var stackedAreaChart = require('./../dist/charts/stacked-area');
    var tooltip = require('./../dist/charts/tooltip');
    var stackedDataBuilder = require('./../test/fixtures/stackedAreaDataBuilder');

    function createStackedAreaChartWithTooltip() {
        var stackedArea = stackedAreaChart(),
            chartTooltip = tooltip(),
            testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
            containerWidth = d3.select('.js-stacked-area-chart-tooltip-container').node().getBoundingClientRect().width,
            container = d3.select('.js-stacked-area-chart-tooltip-container'),
            tooltipContainer,
            dataset;

        // dataset = testDataSet.withReportData().build();
        // dataset = testDataSet.with3Sources().build();
        dataset = testDataSet.with6Sources().build();

        // StackedAreChart Setup and start
        stackedArea
            .tooltipThreshold(400)
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
        container.datum(dataset.data).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip
            .title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = d3.select('.metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);

    }

    function createStackedAreaChart() {
        var stackedArea = stackedAreaChart(),
            testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
            containerWidth = d3.select('.js-stacked-area-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-stacked-area-chart-container'),
            dataset;

        dataset = testDataSet.with3Sources().build();

        // StackedAreChart Setup and start
        stackedArea
            .tooltipThreshold(400)
            .width(containerWidth);

        container.datum(dataset.data).call(stackedArea);
    }


    if(d3.select('.js-stacked-area-chart-tooltip-container').node()){
        // Show charts if container available
        createStackedAreaChartWithTooltip();
        createStackedAreaChart();

        d3.select(window).on('resize', function(){
            d3.selectAll('.stacked-area').remove();
            createStackedAreaChartWithTooltip();
            createStackedAreaChart();
        });
    }
// });
