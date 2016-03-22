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

    describe('Reusable Stacked Area Chart', () => {
        let dataset, containerFixture, f, stackedAreaChart;

        function aTestDataSet() {
            return new dataBuilder.StackedAreaDataBuilder();
        }

        function hasClass(element, className) {
            return _.contains(element[0][0].classList, className);
        }

        beforeEach(() => {
            dataset = aTestDataSet().withReportData().build();
            stackedAreaChart = stackedArea();

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
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
        });

        it('should render an X and Y axis', () => {
            expect(containerFixture.select('.x-axis-group .x.axis').empty()).toBeFalsy();
            expect(containerFixture.select('.x-axis-group .month-axis').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render an area for each category', () => {
            var numAreas = _.chain(dataset.data)
                .pluck('name')
                .unique()
                .value()
                .length;

            expect(containerFixture.selectAll('.layer')[0].length).toEqual(numAreas);
        });


        // Overlay
        it('should render an overlay to trigger the hover effect', () => {
            expect(containerFixture.select('.overlay').empty()).toBeFalsy();
        });

        it('should show the overlay when the mouse is hovering', () =>  {
            let container = containerFixture.selectAll('svg');

            expect(containerFixture.select('.overlay').style('display')).toBe('none');
            container[0][0].__onmouseover();
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

            container[0][0].__onmouseover();

            expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
        });

        it('should hide the vertical marker when the mouse is out', () =>  {
            let container = containerFixture.selectAll('svg'),
                verticalLine = d3.select('.vertical-marker-container .vertical-marker');

            expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
            container[0][0].__onmouseover();
            expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
            container[0][0].__onmouseout();
            expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
        });


        // Event Setting
        it('should trigger an event on hover', () => {
            let callback = jasmine.createSpy('hoverCallback'),
                container = containerFixture.selectAll('svg');

            stackedAreaChart.on('customMouseOver', callback);
            container[0][0].__onmouseover();

            expect(callback.calls.count()).toBe(1);
        });

        it('should trigger an event on mouse out', () => {
            let callback = jasmine.createSpy('mouseOutCallback'),
                container = containerFixture.selectAll('svg');

            stackedAreaChart.on('customMouseOut', callback);
            container[0][0].__onmouseout();
            expect(callback.calls.count()).toBe(1);
        });

        // it('should trigger an event on mouse move', () => {
        //     let callback = jasmine.createSpy('mouseMoveCallback'),
        //         container = containerFixture.selectAll('svg');

        //     stackedAreaChart.on('customMouseMove', callback);
        //     container[0][0].__onmousemove();
        //     expect(callback.calls.count()).toBe(1);
        // });


        // API
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

        it('should provide animation getters and setters', () => {
            let defaultEase = stackedAreaChart.ease(),
                testEase = 'linear',
                newEase;

            stackedAreaChart.ease(testEase);
            newEase = stackedAreaChart.ease();

            expect(defaultEase).not.toBe(testEase);
            expect(newEase).toBe(testEase);
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

    });
});
