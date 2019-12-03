define(function (require) {
    'use strict';

    const d3Format = require('d3-format');
    let idCounter = 0;

    /**
     * Calculates a new date by summing a given amount of days to a given date
     * @param  {String}  startDate      Date
     * @param  {Number}  days           Number of days to add
     * @return {String}                 Offsetted date
     */
    const addDays = (startDate, days) => {
        const result = new Date(startDate);

        result.setDate(result.getDate() + days);

        return String(result);
    }

    /**
     * Calculates difference between dates in days
     * @param  {String}  startDate  Date in string form
     * @param  {String}  endDate    Date in string form
     * @return {Number}             Number of days between dates
     */
    const diffDays = (startDate, endDate) => {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        return Math.ceil(Math.abs((new Date(startDate).getTime() - new Date(endDate).getTime()) / (oneDayInMilliseconds)));
    }

    /**
     * Takes a number representing milliseconds and convert to days
     * @param  {Number} milliseconds    Any number of days in milliseconds
     * @return {Number}                 Number of days that the input represents
     */
    const convertMillisecondsToDays = (milliseconds) => Math.ceil(milliseconds/(24*60*60*1000));

    /**
     * Takes a locale (string) and the format to return and returns a function to format dates
     * @param  {String} locale              Locale tag eg. en-US, fr-FR, ru-RU
     * @param  {String} [timeUnit='day']    Minute, hour, day, dayMonth, month, year
     * @return {Function}                   Function that formats dates in the proper locale
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
