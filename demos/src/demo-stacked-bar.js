import { select, selectAll } from 'd3-selection';
import PubSub from 'pubsub-js';

import stackedBarChart from './../../src/charts/stacked-bar';
import tooltip from './../../src/charts/tooltip';
import colors from './../../src/charts/helpers/color';
import { StackedBarDataBuilder } from './../../test/fixtures/stackedBarDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');


let redrawCharts;

function createStackedBarChartWithTooltip(optionalColorSchema) {
    let stackedBar = stackedBarChart(),
        chartTooltip = tooltip(),
        testDataSet = new StackedBarDataBuilder(),
        container = select('.js-stacked-bar-chart-tooltip-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.with3Sources().build();

        // StackedAreChart Setup and start
        stackedBar
            .tooltipThreshold(600)
            .width(containerWidth)
            .grid('horizontal')
            .isAnimated(true)
            .stackLabel('stack')
            .nameLabel('date')
            .valueLabel('views')
            .betweenBarsPadding(0.3)
            .on('customMouseOver', function() {
                chartTooltip.show();
            })
            .on('customMouseMove', function(dataPoint, topicColorMap, x,y) {
                chartTooltip.update(dataPoint, topicColorMap, x, y);
            })
            .on('customMouseOut', function() {
                chartTooltip.hide();
            });

        if (optionalColorSchema) {
            stackedBar.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(stackedBar);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.js-stacked-bar-chart-tooltip-container .metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);

        select('#button').on('click', function() {
                stackedBar.exportChart('stacked-bar.png', 'Britecharts Stacked Bar');
        });
    }
}

function createHorizontalStackedBarChart(optionalColorSchema) {
    let stackedBar = stackedBarChart(),
        chartTooltip = tooltip(),
        testDataSet = new StackedBarDataBuilder(),
        container = select('.js-stacked-bar-chart-fixed-container'),
        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = testDataSet.with3Sources().build();

        // StackedAreChart Setup and start
        stackedBar
            .isHorizontal(true)
            .tooltipThreshold(600)
            .grid('vertical')
            .width(containerWidth)
            .isAnimated(true)
            .margin({
                left: 100,
                top: 40,
                right: 30,
                bottom: 20
            })
            .nameLabel('date')
            .valueLabel('views')
            .stackLabel('stack')
            .colorSchema(colors.colorSchemas.teal.reverse())
            .on('customMouseOver', function() {
                chartTooltip.show();
            })
            .on('customMouseMove', function(dataPoint, topicColorMap, x, y) {
                chartTooltip.update(dataPoint, topicColorMap, x, y);
            })
            .on('customMouseOut', function() {
                chartTooltip.hide();
            });

        if (optionalColorSchema) {
            stackedBar.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(stackedBar);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.js-stacked-bar-chart-fixed-container .metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

if (select('.js-stacked-bar-chart-tooltip-container').node()){
    // Chart creation
    createStackedBarChartWithTooltip();
    createHorizontalStackedBarChart();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = function(){
        selectAll('.stacked-bar').remove();

        createStackedBarChartWithTooltip();
        createHorizontalStackedBarChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.stacked-bar', createStackedBarChartWithTooltip);
}
