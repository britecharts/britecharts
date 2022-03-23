import { select } from 'd3-selection';

import bar from './bar';
import miniTooltip from '../mini-tooltip/mini-tooltip';

import { getCleanContainer } from '../../../.storybook/helpers';
import { BarDataBuilder } from './barChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new BarDataBuilder();

export const VerticalBarChart = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip();
    let tooltipContainer;

    if (containerWidth) {
        const dataset = aTestDataSet().withColors().build();

        barChart
            .isAnimated(true)
            .margin({
                left: 30,
                right: 20,
                top: 20,
                bottom: 30,
            })
            .colorSchema(colors.colorSchemas.britecharts)
            .width(containerWidth)
            .yAxisPaddingBetweenChart(20)
            .height(300)
            .percentageAxisToMaxRatio(1.3)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltipContainer = select('.bar-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export const HorizontalBarChart = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip();
    let tooltipContainer;

    if (containerWidth) {
        const dataset = aTestDataSet().withColors().build();

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
            .yAxisPaddingBetweenChart(20)
            .height(300)
            .percentageAxisToMaxRatio(1.3)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        tooltipContainer = select('.bar-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export const WithTooltip = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip();
    let tooltipContainer;

    if (containerWidth) {
        // select('.js-download-button').on('click', function () {
        //     barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
        // });
        const dataset = aTestDataSet().withLettersFrequency().build();

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

    return container;
};

export const WithBarLabels = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .width(containerWidth)
            .hasPercentage(true)
            .enableLabels(true)
            .labelsNumberFormat('.0%')
            .height(300);

        barContainer.datum(dataset).call(barChart);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withLettersFrequency().build();

    if (containerWidth) {
        barChart
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .isLoading(true);

        barContainer.datum(dataset).call(barChart);
    }

    return container;
};

export default { title: 'Charts/Bar' };
