define(function(require) {
    'use strict';

    const d3Format = require('d3-format');

    const valueRangeLimits = {
                small: 10,
                medium: 100
            };
    const integerValueFormats = {
                small: d3Format.format(''),
                medium: d3Format.format(''),
                large: d3Format.format('.2s')
            };
    const decimalValueFormats = {
                small: d3Format.format('.3f'),
                medium: d3Format.format('.1f'),
                large: d3Format.format('.2s')
            };

    function getValueSize(value){
        let size = 'large';

        if (value < valueRangeLimits.small) {
            size = 'small';
        } else if (value < valueRangeLimits.medium) {
            size = 'medium';
        }
        return size;
    }

    /**
     * Formats an integer value depending on its value range
     * @param  {Number} value Decimal point value to format
     * @return {Number}       Formatted value to show
     */
    function formatIntegerValue(value) {
        let format = integerValueFormats[getValueSize(value)];

        return format(value);
    }

    /**
     * Formats a floating point value depending on its value range
     * @param  {Number} value Decimal point value to format
     * @return {Number}       Formatted value to show
     */
    function formatDecimalValue(value) {
        let format = decimalValueFormats[getValueSize(value)];

        return format(value);
    }

    return {
        formatDecimalValue,
        formatIntegerValue,
    }

});