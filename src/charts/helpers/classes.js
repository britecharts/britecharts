define(function() {
    'use strict';

    function classArray(classArr) {
        classArr = Array.isArray(classArr) ? classArr : [...arguments];

        return {
            asList: () => classArr.join(' '),
            asSelector: () => '.' + classArr.join('.')
        };
    }

    return {
        classArray
    };
});
