define(function(require) {
    'use strict';

    /**
     * Casts the data given to a date or number
     * respecting the value of xAxisValueType
     * @param {string | number} value   Value data
     * @param {string} type             Type to cast to
     * @return {Date | number} value    Casted value
     */
    const castValueToType = (value, type) => {
        if(type === 'number') {
            return Number(value);
        }

        return new Date(value);
    }

    return {
        castValueToType: castValueToType
    };
});
