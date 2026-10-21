import { select } from 'd3-selection';

import stackedArea from './stacked-area';
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
import { StackedAreaDataBuilder } from './stackedAreaDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new StackedAreaDataBuilder();
const uniq = (arrArg) =>
    arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

export const Playground = (args) => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().withSalesChannelData().build();

        applyArgs(stackedAreaChart, args)
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);

        addExportButtons(container, stackedAreaChart, 'stacked-area');

        // The stacked area dispatches its rows as `values`
        chartTooltip.topicLabel('values').title('Testing tooltip');

        select('.metadata-group .vertical-marker-container')
            .datum([])
            .call(chartTooltip);
    }

    return container;
};

Playground.args = playgroundArgs(stackedArea, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'areaCurve',
    'areaOpacity',
    'hasOutline',
    'grid',
    'xAxisValueType',
    'xAxisScale',
    'xAxisFormat',
    'xAxisCustomFormat',
    'xTicks',
    'yTicks',
    'yAxisLabel',
    'yAxisLabelOffset',
    'yAxisBaseline',
    'tooltipThreshold',
    'numberFormat',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.argTypes = playgroundArgTypes(Playground.args);

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
        // The stacked area dispatches its rows as `values`
        chartTooltip.topicLabel('values').title('Tooltip Title');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().withSalesChannelData().build();

        stackedAreaChart
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);

        // The stacked area dispatches its rows as `values`
        chartTooltip.topicLabel('values').title('Testing tooltip');

        select('.metadata-group .vertical-marker-container')
            .datum([])
            .call(chartTooltip);
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
            // The stacked area dispatches its rows as `values`
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

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withNegativeValues().build();

    if (containerWidth) {
        stackedAreaChart
            .isAnimated(true)
            .grid('horizontal')
            .width(containerWidth)
            .height(400);

        stackedAreaContainer.datum(dataset).call(stackedAreaChart);
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
