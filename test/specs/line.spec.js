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
            expect(containerFixture.select('.y.axis').empty()).toBeFalsy();
        });

        it('should render a line for each data topic', () => {
            let numLines = dataset.data.length;

            expect(containerFixture.selectAll('.line')[0].length).toEqual(numLines);
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

        // Tooltip and Markers
        it('should render an overlay to trigger the hover effect', () => {
            expect(containerFixture.select('.overlay').empty()).toBeFalsy();
        });

        it('should show a vertical line where the mouse is hovering', () =>  {
            let container = containerFixture.selectAll('svg'),
                verticalLine = d3.select('.hover-marker line');

            container[0][0].__onmouseover();

            expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
        });

        xit('should not show the tooltip on mobile', () =>  {
            let container = containerFixture.selectAll('svg'),
                overlay = d3.select('.overlay');

            lineChart.isMobile(true);
            containerFixture.datum(dataset).call(lineChart);

            container[0][0].__onmouseover();

            expect(overlay.style('display')).toBe('none');
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

    });

});
