define(function(require) {
    'use strict';

    const d3Time = require('d3-time');
    const d3TimeFormat = require('d3-time-format');

    const {
        axisTimeCombinations,
        timeBenchmarks
    } = require('./constants');


    const singleTickWidth = 20;
    const horizontalTickSpacing = 50;
    const minEntryNumForDayFormat = 5;
    const xTickMinuteFormat = d3TimeFormat.timeFormat('%M m');
    const xTickHourFormat = d3TimeFormat.timeFormat('%H %p');
    const xTickSimpleDayFormat = d3TimeFormat.timeFormat('%e');
    const xTickDayMonthFormat = d3TimeFormat.timeFormat('%d %b');
    const xTickMonthFormat = d3TimeFormat.timeFormat('%b');
    const xTickYearFormat = d3TimeFormat.timeFormat('%Y');

    const formatMap = {
        minute: xTickMinuteFormat,
        hour: xTickHourFormat,
        day: xTickSimpleDayFormat,
        daymonth: xTickDayMonthFormat,
        month: xTickMonthFormat,
        year: xTickYearFormat
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
     * @param  {Number} width Chart width
     * @param  {Number} dataPointNumber  Number of entries on the data
     * @return {Number}       Number of ticks to render
     */
    const getMaxNumOfHorizontalTicks = (width, dataPointNumber) => {
        let ticksForWidth = Math.ceil(width / (singleTickWidth + horizontalTickSpacing));

        return dataPointNumber < minEntryNumForDayFormat ? d3Time.timeDay : Math.min(dataPointNumber, ticksForWidth);
    }

    /**
     * Returns tick object to be used when building the x axis
     * @param {dataByDate} dataByDate       Chart data ordered by Date
     * @param {Number} width                Chart width
     * @param {String} settings             Optional forced settings for axis
     * @return {object} tick settings for major and minr axis
     */
    const getXAxisSettings = (dataByDate, width, settings = null) => {
        let firstDate = new Date(dataByDate[0].date);
        let lastDate = new Date(dataByDate[dataByDate.length - 1].date);
        let dateTimeSpan = lastDate - firstDate;

        if (!settings) {
            settings = getAxisSettingsFromTimeSpan(dateTimeSpan);
        }
        let [minor, major] = settings.split('-');

        let majorTickValue = settingsToMajorTickMap[settings];
        let minorTickValue = getMaxNumOfHorizontalTicks(width, dataByDate.length);

        return {
            minor: {
              format: formatMap[minor],
              tick: minorTickValue
            },
            major: {
              format: formatMap[major],
              tick: majorTickValue
            }
        };
    };

    return {
        getXAxisSettings
    }

});
