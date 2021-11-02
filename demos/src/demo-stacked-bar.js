import { select, selectAll } from 'd3-selection';
// import PubSub from 'pubsub-js';

import stackedBarChart from './../../src/charts/stacked-bar/stacked-bar';
import tooltip from './../../src/charts/tooltip/tooltip';
import legend from './../../src/charts/legend/legend';

import { StackedBarDataBuilder } from './../../src/charts/stacked-bar/stackedBarDataBuilder';
import colors from './../../src/charts/helpers/color';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

const testDataSet = new StackedBarDataBuilder();
const datasetWithThreeSources = testDataSet.with3Sources().build();

let redrawCharts;

function createStackedBarChartWithTooltip(optionalColorSchema) {
    let stackedBar = stackedBarChart(),
        chartTooltip = tooltip(),
        container = select('.js-stacked-bar-chart-tooltip-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = datasetWithThreeSources;

        // StackedAreChart Setup and start
        stackedBar
            .tooltipThreshold(600)
            .height(400)
            .width(containerWidth)
            .grid('horizontal')
            .isAnimated(true)
            .betweenBarsPadding(0.3)
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', function (dataPoint, topicColorMap, x, y) {
                chartTooltip.update(dataPoint, topicColorMap, x, y);
            })
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        if (optionalColorSchema) {
            stackedBar.colorSchema(optionalColorSchema);
        }

        container.datum(dataset).call(stackedBar);

        getInlineLegendChart(datasetWithThreeSources, stackedBar.colorMap());

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-stacked-bar-chart-tooltip-container .metadata-group'
        );
        tooltipContainer.datum([]).call(chartTooltip);

        select('#button').on('click', function () {
            stackedBar.exportChart(
                'stacked-bar.png',
                'Britecharts Stacked Bar'
            );
        });
    }
}

function getInlineLegendChart(dataset, optionalColorMap) {
    let legendChart = legend(),
        legendContainer = select('.js-inline-legend-chart-container'),
        containerWidth = legendContainer.node()
            ? legendContainer.node().getBoundingClientRect().width
            : false;
    const legendData = [...new Set(dataset.map((d) => d.stack))].map((d) => ({
        name: d,
        id: d,
    }));

    if (containerWidth) {
        select('.js-inline-legend-chart-container .britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth * 0.6)
            .markerSize(8)
            .height(40);

        if (optionalColorMap) {
            legendChart.colorMap(optionalColorMap);
        }

        legendContainer.datum(legendData).call(legendChart);

        return legendChart;
    }
}

function createHorizontalStackedBarChart(optionalColorSchema) {
    let stackedBar = stackedBarChart(),
        chartTooltip = tooltip(),
        container = select('.js-stacked-bar-chart-fixed-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = datasetWithThreeSources;

        // StackedAreChart Setup and start
        stackedBar
            .isHorizontal(true)
            .tooltipThreshold(600)
            .grid('vertical')
            .height(400)
            .width(containerWidth)
            .isAnimated(true)
            .margin({
                left: 100,
                top: 40,
                right: 30,
                bottom: 20,
            })
            .colorSchema(colors.colorSchemas.red)
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', function (dataPoint, topicColorMap, x, y) {
                chartTooltip.update(dataPoint, topicColorMap, x, y);
            })
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        if (optionalColorSchema) {
            stackedBar.colorSchema(optionalColorSchema);
        }

        container.datum(dataset).call(stackedBar);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-stacked-bar-chart-fixed-container .metadata-group'
        );
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createLoadingState(isLoading, instance) {
    let stackedBar = instance ? instance : stackedBarChart(),
        container = select('.js-loading-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false;
    const dataset = datasetWithThreeSources;

    if (containerWidth) {
        stackedBar
            .width(containerWidth)
            .height(400)
            .isAnimated(true)
            .isLoading(isLoading);

        container.datum(dataset).call(stackedBar);
    }

    return stackedBar;
}

if (select('.js-stacked-bar-chart-tooltip-container').node()) {
    // Chart creation
    createStackedBarChartWithTooltip();
    createHorizontalStackedBarChart();
    createLoadingState(true);

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = function () {
        selectAll('.stacked-bar').remove();

        createStackedBarChartWithTooltip();
        createHorizontalStackedBarChart();
        createLoadingState(false);
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.stacked-bar',
        createStackedBarChartWithTooltip
    );
}
