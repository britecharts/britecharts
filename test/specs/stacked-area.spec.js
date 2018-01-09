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
            dataset = aTestDataSet().withReportData().build();
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

        it('should render a stacked area chart with minimal requirements', () =>  {
            expect(containerFixture.select('.stacked-area').empty()).toBeFalsy();
        });

        it('should render container, axis and chart groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.x-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.grid-lines-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
        });

        it('should not render grid lines', () => {
            expect(containerFixture.select('.horizontal-grid-line').empty()).toBeTruthy();
            expect(containerFixture.select('.vertical-grid-line').empty()).toBeTruthy();
        });

        it('should render an X and Y axis', () => {
            expect(containerFixture.select('.x-axis-group .x.axis').empty()).toBeFalsy();
            expect(containerFixture.select('.x-axis-group .month-axis').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render an area for each category', () => {
            let expected = _.chain(dataset.data)
                .pluck('name')
                .unique()
                .value()
                .length,
                actual = containerFixture.selectAll('.layer').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render an area-outline for each category', () => {
            let expected = _.chain(dataset.data)
                .pluck('name')
                .unique()
                .value()
                .length,
                actual = containerFixture.selectAll('.area-outline').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render areas and areas outlines that follow the same path', () => {
            let layerContainerNodes = containerFixture.selectAll('.layer-container').nodes();

            layerContainerNodes.forEach(layerContainerNode => {
                let areaPath = layerContainerNode.childNodes[0].attributes.d.value;
                let areaOutlinePath = layerContainerNode.childNodes[1].attributes.d.value;

                expect(areaPath).toContain(areaOutlinePath);
            });
        });

        // Overlay
        it('should render an overlay to trigger the hover effect', () => {
            expect(containerFixture.select('.overlay').empty()).toBeFalsy();
        });

        it('should show the overlay when the mouse is hovering', () =>  {
            let container = containerFixture.selectAll('svg');

            expect(containerFixture.select('.overlay').style('display')).toBe('none');
            container.dispatch('mouseover');
            expect(containerFixture.select('.overlay').style('display')).toBe('block');
        });

        // Vertical Marker
        it('should render a vertical marker and its container', () => {
            expect(containerFixture.select('.vertical-marker-container').empty()).toBeFalsy();
            expect(containerFixture.select('.vertical-marker').empty()).toBeFalsy();
        });

        it('should show a vertical line where the mouse is hovering', () =>  {
            let container = containerFixture.selectAll('svg'),
                verticalLine = d3.select('.vertical-marker-container .vertical-marker');

            container.dispatch('mouseover');

            expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
        });

        it('should hide the vertical marker when the mouse is out', () =>  {
            let container = containerFixture.selectAll('svg'),
                verticalLine = d3.select('.vertical-marker-container .vertical-marker');

            expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
            container.dispatch('mouseover');
            expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
            container.dispatch('mouseout');
            expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
        });

        // Event Setting
        it('should trigger an event on hover', () => {
            let callback = jasmine.createSpy('hoverCallback'),
                container = containerFixture.selectAll('svg');

            stackedAreaChart.on('customMouseOver', callback);
            container.dispatch('mouseover');

            expect(callback.calls.count()).toBe(1);
            expect(callback.calls.allArgs()[0].length).toBe(2);
        });

        it('should trigger an event on mouse out', () => {
            let callback = jasmine.createSpy('mouseOutCallback'),
                container = containerFixture.selectAll('svg');

            stackedAreaChart.on('customMouseOut', callback);
            container.dispatch('mouseout');
            expect(callback.calls.count()).toBe(1);
            expect(callback.calls.allArgs()[0].length).toBe(2);
        });

        it('should be able to render even when data is length 0', () => {
            expect(() => containerFixture.datum([]).call(stackedAreaChart)).not.toThrow();
        });

        // Add test for highlight circles events
        // We will need to simulate a click on one of them after a mouse move
        xit('should trigger an event on mouse click', () => {
            let callback = jasmine.createSpy('mouseClickCallback'),
                container = containerFixture.selectAll('svg');

            stackedAreaChart.on('customDataEntryClick', callback);
            container.dispatch('mousemove');

            let nodes = container.selectAll('.data-point-highlighter').nodes().length;

            expect(callback.calls.count()).toBe(1);
            expect(callback.calls.allArgs()[0].length).toBe(2);
        });

        describe('when reloading with a three sources dataset', () => {
            
            it('should render in the same svg', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('with3Sources');

                containerFixture.datum(newDataset.data).call(stackedAreaChart);

                actual = containerFixture.selectAll('.stacked-area').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render three layers', function() {
                let actual;
                let expected = 3;
                let newDataset = buildDataSet('with3Sources');

                containerFixture.datum(newDataset.data).call(stackedAreaChart);

                actual = containerFixture.selectAll('.stacked-area .layer').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render three area outlines', function() {
                let actual;
                let expected = 3;
                let newDataset = buildDataSet('with3Sources');

                containerFixture.datum(newDataset.data).call(stackedAreaChart);

                actual = containerFixture.selectAll('.stacked-area .area-outline').nodes().length;

                expect(actual).toEqual(expected);
            });
        });

        describe('API', function() {

            it('should provide areaOpacity getter and setter', () => {
                let previous = stackedAreaChart.areaOpacity(),
                    expected = 0.5,
                    actual;

                stackedAreaChart.areaOpacity(expected);
                actual = stackedAreaChart.areaOpacity();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
            
            it('should provide an aspect ratio getter and setter', () => {
                let previous = stackedAreaChart.aspectRatio(),
                    expected = 600,
                    actual;

                stackedAreaChart.aspectRatio(expected);
                actual = stackedAreaChart.aspectRatio();

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
                        maxY: 100
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

            it('should provide loadingState getter and setter', () => {
                let previous = stackedAreaChart.loadingState(),
                    expected = 'test',
                    actual;

                stackedAreaChart.loadingState(expected);
                actual = stackedAreaChart.loadingState();

                expect(previous).not.toBe(actual);
                expect(actual).toBe(expected);
            });

            it('should provide isAnimated getter and setter', () => {
                let previous = stackedAreaChart.isAnimated(),
                    expected = true,
                    actual;

                stackedAreaChart.isAnimated(expected);
                actual = stackedAreaChart.isAnimated();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide keyLabel getter and setter', () => {
                let previous = stackedAreaChart.keyLabel(),
                    expected = 'val',
                    actual;

                stackedAreaChart.keyLabel(expected);
                actual = stackedAreaChart.keyLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide locale getter and setter', () => {
                let previous = null,
                    expected = 'ru-RU',
                    actual;

                stackedAreaChart.locale(expected);
                actual = stackedAreaChart.locale();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = stackedAreaChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                stackedAreaChart.margin(expected);
                actual = stackedAreaChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a tooltip threshold getter and setter', () => {
                let previous = stackedAreaChart.tooltipThreshold(),
                    expected = 600,
                    actual;

                stackedAreaChart.tooltipThreshold(expected);
                actual = stackedAreaChart.tooltipThreshold();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a topicsOrder getter and setter', () => {
                let previous = stackedAreaChart.topicsOrder(),
                    expected = [ 'twitter', 'user_email', 'user_newsletter', 'unknown', 'google', 'facebook'],
                    actual;

                stackedAreaChart.topicsOrder(expected);
                actual = stackedAreaChart.topicsOrder();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let previous = stackedAreaChart.valueLabel(),
                    expected = 'quantity',
                    actual;

                stackedAreaChart.valueLabel(expected);
                actual = stackedAreaChart.valueLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = stackedAreaChart.width(),
                    expected = 200,
                    actual;

                stackedAreaChart.width(expected);
                actual = stackedAreaChart.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xAxisCustomFormat getter and setter', () => {
                let previous = stackedAreaChart.xAxisCustomFormat(),
                    expected = '%d %b',
                    actual;

                stackedAreaChart.xAxisCustomFormat(expected);
                actual = stackedAreaChart.xAxisCustomFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xAxisFormat getter and setter', () => {
                let previous = stackedAreaChart.xAxisFormat(),
                    expected = stackedAreaChart.axisTimeCombinations.HOUR_DAY,
                    actual;

                stackedAreaChart.xAxisFormat(expected);
                actual = stackedAreaChart.xAxisFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xTicks getter and setter', () => {
                let previous = stackedAreaChart.xTicks(),
                    expected = 2,
                    actual;

                stackedAreaChart.xTicks(expected);
                actual = stackedAreaChart.xTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = stackedAreaChart.yTicks(),
                    expected = 3,
                    actual;

                stackedAreaChart.yTicks(expected);
                actual = stackedAreaChart.yTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });

        describe('Aspect Ratio', function() {

            describe('when an aspect ratio is set', function() {

                it('should modify the height depending on the width', () => {
                    let testAspectRatio = 0.5,
                        testWidth = 400,
                        newHeight;

                    stackedAreaChart.aspectRatio(testAspectRatio);
                    stackedAreaChart.width(testWidth);
                    newHeight = stackedAreaChart.height();

                    expect(newHeight).toBe(Math.ceil(testWidth*testAspectRatio));
                });

                it('should modify the width depending on the height', () => {
                    let testAspectRatio = 0.5,
                        testHeight = 400,
                        newWidth;

                    stackedAreaChart.aspectRatio(testAspectRatio);
                    stackedAreaChart.height(testHeight);
                    newWidth = stackedAreaChart.width();

                    expect(newWidth).toBe(Math.ceil(testHeight/testAspectRatio));
                });
            });
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(stackedAreaChart.exportChart).toBeDefined();
            });
        });

        describe('Grid', function() {

            describe('when grid is horizontal', function() {

                beforeEach(function() {
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
            });

            describe('when grid is vertical', function() {

                beforeEach(function() {
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

            describe('when grid is full', function() {

                beforeEach(function() {
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
            });
        });
    });
});
