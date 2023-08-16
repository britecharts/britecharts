import _ from 'underscore';
import * as d3 from 'd3';

import stackedArea from './stacked-area';
import { StackedAreaDataBuilder } from './stackedAreaDataBuilder';

const aTestDataSet = () => new StackedAreaDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};
const hasClass = (element, className) => {
    return _.contains(element.node().classList, className);
};

describe('Stacked Area Chart', () => {
    let dataset, containerFixture, stackedAreaChart;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = aTestDataSet().withReportData().build();
        stackedAreaChart = stackedArea();

        containerFixture = d3.select('.test-container').append('svg');
        containerFixture.datum(dataset).call(stackedAreaChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('Render', () => {
        it('should show a stacked area chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture.select('.stacked-area').size();

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

        describe('grid', function () {
            it('should not draw horizontal grid line', () => {
                const expected = 0;
                const actual = containerFixture
                    .select('.horizontal-grid-line')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should not draw vertical grid line', () => {
                const expected = 0;
                const actual = containerFixture
                    .select('.vertical-grid-line')
                    .size();

                expect(actual).toEqual(expected);
            });

            describe('when grid is horizontal', function () {
                beforeEach(function () {
                    dataset = aTestDataSet().withReportData().build();
                    stackedAreaChart = stackedArea().grid('horizontal');

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(stackedAreaChart);
                });

                it('should render the horizontal grid lines', () => {
                    expect(
                        containerFixture.select('g.grid.horizontal').empty(),
                    ).toBeFalsy();
                    expect(
                        containerFixture.select('g.grid.vertical').empty(),
                    ).toBeTruthy();
                });

                it('0-axis is NOT highlighted with an additional class', () => {
                    expect(
                        containerFixture
                            .select('.horizontal-grid-line--highlighted')
                            .empty(),
                    ).toBeTruthy();
                });

                describe('when x-axis value type is number', () => {
                    beforeEach(function () {
                        dataset = aTestDataSet().withNumericKeys().build();
                        stackedAreaChart =
                            stackedArea().xAxisValueType('number');

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(stackedAreaChart);
                    });

                    it('the highest X-axis value is a number', () => {
                        let yAxis = containerFixture.selectAll('.x-axis-group');
                        let text = yAxis.select('g.tick:last-child');

                        expect(text.text()).toEqual('12M');
                    });
                });

                describe('when x-axis value type is number and scale is logarithmic', () => {
                    beforeEach(function () {
                        dataset = aTestDataSet().withNumericKeys().build();
                        stackedAreaChart = stackedArea()
                            .xAxisValueType('number')
                            .xAxisScale('logarithmic');

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(stackedAreaChart);
                    });

                    it('the highest X-axis value is a logarithmic number', () => {
                        let yAxis = containerFixture.selectAll('.x-axis-group');
                        let text = yAxis.select('g.tick:last-child');

                        expect(text.text()).toEqual('10^7');
                    });
                });
            });

            describe('when grid is vertical', function () {
                beforeEach(function () {
                    dataset = aTestDataSet().withReportData().build();
                    stackedAreaChart = stackedArea().grid('vertical');

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(stackedAreaChart);
                });

                it('should render the vertical grid lines', () => {
                    expect(
                        containerFixture.select('g.grid.horizontal').empty(),
                    ).toBeTruthy();
                    expect(
                        containerFixture.select('g.grid.vertical').empty(),
                    ).toBeFalsy();
                });
            });

            describe('when grid is full', function () {
                beforeEach(function () {
                    dataset = aTestDataSet().withReportData().build();
                    stackedAreaChart = stackedArea().grid('full');

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(stackedAreaChart);
                });

                it('should render the vertical grid lines', () => {
                    expect(
                        containerFixture.select('g.grid.horizontal').empty(),
                    ).toBeFalsy();
                    expect(
                        containerFixture.select('g.grid.vertical').empty(),
                    ).toBeFalsy();
                });
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

            it('should draw a month X axis', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.x-axis-group .axis.sub-x')
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

        it('should render an area for each category', () => {
            const expected = _.chain(dataset)
                .pluck('name')
                .unique()
                .value().length;
            const actual = containerFixture.selectAll('.layer').size();

            expect(actual).toEqual(expected);
        });

        it('should render an area-outline for each category', () => {
            const expected = _.chain(dataset)
                .pluck('name')
                .unique()
                .value().length;
            const actual = containerFixture.selectAll('.area-outline').size();

            expect(actual).toEqual(expected);
        });

        it('should render areas and areas outlines that follow the same path', () => {
            const layerContainerNodes = containerFixture
                .selectAll('.layer-container')
                .nodes();

            layerContainerNodes.forEach((layerContainerNode) => {
                const areaPath =
                    layerContainerNode.childNodes[0].attributes.d.value;
                const areaOutlinePath =
                    layerContainerNode.childNodes[1].attributes.d.value;

                expect(areaPath).toContain(areaOutlinePath);
            });
        });

        describe('overlay', () => {
            it('should render an overlay to trigger the hover effect', () => {
                const expected = 1;
                const actual = containerFixture.select('.overlay').size();

                expect(actual).toEqual(expected);
            });
        });

        it('should render a vertical marker container', () => {
            const expected = 1;
            const actual = containerFixture
                .select('.vertical-marker-container')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should render a vertical marker', () => {
            const expected = 1;
            const actual = containerFixture.select('.vertical-marker').size();

            expect(actual).toEqual(expected);
        });

        it('should be able to render even when data is length 0', () => {
            expect(() =>
                containerFixture.datum([]).call(stackedAreaChart),
            ).not.toThrow();
        });

        describe('stacked area outline', () => {
            it('should not render outline if hasOutline is false', () => {
                const expected = 1;
                const newDataset = buildDataSet('with3Sources');
                let actual;

                containerFixture.datum(newDataset).call(stackedAreaChart);
                actual = containerFixture.selectAll('.stacked-area').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when reloading with a three sources dataset', () => {
            it('should render in the same svg', function () {
                const expected = 'none';
                let actual;

                stackedAreaChart.hasOutline(false);
                containerFixture.datum(dataset).call(stackedAreaChart);

                const outlines = containerFixture.selectAll('.area-outline');

                actual = outlines.style('display');

                expect(actual).toEqual(expected);
            });

            it('should render three layers', function () {
                const expected = 3;
                const newDataset = buildDataSet('with3Sources');
                let actual;

                containerFixture.datum(newDataset).call(stackedAreaChart);
                actual = containerFixture
                    .selectAll('.stacked-area .layer')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render three area outlines', function () {
                const expected = 3;
                const newDataset = buildDataSet('with3Sources');
                let actual;

                containerFixture.datum(newDataset).call(stackedAreaChart);
                actual = containerFixture
                    .selectAll('.stacked-area .area-outline')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when has negative values', () => {
            beforeEach(function () {
                dataset = aTestDataSet().withNegativeValues().build();
                stackedAreaChart = stackedArea().grid('full');

                containerFixture = d3.select('.test-container').append('svg');
                containerFixture.datum(dataset).call(stackedAreaChart);
            });

            it('The lowest Y-axis value is negative', () => {
                let yAxis = containerFixture.selectAll('.y-axis-group');
                let text = yAxis.select('g.tick');
                const expected = d3.format('0')('-15');

                expect(text.text()).toEqual(expected);
            });

            it('0-axis is highlighted with an additional class', () => {
                expect(
                    containerFixture
                        .select('.horizontal-grid-line--highlighted')
                        .empty(),
                ).toBeFalsy();
            });
        });

        describe('when has a modified y-axis baseline', () => {
            describe('and baseline is smaller', () => {
                beforeEach(function () {
                    dataset = aTestDataSet().withNegativeValues().build();
                    stackedAreaChart = stackedArea()
                        .grid('full')
                        .yAxisBaseline(-30);

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(stackedAreaChart);
                });

                it('the lowest Y-axis value is changing in respect to the y-axis baseline', () => {
                    let firstText = containerFixture
                        .selectAll('.y-axis-group')
                        .select('g.tick');

                    const expected = d3.format('0')('-30');
                    expect(firstText.text()).toEqual(expected);
                });
            });

            describe('and baseline is bigger', () => {
                beforeEach(function () {
                    dataset = aTestDataSet().withNegativeValues().build();
                    stackedAreaChart = stackedArea()
                        .grid('full')
                        .yAxisBaseline(100);

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(stackedAreaChart);
                });

                it('the highest Y-axis value is changing in respect to the y-axis baseline', () => {
                    let firstText = containerFixture
                        .selectAll('.y-axis-group')
                        .select('g.tick:last-child');

                    expect(firstText.text()).toEqual('100');
                });
            });
        });

        describe('when has a colorMap', () => {
            const colorMap = {
                Blazing: 'green',
                Shimmering: 'blue',
                Brilliant: 'black',
            };

            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                const newDataset = buildDataSet('with3Sources');

                stackedAreaChart = stackedArea().colorMap(colorMap);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(newDataset).call(stackedAreaChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper color to each stack', () => {
                const layers = containerFixture.selectAll(
                    '.stacked-area .layer',
                );

                layers.nodes().forEach((d) => {
                    expect(d.getAttribute('fill')).toEqual(
                        colorMap[d.__data__.key],
                    );
                });
            });
        });

        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const expected = 1;

                stackedAreaChart.isLoading(true);
                containerFixture.datum(dataset).call(stackedAreaChart);

                const actual = containerFixture
                    .select('.stacked-area-load-state')
                    .size();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('Lifecycle', () => {
        it('should show the overlay when the mouse is hovering', () => {
            const container = containerFixture.selectAll('svg');
            const expectedDefaultStyle = 'none';
            const expectedStyle = 'block';

            expect(
                containerFixture.select('.overlay').style('display'),
            ).toEqual(expectedDefaultStyle);
            container.dispatch('mouseover');
            expect(
                containerFixture.select('.overlay').style('display'),
            ).toEqual(expectedStyle);
        });

        it('should show a vertical line where the mouse is hovering', () => {
            const expected = true;
            const container = containerFixture.selectAll('svg');
            const verticalLine = d3.select(
                '.vertical-marker-container .vertical-marker',
            );
            let actual;

            container.dispatch('mouseover');
            actual = hasClass(verticalLine, 'bc-is-active');

            expect(actual).toEqual(expected);
        });

        it('should hide the vertical marker when the mouse is out', () => {
            const container = containerFixture.selectAll('svg');
            const verticalLine = d3.select(
                '.vertical-marker-container .vertical-marker',
            );
            const expected = false;
            let actual = hasClass(verticalLine, 'bc-is-active');

            expect(actual).toEqual(expected);
            container.dispatch('mouseover');
            actual = hasClass(verticalLine, 'bc-is-active');
            expect(actual).toEqual(true);
            container.dispatch('mouseout');
            actual = hasClass(verticalLine, 'bc-is-active');
            expect(actual).toEqual(expected);
        });

        it('should trigger an event on hover', () => {
            const callback = jasmine.createSpy('hoverCallback');
            const container = containerFixture.selectAll('svg');
            const expectedCallCount = 1;
            const expectedArgumentCount = 2;

            stackedAreaChart.on('customMouseOver', callback);
            container.dispatch('mouseover');

            expect(callback.calls.count()).toEqual(expectedCallCount);
            expect(callback.calls.allArgs()[0].length).toEqual(
                expectedArgumentCount,
            );
        });

        it('should trigger an event on mouse out', () => {
            const callback = jasmine.createSpy('mouseOutCallback');
            const container = containerFixture.selectAll('svg');
            const expectedCallCount = 1;
            const expectedArgumentCount = 2;

            stackedAreaChart.on('customMouseOut', callback);
            container.dispatch('mouseout');

            expect(callback.calls.count()).toEqual(expectedCallCount);
            expect(callback.calls.allArgs()[0].length).toEqual(
                expectedArgumentCount,
            );
        });

        it('should trigger an event on touchmove', () => {
            const callback = jasmine.createSpy('touchMoveCallback');
            const container = containerFixture.selectAll('svg');
            const expectedCallCount = 1;
            const expectedArgumentCount = 2;

            stackedAreaChart.on('customTouchMove', callback);
            container.dispatch('touchmove');

            expect(callback.calls.count()).toEqual(expectedCallCount);
            expect(callback.calls.allArgs()[0].length).toEqual(
                expectedArgumentCount,
            );
        });
    });

    describe('API', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = stackedAreaChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            stackedAreaChart.animationDuration(testAnimationDuration);
            newAnimationDuration = stackedAreaChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide areaCurve getter and setter', () => {
            let previous = stackedAreaChart.areaCurve(),
                expected = 'step',
                actual;

            stackedAreaChart.areaCurve(expected);
            actual = stackedAreaChart.areaCurve();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide areaOpacity getter and setter', () => {
            let previous = stackedAreaChart.areaOpacity(),
                expected = 0.5,
                actual;

            stackedAreaChart.areaOpacity(expected);
            actual = stackedAreaChart.areaOpacity();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        describe('export chart functionality', () => {
            it('should have exportChart defined', () => {
                expect(stackedAreaChart.exportChart).toBeDefined();
            });
        });

        it('should provide colorMap getter and setter', () => {
            let previous = stackedAreaChart.colorMap(),
                expected = {
                    testName: 'red',
                    testName2: 'black',
                },
                actual;

            stackedAreaChart.colorMap(expected);
            actual = stackedAreaChart.colorMap();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a colorSchema getter and setter', () => {
            let previous = stackedAreaChart.colorSchema(),
                expected = ['#ffffff', '#fafefc', '#000000'],
                actual;

            stackedAreaChart.colorSchema(expected);
            actual = stackedAreaChart.colorSchema();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide dateLabel getter and setter', () => {
            let previous = stackedAreaChart.dateLabel(),
                expected = 'dateFull',
                actual;

            stackedAreaChart.dateLabel(expected);
            actual = stackedAreaChart.dateLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide emptyDataConfig getter and setter', () => {
            let previous = stackedAreaChart.emptyDataConfig(),
                expected = {
                    minDate: Date.now(),
                    maxDate: Date.now(),
                    maxY: 100,
                },
                actual;

            stackedAreaChart.emptyDataConfig(expected);
            actual = stackedAreaChart.emptyDataConfig();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide grid mode getter and setter', () => {
            let previous = stackedAreaChart.grid(),
                expected = 'vertical',
                actual;

            stackedAreaChart.grid(expected);
            actual = stackedAreaChart.grid();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide height getter and setter', () => {
            let previous = stackedAreaChart.height(),
                expected = 200,
                actual;

            stackedAreaChart.height(expected);
            actual = stackedAreaChart.height();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide isLoading getter and setter', () => {
            let previous = stackedAreaChart.isLoading(),
                expected = true,
                actual;

            stackedAreaChart.isLoading(expected);
            actual = stackedAreaChart.isLoading();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide isAnimated getter and setter', () => {
            let previous = stackedAreaChart.isAnimated(),
                expected = true,
                actual;

            stackedAreaChart.isAnimated(expected);
            actual = stackedAreaChart.isAnimated();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide keyLabel getter and setter', () => {
            let previous = stackedAreaChart.keyLabel(),
                expected = 'val',
                actual;

            stackedAreaChart.keyLabel(expected);
            actual = stackedAreaChart.keyLabel();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        describe('when margins are set partially', function () {
            it('should override the default values', () => {
                let previous = stackedAreaChart.margin(),
                    expected = {
                        ...previous,
                        top: 10,
                        right: 20,
                    },
                    actual;

                stackedAreaChart.width(expected);
                actual = stackedAreaChart.width();

                expect(previous).not.toEqual(actual);
                expect(actual).toEqual(expected);
            });
        });

        it('should provide a locale getter and setter', () => {
            let previous = stackedAreaChart.locale(),
                expected = 'es',
                actual;

            stackedAreaChart.locale(expected);
            actual = stackedAreaChart.locale();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide margin getter and setter', () => {
            let previous = stackedAreaChart.margin(),
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
                actual;

            stackedAreaChart.margin(expected);
            actual = stackedAreaChart.margin();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide a tooltip threshold getter and setter', () => {
            let previous = stackedAreaChart.tooltipThreshold(),
                expected = 600,
                actual;

            stackedAreaChart.tooltipThreshold(expected);
            actual = stackedAreaChart.tooltipThreshold();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide a topicsOrder getter and setter', () => {
            let previous = stackedAreaChart.topicsOrder(),
                expected = [
                    'twitter',
                    'user_email',
                    'user_newsletter',
                    'unknown',
                    'google',
                    'facebook',
                ],
                actual;

            stackedAreaChart.topicsOrder(expected);
            actual = stackedAreaChart.topicsOrder();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide valueLabel getter and setter', () => {
            let previous = stackedAreaChart.valueLabel(),
                expected = 'quantity',
                actual;

            stackedAreaChart.valueLabel(expected);
            actual = stackedAreaChart.valueLabel();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide width getter and setter', () => {
            let previous = stackedAreaChart.width(),
                expected = 200,
                actual;

            stackedAreaChart.width(expected);
            actual = stackedAreaChart.width();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide a xAxisCustomFormat getter and setter', () => {
            let previous = stackedAreaChart.xAxisCustomFormat(),
                expected = '%d %b',
                actual;

            stackedAreaChart.xAxisCustomFormat(expected);
            actual = stackedAreaChart.xAxisCustomFormat();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide a xAxisFormat getter and setter', () => {
            let previous = stackedAreaChart.xAxisFormat(),
                expected = stackedAreaChart.axisTimeCombinations.HOUR_DAY,
                actual;

            stackedAreaChart.xAxisFormat(expected);
            actual = stackedAreaChart.xAxisFormat();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide a xTicks getter and setter', () => {
            let previous = stackedAreaChart.xTicks(),
                expected = 2,
                actual;

            stackedAreaChart.xTicks(expected);
            actual = stackedAreaChart.xTicks();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide yTicks getter and setter', () => {
            let previous = stackedAreaChart.yTicks(),
                expected = 3,
                actual;

            stackedAreaChart.yTicks(expected);
            actual = stackedAreaChart.yTicks();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide hasOutline getter and setter', () => {
            let previous = stackedAreaChart.hasOutline(),
                expected = false,
                actual;

            stackedAreaChart.hasOutline(expected);
            actual = stackedAreaChart.hasOutline();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide yAxisLabel getter and setter', () => {
            let defaultYAxisLabel = 'Hello',
                testYAxisLabel = 'World',
                newYAxisLabel;

            stackedAreaChart.yAxisLabel(testYAxisLabel);
            newYAxisLabel = stackedAreaChart.yAxisLabel();

            expect(defaultYAxisLabel).not.toBe(newYAxisLabel);
            expect(newYAxisLabel).toBe(testYAxisLabel);
        });

        it('should provide yAxisLabelOffset getter and setter', () => {
            let defaultYAxisLabelOffset = stackedAreaChart.yAxisLabelOffset(),
                testYAxisLabelOffset = -30,
                newYAxisLabelOffset;

            stackedAreaChart.yAxisLabelOffset(testYAxisLabelOffset);
            newYAxisLabelOffset = stackedAreaChart.yAxisLabelOffset();

            expect(defaultYAxisLabelOffset).not.toEqual(newYAxisLabelOffset);
            expect(newYAxisLabelOffset).toEqual(testYAxisLabelOffset);
        });

        it('should provide yAxisBaseline getter and setter', () => {
            let defaultYAxisBaseline = stackedAreaChart.yAxisBaseline(),
                testYAxisBaseline = -30,
                newYAxisBaseline;

            stackedAreaChart.yAxisBaseline(testYAxisBaseline);
            newYAxisBaseline = stackedAreaChart.yAxisBaseline();

            expect(defaultYAxisBaseline).not.toEqual(newYAxisBaseline);
            expect(newYAxisBaseline).toEqual(testYAxisBaseline);
        });

        it('should provide xAxisValueType getter and setter', () => {
            let defaultXAxisValueType = stackedAreaChart.yAxisLabelOffset(),
                testXAxisValueType = 'number',
                newXAxisValueType;

            stackedAreaChart.yAxisLabelOffset(testXAxisValueType);
            newXAxisValueType = stackedAreaChart.yAxisLabelOffset();

            expect(defaultXAxisValueType).not.toEqual(newXAxisValueType);
            expect(newXAxisValueType).toEqual(testXAxisValueType);
        });

        it('should provide xAxisScale getter and setter', () => {
            let defaultXAxisScale = stackedAreaChart.xAxisScale(),
                testXAxisScale = 'logarithmic',
                newXAxisScale;

            stackedAreaChart.xAxisScale(testXAxisScale);
            newXAxisScale = stackedAreaChart.xAxisScale();

            expect(defaultXAxisScale).not.toEqual(newXAxisScale);
            expect(newXAxisScale).toEqual(testXAxisScale);
        });

        it('default of xAxisValueType should be "date"', () => {
            let current = stackedAreaChart.xAxisValueType();

            expect(current).toBe('date');
        });
    });
});
