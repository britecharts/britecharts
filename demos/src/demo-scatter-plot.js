'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const scatterPlot = require('./../../src/charts/scatter-plot');
const colors = require('./../../src/charts/helpers/color');
const dataBuilder = require('./../../test/fixtures/scatterPlotDataBuilder');
const colorSelectorHelper = require('./helpers/colorSelector');

const miniTooltip = require('./../../src/charts/mini-tooltip');

const aTestDataSet = () => new dataBuilder.ScatterPlotDataBuilder();

require('./helpers/resizeHelper');

let redrawCharts;

function createScatterPlotWithSingleSource(optionalColorSchema) {
    let scatterChart = scatterPlot();
    let tooltip = miniTooltip();
    let scatterPlotContainer = d3Selection.select('.js-scatter-plot-with-single-source');
    let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
    let dataset, tooltipContainer;

    if (containerWidth) {
        // data represents Ice Cream Sales (y) vs Temperature (x)
        dataset = aTestDataSet().withOneSource().build();

        scatterChart
            .aspectRatio(0.7)
            .width(containerWidth)
            .circleOpacity(0.6)
            .grid('horizontal')
            .xAxisLabel('Temperature (C)')
            .margin({
                left: 60,
                bottom: 50
            })
            .yAxisLabel('Ice Cream Sales')
            .yAxisFormat('$')
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        if (optionalColorSchema) {
            scatterChart.colorSchema(optionalColorSchema);
        }

        scatterPlotContainer.datum(dataset).call(scatterChart);

        // tooltip set up
        tooltip.valueLabel('y');

        tooltipContainer = d3Selection.select('.js-scatter-plot-with-single-source .scatter-plot .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createScatterPlotWithIncreasedAreaAndHollowCircles() {
    let scatterChart = scatterPlot();
    let scatterPlotContainer = d3Selection.select('.js-scatter-plot-container-with-hollow-circles');
    let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
    let dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withFourNames().build();

        scatterChart
            .width(containerWidth)
            .hasCrossHairs(true)
            .hasHollowCircles(true)
            .margin({
                left: 60,
                bottom: 45
            })
            .maxCircleArea(15);

        scatterPlotContainer.datum(dataset).call(scatterChart);
    }
}

// Show charts if container available
if (d3Selection.select('.js-scatter-plot-with-single-source').node()) {
    createScatterPlotWithSingleSource()
    createScatterPlotWithIncreasedAreaAndHollowCircles();

    redrawCharts = function() {
        d3Selection.selectAll('.scatter-plot').remove();
        createScatterPlotWithSingleSource();
        createScatterPlotWithIncreasedAreaAndHollowCircles();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.scatter-plot', function (newSchema) {
        createScatterPlotWithSingleSource(newSchema);
    });
}
