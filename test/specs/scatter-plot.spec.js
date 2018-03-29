define(['d3', 'scatter-plot', 'scatterPlotDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.ScatterPlotDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    describe('Scatter Plot', () => {

        let scatterPlot, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = buildDataSet('withFourNames');
            scatterPlot = chart()
                    .grid('full');

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(scatterPlot);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a chart with minimal requirements', () => {
            let expected = 1;
            let actual = containerFixture.select('.scatter-plot').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render axis labels group', () => {
            let expected = 1;
            let actual = containerFixture.select('.axis-labels-group').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render container, axis and chart groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.x-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.grid-lines-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
        });

        it('should render an X and Y axis', () => {
            expect(containerFixture.select('.x-axis-group .axis.x').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group .axis.y').empty()).toBeFalsy();
        });

        it('should render horizontal grid lines', () => {
            expect(containerFixture.select('.horizontal-grid-line').empty()).toBeFalsy();
        });

        it('should render vertical grid lines', () => {
            expect(containerFixture.select('.vertical-grid-line').empty()).toBeFalsy();
        });

        describe('API', function() {

            it('should provide an aspect ratio getter and setter', () => {
                let previous = scatterPlot.aspectRatio(),
                    expected = 600,
                    actual;

                scatterPlot.aspectRatio(expected);
                actual = scatterPlot.aspectRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide circleOpacity getter and setter', () => {
                let previous = scatterPlot.circleOpacity(),
                    expected = 0.6,
                    actual;

                scatterPlot.circleOpacity(expected);
                actual = scatterPlot.circleOpacity();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide colorSchema getter and setter', () => {
                let previous = scatterPlot.colorSchema(),
                    expected = ['#aaa', '#bbb', '#ccc', '#fff'],
                    actual;

                scatterPlot.colorSchema(expected);
                actual = scatterPlot.colorSchema();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should have exportChart defined', () => {
                expect(scatterPlot.exportChart).toBeDefined();
            });

            it('should provide grid mode getter and setter', () => {
                let previous = scatterPlot.grid(),
                    expected = 'vertical',
                    actual;

                scatterPlot.grid(expected);
                actual = scatterPlot.grid();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide hasHollowCircles getter and setter', () => {
                let previous = scatterPlot.hasHollowCircles(),
                    expected = true,
                    actual;

                scatterPlot.hasHollowCircles(expected);
                actual = scatterPlot.hasHollowCircles();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide height getter and setter', () => {
                let previous = scatterPlot.width(),
                    expected = 200,
                    actual;

                scatterPlot.height(expected);
                actual = scatterPlot.height();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide isAnimated getter and setter', () => {
                let previous = scatterPlot.isAnimated(),
                    expected = false,
                    actual;

                scatterPlot.isAnimated(expected);
                actual = scatterPlot.isAnimated();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = scatterPlot.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                scatterPlot.margin(expected);
                actual = scatterPlot.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide maxCircleArea getter and setter', () => {
                let previous = scatterPlot.maxCircleArea(),
                    expected = 25,
                    actual;

                scatterPlot.maxCircleArea(expected);
                actual = scatterPlot.maxCircleArea();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide xAxisLabel getter and setter', () => {
                let previous = scatterPlot.xAxisLabel(),
                    expected = 'Great chart',
                    actual;

                scatterPlot.xAxisLabel(expected);
                actual = scatterPlot.xAxisLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide xAxisLabelOffset getter and setter', () => {
                let previous = scatterPlot.xAxisLabelOffset(),
                    expected = 40,
                    actual;

                scatterPlot.xAxisLabelOffset(expected);
                actual = scatterPlot.xAxisLabelOffset();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide xTicks getter and setter', () => {
                let previous = scatterPlot.xTicks(),
                    expected = 48,
                    actual;

                scatterPlot.xTicks(expected);
                actual = scatterPlot.xTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide yAxisLabel getter and setter', () => {
                let previous = scatterPlot.yAxisLabel(),
                    expected = 'Ticket Sales',
                    actual;

                scatterPlot.yAxisLabel(expected);
                actual = scatterPlot.yAxisLabel();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide yAxisLabelOffset getter and setter', () => {
                let previous = scatterPlot.yAxisLabelOffset(-55),
                    expected = 'Ticket Sales',
                    actual;

                scatterPlot.yAxisLabelOffset(expected);
                actual = scatterPlot.yAxisLabelOffset();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide yTicks getter and setter', () => {
                let previous = scatterPlot.yTicks(),
                    expected = 48,
                    actual;

                scatterPlot.yTicks(expected);
                actual = scatterPlot.yTicks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = scatterPlot.width(),
                    expected = 200,
                    actual;

                scatterPlot.width(expected);
                actual = scatterPlot.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });

        describe('Aspect Ratio', () => {

            describe('when an aspect ratio is set', function () {

                it('should modify the height depending on the width', () => {
                    let testAspectRatio = 0.5,
                        testWidth = 400,
                        newHeight;

                    scatterPlot.aspectRatio(testAspectRatio);
                    scatterPlot.width(testWidth);
                    newHeight = scatterPlot.height();

                    expect(newHeight).toBe(Math.ceil(testWidth * testAspectRatio));
                });

                it('should modify the width depending on the height', () => {
                    let testAspectRatio = 0.5,
                        testHeight = 400,
                        newWidth;

                    scatterPlot.aspectRatio(testAspectRatio);
                    scatterPlot.height(testHeight);
                    newWidth = scatterPlot.width();

                    expect(newWidth).toBe(Math.ceil(testHeight / testAspectRatio));
                });
            });
        });

        describe('when margins are set partially', function() {

            it('should override the default values', () => {
                let previous = scatterPlot.margin(),
                expected = {
                    ...previous,
                    top: 10,
                    right: 20
                },
                actual;

                scatterPlot.margin(expected);
                actual = scatterPlot.margin();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            })
        });

        describe('when clicking on a point', function () {

            it('should trigger a callback on mouse click', () => {
                let callbackSpy = jasmine.createSpy('callback');
                let scatterDataPoint = containerFixture.select('.chart-group circle');

                scatterPlot.on('customClick', callbackSpy);
                scatterDataPoint.dispatch('click');

                expect(callbackSpy.calls.count()).toBe(1);
                expect(callbackSpy.calls.allArgs()[0].length).toBe(3);
            });
        });
    });
});
