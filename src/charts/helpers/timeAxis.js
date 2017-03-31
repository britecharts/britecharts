define(function(require) {
    'use strict';

    const d3Time = require('d3-time');
    const d3TimeFormat = require('d3-time-format');

    const {
        axisTimeCombinations,
        timeBenchmarks
    } = require('./constants');


    const singleTickWidth = 20;
    const horizontalTickSpacing = 40;
    const xTickHourFormat = d3TimeFormat.timeFormat('%H %p');
    const xTickDateFormat = d3TimeFormat.timeFormat('%e');
    const xTickMonthFormat = d3TimeFormat.timeFormat('%b');
    const xTickYearFormat = d3TimeFormat.timeFormat('%Y');

    const formatMap = {
        hour: xTickHourFormat,
        day: xTickDateFormat,
        month: xTickMonthFormat
    };

    /**
     * Calculates the maximum number of ticks for the x axis
     * @param  {Number} width Chart width
     * @param  {Number} dataPointNumber  Number of entries on the data
     * @return {Number}       Number of ticks to render
     */
    const getMaxNumOfHorizontalTicks = (width, dataPointNumber) => {
        let ticksForWidth = Math.ceil(width / (singleTickWidth + horizontalTickSpacing));

        return Math.min(dataPointNumber, ticksForWidth);
    }

    /**
     * Returns tick object to be used when building the x axis
     * @return {object} tick settings for major and minr axis
     */
    const getXAxisSettings = (dataByDate, xScale, width, settings) => {
        let minorTickValue, majorTickValue;
        let dateTimeSpan = xScale.domain()[1] - xScale.domain()[0];
        let {
          ONE_YEAR,
          ONE_DAY
        } = timeBenchmarks;

        // might want to add minute-hour
        if (dateTimeSpan < ONE_DAY) {
            settings = axisTimeCombinations.HOUR_DAY;
            majorTickValue = d3Time.timeDay.every(1);
        } else if (dateTimeSpan < ONE_YEAR) {
            settings = axisTimeCombinations.DAY_MONTH;
            majorTickValue = d3Time.timeMonth.every(1);
        } else {
            settings = axisTimeCombinations.MONTH_YEAR;
            minorTickValue = 10;
            majorTickValue = d3Time.timeYear.every(1);
        }
        let [minor, major] = settings.split('-');

        minorTickValue = dataByDate.length < 5 ? d3Time.timeDay :
                getMaxNumOfHorizontalTicks(width, dataByDate.length);

        return {
            minor: {
              format: formatMap[minor],
              tick: minorTickValue,
            },
            major: {
              format: formatMap[major],
              tick: majorTickValue,
            }
        };
    };

    return {
        getXAxisSettings
    }

});
