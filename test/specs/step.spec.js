define([
    'jquery', 
    'd3', 
    'step', 
    'stepChartDataBuilder'
], function(
    $, 
    d3, 
    chart, 
    dataBuilder
) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.StepDataBuilder();    
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    describe('Step Chart', () => {
        let stepChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = buildDataSet('withSmallData');
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
            expect(containerFixture.select('g.x-axis-label').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-label').empty()).toBeFalsy();
            expect(containerFixture.select('g.grid-lines-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
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

        describe('when reloading with a different dataset', () => {
            
            it('should render in the same svg', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withMediumData');

                containerFixture.datum(newDataset.data).call(stepChart);

                actual = containerFixture.selectAll('.step-chart').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render nine steps', function() {
                let actual;
                let expected = 9;
                let newDataset = buildDataSet('withMediumData');

                containerFixture.datum(newDataset.data).call(stepChart);

                actual = containerFixture.selectAll('.step-chart .step').nodes().length;

                expect(actual).toEqual(expected);
            });
        });

        describe('API', function() {

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
                    testHeight = 200,
                    newHeight;

                stepChart.height(testHeight);
                newHeight = stepChart.height();

                expect(defaultHeight).not.toBe(newHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = stepChart.yTicks(),
                    expected = 20,
                    actual;

                stepChart.yTicks(expected);
                actual = stepChart.yTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide loadingState getter and setter', () => {
                let previous = stepChart.loadingState(),
                    expected = 'test',
                    actual;

                stepChart.loadingState(expected);
                actual = stepChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let defaultWidth = stepChart.width(),
                    testWidth = 200,
                    newWidth;

                stepChart.width(testWidth);
                newWidth = stepChart.width();

                expect(defaultWidth).not.toBe(newWidth);
                expect(newWidth).toBe(testWidth);
            });

            it('should provide yAxisLabel getter and setter', () => {
                let defaultYAxisLabel = 'Hello',
                    testYAxisLabel = 'World',
                    newYAxisLabel;

                stepChart.yAxisLabel(testYAxisLabel);
                newYAxisLabel = stepChart.yAxisLabel();

                expect(defaultYAxisLabel).not.toBe(newYAxisLabel);
                expect(newYAxisLabel).toBe(testYAxisLabel);
            });

            it('should provide yAxisLabelOffset getter and setter', () => {
                let defaultYAxisLabelOffset = -40,
                    testYAxisLabelOffset = -30,
                    newYAxisLabelOffset;

                stepChart.yAxisLabelOffset(testYAxisLabelOffset);
                newYAxisLabelOffset = stepChart.yAxisLabelOffset();

                expect(defaultYAxisLabelOffset).not.toBe(newYAxisLabelOffset);
                expect(newYAxisLabelOffset).toBe(testYAxisLabelOffset);
            });

            it('should provide xAxisLabel getter and setter', () => {
                let defaultXAxisLabel = 'World',
                    testXAxisLabel = 'Hello',
                    newXAxisLabel;

                stepChart.xAxisLabel(testXAxisLabel);
                newXAxisLabel = stepChart.xAxisLabel();

                expect(defaultXAxisLabel).not.toBe(newXAxisLabel);
                expect(newXAxisLabel).toBe(testXAxisLabel);
            });

            it('should provide xAxisLabelOffset getter and setter', () => {
                let defaultXAxisLabelOffset = 30,
                    testXAxisLabelOffset = 40,
                    newXAxisLabelOffset;

                stepChart.xAxisLabelOffset(testXAxisLabelOffset);
                newXAxisLabelOffset = stepChart.xAxisLabelOffset();

                expect(defaultXAxisLabelOffset).not.toBe(newXAxisLabelOffset);
                expect(newXAxisLabelOffset).toBe(testXAxisLabelOffset);
            });
        });

        describe('when hovering a step', function() {

            it('should trigger a callback', () => {
                let step = containerFixture.select('.step:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                stepChart.on('customMouseOver', callbackSpy);
                step.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });

            it('should trigger a callback', () => {
                let step = containerFixture.select('.step:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                stepChart.on('customMouseMove', callbackSpy);
                step.dispatch('mousemove');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });

            it('should trigger a callback', () => {
                let step = containerFixture.select('.step:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                stepChart.on('customMouseOut', callbackSpy);
                step.dispatch('mouseout');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(stepChart.exportChart).toBeDefined();
            });
        });
    });
});
