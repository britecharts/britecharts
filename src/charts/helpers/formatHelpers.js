define(function(require) {
    'use strict';

    const d3Format = require('d3-format');

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

    function getValueSize(value, limits) {
        let size = 'large';

        if (value < limits.small.limit) {
            size = 'small';
        } else if (value < limits.medium.limit) {
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
        let size = getValueSize(value, integerValueFormats);
        let format = integerValueFormats[size].format;

        return format(value);
    }

    /**
     * Formats a floating point value depending on its value range
     * @param  {Number} value Decimal point value to format
     * @return {Number}       Formatted value to show
     */
    function formatDecimalValue(value) {
        let size = getValueSize(value, decimalValueFormats);
        let format = decimalValueFormats[size].format;

        return format(value);
    }

    return {
        formatDecimalValue,
        formatIntegerValue,
    }

});