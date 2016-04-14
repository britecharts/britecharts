    'use strict';

    var d3 = require('d3'),
        $ = require('jquery'),
        line = require('./../dist/charts/line'),
        tooltip = require('./../dist/charts/tooltip'),
        dataBuilder = require('./../test/fixtures/lineChartDataBuilder');



    function createLineChart() {
        var lineChart = line(),
            chartTooltip = tooltip(),
            testDataSet = new dataBuilder.SalesDataBuilder(),
            containerWidth = d3.select('.js-line-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-line-chart-container'),
            tooltipContainer,
            dataset;


        d3.select("#button").on('click', function() {
            lineChart.exportChart();
        });

        dataset = testDataSet.with5Topics().build();

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
    }

    function createLineChartWithFixedHeight() {
        var lineChart = line(),
            testDataSet = new dataBuilder.SalesDataBuilder(),
            containerWidth = d3.select('.js-fixed-line-chart-container').node().getBoundingClientRect().width,
            container = d3.select('.js-fixed-line-chart-container'),
            dataset;

        dataset = testDataSet.with5Topics().build();

        lineChart
            .tooltipThreshold(2400)
            .height(300)
            .width(containerWidth);

        container.datum(dataset).call(lineChart);
    }

    // Show charts if container available
    if(d3.select('.js-line-chart-container').node()) {
        createLineChart();
        // createLineChartWithFixedHeight();


        d3.select(window).on('resize', function(){
            d3.selectAll('.line-chart').remove();
            createLineChart();
            // createLineChartWithFixedHeight();
        });
    }

