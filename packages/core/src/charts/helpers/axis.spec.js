import * as d3 from 'd3';

import { LineDataBuilder } from '../line/lineChartDataBuilder';
import timeAxis from './axis';

const aLineTestDataSet = () => new LineDataBuilder();

let containerFixture;

describe('axis Helper', () => {
    const minuteFormat = '%M m';
    const hourFormat = '%H %p';
    const dayFormat = '%e';
    const dayMonthFormat = '%d %b';
    const monthFormat = '%b';
    const yearFormat = '%Y';
    let twoYearsDataSet;
    let oneDayDataSet;
    let lessThanOneMonthDataSet;
    let numericalAxisDataSet;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = d3.select('.test-container');

        lessThanOneMonthDataSet = aLineTestDataSet().with5Topics().build();
        oneDayDataSet = aLineTestDataSet().withHourDateRange().build();
        twoYearsDataSet = aLineTestDataSet().withMultiMonthValueRange().build();
        numericalAxisDataSet = aLineTestDataSet().withNumericKeys().build();
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('when automatic setting', () => {
        describe('when timeframe is 1 day', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300
                ));
            });

            it('should give back a minor tick function', () => {
                const expected = 'function';
                const actual = typeof minor.tick;

                expect(actual).toEqual(expected);
            });

            it('should give back a minor hour format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(hourFormat);
            });

            it('should give back a major day format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(dayMonthFormat);
            });
        });

        describe('when timeframe is less than one month', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    lessThanOneMonthDataSet.dataByDate,
                    300
                ));
            });

            it('should give back a minor tick function', () => {
                const expected = 5;
                const actual = minor.tick;

                expect(actual).toEqual(expected);
            });

            it('should give back a minor day format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(dayFormat);
            });

            it('should give back a major month format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(monthFormat);
            });
        });

        describe('when timeframe is 2 years', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    twoYearsDataSet.dataByDate,
                    300
                ));
            });

            it('should give back a minor month format', () => {
                const expected = 5;
                const actual = minor.tick;

                expect(actual).toEqual(expected);
            });

            it('should give back a minor month format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(monthFormat);
            });

            it('should give back a major year format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(yearFormat);
            });
        });
    });

    describe('when forced setting', () => {
        describe('when timeframe forced to minute and hour', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'minute-hour'
                ));
            });

            it('should give back a minor minute format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(minuteFormat);
            });

            it('should give back a major hour format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(hourFormat);
            });
        });

        describe('when timeframe forced to hour and day', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'hour-daymonth'
                ));
            });

            it('should give back a minor hour format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(hourFormat);
            });

            it('should give back a major day-month format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(dayMonthFormat);
            });
        });

        describe('when timeframe forced to day and month', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'day-month'
                ));
            });

            it('should give back a minor day format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(dayFormat);
            });

            it('should give back a major month format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(monthFormat);
            });
        });

        describe('when timeframe forced to month and year', () => {
            let minor, major;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'month-year'
                ));
            });

            it('should give back a minor tick function', () => {
                const expected = 'function';
                const actual = typeof minor.tick;

                expect(actual).toEqual(expected);
            });

            it('should give back a minor day format and 5 ticks', () => {
                const actual = minor.format.toString();

                expect(actual).toEqual(monthFormat);
            });

            it('should give back a major month format', () => {
                const actual = major.format.toString();

                expect(actual).toEqual(yearFormat);
            });
        });

        describe('when using a numerical axis', () => {
            let minor;

            beforeEach(() => {
                minor = timeAxis.getSortedNumberAxis(
                    numericalAxisDataSet.dataSorted,
                    300
                );
            });

            it('should give back a minor tick value', () => {
                const expectedFormat = 'number';
                const actualFormat = typeof minor.tick;

                expect(actualFormat).toEqual(expectedFormat);

                const expectedValue = 5;
                const actualValue = minor.tick;

                expect(actualValue).toEqual(expectedValue);
            });
        });
    });
});
