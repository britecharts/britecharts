import { select, selectAll } from 'd3-selection';
// import PubSub from 'pubsub-js';

import heatmap from './../../src/charts/heatmap/heatmap';
import miniTooltip from './../../src/charts/mini-tooltip/mini-tooltip';

import { HeatmapDataBuilder } from './../../src/charts/heatmap/heatmapChartDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

const aTestDataSet = () => new HeatmapDataBuilder();

function createWeeklyHeatmapChart(optionalColorSchema) {
    let heatmapChart = heatmap(),
        tooltip = miniTooltip().title('Tooltip Title'),
        heatmapContainer = select('.js-heatmap-chart-container'),
        containerWidth = heatmapContainer.node()
            ? heatmapContainer.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        select('.js-download-button').on('click', function () {
            heatmapChart.exportChart('heatmap.png', 'Britecharts Heatmap');
        });

        dataset = aTestDataSet().withWeeklyData().build();

        heatmapChart
            .boxSize(30)
            .isAnimated(true)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        if (optionalColorSchema) {
            heatmapChart.colorSchema(optionalColorSchema);
        }

        heatmapContainer.datum(dataset).call(heatmapChart);

        tooltipContainer = select(
            '.js-heatmap-chart-container .heatmap .metadata-group'
        );
        tooltipContainer.datum([]).call(tooltip);
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
    // PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.heatmap',
        function (newSchema) {
            createWeeklyHeatmapChart(newSchema);
        }
    );
}
