define(['d3', 'grouped-bar', 'groupedBarChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.GroupedBarChartDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    const differentDatesReducer = (acc, d) => {
        if (acc.indexOf(d.date) === -1) {
            acc.push(d.date);
        }

        return acc;
    };

    describe('Grouped Bar Chart', () => {
        let groupedBarChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = buildDataSet('with3Sources');
            groupedBarChart = chart()
                .groupLabel('stack')
                .nameLabel('date')
                .valueLabel('views')
                .grid('full');

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset.data).call(groupedBarChart);
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
                const actual = containerFixture.select('.grouped-bar').size();

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
                const actual = containerFixture.selectAll('.layer').size();
                const expected = dataset.data.reduce(differentDatesReducer, []).length;

                expect(actual).toEqual(expected);
            });

            it('should render a bar for each data entry', () => {
                const actual = containerFixture.selectAll('.bar').size();
                const expected = dataset.data.length;

                expect(actual).toEqual(expected);
            });

            describe('when reloading with a two sources dataset', () => {

                it('should render in the same svg', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('with2Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(groupedBarChart);
                    actual = containerFixture.selectAll('.grouped-bar').size();

                    expect(actual).toEqual(expected);
                });

                it('should render four layers', () => {
                    const expected = 4;
                    const newDataset = buildDataSet('with2Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(groupedBarChart);
                    actual = containerFixture.selectAll('.grouped-bar .layer').size();

                    expect(actual).toEqual(expected);
                });

                it('should render eight bars total', () => {
                    const expected = 8;
                    const newDataset = buildDataSet('with2Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(groupedBarChart);
                    actual = containerFixture.selectAll('.grouped-bar .bar').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when grouped bar is animated', () => {

                it('it renders correct number of layers and bars', () => {
                    const expectedNLayers = 4;
                    const nBarsPerLayer = 3;

                    groupedBarChart.isAnimated(true);
                    containerFixture.datum(dataset.data).call(groupedBarChart);

                    const actualNLayers = containerFixture.selectAll('.chart-group .layer').size();
                    const actualNBars = containerFixture.selectAll('.chart-group .bar').size();

                    expect(actualNLayers).toEqual(expectedNLayers);
                    expect(actualNBars).toEqual(expectedNLayers * nBarsPerLayer);
                });
            });
        });

        describe('API', () => {

            it('should provide an aspect ratio getter and setter', () => {
                let previous = groupedBarChart.aspectRatio(),
                    expected = 600,
                    actual;

                groupedBarChart.aspectRatio(expected);
                actual = groupedBarChart.aspectRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a colorSchema getter and setter', () => {
                let previous = groupedBarChart.colorSchema(),
                    expected = ['#ffffff', '#fafefc', '#000000'],
                    actual;

                groupedBarChart.colorSchema(expected);
                actual = groupedBarChart.colorSchema();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should have exportChart defined', () => {
                expect(groupedBarChart.exportChart).toBeDefined();
            });

            it('should provide groupLabel getter and setter', () => {
                let previous = groupedBarChart.groupLabel(),
                    expected = 'testLabel',
                    actual;

                groupedBarChart.groupLabel(expected);
                actual = groupedBarChart.groupLabel();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide grid mode getter and setter', () => {
                let previous = groupedBarChart.grid(),
                    expected = 'vertical',
                    actual;

                groupedBarChart.grid(expected);
                actual = groupedBarChart.grid();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide height getter and setter', () => {
                let previous = groupedBarChart.height(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                groupedBarChart.height(expected);
                actual = groupedBarChart.height();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide horizontal direction getter and setter', () => {
                let previous = groupedBarChart.isHorizontal(),
                    expected = true,
                    actual;

                groupedBarChart.isHorizontal(expected);
                actual = groupedBarChart.isHorizontal();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide isAnimated getter and setter', () => {
                let previous = groupedBarChart.isAnimated(),
                    expected = true,
                    actual;

                groupedBarChart.isAnimated(expected);
                actual = groupedBarChart.isAnimated();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide loadingState getter and setter', () => {
                let previous = groupedBarChart.loadingState(),
                    expected = 'test',
                    actual;

                groupedBarChart.loadingState(expected);
                actual = groupedBarChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = groupedBarChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                groupedBarChart.margin(expected);
                actual = groupedBarChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', function () {

                it('should override the default values', () => {
                    let previous = groupedBarChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20
                        },
                        actual;

                    groupedBarChart.width(expected);
                    actual = groupedBarChart.width();

                    expect(previous).not.toBe(actual);
                    expect(actual).toEqual(expected);
                })
            });

            it('should provide nameLabel getter and setter', () => {
                let previous = groupedBarChart.nameLabel(),
                    expected = 'key',
                    actual;

                groupedBarChart.nameLabel(expected);
                actual = groupedBarChart.nameLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide xTicks getter and setter', () => {
                let previous = groupedBarChart.xTicks(),
                    expected = 4,
                    actual;

                groupedBarChart.xTicks(expected);
                actual = groupedBarChart.xTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = groupedBarChart.yTicks(),
                    expected = 4,
                    actual;

                groupedBarChart.yTicks(expected);
                actual = groupedBarChart.yTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide a tooltip threshold getter and setter', () => {
                let previous = groupedBarChart.tooltipThreshold(),
                    expected = 600,
                    actual;

                groupedBarChart.tooltipThreshold(expected);
                actual = groupedBarChart.tooltipThreshold();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let previous = groupedBarChart.valueLabel(),
                    expected = 'quantity',
                    actual;

                groupedBarChart.valueLabel(expected);
                actual = groupedBarChart.valueLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabelFormat getter and setter', () => {
                let previous = groupedBarChart.valueLabelFormat(),
                    expected = 's',
                    actual;

                groupedBarChart.valueLabelFormat(expected);
                actual = groupedBarChart.valueLabelFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = groupedBarChart.width(),
                    expected = 40,
                    actual;

                groupedBarChart.width(expected);
                actual = groupedBarChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yTickTextOffset getter and setter', () => {
                let previous = groupedBarChart.yTickTextOffset(),
                    expected =
                    {
                        x: -20,
                        y: -8
                    },
                    actual;

                groupedBarChart.yTickTextOffset(expected);
                actual = groupedBarChart.yTickTextOffset();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yAxisLabel getter and setter', () => {
                let defaultYAxisLabel = 'Hello',
                    testYAxisLabel = 'World',
                    newYAxisLabel;

                groupedBarChart.yAxisLabel(testYAxisLabel);
                newYAxisLabel = groupedBarChart.yAxisLabel();

                expect(defaultYAxisLabel).not.toBe(newYAxisLabel);
                expect(newYAxisLabel).toBe(testYAxisLabel);
            });

            it('should provide yAxisLabelOffset getter and setter', () => {
                let defaultYAxisLabelOffset =  groupedBarChart.yAxisLabelOffset(),
                    testYAxisLabelOffset = -30,
                    newYAxisLabelOffset;

                groupedBarChart.yAxisLabelOffset(testYAxisLabelOffset);
                newYAxisLabelOffset = groupedBarChart.yAxisLabelOffset();

                expect(defaultYAxisLabelOffset).not.toBe(newYAxisLabelOffset);
                expect(newYAxisLabelOffset).toBe(testYAxisLabelOffset);
            });
        });

        describe('Lifecycle', () => {

            describe('when clicking on a bar', () => {

                it('should trigger a callback', () => {
                    const chart = containerFixture.select('.grouped-bar');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCalls = 1;
                    const expectedArguments = 2;

                    groupedBarChart.on('customClick', callbackSpy);
                    chart.dispatch('click');

                    expect(callbackSpy.calls.count()).toEqual(expectedCalls);
                    expect(callbackSpy.calls.allArgs()[0].length).toEqual(expectedArguments);
                })
            });

            describe('when hovering', () => {

                it('mouseover should trigger a callback', () => {
                    const chart = containerFixture.selectAll('.grouped-bar');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCalls = 1;
                    const expectedArguments = 2;

                    groupedBarChart.on('customMouseOver', callbackSpy);
                    chart.dispatch('mouseover');

                    expect(callbackSpy.calls.count()).toEqual(expectedCalls);
                    expect(callbackSpy.calls.allArgs()[0].length).toEqual(expectedArguments);
                });

                it('mouseout should trigger a callback', () => {
                    const chart = containerFixture.selectAll('.grouped-bar');
                    const callbackSpy = jasmine.createSpy('callback');
                    const expectedCalls = 1;
                    const expectedArguments = 2;

                    groupedBarChart.on('customMouseOut', callbackSpy);
                    chart.dispatch('mouseout');

                    expect(callbackSpy.calls.count()).toEqual(expectedCalls);
                    expect(callbackSpy.calls.allArgs()[0].length).toEqual(expectedArguments);
                });
            });
        });
    });
});
