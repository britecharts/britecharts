import { select, selectAll } from 'd3-selection';
import PubSub from 'pubsub-js';

import groupedBarChart from './../../src/charts/grouped-bar';
import tooltip from './../../src/charts/tooltip';
import legend from './../../src/charts/legend';

import { GroupedBarChartDataBuilder } from './../../test/fixtures/groupedBarChartDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

const testDataSet = new GroupedBarChartDataBuilder();
const datasetWithThreeSources = testDataSet.with3Sources().build();

let redrawCharts;

function creategroupedBarChartWithTooltip(optionalColorSchema) {
    let groupedBar = groupedBarChart(),
        chartTooltip = tooltip(),
        container = select('.js-grouped-bar-chart-tooltip-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = datasetWithThreeSources;

        // GroupedAreChart Setup and start
        groupedBar
            .tooltipThreshold(600)
            .width(containerWidth)
            .grid('horizontal')
            .isAnimated(true)
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
            groupedBar.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(groupedBar);

        getInlineLegendChart(datasetWithThreeSources, groupedBar.colorMap());

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('group')
            .title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-grouped-bar-chart-tooltip-container .metadata-group'
        );
        tooltipContainer.datum([]).call(chartTooltip);

        select('#button').on('click', function () {
            groupedBar.exportChart(
                'grouped-bar.png',
                'Britecharts Grouped Bar'
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
    const legendData = [
        ...new Set(dataset.data.map((d) => d.group)),
    ].map((d) => ({ name: d, id: d }));

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

function createHorizontalgroupedBarChart(optionalColorSchema) {
    let groupedBar = groupedBarChart(),
        chartTooltip = tooltip(),
        container = select('.js-grouped-bar-chart-fixed-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = datasetWithThreeSources;

        // StackedAreChart Setup and start
        groupedBar
            .tooltipThreshold(600)
            .grid('vertical')
            .width(containerWidth)
            .isHorizontal(true)
            .isAnimated(true)
            .margin({
                left: 80,
                top: 40,
                right: 30,
                bottom: 20,
            })
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
            groupedBar.colorSchema(optionalColorSchema);
        }

        container.datum(dataset.data).call(groupedBar);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('group')
            .title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-grouped-bar-chart-fixed-container .metadata-group'
        );
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

if (select('.js-grouped-bar-chart-tooltip-container').node()) {
    // Chart creation
    creategroupedBarChartWithTooltip();
    createHorizontalgroupedBarChart();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = () => {
        selectAll('.grouped-bar').remove();

        creategroupedBarChartWithTooltip();
        createHorizontalgroupedBarChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.grouped-bar',
        creategroupedBarChartWithTooltip
    );
}
