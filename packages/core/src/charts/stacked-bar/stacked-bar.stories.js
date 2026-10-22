import { select } from 'd3-selection';

import stackedBarChart from './stacked-bar';
import tooltip from '../tooltip/tooltip';
import legend from '../legend/legend';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { StackedBarDataBuilder } from './stackedBarDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new StackedBarDataBuilder();

const getInlineLegendChart = (container, dataset) => {
    const legendChart = legend();
    const wrapper = document.createElement('div');
    wrapper.classList = 'legend-chart-container';
    container.appendChild(wrapper);
    const legendContainer = select(wrapper);
    const containerWidth = legendContainer.node()
        ? legendContainer.node().getBoundingClientRect().width
        : false;
    const legendData = [...new Set(dataset.map((d) => d.stack))].map((d) => ({
        name: d,
        id: d,
    }));

    if (containerWidth) {
        legendContainer.selectAll('.britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth * 0.6)
            .markerSize(8)
            .height(40);

        legendContainer.datum(legendData).call(legendChart);
    }

    return legendChart;
};

export const Playground = (args) => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().with3Sources().build();

        applyArgs(stackedBar, args)
            .width(containerWidth)
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        stackedBarContainer.datum(dataset).call(stackedBar);

        addExportButtons(container, stackedBar, 'stacked-bar');

        // The stacked bar dispatches its rows as `values`, named by `stack`
        chartTooltip
            .topicLabel('values')
            .nameLabel('stack')
            .title('Tooltip title');

        select('.metadata-group').datum([]).call(chartTooltip);
    }

    return container;
};

Playground.args = playgroundArgs(stackedBarChart, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'isHorizontal',
    'isNormalized',
    'betweenBarsPadding',
    'hasPercentage',
    'hasReversedStacks',
    'percentageAxisToMaxRatio',
    'grid',
    'xTicks',
    'yTicks',
    'yAxisLabel',
    'yAxisLabelOffset',
    'tooltipThreshold',
    'numberFormat',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithHorizontalDirection = () => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();
    let tooltipContainer;

    if (containerWidth) {
        const dataset = aTestDataSet().with3Sources().build();

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
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        stackedBarContainer.datum(dataset).call(stackedBar);

        // Tooltip Setup and start
        // The stacked bar dispatches its rows as `values`, named by `stack`
        chartTooltip
            .topicLabel('values')
            .nameLabel('stack')
            .title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().with3Sources().build();

        stackedBar
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        stackedBarContainer.datum(dataset).call(stackedBar);

        // The stacked bar dispatches its rows as `values`, named by `stack`
        chartTooltip
            .topicLabel('values')
            .nameLabel('stack')
            .title('Tooltip title');

        select('.metadata-group').datum([]).call(chartTooltip);
    }

    return container;
};

/**
 * A 100% stacked bar: `isNormalized(true)` scales every stack to the full
 * height, so each segment shows its share of its stack and the axis runs from
 * 0% to 100%. The tooltip still shows the values.
 */
export const WithNormalizedStacks = () => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().with3Sources().build();

        stackedBar
            .isNormalized(true)
            .width(containerWidth)
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        stackedBarContainer.datum(dataset).call(stackedBar);

        // The stacked bar dispatches its rows as `values`, named by `stack`
        chartTooltip
            .topicLabel('values')
            .nameLabel('stack')
            .title('Tooltip title');

        select('.metadata-group').datum([]).call(chartTooltip);
    }

    return container;
};

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withNegativeValues().build();

    if (containerWidth) {
        stackedBar
            .isAnimated(true)
            .grid('horizontal')
            .width(containerWidth)
            .height(400);

        stackedBarContainer.datum(dataset).call(stackedBar);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().with3Sources().build();

    if (containerWidth) {
        stackedBar
            .width(containerWidth)
            .height(400)
            .isAnimated(true)
            .isLoading(true);

        stackedBarContainer.datum(dataset).call(stackedBar);
    }

    return container;
};

export default { title: 'Charts/StackedBar' };
