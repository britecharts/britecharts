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

            describe('Render', () => {

                describe('when a single line of zeroes', () => {

                    beforeEach(() => {
                        dataset = buildDataSet('withAllZeroes');
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

                    it('should have one line on the chart line', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.chart-group')
                            .selectAll('path')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should have a gradient stroke on the chart line', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.chart-group')
                            .selectAll('path')
                            .node().style.stroke.match('one-line-gradient').length;

                        expect(actual).toEqual(expected);
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

                    it('should show a chart with minimal requirements', () => {
                        const expected = 1;
                        const actual = containerFixture.select('.line-chart').size();

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

                    describe('grids', () => {

                        describe('when grid is horizontal', () => {

                            beforeEach(() => {
                                lineChart = chart().grid('horizontal');

                                containerFixture = d3.select('.test-container').append('svg');
                                containerFixture.datum(dataset).call(lineChart);
                            });

                            it('should draw horizontal grid lines', () => {
                                const expected = 1;
                                const actual = containerFixture.select('.horizontal-grid-line').size();

                                expect(actual).toEqual(expected);
                            });

                            it('should not draw vertical grid lines', () => {
                                const expected = 0;
                                const actual = containerFixture.select('.vertical-grid-line').size();

                                expect(actual).toEqual(expected);
                            });

                            it('0-axis is NOT highlited with an additional class', () => {
                                let values = dataset.dataByTopic[0].dates.map(it => it.value);
                                let minValue = Math.min(...values);
                                expect(minValue).toEqual(0);
                                let indexOf0 = -minValue;
                                
                                let horizontalGridLines = d3.selectAll('.horizontal-grid-line').filter((_, i) => i === indexOf0);
                                let classes = horizontalGridLines.attr('class').split(' ');
                                expect(classes.includes('horizontal-grid-line--highlighted')).toEqual(false);
                            });
                        });

                        describe('when grid is vertical', function () {

                            beforeEach(function () {
                                lineChart = chart().grid('vertical');

                                containerFixture = d3.select('.test-container').append('svg');
                                containerFixture.datum(dataset).call(lineChart);
                            });

                            it('should not draw horizontal grid lines', () => {
                                const expected = 0;
                                const actual = containerFixture.select('.horizontal-grid-line').size();

                                expect(actual).toEqual(expected);
                            });

                            it('should draw vertical grid lines', () => {
                                const expected = 1;
                                const actual = containerFixture.select('.vertical-grid-line').size();

                                expect(actual).toEqual(expected);
                            });
                        });

                        describe('when grid is full', function () {

                            beforeEach(function () {
                                lineChart = chart().grid('full');

                                containerFixture = d3.select('.test-container').append('svg');
                                containerFixture.datum(dataset).call(lineChart);
                            });

                            it('should draw horizontal grid lines', () => {
                                const expected = 1;
                                const actual = containerFixture.select('.horizontal-grid-line').size();

                                expect(actual).toEqual(expected);
                            });

                            it('should draw vertical grid lines', () => {
                                const expected = 1;
                                const actual = containerFixture.select('.vertical-grid-line').size();

                                expect(actual).toEqual(expected);
                            });
                        });
                    });

                    describe('axis', () => {

                        it('should draw an X axis', () => {
                            const expected = 1;
                            const actual = containerFixture.select('.x-axis-group .x.axis').size();

                            expect(actual).toEqual(expected);
                        });

                        it('should draw a month X axis', () => {
                            const expected = 1;
                            const actual = containerFixture.select('.x-axis-group .month-axis').size();

                            expect(actual).toEqual(expected);
                        });

                        it('should draw an Y axis', () => {
                            const expected = 1;
                            const actual = containerFixture.select('.y.axis').size();

                            expect(actual).toEqual(expected);
                        });
                    });

                    it('should render a line for each data topic', () => {
                        const expected = dataset.dataByTopic.length;
                        const actual = containerFixture.selectAll('.line').size();

                        expect(actual).toEqual(expected);
                    });

                    it('should not have a gradient line with a data set for more than one line', () => {
                        const expected = 'url("#line-area-gradient")';
                        const actual = containerFixture
                            .select('.chart-group')
                            .selectAll('path')
                            .node()
                            .style.stroke;

                        expect(actual).not.toEqual(expected);
                    });

                    it('should render an overlay to trigger the hover effect', () => {
                        const expected = 1;
                        const actual = containerFixture.select('.overlay').size();

                        expect(actual).toEqual(expected);
                    });

                    it('should render a vertical marker', () => {
                        const expected = 1;
                        const actual = containerFixture.select('.hover-marker').size();

                        expect(actual).toEqual(expected);
                    });

                    it('should render a vertical marker container', () => {
                        const expected = 1;
                        const actual = containerFixture.select('.vertical-marker').size();

                        expect(actual).toEqual(expected);
                    });

                    describe('when reloading with a different dataset', () => {

                        it('should render in the same svg', function () {
                            const expected = 1;
                            const newDataset = buildDataSet('withOneSource');
                            let actual;

                            containerFixture.datum(newDataset).call(lineChart);
                            actual = containerFixture.selectAll('.line-chart').size();

                            expect(actual).toEqual(expected);
                        });

                        it('should render one line', function () {
                            const expected = 1;
                            const newDataset = buildDataSet('withOneSource');
                            let actual;

                            containerFixture.datum(newDataset).call(lineChart);
                            actual = containerFixture.selectAll('.line-chart .line').size();

                            expect(actual).toEqual(expected);
                        });

                        it('should not throw error on mousemove', function () {
                            const container = containerFixture.selectAll('svg');
                            const newDataset = buildDataSet('withOneSource');

                            // Need to refresh the data twice to get failure before fix
                            containerFixture.datum(newDataset).call(lineChart);
                            containerFixture.datum(newDataset).call(lineChart);
                            container.dispatch('mousemove');
                        })
                    });

                    describe('axis Labels', () => {
                        describe('when axis labels aren\'t set', () => {
                            beforeEach(() => {
                                dataset = buildDataSet('withOneSource');
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
                                const expected = 0;
                                const actual = containerFixture.selectAll('.x-axis-label')['_groups'][0].length;

                                expect(actual).toEqual(expected);
                            });

                            it('should not render any axisLabel', () => {
                                const expected = 0;
                                const actual = containerFixture.selectAll('.y-axis-label')['_groups'][0].length;

                                expect(actual).toEqual(expected);
                            });
                        });

                        describe('when axis labels are set', () => {

                            beforeEach(() => {
                                dataset = buildDataSet('withOneSource');
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
                                const expected = 1;
                                const actual = containerFixture.selectAll('.x-axis-label')['_groups'][0].length;

                                expect(actual).toEqual(expected);
                            });

                            it('should render any axisLabel', () => {
                                const expected = 1;
                                const actual = containerFixture.selectAll('.y-axis-label')['_groups'][0].length;

                                expect(actual).toEqual(expected);
                            });
                        });
                    });

                    describe('when different date ranges', () => {

                        beforeEach(() => {
                            dataset = buildDataSet('withHourDateRange');
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

                        it('should have an x axis with hour format', () => {
                            const expected = '00 AM';
                            const container = containerFixture.selectAll('svg');
                            const xAxis = d3.select('.x-axis-group');
                            const xAxisLabels = xAxis.selectAll('.tick text');
                            const actual = xAxisLabels.text();

                            expect(actual).toEqual(expected)
                        });
                    });

                    describe('when using flat data', () => {
                        beforeEach(() => {
                            dataset = buildDataSet('withTwoFlatTopics');
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

                        it('should render a chart with two lines', () => {
                            const expected = 2;
                            const actual = containerFixture.select('.chart-group').selectAll('path').size();

                            expect(actual).toEqual(expected);
                        });
                    });
                });

                describe('data points', () => {

                    beforeEach(() => {
                        dataset = buildDataSet('with5Topics');

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

                    describe('when shouldShowAllDataPoints is true', () => {

                        beforeEach(() => {
                            lineChart = chart().shouldShowAllDataPoints(true);

                            containerFixture = d3.select('.test-container').append('svg');
                            containerFixture.datum(dataset).call(lineChart);
                        });

                        it('chart should render data points container', () => {
                            const expected = 1;
                            const actual = containerFixture.select('.data-points-container').size();

                            expect(actual).toEqual(expected);
                        });

                        it('data points container renders a circle for each data point', () => {
                            const expected = dataset.dataByDate.reduce((accum, dataPoint) => (
                                accum + dataPoint.topics.length
                            ), 0);
                            const actual = containerFixture.select('.data-points-container')
                                .selectAll('circle')
                                .size();

                            expect(actual).toEqual(expected);
                        });

                        it('each data circle has proper attributes', () => {
                            const circles = containerFixture.select('.data-points-container')
                                .selectAll('circle')
                                .nodes();

                            circles.forEach((circle) => {
                                expect(circle).toHaveAttr('class', 'data-point-mark');
                                expect(circle).toHaveAttr('r', '5');
                                expect(circle).toHaveAttr('cx');
                                expect(circle).toHaveAttr('cy');
                                expect(circle).toHaveAttr('style');
                            });
                        });
                    });
                });

                describe('when has negative values', () => {
                    beforeEach(() => {
                        dataset = buildDataSet('withNegativeValues');
                        lineChart = chart().grid('full');

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

                    it('The lowest Y-axis value is negative', () => {
                        let values = dataset.dataByTopic[0].dates.map(it => it.value);
                        let minValue = Math.min(...values);
                        let minValueText = '' + minValue;

                        let yAxis = d3.select('.y-axis-group');
                        let text = yAxis.select('g.tick');
                        expect(text.text()).toEqual(minValueText);
                    })

                    it('0-axis is highlited with an additional class', () => {
                        let values = dataset.dataByTopic[0].dates.map(it => it.value);
                        let minValue = Math.min(...values);
                        let indexOf0 = -minValue;
                        
                        let horizontalGridLines = d3.selectAll('.horizontal-grid-line').filter((_, i) => i === indexOf0);
                        let classes = horizontalGridLines.attr('class').split(' ');
                        expect(classes.includes('horizontal-grid-line--highlighted')).toEqual(true);
                    });
                });
            });

            describe('Lifecycle', () => {

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

                it('should trigger an event on hover', () => {
                    const callback = jasmine.createSpy('hoverCallback');
                    const container = containerFixture.selectAll('svg');
                    const expectedCalls = 1;
                    const expectedArguments = 2;

                    lineChart.on('customMouseOver', callback);
                    container.dispatch('mouseover');

                    expect(callback.calls.count()).toBe(expectedCalls);
                    expect(callback.calls.allArgs()[0].length).toBe(expectedArguments);
                });

                it('should trigger an event on mouse out', () => {
                    const callback = jasmine.createSpy('mouseOutCallback');
                    const container = containerFixture.selectAll('svg');
                    const expectedCalls = 1;
                    const expectedArguments = 2;

                    lineChart.on('customMouseOut', callback);
                    container.dispatch('mouseout');

                    expect(callback.calls.count()).toBe(expectedCalls);
                    expect(callback.calls.allArgs()[0].length).toBe(expectedArguments);
                });

                it('should trigger an event on touchmove', () => {
                    const callback = jasmine.createSpy('touchMoveCallback');
                    const container = containerFixture.selectAll('svg');
                    const expectedCalls = 1;
                    const expectedArguments = 2;

                    lineChart.on('customTouchMove', callback);
                    container.dispatch('touchmove');

                    expect(callback.calls.count()).toEqual(expectedCalls);
                    expect(callback.calls.allArgs()[0].length).toEqual(expectedArguments);
                });

                it('should show the overlay when the mouse is hovering', () => {
                    const container = containerFixture.selectAll('svg');
                    const expectedInitial = 'none';
                    const expected = 'block';
                    let actual = containerFixture.select('.overlay').style('display');

                    expect(actual).toEqual(expectedInitial);
                    container.dispatch('mouseover');
                    actual = containerFixture.select('.overlay').style('display');

                    expect(actual).toEqual(expected);
                });

                it('should show a vertical line where the mouse is hovering', () => {
                    const expected = true;
                    const container = containerFixture.selectAll('svg');
                    const verticalLine = d3.select('.hover-marker line');
                    let actual;

                    container.dispatch('mouseover');
                    actual = hasClass(verticalLine, 'bc-is-active');

                    expect(actual).toEqual(expected);
                });

                it('should hide the vertical marker when the mouse is out', () => {
                    const container = containerFixture.selectAll('svg');
                    const verticalLine = d3.select('.hover-marker line');

                    expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
                    container.dispatch('mouseover');
                    expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
                    container.dispatch('mouseout');
                    expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
                });
            });

            describe('API', () => {

                beforeEach(() => {
                    dataset = buildDataSet('withOneSource');
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

                describe('Aspect Ratio', () => {

                    it('should provide an aspect ratio getter and setter', () => {
                        let previous = lineChart.aspectRatio(),
                            expected = 600,
                            actual;

                        lineChart.aspectRatio(expected);
                        actual = lineChart.aspectRatio();

                        expect(previous).not.toBe(expected);
                        expect(actual).toBe(expected);
                    });

                    describe('when an aspect ratio is set', () => {

                        it('should modify the height depending on the width', () => {
                            let testAspectRatio = 0.5,
                                testWidth = 400,
                                newHeight;

                            lineChart.aspectRatio(testAspectRatio);
                            lineChart.width(testWidth);
                            newHeight = lineChart.height();

                            expect(newHeight).toBe(Math.ceil(testWidth * testAspectRatio));
                        });

                        it('should modify the width depending on the height', () => {
                            let testAspectRatio = 0.5,
                                testHeight = 400,
                                newWidth;

                            lineChart.aspectRatio(testAspectRatio);
                            lineChart.height(testHeight);
                            newWidth = lineChart.width();

                            expect(newWidth).toBe(Math.ceil(testHeight / testAspectRatio));
                        });
                    });
                });

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

                describe('Export', () => {

                    it('should have exportChart defined', () => {
                        expect(lineChart.exportChart).toBeDefined();
                    });
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

                it('should provide dateLabel getter and setter', () => {
                    let previous = lineChart.dateLabel(),
                        expected = 'dateUTC',
                        actual;

                    lineChart.dateLabel(expected);
                    actual = lineChart.dateLabel();

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

                it('should provide height getter and setter', () => {
                    let previous = lineChart.height(),
                        expected = 200,
                        actual;

                    lineChart.height(expected);
                    actual = lineChart.height();

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

                describe('margin', () => {
                    it('should provide margin getter and setter', () => {
                        let previous = lineChart.margin(),
                            expected = { top: 4, right: 4, bottom: 4, left: 4 },
                            actual;

                        lineChart.margin(expected);
                        actual = lineChart.margin();

                        expect(previous).not.toBe(expected);
                        expect(actual).toEqual(expected);
                    });

                    describe('when margins are set partially', () => {

                        it('should override the default values', () => {
                            let previous = lineChart.margin(),
                                expected = {
                                    ...previous,
                                    top: 10,
                                    right: 20
                                },
                                actual;

                            lineChart.width(expected);
                            actual = lineChart.width();

                            expect(previous).not.toBe(actual);
                            expect(actual).toEqual(expected);
                        })
                    });
                });

                it('should not have numberFormat by default', () => {
                    let expected = undefined,
                        actual;

                    actual = lineChart.numberFormat();

                    expect(expected).toBe(actual);
                });

                it('should provide numberFormat getter and setter', () => {
                    let previous = lineChart.numberFormat(),
                        expected = 'd',
                        actual;

                    lineChart.numberFormat(expected);
                    actual = lineChart.numberFormat();

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

                it('should provide locale getter and setter', () => {
                    let previous = lineChart.locale(),
                        expected = 'en-US',
                        actual;

                    lineChart.locale(expected);
                    actual = lineChart.locale();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                describe('loadingState', () => {

                    it('should provide a loading state getter and setter', () => {
                        let previous = lineChart.loadingState(),
                            expected = '<svg></svg>',
                            actual;

                        lineChart.loadingState(expected);
                        actual = lineChart.loadingState();

                        expect(previous).not.toBe(expected);
                        expect(actual).toBe(expected);
                    });

                    describe('when getting a loadingState', () => {
                        it('should return an SVG element', () => {
                            let expected = 1,
                            actual;

                            lineChart = chart();
                            actual = lineChart.loadingState().match('line-load-state').length;

                            expect(actual).toEqual(expected);
                        });
                    });
                });

                it('should have shouldShowAllDataPoints getter and setter', () => {
                    let previous = lineChart.shouldShowAllDataPoints(),
                        expected = true,
                        actual;

                    lineChart.shouldShowAllDataPoints(expected);
                    actual = lineChart.shouldShowAllDataPoints();

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

                it('should provide topicLabel getter and setter', () => {
                    let previous = lineChart.topicLabel(),
                        expected = 'valueSet',
                        actual;

                    lineChart.topicLabel(expected);
                    actual = lineChart.topicLabel();

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

                it('should provide width getter and setter', () => {
                    let previous = lineChart.width(),
                        expected = 200,
                        actual;

                    lineChart.width(expected);
                    actual = lineChart.width();

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

                it('should provide a xTicks getter and setter', () => {
                    let previous = lineChart.xTicks(),
                        expected = 2,
                        actual;

                    lineChart.xTicks(expected);
                    actual = lineChart.xTicks();

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

                it('should provide yTicks getter and setter', () => {
                    let previous = lineChart.yTicks(),
                        expected = 3,
                        actual;

                    lineChart.yTicks(expected);
                    actual = lineChart.yTicks();

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
        });
    });
