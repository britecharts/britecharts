import { select } from 'd3-selection';

import brush from './brush';

import { getCleanContainer } from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { BrushDataBuilder } from './brushChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new BrushDataBuilder();

export const Playground = (args) => {
    const container = getCleanContainer();
    const brushChart = brush();
    const brushContainer = select(container);
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withSimpleData().build();

        applyArgs(brushChart, args).width(containerWidth);

        brushChart.render(brushContainer, dataset);
    }

    return container;
};

Playground.args = playgroundArgs(brush, [
    'height',
    'margin',
    'isAnimated',
    'isLocked',
    'areaCurve',
    'xTicks',
    'xAxisFormat',
    'xAxisCustomFormat',
    'dateRange',
    'isLoading',
]);
Playground.args.isAnimated = false;
// A brush is a strip under another chart, so it is shorter than the other
// charts' Playgrounds, with a window already selected.
Playground.args.height = 200;
Playground.args.dateRange = ['7/10/2015', '7/20/2015'];
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithInitialDateRange = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSimpleData().build();

    if (containerWidth) {
        brushChart
            .width(containerWidth)
            .height(200)
            .dateRange([
                '2015-06-27T07:00:00.000Z',
                '2015-07-10T07:00:00.000Z',
            ]);

        brushChart.render(brushContainer, dataset);
    }

    return container;
};

export const WithLockedSelection = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSimpleData().build();

    if (containerWidth) {
        brushChart
            .width(containerWidth)
            .height(200)
            .dateRange(['2015-06-27T07:00:00.000Z', '2015-07-03T07:00:00.000Z'])
            .isLocked(true);

        brushChart.render(brushContainer, dataset);
    }

    return container;
};

/**
 * `customBrushEnd` gets the selection as one `[start, end]` array of dates,
 * rounded to `roundingTimeInterval`.
 */
export const WithSelectionEvents = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSimpleData().build();

    if (containerWidth) {
        const caption = select(container)
            .append('p')
            .attr('class', 'story-caption')
            .text('Drag across the chart');

        brushChart
            .width(containerWidth)
            .height(200)
            .roundingTimeInterval('timeDay')
            .on('customBrushEnd', ([start, end]) => {
                caption.text(
                    start && end
                        ? `${start.toDateString()} to ${end.toDateString()}`
                        : 'No selection'
                );
            });

        brushChart.render(brushContainer, dataset);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSimpleData().build();

    if (containerWidth) {
        brushChart.width(containerWidth).height(125).isAnimated(true);

        brushChart.render(brushContainer, dataset);

        brushChart.dateRange(['7/15/2015', '7/25/2015']);
    }

    return container;
};

export const WithMissingData = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withMissingData().build();

    if (containerWidth) {
        brushChart.width(containerWidth).height(125).isLocked(true);

        brushChart.render(brushContainer, dataset);

        brushChart.dateRange(['7/10/2015', '7/15/2015']);
    }

    return container;
};

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withNegativeValues().build();

    if (containerWidth) {
        brushChart.width(containerWidth).height(200).isAnimated(true);

        brushChart.render(brushContainer, dataset);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const brushContainer = select(container);
    const brushChart = brush();
    const containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withSimpleData().build();

    if (containerWidth) {
        brushChart
            .width(containerWidth)
            .height(125)
            .isAnimated(true)
            .isLoading(true);

        brushChart.render(brushContainer, dataset);
    }

    return container;
};

export default { title: 'Charts/Brush' };
