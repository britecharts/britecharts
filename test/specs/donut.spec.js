define(['jquery', 'd3', 'donut'], function($, d3, chart) {
    'use strict';

    describe('Reusable Donut Chart', () => {
        let donutChart, dataset, containerFixture, f;

        beforeEach(() => {
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

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', () => {
            expect(containerFixture.select('.donut-chart').empty()).toBeFalsy();
        });

        it('should render container, chart and legend groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
        });

        it('should render a slice for each data entry', () =>{
            let numSlices = dataset.length;

            expect(containerFixture.selectAll('.arc').size()).toEqual(numSlices);
        });

        it('should append text to the legend container', () => {
            expect(containerFixture.select('text.donut-text').empty()).toBeFalsy();
        });

        it('should provide margin getter and setter', () =>{
            let defaultMargin = donutChart.margin(),
                testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                newMargin;

            donutChart.margin(testMargin);
            newMargin = donutChart.margin();

            expect(defaultMargin).not.toBe(testMargin);
            expect(newMargin).toBe(testMargin);
        });

        describe('when mouse events are triggered', () => {

            it('should trigger an event on hover', () =>{
                let callback = jasmine.createSpy('hoverCallback'),
                    firstSlice = containerFixture.select('.chart-group .arc');

                donutChart.on('customMouseOver', callback);
                firstSlice[0][0].__onmouseover();
                expect(callback.calls.count()).toBe(1);
            });

            it('should trigger an event on mouse out', () =>{
                let callback = jasmine.createSpy('mouseOutCallback'),
                    firstSlice = containerFixture.select('.chart-group .arc');

                donutChart.on('customMouseOut', callback);
                firstSlice[0][0].__onmouseout();
                expect(callback.calls.count()).toBe(1);
            });
        });

        describe('Export chart functionality', () => {
            it('should have exportChart defined', () => {
                expect(donutChart.exportChart).toBeDefined();
            });
        });

    });

});
