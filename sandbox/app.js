require(['d3', 'line', 'dataBuilder'],
function(
    d3, line, dataBuilder
){
    'use strict';

    var lineChart = line(),
        testDataSet = new dataBuilder.SalesDataBuilder(),
        container = d3.select('.js-line-chart-container');

    testDataSet
        .with5Topics()
        .withPath('../test/fixtures/lineDataFiveTopics.json')
        .build()
        .done(function(dataset){
            lineChart.width(600).height(400);
            container.datum(dataset).call(lineChart);
        });
});
