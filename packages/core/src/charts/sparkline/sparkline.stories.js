import { select } from 'd3-selection';

import sparkline from './sparkline';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { SparklineDataBuilder } from './sparklineDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new SparklineDataBuilder();

export const Playground = (args) => {
    const container = getCleanContainer();
    const sparklineChart = sparkline();
    const sparklineContainer = select(container);
    const containerWidth = sparklineContainer.node()
        ? sparklineContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().with1Source().build();

        sparklineChart.height(containerWidth / 4);
        applyArgs(sparklineChart, args).width(containerWidth);

        sparklineContainer.datum(dataset).call(sparklineChart);

        addExportButtons(container, sparklineChart, 'sparkline');
    }

    return container;
};

Playground.args = playgroundArgs(sparkline, [
    'height',
    'margin',
    'isAnimated',
    'isLoading',
]);
Playground.args.isAnimated = false;
// Left empty, the height is a quarter of the width, as in the other stories;
// a number typed into its Control replaces it
Playground.args.height = undefined;
Playground.argTypes = {
    ...playgroundArgTypes(Playground.args),
    height: { control: 'number' },
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const sparklineChart = sparkline();
    const sparklineContainer = select(container);
    const containerWidth = sparklineContainer.node()
        ? sparklineContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().with1Source().build();

        sparklineChart
            .isAnimated(true)
            .height(containerWidth / 4)
            .width(containerWidth);

        sparklineContainer.datum(dataset).call(sparklineChart);
    }

    return container;
};

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const sparklineChart = sparkline();
    const sparklineContainer = select(container);
    const containerWidth = sparklineContainer.node()
        ? sparklineContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withNegativeValues().build();

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
