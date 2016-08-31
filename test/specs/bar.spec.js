define(['jquery', 'd3', 'bar', 'barChartDataBuilder'], function($, d3, chart, dataBuilder) {
    'use strict';

    describe('Reusable Bar Chart Test Suite', () => {
        let barChart, dataset, containerFixture, f;

        function aTestDataSet() {
            return new dataBuilder.BarDataBuilder();
        }

        beforeEach(() => {
            dataset = aTestDataSet()
                .withLettersFrequency()
                .build();
            barChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(barChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', () => {
            expect(containerFixture.select('.bar-chart').empty()).toBeFalsy();
        });

        it('should render container, axis and chart groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.x-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.grid-lines-group').empty()).toBeFalsy();
        });

        it('should render grid lines', () => {
            expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
        });

        it('should render an X and Y axis', () => {
            expect(containerFixture.select('.x-axis-group.axis').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render a bar for each data entry', () => {
            let numBars = dataset.length;

            expect(containerFixture.selectAll('.bar').size()).toEqual(numBars);
        });

        describe('setters and getters', function() {
            it('should provide margin getter and setter', () => {
                let defaultMargin = barChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                barChart.margin(testMargin);
                newMargin = barChart.margin();

                expect(defaultMargin).not.toBe(newMargin);
                expect(newMargin).toBe(testMargin);
            });

            it('should provide height getter and setter', () => {
                let defaultHeight = barChart.height(),
                    testHeight = {top: 4, right: 4, bottom: 4, left: 4},
                    newHeight;

                barChart.height(testHeight);
                newHeight = barChart.height();

                expect(defaultHeight).not.toBe(newHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide width getter and setter', () => {
                let defaultWidth = barChart.width(),
                    testWidth = {top: 4, right: 4, bottom: 4, left: 4},
                    newWidth;

                barChart.width(testWidth);
                newWidth = barChart.width();

                expect(defaultWidth).not.toBe(newWidth);
                expect(newWidth).toBe(testWidth);
            });
        });

        describe('on hovering a bar', function() {

            beforeEach(() => {
                this.callbackSpy = jasmine.createSpy('callback');

                barChart.on('customHover', this.callbackSpy);
            });

            it('should trigger a callback', () => {
                let bars = containerFixture.selectAll('.bar');

                bars[0][0].__onmouseover();

                expect(this.callbackSpy).toHaveBeenCalled();
                // TODO: Figure out why the callback has this shape
                // arguments: data, index, ?
                expect(this.callbackSpy).toHaveBeenCalledWith(dataset[0], 0, 0);
            });
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(barChart.exportChart).toBeDefined();
            });
        });
    });
});
