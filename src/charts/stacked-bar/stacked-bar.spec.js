import * as d3 from 'd3';

import chart from './stacked-bar';
import { StackedBarDataBuilder } from './stackedBarDataBuilder';

const aTestDataSet = () => new StackedBarDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};
const differentStacksReducer = (acc, d) => {
    if (acc.indexOf(d.stack) === -1) {
        acc.push(d.stack);
    }

    return acc;
};

describe('Stacked Bar Chart', () => {
    let stackedBarChart, dataset, containerFixture;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = buildDataSet('with3Sources');
        stackedBarChart = chart().grid('full');

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(stackedBarChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
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
                const actual = containerFixture
                    .select('g.container-group')
                    .size();

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
                const actual = containerFixture
                    .select('g.grid-lines-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a metadata-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.metadata-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a loading-state-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.loading-state-group')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('grid lines', () => {
            it('should draw horizontal grid line', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.grid.horizontal')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should draw vertical grid line', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.grid.vertical')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('axis', () => {
            it('should draw an X axis', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.x-axis-group .axis.x')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should draw an Y axis', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.y-axis-group.axis')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        it('should render a layer for each data entry group', () => {
            const expected = dataset.reduce(differentStacksReducer, []).length;
            const actual = containerFixture.selectAll('.layer').size();

            expect(actual).toEqual(expected);
        });

        it('should render a bar for each data entry', () => {
            const expected = dataset.length;
            const actual = containerFixture.selectAll('.bar').size();

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a two sources dataset', () => {
            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = buildDataSet('with2Sources');
                let actual;

                containerFixture.datum(newDataset).call(stackedBarChart);
                actual = containerFixture.selectAll('.stacked-bar').nodes()
                    .length;

                expect(actual).toEqual(expected);
            });

            it('should render two layers', () => {
                const expected = 2;
                const newDataset = buildDataSet('with2Sources');
                let actual;

                containerFixture.datum(newDataset).call(stackedBarChart);
                actual = containerFixture
                    .selectAll('.stacked-bar .layer')
                    .nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render eight bars total', () => {
                const expected = 8;
                const newDataset = buildDataSet('with2Sources');
                let actual;

                containerFixture.datum(newDataset).call(stackedBarChart);
                actual = containerFixture.selectAll('.stacked-bar .bar').nodes()
                    .length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when stacked bar is animated', () => {
            it('it renders correct number of layers and bars', () => {
                const expectedNLayers = 3;
                const nBarsPerLayer = 4;

                stackedBarChart.isAnimated(true);
                containerFixture.datum(dataset).call(stackedBarChart);

                const actualNLayers = containerFixture
                    .selectAll('.chart-group .layer')
                    .nodes().length;
                const actualNBars = containerFixture
                    .selectAll('.chart-group .bar')
                    .nodes().length;

                expect(actualNLayers).toEqual(expectedNLayers);
                expect(actualNBars).toEqual(expectedNLayers * nBarsPerLayer);
            });
        });

        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const expected = 1;

                stackedBarChart.isLoading(true);
                containerFixture.datum(dataset).call(stackedBarChart);

                const actual = containerFixture
                    .select('.bar-load-state')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when stacked bar has a colorMap', () => {
            const colorMap = {
                sparkling: 'green',
                vivid: 'blue',
                sunny: 'black',
            };

            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('with3Sources');
                stackedBarChart = chart().colorMap(colorMap);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(stackedBarChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper color to each stack', () => {
                const bars = containerFixture
                    .select('.grouped-bar')
                    .selectAll('.bar');

                bars.nodes().forEach((d) => {
                    expect(d.getAttribute('fill')).toEqual(
                        colorMap[d.__data__.stack]
                    );
                });
            });
        });
    });

    describe('Lifecycle', () => {
        // TODO: Review this test with more time, as it fails in Travis only
        xdescribe('when clicking on the chart', () => {
            it('should trigger a callback', () => {
                const chart = containerFixture.select('.stacked-bar');
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCallCount = 1;
                const expectedArgumentsCount = 2;
                let actualCalls;
                let actualArgumentsNumber;

                stackedBarChart.on('customClick', callbackSpy);
                chart.dispatch('click');
                actualCalls = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCalls).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsCount);
            });
        });

        describe('when hovering', () => {
            it('mouseover should trigger a callback', () => {
                const chart = containerFixture.selectAll(
                    '.stacked-bar .chart-group'
                );
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCallCount = 1;
                const expectedArgumentsCount = 2;

                stackedBarChart.on('customMouseOver', callbackSpy);
                chart.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(
                    expectedArgumentsCount
                );
            });

            it('mouseout should trigger a callback', () => {
                const chart = containerFixture.selectAll(
                    '.stacked-bar .chart-group'
                );
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCallCount = 1;
                const expectedArgumentsCount = 2;

                stackedBarChart.on('customMouseOut', callbackSpy);
                chart.dispatch('mouseout');

                expect(callbackSpy.calls.count()).toBe(expectedCallCount);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(
                    expectedArgumentsCount
                );
            });
        });
    });

    describe('API', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = stackedBarChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            stackedBarChart.animationDuration(testAnimationDuration);
            newAnimationDuration = stackedBarChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
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

        it('should provide colorMap getter and setter', () => {
            let previous = stackedBarChart.colorMap(),
                expected = {
                    testName: 'red',
                    testName2: 'black',
                },
                actual;

            stackedBarChart.colorMap(expected);
            actual = stackedBarChart.colorMap();

            expect(previous).not.toBe(expected);
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
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
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

        it('should provide isLoading getter and setter', () => {
            let previous = stackedBarChart.isLoading(),
                expected = true,
                actual;

            stackedBarChart.isLoading(expected);
            actual = stackedBarChart.isLoading();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide margin getter and setter', () => {
            let previous = stackedBarChart.margin(),
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
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
                        right: 20,
                    },
                    actual;

                stackedBarChart.width(expected);
                actual = stackedBarChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });
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

        it('should provide valueLocale getter and setter', () => {
            let defaultLocale = false,
                testLocale = {
                    thousands: '.',
                    grouping: [3],
                    currency: ['$', ''],
                    decimal: '.',
                },
                newLocale;

            stackedBarChart.valueLocale(testLocale);
            newLocale = stackedBarChart.valueLocale();

            expect(defaultLocale).not.toBe(newLocale);
            expect(newLocale).toBe(testLocale);
        });

        it('should provide numberFormat getter and setter', () => {
            let previous = stackedBarChart.numberFormat(),
                expected = 's',
                actual;

            stackedBarChart.numberFormat(expected);
            actual = stackedBarChart.numberFormat();

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
            let defaultYAxisLabelOffset = stackedBarChart.yAxisLabelOffset(),
                testYAxisLabelOffset = -30,
                newYAxisLabelOffset;

            stackedBarChart.yAxisLabelOffset(testYAxisLabelOffset);
            newYAxisLabelOffset = stackedBarChart.yAxisLabelOffset();

            expect(defaultYAxisLabelOffset).not.toBe(newYAxisLabelOffset);
            expect(newYAxisLabelOffset).toBe(testYAxisLabelOffset);
        });
    });
});
