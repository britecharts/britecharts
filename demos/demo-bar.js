'use strict';

var _ = require('underscore'),
    d3 = require('d3'),

    bar = require('./../src/charts/bar'),
    dataBuilder = require('./../test/fixtures/barChartDataBuilder');


function createBarChart() {
    var barChart = bar(),
        testDataSet = new dataBuilder.BarDataBuilder(),
        containerWidth = d3.select('.js-bar-chart-container').node().getBoundingClientRect().width,
        barContainer = d3.select('.js-bar-chart-container'),
        dataset;

    d3.select('#button').on('click', function() {
        barChart.exportChart();
    });

    dataset = testDataSet.withLettersFrequency().build();

    barChart
        .width(containerWidth)
        .height(300)
        .on('customHover', function(d, i){
            console.log('Bar data is ', d);
            console.log('Bar index is ', i);
        });

    barContainer.datum(dataset).call(barChart);
}

// Show charts if container available
if (d3.select('.js-bar-chart-container').node()){
    createBarChart();

    d3.select(window).on('resize', _.debounce(function(){
        d3.select('.bar-chart').remove();
        createBarChart();
    }, 200));
}
