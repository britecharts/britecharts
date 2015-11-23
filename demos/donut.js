require(['d3', 'donut'],
function(d3, donut){
    'use strict';

    function createDonutChart() {
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
    }

    function createSmallDonutChart() {
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
            donutContainer = d3.select('.js-small-donut-chart-container');

        donutChart
            .width(300).height(300)
            .externalRadius(100).internalRadius(40);
        donutContainer.datum(dataset).call(donutChart);
    }

    // Show proper charts
    createDonutChart();
    createSmallDonutChart();

});
