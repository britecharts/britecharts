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

        const aTestDataSet = () => new dataBuilder.LineDataBuilder();
        const buildDataSet = (dataSetName) => {
            return aTestDataSet()
                [dataSetName]()
                .build();
        };

        const hasClass = (element, className) => {
            return _.contains(element.node().classList, className);
        };

        describe('Line Chart', () => {
            let dataset, containerFixture, f, lineChart;

            describe('when a single line of zeroes', () => {

                beforeEach(() => {
                    dataset = aTestDataSet().withAllZeroes().build();
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

                    it('should have one line on the chart line', () => {
                        let expected = 1,
                            actual = containerFixture.select('.chart-group').selectAll('path').nodes().length;

                        expect(actual).toEqual(expected);
                    });

                    it('should have a gradient stroke on the chart line', () => {
                        let actual = containerFixture.select('.chart-group').selectAll('path').node().style.stroke.match('one-line-gradient').length,
                            expected = 1;

                        expect(actual).toEqual(expected);
                    });
                });
            });

            describe('when multiple lines', () => {

                beforeEach(() => {
                    dataset = buildDataSet('with5Topics');
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
                    expect(callback.calls.allArgs()[0].length).toBe(2);
                });

                it('should trigger an event on mouse out', () => {
                    let callback = jasmine.createSpy('mouseOutCallback'),
                        container = containerFixture.selectAll('svg');

                    lineChart.on('customMouseOut', callback);
                    container.dispatch('mouseout');
                    expect(callback.calls.count()).toBe(1);
                    expect(callback.calls.allArgs()[0].length).toBe(2);
                });

                it('should trigger an event on touchmove', () => {
                    let callback = jasmine.createSpy('touchMoveCallback'),
                        container = containerFixture.selectAll('svg');

                    lineChart.on('customTouchMove', callback);
                    container.dispatch('touchmove');

                    expect(callback.calls.count()).toBe(1);
                    expect(callback.calls.allArgs()[0].length).toBe(2);
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

                it('should render an overlay to trigger the hover effect', () => {
                    expect(containerFixture.select('.overlay').empty()).toBeFalsy();
                });

                it('should show the overlay when the mouse is hovering', () =>  {
                    let container = containerFixture.selectAll('svg');

                    expect(containerFixture.select('.overlay').style('display')).toBe('none');
                    container.dispatch('mouseover');
                    expect(containerFixture.select('.overlay').style('display')).toBe('block');
                });

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

                describe('when reloading with a different dataset', () => {

                    it('should render in the same svg', function() {
                        let actual;
                        let expected = 1;
                        let newDataset = buildDataSet('withOneSource');

                        containerFixture.datum(newDataset).call(lineChart);

                        actual = containerFixture.selectAll('.line-chart').nodes().length;

                        expect(actual).toEqual(expected);
                    });

                    it('should render one line', function() {
                        let actual;
                        let expected = 1;
                        let newDataset = buildDataSet('withOneSource');

                        containerFixture.datum(newDataset).call(lineChart);

                        actual = containerFixture.selectAll('.line-chart .line').nodes().length;

                        expect(actual).toEqual(expected);
                    });

                    it('should not throw error on mousemove', function() {
                        let container = containerFixture.selectAll('svg'),
                            newDataset = buildDataSet('withOneSource');

                        // Need to refresh the data twice to get failure before fix
                        containerFixture.datum(newDataset).call(lineChart);
                        containerFixture.datum(newDataset).call(lineChart);
                        container.dispatch('mousemove');
                    })
                });
            });

            describe('when different date ranges', () => {

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

            describe('API', () => {

                it('should provide an axisTimeCombinations accessor', () => {
                    let axisTimeCombinations = lineChart.axisTimeCombinations;

                    expect(axisTimeCombinations).toEqual({
                        MINUTE_HOUR: 'minute-hour',
                        HOUR_DAY: 'hour-daymonth',
                        DAY_MONTH: 'day-month',
                        MONTH_YEAR: 'month-year',
                        CUSTOM: 'custom'
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

                it('should not have numberFormat by default', () => {
                    let expected = undefined,
                    actual;

                    actual = lineChart.numberFormat();

                    expect(expected).toBe(actual);
                });

                it('should provide numberFormat getter and setter', () =>{
                    let previous = lineChart.numberFormat(),
                        expected = 'd',
                        actual;

                    lineChart.numberFormat(expected);
                    actual = lineChart.numberFormat();

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

                it('should provide lineCurve getter and setter', () => {
                    let previous = lineChart.lineCurve(),
                        expected = 'basis',
                        actual;

                    lineChart.lineCurve(expected);
                    actual = lineChart.lineCurve();

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

                it('should provide loadingState getter and setter', () => {
                    let previous = lineChart.loadingState(),
                        expected = 'test',
                        actual;

                    lineChart.loadingState(expected);
                    actual = lineChart.loadingState();

                    expect(previous).not.toBe(actual);
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

                it('should provide locale getter and setter', () => {
                    let previous = lineChart.locale(),
                        expected = 'en-US',
                        actual;

                    lineChart.locale(expected);
                    actual = lineChart.locale();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide xAxisLabel getter and setter', () => {
                    let previous = lineChart.xAxisLabel(),
                        expected = 'valueSet',
                        actual;

                    lineChart.xAxisLabel(expected);
                    actual = lineChart.xAxisLabel();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide yAxisLabel getter and setter', () => {
                    let previous = lineChart.yAxisLabel(),
                        expected = 'valueSet',
                        actual;

                    lineChart.yAxisLabel(expected);
                    actual = lineChart.yAxisLabel();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide yAxisLabelPadding getter and setter', () => {
                    let previous = lineChart.yAxisLabelPadding(),
                        expected = 100,
                        actual;

                    lineChart.yAxisLabelPadding(expected);
                    actual = lineChart.yAxisLabelPadding();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });
            });

            describe('Aspect Ratio', () => {

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

            describe('Grid', () => {

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

            describe('Axis Labels', () => {
                describe('when axis labels aren\'t set', () => {
    
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
    
                    it('should not render the x-axis label', () => {
                        let expected = 0,
                            actual = containerFixture.selectAll('.x-axis-label')['_groups'][0].length;
    
                        expect(actual).toEqual(expected);
                    });
    
                    it('should not render any axisLabel', () => {
                        let expected = 0,
                            actual = containerFixture.selectAll('.y-axis-label')['_groups'][0].length;
    
                        expect(actual).toEqual(expected);
                    });
                });
    
                describe('when axis labels are set', () => {
    
                    beforeEach(() => {
                        dataset = aTestDataSet().withOneSource().build();
                        lineChart = chart()
                                        .xAxisLabel('valueSetX')
                                        .yAxisLabel('valueSetY');
    
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
    
                    it('should render the x-axis label', () => {
                        let expected = 1,
                            actual = containerFixture.selectAll('.x-axis-label')['_groups'][0].length;
    
                        expect(actual).toEqual(expected);
                    });
    
                    it('should render any axisLabel', () => {
                        let expected = 1,
                            actual = containerFixture.selectAll('.y-axis-label')['_groups'][0].length;
    
                        expect(actual).toEqual(expected);
                    });
                });
            });
        });
    });
