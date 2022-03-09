import * as d3 from 'd3';

import chart from './bar';
import { BarDataBuilder } from './barChartDataBuilder';

const aTestDataSet = () => new BarDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

describe('Bar Chart', () => {
    let barChart, dataset, containerFixture;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = buildDataSet('withLettersFrequency');
        barChart = chart();

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(barChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('Render', () => {
        it('should show a chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture.select('.bar-chart').size();

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

        describe('axis', () => {
            it('should draw an X axis', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.x-axis-group.axis')
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

        it('should draw a bar for each data entry', () => {
            const expected = dataset.length;
            const actual = containerFixture.selectAll('.bar').size();

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a different dataset', () => {
            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = buildDataSet('withColors');
                let actual;

                containerFixture.datum(newDataset).call(barChart);
                actual = containerFixture.selectAll('.bar-chart').size();

                expect(actual).toEqual(expected);
            });

            // This test fails because of the transition on the exit
            it('should render six bars', () => {
                const expected = 6;
                const newDataset = buildDataSet('withColors');
                let actual;

                containerFixture.datum(newDataset).call(barChart);
                actual = containerFixture.selectAll('.bar-chart .bar').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('axis labels', () => {
            it('should show custom x axis label and offset', () => {
                const expectedValue = 'labelValue';
                const expectedOffset = 20;

                barChart
                    .xAxisLabel(expectedValue)
                    .xAxisLabelOffset(expectedOffset);
                containerFixture.datum(dataset).call(barChart);

                const selection = containerFixture.select('.x-axis-label-text');
                const actualValue = selection.text();
                const actualOffset = Number(selection.attr('y'));

                expect(actualValue).toBe(expectedValue);
                expect(actualOffset).toBe(expectedOffset);
            });

            it('should show custom y axis label and offset', () => {
                const expectedValue = 'labelValue';
                const expectedOffset = 20;

                barChart
                    .yAxisLabel(expectedValue)
                    .yAxisLabelOffset(expectedOffset);
                containerFixture.datum(dataset).call(barChart);

                const selection = containerFixture.select('.y-axis-label-text');
                const actualValue = selection.text();
                const actualOffset = Number(selection.attr('y'));

                expect(actualValue).toBe(expectedValue);
                expect(actualOffset).toBe(expectedOffset);
            });

            describe('Locale', () => {
                it('should show the $ sign as a default currency symbol', () => {
                    const newDataset = buildDataSet('withColors');

                    barChart.enableLabels(true).labelsNumberFormat('$,.2f');
                    containerFixture.datum(newDataset).call(barChart);

                    const actual = containerFixture
                        .select('.percentage-label-group text')
                        .text();
                    const expected = '$1.00';

                    expect(actual).toEqual(expected);
                });

                // TODO-locale: We need to figure out how to clear the default formatting, as this
                // test is messing up with the rest of tests
                xdescribe('when the locale is set to nl-NL', () => {
                    afterEach(() => {
                        const USLocale = {
                            decimal: '.',
                            thousands: ',',
                            grouping: [3],
                            currency: ['$', ''],
                        };

                        barChart.locale(USLocale).labelsNumberFormat(',f');
                    });

                    it('should show the € sign', () => {
                        const newDataset = buildDataSet('withColors');
                        const customLocale = {
                            decimal: ',',
                            thousands: '.',
                            grouping: [3],
                            currency: ['€ ', ''],
                        };

                        barChart
                            .labelsNumberFormat('$,.2f')
                            .enableLabels(true)
                            .locale(customLocale);
                        containerFixture.datum(newDataset).call(barChart);

                        const actual = containerFixture
                            .select('.percentage-label-group text')
                            .text();
                        const expected = '€ 1,00';

                        expect(actual).toEqual(expected);
                    });
                });
            });
        });

        describe('when animated', () => {
            it('should show a chart with minimal requirements', () => {
                const expected = 1;
                let actual;

                barChart.isAnimated(true);
                containerFixture.datum(dataset).call(barChart);

                actual = containerFixture.select('.bar-chart').size();

                expect(actual).toEqual(expected);
            });

            it('should draw a bar for each data entry', () => {
                const expected = dataset.length;

                barChart.isAnimated(true);
                containerFixture.datum(dataset).call(barChart);

                const actual = containerFixture.selectAll('.bar').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when horizontal', () => {
            it('should show a chart with minimal requirements', () => {
                const expected = 1;
                let actual;

                barChart.isHorizontal(true);
                containerFixture.datum(dataset).call(barChart);

                actual = containerFixture.select('.bar-chart').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when it has a colorMap', () => {
            const colorMap = {
                Radiating: 'green',
                Opalescent: 'blue',
                Shining: 'black',
                Vibrant: 'yellow',
                Vivid: 'orange',
                Brilliant: 'red',
            };

            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('withColors');
                barChart = chart().colorMap(colorMap);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(barChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper color to each stack', () => {
                const bars = containerFixture.selectAll('.bar');

                bars.nodes().forEach((d) => {
                    expect(d.getAttribute('fill')).toEqual(
                        colorMap[d.__data__.name]
                    );
                });
            });
        });

        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const expected = 1;

                barChart.isLoading(true);
                containerFixture.datum(dataset).call(barChart);

                const actual = containerFixture
                    .select('.bar-load-state')
                    .size();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('Lifecycle', () => {
        describe('when orderingFunction is called', () => {
            it('accepts custom descending order function', () => {
                const orderFunction = (a, b) => b.value - a.value;
                const expected = {
                    name: 'E',
                    value: 0.12702,
                };
                let actual;

                barChart.orderingFunction(orderFunction);
                containerFixture.call(barChart);
                actual = containerFixture.selectAll('.bar-chart .bar').node()
                    .__data__;

                expect(actual.name).toBe(expected.name);
                expect(actual.value).toBe(expected.value);
            });

            it('accepts a custom ascending sorting function', () => {
                const orderFunction = (a, b) => a.value - b.value;
                const expected = {
                    name: 'Z',
                    value: 0.00074,
                };
                let actual;

                barChart.orderingFunction(orderFunction);
                containerFixture.call(barChart);
                actual = containerFixture.selectAll('.bar-chart .bar').node()
                    .__data__;

                expect(actual.name).toBe(expected.name);
                expect(actual.value).toBe(expected.value);
            });
        });

        describe('when hasSingleBarHighlight is called', () => {
            it('should darken the original color of the hovered bar', () => {
                const expectedHasBarHighlight = true;
                const expectedColor = '#7bdcc0';
                const expectedHoverColor = 'rgb(86, 154, 134)';

                const actualHasHover = barChart.hasSingleBarHighlight();
                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const actualColor = bar.attr('fill');

                bar.dispatch('mouseover');
                const actualHoverColor = bar.attr('fill');

                expect(actualHasHover).toBe(expectedHasBarHighlight);
                expect(actualColor).toBe(expectedColor);
                expect(actualHoverColor).toBe(expectedHoverColor);
            });

            it('should keep the same hover color of the hovered bar', () => {
                const expectedHasBarHighlight = false;
                const expectedColor = '#7bdcc0';

                barChart.hasSingleBarHighlight(false);
                const actualHasHover = barChart.hasSingleBarHighlight();
                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const actualColor = bar.attr('fill');

                bar.dispatch('mouseover');
                const hoverColor = bar.attr('fill');

                expect(actualHasHover).toBe(expectedHasBarHighlight);
                expect(actualColor).toBe(expectedColor);
                expect(actualColor).toBe(hoverColor);
            });
        });

        describe('when highlightBarFunction is called', () => {
            it('should change behavior of the hovered bar', () => {
                const expectedHighlightColor = '#ffffff';
                const customHighlightFunction = (barSelection) =>
                    barSelection.attr('fill', expectedHighlightColor);

                barChart.highlightBarFunction(customHighlightFunction);
                const bar = containerFixture.selectAll('.bar:nth-child(1)');

                const beforeHighlightColor = bar.attr('fill');

                bar.dispatch('mouseover');
                const actualHighlightColor = bar.attr('fill');

                expect(actualHighlightColor).toBe(expectedHighlightColor);
                expect(beforeHighlightColor).not.toBe(expectedHighlightColor);
            });

            it('should change the behavior of non-hovered bars when hasSingleBarHighlight is False', () => {
                const expectedHighlightColor = '#ffffff';
                const customHighlightFunction = (barSelection) =>
                    barSelection.attr('fill', expectedHighlightColor);

                barChart.hasSingleBarHighlight(false);
                barChart.highlightBarFunction(customHighlightFunction);
                const barNotHighlighted = containerFixture.selectAll(
                    '.bar:nth-child(1)'
                );
                const barHighlighted = containerFixture.selectAll(
                    '.bar:nth-child(2)'
                );

                const beforeHighlightColor = barNotHighlighted.attr('fill');

                barNotHighlighted.dispatch('mouseover');
                const actualNotHighlightColor = barNotHighlighted.attr('fill');
                const actualHighlightColor = barHighlighted.attr('fill');

                expect(actualHighlightColor).toBe(expectedHighlightColor);
                expect(actualNotHighlightColor).toBe(beforeHighlightColor);
            });
        });

        describe('when custom gradient color schem is applied', () => {
            it('should build the gradient with given colors', () => {
                const expectedGradientColors = ['#ddd', 'ccc'];
                const expectedGradientRefStr = 'url(#bar-gradient';

                barChart.chartGradient(expectedGradientColors);
                containerFixture.datum(dataset).call(barChart);
                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const gradientStopEl = containerFixture
                    .selectAll('stop')
                    .nodes();

                expect(bar.attr('fill')).toContain(expectedGradientRefStr);
                expect(gradientStopEl[0].getAttribute('stop-color')).toEqual(
                    expectedGradientColors[0]
                );
                expect(gradientStopEl[1].getAttribute('stop-color')).toEqual(
                    expectedGradientColors[1]
                );
            });
        });

        describe('when clicking on a bar', () => {
            it('should trigger a callback on mouse click', () => {
                const callbackSpy = jasmine.createSpy('callback');
                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const expectedCalls = 1;
                const expectedArgumentsNumber = 3;
                let actualCalls;
                let actualArgumentsNumber;

                barChart.on('customClick', callbackSpy);
                bar.dispatch('click');
                actualCalls = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCalls).toEqual(expectedCalls);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });
        });

        describe('when hovering a bar', () => {
            it('should trigger a callback on mouse over', () => {
                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;
                let actualCallCount;
                let actualArgumentsNumber;

                barChart.on('customMouseOver', callbackSpy);
                bar.dispatch('mouseover');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse move', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');

                barChart.on('customMouseMove', callbackSpy);
                bar.dispatch('mousemove');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse out', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const bar = containerFixture.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');

                barChart.on('customMouseOut', callbackSpy);
                bar.dispatch('mouseout');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });
        });
    });

    describe('API', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = barChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            barChart.animationDuration(testAnimationDuration);
            newAnimationDuration = barChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide colorSchema getter and setter', () => {
            let previous = barChart.colorSchema(),
                expected = ['#FFFFFF'],
                actual;

            barChart.colorSchema(expected);
            actual = barChart.colorSchema();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should set chartGradient getter and setter', () => {
            let previous = barChart.chartGradient(),
                expected = ['#fff', '#ddd'],
                actual;

            barChart.colorSchema(expected);
            actual = barChart.colorSchema();

            expect(previous).toBe(null);
            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide a colorSchema getter and setter', () => {
            let previous = barChart.colorSchema(),
                expected = ['#FFFFFF'],
                actual;

            barChart.colorSchema(expected);
            actual = barChart.colorSchema();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide colorMap getter and setter', () => {
            let previous = barChart.colorMap(),
                expected = {
                    testName: 'red',
                    testName2: 'black',
                },
                actual;

            barChart.colorMap(expected);
            actual = barChart.colorMap();

            expect(previous).not.toBe(expected);
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
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
                actual;

            barChart.height(expected);
            actual = barChart.height();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide highlightBarFunction getter and setter', () => {
            let previous = barChart.highlightBarFunction(),
                expected = () => {},
                actual;

            barChart.highlightBarFunction(expected);
            actual = barChart.highlightBarFunction();

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

        it('should provide isLoading getter and setter', () => {
            let previous = barChart.isLoading(),
                expected = true,
                actual;

            barChart.isLoading(expected);
            actual = barChart.isLoading();

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

        it('should provide labelsNumberFormat getter and setter', () => {
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

        describe('margin', () => {
            it('should provide margin getter and setter', () => {
                let previous = barChart.margin(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                barChart.margin(expected);
                actual = barChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', function () {
                it('should override the default values', () => {
                    let previous = barChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20,
                        },
                        actual;

                    barChart.width(expected);
                    actual = barChart.width();

                    expect(previous).not.toBe(actual);
                    expect(actual).toEqual(expected);
                });
            });
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

        it('should provide orderingFunction getter and setter', () => {
            let previous = barChart.orderingFunction(),
                expected = () => {},
                actual;

            barChart.orderingFunction(expected);
            actual = barChart.orderingFunction();

            expect(previous).not.toBe(actual);
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

        it('should provide valueLocale getter and setter', () => {
            let defaultLocale = false,
                testLocale = {
                    thousands: '.',
                    grouping: [3],
                    currency: ['$', ''],
                    decimal: '.',
                },
                newLocale;

            barChart.valueLocale(testLocale);
            newLocale = barChart.valueLocale();

            expect(defaultLocale).not.toBe(newLocale);
            expect(newLocale).toBe(testLocale);
        });

        it('should provide width getter and setter', () => {
            let previous = barChart.width(),
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
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

        it('should provide numberFormat getter and setter', () => {
            let previous = barChart.numberFormat(),
                expected = 'd',
                actual;

            barChart.numberFormat(expected);
            actual = barChart.numberFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide hasSingleBarHighlight getter and setter', () => {
            let previous = barChart.hasSingleBarHighlight(),
                expected = false,
                actual;

            barChart.hasSingleBarHighlight(expected);
            actual = barChart.hasSingleBarHighlight();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide xAxisLabel getter and setter', () => {
            let defaultXAxisLabel = 'World',
                testXAxisLabel = 'Hello',
                newXAxisLabel;

            barChart.xAxisLabel(testXAxisLabel);
            newXAxisLabel = barChart.xAxisLabel();

            expect(defaultXAxisLabel).not.toBe(newXAxisLabel);
            expect(newXAxisLabel).toBe(testXAxisLabel);
        });

        it('should provide xAxisLabelOffset getter and setter', () => {
            let defaultXAxisLabelOffset = 30,
                testXAxisLabelOffset = 40,
                newXAxisLabelOffset;

            barChart.xAxisLabelOffset(testXAxisLabelOffset);
            newXAxisLabelOffset = barChart.xAxisLabelOffset();

            expect(defaultXAxisLabelOffset).not.toBe(newXAxisLabelOffset);
            expect(newXAxisLabelOffset).toBe(testXAxisLabelOffset);
        });

        it('should provide yAxisLabel getter and setter', () => {
            let defaultYAxisLabel = 'Hello',
                testYAxisLabel = 'World',
                newYAxisLabel;

            barChart.yAxisLabel(testYAxisLabel);
            newYAxisLabel = barChart.yAxisLabel();

            expect(defaultYAxisLabel).not.toBe(newYAxisLabel);
            expect(newYAxisLabel).toBe(testYAxisLabel);
        });

        it('should provide yAxisLabelOffset getter and setter', () => {
            let defaultYAxisLabelOffset = -40,
                testYAxisLabelOffset = -30,
                newYAxisLabelOffset;

            barChart.yAxisLabelOffset(testYAxisLabelOffset);
            newYAxisLabelOffset = barChart.yAxisLabelOffset();

            expect(defaultYAxisLabelOffset).not.toBe(newYAxisLabelOffset);
            expect(newYAxisLabelOffset).toBe(testYAxisLabelOffset);
        });
    });
});