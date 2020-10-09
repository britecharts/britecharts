'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const heatmap = require('./../../src/charts/heatmap');
const colors = require('./../../src/charts/helpers/color');
const dataBuilder = require('./../../test/fixtures/heatmapChartDataBuilder');
const miniTooltip = require('./../../src/charts/mini-tooltip');
const colorSelectorHelper = require('./helpers/colorSelector');

const aTestDataSet = () => new dataBuilder.HeatmapDataBuilder();

require('./helpers/resizeHelper');

function createWeeklyHeatmapChart(optionalColorSchema) {
    let heatmapChart = heatmap(),
        tooltip = miniTooltip(),
        heatmapContainer = d3Selection.select('.js-heatmap-chart-container'),
        containerWidth = heatmapContainer.node() ? heatmapContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        d3Selection.select('.js-download-button').on('click', function () {
            heatmapChart.exportChart('heatmap.png', 'Britecharts Heatmap');
        });

        dataset = aTestDataSet().withWeeklyData().build();

        heatmapChart
            .boxSize(30)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        if (optionalColorSchema) {
            heatmapChart.colorSchema(optionalColorSchema);
        }

        heatmapContainer.datum(dataset).call(heatmapChart);

        tooltipContainer = d3Selection.select('.js-heatmap-chart-container .heatmap .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
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
