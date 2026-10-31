import { select } from 'd3-selection';

import donut from '../donut/donut';
import legend from './legend';

import { getCleanContainer } from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { DonutDataBuilder } from '../donut/donutChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new DonutDataBuilder();

const getInlineLegendChart = (container, dataset, markerSize) => {
    const legendChart = legend();
    const wrapper = document.createElement('div');
    wrapper.classList = 'legend-chart-container';
    container.appendChild(wrapper);
    const legendContainer = select(wrapper);

    const containerWidth = legendContainer.node()
        ? legendContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        legendContainer.selectAll('.britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth * 0.6)
            .height(30);

        if (markerSize) {
            legendChart.markerSize(markerSize);
        }

        legendChart.render(legendContainer, dataset);
    }

    return legendChart;
};

const getVerticalLegendChart = (container, dataset) => {
    const legendChart = legend();
    const wrapper = document.createElement('div');
    wrapper.classList = 'legend-chart-container';
    container.appendChild(wrapper);
    const legendContainer = select(wrapper);
    const containerWidth = legendContainer.node()
        ? legendContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        legendContainer.selectAll('.britechart-legend').remove();

        legendChart.width(containerWidth / 2).height(200);

        legendChart.render(legendContainer, dataset);
    }

    return legendChart;
};

export const Playground = (args) => {
    const container = getCleanContainer();
    const legendChart = legend();
    const legendContainer = select(container);
    const containerWidth = legendContainer.node()
        ? legendContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withFivePlusOther().build();

        applyArgs(legendChart, args).width(containerWidth);

        legendChart.render(legendContainer, dataset);
    }

    return container;
};

Playground.args = playgroundArgs(legend, [
    'height',
    'margin',
    'colorSchema',
    'isHorizontal',
    'marginRatio',
    'markerSize',
    'unit',
    'numberFormat',
    'highlightEntryById',
]);
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithStackDirection = () => {
    const container = getCleanContainer();
    const dataset = aTestDataSet().withFivePlusOther().build();

    getVerticalLegendChart(container, dataset);

    return container;
};

export const WithInlineDirection = () => {
    const container = getCleanContainer();
    const dataset = aTestDataSet().withFivePlusOther().build();

    getInlineLegendChart(container, dataset);

    return container;
};

export const WithInlineDirectionAndSmallerMarkers = () => {
    const container = getCleanContainer();
    const dataset = aTestDataSet().withFivePlusOther().build();

    getInlineLegendChart(container, dataset, 8);

    return container;
};

export const WithDonutBounded = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();
    const dataset = aTestDataSet().withFourSlices().build();
    const fixedSlice = 2;
    const dataNoQuantity = JSON.parse(JSON.stringify(dataset)).map((item) => {
        delete item.quantity;

        return item;
    });
    const legendChart = getVerticalLegendChart(container, dataNoQuantity);

    if (containerWidth) {
        donutChart
            .highlightSliceById(fixedSlice)
            .hasFixedHighlightedSlice(true)
            .width(containerWidth)
            .height(containerWidth / 1.8)
            .externalRadius(containerWidth / 5)
            .internalRadius(containerWidth / 10)
            .on('customMouseOver', function (slice) {
                legendChart.highlight(slice.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.highlight(fixedSlice);
            });

        legendChart.highlight(fixedSlice);

        donutChart.render(donutContainer, dataset);
    }

    return container;
};

export default { title: 'Charts/Legend' };
