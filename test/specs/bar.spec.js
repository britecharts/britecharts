define(['jquery', 'd3', 'src/charts/bar'], function($, d3, chart) {
    'use strict';

    describe('Reusable barChart Test Suite', function(){
        var barChart, dataset, containerFixture, f;

        beforeEach(function(){
            dataset = [
                {
                    letter: 'A',
                    frequency: .08167
                },
                {
                    letter: 'B',
                    frequency: .01492
                },
                {
                    letter: 'C',
                    frequency: .02782
                },
                {
                    letter: 'D',
                    frequency: .04253
                },
                {
                    letter: 'E',
                    frequency: .12702
                },
                {
                    letter: 'F',
                    frequency: .02288
                },
                {
                    letter: 'G',
                    frequency: .02015
                },
                {
                    letter: 'H',
                    frequency: .06094
                },
                {
                    letter: 'I',
                    frequency: .06966
                },
                {
                    letter: 'J',
                    frequency: .00153
                },
                {
                    letter: 'K',
                    frequency: .00772
                },
                {
                    letter: 'L',
                    frequency: .04025
                },
                {
                    letter: 'M',
                    frequency: .02406
                },
                {
                    letter: 'N',
                    frequency: .06749
                },
                {
                    letter: 'O',
                    frequency: .07507
                },
                {
                    letter: 'P',
                    frequency: .01929
                },
                {
                    letter: 'Q',
                    frequency: .00095
                },
                {
                    letter: 'R',
                    frequency: .05987
                },
                {
                    letter: 'S',
                    frequency: .06327
                },
                {
                    letter: 'T',
                    frequency: .09056
                },
                {
                    letter: 'U',
                    frequency: .02758
                },
                {
                    letter: 'V',
                    frequency: .00978
                },
                {
                    letter: 'W',
                    frequency: .02360
                },
                {
                    letter: 'X',
                    frequency: .00150
                },
                {
                    letter: 'Y',
                    frequency: .01974
                },
                {
                    letter: 'Z',
                    frequency: .00074
                }
            ];
            barChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(barChart);
        });

        afterEach(function(){
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', function(){
            expect(containerFixture.select('.bar-chart')).toBeDefined(1);
        });

        it('should render container, axis and chart groups', function(){
            expect(containerFixture.select('g.container-group')[0][0]).not.toBeNull();
            expect(containerFixture.select('g.chart-group')[0][0]).not.toBeNull();
            expect(containerFixture.select('g.x-axis-group')[0][0]).not.toBeNull();
            expect(containerFixture.select('g.y-axis-group')[0][0]).not.toBeNull();
        });

        it('should render an X and Y axis', function(){
            expect(containerFixture.select('.x.axis')[0][0]).not.toBeNull();
            expect(containerFixture.select('.y.axis')[0][0]).not.toBeNull();
        });

        it('should render a bar for each data entry', function(){
            var numBars = dataset.length;

            expect(containerFixture.selectAll('.bar')[0].length).toEqual(numBars);
        });

        it('should provide margin getter and setter', function(){
            var defaultMargin = barChart.margin(),
                testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                newMargin;

            barChart.margin(testMargin);
            newMargin = barChart.margin();

            expect(defaultMargin).not.toBe(testMargin);
            expect(newMargin).toBe(testMargin);
        });

    });

});
