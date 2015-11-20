require(['d3', 'bar'],
function(d3, bar){
    'use strict';

    function createBarChart() {
        var barChart = bar(),
            dataset = [],
            barContainer = d3.select('.js-bar-chart-container');

        barChart
            .width(500).height(300);
        barContainer.datum(dataset).call(barChart);
    }

    // Show proper charts
    createBarChart();
});
