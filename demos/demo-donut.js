'use strict';

var d3 = require('d3'),
    donut = require('./../dist/charts/donut'),
    legend = require('./../dist/charts/legend');

function createDonutChart() {
    var donutChart = donut(),
        legendChart = legend(),
        dataset = [
              {
                'name': 'Valentines VIP special',
                'id': 33571136,
                'quantity': 4000,
                'quantity_human': '4000',
                'percentage': 4
              },
              {
                'name': 'Groupon 2 - Pack',
                'id': 32913850,
                'quantity': 15000,
                'quantity_human': '15000',
                'percentage': 15
              },
              {
                'name': 'Groupon Individual Runner',
                'id': 32913849,
                'quantity': 10000,
                'quantity_human': '10000',
                'percentage': 10
              },
              {
                'name': 'LivingSocial Individual Runner',
                'id': 32780575,
                'quantity': 6000,
                'quantity_human': '6000',
                'percentage': 6
              },
              {
                'name': 'Other',
                'id': 0,
                'quantity': 65000,
                'percentage': 65
              }
        ],
        donutContainer = d3.select('.js-donut-chart-container'),
        legendContainer = d3.select('.js-legend-chart-container'),
        containerWidth = donutContainer.node().getBoundingClientRect().width;

    d3.select('#button').on('click', function() {
        donutChart.exportChart();
    });

    donutChart
        .width(containerWidth)
        .height(containerWidth)
        .externalRadius(containerWidth/2.5)
        .internalRadius(containerWidth/5)
        .on('customMouseOver', function(data) {
            legendChart.highlight(data.data.id);
        })
        .on('customMouseOut', function() {
            legendChart.clearHighlight();
        });

    donutContainer.datum(dataset).call(donutChart);

    legendContainer.datum(dataset).call(legendChart);
}

function createSmallDonutChart() {
    var donutChart = donut(),
        dataset = [
              {
                'name': 'VALENTINES VIP SPECIAL',
                'id': 33571136,
                'quantity': 86,
                'quantity_human': '86',
                'percentage': 3
              },
              {
                'name': 'Groupon 4 - Pack',
                'id': 32913851,
                'quantity': 300,
                'quantity_human': '300',
                'percentage': 10
              },
              {
                'name': 'Groupon 2 - Pack',
                'id': 32913850,
                'quantity': 276,
                'quantity_human': '276',
                'percentage': 10
              },
              {
                'name': 'Groupon Individual Runner',
                'id': 32913849,
                'quantity': 195,
                'quantity_human': '195',
                'percentage': 10
              },
              {
                'name': 'LivingSocial Individual Runner',
                'id': 32780575,
                'quantity': 36,
                'quantity_human': '36',
                'percentage': 1
              },
              {
                'name': 'Other',
                'id': 0,
                'quantity': 5814,
                'percentage': 65
              }
        ],
        donutContainer = d3.select('.js-small-donut-chart-container'),
        containerWidth = donutContainer.node().getBoundingClientRect().width;

    donutChart
        .width(containerWidth)
        .height(containerWidth)
        .externalRadius(containerWidth/5)
        .internalRadius(containerWidth/10);
    donutContainer.datum(dataset).call(donutChart);
}

// Show charts if container available
if(d3.select('.js-donut-chart-container').node()) {

    createDonutChart();
    createSmallDonutChart();

    d3.select(window).on('resize', function(){
        d3.selectAll('.donut-chart').remove();
        createDonutChart();
        createSmallDonutChart();
    });
}
