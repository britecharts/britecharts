'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    donut = require('./../src/charts/donut'),
    legend = require('./../src/charts/legend'),
    dataBuilder = require('./../test/fixtures/donutChartDataBuilder'),
    colorSelectorHelper = require('./helpers/colorSelector'),

    dataset = new dataBuilder.DonutDataBuilder()
        .withFivePlusOther()
        .build(),
    legendChart;


function createDonutChart(dataset, optionalColorSchema) {
    var legendChart = getLegendChart(dataset, optionalColorSchema),
        donutChart = donut(),
        donutContainer = d3.select('.js-donut-chart-container'),
        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3.select('#button').on('click', function() {
            donutChart.exportChart();
        });

        donutChart
            .width(containerWidth)
            .height(containerWidth)
            .externalRadius(containerWidth/2.5)
            .internalRadius(containerWidth/5)
            .on('customMouseOver', function(data) {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', function() {
                legendChart.clearHighlight();
            });

        if (optionalColorSchema) {
            donutChart.colorSchema(optionalColorSchema);
        }

        donutContainer.datum(dataset).call(donutChart);

        d3.select('#button').on('click', function() {
            donutChart.exportChart('donut.png', 'Britecharts Donut Chart');
        });
    }
}

function getLegendChart(dataset, optionalColorSchema) {
    var legendChart = legend(),
        legendContainer = d3.select('.js-legend-chart-container'),
        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3.select('.js-legend-chart-container .britechart-legend').remove();

        legendChart
            .width(containerWidth/2)
            .height(200)

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function createSmallDonutChart() {
    var donutChart = donut(),
        donutContainer = d3.select('.js-small-donut-chart-container'),
        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        donutChart
            .width(containerWidth)
            .height(containerWidth/1.5)
            .externalRadius(containerWidth/5)
            .internalRadius(containerWidth/10);
        donutContainer.datum(dataset).call(donutChart);
    }
}

// Show charts if container available
if (d3.select('.js-donut-chart-container').node()) {
    createDonutChart(dataset);
    createSmallDonutChart();

    d3.select(window).on('resize', _.debounce(function(){
        d3.selectAll('.donut-chart').remove();

        createDonutChart(dataset);
        createSmallDonutChart();
    }, 200));

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.donut-chart', createDonutChart.bind(null, dataset));
}
