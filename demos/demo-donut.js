'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    donut = require('./../src/charts/donut'),
    legend = require('./../src/charts/legend'),
    dataBuilder = require('./../test/fixtures/donutChartDataBuilder'),

    briteChartsColors = ['#f6682f', '#f20cb6', '#ff0044', '#ffdb00', '#00cc52', '#00a8f2'],

    dataset = new dataBuilder.DonutDataBuilder()
        .withFivePlusOther()
        .build(),
    legendChart;

function createDonutChart(dataset, legendChart) {
    var donutChart = donut(),
        donutContainer = d3.select('.js-donut-chart-container'),
        containerWidth = donutContainer.node().getBoundingClientRect().width;

    d3.select('#button').on('click', function() {
        donutChart.exportChart();
    });

    donutChart
        .width(containerWidth)
        .height(containerWidth)
        .externalRadius(containerWidth/2.5)
        .internalRadius(containerWidth/5)
        .colorScheme(briteChartsColors)
        .on('customMouseOver', function(data) {
            legendChart.highlight(data.data.id);
        })
        .on('customMouseOut', function() {
            legendChart.clearHighlight();
        });

    donutContainer.datum(dataset).call(donutChart);
}
function getLegendChart(dataset) {
    var legendChart = legend(),
        legendContainer = d3.select('.js-legend-chart-container');

    legendChart.colorScheme(briteChartsColors);

    legendContainer.datum(dataset).call(legendChart);

    return legendChart;
}

function createSmallDonutChart() {
    var donutChart = donut(),
        donutContainer = d3.select('.js-small-donut-chart-container'),
        containerWidth = donutContainer.node().getBoundingClientRect().width;

    donutChart
        .width(containerWidth)
        .height(containerWidth/1.5)
        .externalRadius(containerWidth/5)
        .internalRadius(containerWidth/10);
    donutContainer.datum(dataset).call(donutChart);
}

// Show charts if container available
if (d3.select('.js-donut-chart-container').node()) {
    legendChart = getLegendChart(dataset);

    createDonutChart(dataset, legendChart);
    createSmallDonutChart();

    d3.select(window).on('resize', _.debounce(function(){
        d3.selectAll('.donut-chart').remove();

        createDonutChart(dataset, legendChart);
        createSmallDonutChart();
    }, 200));
}
