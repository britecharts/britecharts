require(['d3', 'line', 'donut', 'dataBuilder'],
function(
    d3, line, donut, dataBuilder
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


    var donutChart = donut(),
        dataset = [
              {
                'name': 'VALENTINES VIP SPECIAL',
                'id': 33571136,
                'quantity': 86,
                'quantity_human': '86'
              },
              {
                'name': 'Groupon 4 - Pack',
                'id': 32913851,
                'quantity': 300,
                'quantity_human': '300'
              },
              {
                'name': 'Groupon 2 - Pack',
                'id': 32913850,
                'quantity': 276,
                'quantity_human': '276'
              },
              {
                'name': 'Groupon Individual Runner',
                'id': 32913849,
                'quantity': 195,
                'quantity_human': '195'
              },
              {
                'name': 'LivingSocial Individual Runner',
                'id': 32780575,
                'quantity': 36,
                'quantity_human': '36'
              },
              {
                'name': 'Other',
                'id': 0,
                'quantity': 5814
              }
        ],
        donutContainer = d3.select('.js-donut-chart-container');

    donutChart
        .width(600).height(600)
        .externalRadius(250).internalRadius(50);
    donutContainer.datum(dataset).call(donutChart);

});
