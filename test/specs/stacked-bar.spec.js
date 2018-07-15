define(['d3', 'stacked-bar', 'stackedBarDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.StackedBarDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };
    const differentStacksReducer = (acc, d) => {
                if (acc.indexOf(d.stack) === -1) {
                    acc.push(d.stack);
                }

                return acc;
            };

    describe('Stacked Bar Chart', () => {
        let stackedBarChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = aTestDataSet()
                .with3Sources()
                .build();
            stackedBarChart = chart()
                        .stackLabel('stack')
                        .nameLabel('date')
                        .valueLabel('views')
                        .grid('full');

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset.data).call(stackedBarChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', () => {
            expect(containerFixture.select('.stacked-bar').empty()).toBeFalsy();
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
            expect(containerFixture.select('.vertical-grid-line').empty()).toBeFalsy();
        });

        it('should render an X and Y axis', () => {
            expect(containerFixture.select('.x-axis-group .axis.x').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render a layer for each data entry group', () => {
            let actual = containerFixture.selectAll('.layer').size();
            let expected = dataset.data.reduce(differentStacksReducer, []).length;

            expect(actual).toEqual(expected);
        });

        it('should render a bar for each data entry', () => {
            let actual = containerFixture.selectAll('.bar').size();
            let expected = dataset.data.length;

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a two sources dataset', () => {

            it('should render in the same svg', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('with2Sources');

                containerFixture.datum(newDataset.data).call(stackedBarChart);

                actual = containerFixture.selectAll('.stacked-bar').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render two layers', function() {
                let actual;
                let expected = 2;
                let newDataset = buildDataSet('with2Sources');

                containerFixture.datum(newDataset.data).call(stackedBarChart);

                actual = containerFixture.selectAll('.stacked-bar .layer').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render eight bars total', () => {
                let actual;
                let expected = 8;
                let newDataset = buildDataSet('with2Sources');

                containerFixture.datum(newDataset.data).call(stackedBarChart);

                actual = containerFixture.selectAll('.stacked-bar .bar').nodes().length;

                expect(actual).toEqual(expected);
            });
        });

        describe('API', function() {

            it('should provide an aspect ratio getter and setter', () => {
                let previous = stackedBarChart.aspectRatio(),
                    expected = 600,
                    actual;

                stackedBarChart.aspectRatio(expected);
                actual = stackedBarChart.aspectRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a betweenBarsPadding getter and setter', () => {
                let previous = stackedBarChart.betweenBarsPadding(),
                    expected = 0.5,
                    actual;

                stackedBarChart.betweenBarsPadding(expected);
                actual = stackedBarChart.betweenBarsPadding();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide a colorSchema getter and setter', () => {
                let previous = stackedBarChart.colorSchema(),
                    expected = ['#ffffff', '#fafefc', '#000000'],
                    actual;

                stackedBarChart.colorSchema(expected);
                actual = stackedBarChart.colorSchema();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should have exportChart defined', () => {
                expect(stackedBarChart.exportChart).toBeDefined();
            });

            it('should provide grid mode getter and setter', () => {
                let previous = stackedBarChart.grid(),
                    expected = 'vertical',
                    actual;

                stackedBarChart.grid(expected);
                actual = stackedBarChart.grid();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide an hasPercentage getter and setter', () => {
                let previous = stackedBarChart.hasPercentage(),
                    expected = true,
                    actual;

                stackedBarChart.hasPercentage(expected);
                actual = stackedBarChart.hasPercentage();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide height getter and setter', () => {
                let previous = stackedBarChart.height(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                stackedBarChart.height(expected);
                actual = stackedBarChart.height();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide horizontal direction getter and setter', () => {
                let previous = stackedBarChart.isHorizontal(),
                    expected = true,
                    actual;

                stackedBarChart.isHorizontal(expected);
                actual = stackedBarChart.isHorizontal();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide hasReversedStacks getter and setter', () => {
                let previous = stackedBarChart.hasReversedStacks(),
                    expected = true,
                    actual;

                stackedBarChart.hasReversedStacks(expected);
                actual = stackedBarChart.hasReversedStacks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide isAnimated getter and setter', () => {
                let previous = stackedBarChart.isAnimated(),
                    expected = true,
                    actual;

                stackedBarChart.isAnimated(expected);
                actual = stackedBarChart.isAnimated();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide loadingState getter and setter', () => {
                let previous = stackedBarChart.loadingState(),
                    expected = 'test',
                    actual;

                stackedBarChart.loadingState(expected);
                actual = stackedBarChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = stackedBarChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                stackedBarChart.margin(expected);
                actual = stackedBarChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });

            it('should provide nameLabel getter and setter', () => {
                let previous = stackedBarChart.nameLabel(),
                    expected = 'key',
                    actual;

                stackedBarChart.nameLabel(expected);
                actual = stackedBarChart.nameLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide stackLabel getter and setter', () => {
                let previous = stackedBarChart.stackLabel(),
                    expected = 'testLabel',
                    actual;

                stackedBarChart.stackLabel(expected);
                actual = stackedBarChart.stackLabel();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide a tooltip threshold getter and setter', () => {
                let previous = stackedBarChart.tooltipThreshold(),
                    expected = 600,
                    actual;

                stackedBarChart.tooltipThreshold(expected);
                actual = stackedBarChart.tooltipThreshold();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let previous = stackedBarChart.valueLabel(),
                    expected = 'quantity',
                    actual;

                stackedBarChart.valueLabel(expected);
                actual = stackedBarChart.valueLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabelFormat getter and setter', () => {
                let previous = stackedBarChart.valueLabelFormat(),
                    expected = 's',
                    actual;

                stackedBarChart.valueLabelFormat(expected);
                actual = stackedBarChart.valueLabelFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = stackedBarChart.width(),
                    expected = 40,
                    actual;

                stackedBarChart.width(expected);
                actual = stackedBarChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide locale getter and setter', () => {
                let defaultLocale = null,
                    testValue = 'ru-RU',
                    newLocale;

                stackedBarChart.locale(testValue);
                newLocale = stackedBarChart.locale();

                expect(defaultLocale).not.toBe(testValue);
                expect(newLocale).toBe(testValue);
            });

            it('should provide xTicks getter and setter', () => {
                let previous = stackedBarChart.xTicks(),
                    expected = 4,
                    actual;

                stackedBarChart.xTicks(expected);
                actual = stackedBarChart.xTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = stackedBarChart.yTicks(),
                    expected = 4,
                    actual;

                stackedBarChart.yTicks(expected);
                actual = stackedBarChart.yTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yAxisLabel getter and setter', () => {
                let defaultYAxisLabel = 'Hello',
                    testYAxisLabel = 'World',
                    newYAxisLabel;

                stackedBarChart.yAxisLabel(testYAxisLabel);
                newYAxisLabel = stackedBarChart.yAxisLabel();

                expect(defaultYAxisLabel).not.toBe(newYAxisLabel);
                expect(newYAxisLabel).toBe(testYAxisLabel);
            });

            it('should provide yAxisLabelOffset getter and setter', () => {
                let defaultYAxisLabelOffset =  stackedBarChart.yAxisLabelOffset(),
                    testYAxisLabelOffset = -30,
                    newYAxisLabelOffset;

                stackedBarChart.yAxisLabelOffset(testYAxisLabelOffset);
                newYAxisLabelOffset = stackedBarChart.yAxisLabelOffset();

                expect(defaultYAxisLabelOffset).not.toBe(newYAxisLabelOffset);
                expect(newYAxisLabelOffset).toBe(testYAxisLabelOffset);
            });
        });

        describe('when clicking on a bar', () => {

            it('should trigger a callback', function() {
                let chart = containerFixture.select('.stacked-bar');
                let callbackSpy = jasmine.createSpy('callback');

                stackedBarChart.on('customClick', callbackSpy);
                chart.dispatch('click');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(2);
            })
        });

        describe('when margins are set partially', function() {

            it('should override the default values', () => {
                let previous = stackedBarChart.margin(),
                expected = {
                    ...previous,
                    top: 10,
                    right: 20
                },
                actual;

                stackedBarChart.width(expected);
                actual = stackedBarChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            })
        });

        describe('when hovering', function() {

            it('mouseover should trigger a callback', () => {
                let chart = containerFixture.selectAll('.stacked-bar');
                let callbackSpy = jasmine.createSpy('callback');

                stackedBarChart.on('customMouseOver', callbackSpy);
                chart.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(2);
            });

            it('mouseout should trigger a callback', () => {
                let chart = containerFixture.selectAll('.stacked-bar');
                let callbackSpy = jasmine.createSpy('callback');

                stackedBarChart.on('customMouseOut', callbackSpy);
                chart.dispatch('mouseout');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(2);
            });
        });

        describe('when stacked bar is animated', () => {

            it('it renders correct number of layers and bars', () => {
                const expectedNLayers = 3;
                const nBarsPerLayer = 4;

                stackedBarChart.isAnimated(true);
                containerFixture.datum(dataset.data).call(stackedBarChart);

                const actualNLayers = containerFixture.selectAll('.chart-group .layer').nodes().length;
                const actualNBars = containerFixture.selectAll('.chart-group .bar').nodes().length;

                expect(actualNLayers).toEqual(expectedNLayers);
                expect(actualNBars).toEqual(expectedNLayers * nBarsPerLayer);
            });
        });
    });
});
