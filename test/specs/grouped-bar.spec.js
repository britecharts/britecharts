define(['d3', 'grouped-bar', 'groupedBarChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    function aTestDataSet() {
        return new dataBuilder.GroupedBarChartDataBuilder();
    }

    describe('Grouped Bar Chart', () => {
        let groupedBarChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = aTestDataSet()
                .with3Sources()
                .build();
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

        it('should render a chart with minimal requirements', () => {
            expect(containerFixture.select('.grouped-bar').empty()).toBeFalsy();
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
            expect(containerFixture.select('.x-axis-group.axis').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render a bar for each data entry', () => {
            let actual = containerFixture.selectAll('.bar').size();
            let expected = dataset.length;

            expect(actual).toEqual(expected);
        });

        xdescribe('API', function() {

            it('should provide margin getter and setter', () => {
                let previous = groupedBarChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                groupedBarChart.margin(expected);
                actual = groupedBarChart.margin();

                expect(previous).not.toBe(actual);
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

            it('should provide width getter and setter', () => {
                let previous = groupedBarChart.width(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                groupedBarChart.width(expected);
                actual = groupedBarChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide a percentage ratio getter and setter', () => {
                let defaultRatio = groupedBarChart.percentageAxisToMaxRatio(),
                    expected = 1.5,
                    actual;

                groupedBarChart.percentageAxisToMaxRatio(expected);
                actual = groupedBarChart.percentageAxisToMaxRatio();

                expect(defaultRatio).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide horizontal direction getter and setter', () => {
                let previous = groupedBarChart.horizontal(),
                    expected = true,
                    actual;

                groupedBarChart.horizontal(expected);
                actual = groupedBarChart.horizontal();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide percentage label margin getter and setter', () => {
                let previous = groupedBarChart.percentageLabelMargin(),
                    expected = 10,
                    actual;

                groupedBarChart.percentageLabelMargin(expected);
                actual = groupedBarChart.percentageLabelMargin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide enable percentage label getter and setter', () => {
                let previous = groupedBarChart.enablePercentageLabels(),
                    expected = true,
                    actual;

                groupedBarChart.enablePercentageLabels(expected);
                actual = groupedBarChart.enablePercentageLabels();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide yAxisPaddingBetweenChart getter and setter', () => {
                let previous = groupedBarChart.yAxisPaddingBetweenChart(),
                    expected = 15,
                    actual;

                groupedBarChart.yAxisPaddingBetweenChart(expected);
                actual = groupedBarChart.yAxisPaddingBetweenChart();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide colorSchema getter and setter', () => {
                let previous = groupedBarChart.colorSchema(),
                    expected = ['#FFFFFF'],
                    actual;

                groupedBarChart.colorSchema(expected);
                actual = groupedBarChart.colorSchema();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let defaultValueLabel = groupedBarChart.valueLabel(),
                    testValueLabel = 'quantity',
                    newValueLabel;

                groupedBarChart.valueLabel(testValueLabel);
                newValueLabel = groupedBarChart.valueLabel();

                expect(defaultValueLabel).not.toBe(testValueLabel);
                expect(newValueLabel).toBe(testValueLabel);
            });

            it('should provide nameLabel getter and setter', () => {
                let defaultDateLabel = groupedBarChart.nameLabel(),
                    testNameLabel = 'key',
                    newNameLabel;

                groupedBarChart.nameLabel(testNameLabel);
                newNameLabel = groupedBarChart.nameLabel();

                expect(defaultDateLabel).not.toBe(testNameLabel);
                expect(newNameLabel).toBe(testNameLabel);
            });

            it('should provide an usePercentage getter and setter', () => {
                let defaultUsePercentage = groupedBarChart.usePercentage(),
                    testUsePercentage = true,
                    newUsePercentage;

                groupedBarChart.usePercentage(testUsePercentage);
                newUsePercentage = groupedBarChart.usePercentage();

                expect(defaultUsePercentage).not.toBe(testUsePercentage);
                expect(newUsePercentage).toBe(testUsePercentage);
            });

            it('should provide animation getter and setter', () => {
                let defaultAnimation = groupedBarChart.isAnimated(),
                    testAnimation = true,
                    newAnimation;

                groupedBarChart.isAnimated(testAnimation);
                newAnimation = groupedBarChart.isAnimated();

                expect(defaultAnimation).not.toBe(testAnimation);
                expect(newAnimation).toBe(testAnimation);
            });

            it('should provide a reverseColorList getter and setter', () => {
                let defaultReverseColorList = groupedBarChart.reverseColorList(),
                    testReverseColorList = false,
                    newReverseColorList;

                groupedBarChart.reverseColorList(testReverseColorList);
                newReverseColorList = groupedBarChart.reverseColorList();

                expect(defaultReverseColorList).not.toBe(testReverseColorList);
                expect(newReverseColorList).toBe(testReverseColorList);
            });
        });

        xdescribe('when hovering a bar', function() {

            it('should trigger a callback', () => {
                let bar = containerFixture.selectAll('.bar:nth-child(1)');
                let callbackSpy = jasmine.createSpy('callback');

                groupedBarChart.on('customMouseOver', callbackSpy);
                bar.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(1);
            });
        });

        xdescribe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(groupedBarChart.exportChart).toBeDefined();
            });
        });
    });
});
