require(['d3', 'line', 'dataBuilder'],
function(d3, line, dataBuilder){
    'use strict';

    function createLineChart() {
        var lineChart = line(),
            testDataSet = new dataBuilder.SalesDataBuilder(),
            containerWidth = d3.select('.js-line-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-line-chart-container');

        testDataSet
            .with5Topics()
            .withPath('../test/fixtures/lineDataFiveTopicsBis.json')
            .build()
            .done(function(dataset){
                lineChart
                    .aspectRatio(0.42)
                    .tooltipThreshold(400)
                    .width(containerWidth);

                container.datum(dataset).call(lineChart);
            });
    }

    function createLineChartWithFixedHeight() {
        var lineChart = line(),
            testDataSet = new dataBuilder.SalesDataBuilder(),
            containerWidth = d3.select('.js-fixed-line-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-fixed-line-chart-container');

        testDataSet
            .with5Topics()
            .withPath('../test/fixtures/lineDataFiveTopicsBis.json')
            .build()
            .done(function(dataset){
                lineChart
                    .tooltipThreshold(400)
                    .height(300)
                    .width(containerWidth);

                container.datum(dataset).call(lineChart);
            });
    }

    // Show proper charts
    createLineChart();
    createLineChartWithFixedHeight();


    d3.select(window).on('resize', function(){
        d3.selectAll('.line-chart').remove();
        createLineChart();
        createLineChartWithFixedHeight();
    });
});
