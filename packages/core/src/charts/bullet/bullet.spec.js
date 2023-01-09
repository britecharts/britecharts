import * as d3 from 'd3';

import chart from './bullet';
import { BulletDataBuilder } from './bulletChartDataBuilder';

const aTestDataSet = () => new BulletDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

describe('bullet Chart', () => {
    let bulletChart, dataset, containerFixture, dataPoint;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';
        dataset = buildDataSet('withCpuData');
        bulletChart = chart();
        dataPoint = dataset[0];

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataPoint).call(bulletChart);
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('render', () => {
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
                const actual = containerFixture
                    .select('.metadata-group')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('measures', () => {
            it('should render measures', () => {
                const expected = 2;
                const actual = containerFixture
                    .selectAll('rect.measure')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should have proper attributes', () => {
                const expectedClass = 'measure m';
                const measureBars = containerFixture
                    .selectAll('rect.measure')
                    .nodes();

                measureBars.forEach((measureBar, i) => {
                    expect(measureBar.getAttribute('class')).toBe(
                        `${expectedClass}${i}`
                    );
                    expect(measureBar.getAttribute('fill')).toBeDefined();
                    expect(measureBar.getAttribute('x')).toBeDefined();
                    expect(measureBar.getAttribute('y')).toBeDefined();
                    expect(measureBar.getAttribute('width')).toBeDefined();
                    expect(measureBar.getAttribute('height')).toBeDefined();
                });
            });
        });

        describe('ranges', () => {
            it('should render ranges', () => {
                const expected = 3;
                const actual = containerFixture.selectAll('rect.range').size();

                expect(actual).toEqual(expected);
            });

            it('should have proper attributes', () => {
                const expectedClass = 'range r';
                const rangeBars = containerFixture
                    .selectAll('rect.range')
                    .nodes();

                rangeBars.forEach((rangeBar, i) => {
                    expect(
                        rangeBar.getAttribute('class', `${expectedClass}${i}`)
                    ).toBeDefined();
                    expect(rangeBar.getAttribute('opacity')).toBeDefined();
                    expect(rangeBar.getAttribute('x')).toBeDefined();
                    expect(rangeBar.getAttribute('width')).toBeDefined();
                    expect(rangeBar.getAttribute('height')).toBeDefined();
                    expect(rangeBar.getAttribute('y')).toBeNull();
                });
            });

            describe('startMaxRangeOpacity', () => {
                let diff = 0.2;

                it('sets correct default range for range bars', () => {
                    const expectedStartOpacity =
                        bulletChart.startMaxRangeOpacity();
                    const rangeBars = containerFixture
                        .selectAll('rect.range')
                        .nodes()
                        .reverse();

                    rangeBars.forEach((rangeBar, i) => {
                        expect(rangeBar.getAttribute('opacity')).toBe(
                            `${expectedStartOpacity - i * diff}`
                        );
                    });
                });

                it('can change the range for opacity', () => {
                    const expectedStartMaxOpacity = 1;

                    bulletChart.startMaxRangeOpacity(expectedStartMaxOpacity);
                    containerFixture.datum(dataset[1]).call(bulletChart);
                    const rangeBars = containerFixture
                        .selectAll('rect.range')
                        .nodes()
                        .reverse();

                    rangeBars.forEach((rangeBar, i) => {
                        expect(rangeBar.getAttribute('opacity')).toBe(
                            `${expectedStartMaxOpacity - i * diff}`
                        );
                    });
                });
            });
        });

        describe('markers', () => {
            it('should render a marker', () => {
                let expected = 1;
                let actual = containerFixture
                    .selectAll('.marker-line')
                    .nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should have proper attributes', () => {
                const expectedClass = 'marker m';
                const markerLines = containerFixture
                    .selectAll('line.marker')
                    .nodes();

                markerLines.forEach((markerLine, i) => {
                    expect(markerLine.getAttribute('class')).toBe(
                        `${expectedClass}${i}`
                    );
                    expect(markerLine.getAttribute('opacity')).toBeDefined();
                    expect(markerLine.getAttribute('x')).toBeDefined();
                    expect(markerLine.getAttribute('width')).toBeDefined();
                    expect(markerLine.getAttribute('height')).toBeDefined();
                });
            });

            describe('when empty markers are passed', () => {
                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';
                    dataset = buildDataSet('withNoMarker');
                    bulletChart = chart();
                    dataPoint = dataset[0];

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);
                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataPoint).call(bulletChart);
                });

                it('should render the chart', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('.bullet-chart')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should have render no marker', () => {
                    const expected = 0;
                    const markerLines = containerFixture
                        .selectAll('line.marker')
                        .nodes();
                    const actual = markerLines.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when custom colorSchema is passed', () => {
            it('should assign first two indexed colors for range and measure/markers in order', () => {
                const expectedRangeColor = '#bbb';
                const expectedMeasureColor = '#ccc';
                const expectedMarkerColor = '#ddd';

                bulletChart.colorSchema([
                    expectedRangeColor,
                    expectedMeasureColor,
                    expectedMarkerColor,
                ]);
                containerFixture.datum(dataset[1]).call(bulletChart);

                const rangeBar = containerFixture
                    .selectAll('rect.range')
                    .node();
                const measureBar = containerFixture
                    .selectAll('rect.measure')
                    .node();
                const markerLine = containerFixture
                    .selectAll('line.marker-line')
                    .node();

                expect(rangeBar.getAttribute('fill')).toEqual(
                    expectedRangeColor
                );
                expect(measureBar.getAttribute('fill')).toEqual(
                    expectedMeasureColor
                );
                expect(markerLine.getAttribute('stroke')).toEqual(
                    expectedMarkerColor
                );
            });
        });
    });

    describe('aPI', () => {
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
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
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