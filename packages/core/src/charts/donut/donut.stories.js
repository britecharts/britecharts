import { select } from 'd3-selection';

import donut from './donut';
import legend from '../legend/legend';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { DonutDataBuilder } from './donutChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new DonutDataBuilder();
const dataset = aTestDataSet().withFivePlusOther().build();
const datasetWithThreeItems = aTestDataSet().withThreeCategories().build();

// A vertical legend, given room for each entry: the legend splits its
// height evenly between them, so a short one stacks the markers
const getLegendChart = (container, dataset, width) => {
    const legendChart = legend();
    const wrapper = document.createElement('div');
    wrapper.classList = 'legend-chart-container';
    container.appendChild(wrapper);

    legendChart
        .width(width)
        .height((dataset.length + 1) * 32)
        .numberFormat('s');

    legendChart.render(wrapper, dataset);

    return legendChart;
};

const getInlineLegendChart = (container, dataset) => {
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

        // As wide as the chart: the inline legend centres its entries in its
        // own width, so this lines them up under the donut
        legendChart
            .isHorizontal(true)
            .width(containerWidth)
            .markerSize(8)
            .height(40);

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

        legendChart.width(containerWidth).height(100);

        legendChart.render(legendContainer, dataset);
    }

    return legendChart;
};

export const Playground = (args) => {
    const container = getCleanContainer();
    const donutChart = donut();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        applyArgs(donutChart, args).width(containerWidth);

        donutChart.render(donutContainer, dataset);

        addExportButtons(container, donutChart, 'donut');
    }

    return container;
};

Playground.args = playgroundArgs(donut, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'externalRadius',
    'internalRadius',
    'radiusHoverOffset',
    'hasCenterLegend',
    'hasFixedHighlightedSlice',
    'hasHoverAnimation',
    'hasLastHoverSliceHighlighted',
    'highlightSliceById',
    'percentageFormat',
    'numberFormat',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithAnimationAndLegend = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();
    let legendChart;

    if (containerWidth) {
        const chartWidth = containerWidth * 0.55;
        // Capped, so a wide canvas does not draw a ring as wide as itself
        const chartHeight = Math.min(chartWidth, 400);

        // The donut and its legend side by side
        container.style.display = 'flex';
        container.style.alignItems = 'center';

        donutChart
            .isAnimated(true)
            .highlightSliceById(2)
            .width(chartWidth)
            .height(chartHeight)
            .externalRadius(chartHeight / 2.5)
            .internalRadius(chartHeight / 5)
            .on('customMouseOver', (data) => {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', () => {
                legendChart.clearHighlight();
            });

        donutChart.render(donutContainer, dataset);
        legendChart = getLegendChart(container, dataset, containerWidth * 0.4);
    }

    return container;
};

export const WithInlineLegend = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();
    const dataset = aTestDataSet().withThreeCategories().build();

    if (containerWidth) {
        donutChart
            .width(containerWidth)
            .height(containerWidth / 1.8)
            .externalRadius(containerWidth / 5)
            .internalRadius(containerWidth / 10)
            .on('customMouseOver', (data) => {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', () => {
                legendChart.clearHighlight();
            });

        donutChart.render(donutContainer, dataset);
    }
    const legendChart = getInlineLegendChart(container, dataset);

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const donutChart = donut();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        donutChart.isAnimated(true).width(containerWidth);

        donutChart.render(donutContainer, dataset);
    }

    return container;
};

export const WithHighlightedSlice = () => {
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

/**
 * Hovering a slice reports it through `customMouseOver`: here, in the line
 * under the chart.
 */
export const WithHoverEvent = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();

    if (containerWidth) {
        const status = document.createElement('p');

        status.textContent = 'Hover a slice';

        donutChart
            .width(containerWidth)
            .height(Math.min(containerWidth, 400))
            .externalRadius(100)
            .internalRadius(47)
            .highlightSliceById(1)
            .on('customMouseOver', (slice) => {
                status.textContent = `Mouse over: ${slice.data.name}`;
            });

        donutChart.render(donutContainer, dataset);
        container.appendChild(status);
    }

    return container;
};

/**
 * A pie chart is a donut without a hole: `internalRadius(0)`. With no hole,
 * there is no room for the centred text, so `hasCenterLegend(false)` turns it
 * off and the legend on its right names each slice, highlighting the one
 * under the pointer.
 */
export const WithPieChartFormat = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const pieChart = donut();
    const legendChart = legend();

    if (containerWidth) {
        const pieWidth = containerWidth * 0.55;

        // The pie and its legend side by side
        container.style.display = 'flex';
        container.style.alignItems = 'center';

        pieChart
            .width(pieWidth)
            .height(pieWidth * 0.8)
            .externalRadius(pieWidth / 3.5)
            .internalRadius(0)
            .hasCenterLegend(false)
            .a11yTitle('Visits by source')
            .on('customMouseOver', function (slice) {
                legendChart.highlight(slice.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.clearHighlight();
            });

        pieChart.render(donutContainer, dataset);

        // On the pie's right, with room for each entry: the legend splits its
        // height evenly between them, so a short one stacks the markers
        const legendWrapper = document.createElement('div');

        container.appendChild(legendWrapper);
        legendChart
            .width(containerWidth * 0.4)
            .height((dataset.length + 1) * 32);
        legendChart.render(legendWrapper, dataset);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();
    const dataset = aTestDataSet().withFivePlusOther().build();

    if (containerWidth) {
        // Capped, so a wide canvas does not draw a ring as wide as itself
        const chartHeight = Math.min(containerWidth, 400);

        donutChart
            .isAnimated(true)
            .highlightSliceById(2)
            .width(containerWidth)
            .height(chartHeight)
            .externalRadius(chartHeight / 2.5)
            .internalRadius(chartHeight / 5)
            .isLoading(true);

        donutChart.render(donutContainer, dataset);
    }

    return container;
};

export default { title: 'Charts/Donut' };
