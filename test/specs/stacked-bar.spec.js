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
            dataset = buildDataSet('with3Sources');
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

        describe('Render', () => {

            it('should render a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.stacked-bar').size();

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

                it('should create a y-axis-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.y-axis-group').size();

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

                it('should draw vertical grid line', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.vertical-grid-line').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('axis', () => {
                it('should draw an X axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.x-axis-group .axis.x').size();

                    expect(actual).toEqual(expected);
                });

                it('should draw an Y axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.y-axis-group.axis').size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should render a layer for each data entry group', () => {
                const expected = dataset.data.reduce(differentStacksReducer, []).length;
                const actual = containerFixture.selectAll('.layer').size();

                expect(actual).toEqual(expected);
            });

            it('should render a bar for each data entry', () => {
                const expected = dataset.data.length;
                const actual = containerFixture.selectAll('.bar').size();

                expect(actual).toEqual(expected);
            });

            describe('when reloading with a two sources dataset', () => {

                it('should render in the same svg', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('with2Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stackedBarChart);
                    actual = containerFixture.selectAll('.stacked-bar').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render two layers', () => {
                    const expected = 2;
                    const newDataset = buildDataSet('with2Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stackedBarChart);
                    actual = containerFixture.selectAll('.stacked-bar .layer').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render eight bars total', () => {
                    const expected = 8;
                    const newDataset = buildDataSet('with2Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stackedBarChart);
                    actual = containerFixture.selectAll('.stacked-bar .bar').nodes().length;

                    expect(actual).toEqual(expected);
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

        describe('Lifecycle', () => {

            describe('when clicking on a bar', () => {

                it('should trigger a callback', function () {
                    const chart = containerFixture.select('.stacked-bar');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCallCount = 1;
                    const expectedArgumentsCount = 2;

                    stackedBarChart.on('customClick', callbackSpy);
                    chart.dispatch('click');

                    expect(callbackSpy.calls.count()).toEqual(expectedCallCount);
                    expect(callbackSpy.calls.allArgs()[0].length).toEqual(expectedArgumentsCount);
                })
            });

            describe('when hovering', function () {

                it('mouseover should trigger a callback', () => {
                    const chart = containerFixture.selectAll('.stacked-bar');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCallCount = 1;
                    const expectedArgumentsCount = 2;

                    stackedBarChart.on('customMouseOver', callbackSpy);
                    chart.dispatch('mouseover');

                    expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                    expect(callbackSpy.calls.allArgs()[0].length).toBe(expectedArgumentsCount);
                });

                it('mouseout should trigger a callback', () => {
                    const chart = containerFixture.selectAll('.stacked-bar');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCallCount = 1;
                    const expectedArgumentsCount = 2;

                    stackedBarChart.on('customMouseOut', callbackSpy);
                    chart.dispatch('mouseout');

                    expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                    expect(callbackSpy.calls.allArgs()[0].length).toBe(expectedArgumentsCount);
                });
            });
        });

        describe('API', () => {

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

            describe('loadingState', () => {

                it('should provide loadingState getter and setter', () => {
                    let previous = stackedBarChart.loadingState(),
                        expected = 'test',
                        actual;

                    stackedBarChart.loadingState(expected);
                    actual = stackedBarChart.loadingState();

                    expect(previous).not.toBe(actual);
                    expect(actual).toBe(expected);
                });

                describe('when getting a loadingState', () => {
                    it('should return an SVG element', () => {
                        let expected = 1,
                            actual;

                        stackedBarChart = chart();
                        actual = stackedBarChart.loadingState().match('bar-load-state').length;

                        expect(actual).toEqual(expected);
                    });
                });
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

            describe('when margins are set partially', function () {

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
    });
});
