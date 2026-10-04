import { timeHour, timeDay, timeMonth, timeYear } from 'd3-time';
import type { CountableTimeInterval, TimeInterval } from 'd3-time';
import { timeFormat } from 'd3-time-format';

import { axisTimeCombinations, timeBenchmarks } from './constants';
import type { AxisTimeCombinationValue } from './constants';
import { convertMillisecondsToDays, getLocaleDateFormatter } from './date';
import type { TimeUnit } from './date';

const singleTickWidth = 20;
const horizontalTickSpacing = 50;
const minEntryNumForDayFormat = 5;

/** Formats a date for one of the time units an axis combination names. */
type DateFormatter = (date: Date) => string;

const formatMap: Record<TimeUnit, DateFormatter> = {
    minute: timeFormat('%M m'),
    hour: timeFormat('%H %p'),
    day: timeFormat('%e'),
    daymonth: timeFormat('%d %b'),
    month: timeFormat('%b'),
    year: timeFormat('%Y'),
};

// Partial on purpose: `axisTimeCombinations.CUSTOM` has no entry, because a
// custom format is the caller's to supply. Spelling that as a full Record would
// have required inventing one.
const settingsToMajorTickMap: Partial<
    Record<AxisTimeCombinationValue, TimeInterval | null>
> = {
    [axisTimeCombinations.MINUTE_HOUR]: timeHour.every(1),
    [axisTimeCombinations.HOUR_DAY]: timeDay.every(1),
    [axisTimeCombinations.DAY_MONTH]: timeMonth.every(1),
    [axisTimeCombinations.MONTH_YEAR]: timeYear.every(1),
};

/**
 * Figures out the proper settings from the current time span
 * @param  timeSpan  Span of time charted by the graph in milliseconds
 * @private
 */
const getAxisSettingsFromTimeSpan = (
    timeSpan: number
): AxisTimeCombinationValue => {
    const { ONE_YEAR, ONE_DAY } = timeBenchmarks;
    let settings: AxisTimeCombinationValue;

    if (timeSpan < ONE_DAY) {
        settings = axisTimeCombinations.HOUR_DAY;
    } else if (timeSpan < ONE_YEAR) {
        settings = axisTimeCombinations.DAY_MONTH;
    } else {
        settings = axisTimeCombinations.MONTH_YEAR;
    }

    return settings;
};

/**
 * Calculates the maximum number of ticks for the x axis
 *
 * Returns a d3 time interval rather than a count when there are only a few
 * entries, so the axis gets one tick per day instead of an arbitrary number.
 * d3's `.ticks()` accepts either, which is why this works -- but its JSDoc
 * claimed `{Number}`, and the interval branch is the whole point of the
 * `minEntryNumForDayFormat` threshold.
 *
 * @param  width            Chart width
 * @param  dataPointNumber  Number of entries on the data
 * @private
 */
const getMaxNumOfHorizontalTicks = (
    width: number,
    dataPointNumber: number
): CountableTimeInterval | number => {
    const ticksForWidth = Math.ceil(
        width / (singleTickWidth + horizontalTickSpacing)
    );

    return dataPointNumber < minEntryNumForDayFormat
        ? timeDay
        : Math.min(dataPointNumber, ticksForWidth);
};

/**
 * Calculates the maximum number of ticks for the x axis
 * with respect to number ranges
 * @param  width            Chart width
 * @param  dataPointNumber  Number of entries on the data
 * @private
 */
const getMaxNumOfHorizontalTicksForNumberRanges = (
    width: number,
    dataPointNumber: number
): number => {
    const ticksForWidth = Math.ceil(
        width / (singleTickWidth + horizontalTickSpacing)
    );

    return Math.min(dataPointNumber, ticksForWidth);
};

/** One entry of the date-ordered data a time-series axis is built from. */
export type AxisDatumByDate = { date: Date | string | number };

/** What a chart hands to `axisBottom().ticks()` and `.tickFormat()`. */
export type AxisTickSettings = {
    format?: DateFormatter;
    tick?: CountableTimeInterval | TimeInterval | number | null;
};

/**
 * Returns tick object to be used when building the x axis
 * @param dataByDate  Chart data ordered by Date
 * @param width       Chart width
 * @param settings    Optional forced settings for axis, a combination of one of
 *                    minute, hour, day, daymonth, month, year separated by '-'
 * @param locale      Optional forced locale, as a BCP 47 tag
 * @return Tick settings for major and minor axis
 * @private
 */
export const getTimeSeriesAxis = (
    dataByDate: AxisDatumByDate[],
    width: number,
    settings: AxisTimeCombinationValue | null = null,
    locale: string | null = null
): { minor: AxisTickSettings; major: AxisTickSettings } => {
    const firstDate = new Date(dataByDate[0].date);
    const lastDate = new Date(dataByDate[dataByDate.length - 1].date);
    // `lastDate - firstDate` relied on Date coercing to a number. Spelled out,
    // because `-` on two Dates is not something the types allow and the
    // coercion is the only thing that made it work.
    const dateTimeSpan = lastDate.getTime() - firstDate.getTime();

    if (
        locale &&
        (typeof Intl === 'undefined' ||
            (typeof Intl === 'object' && !Intl.DateTimeFormat))
    ) {
        locale = null;
    }

    if (!settings) {
        settings = getAxisSettingsFromTimeSpan(dateTimeSpan);
    }

    // `CUSTOM` is 'custom', which has no '-' in it: `minor` comes out as
    // 'custom' and `major` as undefined, so both lookups below miss and both
    // formats are undefined. Callers are expected to intercept that before
    // getting here -- line.js does, but only when `xAxisCustomFormat` is also
    // a string, so `xAxisFormat('custom')` on its own still lands here and
    // falls back to d3's default tick formatting.
    //
    // Preserved as it was, including the misses. The casts say "this may not be
    // a TimeUnit" rather than pretending the split is exhaustive.
    const [minor, major] = settings.split('-') as [
        TimeUnit | undefined,
        TimeUnit | undefined,
    ];
    const majorTickValue = settingsToMajorTickMap[settings];
    const minorTickValue = getMaxNumOfHorizontalTicks(
        width,
        convertMillisecondsToDays(dateTimeSpan)
    );

    return {
        minor: {
            format: locale
                ? getLocaleDateFormatter(locale, minor)
                : formatMap[minor as TimeUnit],
            tick: minorTickValue,
        },
        major: {
            format: locale
                ? getLocaleDateFormatter(locale, major)
                : formatMap[major as TimeUnit],
            tick: majorTickValue,
        },
    };
};

/** One entry of the sorted data a numeric axis is built from. */
export type AxisDatumSorted = { date: number };

/**
 * Returns tick object to be used when building the x axis
 * @param dataSorted  Chart data ordered by its numeric x value
 * @param width       Chart width
 * @return tick settings for minor axis
 * @private
 */
export const getSortedNumberAxis = (
    dataSorted: AxisDatumSorted[],
    width: number
): { tick: number } => {
    // `date` holds a number on this path, not a Date: the charts set
    // `xAxisValueType('number')`, and castValueToType then returns `Number(...)`
    // for it. The field keeps the name it has in the data.
    const firstEntry = dataSorted[0].date;
    const lastEntry = dataSorted[dataSorted.length - 1].date;
    const timeSpan = lastEntry - firstEntry;

    const minorTickValue = getMaxNumOfHorizontalTicksForNumberRanges(
        width,
        timeSpan
    );

    return {
        tick: minorTickValue,
    };
};

export default {
    getTimeSeriesAxis,
    getSortedNumberAxis,
};
