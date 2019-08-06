import { select, selectAll } from 'd3-selection';
import PubSub from 'pubsub-js';

import heatmap from './../../src/charts/heatmap';
import { HeatmapDataBuilder } from './../../test/fixtures/heatmapChartDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

const aTestDataSet = () => new HeatmapDataBuilder();

function createWeeklyHeatmapChart(optionalColorSchema) {
    let heatmapChart = heatmap(),
        heatmapContainer = select('.js-heatmap-chart-container'),
        containerWidth = heatmapContainer.node() ? heatmapContainer.node().getBoundingClientRect().width : false,
        dataset;

    if (containerWidth) {
        select('.js-download-button').on('click', function () {
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
if (select('.js-heatmap-chart-container').node()) {
    createWeeklyHeatmapChart();

    let redrawCharts = function () {
        selectAll('.heatmap').remove();
        createWeeklyHeatmapChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.heatmap', function (newSchema) {
        createWeeklyHeatmapChart(newSchema);
    });
}
