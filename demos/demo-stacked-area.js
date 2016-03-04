require([
    'd3',
    'stacked-area',
    'stackedDataBuilder'
    ],
    function(
        d3,
        stackedAreaChart,
        stackedDataBuilder
    ){
    'use strict';

    function createStackedAreaChart() {
        var stackedArea = stackedAreaChart(),
            testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
            containerWidth = d3.select('.js-stacked-area-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-stacked-area-chart-container'),
            dataset;

        dataset = testDataSet.with3Sources().build();

        // StackedAreChart Setup and start
        stackedArea
            .tooltipThreshold(400)
            .width(containerWidth);

        container.datum(dataset.data).call(stackedArea);
    }

    // Show charts
    createStackedAreaChart();

    d3.select(window).on('resize', function(){
        d3.selectAll('.stacked-area').remove();
        createStackedAreaChart();
    });
});
