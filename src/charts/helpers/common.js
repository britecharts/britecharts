define(function(require) {
    'use strict';

    const d3Format = require('d3-format');
    let idCounter = 0;

    /**
     * Calculates percentage of value from total
     * @param  {String}  date    Date
     * @param  {Number}  days    Number of days to add
     * @return {String}          Date
     */
    function addDays(date, days) {
        const result = new Date(date);

        result.setDate(result.getDate() + days);

        return String(result);
    }

    /**
     * Calculates percentage of value from total
     * @param  {Number}  value    Value to check
     * @param  {Number}  total    Sum of values
     * @param  {String}  decimals Specifies number of decimals https://github.com/d3/d3-format
     * @return {String}           Percentage
     */
    function calculatePercent(value, total, decimals) {
        const percent = total ? (value / total * 100) : 0;

        return d3Format.format(decimals)(percent);
    }

    /**
     * Calculate difference between dates in days
     * @param  {String}  date1 Date in string form
     * @param  {String}  date2 Date in string form
     * @return {Number}        Number of days between dates
     */
    function diffDays(date1, date2) {
        const oneDay = 24*60*60*1000;

        return Math.ceil(Math.abs((new Date(date1).getTime() - new Date(date2).getTime())/(oneDay)));
    }

    /**
     * Checks if a number is an integer of has decimal values
     * @param  {Number}  value Value to check
     * @return {Boolean}       If it is an iteger
     */
    function isInteger(value) {
        return value % 1 === 0;
    }

    function uniqueId(prefix) {
        const id = ++idCounter;
        
        return `${prefix.toString()}-${id}`;
    }

    return {
        addDays,
        calculatePercent,
        diffDays,
        isInteger,
        uniqueId
    };

});
