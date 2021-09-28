import { select, selectAll } from 'd3-selection';
import PubSub from 'pubsub-js';

import bar from '../../src/charts/bar/bar';
import miniTooltip from '../../src/charts/mini-tooltip/mini-tooltip';
import colors from './../../src/charts/helpers/color';

import { BarDataBuilder } from '../../src/charts/bar/barChartDataBuilder';

const aTestDataSet = () => new BarDataBuilder();

require('./helpers/resizeHelper');

function createSimpleBarChart() {
    let barChart = bar(),
        barContainer = select('.js-bar-chart-container'),
        containerWidth = barContainer.node()
            ? barContainer.node().getBoundingClientRect().width
            : false,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .hasPercentage(true)
            .enableLabels(true)
            .labelsNumberFormat('.0%')
            .height(300);

        barContainer.datum(dataset).call(barChart);
    }
}

function createHorizontalBarChart() {
    let barChart = bar(),
        tooltip = miniTooltip(),
        barContainer = select('.js-horizontal-bar-chart-container'),
        containerWidth = barContainer.node()
            ? barContainer.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withColors().build();

        barChart
            .isHorizontal(true)
            .isAnimated(true)
            .margin({
                left: 120,
                right: 20,
                top: 20,
                bottom: 30,
            })
            .colorSchema(colors.colorSchemas.britecharts)
            .width(containerWidth)
            .yAxisPaddingBetweenChart(30)
            .height(300)
            .percentageAxisToMaxRatio(1.3)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltipContainer = select(
            '.js-horizontal-bar-chart-container .bar-chart .metadata-group'
        );
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createBarChartWithTooltip() {
    let barChart = bar(),
        tooltip = miniTooltip(),
        barContainer = select('.js-bar-chart-tooltip-container'),
        containerWidth = barContainer.node()
            ? barContainer.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        select('.js-download-button').on('click', function () {
            barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
        });

        dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltip.numberFormat('.2%');

        tooltipContainer = select('.bar-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createLoadingState() {
    let barChart = bar(),
        barContainer = select('.js-loading-container'),
        containerWidth = barContainer.node()
            ? barContainer.node().getBoundingClientRect().width
            : false;

    if (containerWidth) {
        barChart
            .margin({ left: 0 })
            .width(containerWidth)
            .height(300)
            .isLoading(true);

        barContainer.datum([]).call(barChart);
    }
}

// Show charts if container available
if (select('.js-bar-chart-tooltip-container').node()) {
    createBarChartWithTooltip();
    createHorizontalBarChart();
    createSimpleBarChart();
    createLoadingState();

    let redrawCharts = function () {
        selectAll('.bar-chart').remove();
        createBarChartWithTooltip();
        createHorizontalBarChart();
        createSimpleBarChart();
        createLoadingState();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
