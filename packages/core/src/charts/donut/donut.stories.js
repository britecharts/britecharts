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

const getLegendChart = (container, dataset) => {
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
            .width(containerWidth * 0.8)
            .height(200)
            .numberFormat('s');

        legendContainer.datum(dataset).call(legendChart);
    }

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

        legendChart
            .isHorizontal(true)
            .width(containerWidth * 0.6)
            .markerSize(8)
            .height(40);

        legendContainer.datum(dataset).call(legendChart);
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

        legendContainer.datum(dataset).call(legendChart);
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

        donutContainer.datum(dataset).call(donutChart);

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
            .on('customMouseOver', (data) => {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', () => {
                legendChart.clearHighlight();
            });

        donutContainer.datum(dataset).call(donutChart);
    }
    const legendChart = getLegendChart(container, dataset);

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

        donutContainer.datum(dataset).call(donutChart);
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

        donutContainer.datum(dataset).call(donutChart);
    }

    return container;
};

export const WithHighlightedSliceChart = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();
    const dataset = aTestDataSet().withThreeCategories().build();
    const dataNoQuantity = JSON.parse(JSON.stringify(dataset)).map((item) => {
        delete item.quantity;

        return item;
    });

    const legendChart = getVerticalLegendChart(container, dataNoQuantity);

    if (containerWidth) {
        donutChart
            .highlightSliceById(11)
            .hasFixedHighlightedSlice(true)
            .width(containerWidth)
            .height(containerWidth / 1.8)
            .externalRadius(containerWidth / 5)
            .internalRadius(containerWidth / 10)
            .on('customMouseOver', function (slice) {
                legendChart.highlight(slice.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.highlight(11);
            });

        legendChart.highlight(11);

        donutContainer.datum(dataset).call(donutChart);
    }

    return container;
};

/**
 * A pie chart is a donut without a hole: `internalRadius(0)`. With no hole,
 * there is no room for the centred text, so `hasCenterLegend(false)` turns it
 * off and the legend beside the chart names each slice, highlighting the one
 * under the pointer.
 */
export const AsAPieChart = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const pieChart = donut();
    const legendChart = getVerticalLegendChart(container, dataset);

    if (containerWidth) {
        pieChart
            .width(containerWidth)
            .height(containerWidth / 2)
            .externalRadius(containerWidth / 5)
            .internalRadius(0)
            .hasCenterLegend(false)
            .a11yTitle('Visits by source')
            .on('customMouseOver', function (slice) {
                legendChart.highlight(slice.data.id);
            })
            .on('customMouseOut', function () {
                legendChart.clearHighlight();
            });

        donutContainer.datum(dataset).call(pieChart);
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
        donutChart
            .isAnimated(true)
            .highlightSliceById(2)
            .width(containerWidth)
            .height(containerWidth)
            .externalRadius(containerWidth / 2.5)
            .internalRadius(containerWidth / 5)
            .isLoading(true);

        donutContainer.datum(dataset).call(donutChart);
    }

    return container;
};

export default { title: 'Charts/Donut' };
