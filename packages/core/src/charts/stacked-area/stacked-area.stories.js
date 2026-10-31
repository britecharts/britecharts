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

export const Playground = (args) => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withSalesChannelData().build();

        // The chart connects and places its tooltip, and sets the label its
        // rows need
        applyArgs(stackedAreaChart, args)
            .width(containerWidth)
            .tooltip(tooltip().title('Testing tooltip'));

        stackedAreaChart.render(stackedAreaContainer, dataset);

        addExportButtons(container, stackedAreaChart, 'stacked-area');
    }

    return container;
};

Playground.args = playgroundArgs(stackedArea, [
    'height',
    'margin',
    'isAnimated',
    'isNormalized',
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
Playground.args.grid = 'horizontal';
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

        stackedAreaChart.render(stackedAreaContainer, dataset);

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

        stackedAreaChart.render(stackedAreaContainer, dataset);

        // The stacked area dispatches its rows as `values`
        chartTooltip.topicLabel('values').title('Testing tooltip');

        select('.metadata-group .vertical-marker-container')
            .datum([])
            .call(chartTooltip);
    }

    return container;
};

/**
 * A 100% stacked area: `isNormalized(true)` scales every date's areas to the
 * full height, so each area shows its share of the total and the axis runs
 * from 0% to 100%. The tooltip still shows the values.
 */
export const WithNormalizedAreas = () => {
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
            .isNormalized(true)
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        stackedAreaChart.render(stackedAreaContainer, dataset);

        // The stacked area dispatches its rows as `values`
        chartTooltip.topicLabel('values').title('Testing tooltip');

        select('.metadata-group .vertical-marker-container')
            .datum([])
            .call(chartTooltip);
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

        stackedAreaChart.render(stackedAreaContainer, dataset);
    }

    return container;
};

/**
 * The three mouse events, written under the chart: `customMouseMove` gets the
 * data point under the pointer and its anchor `[x, y]`, along with the chart's
 * size and the topic colours.
 */
export const WithMouseEvents = () => {
    const container = getCleanContainer();
    const stackedAreaChart = stackedArea();
    const stackedAreaContainer = select(container);
    const containerWidth = stackedAreaContainer.node()
        ? stackedAreaContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().with2Sources().build();
        const status = document.createElement('p');

        status.textContent = 'Hover the chart';

        stackedAreaChart
            .width(containerWidth)
            .on('customMouseOver', () => {
                status.textContent = 'Mouse over';
            })
            .on('customMouseMove', (dataPoint, [x, y]) => {
                status.textContent = `Mouse move: ${new Date(
                    dataPoint.date
                ).toDateString()} at [${Math.round(x)}, ${Math.round(y)}]`;
            })
            .on('customMouseOut', () => {
                status.textContent = 'Mouse out';
            });

        stackedAreaChart.render(stackedAreaContainer, dataset);
        container.appendChild(status);
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

        stackedAreaChart.render(stackedAreaContainer, dataset);
    }

    return container;
};

export default { title: 'Charts/StackedArea' };
