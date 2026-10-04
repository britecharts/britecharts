// d3-selection rather than the monolithic `d3`, as elsewhere in core.
import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';

import { LineDataBuilder } from '../line/lineChartDataBuilder';
import timeAxis from './axis';
import type {
    AxisDatumByDate,
    AxisDatumSorted,
    AxisTickSettings,
} from './axis';

// lineChartDataBuilder is still JavaScript, so `build()` is `any`. Naming the
// two shapes this spec actually reads keeps that `any` from spreading into
// every assertion below.
type LineTestData = {
    dataByDate: AxisDatumByDate[];
    dataSorted: AxisDatumSorted[];
};

const aLineTestDataSet = () => new LineDataBuilder();

let containerFixture: Selection<HTMLElement, unknown, HTMLElement, unknown>;

describe('axis Helper', () => {
    // `format` is optional on AxisTickSettings because the CUSTOM combination
    // produces no formatter. Every combination exercised below is one of the
    // four real ones, which always do, so the assertions say so with `!`.
    const minuteFormat = '%M m';
    const hourFormat = '%H %p';
    const dayFormat = '%e';
    const dayMonthFormat = '%d %b';
    const monthFormat = '%b';
    const yearFormat = '%Y';
    let twoYearsDataSet: LineTestData;
    let oneDayDataSet: LineTestData;
    let lessThanOneMonthDataSet: LineTestData;
    let numericalAxisDataSet: LineTestData;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = select('.test-container');

        lessThanOneMonthDataSet = aLineTestDataSet().with5Topics().build();
        oneDayDataSet = aLineTestDataSet().withHourDateRange().build();
        twoYearsDataSet = aLineTestDataSet().withMultiMonthValueRange().build();
        numericalAxisDataSet = aLineTestDataSet().withNumericKeys().build();
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        const fixture = document.getElementById('fixture');

        // Asserted rather than passed straight through: if beforeEach ever
        // stops inserting it, the failure should say so.
        if (!fixture) {
            throw new Error('the fixture was not inserted');
        }

        document.body.removeChild(fixture);
    });

    describe('when automatic setting', () => {
        describe('when timeframe is 1 day', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

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
                const actual = minor.format!.toString();

                expect(actual).toEqual(hourFormat);
            });

            it('should give back a major day format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(dayMonthFormat);
            });
        });

        describe('when timeframe is less than one month', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

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
                const actual = minor.format!.toString();

                expect(actual).toEqual(dayFormat);
            });

            it('should give back a major month format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(monthFormat);
            });
        });

        describe('when timeframe is 2 years', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

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
                const actual = minor.format!.toString();

                expect(actual).toEqual(monthFormat);
            });

            it('should give back a major year format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(yearFormat);
            });
        });
    });

    describe('when forced setting', () => {
        describe('when timeframe forced to minute and hour', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'minute-hour'
                ));
            });

            it('should give back a minor minute format and 5 ticks', () => {
                const actual = minor.format!.toString();

                expect(actual).toEqual(minuteFormat);
            });

            it('should give back a major hour format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(hourFormat);
            });
        });

        describe('when timeframe forced to hour and day', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'hour-daymonth'
                ));
            });

            it('should give back a minor hour format and 5 ticks', () => {
                const actual = minor.format!.toString();

                expect(actual).toEqual(hourFormat);
            });

            it('should give back a major day-month format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(dayMonthFormat);
            });
        });

        describe('when timeframe forced to day and month', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

            beforeEach(() => {
                ({ minor, major } = timeAxis.getTimeSeriesAxis(
                    oneDayDataSet.dataByDate,
                    300,
                    'day-month'
                ));
            });

            it('should give back a minor day format and 5 ticks', () => {
                const actual = minor.format!.toString();

                expect(actual).toEqual(dayFormat);
            });

            it('should give back a major month format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(monthFormat);
            });
        });

        describe('when timeframe forced to month and year', () => {
            let minor: AxisTickSettings, major: AxisTickSettings;

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
                const actual = minor.format!.toString();

                expect(actual).toEqual(monthFormat);
            });

            it('should give back a major month format', () => {
                const actual = major.format!.toString();

                expect(actual).toEqual(yearFormat);
            });
        });

        describe('when using a numerical axis', () => {
            // getSortedNumberAxis returns only a tick, and always a number --
            // no format, so this is not an AxisTickSettings.
            let minor: { tick: number };

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
