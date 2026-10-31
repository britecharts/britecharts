import { select } from 'd3-selection';

import groupedBarChart from './grouped-bar';
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
import { GroupedBarDataBuilder } from './groupedBarChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new GroupedBarDataBuilder();

const getInlineLegendChart = (container, dataset, colorMap) => {
    const legendChart = legend();
    const wrapper = document.createElement('div');
    wrapper.classList = 'legend-chart-container';
    container.appendChild(wrapper);
    const legendContainer = select(wrapper);
    const legendData = [...new Set(dataset.map((d) => d.group))].map((d) => ({
        name: d,
        id: d,
    }));

    const containerWidth = legendContainer.node()
        ? legendContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        legendContainer.selectAll('.britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth * 0.6)
            .colorMap(colorMap)
            .markerSize(8)
            .height(40);

        legendContainer.datum(legendData).call(legendChart);
    }

    return legendChart;
};

export const Playground = (args) => {
    const container = getCleanContainer();
    const groupedBar = groupedBarChart();
    const groupedBarContainer = select(container);
    const containerWidth = groupedBarContainer.node()
        ? groupedBarContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().with3Sources().build();

        // The chart connects and places its tooltip, and sets the labels its
        // rows need
        applyArgs(groupedBar, args)
            .width(containerWidth)
            .tooltip(tooltip().title('Testing tooltip'));

        groupedBarContainer.datum(dataset).call(groupedBar);

        addExportButtons(container, groupedBar, 'grouped-bar');
    }

    return container;
};

Playground.args = playgroundArgs(groupedBarChart, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'isHorizontal',
    'betweenBarsPadding',
    'betweenGroupsPadding',
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
Playground.args.colorSchema = 'britecharts';
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithHorizontalDirection = () => {
    const container = getCleanContainer();
    const groupedBarContainer = select(container);
    const chartTooltip = tooltip();
    const containerWidth = groupedBarContainer.node()
        ? groupedBarContainer.node().getBoundingClientRect().width
        : false;
    const groupedBar = groupedBarChart();
    const dataset = aTestDataSet().with3Sources().build();

    if (containerWidth) {
        groupedBar
            .tooltipThreshold(600)
            .grid('vertical')
            .width(containerWidth)
            .colorSchema(
                colors.colorSchemas.red.filter((_, idx) => idx % 2 === 0)
            )
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
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        groupedBarContainer.datum(dataset).call(groupedBar);

        // Tooltip Setup and start
        // The grouped bar dispatches its rows as `values`, named by `group`
        chartTooltip
            .topicLabel('values')
            .nameLabel('group')
            .title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        const tooltipContainer = select('.metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const groupedBar = groupedBarChart();
    const groupedBarContainer = select(container);
    const containerWidth = groupedBarContainer.node()
        ? groupedBarContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().with3Sources().build();

        groupedBar
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        groupedBarContainer.datum(dataset).call(groupedBar);

        // The grouped bar dispatches its rows as `values`, named by `group`
        chartTooltip
            .topicLabel('values')
            .nameLabel('group')
            .title('Testing tooltip');

        select('.metadata-group').datum([]).call(chartTooltip);
    }

    return container;
};

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const groupedBarContainer = select(container);
    const containerWidth = groupedBarContainer.node()
        ? groupedBarContainer.node().getBoundingClientRect().width
        : false;
    const groupedBar = groupedBarChart();
    const dataset = aTestDataSet().withNegativeValues().build();

    if (containerWidth) {
        groupedBar.isAnimated(true).width(containerWidth).height(400);

        groupedBarContainer.datum(dataset).call(groupedBar);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const groupedBarContainer = select(container);
    const containerWidth = groupedBarContainer.node()
        ? groupedBarContainer.node().getBoundingClientRect().width
        : false;
    const groupedBar = groupedBarChart();
    const dataset = aTestDataSet().with3Sources().build();

    if (containerWidth) {
        groupedBar
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .isLoading(true);

        groupedBarContainer.datum(dataset).call(groupedBar);
    }

    return container;
};

export default { title: 'Charts/GroupedBar' };
