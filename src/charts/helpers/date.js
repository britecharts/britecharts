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
    const addDays = (date, days) => {
        const result = new Date(date);

        result.setDate(result.getDate() + days);

        return String(result);
    }

    /**
     * Calculates difference between dates in days
     * @param  {String}  date1 Date in string form
     * @param  {String}  date2 Date in string form
     * @return {Number}        Number of days between dates
     */
    const diffDays = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000;

        return Math.ceil(Math.abs((new Date(date1).getTime() - new Date(date2).getTime()) / (oneDay)));
    }

    /**
     * Takes a number representing milliseconds and convert to days
     * @param  {Number} milliseconds    Any number
     * @return {Number}                 Number of days that the input represents
     */
    const convertMillisecondsToDays = (milliseconds) => Math.ceil(milliseconds/(24*60*60*1000));

    /**
     * Takes a locale (string) and the format to return and returns a function to format dates
     * @param  {String} locale    locale tag eg. en-US, fr-FR, ru-RU
     * @param  {string} timeUnit  minute, hour, day, dayMonth, month, year
     * @return {function}         function that formats dates in the proper locale
     */
    const getLocaleDateFormatter = (locale, timeUnit='day') => {
        let options = localeTimeMap[timeUnit];
        let formatter = new Intl.DateTimeFormat(locale, options);

        return (date) => formatter.format(date);
    }

    return {
        addDays,
        convertMillisecondsToDays,
        diffDays,
        getLocaleDateFormatter
    };

});
