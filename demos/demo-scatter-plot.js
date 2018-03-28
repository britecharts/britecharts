'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const scatterPlot = require('./../src/charts/scatter-plot');
const colors = require('./../src/charts/helpers/color');
const dataBuilder = require('./../test/fixtures/scatterPlotDataBuilder');

const aTestDataSet = () => new dataBuilder.ScatterPlotDataBuilder();

require('./helpers/resizeHelper');

function createScatterPlotWithSingleSource() {
    let scatter = scatterPlot();
    let scatterPlotContainer = d3Selection.select('.js-scatter-plot-with-single-source');
    let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
    let dataset;

    if (containerWidth) {
        // data represents Ice Cream Sales (y) vs Temperature (x)
        dataset = aTestDataSet().withOneSource().build();

        scatter
            .width(containerWidth)
            .circleOpacity(0.6)
            .grid('horizontal')
            .margin({
                left: 60
            })
            .aspectRatio(0.1)
            .yAxisLabel('Ice Cream Sales');

        scatterPlotContainer.datum(dataset).call(scatter);
    }
}

function createScatterPlotWithIncreasedAreaAndHollowCircles() {
    let scatter = scatterPlot();
    let scatterPlotContainer = d3Selection.select('.js-scatter-plot-container-with-hollow-circles');
    let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
    let dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withFourNames().build();

        scatter
            .width(containerWidth)
            .hasHollowCircles(true)
            .maxCircleArea(15);

        scatterPlotContainer.datum(dataset).call(scatter);
    }
}

// Show charts if container available
if (d3Selection.select('.js-scatter-plot-with-single-source').node()) {
    createScatterPlotWithSingleSource()
    createScatterPlotWithIncreasedAreaAndHollowCircles();

    let redrawCharts = function(){
        d3Selection.selectAll('.scatter-plot').remove();
        createScatterPlotWithSingleSource();
        createScatterPlotWithIncreasedAreaAndHollowCircles();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}