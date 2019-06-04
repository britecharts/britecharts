define(['d3', 'bullet', 'bulletChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.BulletChartDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    describe('Bullet Chart', () => {
        let bulletChart, dataset, containerFixture, f, dataPoint;

        beforeEach(() => {
            dataset = buildDataSet('withCpuData');
            bulletChart = chart();
            dataPoint = dataset[0];

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataPoint).call(bulletChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('Render', () => {

            it('should render a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.bullet-chart').size();

                expect(actual).toEqual(expected);
            });

            describe('groups', () => {
                it('should render chart group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.chart-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render axis group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.axis-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render metadata group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.metadata-group').size();

                    expect(actual).toEqual(expected);
                });

                it('should render grid lines group', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.grid-lines-group').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('chart components', () => {

                it('should render ranges', () => {
                    const expected = 3;
                    const actual = containerFixture.selectAll('rect.range').size();

                    expect(actual).toEqual(expected);
                });

                it('should render measures', () => {
                    const expected = 2;
                    const actual = containerFixture.selectAll('rect.measure').size();

                    expect(actual).toEqual(expected);
                });

                it('should render grid lines group', () => {
                    const expected = 1;
                    const actual = containerFixture.selectAll('.marker-line').size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('measures', () => {

                it('should have proper attributes', () => {
                    const expectedClass = 'measure m';
                    const measureBars = containerFixture.selectAll('rect.measure').nodes();

                    measureBars.forEach((measureBar, i) => {
                        expect(measureBar).toHaveAttr('class', `${expectedClass}${i}`);
                        expect(measureBar).toHaveAttr('fill');
                        expect(measureBar).toHaveAttr('x');
                        expect(measureBar).toHaveAttr('y');
                        expect(measureBar).toHaveAttr('width');
                        expect(measureBar).toHaveAttr('height');
                    });
                });
            });

            describe('ranges', () => {

                it('should have proper attributes', () => {
                    const expectedClass = 'range r';
                    const rangeBars = containerFixture.selectAll('rect.range').nodes();

                    rangeBars.forEach((rangeBar, i) => {
                        expect(rangeBar).toHaveAttr('class', `${expectedClass}${i}`);
                        expect(rangeBar).toHaveAttr('opacity');
                        expect(rangeBar).toHaveAttr('x');
                        expect(rangeBar).toHaveAttr('width');
                        expect(rangeBar).toHaveAttr('height');
                        expect(rangeBar).not.toHaveAttr('y');
                    });
                });
            });

            describe('markers', () => {

                it('should have proper attributes', () => {
                    const expectedClass = 'marker m';
                    const markerLines = containerFixture.selectAll('line.marker').nodes();

                    markerLines.forEach((markerLine, i) => {
                        expect(markerLine).toHaveAttr('class', `${expectedClass}${i}`);
                        expect(markerLine).toHaveAttr('opacity');
                        expect(markerLine).toHaveAttr('x');
                        expect(markerLine).toHaveAttr('width');
                        expect(markerLine).toHaveAttr('height');
                    });
                });
            });

            describe('startMaxRangeOpacity', () => {
                let diff = 0.2;

                it('sets correct default range for range bars', () => {
                    const expectedStartOpacity = bulletChart.startMaxRangeOpacity();
                    const rangeBars = containerFixture.selectAll('rect.range').nodes().reverse();

                    rangeBars.forEach((rangeBar, i) => {
                        expect(rangeBar).toHaveAttr('opacity', `${expectedStartOpacity - (i * diff)}`);
                    });
                });

                it('can change the range for opacity', () => {
                    const expectedStartMaxOpacity = 1;

                    bulletChart.startMaxRangeOpacity(expectedStartMaxOpacity);
                    containerFixture.datum(dataset[1]).call(bulletChart);
                    const rangeBars = containerFixture.selectAll('rect.range').nodes().reverse();

                    rangeBars.forEach((rangeBar, i) => {
                        expect(rangeBar).toHaveAttr('opacity', `${expectedStartMaxOpacity - (i * diff)}`);
                    });
                });

                it('can change the range for opacity', () => {
                    const expectedStartMaxOpacity = 1;

                    bulletChart.startMaxRangeOpacity(expectedStartMaxOpacity);
                    containerFixture.datum(dataset[1]).call(bulletChart);
                    const rangeBars = containerFixture.selectAll('rect.range').nodes().reverse();

                    rangeBars.forEach((rangeBar, i) => {
                        expect(rangeBar).toHaveAttr('opacity', `${expectedStartMaxOpacity - (i * diff)}`);
                    });
                });
            });

            describe('when custom colorSchema is passed', () => {

                it('should assign first two indexed colors for range and measure/markers in order', () => {
                    const expectedRangeColor = '#bbb';
                    const expectedMeasureColor = '#ccc';
                    const expectedMarkerColor = expectedMeasureColor;

                    bulletChart.colorSchema([expectedRangeColor, expectedMeasureColor]);
                    containerFixture.datum(dataset[1]).call(bulletChart);

                    const rangeBar = containerFixture.selectAll('rect.range').node();
                    const measureBar = containerFixture.selectAll('rect.measure').node();
                    const markerLine = containerFixture.selectAll('line.marker-line').node();

                    expect(rangeBar).toHaveAttr('fill', expectedRangeColor);
                    expect(measureBar).toHaveAttr('fill', expectedMeasureColor);
                    expect(markerLine).toHaveAttr('stroke', expectedMarkerColor);
                });
            });
        });

        describe('API', () => {

            it('should provide an aspect ratio getter and setter', () => {
                let previous = bulletChart.aspectRatio(),
                    expected = 600,
                    actual;

                bulletChart.aspectRatio(expected);
                actual = bulletChart.aspectRatio();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide startMaxRangeOpacity getter and setter', () => {
                let previous = bulletChart.startMaxRangeOpacity(),
                    expected = 0.8,
                    actual;

                bulletChart.startMaxRangeOpacity(expected);
                actual = bulletChart.startMaxRangeOpacity();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide colorSchema getter and setter', () => {
                let previous = bulletChart.colorSchema(),
                    expected = ['#aaa', '#bbb', '#ccc', '#fff'],
                    actual;

                bulletChart.colorSchema(expected);
                actual = bulletChart.colorSchema();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide customTitle getter and setter', () => {
                let previous = bulletChart.customTitle(),
                    expected = 'Revenue',
                    actual;

                bulletChart.customTitle(expected);
                actual = bulletChart.customTitle();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide customSubtitle getter and setter', () => {
                let previous = bulletChart.customSubtitle(),
                    expected = '$',
                    actual;

                bulletChart.customSubtitle(expected);
                actual = bulletChart.customSubtitle();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should have exportChart defined', () => {
                expect(bulletChart.exportChart).toBeDefined();
            });

            it('should provide height getter and setter', () => {
                let previous = bulletChart.height(),
                    expected = 200,
                    actual;

                bulletChart.height(expected);
                actual = bulletChart.height();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide isReverse getter and setter', () => {
                let previous = bulletChart.isReverse(),
                    expected = true,
                    actual;

                bulletChart.isReverse(expected);
                actual = bulletChart.isReverse();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide margin getter and setter', () => {
                let previous = bulletChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                bulletChart.margin(expected);
                actual = bulletChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide numberFormat getter and setter', () => {
                let previous = bulletChart.numberFormat(),
                    expected = 'Great chart',
                    actual;

                bulletChart.numberFormat(expected);
                actual = bulletChart.numberFormat();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide paddingBetweenAxisAndChart getter and setter', () => {
                let previous = bulletChart.paddingBetweenAxisAndChart(),
                    expected = 10,
                    actual;

                bulletChart.paddingBetweenAxisAndChart(expected);
                actual = bulletChart.paddingBetweenAxisAndChart();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide ticks getter and setter', () => {
                let previous = bulletChart.ticks(),
                    expected = 48,
                    actual;

                bulletChart.ticks(expected);
                actual = bulletChart.ticks();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', () => {
                let previous = bulletChart.width(),
                    expected = 200,
                    actual;

                bulletChart.width(expected);
                actual = bulletChart.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });
    });
});
