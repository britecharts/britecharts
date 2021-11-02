import { select, selectAll } from 'd3-selection';
// import PubSub from 'pubsub-js';

import stackedAreaChart from './../../src/charts/stacked-area/stacked-area';
import tooltip from './../../src/charts/tooltip/tooltip';
import { StackedAreaDataBuilder } from './../../src/charts/stacked-area/stackedAreaDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

const aTestDataSet = () => new StackedAreaDataBuilder();
const uniq = (arrArg) =>
    arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

let redrawCharts;

function createStackedAreaChartWithTooltip(optionalColorSchema) {
    let stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        container = select('.js-stacked-area-chart-tooltip-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withSalesChannelData().build();

        // StackedAreChart Setup and start
        stackedArea
            .isAnimated(true)
            .tooltipThreshold(600)
            .height(400)
            .width(containerWidth)
            .grid('horizontal')
            .on('customDataEntryClick', function (d, mousePosition) {
                // eslint-disable-next-line no-console
                console.log('Data entry marker clicked', d, mousePosition);
            })
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', function (
                dataPoint,
                topicColorMap,
                dataPointXPosition
            ) {
                chartTooltip.update(
                    dataPoint,
                    topicColorMap,
                    dataPointXPosition
                );
            })
            .on('customMouseOut', chartTooltip.hide);

        if (optionalColorSchema) {
            stackedArea.colorSchema(optionalColorSchema);
        }

        container.datum(dataset).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip.topicLabel('values').title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-stacked-area-chart-tooltip-container .metadata-group .vertical-marker-container'
        );
        tooltipContainer.datum([]).call(chartTooltip);

        select('#button').on('click', function () {
            stackedArea.exportChart(
                'stacked-area.png',
                'Britecharts Stacked Area'
            );
        });
    }
}

function createStackedAreaChart(optionalColorSchema) {
    let stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        container = select('.js-stacked-area-chart-fixed-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().with3Sources().build();

        // StackedAreChart Setup and start
        stackedArea
            .tooltipThreshold(600)
            .grid('full')
            .xAxisFormat('custom')
            .xAxisCustomFormat('%Y/%m/%d')
            .xTicks(2)
            .height(400)
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        if (optionalColorSchema) {
            stackedArea.colorSchema(optionalColorSchema);
        }

        container.datum(dataset).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip.topicLabel('values').title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-stacked-area-chart-fixed-container .metadata-group .vertical-marker-container'
        );
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createStackedAreaChartWithSyncedTooltip() {
    let stackedArea = stackedAreaChart(),
        chartTooltip = tooltip(),
        container = select('.js-stacked-area-chart-tooltip-bis-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withSalesChannelData().build();

        // StackedAreChart Setup and start
        stackedArea
            .isAnimated(true)
            .tooltipThreshold(600)
            .height(400)
            .width(containerWidth)
            .grid('horizontal')
            .topicsOrder([
                'Other',
                'Sunny',
                'Blazing',
                'Glittering',
                'Flashing',
                'Shining',
            ])
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        container.datum(dataset).call(stackedArea);

        // Tooltip Setup and start
        chartTooltip
            .topicsOrder([
                'Other',
                'Sunny',
                'Blazing',
                'Glittering',
                'Flashing',
                'Shining',
            ])
            .topicLabel('values')
            .title('Testing tooltip')
            .topicsOrder(uniq(dataset.map((d) => d.name)));

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-stacked-area-chart-tooltip-bis-container .metadata-group .vertical-marker-container'
        );
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createLoadingState(isLoading, instance) {
    let stackedArea = instance ? instance : stackedAreaChart(),
        container = select('.js-loading-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false;
    const dataset = aTestDataSet().withSalesChannelData().build();

    if (containerWidth) {
        stackedArea
            .width(containerWidth)
            .height(400)
            .isAnimated(true)
            .isLoading(isLoading);

        container.datum(dataset).call(stackedArea);
    }

    return stackedArea;
}

if (select('.js-stacked-area-chart-tooltip-container').node()) {
    // Chart creation
    createStackedAreaChartWithTooltip();
    createStackedAreaChart();
    createStackedAreaChartWithSyncedTooltip();
    createLoadingState(true);

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = function () {
        selectAll('.stacked-area').remove();
        createStackedAreaChartWithTooltip();
        createStackedAreaChart();
        createStackedAreaChartWithSyncedTooltip();
        createLoadingState(false);
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.stacked-area',
        createStackedAreaChartWithTooltip
    );
}
