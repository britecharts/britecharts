require([
    'd3',
    'sparkline',
    'sparklineDataBuilder'
    ],
    function(
        d3,
        sparklineChart,
        sparklineDataBuilder
    ){
    'use strict';

    function createSparklineChart() {
        var sparkline = sparklineChart(),
            testDataSet = new sparklineDataBuilder.SparklineDataBuilder(),
            containerWidth = d3.select('.js-sparkline-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-sparkline-chart-container'),
            dataset;

        dataset = testDataSet.with1Source().build();

        // Sparkline Chart Setup and start
        sparkline
            .width(containerWidth / 2);

        container.datum(dataset.data).call(sparkline);
    }

    // Show charts
    createSparklineChart();

    d3.select(window).on('resize', function(){
        d3.selectAll('.sparkline').remove();
        createSparklineChart();
    });
});
