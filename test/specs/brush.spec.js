define(['jquery', 'd3', 'brush', 'brushChartDataBuilder'], function($, d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.BrushDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    describe('Brush Chart', () => {
        let brushChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = buildDataSet('withSimpleData');
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

        describe('Render', () => {

            it('should show a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.brush-chart').size();

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

                it('should create a metadata-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.metadata-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a brush-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.brush-group').size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should render an X axis', () => {
                const expected = 1;
                const actual = containerFixture.selectAll('.x.axis').size();

                expect(actual).toEqual(expected);
            });

            it('should render an area', () => {
                const expected = 1;
                const actual = containerFixture.selectAll('.brush-area').size();

                expect(actual).toEqual(expected);
            });

            it('should render a brush rect overlay', () => {
                const expected = 1;
                const actual = containerFixture.selectAll('.overlay.brush-rect').size();

                expect(actual).toEqual(expected);
            });

            it('should render a brush rect selection', () => {
                const expected = 1;
                const actual = containerFixture.selectAll('.selection.brush-rect').size();

                expect(actual).toEqual(expected);
            });

            it('should render an e handle', () => {
                const expected = 1;
                const actual = containerFixture.selectAll('.handle.handle--e.brush-rect').size();

                expect(actual).toEqual(expected);
            });

            it('should render an w handle', () => {
                const expected = 1;
                const actual = containerFixture.selectAll('.handle.handle--w.brush-rect').size();

                expect(actual).toEqual(expected);
            });

            describe('when reloading with a different dataset', () => {

                it('should render in the same svg', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('withShortData');
                    let actual;

                    containerFixture.datum(newDataset).call(brushChart);
                    actual = containerFixture.selectAll('.brush-chart').size();

                    expect(actual).toEqual(expected);
                });

                it('should render one area', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('withShortData');
                    let actual;

                    containerFixture.datum(newDataset).call(brushChart);
                    actual = containerFixture.selectAll('.brush-chart .brush-area').size();

                    expect(actual).toEqual(expected);
                });

                it('should render one axis', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('withShortData');
                    let actual;

                    containerFixture.datum(newDataset).call(brushChart);
                    actual = containerFixture.selectAll('.brush-chart .x.axis').size();

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('API', () => {

            it('should provide a bush date range getter and setter', () => {
                let previous = brushChart.dateRange(),
                    expected = ['9/15/2015', '1/25/2016'],
                    actual;

                brushChart.dateRange(expected);
                actual = brushChart.dateRange();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a gradient getter and setter', () => {
                let previous = brushChart.gradient(),
                    expected = ['#ffffff', '#fafefc'],
                    actual;

                brushChart.gradient(expected);
                actual = brushChart.gradient();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide height getter and setter', () => {
                var previous = brushChart.height(),
                    expected = 200,
                    actual;

                brushChart.height(expected);
                actual = brushChart.height();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide loadingState getter and setter', () => {
                let previous = brushChart.loadingState(),
                    expected = 'test',
                    actual;

                brushChart.loadingState(expected);
                actual = brushChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            describe('margin', () => {

                it('should provide margin getter and setter', () => {
                    var previous = brushChart.margin(),
                        expected = { top: 4, right: 4, bottom: 4, left: 4 },
                        actual;

                    brushChart.margin(expected);
                    actual = brushChart.margin();

                    expect(previous).not.toBe(expected);
                    expect(actual).toEqual(expected);
                });

                describe('when margins are set partially', () => {

                    it('should override the default values', () => {
                        let previous = brushChart.margin(),
                            expected = {
                                ...previous,
                                top: 10,
                                right: 20
                            },
                            actual;

                        brushChart.width(expected);
                        actual = brushChart.width();

                        expect(previous).not.toBe(actual);
                        expect(actual).toEqual(expected);
                    })
                });
            });

            it('should provide width getter and setter', function() {
                var previous = brushChart.width(),
                    expected = 200,
                    actual;

                brushChart.width(expected);
                actual = brushChart.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xAxisFormat getter and setter', () => {
                let previous = brushChart.xAxisFormat(),
                    expected = brushChart.axisTimeCombinations.HOUR_DAY,
                    actual;

                brushChart.xAxisFormat(expected);
                actual = brushChart.xAxisFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xAxisCustomFormat getter and setter', () => {
                let previous = brushChart.xAxisCustomFormat(),
                    expected = '%d %b',
                    actual;

                brushChart.xAxisCustomFormat(expected);
                actual = brushChart.xAxisCustomFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xTicks getter and setter', () => {
                let previous = brushChart.xTicks(),
                    expected = 2,
                    actual;

                brushChart.xTicks(expected);
                actual = brushChart.xTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide locale getter and setter', () => {
                let previous = brushChart.locale(),
                    expected = 'en-US',
                    actual;

                brushChart.locale(expected);
                actual = brushChart.locale();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a roundingTimeInterval getter and setter', () => {
                let previous = brushChart.roundingTimeInterval(),
                    expected = 'timeMillisecond',
                    actual;

                brushChart.roundingTimeInterval(expected);
                actual = brushChart.roundingTimeInterval();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });
    });
});
