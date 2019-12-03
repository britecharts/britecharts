define(['d3', 'heatmap', 'heatmapChartDataBuilder'], function (d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.HeatmapDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    describe('Heatmap Chart', () => {
        let heatmapChart, dataset, container, f;

        beforeEach(() => {
            dataset = buildDataSet('withWeeklyData');
            heatmapChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            container = d3.select('.test-container');
            container.datum(dataset).call(heatmapChart);
        });

        afterEach(() => {
            container.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('Render', () => {

            it('should render a heatmap', () => {
                const expected = 1;
                const actual = container.select('.heatmap').size();

                expect(actual).toEqual(expected);
            });

            describe('groups', () => {

                it('should render a container-group', () => {
                    const expected = 1;
                    const actual = container.select('g.container-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render a chart-group', () => {
                    const expected = 1;
                    const actual = container.select('g.chart-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render a metadata-group', () => {
                    const expected = 1;
                    const actual = container.select('g.metadata-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render a day-labels-group', () => {
                    const expected = 1;
                    const actual = container.select('g.day-labels-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render a hour-labels-group', () => {
                    const expected = 1;
                    const actual = container.select('g.hour-labels-group').size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should render a box for each hour in the week', () => {
                const expected = 24 * 7;
                const actual = container.selectAll('.box').size();

                expect(actual).toEqual(expected);
            });

            describe('axis', () => {

                it('should render the day labels', () => {
                    const expected = 7;
                    const actual = container.selectAll('.day-label').size();

                    expect(actual).toEqual(expected);
                });

                it('should render the hour labels', () => {
                    const expected = 24;
                    const actual = container.selectAll('.hour-label').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when reloading with a different dataset', () => {

                it('should render in the same svg', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('withAlternativeWeeklyData');
                    let actual;

                    container.datum(newDataset).call(heatmapChart);
                    actual = container.selectAll('.heatmap').size();

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('API', () => {

            it('should provide yAxisLabels getter and setter', () => {
                let previous = heatmapChart.yAxisLabels(),
                    expected = ['One', 'Two', 'Three'],
                    actual;

                heatmapChart.yAxisLabels(expected);
                actual = heatmapChart.yAxisLabels();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            describe('custom axis labels', () => {

                it('should render custom y axis labels correctly', () => {
                    const customYAxisLabels = ['Test1', 'Test2'];

                    // clear container to avoid having multiple
                    //  charts within one container
                    container.html('');
                    container.datum(dataset).call(heatmapChart);
                    heatmapChart.yAxisLabels(customYAxisLabels);

                    const yAxisLabels = container.select('svg')
                        .selectAll('.heatmap .y-axis-label');

                    yAxisLabels.each((yAxisLabel, i) => {
                        expect(yAxisLabel).toBe(customYAxisLabels[i]);
                    });
                });
            });

            it('should provide boxSize getter and setter', () => {
                let previous = heatmapChart.boxSize(),
                    expected = 10,
                    actual;

                heatmapChart.boxSize(expected);
                actual = heatmapChart.boxSize();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide colorSchema getter and setter', () => {
                let previous = heatmapChart.colorSchema(),
                    expected = ['#FFFFFF'],
                    actual;

                heatmapChart.colorSchema(expected);
                actual = heatmapChart.colorSchema();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should have exportChart defined', () => {
                expect(heatmapChart.exportChart).toBeDefined();
            });

            it('should provide height getter and setter', () => {
                let previous = heatmapChart.height(),
                    expected = 50,
                    actual;

                heatmapChart.height(expected);
                actual = heatmapChart.height();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            xit('should provide loadingState getter and setter', () => {
                let previous = heatmapChart.loadingState(),
                    expected = 'test',
                    actual;

                heatmapChart.loadingState(expected);
                actual = heatmapChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = heatmapChart.margin(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                heatmapChart.margin(expected);
                actual = heatmapChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = heatmapChart.width(),
                    expected = 20,
                    actual;

                heatmapChart.width(expected);
                actual = heatmapChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });
        });
    });
});
