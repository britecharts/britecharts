'use strict';

var d3Selection = require('d3-selection'),

    PubSub = require('pubsub-js'),

    colors = require('./../src/charts/helpers/colors'),

    stackedAreaChart = require('./../src/charts/stacked-area'),
    tooltip = require('./../src/charts/tooltip'),
    stackedDataBuilder = require('./../test/fixtures/stackedAreaDataBuilder'),
    colorSelectorHelper = require('./helpers/colorSelector');
    require('./helpers/resizeHelper');

const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

function createStackedAreaChartWithTooltip(optionalColorSchema) {
    var stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
        container = d3Selection.select('.js-stacked-area-chart-tooltip-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        // dataset = testDataSet.withReportData().build();
        // dataset = testDataSet.with3Sources().build();
        // dataset = testDataSet.with6Sources().build();
        // dataset = testDataSet.withLargeData().build();
        // dataset = testDataSet.withGeneratedData().build();
        dataset = testDataSet.withSalesChannelData().build();

        // StackedAreChart Setup and start
        stackedArea
            .isAnimated(true)
            .tooltipThreshold(600)
            .width(containerWidth)
            .grid('horizontal')
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        if (optionalColorSchema) {
            stackedArea.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .title('Testing tooltip')
            .topicsOrder(uniq(dataset.data.map((d) => d.name)));

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = d3Selection.select('.js-stacked-area-chart-tooltip-container .metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);

        d3Selection.select('#button').on('click', function() {
                stackedArea.exportChart('stacked-area.png', 'Britecharts Stacked Area');
        });
    }
}

function createStackedAreaChartWithFixedAspectRatio(optionalColorSchema) {
    var stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
        container = d3Selection.select('.js-stacked-area-chart-fixed-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        // dataset = testDataSet.withReportData().build();
        dataset = testDataSet.with3Sources().build();
        // dataset = testDataSet.with6Sources().build();
        // dataset = testDataSet.withLargeData().build();

        // StackedAreChart Setup and start
        stackedArea
            .tooltipThreshold(600)
            .aspectRatio(0.6)
            .grid('full')
            .xAxisFormat('custom')
            .xAxisCustomFormat('%Y/%m/%d')
            .xTicks(2)
            .width(containerWidth)
            .dateLabel('date')
            .valueLabel('views')
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        if (optionalColorSchema) {
            stackedArea.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = d3Selection.select('.js-stacked-area-chart-fixed-container .metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

if (d3Selection.select('.js-stacked-area-chart-tooltip-container').node()){
    // Chart creation
    createStackedAreaChartWithTooltip();
    createStackedAreaChartWithFixedAspectRatio();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    var redrawCharts = function(){
        d3Selection.selectAll('.stacked-area').remove();
        createStackedAreaChartWithTooltip();
        createStackedAreaChartWithFixedAspectRatio();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.stacked-area', createStackedAreaChartWithTooltip);
}
