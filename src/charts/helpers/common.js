define(function(require) {
    'use strict'

    /**
     * Checks if a number is an integer of has decimal values
     * @param  {Number}  value Value to check
     * @return {Boolean}       If it is an iteger
     */
    function isInteger(value) {
        return value % 1 === 0;
    }

    return {
        isInteger
    };

});