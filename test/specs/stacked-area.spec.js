define([
    'underscore',
    'jquery',
    'd3',
    'stacked-area',
    'stackedAreaDataBuilder'
    ], function(
        _,
        $,
        d3,
        stackedArea,
        dataBuilder
    ) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.StackedAreaDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };
    const hasClass = (element, className) => {
        return _.contains(element.node().classList, className);
    };

    describe('Stacked Area Chart', () => {
        let dataset, containerFixture, f, stackedAreaChart;

        beforeEach(() => {
            dataset = buildDataSet('withReportData');
            stackedAreaChart = stackedArea()
                                .valueLabel('views')
                                .dateLabel('dateUTC');

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container').append('svg');
            containerFixture.datum(dataset.data).call(stackedAreaChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
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
                    const actual = containerFixture.select('g.container-group').size();

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
                    const actual = containerFixture.select('g.grid-lines-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should create a metadata-group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('g.metadata-group').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('grid', function () {

                it('should not draw horizontal grid line', () => {
                    const expected = 0;
                    const actual = containerFixture.select('.horizontal-grid-line').size();

                    expect(actual).toEqual(expected);
                });

                it('should not draw vertical grid line', () => {
                    const expected = 0;
                    const actual = containerFixture.select('.vertical-grid-line').size();

                    expect(actual).toEqual(expected);
                });

                describe('when grid is horizontal', function () {

                    beforeEach(function () {
                        dataset = aTestDataSet().withReportData().build();
                        stackedAreaChart = stackedArea()
                            .grid('horizontal')
                            .valueLabel('views')
                            .dateLabel('dateUTC');

                        containerFixture = d3.select('.test-container').append('svg');
                        containerFixture.datum(dataset.data).call(stackedAreaChart);
                    });

                    it('should render the horizontal grid lines', () => {
                        expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
                        expect(containerFixture.select('.vertical-grid-line').empty()).toBeTruthy();
                    });

                    it('0-axis is NOT highlighted with an additional class', () => {
                        expect(containerFixture.select('.horizontal-grid-line--highlighted').empty()).toBeTruthy();
                    });
                });

                describe('when grid is vertical', function () {

                    beforeEach(function () {
                        dataset = aTestDataSet().withReportData().build();
                        stackedAreaChart = stackedArea()
                            .grid('vertical')
                            .valueLabel('views')
                            .dateLabel('dateUTC');

                        containerFixture = d3.select('.test-container').append('svg');
                        containerFixture.datum(dataset.data).call(stackedAreaChart);
                    });

                    it('should render the vertical grid lines', () => {
                        expect(containerFixture.select('.horizontal-grid-line').empty()).toBeTruthy();
                        expect(containerFixture.select('.vertical-grid-line').empty()).toBeFalsy();
                    });
                });

                describe('when grid is full', function () {

                    beforeEach(function () {
                        dataset = aTestDataSet().withReportData().build();
                        stackedAreaChart = stackedArea()
                            .grid('full')
                            .valueLabel('views')
                            .dateLabel('dateUTC');

                        containerFixture = d3.select('.test-container').append('svg');
                        containerFixture.datum(dataset.data).call(stackedAreaChart);
                    });

                    it('should render the vertical grid lines', () => {
                        expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
                        expect(containerFixture.select('.vertical-grid-line').empty()).toBeFalsy();
                    });

                    it('0-axis is NOT highlighted with an additional class', () => {
                        expect(containerFixture.select('.horizontal-grid-line--highlighted').empty()).toBeTruthy();
                    });
                });
            });

            describe('axis', () => {
                it('should draw an X axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.x-axis-group .axis.x').size();

                    expect(actual).toEqual(expected);
                });

                it('should draw a month X axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.x-axis-group .month-axis').size();

                    expect(actual).toEqual(expected);
                });

                it('should draw an Y axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.y-axis-group.axis').size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should render an area for each category', () => {
                const expected = _.chain(dataset.data)
                    .pluck('name')
                    .unique()
                    .value()
                    .length;
                const actual = containerFixture.selectAll('.layer').size();

                expect(actual).toEqual(expected);
            });

            it('should render an area-outline for each category', () => {
                const expected = _.chain(dataset.data)
                    .pluck('name')
                    .unique()
                    .value()
                    .length;
                const actual = containerFixture.selectAll('.area-outline').size();

                expect(actual).toEqual(expected);
            });

            it('should render areas and areas outlines that follow the same path', () => {
                const layerContainerNodes = containerFixture.selectAll('.layer-container').nodes();

                layerContainerNodes.forEach(layerContainerNode => {
                    const areaPath = layerContainerNode.childNodes[0].attributes.d.value;
                    const areaOutlinePath = layerContainerNode.childNodes[1].attributes.d.value;

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
                const actual = containerFixture.select('.vertical-marker-container').size();

                expect(actual).toEqual(expected);
            });

            it('should render a vertical marker', () => {
                const expected = 1;
                const actual = containerFixture.select('.vertical-marker').size();

                expect(actual).toEqual(expected);
            });

            it('should be able to render even when data is length 0', () => {
                expect(() => containerFixture.datum([]).call(stackedAreaChart)).not.toThrow();
            });

            describe('stacked area outline', () => {

                it('should not render outline if hasOutline is false', () => {
                    const expected = 1;
                    const newDataset = buildDataSet('with3Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stackedAreaChart);
                    actual = containerFixture.selectAll('.stacked-area').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when reloading with a three sources dataset', () => {

                it('should render in the same svg', function () {
                    const expected = 'none';
                    let actual;

                    stackedAreaChart.hasOutline(false);
                    containerFixture.datum(dataset.data).call(stackedAreaChart);

                    const outlines = containerFixture.selectAll('.area-outline');
                    actual = outlines.style('display');

                    expect(actual).toEqual(expected);
                });

                it('should render three layers', function () {
                    const expected = 3;
                    const newDataset = buildDataSet('with3Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stackedAreaChart);
                    actual = containerFixture.selectAll('.stacked-area .layer').size();

                    expect(actual).toEqual(expected);
                });

                it('should render three area outlines', function () {
                    const expected = 3;
                    const newDataset = buildDataSet('with3Sources');
                    let actual;

                    containerFixture.datum(newDataset.data).call(stackedAreaChart);
                    actual = containerFixture.selectAll('.stacked-area .area-outline').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when has negative values', () => {

                beforeEach(function () {
                    dataset = aTestDataSet().withNegativeValues().build();
                    stackedAreaChart = stackedArea()
                        .grid('full')
                        .valueLabel('views')
                        .dateLabel('date');

                    containerFixture = d3.select('.test-container').append('svg');
                    containerFixture.datum(dataset.data).call(stackedAreaChart);
                });

                it('The lowest Y-axis value is negative', () => {
                    let yAxis = containerFixture.selectAll('.y-axis-group');
                    let text = yAxis.select('g.tick');
                    expect(text.text()).toEqual('-15');
                });

                it('0-axis is highlighted with an additional class', () => {
                    expect(containerFixture.select('.horizontal-grid-line--highlighted').empty()).toBeFalsy();
                });

            });
        });

        describe('Lifecycle', () => {

            it('should show the overlay when the mouse is hovering', () =>  {
                const container = containerFixture.selectAll('svg');
                const expectedDefaultStyle = 'none';
                const expectedStyle = 'block';

                expect(containerFixture.select('.overlay').style('display')).toEqual(expectedDefaultStyle);
                container.dispatch('mouseover');
                expect(containerFixture.select('.overlay').style('display')).toEqual(expectedStyle);
            });

            it('should show a vertical line where the mouse is hovering', () =>  {
                const expected = true;
                const container = containerFixture.selectAll('svg');
                const verticalLine = d3.select('.vertical-marker-container .vertical-marker');
                let actual;

                container.dispatch('mouseover');
                actual = hasClass(verticalLine, 'bc-is-active');

                expect(actual).toEqual(expected);
            });

            it('should hide the vertical marker when the mouse is out', () =>  {
                const container = containerFixture.selectAll('svg');
                const verticalLine = d3.select('.vertical-marker-container .vertical-marker');
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
                expect(callback.calls.allArgs()[0].length).toEqual(expectedArgumentCount);
            });

            it('should trigger an event on mouse out', () => {
                const callback = jasmine.createSpy('mouseOutCallback');
                const container = containerFixture.selectAll('svg');
                const expectedCallCount = 1;
                const expectedArgumentCount = 2;

                stackedAreaChart.on('customMouseOut', callback);
                container.dispatch('mouseout');

                expect(callback.calls.count()).toEqual(expectedCallCount);
                expect(callback.calls.allArgs()[0].length).toEqual(expectedArgumentCount);
            });

            it('should trigger an event on touchmove', () => {
                const callback = jasmine.createSpy('touchMoveCallback');
                const container = containerFixture.selectAll('svg');
                const expectedCallCount = 1;
                const expectedArgumentCount = 2;

                stackedAreaChart.on('customTouchMove', callback);
                container.dispatch('touchmove');

                expect(callback.calls.count()).toEqual(expectedCallCount);
                expect(callback.calls.allArgs()[0].length).toEqual(expectedArgumentCount);
            });
        });

        describe('API', function() {

            it('should provide areaOpacity getter and setter', () => {
                let previous = stackedAreaChart.areaOpacity(),
                    expected = 0.5,
                    actual;

                stackedAreaChart.areaOpacity(expected);
                actual = stackedAreaChart.areaOpacity();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide an aspect ratio getter and setter', () => {
                let previous = stackedAreaChart.aspectRatio(),
                    expected = 600,
                    actual;

                stackedAreaChart.aspectRatio(expected);
                actual = stackedAreaChart.aspectRatio();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            describe('aspect Ratio', function () {

                describe('when an aspect ratio is set', function () {

                    it('should modify the height depending on the width', () => {
                        let testAspectRatio = 0.5,
                            testWidth = 400,
                            newHeight;

                        stackedAreaChart.aspectRatio(testAspectRatio);
                        stackedAreaChart.width(testWidth);
                        newHeight = stackedAreaChart.height();

                        expect(newHeight).toEqual(Math.ceil(testWidth * testAspectRatio));
                    });

                    it('should modify the width depending on the height', () => {
                        let testAspectRatio = 0.5,
                            testHeight = 400,
                            newWidth;

                        stackedAreaChart.aspectRatio(testAspectRatio);
                        stackedAreaChart.height(testHeight);
                        newWidth = stackedAreaChart.width();

                        expect(newWidth).toEqual(Math.ceil(testHeight / testAspectRatio));
                    });
                });
            });

            it('should provide a colorSchema getter and setter', () => {
                let previous = stackedAreaChart.colorSchema(),
                    expected = ['#ffffff', '#fafefc', '#000000'],
                    actual;

                stackedAreaChart.colorSchema(expected);
                actual = stackedAreaChart.colorSchema();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide dateLabel getter and setter', () => {
                let previous = stackedAreaChart.dateLabel(),
                    expected = 'dateFull',
                    actual;

                stackedAreaChart.dateLabel(expected);
                actual = stackedAreaChart.dateLabel();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide emptyDataConfig getter and setter', () => {
                let previous = stackedAreaChart.emptyDataConfig(),
                    expected = {
                        minDate: Date.now(),
                        maxDate: Date.now(),
                        maxY: 100
                    },
                    actual;

                stackedAreaChart.emptyDataConfig(expected);
                actual = stackedAreaChart.emptyDataConfig();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            describe('export chart functionality', () => {

                it('should have exportChart defined', () => {
                    expect(stackedAreaChart.exportChart).toBeDefined();
                });
            });

            it('should provide grid mode getter and setter', () => {
                let previous = stackedAreaChart.grid(),
                    expected = 'vertical',
                    actual;

                stackedAreaChart.grid(expected);
                actual = stackedAreaChart.grid();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide height getter and setter', () => {
                let previous = stackedAreaChart.height(),
                    expected = 200,
                    actual;

                stackedAreaChart.height(expected);
                actual = stackedAreaChart.height();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            describe('loadingState', () => {

                it('should provide loadingState getter and setter', () => {
                    let previous = stackedAreaChart.loadingState(),
                        expected = 'test',
                        actual;

                    stackedAreaChart.loadingState(expected);
                    actual = stackedAreaChart.loadingState();

                    expect(previous).not.toEqual(actual);
                    expect(actual).toEqual(expected);
                });

                describe('when getting a loadingState', () => {
                    it('should return an SVG element', () => {
                        let expected = 1,
                            actual;

                        stackedAreaChart = stackedArea();
                        actual = stackedAreaChart.loadingState().match('stacked-area-load-state').length;

                        expect(actual).toEqual(expected);
                    });
                });
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

            it('should provide locale getter and setter', () => {
                let previous = null,
                    expected = 'ru-RU',
                    actual;

                stackedAreaChart.locale(expected);
                actual = stackedAreaChart.locale();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = stackedAreaChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                stackedAreaChart.margin(expected);
                actual = stackedAreaChart.margin();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', function () {

                it('should override the default values', () => {
                    let previous = stackedAreaChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20
                        },
                        actual;

                    stackedAreaChart.width(expected);
                    actual = stackedAreaChart.width();

                    expect(previous).not.toEqual(actual);
                    expect(actual).toEqual(expected);
                })
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
                    expected = [ 'twitter', 'user_email', 'user_newsletter', 'unknown', 'google', 'facebook'],
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

            it('should provide yTicks getter and setter', () => {
                let previous = stackedAreaChart.hasOutline(),
                    expected = false,
                    actual;

                stackedAreaChart.hasOutline(expected);
                actual = stackedAreaChart.hasOutline();

                expect(previous).not.toEqual(expected);
                expect(actual).toEqual(expected);
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

            it('should provide yAxisLabel getter and setter', () => {
                let defaultYAxisLabel = 'Hello',
                    testYAxisLabel = 'World',
                    newYAxisLabel;

                stackedAreaChart.yAxisLabel(testYAxisLabel);
                newYAxisLabel = stackedAreaChart.yAxisLabel();

                expect(defaultYAxisLabel).not.toEqual(newYAxisLabel);
                expect(newYAxisLabel).toEqual(testYAxisLabel);
            });

            it('should provide yAxisLabelOffset getter and setter', () => {
                let defaultYAxisLabelOffset =  stackedAreaChart.yAxisLabelOffset(),
                    testYAxisLabelOffset = -30,
                    newYAxisLabelOffset;

                stackedAreaChart.yAxisLabelOffset(testYAxisLabelOffset);
                newYAxisLabelOffset = stackedAreaChart.yAxisLabelOffset();

                expect(defaultYAxisLabelOffset).not.toEqual(newYAxisLabelOffset);
                expect(newYAxisLabelOffset).toEqual(testYAxisLabelOffset);
            });

            it('should provide xAxisValueType getter and setter', () => {
                let defaultXAxisValueType =  stackedAreaChart.yAxisLabelOffset(),
                    testXAxisValueType = 'number',
                    newXAxisValueType;

                stackedAreaChart.yAxisLabelOffset(testXAxisValueType);
                newXAxisValueType = stackedAreaChart.yAxisLabelOffset();

                expect(defaultXAxisValueType).not.toEqual(newXAxisValueType);
                expect(newXAxisValueType).toEqual(testXAxisValueType);
            });
        });
    });
});
