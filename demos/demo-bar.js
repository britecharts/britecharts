'use strict';

var d3 = require('d3'),
    bar = require('./../src/charts/bar'),
    dataBuilder = require('./../test/fixtures/barChartDataBuilder');


function createBarChart() {
    var barChart = bar(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        barContainer = d3.select('.js-bar-chart-container'),
        dataset;

    dataset = testDataSet.withLettersFrequency().build();

    barChart
        .width(500)
        .height(300)
        .on('customHover', function(d, i){
            console.log('Bar data is ', d);
            console.log('Bar index is ', i);
        });

    barContainer.datum(dataset).call(barChart);

    d3.select(window).on('resize', function(){
        var newWidth = d3.select('.js-bar-chart-container').node().getBoundingClientRect().width;

        d3.select('.line-chart').remove();

        barChart
            .width(newWidth);
        barContainer.call(barChart);
    });
}

// Show charts if container available
if (d3.select('.js-bar-chart-container').node()){
    createBarChart();
}
