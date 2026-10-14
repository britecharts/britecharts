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

        // The window goes on after the first render: `dateRange` moves the
        // brush at once, and before the chart has drawn it has no scale yet.
        const { dateRange, ...settings } = args;

        applyArgs(brushChart, settings).width(containerWidth);

        brushContainer.datum(dataset).call(brushChart);

        if (dateRange) {
            brushChart.dateRange(dateRange);
        }
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
// As tall as the other charts' Playgrounds, with a window already selected.
Playground.args.height = 500;
Playground.args.dateRange = ['7/10/2015', '7/20/2015'];
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithAnimation = () => {
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
            .on('customBrushStart', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('customBrushStart extent:', brushExtent);
            })
            .on('customBrushEnd', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('customBrushEnd extent:', brushExtent);
            });

        brushContainer.datum(dataset).call(brushChart);

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
        brushChart
            .width(containerWidth)
            .height(125)
            .isLocked(true)
            .on('customBrushStart', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('customBrushStart extent:', brushExtent);
            })
            .on('customBrushEnd', function (brushExtent) {
                // eslint-disable-next-line no-console
                console.log('customBrushEnd extent:', brushExtent);
            });

        brushContainer.datum(dataset).call(brushChart);

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

        brushContainer.datum(dataset).call(brushChart);
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

        brushContainer.datum(dataset).call(brushChart);
    }

    return container;
};

export default { title: 'Charts/Brush' };
