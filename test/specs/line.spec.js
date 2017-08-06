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

    function aTestDataSet() {
        return new dataBuilder.LineDataBuilder();
    }

    function hasClass(element, className) {
        return _.contains(element.node().classList, className);
    }

    describe('Line Chart', () => {
        let dataset, containerFixture, f, lineChart;

        xdescribe('when a single line', function() {

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

            describe('on render', () => {

                it('should have a gradient stroke on the chart line', () => {
                    let stroke = containerFixture.select('.chart-group').selectAll('path').node().style.stroke;

                    expect(stroke).toEqual('url("#lineGradientId")')
                });
            });
        });

        describe('when multiple lines', function() {

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
                expect(containerFixture.select('.horizontal-grid-line').empty()).toBeTruthy();
                expect(containerFixture.select('.vertical-grid-line').empty()).toBeTruthy();
            });

            it('should render an X and Y axis', () => {
                expect(containerFixture.select('.x-axis-group .x.axis').empty()).toBeFalsy();
                expect(containerFixture.select('.x-axis-group .month-axis').empty()).toBeFalsy();
                expect(containerFixture.select('.y.axis').empty()).toBeFalsy();
            });

            it('should render a line for each data topic', () => {
                let numLines = dataset.dataByTopic.length;

                expect(containerFixture.selectAll('.line').nodes().length).toEqual(numLines);
            });

            it('should not have a gradient line with a data set for more than one line', function() {
                let stroke = containerFixture.select('.chart-group').selectAll('path').nodes()[0].style.stroke;

                expect(stroke).not.toEqual('url("#line-area-gradient")');
            });

            // Event Setting
            it('should trigger an event on hover', () => {
                let callback = jasmine.createSpy('hoverCallback'),
                    container = containerFixture.selectAll('svg');

                lineChart.on('customMouseOver', callback);
                container.dispatch('mouseover');

                expect(callback.calls.count()).toBe(1);
            });

            it('should trigger an event on mouse out', () => {
                let callback = jasmine.createSpy('mouseOutCallback'),
                    container = containerFixture.selectAll('svg');

                lineChart.on('customMouseOut', callback);
                container.dispatch('mouseout');
                expect(callback.calls.count()).toBe(1);
            });

            // We need to stub some code in order to be able to run this test
            // it('should trigger an event on mouse move', () => {
            //     let callback = jasmine.createSpy('mouseMoveCallback'),
            //         container = containerFixture.selectAll('svg');
            //
            //     lineChart.on('customMouseMove', callback);
            //     container.dispatch('mousemove');

            //     expect(callback.calls.count()).toBe(1);
            // });

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
                expect(containerFixture.select('.hover-marker').empty()).toBeFalsy();
                expect(containerFixture.select('.vertical-marker').empty()).toBeFalsy();
            });

            it('should show a vertical line where the mouse is hovering', () =>  {
                let container = containerFixture.selectAll('svg'),
                    verticalLine = d3.select('.hover-marker line');

                container.dispatch('mouseover');

                expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
            });

            it('should hide the vertical marker when the mouse is out', () =>  {
                let container = containerFixture.selectAll('svg'),
                    verticalLine = d3.select('.hover-marker line');

                expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
                container.dispatch('mouseover');
                expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
                container.dispatch('mouseout');
                expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
            });
        });

        describe('when different date ranges', function() {

            beforeEach(() => {
                dataset = aTestDataSet().withHourDateRange().build();
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

            describe('on render', () => {

                it('should have an x axis with hour format', () => {
                    let container = containerFixture.selectAll('svg'),
                        xAxis = d3.select('.x-axis-group'),
                        xAxisLabels = xAxis.selectAll('.tick text'),
                        actual = xAxisLabels.text(),
                        expected = '00 AM';

                    expect(actual).toEqual(expected)
                });
            });
        });

        describe('API', function() {

            it('should provide an axisTimeCombinations accessor', () => {
                let axisTimeCombinations = lineChart.axisTimeCombinations;

                expect(axisTimeCombinations).toEqual({
                    MINUTE_HOUR: 'minute-hour',
                    HOUR_DAY: 'hour-daymonth',
                    DAY_MONTH: 'day-month',
                    MONTH_YEAR: 'month-year'
                });
            });

            it('should provide margin getter and setter', () => {
                let previous = lineChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                lineChart.margin(expected);
                actual = lineChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = lineChart.width(),
                    expected = 200,
                    actual;

                lineChart.width(expected);
                actual = lineChart.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide height getter and setter', () => {
                let previous = lineChart.height(),
                    expected = 200,
                    actual;

                lineChart.height(expected);
                actual = lineChart.height();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a tooltip threshold getter and setter', () => {
                let previous = lineChart.tooltipThreshold(),
                    expected = 600,
                    actual;

                lineChart.tooltipThreshold(expected);
                actual = lineChart.tooltipThreshold();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide an aspect ratio getter and setter', () => {
                let previous = lineChart.aspectRatio(),
                    expected = 600,
                    actual;

                lineChart.aspectRatio(expected);
                actual = lineChart.aspectRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide valueLabel getter and setter', () => {
                let previous = lineChart.valueLabel(),
                    expected = 'quantity',
                    actual;

                lineChart.valueLabel(expected);
                actual = lineChart.valueLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide dateLabel getter and setter', () => {
                let previous = lineChart.dateLabel(),
                    expected = 'dateUTC',
                    actual;

                lineChart.dateLabel(expected);
                actual = lineChart.dateLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide topicLabel getter and setter', () => {
                let previous = lineChart.topicLabel(),
                    expected = 'valueSet',
                    actual;

                lineChart.topicLabel(expected);
                actual = lineChart.topicLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a colorSchema getter and setter', () => {
                let previous = lineChart.colorSchema(),
                    expected = ['#ffffff', '#fafefc', '#000000'],
                    actual;

                lineChart.colorSchema(expected);
                actual = lineChart.colorSchema();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xAxisFormat getter and setter', () => {
                let previous = lineChart.xAxisFormat(),
                    expected = lineChart.axisTimeCombinations.HOUR_DAY,
                    actual;

                lineChart.xAxisFormat(expected);
                actual = lineChart.xAxisFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a xAxisCustomFormat getter and setter', () => {
                let previous = lineChart.xAxisCustomFormat(),
                    expected = '%d %b',
                    actual;

                lineChart.xAxisCustomFormat(expected);
                actual = lineChart.xAxisCustomFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
            
            it('should provide a xTicks getter and setter', () => {
                let previous = lineChart.xTicks(),
                    expected = 2,
                    actual;

                lineChart.xTicks(expected);
                actual = lineChart.xTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = lineChart.yTicks(),
                    expected = 3,
                    actual;

                lineChart.yTicks(expected);
                actual = lineChart.yTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide grid mode getter and setter', () => {
                let previous = lineChart.grid(),
                    expected = 'vertical',
                    actual;

                lineChart.grid(expected);
                actual = lineChart.grid();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide lineGradient getter and setter', () => {
                let previous = lineChart.lineGradient(),
                    expected = ['#ddd', '#ccc'],
                    actual;

                lineChart.lineGradient(expected);
                actual = lineChart.lineGradient();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide animation getter and setter', () => {
                let previous = lineChart.isAnimated(),
                    expected = true,
                    actual;

                lineChart.isAnimated(expected);
                actual = lineChart.isAnimated();

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

                    lineChart.aspectRatio(testAspectRatio);
                    lineChart.width(testWidth);
                    newHeight = lineChart.height();

                    expect(newHeight).toBe(Math.ceil(testWidth*testAspectRatio));
                });

                it('should modify the width depending on the height', () => {
                    let testAspectRatio = 0.5,
                        testHeight = 400,
                        newWidth;

                    lineChart.aspectRatio(testAspectRatio);
                    lineChart.height(testHeight);
                    newWidth = lineChart.width();

                    expect(newWidth).toBe(Math.ceil(testHeight/testAspectRatio));
                });
            });
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(lineChart.exportChart).toBeDefined();
            });
        });

        describe('Grid', function() {

            beforeEach(() => {
                dataset = aTestDataSet().with5Topics().build();

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');
            });

            afterEach(() => {
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            describe('when grid is horizontal', function() {

                beforeEach(function() {
                    lineChart = chart().grid('horizontal');

                    containerFixture = d3.select('.test-container').append('svg');
                    containerFixture.datum(dataset).call(lineChart);
                });

                it('should render the horizontal grid lines', () => {
                    expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
                    expect(containerFixture.select('.vertical-grid-line').empty()).toBeTruthy();
                });
            });

            describe('when grid is vertical', function() {

                beforeEach(function() {
                    lineChart = chart().grid('vertical');

                    containerFixture = d3.select('.test-container').append('svg');
                    containerFixture.datum(dataset).call(lineChart);
                });

                it('should render the vertical grid lines', () => {
                    expect(containerFixture.select('.horizontal-grid-line').empty()).toBeTruthy();
                    expect(containerFixture.select('.vertical-grid-line').empty()).toBeFalsy();
                });
            });

            describe('when grid is full', function() {

                beforeEach(function() {
                    lineChart = chart().grid('full');

                    containerFixture = d3.select('.test-container').append('svg');
                    containerFixture.datum(dataset).call(lineChart);
                });

                it('should render the vertical grid lines', () => {
                    expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
                    expect(containerFixture.select('.vertical-grid-line').empty()).toBeFalsy();
                });
            });
        });
    });
});
