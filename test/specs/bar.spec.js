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
        });

        describe('when hasSingleBarHighlight is called', () => {

            it('should darken the original color of the hovered bar', () => {
                let expectedHasBarHighlight = true;
                let expectedColor = '#7bdcc0';
                let expectedHoverColor = 'rgb(86, 154, 134)';

                let actualHasHover = barChart.hasSingleBarHighlight();
                let bar = containerFixture.selectAll('.bar:nth-child(1)');

                let actualColor = bar.attr('fill');

                bar.dispatch('mouseover');
                let actualHoverColor = bar.attr('fill');

                expect(actualHasHover).toBe(expectedHasBarHighlight);
                expect(actualColor).toBe(expectedColor);
                expect(actualHoverColor).toBe(expectedHoverColor);
            });

            it('should keep the same hover color of the hovered bar', () => {
                let expectedHasBarHighlight = false;
                let expectedColor = '#7bdcc0';

                barChart.hasSingleBarHighlight(false);
                let actualHasHover = barChart.hasSingleBarHighlight();
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let actualColor = bar.attr('fill');

                bar.dispatch('mouseover');
                let hoverColor = bar.attr('fill');

                expect(actualHasHover).toBe(expectedHasBarHighlight);
                expect(actualColor).toBe(expectedColor);
                expect(actualColor).toBe(hoverColor);
            });
        });

        describe('when highlightBarFunction is called', () => {

            it('should change behavior of the hovered bar', () => {
                let expectedHighlightColor = '#ffffff';
                let customHighlightFunction = barSelection => barSelection.attr('fill', expectedHighlightColor);

                barChart.highlightBarFunction(customHighlightFunction);
                let bar = containerFixture.selectAll('.bar:nth-child(1)');

                let beforeHighlightColor = bar.attr('fill');

                bar.dispatch('mouseover');
                let actualHighlightColor = bar.attr('fill');

                expect(actualHighlightColor).toBe(expectedHighlightColor);
                expect(beforeHighlightColor).not.toBe(expectedHighlightColor);
            });

            it('should change the behavior of non-hovered bars when hasSingleBarHighlight is False', () => {
                let expectedHighlightColor = '#ffffff';
                let customHighlightFunction = barSelection => barSelection.attr('fill', expectedHighlightColor);

                barChart.hasSingleBarHighlight(false);
                barChart.highlightBarFunction(customHighlightFunction);
                let barNotHighlighted = containerFixture.selectAll('.bar:nth-child(1)');
                let barHighlighted = containerFixture.selectAll('.bar:nth-child(2)');

                let beforeHighlightColor = barNotHighlighted.attr('fill');

                barNotHighlighted.dispatch('mouseover');
                let actualNotHighlightColor = barNotHighlighted.attr('fill');
                let actualHighlightColor = barHighlighted.attr('fill');

                expect(actualHighlightColor).toBe(expectedHighlightColor);
                expect(actualNotHighlightColor).toBe(beforeHighlightColor);
            });
        });

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
                expect(actual).toEqual(expected);
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

            it('should provide hasSingleBarHighlight getter and setter', () =>{
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

        describe('when custom gradient color schem is applied', () => {

            it('should build the gradient with given colors', () => {
                let expectedGradientColors = ['#ddd', 'ccc'];
                let expectedGradientRefStr = 'url(#bar-gradient';

                barChart.chartGradient(expectedGradientColors);
                containerFixture.datum(dataset).call(barChart);
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let gradientStopEl = containerFixture.selectAll('stop').nodes();

                expect(bar.attr('fill')).toContain(expectedGradientRefStr);
                expect(gradientStopEl[0]).toHaveAttr('stop-color', expectedGradientColors[0]);
                expect(gradientStopEl[1]).toHaveAttr('stop-color', expectedGradientColors[1]);
            });
        });

        describe('when margins are set partially', function() {

            it('should override the default values', () => {
                let previous = barChart.margin(),
                expected = {
                    ...previous,
                    top: 10,
                    right: 20
                },
                actual;

                barChart.width(expected);
                actual = barChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            })
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

        describe('Bar axis labels', () => {

            it('should show custom x axis label and offset', () => {
                let expectedValue = 'labelValue';
                let expectedOffset = 20;

                barChart
                    .xAxisLabel(expectedValue)
                    .xAxisLabelOffset(expectedOffset);
                containerFixture.datum(dataset).call(barChart);

                let selection = containerFixture.select('.x-axis-label-text');
                let actualValue = selection.text();
                let actualOffset = Number(selection.attr('y'));

                expect(actualValue).toBe(expectedValue);
                expect(actualOffset).toBe(expectedOffset);
            });

            it('should show custom y axis label and offset', () => {
                let expectedValue = 'labelValue';
                let expectedOffset = 20;

                barChart
                    .yAxisLabel(expectedValue)
                    .yAxisLabelOffset(expectedOffset);
                containerFixture.datum(dataset).call(barChart);

                let selection = containerFixture.select('.y-axis-label-text');
                let actualValue = selection.text();
                let actualOffset = Number(selection.attr('y'));

                expect(actualValue).toBe(expectedValue);
                expect(actualOffset).toBe(expectedOffset);
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
