import { select } from 'd3-selection';

import scatterPlot from './scatter-plot';
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
import { ScatterPlotDataBuilder } from './scatterPlotDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new ScatterPlotDataBuilder();

export const Playground = (args) => {
    const container = getCleanContainer();
    const scatterChart = scatterPlot();
    const scatterPlotContainer = select(container);
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withOneSource().build();
        // The chart sets `valueLabel('y')`; `nameLabel('x')` shows a point's
        // `x` instead of its name
        const tooltip = miniTooltip()
            .title('Temperature (C)')
            .nameLabel('x')
            .numberFormat('$');

        applyArgs(scatterChart, args).width(containerWidth).tooltip(tooltip);

        scatterChart.render(scatterPlotContainer, dataset);

        addExportButtons(container, scatterChart, 'scatter-plot');
    }

    return container;
};

Playground.args = playgroundArgs(scatterPlot, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'circleOpacity',
    'circleStrokeOpacity',
    'circleStrokeWidth',
    'maxCircleArea',
    'hasHollowCircles',
    'hasTrendline',
    'hasCrossHairs',
    'enableZoom',
    'grid',
    'xAxisFormat',
    'xAxisFormatType',
    'xAxisLabel',
    'xAxisLabelOffset',
    'xTicks',
    'yAxisFormat',
    'yAxisLabel',
    'yAxisLabelOffset',
    'yTicks',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.args.grid = 'horizontal';
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithIncreasedAreaAndHollowCircles = () => {
    const container = getCleanContainer();
    const scatterPlotContainer = select(container);
    const scatterChart = scatterPlot();
    const tooltip = miniTooltip();
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withFourNames().build();
    let tooltipContainer;

    if (containerWidth) {
        scatterChart
            .width(containerWidth)
            .hasCrossHairs(true)
            .hasHollowCircles(true)
            .isAnimated(true)
            .margin({
                left: 60,
                bottom: 45,
                right: 20,
            })
            .maxCircleArea(15)
            // Titled with the hovered point's group, set before the tooltip
            // draws so it never shows the previous point's
            .on('customMouseOver', (dataPoint, ...position) => {
                tooltip.title(dataPoint.name).show(dataPoint, ...position);
            })
            .on('customMouseMove', (dataPoint, ...position) => {
                tooltip.title(dataPoint.name).update(dataPoint, ...position);
            })
            .on('customMouseOut', tooltip.hide);

        scatterChart.render(scatterPlotContainer, dataset);

        // A point's value is its `y`; `nameLabel('x')` shows its `x` instead of its name
        tooltip.valueLabel('y').nameLabel('x');

        tooltipContainer = select('.scatter-plot .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const scatterChart = scatterPlot();
    const scatterPlotContainer = select(container);
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip().title('Temperature (C)');

    if (containerWidth) {
        const dataset = aTestDataSet().withOneSource().build();

        scatterChart
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        scatterChart.render(scatterPlotContainer, dataset);

        // A point's value is its `y`; `nameLabel('x')` shows its `x` instead of its name
        tooltip.valueLabel('y').nameLabel('x').numberFormat('$');

        select('.scatter-plot .metadata-group').datum([]).call(tooltip);
    }

    return container;
};

export const WithNegativeValues = () => {
    const container = getCleanContainer();
    const scatterPlotContainer = select(container);
    const scatterChart = scatterPlot();
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withNegativeValues().build();

    if (containerWidth) {
        scatterChart.isAnimated(true).width(containerWidth).height(400);

        scatterChart.render(scatterPlotContainer, dataset);
    }

    return container;
};

/**
 * Values on both sides of zero: the value axis runs below zero, and each
 * circle's size shows the magnitude of its value, so -55 draws as large as 55.
 * Static, with grid lines, so the zero line and the sizes are easy to compare.
 */
export const WithValuesAboveAndBelowZero = () => {
    const container = getCleanContainer();
    const scatterChart = scatterPlot();
    const scatterPlotContainer = select(container);
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip().title('Temperature delta (C)');

    if (containerWidth) {
        const dataset = aTestDataSet().withNegativeValues().build();

        scatterChart
            .isAnimated(false)
            .grid('full')
            .width(containerWidth)
            .height(400)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        scatterChart.render(scatterPlotContainer, dataset);

        // A point's value is its `y`; `nameLabel('x')` shows its `x` instead of its name
        tooltip.valueLabel('y').nameLabel('x');

        select('.scatter-plot .metadata-group').datum([]).call(tooltip);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const scatterPlotContainer = select(container);
    const scatterChart = scatterPlot();
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        scatterChart.width(containerWidth).isLoading(true);

        scatterPlotContainer.datum([]).call(scatterChart);
    }

    return container;
};

export default { title: 'Charts/ScatterPlot' };
