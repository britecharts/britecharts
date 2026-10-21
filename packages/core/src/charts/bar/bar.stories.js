import { select } from 'd3-selection';

import bar from './bar';
import miniTooltip from '../mini-tooltip/mini-tooltip';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { BarDataBuilder } from './barChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new BarDataBuilder();

export const Playground = (args) => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().withLettersFrequency().build();

        applyArgs(barChart, args)
            .width(containerWidth)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        addExportButtons(container, barChart, 'bar');

        select('.bar-chart .metadata-group').datum([]).call(tooltip);
    }

    return container;
};

Playground.args = playgroundArgs(bar, [
    'height',
    'margin',
    'isHorizontal',
    'isAnimated',
    'colorSchema',
    'shouldReverseColorList',
    'betweenBarsPadding',
    'hasPercentage',
    'enableLabels',
    'labelsNumberFormat',
    'numberFormat',
    'hasSingleBarHighlight',
    'xTicks',
    'yTicks',
    'xAxisLabel',
    'yAxisLabel',
    'percentageAxisToMaxRatio',
    'isLoading',
]);
// Static, so the Controls are what changes; `WithAnimation` shows the motion.
Playground.args.isAnimated = false;
Playground.argTypes = playgroundArgTypes(Playground.args);

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

export const WithAnimation = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        barContainer.datum(dataset).call(barChart);

        select('.bar-chart .metadata-group').datum([]).call(tooltip);
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

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withNegativeValues().build();

        barChart.isAnimated(true).width(containerWidth).height(400);

        barContainer.datum(dataset).call(barChart);
    }

    return container;
};

export const WithNegativeValuesHorizontal = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withNegativeValues().build();

        barChart
            .isAnimated(true)
            .isHorizontal(true)
            .margin({ left: 100, right: 40, top: 40, bottom: 40 })
            .width(containerWidth)
            .height(400);

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
