define(['jquery', 'd3', 'step', 'stepChartDataBuilder'], function($, d3, chart, dataBuilder) {
    'use strict';

    describe('Reusable Step Chart Test Suite', () => {
        let stepChart, dataset, containerFixture, f;

        function aTestDataSet() {
            return new dataBuilder.StepDataBuilder();
        }

        beforeEach(() => {
            dataset = aTestDataSet()
                .withSmallData()
                .build();
            stepChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset.data).call(stepChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', () => {
            expect(containerFixture.select('.step-chart').empty()).toBeFalsy();
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

        it('should render a step for each data entry', () => {
            let numSteps = dataset.data.length;

            expect(containerFixture.selectAll('.step').size()).toEqual(numSteps);
        });

        describe('setters and getters', function() {
            it('should provide margin getter and setter', () => {
                let defaultMargin = stepChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                stepChart.margin(testMargin);
                newMargin = stepChart.margin();

                expect(defaultMargin).not.toBe(newMargin);
                expect(newMargin).toBe(testMargin);
            });

            it('should provide height getter and setter', () => {
                let defaultHeight = stepChart.height(),
                    testHeight = {top: 4, right: 4, bottom: 4, left: 4},
                    newHeight;

                stepChart.height(testHeight);
                newHeight = stepChart.height();

                expect(defaultHeight).not.toBe(newHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide numOfVerticalTicks getter and setter', () => {
                let defaultNumOfVerticalTicks = stepChart.numOfVerticalTicks(),
                    testNumOfVerticalTicks = {top: 4, right: 4, bottom: 4, left: 4},
                    newNumOfVerticalTicks;

                stepChart.numOfVerticalTicks(testNumOfVerticalTicks);
                newNumOfVerticalTicks = stepChart.numOfVerticalTicks();

                expect(defaultNumOfVerticalTicks).not.toBe(newNumOfVerticalTicks);
                expect(newNumOfVerticalTicks).toBe(testNumOfVerticalTicks);
            });

            it('should provide width getter and setter', () => {
                let defaultWidth = stepChart.width(),
                    testWidth = {top: 4, right: 4, bottom: 4, left: 4},
                    newWidth;

                stepChart.width(testWidth);
                newWidth = stepChart.width();

                expect(defaultWidth).not.toBe(newWidth);
                expect(newWidth).toBe(testWidth);
            });
        });

        describe('on hovering a step', function() {

            beforeEach(() => {
                this.callbackSpy = jasmine.createSpy('callback');

                stepChart.on('customHover', this.callbackSpy);
            });

            it('should trigger a callback', () => {
                let steps = containerFixture.selectAll('.step');

                steps[0][0].__onmouseover();

                expect(this.callbackSpy).toHaveBeenCalled();
                // TODO: Figure out why the callback has this shape
                // arguments: data, index, ?
                expect(this.callbackSpy).toHaveBeenCalledWith(dataset.data[0], 0, 0);
            });
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(stepChart.exportChart).toBeDefined();
            });
        });
    });
});
