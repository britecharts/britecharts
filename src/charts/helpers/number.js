define(function(require) {
    'use strict';

    const d3Format = require('d3-format');

    let idCounter = 0;

    const integerValueFormats = {
        small: {
            limit: 10,
            format: d3Format.format('')
        },
        medium: {
            limit: 1000,
            format: d3Format.format('')
        },
        large: {
            limit: null,
            format: d3Format.format('.2s')
        }
    };

    const decimalValueFormats = {
        small: {
            limit: 10,
            format: d3Format.format('.3f')
        },
        medium: {
            limit: 100,
            format: d3Format.format('.1f')
        },
        large: {
            limit: null,
            format: d3Format.format('.2s')
        }
    };

    /**
     * Return a relative size for the value given, based in our decimal or integer tables
     * @param {Number} value    Value to assess its relative size
     * @param {Object} limits   Object stablishing the limits and formats
     * to consider the value of a given size
     */
    const getValueSize = (value, limits) => {
        let size = 'large';

        if (value < limits.small.limit) {
            size = 'small';
        } else if (value < limits.medium.limit) {
            size = 'medium';
        }

        return size;
    };

    /**
     * Calculates percentage of value from total
     * @param  {Number}  value    Value to check
     * @param  {Number}  total    Sum of values
     * @param  {String}  decimals Specifies number of decimals https://github.com/d3/d3-format
     * @return {String}           Percentage
     */
    const calculatePercent = (value, total, decimals) => {
        const percent = total ? (value / total * 100) : 0;

        return d3Format.format(decimals)(percent);
    };

    /**
     * Checks if a number is an integer or a decimal value
     * @param  {Number}  value Value to check
     * @return {Boolean}       If it is an iteger
     */
    const isInteger = (value) => {
        return value % 1 === 0;
    };

    /**
     * Formats a floating point value depending on its value range
     * @param  {Number} value Decimal point value to format
     * @return {Number}       Formatted value to show
     */
    const formatDecimalValue = (value) => {
        let size = getValueSize(value, decimalValueFormats);
        let format = decimalValueFormats[size].format;

        return format(value);
    };

    /**
     * Formats an integer value depending on its value range
     * @param  {Number} value Decimal point value to format
     * @return {Number}       Formatted value to show
     */
    const formatIntegerValue = (value) => {
        let size = getValueSize(value, integerValueFormats);
        let format = integerValueFormats[size].format;

        return format(value);
    };

    /**
     * Generates a unique id with a prefix
     * @param  {String} prefix   Prefix to add before the id
     * @return {String}          Unique id
     */
    const uniqueId = (prefix) => {
        const id = ++idCounter;

        return `${prefix.toString()}-${id}`;
    };

    return {
        calculatePercent,
        isInteger,
        formatDecimalValue,
        formatIntegerValue,
        uniqueId
    };
});
