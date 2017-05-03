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

    function aTestDataSet() {
        return new dataBuilder.StackedAreaDataBuilder();
    }

    function hasClass(element, className) {
        return _.contains(element.node().classList, className);
    }

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
        });

        it('should trigger an event on mouse out', () => {
            let callback = jasmine.createSpy('mouseOutCallback'),
                container = containerFixture.selectAll('svg');

            stackedAreaChart.on('customMouseOut', callback);
            container.dispatch('mouseout');
            expect(callback.calls.count()).toBe(1);
        });

        describe('API', function() {

            it('should provide margin getter and setter', () => {
                let defaultMargin = stackedAreaChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                stackedAreaChart.margin(testMargin);
                newMargin = stackedAreaChart.margin();

                expect(defaultMargin).not.toBe(testMargin);
                expect(newMargin).toBe(testMargin);
            });

            it('should provide width getter and setter', () => {
                let defaultWidth = stackedAreaChart.width(),
                    testWidth = 200,
                    newWidth;

                stackedAreaChart.width(testWidth);
                newWidth = stackedAreaChart.width();

                expect(defaultWidth).not.toBe(testWidth);
                expect(newWidth).toBe(testWidth);
            });

            it('should provide height getter and setter', () => {
                let defaultHeight = stackedAreaChart.height(),
                    testHeight = 200,
                    newHeight;

                stackedAreaChart.height(testHeight);
                newHeight = stackedAreaChart.height();

                expect(defaultHeight).not.toBe(testHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide a tooltip threshold getter and setter', () => {
                let defaultHeight = stackedAreaChart.tooltipThreshold(),
                    testTooltipThreshold = 600,
                    newTooltipThreshold;

                stackedAreaChart.tooltipThreshold(testTooltipThreshold);
                newTooltipThreshold = stackedAreaChart.tooltipThreshold();

                expect(defaultHeight).not.toBe(testTooltipThreshold);
                expect(newTooltipThreshold).toBe(testTooltipThreshold);
            });

            it('should provide a colorSchema getter and setter', () => {
                let defaultSchema = stackedAreaChart.colorSchema(),
                    testSchema = ['#ffffff', '#fafefc', '#000000'],
                    newSchema;

                stackedAreaChart.colorSchema(testSchema);
                newSchema = stackedAreaChart.colorSchema();

                expect(defaultSchema).not.toBe(testSchema);
                expect(newSchema).toBe(testSchema);
            });

            it('should provide an aspect ratio getter and setter', () => {
                let defaultAspectRatio = stackedAreaChart.aspectRatio(),
                    testAspectRatio = 600,
                    newAspectRatio;

                stackedAreaChart.aspectRatio(testAspectRatio);
                newAspectRatio = stackedAreaChart.aspectRatio();

                expect(defaultAspectRatio).not.toBe(testAspectRatio);
                expect(newAspectRatio).toBe(testAspectRatio);
            });

            it('should provide valueLabel getter and setter', () => {
                let defaultValueLabel = stackedAreaChart.valueLabel(),
                    testValueLabel = 'quantity',
                    newValueLabel;

                stackedAreaChart.valueLabel(testValueLabel);
                newValueLabel = stackedAreaChart.valueLabel();

                expect(defaultValueLabel).not.toBe(testValueLabel);
                expect(newValueLabel).toBe(testValueLabel);
            });

            it('should provide keyLabel getter and setter', () => {
                let defaultTopicLabel = stackedAreaChart.keyLabel(),
                    testTopicLabel = 'val',
                    newTopicLabel;

                stackedAreaChart.keyLabel(testTopicLabel);
                newTopicLabel = stackedAreaChart.keyLabel();

                expect(defaultTopicLabel).not.toBe(testTopicLabel);
                expect(newTopicLabel).toBe(testTopicLabel);
            });

            it('should provide dateLabel getter and setter', () => {
                let defaultDateLabel = stackedAreaChart.dateLabel(),
                    testDateLabel = 'dateFull',
                    newDateLabel;

                stackedAreaChart.dateLabel(testDateLabel);
                newDateLabel = stackedAreaChart.dateLabel();

                expect(defaultDateLabel).not.toBe(testDateLabel);
                expect(newDateLabel).toBe(testDateLabel);
            });

            it('should provide areaOpacity getter and setter', () => {
                let defaultOpacity = stackedAreaChart.areaOpacity(),
                    testOpacity = 0.5,
                    newOpacity;

                stackedAreaChart.areaOpacity(testOpacity);
                newOpacity = stackedAreaChart.areaOpacity();

                expect(defaultOpacity).not.toBe(testOpacity);
                expect(newOpacity).toBe(testOpacity);
            });

            it('should provide grid mode getter and setter', () => {
                let defaultGridMode = stackedAreaChart.grid(),
                    testValue = 'vertical',
                    newGridMode;

                stackedAreaChart.grid(testValue);
                newGridMode = stackedAreaChart.grid();

                expect(defaultGridMode).not.toBe(testValue);
                expect(newGridMode).toBe(testValue);
            });

            it('should provide verticalTicks getter and setter', () => {
                let defaultVerticalTicks = stackedAreaChart.verticalTicks(),
                    testVerticalTicks = 3,
                    newVerticalTicks;

                stackedAreaChart.verticalTicks(testVerticalTicks);
                newVerticalTicks = stackedAreaChart.verticalTicks();

                expect(defaultVerticalTicks).not.toBe(testVerticalTicks);
                expect(newVerticalTicks).toBe(testVerticalTicks);
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
