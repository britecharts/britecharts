define([
    'jquery',
    'd3',
    'stacked-area',
    'stackedAreaDataBuilder'
    ], function(
        $,
        d3,
        stackedArea,
        dataBuilder
    ) {
    'use strict';

    describe('Reusable Stacked Area Chart', () => {
        let dataset, stackedAreaChart, containerFixture, f;

        function aTestDataSet() {
            return new dataBuilder.StackedAreaDataBuilder();
        }

        beforeEach(() => {
            dataset = aTestDataSet().with3Sources().build();
            stackedAreaChart = stackedArea();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container').append('svg');
            containerFixture.datum(dataset.data).call(stackedAreaChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a stacked area chart with minimal requirements', () =>  {
            expect(containerFixture.select('.stacked-area').empty()).toBeFalsy();
        });

        it('should render container, axis and chart groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.x-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.grid-lines-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
        });

        // it('should render grid lines', () => {
        //     expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
        // });

        it('should render an X and Y axis', () => {
            expect(containerFixture.select('.x-axis-group.axis').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

    });
});
