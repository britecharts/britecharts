import { timeHour, timeDay, timeMonth, timeYear } from 'd3-time';
import { timeFormat } from 'd3-time-format';

import { axisTimeCombinations, timeBenchmarks } from './constants';
import { convertMillisecondsToDays, getLocaleDateFormatter } from './date';

const singleTickWidth = 20;
const horizontalTickSpacing = 50;
const minEntryNumForDayFormat = 5;

const formatMap = {
    minute: timeFormat('%M m'),
    hour: timeFormat('%H %p'),
    day: timeFormat('%e'),
    daymonth: timeFormat('%d %b'),
    month: timeFormat('%b'),
    year: timeFormat('%Y'),
};
const settingsToMajorTickMap = {
    [axisTimeCombinations.MINUTE_HOUR]: timeHour.every(1),
    [axisTimeCombinations.HOUR_DAY]: timeDay.every(1),
    [axisTimeCombinations.DAY_MONTH]: timeMonth.every(1),
    [axisTimeCombinations.MONTH_YEAR]: timeYear.every(1),
};

/**
 * Figures out the proper settings from the current time span
 * @param  {Number} timeSpan    Span of time charted by the graph in milliseconds
 * @return {String}             Type of settings for the given timeSpan
 * @private
 */
const getAxisSettingsFromTimeSpan = (timeSpan) => {
    let { ONE_YEAR, ONE_DAY } = timeBenchmarks;
    let settings;

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
 * @param  {Number} width               Chart width
 * @param  {Number} dataPointNumber     Number of entries on the data
 * @return {Number}                     Number of ticks to render
 * @private
 */
const getMaxNumOfHorizontalTicks = (width, dataPointNumber) => {
    let ticksForWidth = Math.ceil(
        width / (singleTickWidth + horizontalTickSpacing)
    );

    return dataPointNumber < minEntryNumForDayFormat
        ? timeDay
        : Math.min(dataPointNumber, ticksForWidth);
};

/**
 * Calculates the maximum number of ticks for the x axis
 * with respect to number ranges
 * @param  {Number} width               Chart width
 * @param  {Number} dataPointNumber     Number of entries on the data
 * @return {Number}                     Number of ticks to render
 * @private
 */
const getMaxNumOfHorizontalTicksForNumberRanges = (width, dataPointNumber) => {
    let ticksForWidth = Math.ceil(
        width / (singleTickWidth + horizontalTickSpacing)
    );

    return Math.min(dataPointNumber, ticksForWidth);
};

/**
 * Returns tick object to be used when building the x axis
 * @param {dataByDate} dataByDate       Chart data ordered by Date
 * @param {Number} width                Chart width
 * @param {String} [settings=null]      Optional forced settings for axis, a combination of one of minute, hour, day, daymonth, month, year separated by '-'
 * @param {String} [locale=null]        Optional forced locale
 * @return {object}                     Tick settings for major and minr axis
 * @private
 */
export const getTimeSeriesAxis = (
    dataByDate,
    width,
    settings = null,
    locale = null
) => {
    const firstDate = new Date(dataByDate[0].date);
    const lastDate = new Date(dataByDate[dataByDate.length - 1].date);
    const dateTimeSpan = lastDate - firstDate;

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

    const [minor, major] = settings.split('-');
    const majorTickValue = settingsToMajorTickMap[settings];
    const minorTickValue = getMaxNumOfHorizontalTicks(
        width,
        convertMillisecondsToDays(dateTimeSpan)
    );

    return {
        minor: {
            format: locale
                ? getLocaleDateFormatter(locale, minor)
                : formatMap[minor],
            tick: minorTickValue,
        },
        major: {
            format: locale
                ? getLocaleDateFormatter(locale, major)
                : formatMap[major],
            tick: majorTickValue,
        },
    };
};

/**
 * Returns tick object to be used when building the x axis
 * @param {dataSorted} dataSorted       Chart data ordered by Date
 * @param {Number} width                Chart width
 * @param {String} [settings=null]      Optional forced settings for axis
 * @return {object} tick settings for minor axis
 * @private
 */
export const getSortedNumberAxis = (dataSorted, width) => {
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
