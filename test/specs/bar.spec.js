define(['d3', 'bar', 'barChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.BarDataBuilder();    
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };


    describe('Bar Chart', () => {
        let barChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = buildDataSet('withLettersFrequency');
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

        describe('when reloading with a different dataset', () => {

            it('should render in the same svg', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withColors');

                containerFixture.datum(newDataset).call(barChart);

                actual = containerFixture.selectAll('.bar-chart').nodes().length;

                expect(actual).toEqual(expected);
            });

            // This test fails because of the transition on the exit
            xit('should render six bars', function() {
                let actual;
                let expected = 6;
                let newDataset = buildDataSet('withColors');

                containerFixture.datum(newDataset).call(barChart);

                actual = containerFixture.selectAll('.bar-chart .bar').nodes().length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when orderingFunction is called', () => {

            it('accepts custom descending order function', () => {
                let fn = (a, b) => b.value - a.value; 
                let actual,
                    expected = {
                        name: 'E', 
                        value: 0.12702
                    };

                barChart.orderingFunction(fn);
                containerFixture.call(barChart)
                actual = containerFixture.selectAll('.bar-chart .bar').nodes()[0].__data__;

                expect(actual.name).toBe(expected.name);
                expect(actual.value).toBe(expected.value);
            });

            it('accepts a custom ascending sorting function', () => {
                let fn = (a, b) => a.value - b.value; 
                let actual,
                    expected = {
                        name: 'Z',
                        value: 0.00074
                    };

                barChart.orderingFunction(fn);
                containerFixture.call(barChart)
                actual = containerFixture.selectAll('.bar-chart .bar').nodes()[0].__data__;

                expect(actual.name).toBe(expected.name);
                expect(actual.value).toBe(expected.value);
            });
        })

        describe('API', function() {

            it('should provide colorSchema getter and setter', () => {
                let previous = barChart.colorSchema(),
                    expected = ['#FFFFFF'],
                    actual;

                barChart.colorSchema(expected);
                actual = barChart.colorSchema();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should update color', () => {
                let previous = barChart.colorSchema(),
                    expected = '#FFFFFF',
                    actual;

                barChart.colorSchema([expected]);

                const barColor = containerFixture.select('rect.bar');

                containerFixture.call(barChart);
                actual = barColor.attr('fill');

                expect(actual).toBe(expected);
            });

            it('should provide enable labels getter and setter', () => {
                let previous = barChart.enableLabels(),
                    expected = true,
                    actual;

                barChart.enableLabels(expected);
                actual = barChart.enableLabels();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should have exportChart defined', () => {
                expect(barChart.exportChart).toBeDefined();
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

            it('should provide horizontal direction getter and setter', () => {
                let previous = barChart.isHorizontal(),
                    expected = true,
                    actual;

                barChart.isHorizontal(expected);
                actual = barChart.isHorizontal();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide isAnimated getter and setter', () => {
                let previous = barChart.isAnimated(),
                    expected = true,
                    actual;

                barChart.isAnimated(expected);
                actual = barChart.isAnimated();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide labelsMargin getter and setter', () => {
                let previous = barChart.labelsMargin(),
                    expected = 10,
                    actual;

                barChart.labelsMargin(expected);
                actual = barChart.labelsMargin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide labelsNumberFormat getter and setter', () =>{
                let previous = barChart.labelsNumberFormat(),
                    expected = 'd',
                    actual;

                barChart.labelsNumberFormat(expected);
                actual = barChart.labelsNumberFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide labelsSize getter and setter', () => {
                let previous = barChart.labelsSize(),
                    expected = 10,
                    actual;

                barChart.labelsSize(expected);
                actual = barChart.labelsSize();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = barChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                barChart.margin(expected);
                actual = barChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide loadingState getter and setter', () => {
                let previous = barChart.loadingState(),
                    expected = 'test',
                    actual;

                barChart.loadingState(expected);
                actual = barChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide padding getter and setter', () => {
                let previous = barChart.betweenBarsPadding(),
                    expected = 0.5,
                    actual;

                barChart.betweenBarsPadding(expected);
                actual = barChart.betweenBarsPadding();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide nameLabel getter and setter', () => {
                let previous = barChart.nameLabel(),
                    expected = 'key',
                    actual;

                barChart.nameLabel(expected);
                actual = barChart.nameLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a percentageAxisToMaxRatio getter and setter', () => {
                let previous = barChart.percentageAxisToMaxRatio(),
                    expected = 1.5,
                    actual;

                barChart.percentageAxisToMaxRatio(expected);
                actual = barChart.percentageAxisToMaxRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a shouldReverseColorList getter and setter', () => {
                let previous = barChart.shouldReverseColorList(),
                    expected = false,
                    actual;

                barChart.shouldReverseColorList(expected);
                actual = barChart.shouldReverseColorList();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide an hasPercentage getter and setter', () => {
                let previous = barChart.hasPercentage(),
                    expected = true,
                    actual;

                barChart.hasPercentage(expected);
                actual = barChart.hasPercentage();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let previous = barChart.valueLabel(),
                    expected = 'quantity',
                    actual;

                barChart.valueLabel(expected);
                actual = barChart.valueLabel();

                expect(previous).not.toBe(expected);
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

            it('should provide xTicks getter and setter', () => {
                let previous = barChart.xTicks(),
                    expected = 4,
                    actual;

                barChart.xTicks(expected);
                actual = barChart.xTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = barChart.yTicks(),
                    expected = 20,
                    actual;

                barChart.yTicks(expected);
                actual = barChart.yTicks();

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

            it('should provide numberFormat getter and setter', () =>{
                let previous = barChart.numberFormat(),
                    expected = 'd',
                    actual;

                barChart.numberFormat(expected);
                actual = barChart.numberFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });

        describe('when clicking on a bar', function() {

            it('should trigger a callback on mouse click', () => {
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                barChart.on('customClick', callbackSpy);
                bar.dispatch('click');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });
        });

        describe('when hovering a bar', function() {

            it('should trigger a callback on mouse over', () => {
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                barChart.on('customMouseOver', callbackSpy);
                bar.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });

            it('should trigger a callback on mouse move', () => {
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                barChart.on('customMouseMove', callbackSpy);
                bar.dispatch('mousemove');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });

            it('should trigger a callback on mouse out', () => {
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                barChart.on('customMouseOut', callbackSpy);
                bar.dispatch('mouseout');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });
        });
    });
});
