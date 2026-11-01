import { select } from 'd3-selection';

import bar from './bar';
import tooltip from '../tooltip/tooltip';

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

    if (containerWidth) {
        const dataset = aTestDataSet().withLettersFrequency().build();

        // The chart connects and places its tooltip
        applyArgs(barChart, args).width(containerWidth).tooltip(tooltip());

        barChart.render(barContainer, dataset);

        addExportButtons(container, barChart, 'bar');
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
    'hasLabels',
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

export const WithHorizontalDirection = () => {
    const container = getCleanContainer();
    const barChart = bar();
    const barContainer = select(container);
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();
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
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        barChart.render(barContainer, dataset);

        tooltipContainer = select('.bar-chart .metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
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
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().withLettersFrequency().build();

        barChart
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        barChart.render(barContainer, dataset);

        select('.bar-chart .metadata-group').datum([]).call(chartTooltip);
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
            .hasLabels(true)
            .labelsNumberFormat('.0%')
            .height(300);

        barChart.render(barContainer, dataset);
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

        barChart.render(barContainer, dataset);
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

        barChart.render(barContainer, dataset);
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

        barChart.render(barContainer, dataset);
    }

    return container;
};

export default { title: 'Charts/Bar' };
