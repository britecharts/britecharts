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

        describe('when render', () => {

            it('should render a heatmap', () => {
                let expected = 1;
                let actual = container.select('.heatmap').nodes().length;

                expect(actual).toEqual(expected);
            });

            describe('group elements', () => {

                it('should render a container-group', () => {
                    let expected = 1;
                    let actual = container.select('g.container-group').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render a chart-group', () => {
                    let expected = 1;
                    let actual = container.select('g.chart-group').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render a metadata-group', () => {
                    let expected = 1;
                    let actual = container.select('g.metadata-group').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render a day-labels-group', () => {
                    let expected = 1;
                    let actual = container.select('g.day-labels-group').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render a hour-labels-group', () => {
                    let expected = 1;
                    let actual = container.select('g.hour-labels-group').nodes().length;

                    expect(actual).toEqual(expected);
                });
            });

            it('should render a box for each hour in the week', () => {
                let expected = 24 * 7;
                let actual = container.selectAll('.box').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render the day labels', () => {
                let expected = 7;
                let actual = container.selectAll('.day-label').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render the hour labels', () => {
                let expected = 24;
                let actual = container.selectAll('.hour-label').nodes().length;

                expect(actual).toEqual(expected);
            });

            describe('when reloading with a different dataset', () => {

                it('should render in the same svg', function () {
                    let actual;
                    let expected = 1;
                    let newDataset = buildDataSet('withAlternativeWeeklyData');

                    container.datum(newDataset).call(heatmapChart);

                    actual = container.selectAll('.heatmap').nodes().length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('API', function () {

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
