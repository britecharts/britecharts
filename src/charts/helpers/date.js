define(function (require) {
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
     * Calculate difference between dates in days
     * @param  {String}  date1 Date in string form
     * @param  {String}  date2 Date in string form
     * @return {Number}        Number of days between dates
     */
    function diffDays(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;

        return Math.ceil(Math.abs((new Date(date1).getTime() - new Date(date2).getTime()) / (oneDay)));
    }

    return {
        addDays,
        diffDays
    };

});
