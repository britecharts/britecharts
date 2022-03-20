import { select } from 'd3-selection';

import stackedArea from './stacked-area';
import tooltip from '../tooltip/tooltip';

import { getCleanContainer } from '../../../.storybook/helpers';
import { StackedAreaDataBuilder } from './stackedAreaDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new StackedAreaDataBuilder();
const uniq = (arrArg) =>
    arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

export const WithTooltip = () => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const chartTooltip = tooltip();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSalesChannelData().build();
    let tooltipContainer;

    if (containerWidth) {
        stackedAreaChart
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
            .on(
                'customMouseMove',
                function (dataPoint, topicColorMap, dataPointXPosition) {
                    chartTooltip.update(
                        dataPoint,
                        topicColorMap,
                        dataPointXPosition
                    );
                }
            )
            .on('customMouseOut', chartTooltip.hide);

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);

        // Tooltip Setup and start
        chartTooltip.topicLabel('values').title('Testing tooltip');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithThreeSources = () => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const chartTooltip = tooltip();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().with3Sources().build();
    let tooltipContainer;

    if (containerWidth) {
        stackedAreaChart
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

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);

        // Tooltip Setup and start
        chartTooltip.topicLabel('values').title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithSyncedTooltip = () => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const chartTooltip = tooltip();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSalesChannelData().build();
    let tooltipContainer;

    if (containerWidth) {
        stackedAreaChart
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

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);

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
        tooltipContainer = select('.metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const stackedAreaContainer = select(container);
    const stackedAreaChart = stackedArea();
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSalesChannelData().build();

    if (containerWidth) {
        stackedAreaChart
            .width(containerWidth)
            .height(400)
            .isAnimated(true)
            .isLoading(true);

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);
    }

    return container;
};

export default { title: 'Charts/StackedArea' };
