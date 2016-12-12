'use strict';

var d3 = require('d3'),

    PubSub = require('pubsub-js'),

    step = require('./../src/charts/step'),
    miniTooltip = require('./../src/charts/mini-tooltip'),

    dataBuilder = require('./../test/fixtures/stepChartDataBuilder');


function createStepChart() {
    var stepChart = step(),
        tooltip = miniTooltip(),
        testDataSet = new dataBuilder.StepDataBuilder(),
        stepContainer = d3.select('.js-step-chart-container'),
        containerWidth = stepContainer.node() ? stepContainer.node().getBoundingClientRect().width : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        d3.select('#button').on('click', function() {
            stepChart.exportChart('stepchart.png', 'Britecharts Step Chart');
        });

        dataset = testDataSet.withSmallData().build();

        stepChart
            .width(containerWidth)
            .height(300)
            .xAxisLabel('Fruit Type')
            .xAxisLabelOffset(45)
            .yAxisLabel('Quantity')
            .yAxisLabelOffset(-50)
            .margin({
                top: 40,
                right: 40,
                bottom: 10,
                left: 80
            })
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);


        stepContainer.datum(dataset.data).call(stepChart);

        tooltip.nameLabel('key');

        tooltipContainer = d3.select('.js-step-chart-container .step-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }
}

// Show charts if container available
if (d3.select('.js-step-chart-container').node()){
    createStepChart();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    var redrawCharts = function(){
        d3.select('.step-chart').remove();

        createStepChart();
    };

    // Redraw charts on window resize
    PubSub.subscribe('resize', redrawCharts);
}
