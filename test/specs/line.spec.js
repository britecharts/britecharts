define([
    'underscore',
    'jquery',
    'd3',
    'line',
    'lineChartDataBuilder'
    ], function(
        _,
        $,
        d3,
        chart,
        dataBuilder
    ) {
    'use strict';

    describe('Reusable Line Chart Test Suite', () => {
        let dataset, containerFixture, f, lineChart;

        function aTestDataSet() {
            return new dataBuilder.SalesDataBuilder();
        }

        function hasClass(element, className) {
            return _.contains(element[0][0].classList, className);
        }

        describe('A line chart with a single line', function() {

            beforeEach(() => {
                dataset = aTestDataSet().withOneSource().build();
                lineChart = chart();

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(lineChart);
            });

            afterEach(() => {
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            describe('Render', () => {

                it('should have a gradient stroke on the chart line', () => {
                    let stroke = containerFixture.select('.chart-group').selectAll('path').node().style.stroke;

                    expect(stroke).toEqual('url("#lineGradientId")')
                });
            });
        });

        describe('A line chart with multiple lines', function() {

            beforeEach(() => {
                dataset = aTestDataSet().with5Topics().build();
                lineChart = chart();

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(lineChart);
            });

            afterEach(() => {
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a chart with minimal requirements', () => {
                expect(containerFixture.select('.line-chart').empty()).toBeFalsy();
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
            });

            it('should render an X and Y axis', () => {
                expect(containerFixture.select('.x.axis').empty()).toBeFalsy();
                expect(containerFixture.select('.x-axis-group .month-axis').empty()).toBeFalsy();
                expect(containerFixture.select('.y.axis').empty()).toBeFalsy();
            });

            it('should render a line for each data topic', () => {
                let numLines = dataset.data.length;

                expect(containerFixture.selectAll('.line')[0].length).toEqual(numLines);
            });

            it('should not have a gradient line with a data set for more than one line', function() {
                var stroke = containerFixture.select('.chart-group').selectAll('path')[0][0].style.stroke;
                expect(stroke).not.toEqual('url("#line-area-gradient")');
            });


            // Event Setting
            it('should trigger an event on hover', () => {
                let callback = jasmine.createSpy('hoverCallback'),
                    container = containerFixture.selectAll('svg');

                lineChart.on('customMouseOver', callback);
                container[0][0].__onmouseover();

                expect(callback.calls.count()).toBe(1);
            });

            it('should trigger an event on mouse out', () => {
                let callback = jasmine.createSpy('mouseOutCallback'),
                    container = containerFixture.selectAll('svg');

                lineChart.on('customMouseOut', callback);
                container[0][0].__onmouseout();
                expect(callback.calls.count()).toBe(1);
            });

            // We need to stub some code in order to be able to run this test
            // it('should trigger an event on mouse move', () => {
            //     let callback = jasmine.createSpy('mouseMoveCallback'),
            //         container = containerFixture.selectAll('svg');
            //     lineChart.on('customMouseMove', callback);
            //     container[0][0].__onmousemove();

            //     expect(callback.calls.count()).toBe(1);
            // });

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
                expect(containerFixture.select('.hover-marker').empty()).toBeFalsy();
                expect(containerFixture.select('.vertical-marker').empty()).toBeFalsy();
            });

            it('should show a vertical line where the mouse is hovering', () =>  {
                let container = containerFixture.selectAll('svg'),
                    verticalLine = d3.select('.hover-marker line');

                container[0][0].__onmouseover();

                expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
            });

            it('should hide the vertical marker when the mouse is out', () =>  {
                let container = containerFixture.selectAll('svg'),
                    verticalLine = d3.select('.hover-marker line');

                expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
                container[0][0].__onmouseover();
                expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
                container[0][0].__onmouseout();
                expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
            });

            // API
            it('should provide margin getter and setter', () => {
                let defaultMargin = lineChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                lineChart.margin(testMargin);
                newMargin = lineChart.margin();

                expect(defaultMargin).not.toBe(testMargin);
                expect(newMargin).toBe(testMargin);
            });

            it('should provide width getter and setter', () => {
                let defaultWidth = lineChart.width(),
                    testWidth = 200,
                    newWidth;

                lineChart.width(testWidth);
                newWidth = lineChart.width();

                expect(defaultWidth).not.toBe(testWidth);
                expect(newWidth).toBe(testWidth);
            });

            it('should provide height getter and setter', () => {
                let defaultHeight = lineChart.height(),
                    testHeight = 200,
                    newHeight;

                lineChart.height(testHeight);
                newHeight = lineChart.height();

                expect(defaultHeight).not.toBe(testHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide a tooltip threshold getter and setter', () => {
                let defaultHeight = lineChart.tooltipThreshold(),
                    testTooltipThreshold = 600,
                    newTooltipThreshold;

                lineChart.tooltipThreshold(testTooltipThreshold);
                newTooltipThreshold = lineChart.tooltipThreshold();

                expect(defaultHeight).not.toBe(testTooltipThreshold);
                expect(newTooltipThreshold).toBe(testTooltipThreshold);
            });

            it('should provide animation getters and setters', () => {
                let defaultEase = lineChart.ease(),
                    testEase = 'linear',
                    newEase;

                lineChart.ease(testEase);
                newEase = lineChart.ease();

                expect(defaultEase).not.toBe(testEase);
                expect(newEase).toBe(testEase);
            });

            describe('Export chart functionality', () => {

                it('should have exportChart defined', () => {
                    expect(lineChart.exportChart).toBeDefined();
                });
            });
        });
    });
});
