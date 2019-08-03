import * as d3 from 'd3';

import chart from './../../src/es6charts/heatmap';
import dataBuilder from 'heatmapChartDataBuilder';


const aTestDataSet = () => new dataBuilder.HeatmapDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()
        [dataSetName]()
        .build();
};


describe('Heatmap Chart', () => {
    let heatmapChart, dataset, containerFixture, f;

    beforeEach(() => {
        const fixture = '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = buildDataSet('withWeeklyData');
        heatmapChart = chart();

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(heatmapChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('when render', () => {

        it('should render a heatmap', () => {
            let expected = 1;
            let actual = containerFixture.select('.heatmap').nodes().length;

            expect(actual).toEqual(expected);
        });

        describe('group elements', () => {

            it('should render a container-group', () => {
                let expected = 1;
                let actual = containerFixture.select('g.container-group').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render a chart-group', () => {
                let expected = 1;
                let actual = containerFixture.select('g.chart-group').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render a metadata-group', () => {
                let expected = 1;
                let actual = containerFixture.select('g.metadata-group').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render a day-labels-group', () => {
                let expected = 1;
                let actual = containerFixture.select('g.day-labels-group').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render a hour-labels-group', () => {
                let expected = 1;
                let actual = containerFixture.select('g.hour-labels-group').nodes().length;

                expect(actual).toEqual(expected);
            });
        });

        it('should render a box for each hour in the week', () => {
            let expected = 24 * 7;
            let actual = containerFixture.selectAll('.box').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render the day labels', () => {
            let expected = 7;
            let actual = containerFixture.selectAll('.day-label').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render the hour labels', () => {
            let expected = 24;
            let actual = containerFixture.selectAll('.hour-label').nodes().length;

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a different dataset', () => {

            it('should render in the same svg', () => {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withAlternativeWeeklyData');

                containerFixture.datum(newDataset).call(heatmapChart);

                actual = containerFixture.selectAll('.heatmap').nodes().length;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('API', () => {

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

