define(['d3', 'grouped-bar', 'groupedBarChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.GroupedBarChartDataBuilder();
    const differentDatesReducer = (acc, d) => {
                if (acc.indexOf(d.date) === -1) {
                    acc.push(d.date);
                }

                return acc;
            };

    describe('Grouped Bar Chart', () => {
        let groupedBarChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = aTestDataSet()
                .with3Sources()
                .build();
            groupedBarChart = chart()
                        // .horizontal(true)
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
            expect(containerFixture.select('.x-axis-group .axis.x').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render a layer for each data entry group', () => {
            let actual = containerFixture.selectAll('.layer').size();
            let expected = dataset.data.reduce(differentDatesReducer, []).length;

            expect(actual).toEqual(expected);
        });

        it('should render a bar for each data entry', () => {
            let actual = containerFixture.selectAll('.bar').size();
            let expected = dataset.data.length;

            expect(actual).toEqual(expected);
        });

        describe('API', function() {

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
                let previous = groupedBarChart.horizontal(),
                    expected = true,
                    actual;

                groupedBarChart.horizontal(expected);
                actual = groupedBarChart.horizontal();

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

            it('should provide margin getter and setter', () => {
                let previous = groupedBarChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                groupedBarChart.margin(expected);
                actual = groupedBarChart.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
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

            it('should provide numOfHorizontalTicks getter and setter', () => {
                let previous = groupedBarChart.numOfHorizontalTicks(),
                    expected = 4,
                    actual;

                groupedBarChart.numOfHorizontalTicks(expected);
                actual = groupedBarChart.numOfHorizontalTicks();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide numOfVerticalTicks getter and setter', () => {
                let previous = groupedBarChart.numOfVerticalTicks(),
                    expected = 4,
                    actual;

                groupedBarChart.numOfVerticalTicks(expected);
                actual = groupedBarChart.numOfVerticalTicks();

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
        });

        describe('when hovering', function() {

            it('mouseover should trigger a callback', () => {
                let chart = containerFixture.selectAll('.grouped-bar');
                let callbackSpy = jasmine.createSpy('callback');

                groupedBarChart.on('customMouseOver', callbackSpy);
                chart.dispatch('mouseover');

                expect(callbackSpy.calls.count()).toBe(1);
            });

            it('mousemove should trigger a callback', () => {
                let chart = containerFixture.selectAll('.grouped-bar');
                let callbackSpy = jasmine.createSpy('callback');

                groupedBarChart.on('customMouseMove', callbackSpy);
                chart.dispatch('mousemove');

                expect(callbackSpy.calls.count()).toBe(1);
            });

            it('mouseout should trigger a callback', () => {
                let chart = containerFixture.selectAll('.grouped-bar');
                let callbackSpy = jasmine.createSpy('callback');

                groupedBarChart.on('customMouseOut', callbackSpy);
                chart.dispatch('mouseout');

                expect(callbackSpy.calls.count()).toBe(1);
            });
        });

    });
});
