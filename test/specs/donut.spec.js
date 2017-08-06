define(['d3', 'donut', 'donutChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    let donutDataSets = ['withFivePlusOther', 'withFivePlusOtherNoPercent'];

    function aTestDataSet() {
        return new dataBuilder.DonutDataBuilder();
    }

    function buildDataSet(dataSetName) {
        return aTestDataSet()
            [dataSetName]()
            .build();
    }

    // loops over donutDataSets array and runs tests for each data-set
    donutDataSets.forEach((datasetName) => {
        describe('Donut Chart', () => {
            let donutChart, dataset, containerFixture, f;

            beforeEach(() => {
                dataset = buildDataSet(datasetName);
                donutChart = chart();

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');

                donutChart
                    .width(600).height(600)
                    .externalRadius(250).internalRadius(50);
                containerFixture.datum(dataset).call(donutChart);
            });

            afterEach(() => {
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a chart with minimal requirements', () => {
                expect(containerFixture.select('.donut-chart').empty()).toBeFalsy();
            });

            it('should render container, chart and legend groups', () => {
                expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
                expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
                expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
            });

            it('should render a slice for each data entry', () => {
                let numSlices = dataset.length;

                expect(containerFixture.selectAll('.arc').size()).toEqual(numSlices);
            });

            it('should use percentage if declared in data, otherwise calculates value', () => {
                let percentStub = {
                        withFivePlusOther: ['5', '18', '16', '11', '2', '48'],
                        withFivePlusOtherNoPercent: ['5.0', '17.6', '16.2', '11.4', '2.1', '47.7'],
                    },
                    slices = containerFixture.selectAll('.chart-group .arc');

                slices.each((item, index) => {
                    expect(item.data.percentage).toEqual(percentStub[datasetName][index]);
                });
            });

            it('should append text to the legend container', () => {
                expect(containerFixture.select('text.donut-text').empty()).toBeFalsy();
            });

            describe('API', function() {

                it('should provide margin getter and setter', () => {
                    let previous = donutChart.margin(),
                        expected = {top: 4, right: 4, bottom: 4, left: 4},
                        actual;

                    donutChart.margin(expected);
                    actual = donutChart.margin();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide externalRadius getter and setter', () => {
                    let previous = donutChart.externalRadius(),
                        expected = 32,
                        actual;

                    donutChart.externalRadius(expected);
                    actual = donutChart.externalRadius();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide internalRadius getter and setter', () => {
                    let previous = donutChart.internalRadius(),
                        expected = 12,
                        actual;

                    donutChart.internalRadius(expected);
                    actual = donutChart.internalRadius();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide width getter and setter', () => {
                    let previous = donutChart.width(),
                        expected = 20,
                        actual;

                    donutChart.width(expected);
                    actual = donutChart.width();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide height getter and setter', () => {
                    let previous = donutChart.height(),
                        expected = 20,
                        actual;

                    donutChart.height(expected);
                    actual = donutChart.height();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide a colorSchema getter and setter', () => {
                    let defaultSchema = donutChart.colorSchema(),
                        testSchema = ['#ffffff', '#fafefc', '#000000'],
                        newSchema;

                    donutChart.colorSchema(testSchema);
                    newSchema = donutChart.colorSchema();

                    expect(defaultSchema).not.toBe(testSchema);
                    expect(newSchema).toBe(testSchema);
                });

                it('should provide animation getter and setter', () => {
                    let defaultAnimation = donutChart.isAnimated(),
                        testAnimation = true,
                        newAnimation;

                    donutChart.isAnimated(testAnimation);
                    newAnimation = donutChart.isAnimated();

                    expect(defaultAnimation).not.toBe(testAnimation);
                    expect(newAnimation).toBe(testAnimation);
                });

                it('should provide a highlightSliceById getter and setter', () => {
                    let defaultId = donutChart.highlightSliceById(),
                        testId = 10,
                        newId;

                    donutChart.highlightSliceById(testId);
                    newId = donutChart.highlightSliceById();

                    expect(defaultId).not.toBe(newId);
                    expect(newId).toBe(testId);
                });

                it('should provide a hasFixedHighlightedSlice getter and setter', () => {
                    let defaultId = donutChart.hasFixedHighlightedSlice(),
                        testValue = true,
                        newValue;

                    donutChart.hasFixedHighlightedSlice(testValue);
                    newValue = donutChart.hasFixedHighlightedSlice();

                    expect(defaultId).not.toBe(newValue);
                    expect(newValue).toBe(testValue);
                });
            });

            describe('when mouse events are triggered', () => {

                it('should trigger an event on hover', () => {
                    let callback = jasmine.createSpy('hoverCallback'),
                        firstSlice = containerFixture.select('.chart-group .arc path');

                    donutChart.on('customMouseOver', callback);
                    firstSlice.dispatch('mouseover');
                    expect(callback.calls.count()).toBe(1);
                    expect(callback.calls.allArgs()[0].length).toBe(3);
                });

                it('should trigger an event on mouse out', () => {
                    let callback = jasmine.createSpy('mouseOutCallback'),
                        firstSlice = containerFixture.select('.chart-group .arc path');

                    donutChart.on('customMouseOut', callback);
                    firstSlice.dispatch('mouseout');
                    expect(callback.calls.count()).toBe(1);
                    expect(callback.calls.allArgs()[0].length).toBe(3);
                });

                it('should trigger a callback on mouse move', () => {
                    let callback = jasmine.createSpy('mouseMoveCallback'),
                        firstSlice = containerFixture.select('.chart-group .arc path');

                    donutChart.on('customMouseMove', callback);
                    firstSlice.dispatch('mousemove');

                    expect(callback.calls.count()).toBe(1);
                    expect(callback.calls.allArgs()[0].length).toBe(3);
                });
            });

            describe('Export chart functionality', () => {

                it('should have exportChart defined', () => {
                    expect(donutChart.exportChart).toBeDefined();
                });
            });
        });
    });
});
