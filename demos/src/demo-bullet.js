'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const bullet = require('./../../src/charts/bullet');
const dataBuilder = require('./../../test/fixtures/bulletChartDataBuilder');

require('./helpers/resizeHelper');


function createBulletChart() {
    const bulletChart = bullet();
    const testDataSet = new dataBuilder.BulletChartDataBuilder();
    const bulletContainer = d3Selection.select('.js-bullet-chart-container');
    const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
    let dataset;

    if (containerWidth) {
        dataset = testDataSet.withCpuData().build();

        bulletChart
            .width(containerWidth);

        bulletContainer.datum(dataset[0]).call(bulletChart);
    }
}

// Show charts if container available
<<<<<<< HEAD
if (d3Selection.select('.js-bullet-chart-container').node()) {
    createBulletChart();

    let redrawCharts = function() {
=======
if (d3Selection.select('.js bullet-chart-container').node()){
    createBulletChart();

    let redrawCharts = function(){
>>>>>>> Added bullet scripts
        d3Selection.select('.bullet-chart').remove();

        createBulletChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
