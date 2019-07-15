import * as d3 from 'd3';

import chart from './../../src/es6charts/brush';
import dataBuilder from 'brushChartDataBuilder';


describe('Brush Chart', () => {
    let brushChart, dataset, containerFixture, f;

    function aTestDataSet() {
        return new dataBuilder.BrushDataBuilder();
    }

    beforeEach(() => {
        const fixture = '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = aTestDataSet()
            .withSimpleData()
            .build();
        brushChart = chart();

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(brushChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
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

    describe('when reloading with a different dataset', () => {

        it('should render in the same svg', function () {
            let actual;
            const expected = 1;
            const newDataset = aTestDataSet()
                .withShortData()
                .build();

            containerFixture.datum(newDataset).call(brushChart);

            actual = containerFixture.selectAll('.brush-chart').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render one area', function () {
            let actual;
            const expected = 1;
            const newDataset = aTestDataSet()
                .withShortData()
                .build();

            containerFixture.datum(newDataset).call(brushChart);

            actual = containerFixture.selectAll('.brush-chart .brush-area').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render one axis', function () {
            let actual;
            const expected = 1;
            const newDataset = aTestDataSet()
                .withShortData()
                .build();

            containerFixture.datum(newDataset).call(brushChart);

            actual = containerFixture.selectAll('.brush-chart .x.axis').nodes().length;

            expect(actual).toEqual(expected);
        });
    });

    describe('API', function() {

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

        it('should provide height getter and setter', function() {
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

            it('should provide margin getter and setter', function () {
                var previous = brushChart.margin(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                brushChart.margin(expected);
                actual = brushChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', function () {

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

