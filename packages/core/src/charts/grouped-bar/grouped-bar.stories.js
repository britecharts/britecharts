import { select } from 'd3-selection';

import groupedBarChart from './grouped-bar';
import tooltip from '../tooltip/tooltip';
import legend from '../legend/legend';

import { getCleanContainer } from '../../../.storybook/helpers';
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

export const WithTooltip = () => {
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
            .width(containerWidth)
            .colorSchema(colors.colorSchemas.britecharts.reverse())
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

        groupedBarContainer.datum(dataset).call(groupedBar);

        getInlineLegendChart(container, dataset, groupedBar.colorMap());

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('group')
            .title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        const tooltipContainer = select('.metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

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
            .on('customMouseMove', function (dataPoint, topicColorMap, x, y) {
                chartTooltip.update(dataPoint, topicColorMap, x, y);
            })
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        groupedBarContainer.datum(dataset).call(groupedBar);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('group')
            .title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        const tooltipContainer = select('.metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
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
