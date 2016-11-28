define(['jquery', 'd3', 'brush', 'brushChartDataBuilder'], function($, d3, chart, dataBuilder) {
    'use strict';

    describe('Brush Chart', () => {
        let brushChart, dataset, containerFixture, f;

        function aTestDataSet() {
            return new dataBuilder.BrushDataBuilder();
        }

        beforeEach(() => {
            dataset = aTestDataSet()
                .withSimpleData()
                .build();
            brushChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(brushChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', function() {
            expect(containerFixture.select('.brush-chart').empty()).toEqual(false);
        });

        it('should render container, axis and chart groups', function() {
            expect(containerFixture.select('g.container-group').empty()).toEqual(false);
            expect(containerFixture.select('g.chart-group').empty()).toEqual(false);
            expect(containerFixture.select('g.metadata-group').empty()).toEqual(false);
            expect(containerFixture.select('g.x-axis-group').empty()).toEqual(false);
            expect(containerFixture.select('g.brush-group').empty()).toEqual(false);
        });

        it('should render an X axis', function() {
            expect(containerFixture.select('.x.axis').empty()).toEqual(false);
        });

        it('should render an area', function() {
            expect(containerFixture.selectAll('.brush-area').empty()).toEqual(false);
        });

        it('should render the brush elements', function() {
            expect(containerFixture.selectAll('.overlay.brush-rect').empty()).toEqual(false);
            expect(containerFixture.selectAll('.selection.brush-rect').empty()).toEqual(false);
            expect(containerFixture.selectAll('.handle.handle--e.brush-rect').empty()).toEqual(false);
            expect(containerFixture.selectAll('.handle.handle--w.brush-rect').empty()).toEqual(false);
        });

        describe('the API', function() {

            it('should provide margin getter and setter', function() {
                var defaultMargin = brushChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                brushChart.margin(testMargin);
                newMargin = brushChart.margin();

                expect(defaultMargin).not.toBe(testMargin);
                expect(newMargin).toBe(testMargin);
            });

            it('should provide width getter and setter', function() {
                var defaultWidth = brushChart.width(),
                    testWidth = 200,
                    newWidth;

                brushChart.width(testWidth);
                newWidth = brushChart.width();

                expect(defaultWidth).not.toBe(testWidth);
                expect(newWidth).toBe(testWidth);
            });

            it('should provide height getter and setter', function() {
                var defaultHeight = brushChart.height(),
                    testHeight = 200,
                    newHeight;

                brushChart.height(testHeight);
                newHeight = brushChart.height();

                expect(defaultHeight).not.toBe(testHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide a gradient getter and setter', () => {
                let defaultGradient = brushChart.gradient(),
                    testGradient = ['#ffffff', '#fafefc'],
                    newGradient;

                brushChart.gradient(testGradient);
                newGradient = brushChart.gradient();

                expect(defaultGradient).not.toBe(testGradient);
                expect(newGradient).toBe(testGradient);
            });

            it('should provide onBrush getter and setter', function() {
                var defaultCallback = brushChart.onBrush(),
                    testCallback = function() {},
                    newCallback;

                brushChart.onBrush(testCallback);
                newCallback = brushChart.onBrush();

                expect(defaultCallback).not.toBe(testCallback);
                expect(newCallback).toBe(testCallback);
            });
        });
    });
});
