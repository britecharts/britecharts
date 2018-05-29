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
    let tooltip = miniTooltip().title('Temperature (C)');
    let scatterPlotContainer = d3Selection.select('.js-scatter-plot-chart-tooltip-container');
    let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
    let dataset, tooltipContainer;

    if (containerWidth) {
        // data represents Ice Cream Sales (y) vs Temperature (x)
        dataset = aTestDataSet().withOneSource().build();

        scatterChart
            .aspectRatio(0.7)
            .width(containerWidth)
            .circleOpacity(0.6)
            .hasTrendline(true)
            .grid('horizontal')
            .xAxisLabel('Temperature (C)')
            .margin({
                left: 60,
                bottom: 50
            })
            .yAxisLabel('Ice Cream Sales')
            .yAxisFormat('$')
            .xAxisFormat('.1f')
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        if (optionalColorSchema) {
            scatterChart.colorSchema(optionalColorSchema);
        }

        scatterPlotContainer.datum(dataset).call(scatterChart);

        // tooltip set up
        tooltip.valueLabel('y')
            .nameLabel('x')
            .numberFormat('$');

        tooltipContainer = d3Selection.select('.js-scatter-plot-chart-tooltip-container .scatter-plot .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createScatterPlotWithIncreasedAreaAndHollowCircles() {
    let scatterChart = scatterPlot();
    let tooltip = miniTooltip();
    let scatterPlotContainer = d3Selection.select('.js-scatter-plot-container-with-hollow-circles');
    let containerWidth = scatterPlotContainer.node() ? scatterPlotContainer.node().getBoundingClientRect().width : false;
    let dataset, tooltipContainer;

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
            .maxCircleArea(15)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', function (dataPoint, mousePos, chartSize) {
                tooltip.title(dataPoint.name);
                // passing an empty object to not have any data
                // in the tooltip - we want to only show the title
                tooltip.update({}, mousePos, chartSize);
            })
            .on('customMouseOut', tooltip.hide);

        scatterPlotContainer.datum(dataset).call(scatterChart);

        tooltipContainer = d3Selection.select('.js-scatter-plot-container-with-hollow-circles .scatter-plot .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

// Show charts if container available
if (d3Selection.select('.js-scatter-plot-chart-tooltip-container').node()) {
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
