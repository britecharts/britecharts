define(function(require) {
    'use strict';

    const d3Time = require('d3-time');
    const d3TimeFormat = require('d3-time-format');

    const {
        axisTimeCombinations,
        timeBenchmarks
    } = require('./constants');
    const {
        convertMillisecondsToDays,
        getLocaleDateFormatter
    } = require('./date');

    const singleTickWidth = 20;
    const horizontalTickSpacing = 50;
    const minEntryNumForDayFormat = 5;

    const formatMap = {
        minute: d3TimeFormat.timeFormat('%M m'),
        hour: d3TimeFormat.timeFormat('%H %p'),
        day: d3TimeFormat.timeFormat('%e'),
        daymonth: d3TimeFormat.timeFormat('%d %b'),
        month: d3TimeFormat.timeFormat('%b'),
        year: d3TimeFormat.timeFormat('%Y')
    };
    const localeTimeMap = {
        minute: {minute:'numeric'},
        hour: {hour:'numeric'},
        day: {day: 'numeric'},
        daymonth: {day: 'numeric', month:'short'},
        month: {month: 'short'},
        year: {year: 'numeric'}
    };
    const settingsToMajorTickMap = {
        [axisTimeCombinations.MINUTE_HOUR]: d3Time.timeHour.every(1),
        [axisTimeCombinations.HOUR_DAY]: d3Time.timeDay.every(1),
        [axisTimeCombinations.DAY_MONTH]: d3Time.timeMonth.every(1),
        [axisTimeCombinations.MONTH_YEAR]: d3Time.timeYear.every(1)
    };

    /**
     * Figures out the proper settings from the current time span
     * @param  {Number} timeSpan    Span of time charted by the graph in milliseconds
     * @return {String}             Type of settings for the given timeSpan
     */
    const getAxisSettingsFromTimeSpan = (timeSpan) => {
        let {
          ONE_YEAR,
          ONE_DAY
        } = timeBenchmarks;
        let settings;

        if (timeSpan < ONE_DAY) {
            settings = axisTimeCombinations.HOUR_DAY;
        } else if (timeSpan < ONE_YEAR) {
            settings = axisTimeCombinations.DAY_MONTH;
        } else {
            settings = axisTimeCombinations.MONTH_YEAR;
        }

        return settings;
    }

    /**
     * Calculates the maximum number of ticks for the x axis
     * @param  {Number} width               Chart width
     * @param  {Number} dataPointNumber     Number of entries on the data
     * @return {Number}                     Number of ticks to render
     */
    const getMaxNumOfHorizontalTicks = (width, dataPointNumber) => {
        let ticksForWidth = Math.ceil(width / (singleTickWidth + horizontalTickSpacing));

        return dataPointNumber < minEntryNumForDayFormat ? d3Time.timeDay : Math.min(dataPointNumber, ticksForWidth);
    }

    /**
     * Returns tick object to be used when building the x axis
     * @param {dataByDate} dataByDate       Chart data ordered by Date
     * @param {Number} width                Chart width
     * @param {String} [settings=null]      Optional forced settings for axis
     * @param {String} [locale=null]        Optional forced locale
     * @return {object} tick settings for major and minr axis
     */
    const getTimeSeriesAxis = (dataByDate, width, settings = null, locale = null) => {
        const firstDate = new Date(dataByDate[0].date);
        const lastDate = new Date(dataByDate[dataByDate.length - 1].date);
        const dateTimeSpan = lastDate - firstDate;

        if (locale && ((typeof Intl === 'undefined') || (typeof Intl === 'object' && !Intl.DateTimeFormat))) {
            locale = null;
        }

        if (!settings) {
            settings = getAxisSettingsFromTimeSpan(dateTimeSpan);
        }

        const [minor, major] = settings.split('-');
        const majorTickValue = settingsToMajorTickMap[settings];
        const minorTickValue = getMaxNumOfHorizontalTicks(width, convertMillisecondsToDays(dateTimeSpan));

        return {
            minor: {
                format: locale ? getLocaleDateFormatter(locale, minor) : formatMap[minor],
                tick: minorTickValue
            },
            major: {
                format: locale ? getLocaleDateFormatter(locale, major) : formatMap[major],
                tick: majorTickValue
            }
        };
    };

    return {
        getTimeSeriesAxis
    };

});
