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

        describe('Render', () => {

            it('should render a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.step-chart').size();

                expect(actual).toEqual(expected);
            });

            describe('groups', () => {
                it('should create a container-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.container-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a chart-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.chart-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a x-axis-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.x-axis-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a x-axis-label', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.x-axis-label').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a y-axis-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.y-axis-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a y-axis-label', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.y-axis-label').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a grid-lines-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.grid-lines-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a metadata-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.metadata-group').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('grid lines', () => {

                it('should draw horizontal grid line', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.horizontal-grid-line').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('axis', () => {
                it('should draw an X axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.x-axis-group.axis').size();

                    expect(actual).toEqual(expected);
                });

                it('should draw an Y axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.y-axis-group.axis').size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should render a step for each data entry', () => {
                const expected = dataset.data.length;
                const actual = containerFixture.selectAll('.step').size();

                expect(actual).toEqual(expected);
            });

            describe('when reloading with a different dataset', () => {

                it('should render in the same svg', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('withMediumData');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stepChart);
                    actual = containerFixture.selectAll('.step-chart').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render nine steps', () => {
                    const expected = 9;
                    const newDataset = buildDataSet('withMediumData');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stepChart);
                    actual = containerFixture.selectAll('.step-chart .step').nodes().length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('Lifecycle', () => {

            describe('when hovering a step', () => {

                it('should trigger a callback', () => {
                    const step = containerFixture.select('.step:nth-child(1)');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCallCount = 1;
                    const expectedArgumentsCount = 3;

                    stepChart.on('customMouseOver', callbackSpy);
                    step.dispatch('mouseover');

                    expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                    expect(callbackSpy.calls.allArgs()[0].length).toBe(expectedArgumentsCount);
                });
            });

            describe('when moving on a step', () => {

                it('should trigger a callback', () => {
                    const step = containerFixture.select('.step:nth-child(1)');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCallCount = 1;
                    const expectedArgumentsCount = 3;

                    stepChart.on('customMouseMove', callbackSpy);
                    step.dispatch('mousemove');

                    expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                    expect(callbackSpy.calls.allArgs()[0].length).toBe(expectedArgumentsCount);
                });
            });

            describe('when moving out of a step', () => {

                it('should trigger a callback', () => {
                    const step = containerFixture.select('.step:nth-child(1)');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCallCount = 1;
                    const expectedArgumentsCount = 3;

                    stepChart.on('customMouseOut', callbackSpy);
                    step.dispatch('mouseout');

                    expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                    expect(callbackSpy.calls.allArgs()[0].length).toBe(expectedArgumentsCount);
                });
            });
        });

        describe('API', () => {

            it('should provide margin getter and setter', () => {
                let defaultMargin = stepChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                stepChart.margin(testMargin);
                newMargin = stepChart.margin();

                expect(defaultMargin).not.toBe(newMargin);
                expect(newMargin).toEqual(testMargin);
            });

            describe('when margins are set partially', function () {

                it('should override the default values', () => {
                    let previous = stepChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20
                        },
                        actual;

                    stepChart.width(expected);
                    actual = stepChart.width();

                    expect(previous).not.toBe(actual);
                    expect(actual).toEqual(expected);
                })
            });

            describe('export chart functionality', () => {

                it('should have exportChart defined', () => {
                    expect(stepChart.exportChart).toBeDefined();
                });
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
    });
});
