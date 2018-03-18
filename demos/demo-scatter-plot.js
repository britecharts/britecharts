'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const scatterPlot = require('./../src/charts/scatter-plot');
const colors = require('./../src/charts/helpers/color');
const dataBuilder = require('./../test/fixtures/scatterPlotDataBuilder');

require('./helpers/resizeHelper');

function createSimpleScatterPlot() {
        let simpleScatter = scatterPlot();
        let scatterPlotContainer = d3Selection.select('.js-simple-scatter-plot-container');
        let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
        let dataset;

        if (containerWidth) {
            console.log('hello');
            simpleScatter
                .width(500);

            console.log('simpleScatter', simpleScatter);
        }
}

// Show charts if container available
if (d3Selection.select('.js-simple-scatter-plot-container').node()) {
    createSimpleScatterPlot();

    let redrawCharts = function(){
        d3Selection.selectAll('.scatter-plot').remove();
        createSimpleScatterPlot();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}