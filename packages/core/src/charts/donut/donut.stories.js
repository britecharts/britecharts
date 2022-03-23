import { select } from 'd3-selection';

import donut from './donut';
import legend from '../legend/legend';

import { getCleanContainer } from '../../../.storybook/helpers';
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

export const AnimatedWithLegend = () => {
    const container = getCleanContainer();
    const donutContainer = select(container);
    const containerWidth = donutContainer.node()
        ? donutContainer.node().getBoundingClientRect().width
        : false;
    const donutChart = donut();

    if (containerWidth) {
        donutChart
            .isAnimated(true)
            .highlightSliceById(2)
            .width(containerWidth)
            .height(containerWidth)
            .externalRadius(containerWidth / 2.5)
            .internalRadius(containerWidth / 5)
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
