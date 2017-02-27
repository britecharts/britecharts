define(['d3', 'bar', 'barChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    function aTestDataSet() {
        return new dataBuilder.BarDataBuilder();
    }

    describe('Bar Chart', () => {
        let barChart, dataset, containerFixture, f;

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
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
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

        describe('API', function() {

            it('should provide margin getter and setter', () => {
                let previous = barChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                barChart.margin(expected);
                actual = barChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide height getter and setter', () => {
                let previous = barChart.height(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                barChart.height(expected);
                actual = barChart.height();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = barChart.width(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                barChart.width(expected);
                actual = barChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide a percentage ratio getter and setter', () => {
                let defaultRatio = barChart.percentageAxisToMaxRatio(),
                    expected = 1.5,
                    actual;

                barChart.percentageAxisToMaxRatio(expected);
                actual = barChart.percentageAxisToMaxRatio();

                expect(defaultRatio).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide horizontal direction getter and setter', () => {
                let previous = barChart.horizontal(),
                    expected = true,
                    actual;

                barChart.horizontal(expected);
                actual = barChart.horizontal();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide percentage label margin getter and setter', () => {
                let previous = barChart.percentageLabelMargin(),
                    expected = 10,
                    actual;

                barChart.percentageLabelMargin(expected);
                actual = barChart.percentageLabelMargin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide enable percentage label getter and setter', () => {
                let previous = barChart.enablePercentageLabels(),
                    expected = true,
                    actual;

                barChart.enablePercentageLabels(expected);
                actual = barChart.enablePercentageLabels();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });


            it('should provide yAxisPaddingBetweenChart getter and setter', () => {
                let previous = barChart.yAxisPaddingBetweenChart(),
                    expected = 15,
                    actual;

                barChart.yAxisPaddingBetweenChart(expected);
                actual = barChart.yAxisPaddingBetweenChart();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });
        });

        describe('when hovering a bar', function() {

            it('should trigger a callback', () => {
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                barChart.on('customMouseOver', callbackSpy);
                bar.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(1);
            });
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(barChart.exportChart).toBeDefined();
            });
        });
    });
});
