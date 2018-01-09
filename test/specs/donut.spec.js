define(['d3', 'donut', 'donutChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    let donutDataSets = ['withFivePlusOther', 'withFivePlusOtherNoPercent'];

    const aTestDataSet = () => new dataBuilder.DonutDataBuilder();

    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

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
                    .width(600)
                    .height(600)
                    .externalRadius(250)
                    .internalRadius(50);

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
                let actual;
                let expected = dataset.length;

                actual = containerFixture.selectAll('.donut-chart .arc').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render one path in each slice', () => {
                let actual;
                let expected = dataset.length;

                actual = containerFixture.selectAll('.donut-chart .arc path').nodes().length;

                expect(actual).toEqual(expected);
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

            describe('when one section is zero', () => {

                it('should keep the order of colors', () => {
                    let dataset = aTestDataSet()
                        .withOneTopicAtZero()
                        .build();
                    let expectedFills = ['#111111', '#222222', '#333333'];

                    donutChart.colorSchema(expectedFills);

                    containerFixture.datum(dataset).call(donutChart);

                    let paths = containerFixture.selectAll('path').nodes();
                    let actualFirstPathFill = paths[0].getAttribute('fill');
                    let actualSecondPathFill = paths[1].getAttribute('fill');
                    let actualThirdPathFill = paths[2].getAttribute('fill');

                    expect(actualFirstPathFill).toEqual(expectedFills[0]);
                    expect(actualSecondPathFill).toEqual(expectedFills[1]);
                    expect(actualThirdPathFill).toEqual(expectedFills[2]);
                });
            });


            describe('when all sections are zero and emptyDataConfig.showEmptySlice', () => {

                it('percentage label should be 0%', () => {
                    let actual;
                    let expected = '0.0%';

                    let emptyDataConfig = {
                        emptySliceColor: '#EFF2F5',
                        showEmptySlice: true,
                    }

                    let dataset = aTestDataSet()
                        .withAllTopicsAtZero()
                        .build();

                    donutChart.highlightSliceById(11)
                    donutChart.emptyDataConfig(emptyDataConfig);
                    containerFixture.datum(dataset).call(donutChart);

                    let textNodes = containerFixture.select('text.donut-text .value').nodes();

                    actual = d3.select(textNodes[0]).text();

                    expect(expected).toEqual(actual);

                });

                it('should render a single filler slice', () => {
                    let actual;
                    let expected = 1;

                    let emptyDataConfig = {
                        emptySliceColor: '#EFF2F5',
                        showEmptySlice: true,
                    }

                    let dataset = aTestDataSet()
                        .withAllTopicsAtZero()
                        .build();

                    donutChart.emptyDataConfig(emptyDataConfig);
                    containerFixture.datum(dataset).call(donutChart);
                    actual = containerFixture.selectAll('.donut-chart .arc path').nodes().length;

                    expect(actual).toEqual(expected);

                });

                it('should fill the empty slice with emptyDataConfig.emptySliceColor', () => {
                    let actual;
                    let expected = '#000000';
                    let emptyDataConfig = {
                        emptySliceColor: expected,
                        showEmptySlice: true,
                    }
                    let dataset = aTestDataSet()
                        .withAllTopicsAtZero()
                        .build();

                    donutChart.emptyDataConfig(emptyDataConfig);
                    containerFixture.datum(dataset).call(donutChart);

                    let paths = containerFixture.selectAll('.donut-chart .arc path').nodes();

                    actual = paths[0].getAttribute('fill');

                    expect(actual).toEqual(expected);

                });

            });

            describe('when data is empty and emptyDataConfig.showEmptySlice', () => {

                it('should render a single filler slice', () => {
                    let actual;
                    let expected = 1;

                    let emptyDataConfig = {
                        emptySliceColor: '#000000',
                        showEmptySlice: true,
                    }

                    donutChart.emptyDataConfig(emptyDataConfig);
                    containerFixture.datum([]).call(donutChart);

                    actual = containerFixture.selectAll('.donut-chart .arc path').nodes().length;

                    expect(actual).toEqual(expected);

                });

                it('should fill the empty slice with emptyDataConfig.emptySliceColor', () => {
                    let actual;
                    let expected = '#000000';

                    let emptyDataConfig = {
                        emptySliceColor: expected,
                        showEmptySlice: true,
                    }

                    donutChart.emptyDataConfig(emptyDataConfig);
                    containerFixture.datum([]).call(donutChart);

                    let paths = containerFixture.selectAll('.donut-chart .arc path').nodes();

                    actual = paths[0].getAttribute('fill');

                    expect(actual).toEqual(expected);

                });


            });

            describe('when reloading with a one item dataset', () => {

                it('should render in the same svg', function() {
                    let actual;
                    let expected = 1;
                    let newDataset = buildDataSet('withThreeCategories');

                    containerFixture.datum(newDataset).call(donutChart);

                    actual = containerFixture.selectAll('.donut-chart').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render only three slices', function() {
                    let actual;
                    let expected = 3;
                    let newDataset = buildDataSet('withThreeCategories');

                    containerFixture.datum(newDataset).call(donutChart);
                    actual = containerFixture.selectAll('.donut-chart .arc').nodes().length;

                    expect(actual).toEqual(expected);
                });

                it('should render one paths in each slice', () => {
                    let actual;
                    let expected = 3;
                    let newDataset = buildDataSet('withThreeCategories');

                    containerFixture.datum(newDataset).call(donutChart);
                    actual = containerFixture.selectAll('.donut-chart .arc path').nodes().length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when orderingFunction is called', () => {

                it('the default order function sorts properly', () => {
                    // default: b.quantity - a.quantity (descending order)
                    let actual,
                        expected = 4;

                    donutChart.orderingFunction();
                    containerFixture.call(donutChart)
                    actual = containerFixture.selectAll('.chart-group .arc').nodes()[0].__data__.index;

                    expect(actual).toBe(expected);
                });

                it('it accepts a custom sorting function', () => {
                    // a.quantity - b.quantity (ascending order)
                    let fn = (a, b) => a.quantity - b.quantity;
                    let actual,
                        expected = 1;

                    donutChart.orderingFunction(fn);
                    containerFixture.call(donutChart)
                    actual = containerFixture.selectAll('.chart-group .arc').nodes()[0].__data__.index;

                    expect(actual).toBe(expected);
                });
            })

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

                it('should provide percentageFormat getter and setter', () => {
                    let previous = donutChart.percentageFormat(),
                        expected = '.0f',
                        actual;

                    donutChart.percentageFormat(expected);
                    actual = donutChart.percentageFormat();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });


                it('should provide radiusHoverOffset getter and setter', () => {
                    let previous = donutChart.radiusHoverOffset(),
                        expected = 15,
                        actual;

                    donutChart.radiusHoverOffset(expected);
                    actual = donutChart.radiusHoverOffset();

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


                it('should provide loadingState getter and setter', () => {
                    let previous = donutChart.loadingState(),
                        expected = 'test',
                        actual;

                    donutChart.loadingState(expected);
                    actual = donutChart.loadingState();

                    expect(previous).not.toBe(actual);
                    expect(actual).toBe(expected);
                });

                it('should not have numberFormat by default', () =>{
                    let expected = undefined,
                        actual;

                    actual = donutChart.numberFormat();

                    expect(expected).toBe(actual);
                });

                it('should provide numberFormat getter and setter', () =>{
                    let previous = donutChart.numberFormat(),
                        expected = 'd',
                        actual;

                    donutChart.numberFormat(expected);
                    actual = donutChart.numberFormat();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });
            });

            describe('when mouse events are triggered', () => {

                it('should trigger an event on click', () => {
                    let callback = jasmine.createSpy('clickCallback'),
                        firstSlice = containerFixture.select('.chart-group .arc path');

                    donutChart.on('customClick', callback);
                    firstSlice.dispatch('click');
                    expect(callback.calls.count()).toBe(1);
                    expect(callback.calls.allArgs()[0].length).toBe(3);
                });

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
