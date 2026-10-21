import { select } from 'd3-selection';

import heatmap from './heatmap';
import miniTooltip from '../mini-tooltip/mini-tooltip';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { HeatmapDataBuilder } from './heatmapChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new HeatmapDataBuilder();

export const Playground = (args) => {
    const container = getCleanContainer();
    const heatmapChart = heatmap();
    const heatmapContainer = select(container);
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip().title('Tooltip Title');

    if (containerWidth) {
        const dataset = aTestDataSet().withWeeklyData().build();

        applyArgs(heatmapChart, args)
            .width(containerWidth)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        heatmapContainer.datum(dataset).call(heatmapChart);

        addExportButtons(container, heatmapChart, 'heatmap');

        select('.heatmap .metadata-group').datum([]).call(tooltip);
    }

    return container;
};

Playground.args = playgroundArgs(heatmap, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'boxSize',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithWeeklyElements = () => {
    const container = getCleanContainer();
    const heatmapContainer = select(container);
    const heatmapChart = heatmap();
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withWeeklyData().build();

    if (containerWidth) {
        heatmapChart.boxSize(30).isAnimated(true);

        heatmapContainer.datum(dataset).call(heatmapChart);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const heatmapChart = heatmap();
    const heatmapContainer = select(container);
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip().title('Tooltip Title');

    if (containerWidth) {
        const dataset = aTestDataSet().withWeeklyData().build();

        heatmapChart
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        heatmapContainer.datum(dataset).call(heatmapChart);

        select('.heatmap .metadata-group').datum([]).call(tooltip);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const heatmapContainer = select(container);
    const heatmapChart = heatmap();
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        heatmapChart.width(containerWidth).isLoading(true);

        heatmapContainer.datum([]).call(heatmapChart);
    }

    return container;
};

export default { title: 'Charts/Heatmap' };
