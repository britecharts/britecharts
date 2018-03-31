'use strict';

const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');

const step = require('./../../src/charts/step');
const miniTooltip = require('./../../src/charts/mini-tooltip');

const dataBuilder = require('./../../test/fixtures/stepChartDataBuilder');
let redrawCharts;

const aTestDataSet = () => new dataBuilder.StepDataBuilder();

require('./helpers/resizeHelper');

function createStepChart() {
    let stepChart = step(),
        tooltip = miniTooltip(),
        stepContainer = d3Selection.select('.js-step-chart-container'),
        containerWidth = stepContainer.node() ? stepContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        d3Selection.select('#button').on('click', function() {
            stepChart.exportChart('stepchart.png', 'Britecharts Step Chart');
        });

        dataset = aTestDataSet().withSmallData().build();

        stepChart
            .width(containerWidth)
            .height(300)
            .xAxisLabel('Meal Type')
            .xAxisLabelOffset(45)
            .yAxisLabel('Quantity')
            .yAxisLabelOffset(-50)
            .margin({
                top: 40,
                right: 40,
                bottom: 50,
                left: 80
            })
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);


        stepContainer.datum(dataset.data).call(stepChart);

        tooltip.nameLabel('key');

        tooltipContainer = d3Selection.select('.js-step-chart-container .step-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

// Show charts if container available
if (d3Selection.select('.js-step-chart-container').node()){
    createStepChart();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = function(){
        d3Selection.select('.step-chart').remove();

        createStepChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
