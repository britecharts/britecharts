'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    step = require('./../src/charts/step'),
    dataBuilder = require('./../test/fixtures/stepChartDataBuilder');


function createStepChart() {
    var stepChart = step(),
        testDataSet = new dataBuilder.StepDataBuilder(),
        stepContainer = d3.select('.js-step-chart-container'),
        containerWidth = stepContainer.node() ? stepContainer.node().getBoundingClientRect().width : false,
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
                top: 20,
                right: 20,
                bottom: 20,
                left: 80
            })
            .on('customHover', function(d, i){
                console.log('Step key is ', d.key);
                console.log('Step value is ', d.value);
                console.log('Step index is ', i);
            });

        stepContainer.datum(dataset.data).call(stepChart);
    }
}

// Show charts if container available
if (d3.select('.js-step-chart-container').node()){
    createStepChart();

    d3.select(window).on('resize', _.debounce(function(){
        d3.select('.step-chart').remove();
        createStepChart();
    }, 200));
}
