'use strict';

var d3Selection = require('d3-selection'),
    PubSub = require('pubsub-js'),

    donut = require('./../src/charts/donut'),
    legend = require('./../src/charts/legend'),

    dataBuilder = require('./../test/fixtures/donutChartDataBuilder'),
    colorSelectorHelper = require('./helpers/colorSelector'),

    dataset = new dataBuilder.DonutDataBuilder()
        .withFivePlusOther()
        .build(),
    datasetNoPercentages = new dataBuilder.DonutDataBuilder()
        .withFivePlusOtherNoPercent()
        .build(),
    datasetWithThreeItems = new dataBuilder.DonutDataBuilder()
        .withThreeCategories()
        .build(),
    legendChart,
    redrawCharts;

require('./helpers/resizeHelper');


function createDonutChart(optionalColorSchema) {
    var legendChart = getLegendChart(dataset, optionalColorSchema),
        donutChart = donut(),
        donutContainer = d3Selection.select('.js-donut-chart-container'),
        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3Selection.select('#button').on('click', function() {
            donutChart.exportChart();
        });

        donutChart
            .isAnimated(true)
            .highlightSliceById(2)
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

        d3Selection.select('#button').on('click', function() {
            donutChart.exportChart('donut.png', 'Britecharts Donut Chart');
        });
    }
}

function getLegendChart(dataset, optionalColorSchema) {
    var legendChart = legend(),
        legendContainer = d3Selection.select('.js-legend-chart-container'),
        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3Selection.select('.js-legend-chart-container .britechart-legend').remove();

        legendChart
            .width(containerWidth*0.8)
            .height(200)
            .numberFormat('s');

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function getInlineLegendChart(dataset, optionalColorSchema) {
    var legendChart = legend(),
        legendContainer = d3Selection.select('.js-inline-legend-chart-container'),
        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
        d3Selection.select('.js-inline-legend-chart-container .britechart-legend').remove();

        legendChart
            .isHorizontal(true)
            .width(containerWidth*0.6)
            .markerSize(8)
            .height(40)

        if (optionalColorSchema) {
            legendChart.colorSchema(optionalColorSchema);
        }

        legendContainer.datum(dataset).call(legendChart);

        return legendChart;
    }
}

function createSmallDonutChart() {
    var donutChart = donut(),
        donutContainer = d3Selection.select('.js-small-donut-chart-container'),
        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false,
        dataset = new dataBuilder.DonutDataBuilder()
            .withThreeCategories()
            .build(),
        legendChart = getInlineLegendChart(dataset);

    if (containerWidth) {
        donutChart
            .width(containerWidth)
            .height(containerWidth/1.8)
            .externalRadius(containerWidth/5)
            .internalRadius(containerWidth/10)
            .on('customMouseOver', function(data) {
                legendChart.highlight(data.data.id);
            })
            .on('customMouseOut', function() {
                legendChart.clearHighlight();
            });

        donutContainer.datum(dataset).call(donutChart);
    }
}

function createDonutWithHighlightSliceChart() {
    var donutChart = donut(),
        donutContainer = d3Selection.select('.js-donut-highlight-slice-chart-container'),
        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false,
        dataset = new dataBuilder.DonutDataBuilder()
            .withThreeCategories()
            .build();

    if (containerWidth) {
        donutChart
            .highlightSliceById(11)
            .hasFixedHighlightedSlice(true)
            .width(containerWidth)
            .height(containerWidth/1.8)
            .externalRadius(containerWidth/5)
            .internalRadius(containerWidth/10);

        donutContainer.datum(dataset).call(donutChart);
    }
}

// Show charts if container available
if (d3Selection.select('.js-donut-chart-container').node()) {
    createDonutChart();
    createSmallDonutChart();
    createDonutWithHighlightSliceChart();

    redrawCharts = function(){
        d3Selection.selectAll('.donut-chart').remove();

        createDonutChart();
        createSmallDonutChart();
        createDonutWithHighlightSliceChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.donut-chart', createDonutChart);
}
