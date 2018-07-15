define(['d3', 'heatmap', 'heatmapChartDataBuilder'], function (d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.HeatmapDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
        [dataSetName]()
            .build();
    };


    describe('Heatmap Chart', () => {
        let heatmapChart, dataset, container, f;

        beforeEach(() => {
            dataset = buildDataSet('withWeeklyData');
            heatmapChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            container = d3.select('.test-container');
            container.datum(dataset).call(heatmapChart);
        });

        afterEach(() => {
            container.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('when render', () => {

            it('should render a heatmap', () => {
                let expected = 1;
                let actual = container.select('.heatmap').nodes().length;

                expect(actual).toEqual(expected);
            });

            xit('should render container, axis and chart groups', () => {
                expect(container.select('g.container-group').empty()).toBeFalsy();
                expect(container.select('g.chart-group').empty()).toBeFalsy();
                expect(container.select('g.x-axis-group').empty()).toBeFalsy();
                expect(container.select('g.y-axis-group').empty()).toBeFalsy();
                expect(container.select('g.grid-lines-group').empty()).toBeFalsy();
                expect(container.select('g.metadata-group').empty()).toBeFalsy();
            });

            xit('should render grid lines', () => {
                expect(container.select('.horizontal-grid-line').empty()).toBeFalsy();
            });

            xit('should render an X and Y axis', () => {
                expect(container.select('.x-axis-group.axis').empty()).toBeFalsy();
                expect(container.select('.y-axis-group.axis').empty()).toBeFalsy();
            });

            xit('should render a bar for each data entry', () => {
                let numBars = dataset.length;

                expect(container.selectAll('.bar').size()).toEqual(numBars);
            });

            xdescribe('when reloading with a different dataset', () => {

                it('should render in the same svg', function () {
                    let actual;
                    let expected = 1;
                    let newDataset = buildDataSet('withColors');

                    container.datum(newDataset).call(heatmapChart);

                    actual = container.selectAll('.bar-chart').nodes().length;

                    expect(actual).toEqual(expected);
                });

                // This test fails because of the transition on the exit
                xit('should render six bars', function () {
                    let actual;
                    let expected = 6;
                    let newDataset = buildDataSet('withColors');

                    container.datum(newDataset).call(heatmapChart);

                    actual = container.selectAll('.bar-chart .bar').nodes().length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        xdescribe('API', function () {

            it('should provide colorSchema getter and setter', () => {
                let previous = heatmapChart.colorSchema(),
                    expected = ['#FFFFFF'],
                    actual;

                heatmapChart.colorSchema(expected);
                actual = heatmapChart.colorSchema();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should set chartGradient getter and setter', () => {
                let previous = heatmapChart.chartGradient(),
                    expected = ['#fff', '#ddd'],
                    actual;

                heatmapChart.colorSchema(expected);
                actual = heatmapChart.colorSchema();

                expect(previous).toBe(null);
                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should update color', () => {
                let previous = heatmapChart.colorSchema(),
                    expected = '#FFFFFF',
                    actual;

                heatmapChart.colorSchema([expected]);

                const barColor = container.select('rect.bar');

                container.call(heatmapChart);
                actual = barColor.attr('fill');

                expect(actual).toBe(expected);
            });

            it('should provide enable labels getter and setter', () => {
                let previous = heatmapChart.enableLabels(),
                    expected = true,
                    actual;

                heatmapChart.enableLabels(expected);
                actual = heatmapChart.enableLabels();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should have exportChart defined', () => {
                expect(heatmapChart.exportChart).toBeDefined();
            });

            it('should provide height getter and setter', () => {
                let previous = heatmapChart.height(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                heatmapChart.height(expected);
                actual = heatmapChart.height();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide horizontal direction getter and setter', () => {
                let previous = heatmapChart.isHorizontal(),
                    expected = true,
                    actual;

                heatmapChart.isHorizontal(expected);
                actual = heatmapChart.isHorizontal();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide isAnimated getter and setter', () => {
                let previous = heatmapChart.isAnimated(),
                    expected = true,
                    actual;

                heatmapChart.isAnimated(expected);
                actual = heatmapChart.isAnimated();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide labelsMargin getter and setter', () => {
                let previous = heatmapChart.labelsMargin(),
                    expected = 10,
                    actual;

                heatmapChart.labelsMargin(expected);
                actual = heatmapChart.labelsMargin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide labelsNumberFormat getter and setter', () => {
                let previous = heatmapChart.labelsNumberFormat(),
                    expected = 'd',
                    actual;

                heatmapChart.labelsNumberFormat(expected);
                actual = heatmapChart.labelsNumberFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide labelsSize getter and setter', () => {
                let previous = heatmapChart.labelsSize(),
                    expected = 10,
                    actual;

                heatmapChart.labelsSize(expected);
                actual = heatmapChart.labelsSize();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = heatmapChart.margin(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                heatmapChart.margin(expected);
                actual = heatmapChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });

            it('should provide loadingState getter and setter', () => {
                let previous = heatmapChart.loadingState(),
                    expected = 'test',
                    actual;

                heatmapChart.loadingState(expected);
                actual = heatmapChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide padding getter and setter', () => {
                let previous = heatmapChart.betweenBarsPadding(),
                    expected = 0.5,
                    actual;

                heatmapChart.betweenBarsPadding(expected);
                actual = heatmapChart.betweenBarsPadding();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide nameLabel getter and setter', () => {
                let previous = heatmapChart.nameLabel(),
                    expected = 'key',
                    actual;

                heatmapChart.nameLabel(expected);
                actual = heatmapChart.nameLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a percentageAxisToMaxRatio getter and setter', () => {
                let previous = heatmapChart.percentageAxisToMaxRatio(),
                    expected = 1.5,
                    actual;

                heatmapChart.percentageAxisToMaxRatio(expected);
                actual = heatmapChart.percentageAxisToMaxRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a shouldReverseColorList getter and setter', () => {
                let previous = heatmapChart.shouldReverseColorList(),
                    expected = false,
                    actual;

                heatmapChart.shouldReverseColorList(expected);
                actual = heatmapChart.shouldReverseColorList();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide an hasPercentage getter and setter', () => {
                let previous = heatmapChart.hasPercentage(),
                    expected = true,
                    actual;

                heatmapChart.hasPercentage(expected);
                actual = heatmapChart.hasPercentage();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let previous = heatmapChart.valueLabel(),
                    expected = 'quantity',
                    actual;

                heatmapChart.valueLabel(expected);
                actual = heatmapChart.valueLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = heatmapChart.width(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                heatmapChart.width(expected);
                actual = heatmapChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide xTicks getter and setter', () => {
                let previous = heatmapChart.xTicks(),
                    expected = 4,
                    actual;

                heatmapChart.xTicks(expected);
                actual = heatmapChart.xTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = heatmapChart.yTicks(),
                    expected = 20,
                    actual;

                heatmapChart.yTicks(expected);
                actual = heatmapChart.yTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yAxisPaddingBetweenChart getter and setter', () => {
                let previous = heatmapChart.yAxisPaddingBetweenChart(),
                    expected = 15,
                    actual;

                heatmapChart.yAxisPaddingBetweenChart(expected);
                actual = heatmapChart.yAxisPaddingBetweenChart();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide numberFormat getter and setter', () => {
                let previous = heatmapChart.numberFormat(),
                    expected = 'd',
                    actual;

                heatmapChart.numberFormat(expected);
                actual = heatmapChart.numberFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide hasSingleBarHighlight getter and setter', () => {
                let previous = heatmapChart.hasSingleBarHighlight(),
                    expected = false,
                    actual;

                heatmapChart.hasSingleBarHighlight(expected);
                actual = heatmapChart.hasSingleBarHighlight();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide xAxisLabel getter and setter', () => {
                let defaultXAxisLabel = 'World',
                    testXAxisLabel = 'Hello',
                    newXAxisLabel;

                heatmapChart.xAxisLabel(testXAxisLabel);
                newXAxisLabel = heatmapChart.xAxisLabel();

                expect(defaultXAxisLabel).not.toBe(newXAxisLabel);
                expect(newXAxisLabel).toBe(testXAxisLabel);
            });

            it('should provide xAxisLabelOffset getter and setter', () => {
                let defaultXAxisLabelOffset = 30,
                    testXAxisLabelOffset = 40,
                    newXAxisLabelOffset;

                heatmapChart.xAxisLabelOffset(testXAxisLabelOffset);
                newXAxisLabelOffset = heatmapChart.xAxisLabelOffset();

                expect(defaultXAxisLabelOffset).not.toBe(newXAxisLabelOffset);
                expect(newXAxisLabelOffset).toBe(testXAxisLabelOffset);
            });

            it('should provide yAxisLabel getter and setter', () => {
                let defaultYAxisLabel = 'Hello',
                    testYAxisLabel = 'World',
                    newYAxisLabel;

                heatmapChart.yAxisLabel(testYAxisLabel);
                newYAxisLabel = heatmapChart.yAxisLabel();

                expect(defaultYAxisLabel).not.toBe(newYAxisLabel);
                expect(newYAxisLabel).toBe(testYAxisLabel);
            });

            it('should provide yAxisLabelOffset getter and setter', () => {
                let defaultYAxisLabelOffset = -40,
                    testYAxisLabelOffset = -30,
                    newYAxisLabelOffset;

                heatmapChart.yAxisLabelOffset(testYAxisLabelOffset);
                newYAxisLabelOffset = heatmapChart.yAxisLabelOffset();

                expect(defaultYAxisLabelOffset).not.toBe(newYAxisLabelOffset);
                expect(newYAxisLabelOffset).toBe(testYAxisLabelOffset);
            });
        });
    });
});
