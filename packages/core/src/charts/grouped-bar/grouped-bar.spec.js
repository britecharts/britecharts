import * as d3 from 'd3';

import chart from './grouped-bar';
import { GroupedBarChartDataBuilder } from './groupedBarChartDataBuilder';

const aTestDataSet = () => new GroupedBarChartDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

const differentDatesReducer = (acc, d) => {
    if (acc.indexOf(d.name) === -1) {
        acc.push(d.name);
    }

    return acc;
};

describe('Grouped Bar Chart', () => {
    let groupedBarChart, dataset, containerFixture;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        dataset = buildDataSet('with3Sources');
        groupedBarChart = chart().grid('full');

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(groupedBarChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
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
            const actual = containerFixture.selectAll('.layer').size();
            const expected = dataset.reduce(differentDatesReducer, []).length;

            expect(actual).toEqual(expected);
        });

        it('should render a bar for each data entry', () => {
            const actual = containerFixture.selectAll('.bar').size();
            const expected = dataset.length;

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a two sources dataset', () => {
            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = buildDataSet('with2Sources');
                let actual;

                containerFixture.datum(newDataset).call(groupedBarChart);
                actual = containerFixture.selectAll('.grouped-bar').size();

                expect(actual).toEqual(expected);
            });

            it('should render four layers', () => {
                const expected = 4;
                const newDataset = buildDataSet('with2Sources');
                let actual;

                containerFixture.datum(newDataset).call(groupedBarChart);
                actual = containerFixture
                    .selectAll('.grouped-bar .layer')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render eight bars total', () => {
                const expected = 8;
                const newDataset = buildDataSet('with2Sources');
                let actual;

                containerFixture.datum(newDataset).call(groupedBarChart);
                actual = containerFixture.selectAll('.grouped-bar .bar').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when grouped bar is animated', () => {
            it('it renders correct number of layers and bars', () => {
                const expectedNLayers = 4;
                const nBarsPerLayer = 3;

                groupedBarChart.isAnimated(true);
                containerFixture.datum(dataset).call(groupedBarChart);

                const actualNLayers = containerFixture
                    .selectAll('.chart-group .layer')
                    .size();
                const actualNBars = containerFixture
                    .selectAll('.chart-group .bar')
                    .size();

                expect(actualNLayers).toEqual(expectedNLayers);
                expect(actualNBars).toEqual(expectedNLayers * nBarsPerLayer);
            });
        });

        describe('when grouped bar has a colorMap', () => {
            const colorMap = {
                Shiny: 'green',
                Radiant: 'blue',
                Luminous: 'black',
            };

            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('with3Sources');
                groupedBarChart = chart().colorMap(colorMap);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(groupedBarChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper color to each group', () => {
                const bars = containerFixture
                    .select('.grouped-bar')
                    .selectAll('.bar');

                bars.nodes().forEach((d) => {
                    expect(d.getAttribute('fill')).toEqual(
                        colorMap[d.__data__.group]
                    );
                });
            });
        });

        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const expected = 1;

                groupedBarChart.isLoading(true);
                containerFixture.datum(dataset).call(groupedBarChart);

                const actual = containerFixture
                    .select('.bar-load-state')
                    .size();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('Lifecycle', () => {
        // TODO: Review this test with more time, as it fails in Travis only
        xdescribe('when clicking on the chart', () => {
            it('should trigger a callback', () => {
                const bar = containerFixture.select('.grouped-bar');
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCalls = 1;
                const expectedArguments = 2;
                let actualCalls;
                let actualArgumentsNumber;

                groupedBarChart.on('customClick', callbackSpy);
                bar.dispatch('click');

                actualCalls = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCalls).toEqual(expectedCalls);
                expect(actualArgumentsNumber).toEqual(expectedArguments);
            });
        });

        describe('when hovering', () => {
            it('mouseover should trigger a callback', () => {
                const chart = containerFixture.selectAll(
                    '.grouped-bar .chart-group'
                );
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCalls = 1;
                const expectedArguments = 2;
                let actualCalls;
                let actualArgumentsNumber;

                groupedBarChart.on('customMouseOver', callbackSpy);
                chart.dispatch('mouseover');
                actualCalls = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCalls).toEqual(expectedCalls);
                expect(actualArgumentsNumber).toEqual(expectedArguments);
            });

            it('mouseout should trigger a callback', () => {
                const chart = containerFixture.selectAll(
                    '.grouped-bar .chart-group'
                );
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCalls = 1;
                const expectedArguments = 2;
                let actualCalls;
                let actualArgumentsNumber;

                groupedBarChart.on('customMouseOut', callbackSpy);
                chart.dispatch('mouseout');
                actualCalls = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCalls).toEqual(expectedCalls);
                expect(actualArgumentsNumber).toEqual(expectedArguments);
            });
        });
    });

    describe('API', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = groupedBarChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            groupedBarChart.animationDuration(testAnimationDuration);
            newAnimationDuration = groupedBarChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide bar padding getter and setter', () => {
            let previous = groupedBarChart.betweenBarsPadding(),
                expected = 0.5,
                actual;

            groupedBarChart.betweenBarsPadding(expected);
            actual = groupedBarChart.betweenBarsPadding();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide bar group padding getter and setter', () => {
            let previous = groupedBarChart.betweenGroupsPadding(),
                expected = 0.5,
                actual;

            groupedBarChart.betweenGroupsPadding(expected);
            actual = groupedBarChart.betweenGroupsPadding();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide colorMap getter and setter', () => {
            let previous = groupedBarChart.colorMap(),
                expected = {
                    testName: 'red',
                    testName2: 'black',
                },
                actual;

            groupedBarChart.colorMap(expected);
            actual = groupedBarChart.colorMap();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide colorSchema getter and setter', () => {
            let previous = groupedBarChart.colorSchema(),
                expected = ['pink', 'red', 'magenta'],
                actual;

            groupedBarChart.colorSchema(expected);
            actual = groupedBarChart.colorSchema();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide group label getter and setter', () => {
            let previous = groupedBarChart.groupLabel(),
                expected = 'label',
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
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
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

        it('should provide isLoading getter and setter', () => {
            let previous = groupedBarChart.isLoading(),
                expected = true,
                actual;

            groupedBarChart.isLoading(expected);
            actual = groupedBarChart.isLoading();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide margin getter and setter', () => {
            let previous = groupedBarChart.margin(),
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
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
                        right: 20,
                    },
                    actual;

                groupedBarChart.width(expected);
                actual = groupedBarChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });
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

        it('should provide numberFormat getter and setter', () => {
            let previous = groupedBarChart.numberFormat(),
                expected = 's',
                actual;

            groupedBarChart.numberFormat(expected);
            actual = groupedBarChart.numberFormat();

            expect(previous).not.toBe(expected);
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

        it('should provide valueLocale getter and setter', () => {
            let defaultLocale = false,
                testLocale = {
                    thousands: '.',
                    grouping: [3],
                    currency: ['$', ''],
                    decimal: '.',
                },
                newLocale;

            groupedBarChart.valueLocale(testLocale);
            newLocale = groupedBarChart.valueLocale();

            expect(defaultLocale).not.toBe(newLocale);
            expect(newLocale).toBe(testLocale);
        });

        it('should provide width getter and setter', () => {
            let previous = groupedBarChart.width(),
                expected = 200,
                actual;

            groupedBarChart.width(expected);
            actual = groupedBarChart.width();

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

        it('should provide yAxisLabel getter and setter', () => {
            let previous = groupedBarChart.yAxisLabel(),
                expected = 'valueSet',
                actual;

            groupedBarChart.yAxisLabel(expected);
            actual = groupedBarChart.yAxisLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide yAxisLabelOffset getter and setter', () => {
            let previous = groupedBarChart.yAxisLabelOffset(),
                expected = [2],
                actual;

            groupedBarChart.yAxisLabelOffset(expected);
            actual = groupedBarChart.yAxisLabelOffset();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide yTicks getter and setter', () => {
            let previous = groupedBarChart.yTicks(),
                expected = 4,
                actual;

            groupedBarChart.yTicks(expected);
            actual = groupedBarChart.yTicks();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });
    });
});
