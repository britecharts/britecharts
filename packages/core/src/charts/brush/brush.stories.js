import { select } from 'd3-selection';

import brush from './brush';

import { getCleanContainer } from '../../../.storybook/helpers';
import { BrushDataBuilder } from './brushChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new BrushDataBuilder();

export const Animated = () => {
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
