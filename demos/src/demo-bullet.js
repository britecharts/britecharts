'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const bullet = require('./../../src/charts/bullet');
const dataBuilder = require('./../../test/fixtures/bulletChartDataBuilder');

const colorSelectorHelper = require('./helpers/colorSelector');
const colors = require('./../../src/charts/helpers/color');

require('./helpers/resizeHelper');

function createBulletChart(optionalColorSchema) {
    const testDataSet = new dataBuilder.BulletChartDataBuilder();
    const bulletContainer = d3Selection.select('.js-bullet-chart-container');
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;
    let bulletChart, dataset;

    if (containerWidth) {
        dataset = testDataSet.withCpuData().build();

        // remove all current list of children before
        // appending the next one
        bulletContainer.selectAll('*').remove();

        dataset.forEach(data => {
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
if (d3Selection.select('.js-bullet-chart-container').node()) {
    createBulletChart();

    let redrawCharts = function() {
        d3Selection.select('.bullet-chart').remove();

        createBulletChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.bullet-chart', function (newSchema) {
        createBulletChart(newSchema);
    });
}
