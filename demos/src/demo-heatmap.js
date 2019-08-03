const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

import heatmap from './../../src/charts/heatmap';
const colors = require('./../../src/charts/helpers/color');

import { HeatmapDataBuilder } from './../../test/fixtures/heatmapChartDataBuilder';

import colorSelectorHelper from './helpers/colorSelector';

const aTestDataSet = () => new HeatmapDataBuilder();

require('./helpers/resizeHelper');

function createWeeklyHeatmapChart(optionalColorSchema) {
    let heatmapChart = heatmap(),
        heatmapContainer = d3Selection.select('.js-heatmap-chart-container'),
        containerWidth = heatmapContainer.node() ? heatmapContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        d3Selection.select('.js-download-button').on('click', function () {
            heatmapChart.exportChart('heatmap.png', 'Britecharts Heatmap');
        });

        dataset = aTestDataSet().withWeeklyData().build();

        heatmapChart
            .boxSize(30);

        if (optionalColorSchema) {
            heatmapChart.colorSchema(optionalColorSchema);
        }

        heatmapContainer.datum(dataset).call(heatmapChart);
    }
}

// Show charts if container available
if (d3Selection.select('.js-heatmap-chart-container').node()) {
    createWeeklyHeatmapChart();

    let redrawCharts = function () {
        d3Selection.selectAll('.heatmap').remove();
        createWeeklyHeatmapChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.heatmap', function (newSchema) {
        createWeeklyHeatmapChart(newSchema);
    });
}
