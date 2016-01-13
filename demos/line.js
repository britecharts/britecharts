require(['d3', 'line', 'tooltip', 'dataBuilder'],
function(d3, line, tooltip, dataBuilder){
    'use strict';

    function createLineChart() {
        var lineChart = line(),
            chartTooltip = tooltip(),
            testDataSet = new dataBuilder.SalesDataBuilder(),
            containerWidth = d3.select('.js-line-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-line-chart-container'),
            tooltipContainer;

        testDataSet
            .with5Topics()
            .withPath('../test/fixtures/lineDataFiveTopicsBis.json')
            .build()
            .done(function(dataset){
                // LineChart Setup and start
                lineChart
                    .aspectRatio(0.42)
                    .tooltipThreshold(400)
                    .width(containerWidth)
                    .on('customMouseOver', function() {
                        chartTooltip.show();
                    })
                    .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
                        chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
                    })
                    .on('customMouseOut', function() {
                        chartTooltip.hide();
                    });
                container.datum(dataset).call(lineChart);

                // Tooltip Setup and start
                chartTooltip
                    .title(dataset.readableDataType.name);

                // Note that if the viewport width is less than the tooltipThreshold value,
                // this container won't exist, and the tooltip won't show up
                tooltipContainer = d3.select('.metadata-group .hover-marker');
                tooltipContainer.datum([]).call(chartTooltip);
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
                    .tooltipThreshold(2400)
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
