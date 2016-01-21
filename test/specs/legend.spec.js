define(['jquery', 'd3', 'src/charts/legend'], function($, d3, legend) {
    'use strict';

    describe('Reusable Legend Component', function(){
        var legendChart, dataset, containerFixture, f;

        beforeEach(function(){
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
                    'name': 'Other',
                    'id': 0,
                    'quantity': 5814,
                    'percentage': 65
                }
            ];
            legendChart = legend();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(legendChart);
        });

        afterEach(function(){
            debugger
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a legend with minimal requirements', function() {
            expect(containerFixture.select('svg.britechart-legend').empty()).toBeFalsy();
        });

        it('should render container, chart and legend groups', function() {
            expect(containerFixture.select('g.legend-container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
        });

        it('should add a line group for each entry', function() {
            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-line')
                    .size()
            ).toEqual(5);
        });

        it('should add the proper data identifier to each entry', function() {
            var lines = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-line'),
                elements = lines[0];

            lines.each(function(d, index) {
                expect(
                    parseInt(d3.select(elements[index]).attr('data-item'), 10)
                ).toEqual(dataset[index].id);
            });
        });

        it('should add a circle for each entry', function() {
            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-circle')
                    .size()
            ).toEqual(5);
        });

        it('should add a text element for each entry', function() {
            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-entry-name')
                    .size()
            ).toEqual(5);
        });

        it('should add the proper text to each text element', function() {
            var texts = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry-name text'),
                elements = texts[0];

            texts.each(function(d, index) {
                expect(elements[index]).toEqual(dataset[index].name);
            });
        });

        it('should add a value element for each entry', function() {
            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-entry-value')
                    .size()
            ).toEqual(5);
        });

        it('should add the proper value to each value element', function() {
            var texts = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry-value text'),
                elements = texts[0];

            texts.each(function(d, index) {
                expect(elements[index]).toEqual(dataset[index]['quantity']);
            });
        });



        // API
        it('should provide margin getter and setter', function(){
            var defaultMargin = legendChart.margin(),
                testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                newMargin;

            legendChart.margin(testMargin);
            newMargin = legendChart.margin();

            expect(defaultMargin).not.toBe(testMargin);
            expect(newMargin).toBe(testMargin);
        });

        it('should provide width getter and setter', function(){
            var defaultWidth = legendChart.width(),
                testWidth = 200,
                newWidth;

            legendChart.width(testWidth);
            newWidth = legendChart.width();

            expect(defaultWidth).not.toBe(testWidth);
            expect(newWidth).toBe(testWidth);
        });

        it('should provide height getter and setter', function(){
            var defaultHeight = legendChart.height(),
                testHeight = 200,
                newHeight;

            legendChart.height(testHeight);
            newHeight = legendChart.height();

            expect(defaultHeight).not.toBe(testHeight);
            expect(newHeight).toBe(testHeight);
        });
    });
});
