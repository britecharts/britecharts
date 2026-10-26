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
const lightWords = [
    'Blazing',
    'Glittering',
    'Shining',
    'Sunny',
    'Flashing',
    'Radiant',
];
// What the tooltip shows for a box: its row and column words, and its value
const nameBox = ({ day, hour, value }) => ({
    name:
        day === hour
            ? lightWords[day]
            : `${lightWords[day]} + ${lightWords[hour]}`,
    value,
});

/**
 * Categories on both axes: `yAxisLabels` names the rows and `xAxisLabels` the
 * columns, and each box's `day` and `hour` index them. How often two light
 * words describe the same thing, and on the diagonal how often each one does
 * on its own. The chart is sized from the box size and margins, so the grid
 * stays square.
 */
export const Playground = (args) => {
    const container = getCleanContainer();
    const heatmapChart = heatmap();
    const heatmapContainer = select(container);
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip().title('Described together').numberFormat('d');

    if (containerWidth) {
        const dataset = aTestDataSet().withCategoricalData().build();
        applyArgs(heatmapChart, args)
            .yAxisLabels(lightWords)
            .xAxisLabels(lightWords)
            .on('customMouseOver', (box, ...rest) =>
                tooltip.show(nameBox(box), ...rest)
            )
            .on('customMouseMove', (box, ...rest) =>
                tooltip.update(nameBox(box), ...rest)
            )
            .on('customMouseOut', tooltip.hide);

        const { top, right, bottom, left } = heatmapChart.margin();
        const side = lightWords.length * heatmapChart.boxSize();

        heatmapChart.width(left + side + right).height(top + side + bottom);

        heatmapContainer.datum(dataset).call(heatmapChart);

        addExportButtons(container, heatmapChart, 'heatmap');

        select('.heatmap .metadata-group').datum([]).call(tooltip);
    }

    return container;
};

Playground.args = playgroundArgs(heatmap, [
    'margin',
    'isAnimated',
    'colorSchema',
    'boxSize',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.args.colorSchema = 'purple';
Playground.args.boxSize = 70;
// Room on the left for the longest word
Playground.args.margin = { ...Playground.args.margin, left: 80 };
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

export const WithAnotherColorSchema = () => {
    const container = getCleanContainer();
    const heatmapContainer = select(container);
    const heatmapChart = heatmap();
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withWeeklyData().build();

    if (containerWidth) {
        heatmapChart.colorSchema(colors.colorSchemas.teal);

        heatmapContainer.datum(dataset).call(heatmapChart);
    }

    return container;
};

export const WithDayLabels = () => {
    const container = getCleanContainer();
    const heatmapContainer = select(container);
    const heatmapChart = heatmap();
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withWeeklyData().build();

    if (containerWidth) {
        heatmapChart.yAxisLabels(['S', 'M', 'T', 'W', 'T', 'F', 'S']);

        heatmapContainer.datum(dataset).call(heatmapChart);
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
