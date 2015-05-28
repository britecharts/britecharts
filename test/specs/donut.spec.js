define(['jquery', 'd3', 'src/charts/donut'], function($, d3, chart) {
    'use strict';

    describe('Reusable donutChart Test Suite', function(){
        var donutChart, dataset, containerFixture, f;

        beforeEach(function(){
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
            ];

            donutChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');

            donutChart
                .width(600).height(600)
                .externalRadius(250).internalRadius(50);
            containerFixture.datum(dataset).call(donutChart);

        });

        afterEach(function(){
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', function() {
            expect(containerFixture.select('.donut-chart')).toBeDefined(1);
        });

        it('should render container, chart and tooltip groups', function() {
            expect(containerFixture.select('g.container-group')[0][0]).not.toBeNull();
            expect(containerFixture.select('g.chart-group')[0][0]).not.toBeNull();
            expect(containerFixture.select('g.tooltip-group')[0][0]).not.toBeNull();
        });

        it('should create a layout', function() {
            expect(donutChart.layout()).toBeDefined();
            expect(typeof donutChart.layout).toBe('function');
        });

        it('should build the shape for the donut', function() {
            expect(donutChart.shape()).toBeDefined();
            expect(typeof donutChart.shape).toBe('function');
        });

        it('should render a slice for each data entry', function(){
            var numSlices = dataset.length;

            expect(containerFixture.selectAll('.slice')[0].length).toEqual(numSlices);
        });

        // test color scheme later
    });

});
