import { select } from 'd3-selection';

import donut from '../donut/donut';
import legend from './legend';

import { getCleanContainer } from '../../../.storybook/helpers';
import { DonutDataBuilder } from '../donut/donutChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new DonutDataBuilder();

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
            .height(30);

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

        legendChart.width(containerWidth / 2).height(200);

        legendContainer.datum(dataset).call(legendChart);
    }

    return legendChart;
};

export const Vertical = () => {
    const container = getCleanContainer();
    const dataset = aTestDataSet().withFivePlusOther().build();
    const legendChart = getVerticalLegendChart(container, dataset);

    return container;
};

export const Inline = () => {
    const container = getCleanContainer();
    const dataset = aTestDataSet().withThreeCategories().build();
    const legendChart = getInlineLegendChart(container, dataset);

    return container;
};

export const WithDonutBounded = () => {
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

export default { title: 'Charts/Legend' };
