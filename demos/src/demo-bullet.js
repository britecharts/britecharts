import { select } from 'd3-selection';
// import PubSub from 'pubsub-js';

import bullet from './../../src/charts/bullet/bullet';
import { BulletChartDataBuilder } from './../../src/charts/bullet/bulletChartDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

function createBulletChart(optionalColorSchema) {
    const testDataSet = new BulletChartDataBuilder();
    const bulletContainer = select('.js-bullet-chart-container');
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;
    let bulletChart, dataset;

    if (containerWidth) {
        dataset = testDataSet.withManyCPUData().build();

        // remove all current list of children before
        // appending the next one
        bulletContainer.selectAll('*').remove();

        dataset.forEach((data) => {
            bulletChart = new bullet();
            bulletChart.width(containerWidth);

            if (optionalColorSchema) {
                bulletChart.colorSchema(optionalColorSchema);
            }

            bulletContainer.datum(data).call(bulletChart);
        });
    }
}

// Show charts if container available
if (select('.js-bullet-chart-container').node()) {
    createBulletChart();

    let redrawCharts = function () {
        select('.bullet-chart').remove();

        createBulletChart();
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.bullet-chart',
        function (newSchema) {
            createBulletChart(newSchema);
        }
    );
}
