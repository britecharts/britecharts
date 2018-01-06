'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const stackedAreaChart = require('./../src/charts/stacked-area');
const colors = require('./../src/charts/helpers/colors');
const tooltip = require('./../src/charts/tooltip');

const stackedDataBuilder = require('./../test/fixtures/stackedAreaDataBuilder');
const colorSelectorHelper = require('./helpers/colorSelector');
let redrawCharts;

require('./helpers/resizeHelper');

const aTestDataSet = () => new stackedDataBuilder.StackedAreaDataBuilder();

const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

function createStackedAreaChartWithTooltip(optionalColorSchema) {
    let stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        container = d3Selection.select('.js-stacked-area-chart-tooltip-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().with6Sources().build();

        // StackedAreChart Setup and start
        stackedArea
            .isAnimated(true)
            .tooltipThreshold(600)
            .width(containerWidth)
            .dateLabel('dateUTC')
            .valueLabel('views')
            .grid('horizontal')
            .on('customDataEntryClick', function(d, mousePosition) {
                // console.log('Data entry marker clicked', d);
            })
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
                chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
            })
            .on('customMouseOut', chartTooltip.hide);

        if (optionalColorSchema) {
            stackedArea.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .title('Testing tooltip');

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
    let stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        container = d3Selection.select('.js-stacked-area-chart-fixed-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().with3Sources().build();

        // StackedAreChart Setup and start
        stackedArea
            .tooltipThreshold(600)
            .aspectRatio(0.5)
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

function createStackedAreaChartWithSyncedTooltip() {
    let stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        container = d3Selection.select('.js-stacked-area-chart-tooltip-bis-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withSalesChannelData().build();

        // StackedAreChart Setup and start
        stackedArea
            .isAnimated(true)
            .tooltipThreshold(600)
            .width(containerWidth)
            .grid('horizontal')
            .topicsOrder([
                'Other',
                'Sunny',
                'Blazing',
                'Glittering',
                'Flashing',
                'Shining'
            ])
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        container.datum(dataset.data).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip
            .topicsOrder([
                'Other',
                'Sunny',
                'Blazing',
                'Glittering',
                'Flashing',
                'Shining'
            ])
            .topicLabel('values')
            .title('Testing tooltip')
            .topicsOrder(uniq(dataset.data.map((d) => d.name)));

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = d3Selection.select('.js-stacked-area-chart-tooltip-bis-container .metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

if (d3Selection.select('.js-stacked-area-chart-tooltip-container').node()){
    // Chart creation
    createStackedAreaChartWithTooltip();
    createStackedAreaChartWithFixedAspectRatio();
    createStackedAreaChartWithSyncedTooltip();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = function(){
        d3Selection.selectAll('.stacked-area').remove();
        createStackedAreaChartWithTooltip();
        createStackedAreaChartWithFixedAspectRatio();
        createStackedAreaChartWithSyncedTooltip();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.stacked-area', createStackedAreaChartWithTooltip);
}
