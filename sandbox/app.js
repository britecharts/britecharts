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
            lineChart
                .aspectRatio(0.42)
                .tooltipThreshold(400)
                .width(780);
            container.datum(dataset).call(lineChart);

            d3.select(window).on('resize', function(){
                var newWidth = d3.select('body').node().getBoundingClientRect().width;

                d3.select('.line-chart').remove();

                lineChart
                    .aspectRatio(0.42)
                    .tooltipThreshold(400)
                    .width(newWidth);
                container.datum(dataset).call(lineChart);
            });
        });

});
