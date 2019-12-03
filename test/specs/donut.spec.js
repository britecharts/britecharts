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

                donutChart
                    .width(600)
                    .height(600)
                    .externalRadius(250)
                    .internalRadius(50);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(donutChart);
            });

            afterEach(() => {
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            describe('Render', () => {

                it('should render a chart with minimal requirements', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.donut-chart').size();

                    expect(actual).toEqual(expected);
                });

                describe('groups', () => {
                    it('should create a container-group', () => {
                        const expected = 1;
                        const actual = containerFixture.select('g.container-group').size();

                        expect(actual).toEqual(expected);
                    });

                    it('should create a chart-group', () => {
                        const expected = 1;
                        const actual = containerFixture.select('g.chart-group').size();

                        expect(actual).toEqual(expected);
                    });

                    it('should create a legend-group', () => {
                        const expected = 1;
                        const actual = containerFixture.select('g.legend-group').size();

                        expect(actual).toEqual(expected);
                    });
                });

                it('should draw a slice for each data entry', () => {
                    const expected = dataset.length;
                    const actual = containerFixture.selectAll('.donut-chart .arc').size();

                    expect(actual).toEqual(expected);
                });

                it('should draw one path in each slice', () => {
                    let expected = dataset.length;
                    let actual = containerFixture.selectAll('.donut-chart .arc path').size();

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
                    const expected = false;
                    const actual = containerFixture.select('text.donut-text').empty();

                    expect(actual).toEqual(expected);
                });

                describe('when one section is zero', () => {

                    it('should keep the order of colors', () => {
                        const dataset = aTestDataSet()
                            .withOneTopicAtZero()
                            .build();
                        const expectedFills = ['#111111', '#222222', '#333333'];

                        donutChart.colorSchema(expectedFills);
                        containerFixture.datum(dataset).call(donutChart);

                        const paths = containerFixture.selectAll('path').nodes();
                        const actualFirstPathFill = paths[0].getAttribute('fill');
                        const actualSecondPathFill = paths[1].getAttribute('fill');
                        const actualThirdPathFill = paths[2].getAttribute('fill');

                        expect(actualFirstPathFill).toEqual(expectedFills[0]);
                        expect(actualSecondPathFill).toEqual(expectedFills[1]);
                        expect(actualThirdPathFill).toEqual(expectedFills[2]);
                    });
                });

                describe('when all sections are zero and emptyDataConfig.showEmptySlice', () => {

                    it('percentage label should be 0%', () => {
                        const expected = '0.0%';
                        const emptyDataConfig = {
                            emptySliceColor: '#EFF2F5',
                            showEmptySlice: true,
                        };
                        const dataset = aTestDataSet()
                            .withAllTopicsAtZero()
                            .build();
                        let actual;

                        donutChart.highlightSliceById(11)
                        donutChart.emptyDataConfig(emptyDataConfig);
                        containerFixture.datum(dataset).call(donutChart);

                        const textNodes = containerFixture.select('text.donut-text .value').nodes();

                        actual = d3.select(textNodes[0]).text();

                        expect(expected).toEqual(actual);
                    });

                    it('should render a single filler slice', () => {
                        const expected = 1;
                        const emptyDataConfig = {
                            emptySliceColor: '#EFF2F5',
                            showEmptySlice: true,
                        };
                        const dataset = aTestDataSet()
                            .withAllTopicsAtZero()
                            .build();
                        let actual;

                        donutChart.emptyDataConfig(emptyDataConfig);
                        containerFixture.datum(dataset).call(donutChart);
                        actual = containerFixture.selectAll('.donut-chart .arc path').size();

                        expect(actual).toEqual(expected);
                    });

                    it('should fill the empty slice with emptyDataConfig.emptySliceColor', () => {
                        const expected = '#000000';
                        const emptyDataConfig = {
                            emptySliceColor: expected,
                            showEmptySlice: true,
                        };
                        const dataset = aTestDataSet()
                            .withAllTopicsAtZero()
                            .build();
                        let actual;

                        donutChart.emptyDataConfig(emptyDataConfig);
                        containerFixture.datum(dataset).call(donutChart);

                        const paths = containerFixture.selectAll('.donut-chart .arc path').nodes();

                        actual = paths[0].getAttribute('fill');

                        expect(actual).toEqual(expected);

                    });
                });

                describe('when data is empty and emptyDataConfig.showEmptySlice', () => {

                    it('should render a single filler slice', () => {
                        const expected = 1;
                        const emptyDataConfig = {
                            emptySliceColor: '#000000',
                            showEmptySlice: true,
                        };
                        let actual;

                        donutChart.emptyDataConfig(emptyDataConfig);
                        containerFixture.datum([]).call(donutChart);
                        actual = containerFixture.selectAll('.donut-chart .arc path').nodes().length;

                        expect(actual).toEqual(expected);
                    });

                    it('should fill the empty slice with emptyDataConfig.emptySliceColor', () => {
                        const expected = '#000000';
                        const emptyDataConfig = {
                            emptySliceColor: expected,
                            showEmptySlice: true,
                        };
                        let actual;

                        donutChart.emptyDataConfig(emptyDataConfig);
                        containerFixture.datum([]).call(donutChart);
                        const paths = containerFixture.selectAll('.donut-chart .arc path').nodes();
                        actual = paths[0].getAttribute('fill');

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when reloading with a one item dataset', () => {

                    it('should render in the same svg', () => {
                        const expected = 1;
                        const newDataset = buildDataSet('withThreeCategories');
                        let actual;

                        containerFixture.datum(newDataset).call(donutChart);
                        actual = containerFixture.selectAll('.donut-chart').nodes().length;

                        expect(actual).toEqual(expected);
                    });

                    it('should render only three slices', () => {
                        const expected = 3;
                        const newDataset = buildDataSet('withThreeCategories');
                        let actual;

                        containerFixture.datum(newDataset).call(donutChart);
                        actual = containerFixture.selectAll('.donut-chart .arc').nodes().length;

                        expect(actual).toEqual(expected);
                    });

                    it('should render one paths in each slice', () => {
                        const expected = 3;
                        const newDataset = buildDataSet('withThreeCategories');
                        let actual;

                        containerFixture.datum(newDataset).call(donutChart);
                        actual = containerFixture.selectAll('.donut-chart .arc path').nodes().length;

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when orderingFunction is called', () => {

                    it('the default order function sorts properly', () => {
                        // default: b.quantity - a.quantity (descending order)
                        const expected = 4;
                        let actual;

                        donutChart.orderingFunction();
                        containerFixture.call(donutChart)
                        actual = containerFixture.selectAll('.chart-group .arc').node().__data__.index;

                        expect(actual).toBe(expected);
                    });

                    it('it accepts a custom sorting function', () => {
                        // a.quantity - b.quantity (ascending order)
                        const expected = 1;
                        const fn = (a, b) => a.quantity - b.quantity;
                        let actual;

                        donutChart.orderingFunction(fn);
                        containerFixture.call(donutChart)
                        actual = containerFixture.selectAll('.chart-group .arc').node().__data__.index;

                        expect(actual).toBe(expected);
                    });
                });

                describe('when centeredTextFunction', () => {

                    it('is not called, the default function formats text properly', () => {
                        const expectedLabel = 'Shiny';
                        const expectedValue = '20%';
                        const dataset = buildDataSet('withThreeCategories');
                        let actualLabel;
                        let actualValue;

                        donutChart.highlightSliceById(11);
                        containerFixture.datum(dataset).call(donutChart);

                        const valueNode = containerFixture.select('text.donut-text .value').node();
                        const labelNode = containerFixture.select('text.donut-text .label').node();

                        actualValue = d3.select(valueNode).text();
                        actualLabel = d3.select(labelNode).text();

                        expect(actualValue).toBe(expectedValue);
                        expect(actualLabel).toBe(expectedLabel);
                    });

                    it('is called, the custom function changes text format properly', () => {
                        const expectedLabel = '200';
                        const expectedValue = '11';
                        const dataset = buildDataSet('withThreeCategories');
                        let actualLabel;
                        let actualValue;

                        donutChart.centeredTextFunction((d) => `${d.id} ${d.quantity}`);
                        donutChart.highlightSliceById(11);
                        containerFixture.datum(dataset).call(donutChart);

                        const valueNode = containerFixture.select('text.donut-text .value').node();
                        const labelNode = containerFixture.select('text.donut-text .label').node();

                        actualValue = d3.select(valueNode).text();
                        actualLabel = d3.select(labelNode).text();

                        expect(actualValue).toBe(expectedValue);
                        expect(actualLabel).toBe(expectedLabel);
                    });
                });
            });

            describe('API', () => {

                it('should provide margin getter and setter', () => {
                    let previous = donutChart.margin(),
                        expected = {top: 4, right: 4, bottom: 4, left: 4},
                        actual;

                    donutChart.margin(expected);
                    actual = donutChart.margin();

                    expect(previous).not.toBe(expected);
                    expect(actual).toEqual(expected);
                });

                describe('when margins are set partially', () => {

                    it('should override the default values', () => {
                        const previous = donutChart.margin();
                        const expected = {
                            ...previous,
                            top: 10,
                            right: 20
                        };
                        let actual;

                        donutChart.width(expected);
                        actual = donutChart.width();

                        expect(previous).not.toBe(actual);
                        expect(actual).toEqual(expected);
                    })
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

                it('should not have numberFormat by default', () => {
                    let expected = undefined,
                        actual;

                    actual = donutChart.numberFormat();

                    expect(expected).toBe(actual);
                });

                it('should provide numberFormat getter and setter', () => {
                    let previous = donutChart.numberFormat(),
                        expected = 'd',
                        actual;

                    donutChart.numberFormat(expected);
                    actual = donutChart.numberFormat();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide hasLastHoverSliceHighlighted getter and setter', () => {
                    let previous = donutChart.hasLastHoverSliceHighlighted(),
                        expected = true,
                        actual;

                    donutChart.hasLastHoverSliceHighlighted(expected);
                    actual = donutChart.hasLastHoverSliceHighlighted();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide hasHoverAnimation getter and setter', () => {
                    let previous = donutChart.hasHoverAnimation(),
                        expected = false,
                        actual;

                    donutChart.hasHoverAnimation(expected);
                    actual = donutChart.hasHoverAnimation();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });
            });

            describe('Lifecycle', () => {

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
            });
        });
    });
});
