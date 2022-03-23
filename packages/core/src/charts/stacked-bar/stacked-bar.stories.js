import { select } from 'd3-selection';

import stackedBarChart from './stacked-bar';
import tooltip from '../tooltip/tooltip';
import legend from '../legend/legend';

import { getCleanContainer } from '../../../.storybook/helpers';
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

export const WithTooltip = () => {
    const container = getCleanContainer();
    const stackedBar = stackedBarChart();
    const stackedBarContainer = select(container);
    const containerWidth = stackedBarContainer.node()
        ? stackedBarContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();
    const dataset = aTestDataSet().with3Sources().build();
    let tooltipContainer;

    if (containerWidth) {
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

        stackedBarContainer.datum(dataset).call(stackedBar);

        getInlineLegendChart(container, dataset);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

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
            .on('customMouseMove', function (dataPoint, topicColorMap, x, y) {
                chartTooltip.update(dataPoint, topicColorMap, x, y);
            })
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        stackedBarContainer.datum(dataset).call(stackedBar);

        // Tooltip Setup and start
        chartTooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group');
        tooltipContainer.datum([]).call(chartTooltip);
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
