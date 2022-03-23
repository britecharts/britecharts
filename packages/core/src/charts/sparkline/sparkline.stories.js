import { select } from 'd3-selection';

import sparkline from './sparkline';

import { getCleanContainer } from '../../../.storybook/helpers';
import { SparklineDataBuilder } from './sparklineDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new SparklineDataBuilder();

export const WithSimpleData = () => {
    const container = getCleanContainer();
    const sparklineChart = sparkline();
    const sparklineContainer = select(container);
    const containerWidth = sparklineContainer.node()
        ? sparklineContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().with1Source().build();

    if (containerWidth) {
        sparklineChart
            .isAnimated(true)
            .height(containerWidth / 4)
            .width(containerWidth);

        sparklineContainer.datum(dataset).call(sparklineChart);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const sparklineChart = sparkline();
    const sparklineContainer = select(container);
    const containerWidth = sparklineContainer.node()
        ? sparklineContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().with1Source().build();

    if (containerWidth) {
        sparklineChart
            .width(containerWidth)
            .height(containerWidth / 4)
            .isAnimated(true)
            .isLoading(true);

        sparklineContainer.datum(dataset).call(sparklineChart);
    }

    return container;
};

export default { title: 'Charts/Sparkline' };
